const [
    /*-1 */COMMENT,
    /* 0 */SPACE,
    /* 1 */STRAP,
    /* 2 */STAMP,
    /* 3 */VALUE,
    /* 4 */QUOTED,
    /* 5 */PIECE,
    /* 6 */EXPRESS,
    /* 7 */SCOPED,
    /* 8 */LABEL,
    /* 9 */PROPERTY,
] = new Array(20).fill(0).map((_, a) => a - 1);
var number_reg = /^[\+\-]?(0x[0-9a-f]+|0b\d+|0o\d+|(\d*\.\d+|\d+\.?)(e[\+\-]?\d+|[mn])?)$/i;
var skipAssignment = function (o) {
    var needpunc = false;
    var o0 = o;
    var qcount = 0;
    loop: while (o) switch (o.type) {
        case STAMP:
            switch (o.text) {
                case ",":
                case ";":
                    break loop;
                case "++":
                case "--":
                    o = o.next;
                    break;
                case "!":
                case "~":
                case "+":
                case "-":
                    o = o.next;
                    needpunc = false;
                    break;
                case "?":
                    qcount++;
                    needpunc = false;
                    o = o.next;
                    break;
                case ":":
                    qcount--;
                    if (qcount < 0) break loop;
                    needpunc = false;
                    o = o.next;
                    break;
                default:
                    if (/^[!~\+\-]+$/.test(o.text)) {
                        needpunc = false;
                        o = o.next;
                        break;
                    }
                    if (!needpunc) break loop;
                    needpunc = false;
                    o = o.next;
            }
            break;
        case SCOPED:
            if (needpunc && o.entry === "{") break loop;
            o = o.next;
            needpunc = true;
            break;
        case EXPRESS:
            if (/^\.|\.$/.test(o.text)) {
                o = o.next;
                break;
            }
            else if (/^\[/.test(o.text)) {
                needpunc = true;
                o = o.next;
                break;
            }
        case VALUE:
        case QUOTED:
            if (needpunc) break loop;
            needpunc = true;
            o = o.next;
            break;
        case STRAP:
            if (needpunc) {
                if (!/^(in|instanceof)$/.test(o.text)) break loop;
                o = o.next;
                needpunc = false;
            }
            else if (o.text === "class") {
                o = o.next;
                while (o && !o.isClass) o = o.next;
                while (o && o.isClass) o = o.next;
                needpunc = true;
                break;
            }
            else if (o.text === "function") {
                o = o.next;
                if (o && o.type === STAMP) o = o.next;
                if (o && o.type === EXPRESS) o = o.next;
                if (o) o = o.next;
                if (o) o = o.next;
                needpunc = true;
                break;
            }
            else {
                o = o.next;
                needpunc = false;
            }
            break;
        default:
            console.log(o);
            throw new Error('代码结构异常！');
            o = o.next;
    }
    return o;
};
var createScoped = function (parsed) {
    var used = Object.create(null); var vars = Object.create(null), lets = vars;
    var scoped = [], funcbody = scoped;
    scoped.isfunc = true;
    var run = function (o, id) {
        loop: while (o) {
            var isCatch = false;
            var isFunction = false;
            var isScope = false;
            var isArrow = false;
            var isDeclare = false;
            var isYield = false;
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
                    if (number_reg.test(o.text)) break;
                case EXPRESS:
                    if (o.prev && o.prev.type === EXPRESS) {
                        if (/\.$/.test(o.prev.text)) break;
                    }
                    var u = o.text;
                    if (/^\.\.\./.test(u)) u = u.slice(3);
                    var u = u.replace(/^([^\.\[]*)[\s\S]*$/, '$1');
                    if (!u) break;
                    if (u === 'yield') funcbody.yield = false;
                    if (o.next && o.next.type === STAMP && o.next.text === "=>") {
                        isScope = true;
                        isArrow = true;
                    }
                    else {
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
                            funcbody.return = true;
                            break;
                        case "await":
                            funcbody.async = funcbody.await = true;
                            break;
                        case "yield":
                            if (!funcbody.yield) {
                                var next = o.next;
                                if (next) {

                                    if (next.type === STAMP && !/[~!,;:]+$/.test(next.text)
                                        || next.type === STRAP && /in|of|as|from|instanceof/.test(next.text)
                                        || next.type === EXPRESS && /^\./.test(next.text)
                                    ) {
                                        funcbody.yield = false;
                                    }
                                }
                                saveTo(used, 'yield', o);
                            }
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
                            Object.assign(m, declared);
                            continue loop;
                        case "function":
                            isFunction = true;
                            if (o.next.type === STAMP) {
                                isYield = true;
                                o = o.next;
                            }
                        case "catch":
                            isCatch = true;
                        case "class":
                            if (!o.isExpress) {
                                o = o.next;

                                if (o.type === EXPRESS) {
                                    vars[o.text] = true;
                                    isDeclare = true;
                                    o.kind = isFunction ? 'function' : 'class';
                                    saveTo(used, o.text, o);

                                    o = o.next;
                                }
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
                        }
                        else if (o.prev && (o.prev.type === PROPERTY || o.prev.isprop)) {
                            isFunction = true;
                            isScope = true;
                            var pp = o.prev.prev;
                            if (pp && pp.type === STAMP && pp.isprop) {
                                isYield = true;
                            }
                        }
                        else {
                            run(o.first);
                        }
                    }
                    else if (o.entry === "{") {
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
                        scoped.yield = isYield;
                    }
                    scoped.isfunc = true;
                    isFunction = true;
                    funcbody = scoped;
                } else {
                    vars = _vars;
                    scoped.lets = lets;
                    scoped.used = used;
                }
                if (isArrow);
                else if (o.isExpress && o.type !== SCOPED && !isDeclare) {
                    o = o.next;
                    if (o.type === EXPRESS) {
                        vars[o.text] = true;
                        o.kind = isFunction ? 'function' : 'class';
                        saveTo(used, o.text, o);
                        o = o.next;
                    }
                }
                if (!isFunction) while (o.type !== SCOPED) {
                    // if (o.next && o.next.type === STAMP && o.next.text === "=>") break;
                    o = run(o, 0);
                    o = o.next;
                    if (!o) break loop;
                }

                if (o.entry === "(") {
                    o.isExpress = isExpress;
                    if (isFunction || isCatch) {
                        var [declared, used0, o0, skiped] = getDeclared(o.first, 'argument');
                        mergeTo(used, used0);
                        while (skiped.length) {
                            var o1 = run(skiped[0], 0);
                            var sindex = skiped.indexOf(o1);
                            if (sindex < 0) break;
                            skiped.splice(0, sindex + 1);
                        }
                        Object.assign(isCatch ? lets : vars, declared);
                    }
                    else {
                        run(o.first);
                    }
                    o = o.next;
                    if (!o) break;
                    if (o.type === STAMP && o.text === "=>") o = o.next;
                }
                else if (isArrow) {
                    vars[o.text] = true;
                    o.kind = 'argument';
                    saveTo(used, o.text, o);
                    o = o.next.next;
                }
                if (!o) break;
                if (o.type === SCOPED && o.entry === "{") {
                    o.isExpress = isExpress;
                    run(o.first);
                }
                else {
                    do {
                        if (o.type === STAMP && o.text === ";") break;
                        o = run(o, 0);
                        var next = o.next;
                        if (!next) break;
                        var e = o;
                        if (o.type === STAMP && /^(\+\+|\-\-)$/.test(o.text) || ~[VALUE, QUOTED, SCOPED].indexOf(o.type) || EXPRESS === o.type && !/\.$/.test(o.text)) {
                            if (~[VALUE, QUOTED, PROPERTY, LABEL].indexOf(next.type)) break;
                            if (EXPRESS === next.type && !/^\./.test(next.text)) break;
                            if (next.type === SCOPED && next.entry === "{") break;
                        }
                        o = next;
                    } while (o);
                }
                var map = isFunction ? vars : lets;
                var keepscope = false;
                for (var k in map) {
                    keepscope = true;
                    break;
                }
                if (keepscope) {
                    for (var k in used) {
                        if (!(k in map)) {
                            for (var u of used[k]) {
                                saveTo(_used, k, u);
                            }
                        }
                    }
                    _scoped.push(scoped);
                }
                else {
                    mergeTo(_used, used);
                    if (scoped.length) _scoped.push(scoped);
                }
                if (vars.this) {
                    delete vars.this;
                    delete vars.arguments;
                }
                if (_scoped.isfunc && !funcbody.yield) {
                    if (used.yield) _scoped.yield = false;
                    funcbody = _scoped;
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
    scoped.envs = envs;
    return scoped;
};
var getDeclared = function (o, kind) {
    var declared = Object.create(null), used = Object.create(null); var skiped = [];
    loop: while (o) {
        while (o && o.type === STAMP && o.text === ',') o = o.next;
        if (!o) break;
        if (o.isprop) {
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
                        continue;
                    }
                }
            case PROPERTY:
                if (o.next) {
                    if (o.next.type === STAMP && o.next.text === ":" || o.next.type === STRAP && o.next.text === "as") {
                        o = o.next.next;
                        continue;
                    }
                }
            case STRAP:
            case VALUE:
            case EXPRESS:
                var n = o.text.replace(/^\.\.\.|\.\.\.$/g, '');
                declared[n] = true;
                o.kind = kind;
                saveTo(used, n, o);
                o = o.next;
                break;
            case SCOPED:
                var [d, u, _, s] = getDeclared(o.first, kind);
                while (s.length) skiped.push.apply(skiped, s.splice(0, 1024));
                mergeTo(used, u);
                Object.assign(declared, d);
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
                    o = o.next;
                    var o0 = skipAssignment(o);
                    do {
                        skiped.push(o);
                        o = o.next;
                    } while (o !== o0);
                    o = o0;
                    break;
                }
                break;
        }
        if (!o) break;
        if (o.type !== STAMP) break;
        if (o.text !== ',') break;
    }
    return [declared, used, o, skiped];
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


module.exports = {
    /*-1 */COMMENT,
    /* 0 */SPACE,
    /* 1 */STRAP,
    /* 2 */STAMP,
    /* 3 */VALUE,
    /* 4 */QUOTED,
    /* 5 */PIECE,
    /* 6 */EXPRESS,
    /* 7 */SCOPED,
    /* 8 */LABEL,
    /* 9 */PROPERTY,
    number_reg,
    skipAssignment,
    getDeclared,
    createScoped,
    saveTo,
    mergeTo
};