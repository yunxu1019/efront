"use strict";
import {
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
} from "./const.mjs";
// --------------//1//2//////////////////////////////////////////////////22////////////2//2//3//4//////4////////3/////3//////3//3//////3///////211/////////////2//////2/////////////1//
var number_reg = /^(?:(?:0x[0-9a-f]+|\d[0-9a-f]*h|0b[01]+|0o[0-7]+)(?:_[0-9a-f]+)*|(?:(?:(?:\d+_)*\d+|\d*)\.\d+(?:_\d+)*|(?:\d+_)*\d+\.?))(?:e[\+\-]?\d+(?:_\d+)*)?(?:[ijklmnufl]+)?/i;
var equal_reg = /^(?:[\+\-\*\/~\^&\|%]|\*\*|>>>?|<<)?\=$|^(?:\+\+|\-\-)$/;
var needhead_reg = /^\?|^\.(?:[^\.]|$)|^\[/;
var needfoot_reg = /(\:\:|\.)$/;
var skipAssignment = function (o, cx) {
    if (!o) return;
    var next = arguments.length === 1 ? function () {
        o = getnext(o);
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
    else if (o.type & (SPACE | COMMENT)) o = getnext(o);
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
                    var n = getnext(o);
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
                        var p = getprev(o);
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
            var prev = getprev(o);
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
                next();
                skipLabel();
                next();// {}
                next();// while
                next();// ()
            }
            else if (o.text === 'for') {
                next();
                if (o.type === STRAP && o.text === 'await') next();
                next();// ()
                skipLabel();
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
    } while (o && o.type === STAMP && o.text === ',' ? o = getnext(o) : false);
    return o;
}
function skipFunction(o) {
    if (o.type === STRAP && o.text === 'async') o = getnext(o);
    if (o.type !== STRAP) return skipAssignment(o);
    if (o.text === 'function') {
        while (o && (o.type !== SCOPED || o.entry !== '{')) o = getnext(o);
        return getnext(o);
    }
    if (o.text === 'class') {
        while (!o.isClass) o = getnext(o);
        while (o.isClass) o = getnext(o);
        return o;
    }
    return o;
}
var snapLabel = function (o) {
    var p = getprev(o);
    while (p && p.type === LABEL) o = p, p = getprev(o);
    return o;
}
var getDoBeforeWhile = function (while_) {
    var p = getprev(while_);
    if (!p || p.type !== SCOPED || p.entry !== '{') return;
    p = snapLabel(p);
    p = getprev(p);
    if (p.type === STRAP && p.text === "do") return p;
};
var getIfElseHead = function (if_) {
    var p = if_;
    do {
        if_ = p;
        p = getprev(if_);
        if (!p || p.type !== STRAP || p.text !== 'else') {
            return snapLabel(if_);
        }
        while (p && (p.type !== STRAP || p.text !== 'if')) p = getprev(p);
    } while (p);
};
var getContitionHeadBeforeScoped = function (p, nodo) {
    var pp = getprev(p);
    if (pp.type !== STRAP) return;
    if (pp.text === 'await') {
        pp = getprev(pp);
        if (pp?.type === STRAP && pp.text === "for") {
            return snapLabel(pp);
        };
    }
    else switch (pp.text) {
        case "with":
        case "for":
            return snapLabel(pp);
        case "while":
            p = getDoBeforeWhile(pp);
            if (p) {
                if (nodo) return;
                return snapLabel(p);
            }
            return snapLabel(pp);
        case "if":
            return getIfElseHead(pp);
    }
};
var getClassHeadBeforeScoped = function (p) {
    var i = 0;
    while (p && p.isClass) {
        p = p.prev;
        i++;
    }
    while (p && i > 0) {
        var o = p;
        if (p.type === STRAP && /^(class|interface)$/.test(p.text)) {
            i--;
        }
        p = p.prev;
    }
    return o;
}
var getFunctionHeadBeforeScoped = function (p) {
    var pp = getprev(p);
    if (pp && pp.type === EXPRESS) pp = getprev(pp);
    if (pp && pp.text === '*') pp = getprev(pp);
    if (pp && pp.type === STRAP && pp.text === 'function') {
        p = pp;
        pp = getprev(pp);
        if (pp && pp.type === STRAP && pp.text === 'async') {
            p = pp;
        }
        return p;
    }
    while (pp?.isprop) {
        p = pp;
        pp = getprev(pp);
        if (pp?.isend) break;
    }
    if (p.isprop) return p;
}
function snapAssignmentHead(o) {
    // 只检查一级
    if (o.type === STAMP && o.prev) o = o.prev;
    while (o && getprev(o)) {
        var p = getprev(o);
        while (p.type === LABEL) {
            p = getprev(p);
            if (!p) return o;
        }
        if (o.entry === '(') {
            if (p.type & ~(STAMP | STRAP)) {
                o = p;
                p = getprev(o);
                if (!p) break;
            }
            var pp = getContitionHeadBeforeScoped(o, false);
            if (pp) { o = pp; break; }
            pp = getFunctionHeadBeforeScoped(o);
            if (pp) {
                o = pp;
                p = getprev(o);
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
                if (p.entry === '`' && getprev(p) && getprev(p).type & ~(STAMP | STRAP)) o = getprev(p);
                continue;
            }
            break;
        }
        if (p.type === SCOPED) {
            if (maybeprop) {
                o = p;
                continue;
            }
            if (p.entry === "(" && o.type & (SCOPED | LABEL)) {
                var pp = getContitionHeadBeforeScoped(p, true);
                if (pp) { o = pp; break; }
                var pp = getFunctionHeadBeforeScoped(p);
                if (pp) {
                    o = pp;
                    p = getprev(o);
                    if (!p || p.type === STAMP && /^[,;]$/.test(p.text)) break;
                    continue;
                }
            }
            break;
        }
        if (p.type === STRAP) {
            if (/^(?:new|void|do|typeof|delete|await|class|function|async)$/.test(p.text)) {
                o = p;
                continue;
            }
            if (/^(in|instanceof|of|as|from)$/.test(p.text)) {
                o = getprev(p);
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
            if (/^(=>|;|,)$/.test(p.text)) {
                break;
            }
            if (/^[\?\:]$/.test(p.text)) {
                if (o) {
                    var e = getnext(snapExpressFoot(o));
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
            o = getprev(p);
            continue;
        }
        break;
    }
    return o;
}
var getStrapHead = function (o) {
    var p = getprev(o);
    if (p && p.type === STRAP && !p.transive) return p;
    if (p && p.type === STRAP && p.text === 'await') p = getprev(p);
    if (p && p.type === STRAP && p.text === 'for') return p;
    return null;
}
var getprev = function (o) {
    return o.prev;
};
var getnext = function (o) {
    return o.next;
};
var snapExpressHead = function (o) {
    if (!o || o.type & ~(EXPRESS | SCOPED | QUOTED) && !o.needle) return o;
    var a = o, p = getprev(o);
    while (o && (p = getprev(o))) {
        if (p.type === STAMP && p.needle || o.type === STAMP && o.needle) {
            o = p;
            continue;
        }
        if (p && p.type === STRAP && p.text === 'new') return p;
        if (o.type === SCOPED && o.entry === '(') {
            var h = getStrapHead(o, getprev);
            if (h) return h;
        }
        if (o.type === SCOPED && o.entry !== '{'
            || needhead_reg.test(o.text) && !o.isdigit
            || needfoot_reg.test(p.text) && !p.isdigit
            || o.type === QUOTED && (o.length || /^\`/.test(o.text))
        ) {
            if (p.type === SCOPED && p.entry === '(') {
                if (getStrapHead(p, getprev)) return o;
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
                    p = getprev(p);
                    if (p && p.type === EXPRESS) p = getprev(p);
                    if (p && p.type === STAMP && p.text === '*') p = getprev(p);
                    if (!p || p.type !== STRAP || !/^function$/.test(p.text)) return a;
                    if (p && p.type === STRAP && p.text === "new") p = getprev(p);
                    return p;
                }
                return a;
            }
            while (o.isClass) {
                isclass++;
                o = getprev(o);
            }
            var p = o;
            while (o && isclass > 0) {
                var p = o;
                if (o.type === STRAP && o.text === 'class') {
                    isclass--;
                }
                o = getprev(o);
            }
            if (p && p.type === STRAP && p.text === 'new') return p;
            return p;
        }
        break;
    }
    return o;
};

var snapExpressFoot = function (o) {
    while (o && getnext(o)) {
        if (o.needle) {
            o = getnext(o);
            continue;
        }
        var n = null;
        var isExpress = o.isExpress;
        if (o.type & STRAP) {
            n = o;
            if (n.text === 'new') n = getnext(n);
            if (n.text === 'function') {
                while (n && (n.type !== SCOPED || n.entry !== '{')) n = getnext(n);
            }
            else if (n.text === 'class') {
                var n = o;
                while (n && !n.isClass) n = getnext(n);
                while (n && n.isClass) n = getnext(n);
            }
            else break;
            o = n;
            n = o && getnext(o);
        }
        else if (o.type & (EXPRESS | QUOTED | VALUE | SCOPED)) {
            n = getnext(o);
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
var patchScoped = function (os, scoped) {
    for (var u of os) {
        u.scoped = scoped;
        if (u.kind) {
            while (u && !u.equal) u = u.queue;
            if (u) u.scoped = scoped;
        }
    }
};
var createScoped = function (parsed, wash) {
    var used = Object.create(null); var vars = Object.create(null), lets = vars;
    var scoped = [], funcbody = scoped, argscope = scoped, thisscope = scoped, labelused = used;
    funcbody.isroot = true;
    Object.defineProperty(scoped, 'body', { value: parsed, enumerable: false, configurable: true });
    scoped.isfunc = true;
    var dec = function (map, o) {
        var kind = o.text;
        o = getnext(o);
        while (o && o.type === STRAP) o = getnext(o);
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
            var isArraw = false;
            var isClass = false;
            var isAsync = false;
            var isAster = false;
            var function_obj = null;
            if (o.type === STAMP && equal_reg.test(o.text)) {
                var p = snapExpressHead(getprev(o));
                if (!p || p.type & (STRAP | STAMP) || p.type !== EXPRESS && !p.isExpress) {
                    let n = getnext(o);
                    if (n && n.type & (EXPRESS | VALUE)) {
                        n.equal = o;
                    }
                }
                else if (p.type & (EXPRESS | VALUE)) {
                    p.equal = o;
                }
                else if (o.text === '=' && p.type === SCOPED && !p.isprop) {
                    if (!p.kind) {
                        var pp = getprev(p);
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

                    var p = getprev(o);
                    if (p) {
                        if (p.needle || p.type === EXPRESS && needfoot_reg.test(p.text)) break;
                        if (p.type === STRAP && p.istype) {
                            var o0 = dec(lets, p);
                            if (o0 && o0.type === SCOPED && o0.entry === "(") {
                                isFunction = true;
                                isScope = true;
                                break;
                            }
                            if (o === o0) o = getnext(o);
                            else o = o0;
                            continue;
                        }
                    }
                    var on = getnext(o);
                    if (on && on.type === STAMP && on.text === "=>") {
                        isScope = true;
                        isArraw = true;
                        var p = getprev(o);
                        isAsync = p?.type === STRAP && p.text === 'async';
                    }
                    else {
                        var u = o.text;
                        if (/^\.\.\./.test(u)) u = u.slice(3);
                        var u = u.replace(/^([^\.\[\?\s\:]*)[\s\S]*$/, '$1');
                        if (!u) break;
                        var p = getprev(o);
                        if (p && p.type === STAMP && /^(?:\+\+|\-\-)$/.test(p.text)) {
                            var pp = getprev(p);
                            if (!pp || pp.type === STAMP) {
                                o.equal = p;
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
                            o = getnext(o);
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
                            var n = getnext(o);
                            if (!n || n.type & ~(EXPRESS | STRAP) && (n.type !== SCOPED || n.entry === "(")) {
                                o.type = EXPRESS;
                                continue;
                            }
                        case "import":
                        case "use":
                            var n = getnext(o);
                            if (!n || n.type === QUOTED) break;
                            if (n.needle) {
                                o.type = EXPRESS;
                                continue;
                            }
                        case "var":
                            m = m || vars;
                            var o0 = dec(m, o);
                            if (o0 === o) o = getnext(o);
                            else o = o0;
                            continue loop;
                        case "static":
                        case "function":
                        case "fn":
                        case "func":
                            isFunction = true;
                            var p = getprev(o);
                            if (p?.type === STRAP && p.text === 'async') {
                                isAsync = true;
                                o.isExpress = p.isExpress;
                            }
                            function_obj = o;
                            var n = getnext(o);
                            if (n.type === STAMP) {
                                isAster = true;
                                o = getnext(o);
                                o.isExpress = p?.isExpress;
                            }
                            if (n.isprop) {
                                var nn = n.next;
                                if (nn.type === STAMP && /^[\:\=]$/.test(nn.text)) break;
                            }

                        case "catch":
                            if (s === 'catch') isCatch = true;
                        case "class":
                        case "interface":
                            if (/^interface|class$/.test(s)) isClass = true;
                            if (!o.isExpress) {
                                o = getnext(o);

                                if (o.type === EXPRESS) {
                                    vars[o.text] = true;
                                    o.kind = isFunction ? 'function' : 'class';
                                    saveTo(used, o.text, o);
                                    o = getnext(o);
                                    if (o?.type === ELEMENT) o = getnext(o);
                                }
                            }
                            isScope = true;
                            break;
                        case "for":
                            o = getnext(o);
                            if (o.type !== SCOPED && o.text === 'await') {
                                if (o.type === EXPRESS) o.type = STRAP;
                                funcbody.await = funcbody.async = true;
                                o = getnext(o);
                            }
                            isScope = true;
                            break;

                    }
                    break;
                case SCOPED:
                    if (o.entry === "(") {
                        var p = getprev(o);
                        var n = getnext(o);
                        if (n?.type === STAMP && n.text === "=>") {
                            isArraw = true;
                            isScope = true;
                            if (p?.type === STRAP && p.text === 'async') {
                                isAsync = true;
                            }
                        }
                        else if (p?.isprop) {
                            isFunction = true;
                            isScope = true;
                            var pp = getprev(p);
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
                if (isFunction || isArraw) {
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
                if (isArraw);
                else while (o && (o.type !== SCOPED || o.entry === '[')) {
                    o = getnext(o);
                    if (o && o.type === EXPRESS) {
                        var tack = o.text.replace(/[\.\[][\s\S]*$/, '');
                        saveTo(used, tack, o);
                        var p = getprev(o);
                        if (p?.type === STRAP && p.text === 'extends') continue;
                        lets[tack] = true;
                        o.kind = isFunction ? 'function' : 'class';
                        o = getnext(o);
                    }
                }
                if (!isFunction) while (o.type !== SCOPED) {
                    o = run(o, 0);
                    o = getnext(o);
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
                    o = getnext(o);
                    if (!o);
                    else if (o.type === STAMP && o.text === "=>") o = getnext(o);
                }
                else if (isArraw) {
                    vars[o.text] = true;
                    o.kind = 'argument';
                    saveTo(used, o.text, o);
                    o = getnext(getnext(o));
                }
                if (!o);
                else if (o.type === SCOPED && o.brace) {
                    scoped.body = o;
                    o.scoped = scoped;
                    o.isExpress = isExpress;
                    run(o.first);
                    if (isArraw && id >= 0 && o) o = getnext(o);
                    if (wash && isFunction) {
                        var e = getnext(o);
                        if (e && e.type === EXPRESS && /^[\.\[]/.test(e.text) || e && e.type === SCOPED && e.entry === "[") {
                            scoped.target = true;
                            e = getnext(e);
                        }
                        if (e && e.type === SCOPED && e.entry === '(') {
                            if (e.first) {
                                scoped.pass = getDeclared(e.first)[0];
                            }
                            if (scoped.target) scoped.target = scoped.pass.shift();
                        }
                    }
                }
                else if (isArraw) {
                    var n = skipAssignment(o);
                    scoped.arraw = o;
                    while (o !== n) {
                        n1 = run(o, 0);
                        if (n1 === o || n1?.entry === "{") o = getnext(n1);
                        else o = n1;
                    }
                }
                else {
                    var n = skipSentenceQueue(o);
                    var n1 = o;
                    while (n1 && n1 !== n) {
                        o = n1;
                        n1 = run(n1, 0);
                        if (n1) n1 = getnext(n1);
                    }
                }
                var map = isFunction ? vars : lets;
                var keepscope = isFunction || !!scoped.body || !!scoped.head;
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
                            patchScoped(used[k], scoped);
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
                if (isArraw) scoped.isArraw = isArraw;
                if (isArraw || vars !== lets) {
                    if (!thisscope.insett && used.this) thisscope.insett = true;
                    if (!argscope.inseta && used.arguments) argscope.inseta = true;
                }
                if (isClass) delete lets.super, delete lets.this, thisscope = _thisscope;
                if (isFunction) {
                    funcbody = _funcbody;
                    labelused = _labelused;
                    if (!isArraw) {
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
            if (o) o = getnext(o);
        }
        return o;
    };
    if (parsed.first) run(parsed.first);
    else {
        rehead(parsed);
        var { first, last } = parsed;
        var gtprev = getprev;
        var gtnext = getnext;
        getnext = function (o) {
            if (o === last) return null;
            return gtnext(o);
        };
        getprev = function (o) {
            if (o === first) return null;
            return gtprev(o);
        };
        run(first);
        getnext = gtnext;
        getprev = gtprev;
    }

    scoped.used = used;
    scoped.vars = vars;
    scoped.caps = used;
    for (var k in used) patchScoped(used[k], scoped);
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
        var sn = getnext(s);
        if (sn?.type === STRAP) {
            if (sn.text === 'of') return true;
            if (sn.text === "in") {
                var q = s.queue;
                if (q.entry === '(') {
                    var qp = getprev(q);
                    if (qp.type === STRAP && qp.text === 'await') qp = qp.text;
                    if (qp.type === STRAP && qp.text === 'for') return true;
                }
            }
        }
        var sp = getprev(s);
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
        while (o && o.type === STAMP && o.text === ',') o = getnext(o), index++;
        if (!o) {
            index--;
            break;
        }
        var n = getnext(o);
        if (n?.needle) {
            o = getnext(n);
            continue;
        }
        if (o.isprop) {
            prop = createString([o]).trim();
            if (/^(['"`])[\s\S]*\1$/.test(prop)) {
                prop = `[${prop}]`;
            }
            else if (o.isdigit) prop = `[${prop}]`;
            var n = getnext(o);
            if (n?.type === STAMP && n.text === ":") {
                skiped.push(o);
                o = getnext(n);
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
                    o = getnext(o);
                    break;
                }
                else {
                    var s = [];
                    while (foot !== o) {
                        s.push(o);
                        o = getnext(o);
                    }
                    s.push(foot);
                    skiped.push(...s);
                    o = getnext(o);
                    attributes.push([prop, s]);
                    break;
                }
            case STAMP:
                var n = getnext(o);
                if (o.text === "*" && n) {
                    if (n.type === STRAP && n.text === 'as') {
                        o = getnext(n);
                        prop = "*";
                        continue;
                    }
                }
                if (o.text === '...') {
                    o = getnext(o);
                    continue;
                }
                break;
            case LABEL:
            case PROPERTY:
                var n = getnext(o);
                if (n) {
                    if (n.type === STAMP && n.text === ":" || n.type === STRAP && n.text === "as") {
                        prop = o.text;
                        o = getnext(n);
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
                    var prev = getprev(o);
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
                while (o !== f) o = getnext(o), s.push(o);
                if (isrest) declared["..."] = [s, index];
                else attributes.push([prop, s]);
                o.kind = kind;
                o = getnext(f);
                break;
            default:
                console.log(createString(pickSentence(o.queue)), o.text, o.type);
                throw new Error(i18n`代码结构异常`);
        }
        if (!o) break;
        switch (o.type) {
            case STRAP:
                if (/^(in|of)$/.test(o.text)) {
                    o = getnext(o);
                    break loop;
                }
                break loop;
            case STAMP:
                if (o.text === "=") {
                    getprev(o).equal = o;
                    o = getnext(o);
                    var o0 = skipAssignment(o);
                    if (isrest) throw new Error(i18n`余集变量不能有默认值`);
                    attributes[attributes.length - 1].push(queue, o, o0);
                    while (o !== o0) {
                        skiped.push(o);
                        o = getnext(o);
                    }
                    o = o0;
                    break;
                }
                if (o.text === '*') {
                    o = getnext(o);
                    break;
                }
                break;
            case EXPRESS:
                if (o.text === '?') o = getnext(o);
                break;
        }
        if (o?.type === STAMP) {
            while (o?.istype) {
                o = getnext(o);
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
import { uncode } from "../basic/strings.js";
var saveTo = function (used, k, o) {
    k = uncode(k);
    if (!(used[k] instanceof Array)) used[k] = [];
    used[k].push(o);
    o.tack = k;
};

var mergeTo = function (used, used0) {
    if (used === used0) return;
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
    if (next.type === STAMP && next.text === "*" && getnext(next) && getnext(next).type === PROPERTY) return ";";
    var pp = getprev(prev);
    if (
        (EXPRESS | VALUE | QUOTED) & prev.type
        || prev.type === STAMP && /^(\+\+|\-\-)$/.test(prev.text)
        || prev.type === SCOPED && (prev.isExpress || prev.isObject || prev.entry === '(' && (
            // 这两种分号不存在时efront的解析器可以识别，v8的识别不了，为了兼容追加分号
            // do{}while(); return
            // =function(){}(); return
            pp?.type === STRAP && pp.text === 'while' || pp?.type === SCOPED
        )
        )
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
    if (prev.brace) {
        if (pp.type === SCOPED && pp.entry === '(' ||
            pp.type === STAMP && pp.text === '=>'
        ) pp = getFunctionHeadBeforeScoped(pp);
        else if (prev.isClass) {
            pp = getClassHeadBeforeScoped(prev);
        }
        else pp = null;
        if (pp) pp = getprev(pp);
        if (!pp) return;
        if (pp.type === STAMP && (
            !/^([,;]|\+\+|\-\-)$/.test(pp.text)
            || pp.unary
        ) || pp.type === STRAP && pp.transive && !pp.isend) return ';';
        return;
    }
    if (prev.type === STRAP) {
        if ((STRAP | EXPRESS | VALUE | QUOTED) & next.type) return " ";
        if (next.type === LABEL) return /^(do|else|try|catch|finally)$/.test(prev.text) ? " " : ";";
    }
}
var needBreakBetween = function (prev, next) {
    if (hasBreakBetween(prev, next)) return;
    return getSemicolonBetween(prev, next) === ';' ? ';' : '';
};
var rolink = function (list) {
    return link(list, list[0]?.prev, list[list.length - 1]?.next);
};
var link = function (list, p, n) {
    var pi = 0, f = null;
    list.first = null;
    for (var cx = 0, dx = list.length; cx < dx; cx++) {
        var o = list[cx];
        o.prev = p;
        if (o.type & (COMMENT | SPACE)) continue;
        if (!f) list.first = o;
        while (pi < cx) list[pi++].next = o;
        f = p = o;
    }
    while (pi < cx) list[pi++].next = n;
    list.last = f;
    return list;
};
var relink = function (list) {
    return link(list, null, null);
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
        var prev = getprev(o);
        a: if (prev && lasttype !== SPACE && patchspace && ~(SPACE | COMMENT | STAMP | PIECE | SCOPED) & o.type) {
            if ((QUOTED | SCOPED | STRAP | LABEL | COMMENT | ELEMENT | PROPERTY) & lasttype
                || prev.type === STAMP && !prev.unary && !prev.needle && !prev.isprop
            ) {
                if (intag || prev.type === ELEMENT && o.type === ELEMENT) break a;
                if (
                    (o.type & ~(EXPRESS | PROPERTY) || !needhead_reg.test(o.text))
                    && (!prev.tag && !o.tag || prev.type === STAMP || o.type === STAMP)
                ) {
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
                    if (prev?.istype && lasttype !== SPACE) result.push(" ");
                    if (helpcolor) o.text = color.transform(o.text);
                    result.push(o.text);
                    break;
                }
            case SCOPED:
                var prev = getprev(o);
                if (patchspace && !intag && prev && o.type !== QUOTED && (lasttype === STAMP && !prev.unary && !prev.needle
                    || lasttype & ~(SPACE | STAMP | COMMENT) && o.brace
                    || lasttype === STRAP && !/^(this|arguments|import)$/.test(prev.text) && (!prev.unary || o.brace)
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
                    var p = getprev(o);
                    if (p?.type === STRAP && /^for$/.test(p.text));
                    else if (lasttype !== PIECE && /^[,;]$/.test(result[result.length - 1]) && autospace && !keepspace) {
                        var last = o.last;
                        var lp = last && getprev(last);
                        if (!lp) result.pop();
                        else {
                            var lpp = getprev(lp);
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
                    var p = getprev(o);
                    if (intag || o.needle || o.type & (EXPRESS | PROPERTY) && (needhead_reg.test(o.text) || lasttype & EXPRESS && needfoot_reg.test(prev?.text))) {
                        if (prev?.isdigit && !/^0[\dxbo]|[mni]$|[e\.]/.test(prev.text) && lasttype & ~(SPACE | COMMENT)) result.push(" ");
                    }
                    else if (
                        (STRAP | EXPRESS | PROPERTY | COMMENT | VALUE) & lasttype
                        && (STRAP | EXPRESS | PROPERTY | VALUE | LABEL) & o.type
                    ) {
                        if (autospace || prev?.isdigit && patchspace) result.push(" ");
                    }
                    else if (p && o.type === STAMP && !/^[,;]/.test(o.text)) {
                        if (result[result.length - 1] === " ");
                        else if (o.text === ':') {
                            if ((lasttype === PROPERTY || p && p.isprop || !o.isExpress));
                            else if (autospace) result.push(' ');
                        }
                        else if (lasttype === STAMP) {
                            if (autospace) if (!p.unary || /[\+\-]$/.test(p.text) && p.text === o.text) result.push(" ");
                        }
                        else if (/^(\+\+|\-\-)$/.test(p.text) && getprev(p)) {
                            if (o.unary) {
                                var pp = getprev(p);
                                if (
                                    pp.type === STRAP && !pp.isExpress
                                    || pp.type & (EXPRESS | VALUE)
                                ) result.push(";");
                            }
                        }
                        else if (o.ion);
                        else if (!/^(\+\+|\-\-)$/.test(o.text) || p.type & (STAMP | STRAP)) {
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
    var pend = parsed[parsed.length - 1];
    if (pend?.type === COMMENT && /^\/\//.test(pend.text)) {
        finalresult.push('\r\n');
    }
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
        var c = code[ex];
        if (c?.type === STAMP) {
            if (/^[,;]$/.test(c.text)) {
                ex++;
            }
            else if (c.text === ':' && !c.isExpress && getprev(c)?.type !== PROPERTY) {
                ex++;
            }
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
    a = getprev(a);
    if (!a || a.type !== STRAP) return false;
    if (a.text === 'while') {
        var p = getprev(a);
        if (!p || p.type !== SCOPED || p.entry !== '{') return true;
        p = getprev(p);
        if (!p || p.type !== STRAP || p.text !== 'do') return true;
        return false;
    }
    return /^(if|for|with)$/.test(a.text);
};

var splice = function (queue, index, size, ...args) {
    if (index < 0) index += queue.length;
    var p = queue[index];
    var n = queue[index + size - 1];
    var prev = p && getprev(p);
    var next = n && getnext(n);
    var res = queue.splice(index, size, ...args);
    var previ = queue.lastIndexOf(prev, index);
    var nexti = queue.indexOf(next, index + args.length);
    if (previ < 0) previ = 0, prev = null;
    if (nexti < 0) nexti = queue.length, next = null;
    else nexti++;
    var changedargs = queue.slice(previ, nexti);
    var pp = prev && getprev(prev);
    var nn = next && getnext(next);
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
        var e = q.indexOf(end, i);
        if (e < 0) end = end ? i : q.length;
        else end = e + 1;
        length = end - i;
    }
    if (i >= 0) splice(q, i, length);
    return length;
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
    var t = o && getprev(o), p = o;
    while (t && (t.type !== STAMP || !/^[,;]$/.test(t.text))) {
        if (p.isprop) {
            p = getprev(t);
            if (!p || !p.isprop) break;
        }
        res.push(t);
        p = t;
        t = getprev(t);
    }
    res.reverse();
    while (o && (o.type !== STAMP || !/^[,;]$/.test(o.text))) {
        res.push(o);
        var n = o;
        o = getnext(o);
        if (o && o.isprop) {
            if (!n.isprop) break;
        }
    }
    return res;
};
var snapSentenceHead = function (o) {
    while (o) {
        o = snapAssignmentHead(o)
        var p = getprev(o);
        if (p?.type === STAMP && p.text === ',') {
            var pp = getprev(p);
            if (!pp) break;
            o = pp;
            continue;
        }
        break;
    }
    var p = getprev(o);
    if (p?.type === STRAP && /^(var|let|const)$/.test(p.text)) {
        o = p;
    }
    while (o) {
        var p = getprev(o);
        if (!p || p.type !== LABEL) break;
        o = p;
    }
    return o;
};
var pickSentence = function (o) {
    if (!o) return [];
    if (o && o.type & (SPACE | COMMENT) && getprev(o)) o = getprev(o);
    if (o && o.type === STAMP && getprev(o)) o = getprev(o);
    if (o.type === STRAP && /^(in|instanceof|as|of)$/.test(o.text) && getprev(o)) o = getprev(o);
    var h = snapSentenceHead(o);
    var e = h;
    do {
        e = skipAssignment(e);
        if (!e || e.type !== STAMP || e.text !== ',') break;
        e = getnext(e);
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
        h = getnext(h);
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
    n = snapAssignmentHead(n);
    var e = skipAssignment(n);
    var values = [];
    while (n && n !== e) {
        values.push(n);
        n = getnext(n);
    }
    return values;
}
var insertBefore = function () {
    "use strict";
    var [o] = arguments;
    var queue = this || o.queue;
    var index = queue.indexOf(o);
    var os = [].slice.call(arguments, 1);
    queue.splice.apply(queue, [index, 0].concat(os));
    var prev = o && getprev(o), next = o;
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
    var prev = o, next = o && getnext(o);
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
var unshort = function (o, name) {
    if (!name || typeof name === 'string') {
        name = { text: name || o.text, short: false, isprop: true, type: PROPERTY };
    }
    insertBefore.call(o.queue, o, name, { text: ':', type: STAMP });
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

var isDeclareOnly = function (o) {
    if (!o.kind) return false;
    while (o) {
        var q = o.queue;
        if (!q.kind) break;
        o = q;
    }
    var n = getnext(o);
    if (!n) return true;
    if (n.type !== STAMP || /^[,;]$/.test(n.text)) return true;
    return false;
};

var collectArgument = function (q) {
    var t = q.first;
    var index = 0;
    var args = [];
    while (t) {
        var n = t.next;
        while (n && (n.type !== STAMP || n.text !== ',')) n = n.next;
        var start = q.indexOf(t, index);
        var end = n ? q.indexOf(n.prev, start) + 1 : q.indexOf(q.last) + 1;
        index = end;
        args.push(q.slice(start, end));
        if (!n) break;
        t = n.next;
    }
    return args;
};

var collectProperty = function (q) {
    var t = q.first;
    var defined = Object.create(null);
    var index = 0;
    while (t) {
        if (!(t.type === PROPERTY || t.isprop)) {
            t = t.next;
            continue;
        }
        var n = t.next;
        if (n && n.isprop) {
            if (n.type & (EXPRESS | QUOTED | STRAP) || n.type === SCOPED && n.entry === '[') {
                t = t.next;
                continue;
            }
        }
        var text = strings.decode(t.text);
        if (t.short) {
            defined[text] = [t];
            t = t.next;
            continue;
        }
        var n = t.next;
        while (n && (n.type !== STAMP || n.text !== ':') && (n.type !== SCOPED || n.entry !== '(')) n = n.next;
        if (n.type === STAMP) n = n.next;
        var start = q.indexOf(n, index);
        while (n && (n.type !== STAMP || n.text !== ',')) n = n.next;
        var end = n ? q.indexOf(n.prev, start) + 1 : q.indexOf(q.last) + 1;
        index = end;
        while (end > start && q[end - 1].type & (SPACE | COMMENT)) end--;
        if (text) defined[text] = q.slice(start, end);
        var text = strings.decode(t.text);
        if (!n) break;
        t = n.next;
    }
    return defined;
};

export {
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
    isDeclareOnly,
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
    collectArgument,
    collectProperty,
    pickSentence,
    pickExpress,
    snapAssignmentHead,
    pickAssignment,
    snapExpressHead,
    snapExpressFoot,
    skipSentenceQueue,
    needBreakBetween,
    saveTo,
    isEval,
    rename,
    relink,
    rolink,
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