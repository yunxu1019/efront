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
var createScoped = function (parsed, wash) {
    var used = Object.create(null); var vars = Object.create(null), lets = vars;
    var scoped = [], funcbody = scoped;
    scoped.body = parsed;
    scoped.isfunc = true;
    var run = function (o, id) {
        loop: while (o) {
            var isCatch = false;
            var isFunction = false;
            var isScope = false;
            var isArrow = false;
            var isDeclare = false;
            var isYield = false;
            var isClass = false;
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
                            mapDeclared(m, declared);
                            continue loop;
                        case "function":
                            isFunction = true;
                            if (o.next.type === STAMP) {
                                isYield = true;
                                o = o.next;
                            }
                        case "catch":
                            if (s === 'catch') isCatch = true;
                        case "class":
                            if (s === 'class') isClass = true;
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
                        case "for":
                            o = o.next;
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
                    if (isClass) {
                        lets.super = true;
                    }
                }
                if (isArrow);
                else while (o && o.isExpress && o.type !== SCOPED) {
                    o = o.next;
                    if (o && o.type === EXPRESS) {
                        lets[o.text] = true;
                        o.kind = isFunction ? 'function' : 'class';
                        saveTo(used, o.text, o);
                        o = o.next;
                    }
                    if (isFunction) break;
                }
                if (!isFunction) while (o.type !== SCOPED) {
                    // if (o.next && o.next.type === STAMP && o.next.text === "=>") break;
                    o = run(o, 0);
                    o = o.next;
                    if (!o) break loop;
                }

                if (o.entry === "(") {
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
                    scoped.body = o;
                    o.isExpress = isExpress;
                    run(o.first);
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
                var keepscope = !!scoped.body;
                if (!keepscope) for (var k in map) {
                    keepscope = true;
                    break;
                }
                if (keepscope) {
                    var envs = Object.create(null);
                    for (var k in used) {
                        if (!(k in map)) {
                            envs[u] = true;
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
    var declared = [], used = Object.create(null); var skiped = [];
    var prop = null;
    var attributes = [];
    var index = 0;
    loop: while (o) {
        while (o && o.type === STAMP && o.text === ',') o = o.next, index++;
        if (!o) break;
        if (o.isprop) {
            prop = createString([o]);
            if (/^(['"`])[\s\S]*\1$/.test(prop)) {
                prop = `[${prop}]`;
            }
            else if (number_reg.test(prop)) prop = `[${prop}]`;
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
            case STRAP:
            case VALUE:
            case EXPRESS:
                var n = o.text.replace(/^\.\.\.|\.\.\.$/g, '');
                declared.push(n);
                if (n !== o.text) declared["..."] = n;
                else attributes.push([prop || `[${index}]`, n]);
                o.kind = kind;
                saveTo(used, n, o);
                o = o.next;
                break;
            case SCOPED:
                var [d, u, _, s] = getDeclared(o.first, kind);
                while (s.length) skiped.push.apply(skiped, s.splice(0, 1024));
                mergeTo(used, u);
                declared.push(d);
                attributes.push([prop || `[${index}]`, d]);
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
        prop = null;
    }
    declared.attributes = attributes;
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

var needBreak = function (prev, next) {
    if (!prev || !next) return;
    if (prev.type === STAMP && /^[,;]$/.test(prev.text)) return;
    if (next.type === STAMP && /^[,;]$/.test(next.text)) return;
    if (prev.type === EXPRESS && /\.$/.test(prev.text)) return;
    if (next.type === EXPRESS && /^\./.test(next.text)) return;
    if (next.type === PROPERTY) return ";";
    if (next.type === STAMP && next.text === "*") return ";";
    if (
        [EXPRESS, VALUE, QUOTED].indexOf(prev.type) >= 0
        || prev.type === STAMP && /^(\+\+|\-\-)$/.test(prev.text)
        || prev.type === SCOPED && (prev.isExpress || prev.isObject)
    ) {
        if ([EXPRESS, VALUE, QUOTED, LABEL].indexOf(next.type) >= 0) return ";";
        if (next.type === STRAP) {
            if (!/^(in|of|extends|instanceof|as)$/.test(next.text)) return ";";
            return " ";
        }
        if (next.type === SCOPED) {
            if (!next.isExpress) return ";";
        }
        return;
    }
    if (prev.type === STRAP) {
        if ([STRAP, EXPRESS, VALUE, QUOTED].indexOf(next.type) >= 0) return " ";
        if (next.type === LABEL) return ";";
    }
};

var createString = function (parsed) {
    var pressed = parsed.pressed;
    var lasttype;
    var result = [];
    var run = (o, i, a) => {
        var prev = o.prev;
        if (!~[SPACE, COMMENT, STAMP, PIECE].indexOf(o.type) && prev && lasttype !== SPACE && !pressed) {
            if (~[QUOTED, SCOPED, STRAP, LABEL, COMMENT].indexOf(lasttype)
                || prev.type === STAMP
                && (!/[\+\-\~\!]$/.test(prev.text) || /[\+\-]$/.test(prev.text) && prev.prev
                    && (!~[STAMP, STRAP, SCOPED].indexOf(prev.prev.type) || prev.prev.type === SCOPED && prev.prev.isExpress)
                )) {
                if (o.type !== SCOPED && (o.type !== EXPRESS || !/^\./.test(o.text))) {
                    result.push(" ");
                    lasttype = SPACE
                }
            }
        }
        switch (o.type) {
            case COMMENT:
                // 每一次要远行，我都不得不对自己的物品去粗取精。取舍之间，什么重要，什么不是那么重要，都有了一道明显的分界线。
                if (!pressed) {
                    if (lasttype !== SPACE && o.prev) result.push(' ');
                    result.push(o.text);
                }
                break;
            case SPACE:
                if (!pressed) {
                    result.push(o.text);
                    lasttype = SPACE;
                    break;
                }
                var b = needBreak(o.prev, o.next);
                if (b) result.push(b);
                break;
            case QUOTED:
                if (!o.length) {
                    result.push(o.text);
                    break;
                }
            case SCOPED:
                if (!pressed && o.type !== QUOTED && (lasttype === STRAP || lasttype === COMMENT || lasttype === STAMP
                    && (!o.prev || !/[\+\-\~\!]$/.test(o.prev.text) || /[\+\-]$/.test(o.prev.text) && (!o.prev.prev || !~[STAMP, STRAP].indexOf(o.prev.prev.type)))
                    || lasttype === SCOPED && o.entry === "{"
                )) result.push(" ");
                result.push(o.entry);
                if (o.length > 0) {
                    if (o.entry === "{" && result[0].type !== SPACE) {
                        if (!pressed) {
                            result.push(" ");
                        }
                    }
                    lasttype = undefined;
                    o.forEach(run);
                    if (/^[,;]$/.test(result[result.length - 1]) && pressed) {
                        if (!o.prev || o.prev.text !== 'for') result.pop();
                    }
                    if (o.leave === "}" && (!o.next || o.next.type !== PIECE) && o[o.length - 1].type !== SPACE) {
                        if (!pressed) result.push(" ");
                    }
                }
                result.push(o.leave);
                break;
            default:
                if (o instanceof Object) {
                    if (lasttype === EXPRESS && o.type === EXPRESS && (/^\./.test(o.text) || /\.$/.test(result[result.length - 1])));
                    else if ([STRAP, EXPRESS, PROPERTY, VALUE, COMMENT].indexOf(lasttype) >= 0 && [STRAP, EXPRESS, PROPERTY, VALUE].indexOf(o.type) >= 0) {
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
                                || prev_prev.type === EXPRESS
                                || prev_prev.type === VALUE
                            ) result.push(";");
                        }
                        else if (!/^(\+\+|\-\-)$/.test(o.text)) {
                            if (!pressed && lasttype !== SPACE) result.push(" ");
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
    return result.join("");
}
var rename = function (used, from, to) {
    if (from === to) return;
    var list = used[from];
    if (list) for (var u of list) {
        if (!u) continue;
        var text = u.text;
        var doted = /^\.\.\./.test(text);
        if (doted) text = text.slice(3);
        text = to + text.replace(/^[^\.\:]+/i, "");
        if (doted) text = "..." + text;
        u.text = text;
    }
    delete used[from];
    used[to] = list;
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
    createString,
    createScoped,
    saveTo,
    rename,
    mergeTo
};