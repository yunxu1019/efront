"use strict";
var strings = require("../basic/strings");
var Program = require("./Program");
var backEach = require("../basic/backEach");

const {
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
    createString,
    getDeclared,
    createScoped,
    snapExpressHead,
    patchArrawScope,
    snapExpressFoot,
    splice,
    relink,
    remove,
    setqueue,
    replace,
    skipAssignment,
    insertAfter,
    pickSentence,
    unshort,
} = require("./common");
var straps = `if,in,do,as,of
var,for,new,try,let,get,set
else,case,void,with,enum,from
async,while,break,catch,throw,const,yield,class,await
return,typeof,delete,switch,export,import,static
default,finally,extends
function,continue,debugger
instanceof`.trim().split(/[,\s]+/);
var colonstrap_reg = /^(case|default)$/;
class Javascript extends Program {
    straps = straps;
    value_reg = /^(false|true|null|Infinity|NaN|undefined|eval)$/
    transive_reg = /^(new|var|let|const|yield|void|in|of|typeof|delete|case|return|await|default|instanceof|throw|extends|import|from)$/
    strapexp_reg = /^(new|void|typeof|delete|class|function|await)/;
    forceend_reg = /^(return|yield|break|continue|debugger|async)$/;
    defaultType = EXPRESS;
}
var propresolve_reg = /^(static|get|set|async|readonly|private|pub)$/;

var isProperty = function (o) {
    var queue = o.queue;
    var prev = o.prev;
    if (queue.isObject) {
        if (!prev || prev.type === STAMP && /^[,;]$/.test(prev.text)) return true;
        if (prev.type === STAMP && prev.isprop) return true;
    }
    if (queue.isClass) {
        if (!prev) return true;
        if (o.type === SCOPED && o.entry !== '{') {
            return prev.isprop || prev.type === STAMP && prev.text === ';' || isShortMethodEnd(prev);
        }
        if (prev.type === STAMP) {
            if (prev.isprop) return true;
            return /^(\+\+|\-\-|[,;])$/.test(prev.text) && (o.type !== STAMP || !/^[,;\=\:]$/.test(o.text));
        }
        if (prev.type === EXPRESS && !/\.$/.test(prev.text)) {
            return prev.text !== 'async' || o.text !== 'function';
        }
        if (prev.type & (SCOPED | VALUE | QUOTED | PROPERTY)) return true;
    }
    if (!prev) return false;
    if (prev.type === PROPERTY && propresolve_reg.test(prev.text)) {
        return true;
    }
    if (queue.prev && queue.prev.type === STRAP && queue.prev.text === 'export') {
        if (prev.type === STRAP && prev.text === "as") return true;
    }
    return false;
};
var setStrapExpress = function (mark_type, mark_text, prop, o, default_type) {
    var type = o.type;
    var h = snapExpressHead(o);
    var isfunc = h?.prev?.type === STAMP && h.prev.text === '=>';
    var q = o.queue;
    if (isfunc) var pp = h.prev.prev;
    else while (q) {
        h = snapExpressHead(q);
        isfunc = h?.prev?.type === STAMP && h.prev.text === '=>';
        if (isfunc) {
            pp = h.prev.prev;
            break;
        }
        if (q.entry === '(') {
            var pp = q.prev;
        }
        else if (q.brace) a: {
            var p = q.prev;
            if (p) {
                if (p.type === STAMP && p.text === "=>") {
                    isfunc = true;
                    pp = p.prev;
                    break;
                }
                if (p.type === SCOPED && p.entry === "(") {
                    pp = p.prev;
                    break a;
                }
            }
            q = q.queue;
            continue;
        }
        else {
            q = q.queue;
            continue;
        }
        if (pp && pp.isprop) {
            pp = pp.prev;
            if (pp && pp.type === mark_type && pp.text === mark_text) {
                type = STRAP;
                break;
            }
            if (pp && pp.type === STAMP && pp.text === '*') pp = pp.prev;
            type = pp && pp.type === mark_type && pp.text === mark_text ? STRAP : EXPRESS;
            break;
        }
        var tn = q.next;
        if (tn && tn.type === STAMP && tn.text === '=>') {
            pp = q;
            isfunc = true;
            break;
        }
        if (pp && pp.type === EXPRESS) pp = pp.prev;
        if (pp && pp.type === STAMP && pp.text === "*") pp = pp.prev;
        isfunc = pp && pp.type === STRAP && pp.text === 'function';
        if (isfunc) break;

        q = q.queue;
    }
    if (isfunc) {
        var chk = pp[prop];
        type = (chk && chk.type === mark_type && chk.text === mark_text) ? STRAP : EXPRESS;
    }
    if (!q) type = default_type;
    o.type = type;
}
var setYieldExpress = setStrapExpress.bind(null, STAMP, "*", 'next');
var setAwaitExpress = setStrapExpress.bind(null, STRAP, "async", 'prev');
var fixType = function (o) {
    var m = o.text;
    var last = o.prev;
    var type = o.type;
    var queue = o.queue;
    switch (type) {
        case QUOTED:
            if (isProperty(o)) o.isprop = true;
            break;
        case SCOPED:
            if (o.entry === '(') {
                if (last && last.type === STRAP && last.text === 'import') {
                    last.type = EXPRESS;
                }
            }
            break;
        case EXPRESS:
            if ((!/^\./.test(m)) && isProperty(o)) type = PROPERTY;
            break;
        case STRAP:
        case VALUE:
            if (last && last.type === EXPRESS && /[^\.]\.$/.test(last.text)) {
                type = EXPRESS;
            }
            else if (isProperty(o)) type = PROPERTY;
            else if (m === 'from') {
                if (!last || last.type === STRAP && !/^(im|ex)port$/.test(last.text)) {
                    type = EXPRESS;
                    break;
                }
                var temp = last;
                while (temp.type === STAMP && temp.text === "*" || temp.type & (EXPRESS | VALUE | SCOPED)) {
                    var prev = temp.prev;
                    if (!prev) break;
                    if (prev.type === STRAP && prev.text === "as") {
                        temp = prev.prev;
                        continue;
                    }
                    if (prev.type !== STAMP || prev.text !== ',' && (prev.text !== "*" || !prev.prev || !((STRAP | STAMP) & prev.prev.type))) {
                        temp = prev;
                        break;
                    }
                    temp = prev.prev;
                    if (!temp) break;
                }
                if (!temp || temp.type !== STRAP || !/^(im|ex)port$/.test(temp.text)) {
                    type = EXPRESS;
                }
            }
            else if (m === 'as') {
                if (!last) {
                    type = EXPRESS;
                    break;
                }
                if (last.type & (PROPERTY | EXPRESS | VALUE)
                    || last.type === STAMP && last.text === "*" && last.prev && (STRAP | STAMP) & last.prev.type) {
                } else {
                    type = EXPRESS;
                }
            }
            break;
    }
    if (type === PROPERTY) o.isprop = true;
    o.type = type;

};
var isShortMethodEnd = function (o) {
    if (!o) return false;
    if (o.type !== SCOPED || o.entry !== "{") return false;
    o = o.prev;
    if (!o) return false;
    if (o.type !== SCOPED || o.entry !== "(") return false;
    o = o.prev;
    if (!o) return false;
    return o.isprop;
};

var setObject = function (o) {
    o.isObject = true;
    var needproperty = true;
    for (var cx = 0; cx < o.length; cx++) {
        var m = o[cx];
        if (!needproperty) {
            if (m.type === SCOPED && m.entry === '{') {
                if (!m.isObject) setObject(m);
                continue;
            }
            if (m.type !== STAMP || m.text !== ',') continue;
        }
        if (m.type === STAMP && m.text === ':') {
            needproperty = false;
            continue;
        }
        if (m.type === LABEL) {
            o.splice(cx, 0, o[++cx].prev = m.next = m.next.prev = {
                prev: m,
                text: ':',
                type: STAMP,
                next: m.next,
            });
            m.type = PROPERTY;
            m.text = m.text.replace(/\:$/, '');
            m.isprop = true;
            m.end--;
            needproperty = false;
            continue;
        }
        m.isprop = true;
        if (m.type === EXPRESS || m.type === QUOTED) {
            if (!/\./.test(m.text)) m.type = PROPERTY;
        }
        if (m.prev && m.prev.type === PROPERTY) {

            m.prev.type = STRAP;
        }
    }
};
var detectLabel = function (o) {
    var queue = o.queue;
    var last = queue.last;
    var m = o.text;
    var type = o.type;
    var end = o.end;
    var inExpress = queue.inExpress;
    if (type === SPACE);
    else if (type !== STAMP);
    else if (m === ";") {
        if (last && last.isend === false) last.isend = true;
        inExpress = false;
    }
    else if (last) check: switch (m) {
        case "?":
            if (last.isprop) {
                o.type = EXPRESS;
                o.isprop = true;
                break;
            }
            inExpress = true;
            if (!queue.question) queue.question = 1;
            else queue.question++;
            break;
        case "=":
            if (last.type === SCOPED && last.brace) {
                if (!last.isObject) {
                    setObject(last);
                }
            }
            var lp = last.prev;
            if (lp?.type === STRAP && lp.text === 'type') {
                o.istype = true;
            }
        case ",":
            if (queue.isObject) {
                if (last.type === PROPERTY) {
                    last.short = true;
                }
            }
            inExpress = true;
            break;
        case ":":

            if (queue.question) {
                queue.question--;
                if (last.type === STAMP && last.text === '?') {
                    inExpress = false;
                    o.istype = true;
                    last.istype = true;
                    last.type = EXPRESS;
                }
                else {
                    inExpress = true;
                }
                break;
            }
            if (queue.isObject) {
                if (last.isprop) {
                    o.isExpress = false;
                    queue.inExpress = true;
                    return;
                }
            }
            inExpress = false;
            if (queue.entry && (!queue.brace || queue.isClass)) {
                o.istype = true;
                break;
            }
            var temp = last;
            while (temp) {
                if (temp.type === STRAP && colonstrap_reg.test(temp.text)) {
                    break check;
                }
                if (!temp.isExpress) break;
                temp = temp.prev;
            }
            if (!queue.isargl && last.type & (EXPRESS | STRAP | VALUE | QUOTED)) {
                // label
                var lp = last.prev;
                if (!lp || lp.type !== STRAP || lp.isend) {
                    last.type = LABEL;
                    last.text += ":";
                    last.end = end;
                    queue.inExpress = false;
                    return o;
                }
            }
            o.istype = true;
            break;
        default:
            inExpress = true;
    }
    else {
        inExpress = true;
    }
    if (inExpress !== queue.inExpress) {
        o.isExpress = queue.inExpress = inExpress;
    }
}

Javascript.prototype.setType = function (o) {
    if (detectLabel(o)) return false;
    var last = o.prev;
    if (last?.type === STRAP && o.type === STRAP && this.type_reg.test(last.text)) {
        if (/^(yield|await|async)$/.test(o.text)) o.type = EXPRESS;
    }
    if (o.type === STRAP) switch (o.text) {
        case "yield": setYieldExpress(o, this.defaultType); break;
        case "await": setAwaitExpress(o, this.defaultType); break;
    }
    if (o.type === EXPRESS && last?.type === EXPRESS && !last.isend && /^(async|await|yield)$/.test(last.text)) {
        last.type = STRAP;
    }
    var queue = o.queue;

    if (last) {
        if (o.type === STRAP && o.text === "function") {
            if (last.text === 'async' && !last.isend) last.type = STRAP;
        }
        if ((o.type & (EXPRESS | STRAP) && last.type === STAMP || o.type === STAMP && /^([\|\&]|\=\>)$/.test(o.text)) && (last.istype || last.isargl)) {
            o.istype = true;
        }
        if (queue.isargl) {
            if (last.type === STAMP && /^[,;]$/.test(last.text)) {
                o.isarg = true;
            };
        }
        if (o.type === STAMP && o.needle) {
            // o.type = EXPRESS;
        }
    }
    else {
        if (queue.isargl) {
            o.isarg = true;
        }
        else if (queue.istype) {
            o.istype = true;
        }
    }
    if (o.isarg && o.type === STRAP) {
        o.type = EXPRESS;
    }

    fixType(o);
    if (queue.isObject || queue.isClass) {
        if (o.type & (VALUE | QUOTED | STRAP | ELEMENT)) {
            o.isprop = isProperty(o);
        }
        else if (o.type === SCOPED) {
            if (o.entry === '[' || o.entry === '(') {
                o.isprop = isProperty(o);
            }
            else if (o.brace) {
                if (last && last.type === PROPERTY && last.text === 'static') {
                    last.type = STRAP;
                }
            }
        }
        else if (o.type === STAMP) {
            o.isprop = o.text === "*" && (!last || /^[,;]$/.test(last.text) || queue.isClass && isShortMethodEnd(last));
        }
        else if (o.type === PROPERTY) {
            o.isprop = true;
        }
        if (o.isprop) {
            if (last && last.type === PROPERTY && propresolve_reg.test(last.text) && (o.type !== SCOPED || o.entry === "[")) {
                last.type = STRAP;
            }
        }
    }
    if (o.isprop);
    else if (o.type === STRAP) {
        if (this.type_reg.test(o.text) && !this.funcstrap_reg.test(o.text)) {
            if (last) {
                if (last.type === STRAP && last.transive && !last.isend || last.type === STAMP && queue.inExpress) {
                    o.type = EXPRESS;
                }
            }
        }
        if (propresolve_reg.test(o.text)) o.type = EXPRESS;
    }
    if (last) {
        if (o.type === STAMP && o.text === "=>") {
            var pp = last.prev;
            if (pp?.type === EXPRESS && pp.text === 'async') {
                if (!pp.isend) pp.type = STRAP;
            }
        }
    }
};

var js = new Javascript;
var scan = function (data) {
    js.lastIndex = 0;
    return js.exec(data);
};
var detourTemplate = function (raw, params) {
    var spliter = { text: ",", type: STAMP };
    var template = scan(`extend([],{["raw"]:[]})`);
    rootenvs.extend = true;
    var str0 = template[1].first;
    var str1 = template[1][2][2];
    for (var r of raw) {
        str0.push({ text: strings.recode("`" + r.text + "`"), type: QUOTED }, spliter);
        str1.push({ text: strings.encode(r.text), type: QUOTED }, spliter);
    }
    str0.pop();
    str1.pop();
    for (var p of params) template.push(spliter), hasComma(p) ? template.push(p) : template.push(...p);
    return template;
};

var collectProperty = function (o, text) {
    var q = o.queue;
    if (!q.defined) q.defined = Object.create(null);
    if (q.defined[text]) {
        var t = q.defined[text];
        var p = t.prev;
        while (p && (p.type !== STAMP || p.text !== ',')) p = p.prev;
        var start = p ? q.indexOf(p) + 1 : 0;
        var n = t.next;
        while (n && (n.type !== STAMP || n.text !== ',')) n = n.next;
        var end = n ? q.indexOf(n, start) + 1 : q.length;
        var s = splice(q, start, end - start);
        if (s.length) console.info(i18n`属性<green>${text}</green>被后文覆盖，已移除<yellow>${createString(s)}</yellow>\r\n`);
        if (p && n) {
            var pp = p.prev;
            n.prev = pp;
            if (pp) pp.next = n;
        }
    }
    q.defined[text] = o;
};

var hasComma = function (c) {
    for (var cc of c) {
        if (cc.type === STAMP && cc.text === ',') return true;
    }
    return false;
}
var removeQuote = function (o, c, i) {
    if (hasComma(c)) return;
    if (!isFinite(i)) i = o.indexOf(c);
    splice(o, i, 1, ...c);
    var ch = c[0];
    var cf = c[c.length - 1];
    ch.prev = c.prev;
    cf.next = c.next;
    if (c.prev) c.prev.next = ch;
    if (c.next) c.next.prev = cf;
}

Javascript.prototype.detour = function (body, ie) {
    context = this;
    var envs = rootenvs = Object.create(null);
    detour(body.first, ie);
    rootenvs = null;
    context = null;
    return envs;
}
var context = null, rootenvs = null;
function detour(o, ie) {
    while (o) {
        switch (o.type) {
            case SCOPED:
                detour(o.first, ie);
                break;
            case STAMP:
                if (o.text === "?.") {
                    var h = snapExpressHead(o);
                    var f = snapExpressFoot(o);
                    o = h;
                    var rest = [o];
                    while (o !== f) {
                        o = o.next;
                        rest.push(o);
                    }
                    text = createString(rest);
                    remove(h, f.prev);
                    text = renderExpress(text, false);
                    if (hasdot) text = "..." + text;
                    var o1 = scan(text);
                    detour(o1.first, ie);
                    patchArrawScope(o1, o);
                    replace(o, ...o1);
                    o = o1.last;
                    continue;
                }
                else if (o.text === '.') {
                    var n = o.next;
                    remove(o);
                    if (n.type === EXPRESS) {
                        n.text = `[${strings.recode(n.text)}]`;
                    }
                    o = n;
                    continue;
                }
                break;
            case EXPRESS:
                var text = o.text.replace(/^\.\.\./, '');
                var hasdot = o.text.length !== text.length;
                if (context.avoidMap) {
                    var m = /^[^\.\[\]]+/.exec(o.text);
                    if (m) { context.avoidMap[m[0]] = true; }
                }
                text = text.replace(/\.([^\.\[\!\=\:]+)/g, (_, a) => ie === undefined || context.strap_reg.test(a) || /#/.test(a) ? `[${strings.recode(a)}]` : _);
                if (hasdot) text = "..." + text;
                o.text = text;
                break;
            case VALUE:
                o.text = String(o.text).replace(/_/g, '')
                    .replace(/\.e/, 'e')
                    .replace(/\.$/, '')
                    .replace(/^\./, '0.');
                if (/^0[0-7]+$/.test(o.text)) {
                    o.text = '0o' + o.text.slice(1);
                }
                break;
            case QUOTED:
                if (o.length) {
                    if (!o.prev || o.prev.type & (STAMP | STRAP)) {
                        o.type = SCOPED;
                        o.entry = '[';
                        o.leave = `]["join"]("")`;
                        for (var cx = o.length - 1; cx >= 0; cx--) {
                            var c = o[cx];
                            if (c.type === PIECE) {
                                c.type = QUOTED;
                                c.text = strings.recode("`" + c.text + "`");
                                splice(o, cx + 1, 0, { type: STAMP, text: ',' });
                            }
                            else {
                                c.entry = "(";
                                c.leave = ")";
                                detour(c.first, ie);
                                splice(o, cx + 1, 0, { type: STAMP, text: ',' });
                                removeQuote(o, c);
                            }
                        }
                        if (o.length) {
                            o.pop();
                            o.last = o.last.prev;
                        }
                    }
                    else {
                        var raw = [];
                        var params = [];

                        for (var c of o) {
                            if (c.type === PIECE) {
                                raw.push(c);
                            } else {
                                c.entry = '(';
                                c.leave = ")";
                                detour(c.first, ie);
                                params.push(c);
                            }
                        }
                        o.type = SCOPED;
                        o.entry = "(";
                        o.leave = ")";
                        var temp = detourTemplate(raw, params);
                        o.splice(0, o.length);
                        o.push.apply(o, temp);
                    }
                    break;
                }
                else if (!o.prev || o.prev.type & (STAMP | STRAP)) {
                    if (/^[`]/.test(o.text)) {
                        o.text = strings.recode(o.text);
                    }
                }
                else {
                    if (/^`/.test(o.text)) {
                        o.text = o.text.replace(/^`|`$/g, '');
                        var template = detourTemplate([o], []);
                        o.type = SCOPED;
                        o.entry = "(";
                        o.leave = ")";
                        delete o.text;
                        o.push.apply(o, template);
                    }
                }
                if (!o.isprop) break;
            case PROPERTY:
                if (!o.isend && propresolve_reg.test(o.text) && o.next && (o.next.type === PROPERTY || o.next.isprop)) break;
                if (o.text === 'static' && o.next && o.next.type === SCOPED && o.next.entry === '{') break;
                if (/^\[/.test(o.text)) break;
                if (o.queue.isObject) {
                    var text = strings.recode(o.text);
                    if (ie === undefined || o.prev && (o.prev.type !== STAMP || o.prev.text !== ",") || context.strap_reg.test(o.text)) {
                        text = `[${text}]`;
                    }
                    else if (ie !== false) {
                        collectProperty(o, text);
                    }
                    if (o.short) {
                        unshort(o, text);
                    }
                    else {
                        o.text = text;
                    }
                }
                else if (o.queue.isClass) {
                    if (o.text === 'constructor') break;
                    var text = strings.recode(o.text);
                    if (o.prev) {
                        var prev = o.prev;
                        if (prev && prev.isprop && !prev.isend && propresolve_reg.test(prev.text)) {
                            prev = prev.prev;
                        }
                        if (prev && prev.type === STAMP && prev.isprop) prev = prev.prev;
                        if (prev && (prev.type !== STAMP || prev.text !== ';')) insertAfter(prev, { text: ';', type: STAMP });
                    }
                    o.text = `[${text}]`;
                    if (o.next && o.next.type === SCOPED && o.next.entry === "(") { }
                    else if (!o.next || o.next.type !== STAMP || o.next.text !== "=") {
                        insertAfter(o, { text: "=", type: STAMP }, { text: "undefined", type: VALUE, isExpress: true });
                    }
                }
                break;
        }
        if (o) o = o.next;
    }
};
var _splice_keepspace = function (a, i) {
    var res = splice.apply(null, arguments);
    if (res.length) {
        var start = res[0].prev;
        var end = res[res.length - 1].next;
        if (!start) start = 0;
        else start = start.row;
        if (end) end = end.row;
        var delta = end - start;
        if (delta > 0) {
            splice(a, i, 0, { type: SPACE, text: Array(delta + 1).join('\r\n') });
        }
    }
    return res;
}
var removeImport = function (c, i, code) {
    var next = c.next;
    var { used, envs, vars } = code;
    if (next && next.type !== QUOTED) {
        var [dec, map, o] = getDeclared(c.next, 'remove');
        if (!o) throw new Error(i18n`代码结构异常！`);
        if (o.type !== STRAP || o.text !== 'from') throw new Error(i18n`缺少from语句`);
        var oi = code.indexOf(o, i);
    }
    else code.splice(i, 1), o = c, oi = i - 1;
    var n = o.next;
    var t = null;
    if (n && n.type === EXPRESS) {
        t = Object.create(null);
        var ts = n.text.split(".")
        for (var e of ts) {
            t[e] = true;
        }
        var ni = code.indexOf(n, i);
        removeFromList(used[ts[0]], n);
        splice(code, ni, 1);
        n = n.next;
    }
    if (!n || n.type !== QUOTED) throw new Error(i18n`缺少导入路径！`);
    var ns = skipAssignment(n);
    var nsi = ns ? code.indexOf(ns, i) : code.length;
    var q = scan(`require()`);
    if (!used.require) used.require = [], envs.require = true;
    used.require.push(q[0]);
    Object.assign(q[0], t);
    var cs = code.splice(oi + 1, nsi - oi - 1, ...q);
    q[1].push.apply(q[1], cs);
    relink(q[1]);
    setqueue(q[1]);
    if (!dec) return;
    var name = null;
    var na = dec.attributes[0];
    o.type = STAMP;
    o.text = '=';
    c.text = 'var';
    dec.forEach(function (name1, i) {
        if (typeof name1 === 'string' && name1 !== '*') {
            if (na[i] === '*') {
                if (name) {
                    used[name1].forEach(u => {
                        u.text = u.text.replace(/^[^\.\[]+/, name);
                    });
                }
                else name = name1;
            }
            else {
                if (!name) name = name1;
                used[name1].forEach(u => {
                    compile$patchname(name, u, ".default");
                });
            }
        }
    })
    if (!name) {
        name = strings.decode(q[1].last.text)
            .replace(/\.[^\.\/\\]+$/, '')
            .split(/[\/\\\:\{\}\[\]\.\+\-\*\/\!\~\|\:;,'"`\(\)\>\<\?\^%&\s]+/)
            .filter(a => !!a).pop();
        if (!this.express_reg.test(name)) name = "imported";
        var id = 0;
        while (this.strap_reg.test(name) || name in used) {
            name = name.replace(/\d+$/, '') + ++id;
        }
        used[name] = [];
    }
    dec.forEach(function (d) {
        if (d instanceof Array) d.forEach((dn, i) => {
            var da = d.attributes[i][0];
            if (used[dn]) used[dn].forEach(u => {
                if (used[name].indexOf(u) >= 0) return;
                patchname(name, u, da);
                if (u.kind !== 'remove') used[name].push(u);
            });
            delete used[dn];
            delete vars[dn];
        });
    });
    var u = { type: EXPRESS, text: name };
    _splice_keepspace(code, i + 1, oi - i - 1, u);
    used[name].push(u);
    return u;
};
var removeExport = function (c, i, code) {
    var { envs, used } = code;
    if (!used.exports) envs.exports = true, used.exports = [];
    var n = c.next;
    if (n.type === STAMP && n.text === '*') {
        var u = removeImport.call(this, c, i, code);
        if (!code.exportStars) code.exportStars = [];
        code.exportStars.push(u);
        return;
    }
    if (n.type === SCOPED) {
        var o = n.first;
        var allexports = [];
        while (o) {
            var name = o, prop = o.text;
            var n = o.next;
            if (n && n.type === STRAP && n.text === 'as') {
                var nn = n.next;
                if (!nn) throw new Error(i18n`缺少导出名！`);
                prop = nn.text;
                o = nn;
                n = o.next;
            }
            o = n && n.next;
            var exp = scan(`\r\nexports.${prop}=`);
            exp.push(name);
            name.isExpress = true;
            allexports.push(exp);
        }
        var ni = skipAssignment(code, i);
        code.splice(i, ni - i);
        for (var exp of allexports) {
            code.splice(i, 0, ...exp);
        }
        return;
    }
    if (n.type !== STRAP) throw new Error(i18n`代码结构异常！`);
    if (n.text === 'default') {
        n.text = '=';
        n.type = STAMP;
        c.text = `exports.default`;
        code.exportDefault = true;
        n.next.isExpress = true;
        c.type = EXPRESS;
        return;
    }
    var [dec, map, o] = getDeclared(n.next, 'export');
    if (/^(class|function)$/.test(n.text)) {
        var e = skipAssignment(code, i + 1);
        if (code[e] && code[e].type !== STAMP) {
            code.splice(e, 0, { type: STAMP, text: ';' });
        }
        c.text = `exports.${dec[0]}`;
        c.type = EXPRESS;
        n.isExpress = true;
        code.splice(i + 1, 0, ...scan(`=`));
        var nn = n.next;
        var d = nn.text;
        if (used[d]) used[d].forEach(a => {
            if (!a.kind) {
                patchname('exports.', a);
            }
        });
        delete used[d];
        delete envs[d];
        return;
    }
    var nn = n.next;
    if (!nn) throw new Error(i18n`缺少导出项！`);
    if (nn.type === SCOPED && nn.entry !== '{' && c.prev) {
        if (c.prev.type !== STAMP || c.prev.text !== ';') {
            code.splice(i++, 0, { type: STAMP, text: ';' });
        }
    }
    var oi = code.indexOf(nn, i);
    if (!code.exportDecs) {
        code.exportDecs = [];
    }
    dec.forEach(function rm(d) {
        if (d instanceof Array) return d.forEach(rm);
        for (var a of used[d]) {
            if (a.kind && a.kind !== 'export') continue;
            if (!a.export) code.exportDecs.push(a), a.export = true;
        }
    });
    dec.forEach(d => {
        if (typeof d === 'string') for (var a of used[d]) if (a.kind === 'export') a.needEqual = true;
    });
    code.splice(i, oi - i);
};

Javascript.prototype.fix = function (code) {
    backEach(code, function (o, i) {
        if (o.type !== STRAP) return;
        if (o.text === 'import') removeImport.call(this, o, i, code);
        else if (o.text === 'export') removeExport.call(this, o, i, code);
    }, this);
    if (code.exportStars) {
        var exportStars = code.exportStars;
        if (!code.exportDefault) code.push(...scan(`\r\nexports.default=undefined`));
        exportStars.forEach(u => {
            code.push(...scan(`\r\nextendIfNeeded(exports,${u.text})`));
        });
        delete code.exportStars;
        delete code.exportDefault;
    }
    var imports = code.used.import;
    if (imports) {
        if (!code.used.require) {
            code.used.require = [];
            code.envs.require = true;
        }
        var requires = code.used.require;
        imports = imports.filter(m => {
            if (m.next?.text === '.') {
                var o = m;
                var s = snapExpressFoot(o);
                var a = [o];
                while (o !== s) {
                    o = o.next;
                    a.push(o);
                }
                m.text = createString(a);
                remove(m.next, s);
            }
            if (/^import\.meta($|\.)/.test(m.text)) {
                m.text = m.text.replace(/\./, '_');
                return true;
            }
            m.text = m.text.replace(/^import/g, 'require');
            requires.push(m);
        });
        delete code.used.import;
        delete code.envs.import;
        if (imports.length) code.used["import_meta"] = imports, code.envs["import_meta"] = true;
    }
    if (code.exportDecs) {
        var exportDecs = code.exportDecs;
        delete code.exportDecs;
        exportDecs.forEach(e => {
            e.text = 'exports.' + e.text;
            if (e.needEqual) {
                var n = e.next;
                if (!n || n.type !== STAMP || n.text !== '=') {
                    var i = code.indexOf(e);
                    code.splice(i + 1, 0, ...scan(`= undefined`));
                }
            }
        });
    }
    relink(code);
    setqueue(code);
}
Javascript.prototype.createString = createString;
Javascript.prototype.createScoped = createScoped;
module.exports = Javascript;