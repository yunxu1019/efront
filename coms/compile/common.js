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
    /*2048 */ELEMENT,
] = new Array(20).fill(0).map((_, a) => 1 << a);
// --------------//1//2/////////////////////////22/////////////2//2//3//4/////4////////3/////3//////3//3//////3///////211/////////////2//////2//////1///
var number_reg = /^(?:(?:0x[0-9a-f]+|0b[01]+|0o?[0-7]+)(?:_[0-9a-f]+)*|(?:(?:(?:\d+_)*\d+|\d*)\.\d+(?:_\d+)*|(?:\d+_)*\d+\.?))(?:e[\+\-]?\d+(?:_\d+)*|[hijklmnu]+)?/i;
var equal_reg = /^(?:[\+\-\*\/~\^&\|%]|\*\*|>>>?|<<)?\=$|^(?:\+\+|\-\-)$/;
var needhead_reg = /^\?|^\.(?:[^\.]|$)|^\[/;
var needfoot_reg = /(\:\:|\.)$/;
var skipAssignment = function (o, cx) {
    if (!o) return;
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
        cx = ox;
    }
    else if (o.type & (SPACE | COMMENT)) o = o.next;
    var needpunc = false;
    var qcount = 0;
    var condition = false;
    var ifdeep = 0;
    var labeled = o && (o.type === LABEL || o.type === STRAP && /^(var|const|let)$/i.test(o.text));
    var skipLabel = function () {
        while (o?.type === LABEL) next();
    };
    skipLabel();
    loop: while (o) switch (o.type) {
        case LABEL:
            if (!ifdeep) break loop;
        case STAMP:
            switch (o.text) {
                case ";":
                    if (!ifdeep) break loop;
                    var n = o.next;
                    if (!n || n.type !== STRAP || n.text !== 'else') break loop;
                    next();
                    break;
                case ",":
                    if (!ifdeep && !labeled && !condition) break loop;
                    needpunc = false;
                    next();
                    break;
                case "++":
                case "--":
                    if (needpunc && o.unary) break loop;
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
            if (needpunc && o.brace) break loop;
            next();
            needpunc = true;
            break;
        case PROPERTY:
            if (needpunc) break loop;
            next();
            break;
        case ELEMENT:
            if (o.istype) {
                next();
                break;
            }
        case EXPRESS:
            if (needhead_reg.test(o.text)) {
                next();
                break;
            }
            if (needfoot_reg.test(o.text)) {
                next();
                break;
            }
            var prev = o.prev;
            if (prev?.type === EXPRESS && needfoot_reg.test(prev.text)) {
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
                if (!/^(in|instanceof|of|else|as|from|catch|finally)$/.test(o.text)) {
                    break loop;
                }
                if (o.text === 'catch') {
                    next();
                    if (o && o.entry === '(') next();
                    skipLabel();
                    needpunc = false;
                    break;
                }
                if (o.text === 'else') {
                    if (!ifdeep) break loop;
                    ifdeep--;
                    needpunc = false;
                }
                next();
                needpunc = false;
            }
            else if (o.text === 'else') {
                if (ifdeep <= 0) break loop;
                ifdeep--;
                needpunc = false;
                skipLabel();
                next();
            }
            else if (/^(if|while|with|switch|try)$/.test(o.text)) {
                if (o.text === 'if') ifdeep++;
                skipLabel();
                next();
                skipLabel();
                if (o?.entry === "(") next();
                skipLabel();
                if (o?.type === SCOPED && o.entry === '{') {
                    condition = false;
                }
                else condition = true;
            }
            else if (o.text === 'do') {
                skipLabel();
                next();
                next();
                next();
            }
            else if (o.text === 'for') {
                next();
                if (o.type === STRAP && o.text === 'await') next();
                skipLabel();
                next();
            }
            else if (o.text === "class") {
                next();
                while (o && !o.isClass) next();
                while (o && o.isClass) next();
                needpunc = true;
            }
            else if (o.text === "function") {
                next();
                if (o && o.type === STAMP) next();
                if (o && o.type === EXPRESS) next();
                if (o) next();
                if (o) next();
                needpunc = true;
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
function skipFunction(o) {
    if (o.type === STRAP && o.text === 'async') o = o.next;
    if (o.type !== STRAP) return skipAssignment(o);
    if (o.text === 'function') {
        while (o && (o.type !== SCOPED || o.entry !== '{')) o = o.next;
        return o.next;
    }
    if (o.text === 'class') {
        while (!o.isClass) o = o.next;
        while (o.isClass) o = o.next;
        return o;
    }
    return o;
}
var getDoBeforeWhile = function (while_) {
    var p = while_.prev;
    if (!p || p.type !== SCOPED || p.entry !== '{') return;
    p = p.prev;
    if (p.type === STRAP && p.text === "do") return p;
};
var getIfElseHead = function (if_) {
    var p = if_;
    do {
        if_ = p;
        p = if_.prev;
        if (!p || p.type !== STRAP || p.text !== 'else') {
            return if_;
        }
        while (p && (p.type !== STRAP || p.text !== 'if')) p = p.prev;
    } while (p);
};
var getContitionHeadBeforeScoped = function (p, nodo) {
    var pp = p.prev;
    if (pp.type !== STRAP) return;
    if (pp.text === 'await') {
        pp = pp.prev;
        if (pp?.type === STRAP && pp.text === "for") {
            return pp;
        };
    }
    else switch (pp.text) {
        case "with":
        case "for":
            return pp;
        case "while":
            p = getDoBeforeWhile(pp);
            if (p) {
                if (nodo) return;
                return p;
            }
            return pp;
        case "if":
            return getIfElseHead(pp);
    }
};
var getFunctionHeadBeforeScoped = function (p) {
    var pp = p.prev;
    if (pp && pp.type === EXPRESS) pp = pp.prev;
    if (pp && pp.text === '*') pp = pp.prev;
    if (pp && pp.type === STRAP && pp.text === 'function') {
        p = pp;
        pp = pp.prev;
        if (pp && pp.type === STRAP && pp.text === 'async') {
            p = pp;
        }
        return p;
    }
    while (pp?.isprop) {
        p = pp;
        pp = pp.prev;
        if (pp?.isend) break;
    }
    if (p.isprop) return p;
}
function snapSentenceHead(o) {
    // 只检查一级
    while (o && o.prev) {
        var p = o.prev;
        if (o.entry === '(') {
            if (p.type & ~(STAMP | STRAP)) {
                o = p;
                p = o.prev;
                if (!p) break;
            }
            var pp = getContitionHeadBeforeScoped(o, false);
            if (pp) { o = pp; break; }
            pp = getFunctionHeadBeforeScoped(o);
            if (pp) {
                o = pp;
                p = o.prev;
                if (!p || p.type === STAMP && /^[,;]$/.test(p.text)) break;
                continue
            };
        }
        var maybeprop = o.type === SCOPED && !o.brace || o.type === EXPRESS && /^[\.\[]/.test(o.text);
        if (p.type === EXPRESS) {
            if (maybeprop || p.needle || needfoot_reg.test(p.text)) {
                o = p;
                continue;
            }
            if (o.type === STRAP && /^(in|instanceof|of|as|from)$/.test(o.text) || o.type === STAMP && !o.unary) {
                o = p;
                continue;
            }
            break;
        }
        if (p.type & (VALUE | QUOTED)) {
            if (maybeprop) {
                o = p;
                if (p.entry === '`' && p.prev && p.prev.type & ~(STAMP | STRAP)) o = p.prev;
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
                var pp = getContitionHeadBeforeScoped(p, true);
                if (pp) { o = pp; break; }
                var pp = getFunctionHeadBeforeScoped(p);
                if (pp) {
                    o = pp;
                    p = o.prev;
                    if (!p || p.type === STAMP && /^[,;]$/.test(p.text)) break;
                    continue;
                }
            }
            break;
        }
        if (p.type === STRAP) {
            if (/^(?:new|void|typeof|delete|await|var|let|const|class|function|async)$/.test(p.text)) {
                o = p;
                continue;
            }
            if (/^(in|instanceof|of|as|from)$/.test(p.text)) {
                o = p.prev;
                continue;
            }
            if (/^(return|yield|break|continue)$/.test(p.text)) {
                if (p.isend) break;
                o = p;
                if (p.text === 'yield') continue;
                break;
            }
            if (/^import$/.test(p.text)) {
                if (o.type === SCOPED && o.entry === '(') {
                    o = p;
                    continue;
                }
                o = p;
                break;
            }
            break;
        }
        if (p.type === STAMP) {
            if (/=>|;/.test(p.text)) {
                break;
            }
            if (/^[\?\:]$/.test(p.text)) {
                if (o) {
                    var e = snapExpressFoot(o).next;
                    if (!e || e.type === STAMP && equal_reg.test(e.text)) break;
                }
            }
            if (/^(?:[!~]|\+\+|\-\-)$/.test(p.text)) {
                if (!p.unary) {
                    if (o.type === STAMP && !o.unary || o.type === STRAP && /^(in|instanceof|of|as|from)$/.test(o.text)) {
                        o = p;
                        continue;
                    }
                    break;
                }
                o = p;
                continue;
            }
            o = p.prev;
            continue;
        }
        break;
    }
    while (o) {
        var p = o.prev;
        if (!p || p.type !== LABEL) break;
        o = p;
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
    if (!o || o.type & ~(EXPRESS | SCOPED | QUOTED) && !o.needle) return o;
    var a = o;
    while (o && o.prev) {
        var p = o.prev;
        if (p.type === STAMP && p.needle || o.type === STAMP && o.needle) {
            o = p;
            continue;
        }
        if (p && p.type === STRAP && p.text === 'new') return p;
        if (o.type === SCOPED && o.entry === '(') {
            var h = getStrapHead(o);
            if (h) return h;
        }
        if (o.type === SCOPED && o.entry !== '{'
            || needhead_reg.test(o.text) && !o.isdigit
            || needfoot_reg.test(p.text) && !p.isdigit
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
        if (o.needle) {
            o = o.next;
            continue;
        }
        var n = null;
        var isExpress = o.isExpress;
        if (o.type & STRAP) {
            n = o;
            if (n.text === 'new') n = n.next;
            if (n.text === 'function') {
                while (n && (n.type !== SCOPED || n.entry !== '{')) n = n.next;
            }
            else if (n.text === 'class') {
                var n = o;
                while (n && !n.isClass) n = n.next;
                while (n && n.isClass) n = n.next;
            }
            else break;
            o = n;
            n = o && o.next;
        }
        else if (o.type & (EXPRESS | QUOTED | VALUE | SCOPED)) {
            n = o.next;
        }
        if (!n) break;
        if (n.type === SCOPED && (o.entry !== '{' || isExpress)
            || needfoot_reg.test(o.text) && !o.isdigit
            || n.needle || n.type === EXPRESS && needhead_reg.test(n.text)
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
    var scoped = [], funcbody = scoped, argscope = scoped, thisscope = scoped, labelused = used;
    funcbody.isroot = true;
    scoped.body = parsed;
    scoped.isfunc = true;
    var dec = function (map, o) {
        var kind = o.text;
        o = o.next;
        while (o && o.type === STRAP) o = o.next;
        var [declared, used0, o0, skiped] = getDeclared(o, kind);
        if (o0 !== o) {
            mergeTo(used, used0);
            while (skiped.length) {
                var o1 = run(skiped[0], 0);
                let sindex = skiped.indexOf(o1);
                if (sindex < 0) break;
                skiped.splice(0, sindex + 1);
            }
            mapDeclared(map, declared);
        }
        return o0;
    };
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
                if (!p || p.type & (STRAP | STAMP) || p.type !== EXPRESS && !p.isExpress) {
                    let n = o.next;
                    if (n && n.type & (EXPRESS | VALUE)) {
                        n.equal = o;
                    }
                }
                else if (p.type & (EXPRESS | VALUE)) {
                    p.equal = o;
                }
                else if (o.text === '=' && p.type === SCOPED && !p.isprop) {
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
                    if (!o.short) break;
                    switch (o.text) {
                        case "yield":
                            scoped.yield = false;
                            break;
                        case "await":
                            scoped.await = false;
                            break;
                    }
                case VALUE:
                    if (o.isdigit || /^(null|false|true)$/.test(o.text)) break;
                case EXPRESS:
                    if (needhead_reg.test(o.text)) break;

                    var prev = o.prev;
                    if (prev) {
                        if (prev.needle || prev.type === EXPRESS && needfoot_reg.test(prev.text)) break;
                        if (prev.type === STRAP && prev.istype) {
                            var o0 = dec(lets, prev);
                            if (o0 && o0.type === SCOPED && o0.entry === "(") {
                                isFunction = true;
                                isScope = true;
                                break;
                            }
                            if (o === o0) o = o.next;
                            else o = o0;
                            continue;
                        }
                    }
                    if (o.next && o.next.type === STAMP && o.next.text === "=>") {
                        isScope = true;
                        isArrow = true;
                        isAsync = o.prev?.type === STRAP && o.prev.text === 'async';
                    }
                    else {
                        var u = o.text;
                        if (/^\.\.\./.test(u)) u = u.slice(3);
                        var u = u.replace(/^([^\.\[\?\s\:]*)[\s\S]*$/, '$1');
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
                    name = name.replace(/\s*\:$/, '');
                    vars[name] = true;
                    o.kind = "label";
                    saveTo(labelused, name, o);
                    break;

                case STRAP:
                    var s = o.text;
                    var m = null;
                    switch (s) {
                        case "break":
                        case "continue":
                            if (o.isend) break;
                            o = o.next;
                            if (o?.type === EXPRESS) {
                                saveTo(labelused, o.text, o);
                            }
                            break;
                        case "return":
                            if (!funcbody.return) funcbody.return = [];
                            funcbody.return.push(o);
                            break;
                        case "await":
                            funcbody.await = true;
                            if (!funcbody.async) saveTo(used, 'await', o);
                            break;
                        case "yield":
                            funcbody.yield = true;
                            if (!funcbody.aster) saveTo(used, 'yield', o);
                            break;
                        case "as":
                        case "from":
                            break;
                        case "let":
                        case "const":
                            m = lets;
                            if (!o.next || o.next.type & ~(EXPRESS | STRAP) && (o.next.type !== SCOPED || o.next.entry === "(")) {
                                o.type = EXPRESS;
                                continue;
                            }
                        case "import":
                        case "use":
                            if (!o.next || o.next.type === QUOTED) break;
                            if (o.next.needle) {
                                o.type = EXPRESS;
                                continue;
                            }
                        case "var":
                            m = m || vars;
                            var o0 = dec(m, o);
                            if (o0 === o) o = o.next;
                            else o = o0;
                            continue loop;
                        case "static":
                        case "function":
                        case "fn":
                        case "func":
                            isFunction = true;
                            var op = o.prev;
                            if (op?.type === STRAP && op.text === 'async') {
                                isAsync = true;
                                o.isExpress = op.isExpress;
                            }
                            function_obj = o;
                            if (o.next.type === STAMP) {
                                isAster = true;
                                o = o.next;
                                o.isExpress = op?.isExpress;
                            }
                        case "catch":
                            if (s === 'catch') isCatch = true;
                        case "class":
                        case "interface":
                            if (/^interface|class$/.test(s)) isClass = true;
                            if (!o.isExpress) {
                                o = o.next;

                                if (o.type === EXPRESS) {
                                    vars[o.text] = true;
                                    o.kind = isFunction ? 'function' : 'class';
                                    saveTo(used, o.text, o);
                                    o = o.next;
                                    if (o?.type === ELEMENT) o = o.next;
                                }
                            }
                            isScope = true;
                            break;
                        case "for":
                            o = o.next;
                            if (o.type !== SCOPED && o.text === 'await') {
                                if (o.type === EXPRESS) o.type = STRAP;
                                funcbody.await = funcbody.async = true;
                                o = o.next;
                            }
                            isScope = true;
                            break;

                    }
                    break;
                case SCOPED:
                    if (o.entry === "(") {
                        var prev = o.prev;
                        if (o.next && o.next.type === STAMP && o.next.text === "=>") {
                            isArrow = true;
                            isScope = true;
                            if (prev?.type === STRAP && prev.text === 'async') {
                                isAsync = true;
                            }
                        }
                        else if (prev?.isprop) {
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
                    else if (o.brace && !o.isObject) {
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
                var _labelused = labelused;
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
                    labelused = used;
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
                else while (o && (o.type !== SCOPED || o.entry === '[')) {
                    o = o.next;
                    if (o && o.type === EXPRESS) {
                        var tack = o.text.replace(/[\.\[][\s\S]*$/, '');
                        saveTo(used, tack, o);
                        if (o.prev && o.prev.type === STRAP && o.prev.text === 'extends') continue;
                        lets[tack] = true;
                        o.kind = isFunction ? 'function' : 'class';
                        o = o.next;
                    }
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
                else if (o.type === SCOPED && o.brace) {
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
                    scoped.arraw = o;
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
                            || EXPRESS === o.type && !needfoot_reg.test(o.text)) {
                            if ((VALUE | QUOTED | PROPERTY | LABEL) & next.type) break;
                            if (EXPRESS === next.type && !/^[\.\[]/.test(next.text)) break;
                            if (next.type === SCOPED && next.brace) break;
                            if (next.type === STRAP && !next.isExpress) break;
                        }
                        o = next;
                    } while (o);
                }
                var map = isFunction ? vars : lets;
                var keepscope = !!scoped.body || !!scoped.head || isArrow;
                if (!keepscope) for (var k in map) {
                    keepscope = true;
                    break;
                }
                if (keepscope) {
                    var envs = Object.create(null);
                    var caps = Object.create(null);
                    for (var k in used) {
                        if (!(k in map)) {
                            envs[k] = true;
                            for (var u of used[k]) {
                                saveTo(_used, k, u);
                            }
                        }
                        else {
                            caps[k] = used[k];
                        }
                    }
                    scoped.caps = caps;
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
                    funcbody = _funcbody;
                    labelused = _labelused;
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
    scoped.caps = used;
    var envs = Object.create(null);
    for (var u in used) {
        if (!(u in vars)) {
            if (!/^(this|arguments)$/.test(u)) envs[u] = true;
        }
    }
    if (vars.yield) scoped.yield = false;
    if (vars.await) scoped.await = false;
    y: if (scoped.yield !== false && envs.yield) {
        for (var s of scoped) if (s.isfunc && s.envs.yield) break y;
        for (var s of used.yield) if (s.kind || s.isprop || hasEqual(s)) break y;
        used.yield.forEach(o => o.type = STRAP);
        scoped.yield = scoped.aster = true;
        delete envs.yield;
        delete used.yield;
    }
    a: if (scoped.await !== false && envs.await) {
        for (var s of scoped) if (s.isfunc && s.envs.await) break a;
        for (var s of used.await) if (s.kind || s.isprop || hasEqual(s)) break a;
        used.await.forEach(o => o.type = STRAP);
        scoped.await = scoped.async = true;
        delete envs.await;
        delete used.await;
    }
    if (used.yield) {
        used.yield.forEach(o => { if (o.type === STRAP) o.type = EXPRESS });
    }
    if (used.await) {
        used.await.forEach(o => { if (o.type === STRAP) o.type = EXPRESS });
    }
    delete envs.eval;
    delete envs.new;
    scoped.envs = envs;
    return scoped;
};
var hasEqual = function (s) {
    while (s) {
        if (s.equal) return true;
        var sn = s.next;
        if (sn?.type === STRAP) {
            if (sn.text === 'of') return true;
            if (sn.text === "in") {
                var q = s.queue;
                if (q.entry === '(') {
                    var qp = q.prev;
                    if (qp.type === STRAP && qp.text === 'await') qp = qp.text;
                    if (qp.type === STRAP && qp.text === 'for') return true;
                }
            }
        }
        var sp = s.prev;
        if (sp?.type === STRAP && sp.text === 'as') return true;
        s = s.queue;
    }
    return false;
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
        var next = o.next;
        if (next?.needle) {
            o = next.next;
            continue;
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
            case SCOPED:
                var foot = snapExpressFoot(o);
                if (!prop) prop = declared["..."] ? declared["..."][1] - index : `[${index}]`;
                if (foot === o) {
                    var [d, u, _, s] = getDeclared(o.first, kind, o);
                    while (s.length) skiped.push.apply(skiped, s.splice(0, 1024));
                    mergeTo(used, u);
                    if (d.length || d.attributes.length) declared.push(d);
                    d.entry = o.entry;
                    o.kind = kind;
                    attributes.push([prop, d]);
                    o = o.next;
                    break;
                }
                else {
                    var s = [];
                    while (foot !== o) {
                        s.push(o);
                        o = o.next;
                    }
                    s.push(foot);
                    skiped.push(...s);
                    o = o.next;
                    attributes.push([prop, s]);
                    break;
                }
            case STAMP:
                var next = o.next;
                if (o.text === "*" && next) {
                    if (next.type === STRAP && next.text === 'as') {
                        o = next.next;
                        prop = "*";
                        continue;
                    }
                }
                if (o.text === '...') {
                    o = o.next;
                    continue;
                }
                break;
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
                var n = o;
                var k = o.text;
                var isrest = /^\.\.\./.test(k);
                if (isrest) k = k.slice(3);
                var isdec = !/[\.\[]/.test(k);
                if (k && isdec) declared.push(k);
                if (!isrest) {
                    var prev = o.prev;
                    if (prev?.type === STAMP && prev.text === '...') {
                        isrest = true;
                    }
                }
                if (!isrest && !prop) {
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
                var f = snapExpressFoot(o);
                if (k) saveTo(used, k, o);
                var s = [o];
                while (o !== f) o = o.next, s.push(o);
                if (isrest) declared["..."] = [s, index];
                else attributes.push([prop, s]);
                o.kind = kind;
                o = f.next;
                break;
            default:
                console.log(createString(pickSentence(queue)), o.text, o.type);
                throw new Error(i18n`代码结构异常`);
        }
        if (!o) break;
        switch (o.type) {
            case STRAP:
                if (/^(in|of)$/.test(o.text)) {
                    o = o.next;
                    break loop;
                }
                break loop;
            case STAMP:
                if (o.text === "=") {
                    o.prev.equal = o;
                    o = o.next;
                    var o0 = skipAssignment(o);
                    if (isrest) throw new Error(i18n`余集变量不能有默认值`);
                    attributes[attributes.length - 1].push(queue, o, o0);
                    while (o !== o0) {
                        skiped.push(o);
                        o = o.next;
                    }
                    o = o0;
                    break;
                }
                if (o.text === '*') {
                    o = o.next;
                    break;
                }
                break;
            case EXPRESS:
                if (o.text === '?') o = o.next;
                break;
        }
        if (o?.type === STAMP) {
            while (o?.istype) {
                o = o.next;
            }
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
var { uncode } = require("../basic/strings");
var saveTo = function (used, k, o) {
    k = uncode(k);
    if (!(used[k] instanceof Array)) used[k] = [];
    used[k].push(o);
    o.tack = k;
};

var mergeTo = function (used, used0) {
    for (var k in used0) {
        var v = used0[k];
        if (!used[k]) used[k] = [];
        var u = used[k];
        for (var s of v) {
            u.push(s);
        }
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
    if (prev.type === STAMP && /^[,;]/.test(prev.text)) return true;
    if (next.type === STAMP && /^[,;]/.test(next.text)) return true;
    if (prev.type === EXPRESS && needfoot_reg.test(prev.text)) return true;
    if (next.type === EXPRESS && /^[\.\[]/.test(next.text)) return true;
};
var getSemicolonBetween = function (prev, next) {
    if (next.type === PROPERTY) return ";";
    if (next.type === STAMP && next.text === "*" && next.next && next.next.type === PROPERTY) return ";";
    if (
        (EXPRESS | VALUE | QUOTED) & prev.type
        || prev.type === STAMP && /^(\+\+|\-\-)$/.test(prev.text)
        || prev.type === SCOPED && (prev.isExpress || prev.isObject)
    ) {
        if ((EXPRESS | VALUE | QUOTED | LABEL) & next.type) return ";";
        if (next.type === STRAP) {
            if (!/^(in|of|extends|implements|instanceof|as|is|from)$/.test(next.text)) return ";";
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
    return getSemicolonBetween(prev, next) === ';' ? ';' : '';
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
var rehead = function (list) {
    for (var cx = 0, dx = list.length; cx < dx; cx++) {
        var o = list[cx];
        if (o.type & (COMMENT | SPACE)) {
            o.prev = null;
            continue;
        }
        list.first = o;
        break;
    }
    for (var cx = list.length - 1; cx >= 0; cx--) {
        var o = list[cx];
        if (o.type & (COMMENT | SPACE)) {
            o.last = null;
            continue;
        }
        list.last = o;
        break;
    }
    return list;
}
var setqueue = function (list, queue = list) {
    /**
     * @type {PropertyDescriptor}
     */
    var v = { value: queue, configurable: true, enumerable: false };
    for (var o of list) delete o.queue, Object.defineProperty(o, 'queue', v);
};
var createString = function (parsed) {
    var autospace = parsed.autospace !== false;
    var keepspace = parsed.keepspace !== false;
    var patchspace = autospace && keepspace;
    var helpcode = parsed.helpcode;
    var express_reg = parsed.program?.express_reg;
    if (typeof helpcode === 'string') {
        if (express_reg && !express_reg.test(helpcode.replace(/[\/\||,]/g, ''))) throw new Error(i18n`辅助级别异常：` + debug);
        if (/[\/\|,]/i.test(helpcode)) var debug = `(?:${helpcode.replace(/[\/\|,]/g, '|')})`;
        else debug = helpcode;
    }
    else debug = '';
    var helpreg = debug ? new RegExp(/^\/[\/\*]\s*/.source + debug + /\:?\s*\<\!--/.source, "i") : /^\/[\/\*]\s*\<\!--/;
    var lasttype = SPACE;
    var uncomment = parsed.comment === false;
    var result = [], cacheresult, finalresult = result;
    var helpcolor = parsed.keepcolor === false;
    var intag = false;
    var run = (o, i, a) => {
        var prev = o.prev;
        a: if (prev && lasttype !== SPACE && patchspace && ~(SPACE | COMMENT | STAMP | PIECE | SCOPED) & o.type) {
            if ((QUOTED | SCOPED | STRAP | LABEL | COMMENT | ELEMENT | PROPERTY) & lasttype
                || prev.type === STAMP && !prev.unary && !prev.needle && !prev.isprop
            ) {
                if (intag || prev.type === ELEMENT && o.type === ELEMENT) break a;
                if ((o.type & ~(EXPRESS | PROPERTY) || !needhead_reg.test(o.text)) && (!prev.tag && !o.tag || prev.type === STAMP || o.type === STAMP)) {
                    result.push(" ");
                    lasttype = SPACE
                }
            }
        }
        switch (o.type) {
            case COMMENT:
                // 每一次要远行，我都不得不对自己的物品去粗取精。取舍之间，什么重要，什么不是那么重要，都有了一道明显的分界线。
                if (uncomment) break;
                var tmp = o.text, opentmp = false;
                if (helpreg.test(tmp)) {
                    opentmp = true;
                    if (/^\/\*/.test(tmp)) opentmp = 2;
                    tmp = tmp.replace(helpreg, '');
                    cacheresult = [];
                    result = cacheresult;
                    result.push("/* [[ 开发辅助代码: */");
                }
                if (/--\!?\>\s*(?:\*\/)?$/.test(tmp) && result !== finalresult) {
                    if (!opentmp) tmp = tmp.replace(/^\/[\/\*]\s*/, '');
                    tmp = tmp.replace(/\s*--\!?\>\s*(?:\*\/)?$/, "");
                    if (tmp) {
                        result.push(tmp);
                    }
                    result.push("/* ]] */");
                    opentmp = true;
                    if (helpcode && cacheresult) finalresult = finalresult.concat(cacheresult), cacheresult = [];
                    result = finalresult;
                }
                else if (opentmp) {
                    if (opentmp === 2) tmp = tmp.replace(/\s*\*\/$/, '');
                    if (tmp) result.push("\r\n", tmp);
                }
                if (keepspace && !opentmp) {
                    if (patchspace && lasttype !== SPACE && lasttype !== EXPRESS) result.push(" ");
                    result.push(tmp);
                    if (/^\/\//.test(tmp)) lasttype = COMMENT;
                }
                return;
            case SPACE:
                if (!autospace || keepspace || lasttype === COMMENT) {
                    result.push(o.text);
                    lasttype = SPACE;
                    break;
                }
                var b = breakSpace(o);
                if (b) result.push(b);
                break;
            case ELEMENT:
                result.push(o.entry);
                result.push(o.tag);
                if (o.attributes) {
                    var _intag = intag;
                    intag = 0;
                    var attributes = o.attributes;
                    var needvalue = false;
                    while (intag < attributes.length) {
                        var a = attributes[intag++];
                        if (a.type === STAMP && a.text === "=") {
                            run(a);
                            needvalue = true;
                        }
                        else {
                            if (a.type === PIECE && !a.text) continue;
                            if (!needvalue && !/\s$/.test(result[result.length - 1]) && a.type !== ELEMENT && (a.type & ~(PIECE | SPACE) || !/^[\=\s]/.test(a.text))) result.push(" ");
                            run(a);
                            needvalue = a.type === PIECE && /[\=]$/.test(a.text);
                        }
                    }
                    intag = _intag;
                    if (o.short && attributes.length > 0 && lasttype & ~(SPACE | QUOTED)) {
                        if (!o.istype && !/[\s'"]$/.test(result[result.length - 1])) result.push(' ');
                    }
                }
                if (o.closed) {
                    if (!o.short) {
                        result.push(o.tag_leave);
                        if (o.length) {
                            o.forEach(run);
                        }
                        result.push(o.tag_entry, o.tag, o.leave);
                    }
                    else if (o.tag && o.leave === '/>') {
                        if (/^(input|img|meta|br|hr|link|area|base|basefont|param|col|frame|embed|keygen)$/i.test(o.tag)) {
                            result.push('/>');
                        }
                        else result.push(`></`, o.tag, '>');
                    }
                    else result.push(o.leave);
                }
                else {
                    if (o.tag_leave) result.push(o.tag_leave);
                    if (o.length) o.forEach(run);
                }
                break;
            case QUOTED:
                if (!o.length && o.text) {
                    if (helpcolor) o.text = color.transform(o.text);
                    result.push(o.text);
                    break;
                }
            case SCOPED:
                var prev = o.prev;
                if (patchspace && !intag && prev && o.type !== QUOTED && (lasttype === STAMP && !prev.unary && !prev.needle
                    || lasttype & ~(SPACE | STAMP | COMMENT) && o.brace
                    || lasttype === STRAP && !/^(this|arguments|import)$/.test(prev.text)
                )) result.push(" ");
                result.push(o.entry);
                if (o.length > 0) {
                    var fillspace = patchspace && lasttype !== PIECE && !intag;
                    if (o.brace && o[0].type !== SPACE) {
                        if (fillspace) {
                            result.push(" ");
                        }
                    }
                    lasttype = SPACE;
                    o.forEach(run);
                    if (o.prev && o.prev.type === STRAP && /^for$/.test(o.prev.text));
                    else if (/^[,;]$/.test(result[result.length - 1]) && autospace && !keepspace) {
                        var last = o.last;
                        var lp = last && last.prev;
                        if (!lp) result.pop();
                        else {
                            var lpp = lp.prev;
                            if (lp.type === STRAP && lp.text === 'else' || lp.type === SCOPED && lpp && lpp.type === STRAP && /^(while|if|with|for)/.test(lpp.text));
                            else result.pop();
                        }
                    }
                    if (o.brace && o[o.length - 1].type !== SPACE) {
                        if (fillspace) result.push(" ");
                    }
                }
                result.push(o.leave);
                break;
            default:
                if (o && typeof o === "object") {
                    if (intag || o.needle || o.type & (EXPRESS | PROPERTY) && (needhead_reg.test(o.text) || lasttype & EXPRESS && needfoot_reg.test(prev?.text))) {
                        if (prev?.isdigit && !/^0[\dxbo]|[mni]$|[e\.]/.test(prev.text) && lasttype & ~(SPACE | COMMENT)) result.push(" ");
                    }
                    else if ((STRAP | EXPRESS | PROPERTY | COMMENT | VALUE) & lasttype && (STRAP | EXPRESS | PROPERTY | VALUE | LABEL) & o.type) {
                        if (autospace || o.prev?.isdigit) result.push(" ");
                    }
                    else if (o.prev && o.type === STAMP && !/^[,;]/.test(o.text)) {
                        if (result[result.length - 1] === " " || (lasttype === PROPERTY || !o.isExpress && o.prev && o.prev.type !== LABEL) && o.text === ':') { }
                        else if (lasttype === STAMP) {
                            var prev = o.prev;
                            if (autospace) if (!prev.unary || /[\+\-]$/.test(prev.text) && prev.text === o.text) result.push(" ");
                        }
                        else if (/^(\+\+|\-\-)$/.test(o.prev.text) && o.prev.prev) {
                            if (o.unary) {
                                var prev_prev = o.prev.prev;
                                if (
                                    prev_prev.type === STRAP && !prev_prev.isExpress
                                    || prev_prev.type & (EXPRESS | VALUE)
                                ) result.push(";");
                            }
                        }

                        else if (!/^(\+\+|\-\-)$/.test(o.text) || o.prev && o.prev.type & (STAMP | STRAP)) {
                            if (patchspace && lasttype !== SPACE && !o.needle) result.push(" ");
                        }
                    }
                    if (o.isdigit) {
                        if (+o.text < 0 && /\-$/.test(result[result.length - 1])) {
                            result.push(" ");
                        }
                    }
                    result.push(o.text);
                }
                else {
                    result.push(o);
                }
        }
        lasttype = o.type;
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
                unshort(u);
                u.text = text;
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
    if (a.type === STAMP && (a.unary || !/^(;|\+\+|\-\-)$/.test(a.text))) return true;
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
    if (previ < 0) previ = 0, prev = null;
    if (nexti < 0) nexti = queue.length, next = null;
    else nexti++;
    var changedargs = queue.slice(previ, nexti);
    var pp = prev && prev.prev;
    var nn = next && next.next;
    relink(changedargs);
    if (pp) changedargs.first.prev = pp, pp.next = changedargs.first;
    else queue.first = changedargs.first;
    if (nn) changedargs.last.next = nn, nn.prev = changedargs.last;
    else queue.last = changedargs.last;
    setqueue(args, queue);
    return res;
};
var remove = function (o, end) {
    var q = o.queue;
    var i = q.indexOf(o);
    var length = 1;
    if (arguments.length === 2) {
        end = q.indexOf(end, i) + 1;
        if (end < 0) end = i;
        length = end - i;
    }
    if (i >= 0) splice(q, i, length);
};
var replace = function (o, ...args) {
    var queue = o.queue;
    var i = queue.indexOf(o);
    if (i >= 0) splice(queue, i, 1, ...args);
};
var isEval = function (o) {
    if (o.entry === "[") {
        var h = snapExpressHead(o);
        return o !== h;
    }
    else if (o.entry === '(') {
        var h = snapExpressHead(o);
        return o === h;
    }
    return true;
};
var canbeTemp = function (body, strip = false) {
    var cx = 0, dx = body.length - 1;
    while (cx < dx) {
        if (body[cx].type & (SPACE | COMMENT)) {
            cx++;
            continue;
        }
        if (body[dx].type & (SPACE | COMMENT)) {
            dx--;
            continue;
        }
        break;
    }
    if (body[cx] !== body[dx]) return false;
    var o = body[cx];
    if (!o) return false;
    return o.type === EXPRESS && (strip || !/[\.\[]/.test(o.text)) || o.type === VALUE || o.type === QUOTED && !o.length;
};
var canbeDuplicate = function (body) {
    for (var b of body) {
        switch (b.type) {
            case EXPRESS:
                if (/[\.\[]/.test(b.text)) return false;
                break;
            case SCOPED:
                if (b.isObject || b.isClass || b.entry === '[') return false;
                if (!isEval(b)) return false;
                if (!canbeTemp(b)) return false;
                break;
            case QUOTED:
                if (b.length && !canbeTemp(b)) return false;
                break;
            case STAMP:
                if (/^(\+\+|\-\-)$|^([^\=\>\<]+|>>>?|<<)?\=$/.test(b.text)) return false;
                break;
            case ELEMENT: return false;
        }
    }
    return true;
};
var pickArgument = function (o) {
    var res = [];
    var t = o && o.prev, p = o;
    while (t && (t.type !== STAMP || !/^[,;]$/.test(t.text))) {
        if (p.isprop) {
            p = t.prev;
            if (!p || !p.isprop) break;
        }
        res.push(t);
        p = t;
        t = t.prev;
    }
    while (o && (o.type !== STAMP || !/^[,;]$/.test(o.text))) {
        res.push(o);
        var n = o;
        o = o.next;
        if (o && o.isprop) {
            if (!n.isprop) break;
        }
    }
    return res;
};
var pickSentence = function (o) {
    if (!o) return [];
    if (o && o.type & (SPACE | COMMENT) && o.prev) o = o.prev;
    if (o && o.type === STAMP && o.prev) o = o.prev;
    if (o.type === STRAP && /^(in|instanceof|as|of)$/.test(o.text) && o.prev) o = o.prev;
    var h = snapSentenceHead(o);
    var e = h;
    do {
        e = skipAssignment(e);
        if (!e || e.type !== STAMP || e.text !== ',') break;
        e = e.next;
    } while (e);
    var q = o.queue;
    if (q) {
        var qh = q.indexOf(h);
        var qe = e ? q.indexOf(e) : q.length;
        if (qh >= 0 && qe >= 0) return q.slice(qh, qe);
    }
    var res = [];
    do {
        res.push(h);
        h = h.next;
    } while (h !== e);
    return res;
};
var pickExpress = function (o) {
    o = snapExpressFoot(o);
    var e = snapExpressFoot(o);
    var os = [];
    do {
        os.push(o);
    }
    while (o && o !== e);
    return os;
};
var pickAssignment = function (n) {
    var e = skipAssignment(n);
    var values = [];
    while (n && n !== e) {
        values.push(n);
        n = n.next;
    }
    return values;
}
var insertBefore = function () {
    var [o] = arguments;
    var queue = this || o.queue;
    var index = queue.indexOf(o);
    var os = [].slice.call(arguments, 1);
    queue.splice.apply(queue, [index, 0].concat(os));
    var prev = o && o.prev, next = o;
    var desc = { value: queue, configurable: true, enumerable: false }
    for (var o of os) {
        if (prev) prev.next = o;
        else queue.first = o;
        o.prev = prev;
        Object.defineProperty(o, 'queue', desc);
        prev = o;
    }
    o.next = next;
    if (next) next.prev = o;
    else queue.last = o;
}
var insertAfter = function () {
    var [o] = arguments;
    var queue = this || o.queue;
    var index = queue.indexOf(o) + 1;
    var os = [].slice.call(arguments, 1);
    queue.splice.apply(queue, [index, 0].concat(os));
    var prev = o, next = o && o.next;
    var desc = { value: queue, configurable: true, enumerable: false }
    for (var o of os) {
        if (prev) prev.next = o;
        else queue.first = o;
        o.prev = prev;
        Object.defineProperty(o, 'queue', desc);
        prev = o;
    }
    o.next = next;
    if (next) next.prev = o;
    else queue.last = o;
};
var unshort = function (o, text) {
    insertBefore.call(o.queue, o, { text: text || o.text, short: false, isprop: true, type: PROPERTY }, { text: ':', type: STAMP });
    o.isprop = false;
    o.type = EXPRESS;
    delete o.short;
};
var getFuncBody = function (o) {
    var q = o.queue;
    while (q && !q.scoped?.isfunc) q = q.queue;
    return q;
};
var getBodyWith = function (o, k) {
    var q = o.queue;
    while (q && (!q.scoped || !q.scoped.caps[k])) q = q.queue;
    return q;
};


var createSeeker = function (o) {
    var os = pickExpress(o);
    var ids = [];
    for (var o of os) {
        if (o.type === SCOPED) {
            if (o.entry !== '[') break;
            var t = o.last;
            if (!t) throw new Error(i18n`格式错误`);
            if (t.type === QUOTED) {
                if (!t.length) {
                    if (/\.|^#/.test(t.text)) {
                        ids.push(`[${t.text}]`);
                    }
                    else {
                        ids.push(strings.decode(t.text));
                    }
                }
                else {
                    ids.push("...");
                    break;
                }
            }
        }
        else if (o.type === EXPRESS) {
            var t = o.text.replace(/^\.\.\./, "").replace(/^[^\.\[]+/, '');
            t.replace(/[^\.\[]+|\[[\s\S]*?\]/g, function (m) {
                if (/^\[/.test(m)) {
                    ids.push(strings.decode(m.slice(1, -1)));
                }
                else {
                    ids.push(m);
                }
            })
        }

    }
    return ids;
};

var patchArrawScope = function (arraw, origin) {
    var s1 = createScoped(arraw);
    if (s1.caps.this) {
        var s = getBodyWith(origin, 'this').scoped;
        s.caps.this.push(...s1.caps.this);
        s.insett = true;
    }
    if (s1.caps.arguments) {
        s.inseta = true;
        var s = getBodyWith(origin, 'arguments').scoped;
        s.caps.arguments.push(...s1.caps.arguments);
    };
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
    /*2048 */ELEMENT,
    number_reg,
    equal_reg,
    needhead_reg,
    needfoot_reg,
    unshort,
    skipAssignment,
    getDeclared,
    getBodyWith,
    getFuncBody,
    patchArrawScope,
    remove,
    createString,
    createScoped,
    createExpressList,
    snapSentenceHead,
    pickArgument,
    pickSentence,
    pickExpress,
    pickAssignment,
    snapExpressHead,
    snapExpressFoot,
    skipSentenceQueue,
    needBreakBetween,
    saveTo,
    isEval,
    rename,
    relink,
    rehead,
    createSeeker,
    setqueue,
    replace,
    canbeTemp,
    canbeDuplicate,
    skipFunction,
    isHalfSentence,
    splice,
    insertAfter,
    insertBefore,
    mergeTo
};