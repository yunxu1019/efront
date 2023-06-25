"use strict";
const [
    /*   1 */COMMENT,
    /*   2 */SPACE,
    /*   4 */STRAP,
    /*   8 */STAMP,
    /*  16 */VALUE,
    /*  32 */QUOTED,
    /*  64 */PIECE,
    /* 128 */EXPRESS,
    /* 256 */SCOPED,
    /* 512 */LABEL,
    /*1024 */PROPERTY,
] = new Array(20).fill(0).map((_, a) => 1 << a);
var number_reg = /^(0x[0-9a-f]+|0b\d+|0o\d+|(\d*\.\d+|\d+\.?))(e[\+\-]?\d+|[mn])?$/i;
var equal_reg = /^(?:[\+\-\*\/~\^&\|%]|\*\*|>>>?|<<)?\=$|^(?:\+\+|\-\-)$/;
var skipAssignment = function (o, cx) {
    var next = arguments.length === 1 ? function () {
        o = o.next;
    } : function () {
        o = body[++ox];
        cx = ox;
        while (o && o.type & (SPACE | COMMENT)) o = body[++ox];
    };
    if (arguments.length !== 1) {
        var body = o;
        var ox = cx;
        o = body[ox];
        while (o && o.type & (SPACE | COMMENT)) o = body[++ox];
        cx = ox + 1;
    }
    var needpunc = false;
    var qcount = 0;
    var ifdeep = 0;
    loop: while (o) switch (o.type) {
        case STAMP:
            switch (o.text) {
                case ";":
                    if (!ifdeep) break loop;
                    var n = o.next;
                    if (!n || n.type !== STRAP || n.text !== 'else') break loop;
                    next();
                    break;
                case ",":
                    if (!ifdeep) break loop;
                    needpunc = false;
                    next();
                    break;
                case "++":
                case "--":
                    next();
                    break;
                case "!":
                case "~":
                case "+":
                case "-":
                    next();
                    needpunc = false;
                    break;
                case "?":
                    qcount++;
                    needpunc = false;
                    next();
                    break;
                case ":":
                    if (qcount === 0) {
                        var p = o.prev;
                        if (p && p.type === LABEL) {
                            next();
                            break;
                        }
                        break loop;
                    }
                    qcount--;
                    next();
                    needpunc = false;
                    break;
                default:
                    needpunc = false;
                    next();
                    break;
            }
            break;
        case SCOPED:
            if (needpunc && o.entry === "{") break loop;
            next();
            needpunc = true;
            break;
        case PROPERTY:
            if (needpunc) break loop;
            next();
            break;
        case EXPRESS:
            if (/^\.[^\.]/.test(o.text)) {
                next();
                break;
            }
            if (/\.$/.test(o.text)) {
                needpunc = false;
                next();
                break;
            }
            if (/^\[/.test(o.text)) {
                needpunc = true;
                next();
                break;
            }
        case QUOTED:
            if (needpunc && /^`/.test(o.entry || o.text)) {
                needpunc = false;
            }
        case VALUE:
            if (needpunc) break loop;
            needpunc = true;
            next();
            break;
        case STRAP:
            if (needpunc) {
                if (!/^(in|instanceof|of|else|as)$/.test(o.text)) break loop;
                if (o.text === 'else') {
                    if (!ifdeep) break loop;
                    ifdeep--;
                    needpunc = false;
                }
                next();
                needpunc = false;
            }
            else if (/^(try|catch|finally)$/.test(o.text)) {
                next();
                if (o.entry === "(") next();
                next();
            }
            else if (o.text === 'else') {
                ifdeep--;
                needpunc = false;
                next();
            }
            else if (/^(if|while|with|switch)$/.test(o.text)) {
                if (o.text === 'if') ifdeep++;
                next();
                next();
                break;
            }
            else if (o.text === 'do') {
                next();
                next();
                next();
            }
            else if (o.text === 'for') {
                next();
                if (o.type === STRAP && o.text === 'await') next();
                next();
                break;
            }
            else if (o.text === "class") {
                next();
                while (o && !o.isClass) next();
                while (o && o.isClass) next();
                needpunc = true;
                break;
            }
            else if (o.text === "function") {
                next();
                if (o && o.type === STAMP) next();
                if (o && o.type === EXPRESS) next();
                if (o) next();
                if (o) next();
                needpunc = true;
                break;
            }
            else if (o.text === 'debugger') {
                next();
                needpunc = false;
                break loop;
            }
            else if (o.isend && !ifdeep) {
                next();
                break loop;
            }
            else {
                next();
            }
            break;
        default:
            // console.log(o);
            // throw new Error('代码结构异常！');
            next();
            break loop;
    }
    return body ? cx : o;
};
function skipSentenceQueue(o) {
    do {
        o = skipAssignment(o)
    } while (o && o.type === STAMP && o.text === ',' ? o = o.next : false);
    return o;
}
function snapSentenceHead(o) {
    // 只检查一级
    while (o && o.prev) {
        var p = o.prev;
        if (o.entry === '(' && !(p.type & (STAMP | STRAP))) {
            o = p;
            p = o.prev;
            if (!p) break;
        }
        var maybeprop = o.type === SCOPED && o.entry !== "{" || o.type === EXPRESS && /^[\.\[]/.test(o.text);
        if (p.type === EXPRESS) {
            if (maybeprop || /\.$/.test(p.text)) {
                o = p;
                continue;
            }
            break;
        }
        if (p.type & (VALUE | QUOTED)) {
            if (maybeprop) {
                o = p;
                if (p.entry === '`' && p.prev && !(p.prev.type & (STAMP | STRAP))) o = p.prev;
                continue;
            }
            break;
        }
        if (p.type === SCOPED) {
            if (maybeprop) {
                o = p;
                continue;
            }
            if (p.entry === "(" && o.type === SCOPED) {
                var pp = p.prev;
                if (pp && pp.type === EXPRESS) pp = pp.prev;
                if (pp && pp.type === STRAP && pp.text === 'function') {
                    o = pp;
                    continue;
                }
            }
            break;
        }
        if (p.type === STRAP) {
            if (/^(?:new|void|typeof|delete|await|var|let|const|class|function)$/.test(p.text)) {
                o = p;
                continue;
            }
            if (/^(in|instanceof)$/.test(p.text)) {
                o = p.prev;
                continue;
            }
            break;
        }
        if (p.type === STAMP) {
            if (/=>|[,;]/.test(p.text) || equal_reg.test(p.text)) {
                break;
            }
            if (/^(?:[!~]|\+\+|\-\-)$/.test(p.text)) {
                o = p;
                continue;
            }
            o = p.prev;
            continue;
        }
        break;
    }
    return o;
}
var getStrapHead = function (o) {
    var p = o.prev;
    if (p && p.type === STRAP && !p.transive) return p;
    if (p && p.type === STRAP && p.text === 'await') p = p.prev;
    if (p && p.type === STRAP && p.text === 'for') return p;
    return null;
}
var snapExpressHead = function (o) {
    if (!o || o.type & ~(EXPRESS | SCOPED | QUOTED)) return o;
    var a = o;
    while (o && o.prev) {
        var p = o.prev;
        if (p && p.type === STRAP && p.text === 'new') return p;
        if (o.type === SCOPED && o.entry === '(') {
            var h = getStrapHead(o);
            if (h) return h;
        }
        if (o.type === SCOPED && o.entry !== '{'
            || o.type === EXPRESS && /^(\??\.[^\.]|\[)/.test(o.text)
            || /\.$/.test(p.text) && !p.isdigit
            || o.type === QUOTED && (o.length || /^\`/.test(o.text))
        ) {
            if (p.type === SCOPED && p.entry === '(') {
                if (getStrapHead(p)) return o;
            }
            if (p.type & (EXPRESS | VALUE | QUOTED | SCOPED)) {
                a = o;
                o = p;
                continue;
            }
        }
        else if (o.type === SCOPED) {
            var isclass = 0;
            if (o.isObject) return o;
            if (!o.isClass) {
                if (p.type === SCOPED && p.entry === "(") {
                    p = p.prev;
                    if (p && p.type === EXPRESS) p = p.prev;
                    if (p && p.type === STAMP && p.text === '*') p = p.prev;
                    if (!p || p.type !== STRAP || !/^function$/.test(p.text)) return a;
                    if (p && p.type === STRAP && p.text === "new") p = p.prev;
                    return p;
                }
                return a;
            }
            while (o.isClass) {
                isclass++;
                o = o.prev;
            }
            var p = o;
            while (o && isclass > 0) {
                var p = o;
                if (o.type === STRAP && o.text === 'class') {
                    isclass--;
                }
                o = o.prev;
            }
            if (p && p.type === STRAP && p.text === 'new') return p;
            return p;
        }
        break;
    }
    return o;
};

var snapExpressFoot = function (o) {
    while (o && o.next) {
        var n = null;
        if (o.type & STRAP) {
            n = o;
            if (n.text === 'new') n = n.next;
            if (n.text === 'function') {
                while (n && n.type !== SCOPED || n.entry !== '{') n = n.next;
            }
            else if (n.text === 'class') {
                var n = o;
                while (n && !n.isClass) n = n.next;
                while (n && n.isClass) n = n.next;
            }
            else break;
            o = n;
        }
        else if (o.type & (EXPRESS | QUOTED | VALUE | SCOPED)) {
            n = o.next;
        }
        if (!n) break;
        if (n.type === SCOPED && o.entry !== '{'
            || /\.$/.test(o.text) && !o.isdigit
            || n.type === EXPRESS && /^\??\.[^\.]/.test(n.text)
            || n.type === QUOTED && (n.length || /^\`/.test(n.text))
        ) {
            o = n;
            continue;
        }
        break;
    }
    return o;
};
var createScoped = function (parsed, wash) {
    var used = Object.create(null); var vars = Object.create(null), lets = vars;
    var scoped = [], funcbody = scoped, argscope = scoped, thisscope = scoped;
    scoped.body = parsed;
    scoped.isfunc = true;
    var run = function (o, id, body) {
        loop: while (o) {
            var isCatch = false;
            var isFunction = false;
            var isScope = false;
            var isArrow = false;
            var isClass = false;
            var isAsync = false;
            var isAster = false;
            var function_obj = null;
            if (o.type === STAMP && equal_reg.test(o.text)) {
                var p = snapExpressHead(o.prev);
                if (!p) {
                    let n = o.next;
                    if (n && n.type & (EXPRESS | VALUE)) {
                        n.equal = o;
                    }
                }
                else if (p.type & (EXPRESS | VALUE)) {
                    p.equal = o;
                }
                else if (o.text === '=' && p.type === SCOPED) {
                    if (!p.kind) {
                        var pp = p.prev;
                        if (!pp || pp.type === STAMP || pp.type === STRAP) {
                            getDeclared(p, 'assign');
                        }
                    }
                }
            }
            switch (o.type) {
                case QUOTED:
                    if (o.length) {
                        run(o.first);
                    }
                    break;
                case STAMP:
                    break;
                case PROPERTY:
                    if (o.next) {
                        if (o.next.type !== STAMP || o.next.text !== ",") break;
                    }
                    if (o.prev && o.prev.type === STRAP && o.prev.text === 'as') {
                        break;
                    }
                case VALUE:
                    if (o.isdigit) break;
                case EXPRESS:
                    if (o.prev && o.prev.type === EXPRESS) {
                        if (/\.$/.test(o.prev.text)) break;
                    }
                    if (o.text === 'await' && funcbody.async !== false) {
                        o.type = STRAP;
                        funcbody.async = true;
                        continue;
                    }
                    if (o.text === 'yield') {
                        if (funcbody.aster === true) {
                            o.type = STRAP;
                            continue;
                        }
                        if ((!o.prev || o.prev.type !== STAMP || o.prev.text === ';') && (!o.next || o.next.type !== STAMP || o.next.text === '*')) {
                            o.type = STRAP;
                            funcbody.aster = true;
                            continue;
                        }
                    }
                    if (o.next && o.next.type === STAMP && o.next.text === "=>") {
                        isScope = true;
                        isArrow = true;
                    }
                    else {
                        var u = o.text;
                        if (/^\.\.\./.test(u)) u = u.slice(3);
                        var u = u.replace(/^([^\.\[]*)[\s\S]*$/, '$1');
                        if (!u) break;
                        var prev = o.prev;
                        if (prev && prev.type === STAMP && /^(?:\+\+|\-\-)$/.test(prev.text)) {
                            var pp = prev.prev;
                            if (!pp || pp.type === STAMP) {
                                o.equal = o.prev;
                            }
                        }
                        saveTo(used, u, o);
                    }
                    break;
                case LABEL:
                    var name = o.text;
                    name = name.slice(0, name.length - 1);
                    vars[name] = true;
                    o.kind = "label";
                    saveTo(used, name, o);
                    break;

                case STRAP:
                    var s = o.text;
                    switch (s) {
                        case "return":
                            if (!funcbody.return) funcbody.return = [];
                            funcbody.return.push(o);
                            break;
                        case "await":
                            if (funcbody.async === false) {
                                o.type = EXPRESS;
                                continue;
                            }
                            funcbody.async = funcbody.await = true;
                            break;
                        case "yield":
                            if (!funcbody.aster) {
                                var mustyield = undefined;
                                var tmp = id;
                                if (body) while (body[++tmp] !== o.next) {
                                    if (body[tmp].type === SPACE) {
                                        mustyield = false;
                                        break;
                                    };
                                }
                                if (mustyield !== false && o.next) {
                                    if (o.next.type === STRAP && !/^(?:instanceof|in|of|from|as)$/.test(o.next.text)
                                        || o.next.type === STAMP && /[!~]/.test(o.next.text)
                                        || o.next.type === EXPRESS && !/^[\.\[]/.test(o.next.text)
                                        || o.next.type & (VALUE | QUOTED | SCOPED)
                                    ) {
                                        mustyield = true;
                                    }
                                }
                                if (mustyield) funcbody.aster = true;
                                else o.type = EXPRESS;
                                continue;
                            }
                            funcbody.yield = true;
                            break;
                        case "as":
                        case "from":
                            break;
                        case "var":
                        case "import":
                            var m = vars;
                        case "let":
                        case "const":
                            m = m || lets;
                            var [declared, used0, o0, skiped] = getDeclared(o.next, s);
                            while (skiped.length) {
                                var o1 = run(skiped[0], 0);
                                let sindex = skiped.indexOf(o1);
                                if (sindex < 0) break;
                                skiped.splice(0, sindex + 1);
                            }
                            o = o0;
                            mergeTo(used, used0);
                            mapDeclared(m, declared);
                            continue loop;
                        case "static":
                        case "function":
                            isFunction = true;

                            if (o.prev && o.prev.text === 'async') {
                                isAsync = true;
                            }
                            function_obj = o;
                            if (o.next.type === STAMP) {
                                isAster = true;
                                o = o.next;
                                o.isExpress = o.prev.isExpress;
                            }
                        case "catch":
                            if (s === 'catch') isCatch = true;
                        case "class":
                            if (s === 'class') isClass = true;
                            if (!o.isExpress) {
                                o = o.next;

                                if (o.type === EXPRESS) {
                                    vars[o.text] = true;
                                    o.kind = isFunction ? 'function' : 'class';
                                    saveTo(used, o.text, o);
                                    o = o.next;
                                }
                            }
                            isScope = true;
                            break;
                        case "for":
                            o = o.next;
                            if (o.type === STRAP && o.text === 'await') {
                                funcbody.async = funcbody.await = true;
                                o = o.next;
                            }
                            isScope = true;
                            break;

                    }
                    break;
                case SCOPED:
                    if (o.entry === "(") {
                        if (o.next && o.next.type === STAMP && o.next.text === "=>") {
                            isArrow = true;
                            isScope = true;
                            if (o.prev && o.prev.text === 'async') {
                                isAsync = true;
                            }
                        }
                        else if (o.prev && (o.prev.type === PROPERTY || o.prev.isprop)) {
                            isFunction = true;
                            isScope = true;
                            var pp = o.prev.prev;
                            if (pp && pp.type === STAMP && pp.isprop) {
                                isAster = true;
                            }
                            if (pp && pp.text === 'async') {
                                isAsync = true;
                            }
                        }
                        else {
                            run(o.first);
                        }
                    }
                    else if (o.entry === "{" && !o.isObject) {
                        isScope = true;
                    }
                    else {
                        run(o.first);
                    }
                    break;
            }
            if (isScope) {
                var _used = used;
                var _lets = lets;
                var _vars = vars;
                var _scoped = scoped;
                var _funcbody = funcbody;
                var _argscope = argscope;
                var _thisscope = thisscope;
                used = Object.create(null);
                lets = Object.create(null);
                vars = Object.create(null);
                scoped = [];
                var isExpress = o.isExpress;

                if (isFunction || isArrow) {
                    scoped.used = used;
                    scoped.vars = vars;
                    lets = vars;
                    if (isFunction) {
                        vars.this = true, vars.arguments = true;
                        scoped.aster = isAster;
                        thisscope = scoped;
                        argscope = scoped;
                    }
                    scoped.async = isAsync;
                    scoped.isfunc = true;
                    isFunction = true;
                    if (function_obj) function_obj.scoped = scoped;
                    funcbody = scoped;
                } else {
                    vars = _vars;
                    scoped.lets = lets;
                    scoped.used = used;
                    if (isClass) {
                        lets.super = true;
                        lets.this = true;
                        thisscope = scoped;
                    }
                }
                if (isArrow);
                else while (o && o.isExpress && o.type !== SCOPED) {
                    o = o.next;
                    if (o && o.type === EXPRESS) {
                        saveTo(used, o.text, o);
                        if (o.prev && o.prev.type === STRAP && o.prev.text === 'extends') continue;
                        lets[o.text] = true;
                        o.kind = isFunction ? 'function' : 'class';
                        o = o.next;
                    }
                    if (isFunction) break;
                }
                if (!isFunction) while (o.type !== SCOPED) {
                    // if (o.next && o.next.type === STAMP && o.next.text === "=>") break;
                    o = run(o, 0);
                    o = o.next;
                    if (!o) break;
                }
                if (!o);
                else if (o.entry === "(") {
                    scoped.head = o;
                    o.isExpress = isExpress;
                    if (isFunction || isCatch) {
                        var [declared, used0, o0, skiped] = getDeclared(o.first, 'argument');
                        scoped.args = declared;
                        mergeTo(used, used0);
                        while (skiped.length) {
                            var o1 = run(skiped[0], 0);
                            var sindex = skiped.indexOf(o1);
                            if (sindex < 0) break;
                            skiped.splice(0, sindex + 1);
                        }
                        mapDeclared(isCatch ? lets : vars, declared);
                    }
                    else {
                        run(o.first);
                    }
                    o = o.next;
                    if (!o);
                    else if (o.type === STAMP && o.text === "=>") o = o.next;
                }
                else if (isArrow) {
                    vars[o.text] = true;
                    o.kind = 'argument';
                    saveTo(used, o.text, o);
                    o = o.next.next;
                }
                if (!o);
                else if (o.type === SCOPED && o.entry === "{") {
                    scoped.body = o;
                    o.scoped = scoped;
                    o.isExpress = isExpress;
                    run(o.first);
                    if (isArrow && id >= 0 && o) o = o.next;
                    if (wash && isFunction) {
                        var e = o.next;
                        if (e && e.type === EXPRESS && /^[\.\[]/.test(e.text) || e && e.type === SCOPED && e.entry === "[") {
                            scoped.target = true;
                            e = e.next;
                        }
                        if (e && e.type === SCOPED && e.entry === '(') {
                            if (e.first) {
                                scoped.pass = getDeclared(e.first)[0];
                            }
                            if (scoped.target) scoped.target = scoped.pass.shift();
                        }
                    }
                }
                else if (isArrow) {
                    var next = skipAssignment(o);
                    var u = o;
                    while (o !== next) {
                        var n = run(o, 0);
                        if (o === n || n && n.entry === '{') o = n.next;
                        else o = n;
                    }
                }
                else {
                    do {
                        if (o.type === STAMP && o.text === ";") break;
                        o = run(o, 0);
                        if (!o) break;
                        var next = o.next;
                        if (!next) break;
                        var e = o;
                        if (o.type === STAMP && /^(\+\+|\-\-)$/.test(o.text) && o.prev && o.prev.type === EXPRESS
                            || (VALUE | QUOTED | SCOPED) & o.type
                            || EXPRESS === o.type && !/\.$/.test(o.text)) {
                            if ((VALUE | QUOTED | PROPERTY | LABEL) & next.type) break;
                            if (EXPRESS === next.type && !/^[\.\[]/.test(next.text)) break;
                            if (next.type === SCOPED && next.entry === "{") break;
                            if (next.type === STRAP && !next.isExpress) break;
                        }
                        o = next;
                    } while (o);
                }
                var map = isFunction ? vars : lets;
                var keepscope = !!scoped.body || !!scoped.head;
                if (!keepscope) for (var k in map) {
                    keepscope = true;
                    break;
                }
                if (keepscope) {
                    var envs = Object.create(null);
                    for (var k in used) {
                        if (!(k in map)) {
                            envs[k] = true;
                            for (var u of used[k]) {
                                saveTo(_used, k, u);
                            }
                        }
                    }
                    scoped.envs = envs;
                    _scoped.push(scoped);
                }
                else {
                    mergeTo(_used, used);
                    if (scoped.length) _scoped.push(scoped);
                }
                if (isArrow) {
                    scoped.isArrow = true;
                    if (!thisscope.insett && used.this) thisscope.insett = true;
                    if (!argscope.inseta && used.arguments) argscope.inseta = true;
                }
                if (isClass) delete lets.super, delete lets.this, thisscope = _thisscope;
                if (isFunction) {
                    if (used.yield) _scoped.yield = false;
                    funcbody = _funcbody;
                    if (!isArrow) {
                        delete vars.this;
                        delete vars.arguments;
                        thisscope = _thisscope;
                        argscope = _argscope;
                    }
                }
                used = _used;
                lets = _lets;
                vars = _vars;
                scoped = _scoped;
            }
            if (id >= 0) break;
            if (o) o = o.next;
        }
        return o;
    };
    run(parsed.first);
    scoped.used = used;
    scoped.vars = vars;
    var envs = Object.create(null);
    for (var u in used) {
        if (!(u in vars)) {
            if (!/^(true|false|null|this|arguments)$/.test(u)) envs[u] = true;
        }
    }
    if (vars.yield) scoped.yield = false;
    if (scoped.yield !== false && envs.yield) {
        scoped.yield = true;
        delete envs.yield;
        delete used.yield;
    }
    delete envs.eval;
    scoped.envs = envs;
    return scoped;
};
var getDeclared = function (o, kind, queue) {
    var declared = [], used = Object.create(null); var skiped = [];
    var prop = null;
    var attributes = [];
    var index = 0;
    loop: while (o) {
        while (o && o.type === STAMP && o.text === ',') o = o.next, index++;
        if (!o) {
            index--;
            break;
        }
        if (o.isprop) {
            prop = createString([o]).trim();
            if (/^(['"`])[\s\S]*\1$/.test(prop)) {
                prop = `[${prop}]`;
            }
            else if (o.isdigit) prop = `[${prop}]`;
            else if (!/^\[[\s\S]*\]$/.test(prop)) prop = "." + prop;
            skiped.push(o);
            if (o.next && o.next.type === STAMP && o.next.text === ":") {
                o = o.next;
                o = o.next;
            }
        }
        switch (o.type) {
            case STAMP:
                if (o.text === "*" && o.next) {
                    if (o.next.type === STRAP && o.next.text === 'as') {
                        o = o.next.next;
                        prop = "*";
                        continue;
                    }
                }
            case PROPERTY:
                if (o.next) {
                    if (o.next.type === STAMP && o.next.text === ":" || o.next.type === STRAP && o.next.text === "as") {
                        prop = "." + o.text;
                        o = o.next.next;
                        continue;
                    }
                }
            case EXPRESS:
            case STRAP:
            case VALUE:
                var n = o.text.replace(/^\.\.\.|\.\.\.$/g, '');
                declared.push(n);
                var isdots = n !== o.text;
                if (!isdots && !prop) {
                    if (queue && queue.entry === '{') {
                        if (o.type & (EXPRESS | STRAP)) {
                            if (/^\[/.test(o.text)) prop = o.text;
                            else if (!/\./.test(o.text)) prop = '.' + o.text;
                            else prop = `[${strings.encode(o.text)}]`;
                        }
                        else {
                            prop = `[${n}]`;
                        }
                    }
                    else prop = declared["..."] ? declared["..."][1] - index : `[${index}]`;
                }
                if (isdots) declared["..."] = [n, index];
                else attributes.push([prop, n]);
                o.kind = kind;
                saveTo(used, n, o);
                o = o.next;
                break;
            case SCOPED:
                var [d, u, _, s] = getDeclared(o.first, kind, o);
                while (s.length) skiped.push.apply(skiped, s.splice(0, 1024));
                mergeTo(used, u);
                declared.push(d);
                if (!prop) prop = declared["..."] ? declared["..."][1] - index : `[${index}]`;
                d.entry = o.entry;
                o.kind = kind;
                attributes.push([prop, d]);
                o = o.next;
                break;
            default:
                console.log(o);
                throw new Error("代码结构异常");
        }
        if (!o) break;
        switch (o.type) {
            case STRAP:
                if (/^(in|of)$/.test(o.text)) {
                    o = o.next;
                    var o0 = skipAssignment(o);
                    do {
                        skiped.push(o);
                        o = o.next;
                    } while (o !== o0);
                    o = o0;
                    break;
                }
                break loop;
            case STAMP:
                if (o.text === "=") {
                    o.prev.equal = o;
                    o = o.next;
                    var o0 = skipAssignment(o);
                    attributes[attributes.length - 1].push(queue, o, o0);
                    while (o !== o0) {
                        skiped.push(o);
                        o = o.next;
                    }
                    o = o0;
                    break;
                }
                break;
        }
        if (!o) break;
        if (o.type !== STAMP) break;
        if (o.text !== ',') break;
        prop = null;
    }
    declared.attributes = attributes;
    if (declared["..."]) declared["..."].push(index);
    return [declared, used, o, skiped];
};
var mapDeclared = function (map, declared) {
    var rest = [declared];
    while (rest.length) {
        var r = rest.pop();
        for (var d of r) {
            if (d instanceof Array) rest.push(d);
            else map[d] = true;
        }
    }
    return map;
};
var saveTo = function (used, k, o) {
    if (!(used[k] instanceof Array)) used[k] = [];
    used[k].push(o);
};

var mergeTo = function (used, used0) {
    for (var k in used0) {
        var v = used0[k];
        for (var s of v) saveTo(used, k, s);
    }
};
var breakSpace = function (o) {
    var { prev, next } = o;
    if (hasBreakBetween(prev, next)) return;
    if (prev.type === STRAP && prev.isend) return ';';
    return getSemicolonBetween(prev, next);
};
var hasBreakBetween = function (prev, next) {
    if (!prev || !next) return true;
    if (prev.type === STAMP && /^[,;]$/.test(prev.text)) return true;
    if (next.type === STAMP && /^[,;]$/.test(next.text)) return true;
    if (prev.type === EXPRESS && /\.$/.test(prev.text)) return true;
    if (next.type === EXPRESS && /^[\.\[]/.test(next.text)) return true;
};
var getSemicolonBetween = function (prev, next) {
    if (next.type === PROPERTY) return ";";
    if (next.type === STAMP && next.text === "*") return ";";
    if (
        (EXPRESS | VALUE | QUOTED) & prev.type
        || prev.type === STAMP && /^(\+\+|\-\-)$/.test(prev.text)
        || prev.type === SCOPED && (prev.isExpress || prev.isObject)
    ) {
        if ((EXPRESS | VALUE | QUOTED | LABEL) & next.type) return ";";
        if (next.type === STRAP) {
            if (!/^(in|of|extends|instanceof|as)$/.test(next.text)) return ";";
            return " ";
        }
        if (next.type === SCOPED && next.entry === '{') {
            if (!next.isExpress) return ";";
        }
        return;
    }
    if (prev.type === STRAP) {
        if ((STRAP | EXPRESS | VALUE | QUOTED) & next.type) return " ";
        if (next.type === LABEL) return ";";
    }
}
var needBreakBetween = function (prev, next) {
    if (hasBreakBetween(prev, next)) return;
    return getSemicolonBetween(prev, next);
};
var relink = function (list) {
    var pi = 0, p = null;
    list.first = p;
    for (var cx = 0, dx = list.length; cx < dx; cx++) {
        var o = list[cx];
        o.prev = p;
        if (o.type & (COMMENT | SPACE)) continue;
        if (!p) list.first = o;
        while (pi < cx) list[pi++].next = o;
        p = o;
    }
    while (pi < cx) list[pi++].next = null;
    list.last = p;
    return list;
};
var setqueue = function (list, queue = list) {
    var v = { value: queue }
    for (var o of list) Reflect.deleteProperty(o, 'queue'), Reflect.defineProperty(o, 'queue', v);
};

var createString = function (parsed) {
    var keepspace = parsed.keepspace !== false;
    var helpcode = parsed.helpcode;
    var lasttype = SPACE;
    var result = [], cacheresult, finalresult = result;
    var helpcolor = parsed.keepcolor === false;
    var run = (o, i, a) => {
        var prev = o.prev;
        if (!((SPACE | COMMENT | STAMP | PIECE | SCOPED) & o.type) && prev && lasttype !== SPACE && keepspace) {
            if ((QUOTED | SCOPED | STRAP | LABEL | COMMENT) & lasttype
                || prev.type === STAMP && !prev.unary
            ) {
                if (o.type !== EXPRESS || !/^(\.[^\.]|\[)/.test(o.text) && !prev.tag && !o.tag) {
                    result.push(" ");
                    if (createString.debug && !o.text) console.log(o.type, o.text, o)
                    lasttype = SPACE
                }
            }
        }
        switch (o.type) {
            case COMMENT:
                // 每一次要远行，我都不得不对自己的物品去粗取精。取舍之间，什么重要，什么不是那么重要，都有了一道明显的分界线。
                var tmp = o.text, opentmp = false;
                if (!keepspace || helpcode) {
                    if (/^\/[\/\*]\s*\<\!--/.test(tmp)) {
                        opentmp = true;
                        if (/^\/\*/.test(tmp)) opentmp = 2;
                        tmp = tmp.replace(/^\/[\/\*]\s*\<\!--\s*/, '');
                        cacheresult = [];
                        result = cacheresult;
                        result.push("/* <!-- 开发辅助代码: */");
                    }
                    if (/--\!?\>\s*(?:\*\/)?$/.test(tmp) && result !== finalresult) {
                        if (!opentmp) tmp = tmp.replace(/^\/[\/\*]\s*/, '');
                        tmp = tmp.replace(/\s*--\!?\>\s*(?:\*\/)?$/, "");
                        if (tmp) {
                            result.push(tmp);
                        }
                        result.push("/* --> */");
                        opentmp = true;
                        if (helpcode && cacheresult) finalresult = finalresult.concat(cacheresult), cacheresult = [];
                        result = finalresult;
                    }
                    else if (opentmp) {
                        if (opentmp === 2) tmp = tmp.replace(/\s*\*\/$/, '');
                        if (tmp) result.push("\r\n", tmp);
                    }
                }
                if (keepspace && !opentmp) {
                    if (lasttype !== SPACE && lasttype !== EXPRESS) result.push(" ");
                    result.push(tmp);
                }
                break;
            case SPACE:
                if (keepspace) {
                    result.push(o.text);
                    lasttype = SPACE;
                    break;
                }
                var b = breakSpace(o);
                if (b) result.push(b);
                break;
            case QUOTED:
                if (!o.length) {
                    if (helpcolor) o.text = color.transform(o.text);
                    result.push(o.text);
                    break;
                }
            case SCOPED:
                if (keepspace && o.type !== QUOTED && (lasttype & (STRAP | COMMENT | STAMP)
                    && (!o.prev || !/[\+\-\~\!]$/.test(o.prev.text) || /[\+\-]$/.test(o.prev.text) && (!o.prev.prev || !((STAMP | STRAP) & o.prev.prev.type)))
                    || lasttype === SCOPED && o.entry === "{"
                )) result.push(" ");
                result.push(o.entry);
                if (o.length > 0) {
                    if (o.entry === "{" && o[0].type !== SPACE) {
                        if (keepspace && lasttype !== PIECE) {
                            result.push(" ");
                        }
                    }
                    lasttype = SPACE;
                    o.forEach(run);
                    if (o.prev && o.prev.type === STRAP && /^for$/.test(o.prev.text));
                    else if (/^[,;]$/.test(result[result.length - 1]) && !keepspace) {
                        var last = o.last;
                        var lp = last && last.prev;
                        if (!lp) result.pop();
                        else {
                            var lpp = lp.prev;
                            if (lp.type === STRAP && lp.text === 'else' || lp.type === SCOPED && lpp && lpp.type === STRAP && /^(while|if|with|for)/.test(lpp.text));
                            else result.pop();
                        }
                    }
                    if (o.leave === "}" && o.entry === "{" && o[o.length - 1].type !== SPACE) {
                        if (keepspace) result.push(" ");
                    }
                }
                result.push(o.leave);
                break;
            default:
                if (o instanceof Object) {
                    if (o.prev && o.prev.type === EXPRESS && o.type === EXPRESS && (/^[\.\[]/.test(o.text) || /\.$/.test(o.prev.text)));
                    else if ((STRAP | EXPRESS | PROPERTY | COMMENT | VALUE) & lasttype && (STRAP | EXPRESS | PROPERTY | VALUE) & o.type) {
                        result.push(" ");
                    }
                    else if (o.prev && o.type === STAMP && !/^([,;])$/.test(o.text)) {
                        if (result[result.length - 1] === " " || (lasttype === PROPERTY || !o.isExpress && o.prev && o.prev.type !== LABEL) && o.text === ':') { }
                        else if (lasttype === STAMP) {
                            result.push(" ");
                        }
                        else if (/^(\+\+|\-\-)$/.test(o.prev.text) && o.prev.prev) {
                            var prev_prev = o.prev.prev;
                            if (
                                prev_prev.type === STRAP && !prev_prev.isExpress
                                || prev_prev.type & (EXPRESS | VALUE)
                            ) result.push(";");
                        }
                        else if (o.text === '*') {
                            if (keepspace && lasttype !== SPACE && (lasttype !== STRAP || o.prev && o.prev.text !== 'function')) result.push(" ");
                        }
                        else if (!/^(\+\+|\-\-)$/.test(o.text)) {
                            if (keepspace && lasttype !== SPACE) result.push(" ");
                        }
                    }
                    if (o.type === VALUE) {
                        if (/^0[0-7]+$/.test(o.text)) {
                            o.text = '0o' + o.text.slice(1);
                        }
                    }
                    result.push(o.text);
                }
                else {
                    result.push(o);
                }
        }
        lasttype = o.type;
        if (o.isprop) lasttype = PROPERTY;
    };
    parsed.forEach(run);
    return finalresult.join("");
}
var rename = function (used, from, to) {
    if (from === to) return;
    var list = used[from];
    if (list) for (var u of list) {
        if (!u) continue;
        var text = u.text;
        if (!u.origin) u.origin = from;
        var doted = /^\.\.\./.test(text);
        if (doted) text = text.slice(3);
        text = to + text.replace(/^[^\.\:\[]+/i, "");
        if (doted) text = "..." + text;
        if (u.type === PROPERTY) {
            if (u.short) {
                var q = u.queue;
                q.splice(q.indexOf(u), 0, { type: PROPERTY, text: u.text }, { type: STAMP, text: ":" });
                u.short = false;
                u.type = EXPRESS;
                u.text = text;
                relink(q);
            }
            continue;
        }
        u.text = text;
    }
};

/**
 * 按语句分割代码
 */
var createExpressList = function (code) {
    var list = [];
    for (var cx = 0, dx = code.length; cx < dx;) {
        var o = code[cx];
        var ex = skipAssignment(code, cx);
        if (code[ex] && code[ex].type === STAMP && /[,;]/.test(code[ex].text)) {
            ex++;
        }
        if (ex > dx) ex = dx;
        var exp = [];
        do {
            exp.push(o);
            o = code[++cx];
        } while (cx < ex);
        relink(exp);
        list.push(exp);
    }
    return list;
};
var isHalfSentence = function (body, i) {
    var a = body[i];
    while (a && a.type & (SPACE | COMMENT)) a = body[--i];
    if (!a) return false;
    if (a.type === STRAP && a.text === 'else') return true;
    if (a.type !== SCOPED || a.entry !== "(") return false;
    a = a.prev;
    if (!a || a.type !== STRAP) return false;
    if (a.text === 'while') {
        var p = a.prev;
        if (!p || p.type !== SCOPED || p.entry !== '{' || !p.prev) return true;
        p = p.prev;
        if (p.type !== STRAP || p.text !== 'do') return true;
        return false;
    }
    return /^(if|for|with)$/.test(a.text);
};

var splice = function (queue, index, size, ...args) {
    if (index < 0) index += queue.length;
    var p = queue[index];
    var n = queue[index + size - 1];
    var prev = p && p.prev;
    var next = n && n.next;
    var res = queue.splice(index, size, ...args);
    var previ = queue.lastIndexOf(prev, index);
    var nexti = queue.indexOf(next, index + args.length);
    if (previ < 0) previ = 0;
    if (nexti < 0) nexti = queue.length;
    else nexti++;
    var changedargs = queue.slice(previ, nexti);
    var pp = prev && prev.prev;
    var nn = next && next.next;
    relink(changedargs);
    if (prev) prev.prev = pp;
    else queue.first = changedargs.first;
    if (next) next.next = nn;
    else queue.last = changedargs.last;
    setqueue(args, queue);
    return res;
};
var replace = function (o, ...args) {
    var queue = o.queue;
    var i = queue.indexOf(o);
    if (i >= 0) splice(queue, i, 1, ...args);
};

module.exports = {
    /*   1 */COMMENT,
    /*   2 */SPACE,
    /*   4 */STRAP,
    /*   8 */STAMP,
    /*  16 */VALUE,
    /*  32 */QUOTED,
    /*  64 */PIECE,
    /* 128 */EXPRESS,
    /* 256 */SCOPED,
    /* 512 */LABEL,
    /*1024 */PROPERTY,
    number_reg,
    equal_reg,
    skipAssignment,
    getDeclared,
    createString,
    createScoped,
    createExpressList,
    snapSentenceHead,
    snapExpressHead,
    snapExpressFoot,
    skipSentenceQueue,
    needBreakBetween,
    saveTo,
    rename,
    relink,
    setqueue,
    replace,
    isHalfSentence,
    splice,
    mergeTo
};