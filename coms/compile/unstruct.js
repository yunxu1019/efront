var { SPACE, COMMENT, EXPRESS, STRAP, QUOTED, STAMP, SCOPED, VALUE, LABEL, createString, skipAssignment, skipSentenceQueue, isHalfSentence, splice, relink, createExpressList, snapExpressHead, snapExpressFoot } = require("./common");
var scanner2 = require("./scanner2");
var RE = { type: STRAP, text: "@re" };// if (_) return
var RZ = { type: STRAP, text: "@rz" };// if (!_) return
var RD = { type: STRAP, text: "@rd" };// if (_) return
var RETURN = { type: STRAP, text: "@ret" };// return;
var THROW = { type: STRAP, text: "@throw" };// return;
var YIELD = { type: STRAP, text: "@yield" };// return;
var NEXT = { type: STRAP, text: "@next" };// return;
var _break = function (body, cx, result, iscontinue) {
    var re = result[result.length - 1];
    if (!result.length || re.ret_ && !re.await_ && re.ret_ !== -2) return;
    var label;
    do {
        var o = body[++cx];
        if (!o || o.type === SPACE || o.type === STAMP && o.text === ';') break;
        if (o.type === EXPRESS) label = o.text;
    } while (true);
    var bx = cx;
    if (label) {
        var s;
        for (var cx = labels.length - 1; cx >= 0; cx--) {
            var b = labels[cx];
            if (b.type === LABEL && b.text === label + ":") {
                if (!s) s = b;
                if (!b.breaks) b.breaks = [];
                var _b = scanner2('return []');
                _b.ret_ = -1;
                if (iscontinue) _b[1].continue = s, s.continue = true;
                b.breaks.push(_b[1]);
                pushstep(result, _b);
                break;
            }
            else {
                s = b;
            }
        }
    }
    else {
        for (var cx = labels.length - 1; cx >= 0; cx--) {
            var b = labels[cx];
            if (b.type !== LABEL && (!iscontinue || b.text !== 'switch')) {
                if (!b.breaks) b.breaks = [];
                var _b = scanner2("return []");
                _b.ret_ = -1;
                if (iscontinue) _b[1].continue = b, b.continue = true;
                b.breaks.push(_b[1]);
                pushstep(result, _b);
                break;
            }
        }
    }
    return bx;
};
var _try = function (body, cx, unblock, result, getname) {
    var o = body[cx];
    o = o.next;
    while (body[cx++] !== o);
    var trystart = stepReturn(0, 7);
    var tse = trystart[trystart.length - 1];
    pushstep(result, trystart);
    var tryoffset = result.length;
    unblock(o);
    var final = stepReturn(0, 9);
    pushstep(result, final);
    o = o.next;
    var catchoffset = result.length;
    if (o.type === STRAP && o.text === 'catch') {
        o = o.next;
        var arg = [];
        if (o.type === SCOPED && o.entry === "(") {
            var e = o.first;
            if (e) {
                arg = scanner2(`${e.text}=${ret_ || "@"};`);
            }
            o = o.next;
        }
        var ai = result.length;
        unblock(o);
        if (ai < result.length) {
            if (arg.length) result[ai].unshift(...arg), result[ai].awaited = true, relink(result[ai]);
            if (!result[result.length - 1].ret_) pushstep(result, stepReturn(0, 9));
        }
        o = o.next;
    }
    else tse[2].text = '8';
    var finishoffset = result.length;
    if (o && o.type === STRAP && o.text === 'finally') {
        o = o.next;
        unblock(o);
        o = o.next;
    }
    tse[0].text = String(catchoffset - tryoffset | finishoffset - catchoffset << 16);
    var finalend = stepReturn(1, 9);
    pushstep(result, finalend);
    while (cx < body.length && body[cx] !== o) cx++;
    return cx;
};
var evals = [];

var _with = function (body, cx, unblock, result, getname) {
    var o = body[cx];
    var c = o.next;
    while (body[cx] !== c) cx++;
    var qs = ternary(c, getname, true);
    for (var q of qs) if (q.length) pushstep(result, q);
    evals.push(q.name);
    var block = getblock(body, ++cx);
    cx += block.length;
    unblock(block);
    evals.pop();
    return cx;
};
var _withget = function (text) {
    var index = text.indexOf('.');
    if (index < 0) index = text.length;
    var name = text.slice(0, index);
    var prop = text.slice(index);
    return `withget_("${name}",[${evals.join(',')}],${name})${prop}`;
};
var _withset = function (text, tmpname, valname) {
    var index = text.indexOf(".");
    if (index < 0) index = text.length;
    var name = text.slice(0, index);
    return `if(${tmpname}=with_("${name}",[${evals.join(",")}]))${tmpname}.${text}=${valname};else ${text}=${valname};`;
};
var _switch = function (body, cx, unblock, result, getname) {
    var o = body[cx];
    o = o.next;
    if (!o) return;
    var qt = ternary(o, getname, true);
    for (var q of qt) if (q.length) pushstep(result, q);
    var q = qt[qt.length - 1];
    var qn = q.name;
    o = o.next;
    while (body[cx++] !== o);
    if (!o) return;
    var cy = 0;
    var m = o.first;
    var tmp = [];
    while (o[cy] !== m) cy++;
    while (cy < o.length) {
        var block = getblock(o, ++cy);
        cy += block.length;
        while (cy < o.length && o[cy].type & (SPACE | COMMENT)) cy++;
        cy++;
        var getnextname = function (deep) {
            return getname(deep + 1);
        };
        var q = ternary(block, getnextname, true);
        for (var q of q) if (q.length) pushstep(result, q);
        var qe = q;
        if (qe.name) var case_ = scanner2(`if(${qn}===${qe.name})return[]`);
        else case_ = scanner2(`return[]`), case_.ret_ = -1;
        pushstep(result, case_);
        var by = cy;
        m = o[cy];
        while (m && (m.type !== STRAP || !/^(default|case)$/i.test(m.text))) m = o[++cy];
        tmp.push(result.length - 1, case_[case_.length - 1], o.slice(by, cy));
    }
    if (!result[result.length - 1].ret_) {
        case_ = scanner2(`return[]`), case_.ret_ = -1;
        pushstep(result, case_);
        tmp.push(result.length - 1, case_[case_.length - 1], []);
    }
    while (tmp.length) {
        cy = tmp.shift();
        q = tmp.shift();
        block = tmp.shift();
        q.push({ type: VALUE, text: String(result.length - cy) }, { type: STAMP, text: "," }, { type: VALUE, text: '0' });
        relink(q);
        unblock(block);
        ifpatch(result);
    }
    return cx;
};
var _for = function (body, cx, unblock, result) {
    var o = body[cx];
    var label = o;
    o = o.next;
    var m = o.first;
    if (m.type === STRAP && /^(let|const|var)$/.test(m.text)) {
        m = m.next;
    }
    var mn = m.next;
    if (mn.type === STRAP && mn.text === 'in') {
        // 含有高级语法的 for in 语句在 ./downLevel.js 中预处理
        var dx = cx;
        var n = o.next;
        if (n && n.type === SCOPED && n.entry === '(') n = n.next;
        while (body[dx] !== n) dx++;
        var forin = body.slice(cx, dx);
        var block = getblock(body, dx);
        forin.push(...block);
        pushstep(result, forin);
        return dx + block.length + 1;
    }
    var cy = 0;
    while (o[cy] !== m) cy++;
    var block = getblock(o, cy);// init
    cy += block.length + 1;
    unblock(block);
    if (result.length) pushstep(result, stepReturn(1, 0));
    var block1 = getblock(o, cy);// condition
    cy += block1.length + 1;
    var block2 = getblock(o, cy);// next
    while (body[cx] !== o) cx++;
    var block_ = getblock(body, ++cx);// body
    cx += block_.length;
    var c = result.length;
    if (block1.length) {
        var t = unblock(block1);
        if (t) {
            t = t && !t.await_ ? t.name : ret_;
            var b = scanner2(`if(!${t})return []`);
            var be = b[b.length - 1];
            pushstep(result, b);
        }
    }
    var i = result.length;
    unblock(block_);
    if (label.continue) ifpatch(result), label.contat = result.length;
    unblock(block2);
    var loopback = stepReturn(0, 0);
    var le = loopback[loopback.length - 1];
    pushstep(result, loopback);
    if (be) be.push(...scanner2(`${result.length - i + 1},0`)), relink(be);
    le[0].text = String(c - result.length + 1);
    return cx;
};
var isunary = function (o) {
    var f = o.first;
    if (!f) return false;
    while (f) {
        if (f.type & (STAMP | STRAP) && powermap[f.text] < powermap.new) return false;
        f = f.next;
    }
    return true;
}
var getCondition = function (o, unblock, not_) {
    var n = '';
    var f = o.first;
    var not = isunary(o) && f.type === STAMP && f.text === "!";
    if (not) f = f.next, o.shift();
    if (not_) not = !not;
    if (f && f === o.last) {
        if (f.type & (EXPRESS | VALUE)) {
            n = f.text;
        }
        if (not && n) {
            if (f.type === VALUE) {
                n = String(eval("!" + f.text));
            }
            else n = "!" + n;
        }
    }
    if (!n) {
        n = unblock(o);
        if (n.await_) {
            n.ret_ = true;
            delete n.await_;
            n.await__ = true;
            n = ret_;
        }
        else n = n.name;
        if (not) n = "!" + n;
    }
    return n;
}
var _while = function (body, cx, unblock, result) {
    var o = body[cx];
    ifpatch(result);
    o.contat = result.length;
    o = o.next;
    while (body[cx] !== o) cx++;
    var i = result.length;
    var b = scanner2(`if(${getCondition(o, unblock, true)})return []`);
    var be = b[b.length - 1];
    pushstep(result, b);
    relink(result[result.length - 1]);
    var block = getblock(body, ++cx);
    cx += block.length;
    unblock(block);
    var wend = stepReturn(0, 0);
    var we = wend[wend.length - 1];
    pushstep(result, wend);
    we[0].text = String(1 + i - result.length);
    be.push(...scanner2(`${result.length - i},0`));
    return cx;
};
var pushstep = function (result, step) {
    if (isempty(step, SPACE)) {
        return;
    }
    var q = result[result.length - 1];
    if (!q) {
        result.push(step);
    }
    else if (q.await_) {
        if (!step.awaited) {
            step.unshift(...scanner2(`${q.name}=${ret_};`)), relink(step);
            step.awaited = true;
        }
        result.push(step);
    }
    else if (q.ret_) {
        if (q.await__) step.awaited = true;
        result.push(step);
    }
    else {
        if (needcomma(q)) q.push({ type: STAMP, text: ';' });
        if (!ishalf(q)) {
            q.ret_ = step.ret_;
            q.ifbrk = step.ifbrk;
        }
        q.push(...step);
        q.await_ = step.await_;
        q.name = step.name;
        q.skip = !!step.skip;
        step = q;
        relink(q);
    }
    _return(step);
};
var patchstep = function (r, nextindex, h) {
    var name = r.name;
    var o, i, x, p, n;
    if (evals.length) for (var i = r.length - 1; i >= h; i--) {
        o = r[i];
        if (o.set) {
            var [m, _, b] = r.splice(i, 3);
            r.splice(i, 0, ...scanner2(_withset(m.text, m.set, b.text)));
        }
        else if (o.get) {
            r.splice(i, 1, ...scanner2(_withget(b.text)));
        }
    }
    for (i = r.length - 1; i >= h; i--) {
        o = r[i];
        if (o === RZ) {
            x = scanner2(`if(!${name})return [${nextindex},0]`);
        }
        else if (o === RE) {
            x = scanner2(`if(${name})return [${nextindex},0]`);
        }
        else if (o === RD) {
            x = scanner2(`if(${name}!==null&&${name}!== undefined)return [${nextindex},0]`);
        }
        else continue;
        var p = o.prev;
        if (!p || p.type === STAMP && p.text === ";");
        else x.unshift({ type: STAMP, text: ";" });
        var n = o.next;
        if (!n || n.type === STAMP && n.text === ';');
        else x.push({ type: STAMP, text: ';' });
        r.splice(i, 1, ...x);
        relink(r);
    }
};
var flushqueue = function (result, queue) {
    var savedLength = result.length;
    var savedIndex = savedLength - 1;
    var prev = result[savedIndex];
    if (prev) var patch = prev.length;
    for (var q of queue) pushstep(result, q);
    queue = [];
    if (ret_) {
        if (prev) patchstep(prev, result.length - savedIndex, patch || 0);
        result.slice(savedLength).forEach((a, i) => patchstep(a, result.length - savedLength - i, 0));
    }
};

var _do = function (body, cx, unblock, result) {
    var o = body[cx];
    var label = o;
    o = o.next;
    ifpatch(result);
    var i = result.length;
    unblock(o);
    o = o.next.next;

    if (label.continue) ifpatch(result), label.contat = result.length;
    var b = scanner2(`if(${getCondition(o, unblock)})return [${i - result.length},0]`);
    pushstep(result, b);
    while (body[cx] !== o) cx++;
    return cx + 1;
};
var stepReturn = function (value, type, q) {
    var r = scanner2(`return [${value},${type}]`);
    r.ret_ = type === 2 ? type : true;
    if (q && q.length) r.name = q[q.length - 1].name;
    return r;
}
var needbreak = function (o) {
    return o && o.type === STAMP && /^[,;]$/.test(o.text) || o === RD || o == RE || o === RZ || isretn(o);
};
var isretn = function (o) {
    return o === RETURN || o === NEXT || o === YIELD || o === THROW;
}
var _return = function (r) {
    var name = r.name;
    var e = r[r.length - 1];
    if (!isretn(e)) return;
    r.pop();
    r.ret_ = !ishalf(r);
    var x;
    if (e === RETURN) {
        x = stepReturn(name, 2);
    }
    else if (e === THROW) {
        x = scanner2(`throw ${name}`);
    }
    else if (e === YIELD) {
        x = stepReturn(name, 3);
        r.await_ = !r.skip;
    }
    else if (e === NEXT) {
        x = stepReturn(name, 1);
        r.await_ = true;
    }
    if (needcomma(r)) r.push({ type: STAMP, text: ';' });
    else if (r.length) {
        var re = r[r.length - 1];
        if (re.type === STAMP && re.text === ',') re.text = ';';
    }
    r.push(...x);
    relink(r);
};
var remove_end_comma = function (o) {
    if (!o.length || o.type !== SCOPED || o.entry === '[') return;
    for (var cx = o.length - 1; cx >= 0; cx--) {
        var m = o[cx];
        if (!(m.type & (SPACE | COMMENT))) {
            break;
        }
    }
    if (m && m.type === STAMP && m.text === ',') {
        splice(o, cx, o.length - cx);
    }
};
var isEvalScope = function (o) {
    if (o.entry === "[") {
        var h = snapExpressHead(o);
        return o !== h;
    }
    else if (o.entry === '(') {
        var h = snapExpressHead(o);
        return o === h;
    }
    return false;
};
var ispropcall = function (o) {
    var n = o.next;
    if (!n || n.type !== SCOPED && n.entry !== '(') return false;
    if (o.type === EXPRESS && snapExpressHead(o) !== o) return true;
    if (o.type === SCOPED && o.entry === '[' && snapExpressHead(o) !== o) return true;
    return false;
};
var _invoke = function (t, getname) {
    var nameindex = 0;
    var getdeepname = function (deep = 0) {
        return getname(nameindex + deep)
    };
    var result = [];
    var cache = [];
    var queue = [];
    queue.name = t.name;
    var qname = t.name;
    var bx = 0;
    for (var cx = 0; cx < t.length; cx++) {
        var o = t[cx];
        a: if (o.type === STRAP) {
            if (/^(async|function)/.test(o.text)) while (o && o.entry !== "{") o = o.next;
            else if (o.text === 'class') {
                while (o && !o.isClass) o = o.next;
                var n = o.next;
                while (n && n.isClass) o = n, n = n.next;
            }
            else break a;
            cx = t.indexOf(o, cx);
            if (cx < 0) cx = t.length;
            continue;
        }
        if (needbreak(o)) {
            var s = splice(t, bx, cx + 1 - bx);
            if (cx > 0) s.name = s[0].text;
            else s.name = qname;
            queue.push(s);
            cx = bx - 1;
            bx = cx + 1;
            continue;
        }
        if (o.type === SCOPED && (o.entry === '[' || o.entry === "(")) {
            var _nameindex = nameindex;
            remove_end_comma(o);
            var iseval = isEvalScope(o);
            var constStart = 0;
            if (!iseval) {
                for (var cy = 0; cy < o.length; cy++) {
                    while (cy < o.length && o[cy].type & (SPACE | COMMENT)) cy++;
                    var ay = cy;
                    cy = skipAssignment(o, cy);
                    if (cy === ay || ay >= o.length) continue;
                    var m = o[ay];
                    if (cy === ay + 1 && (m.type === EXPRESS && (strip || !/[\.\[]/.test(m.text)) || m.type === VALUE || m.type === QUOTED && !m.length)) {
                        continue;
                    }
                    constStart = cy + 1;
                }
            }
            for (var cy = 0; cy < o.length; cy++) {
                var by = cy;
                while (cy < o.length && o[cy].type & (SPACE | COMMENT)) cy++;
                var ay = cy;
                cy = skipAssignment(o, cy);
                var ey = cy;
                if (ay === ey || ay >= o.length) continue;
                var m = o.slice(ay, ey);
                if (m.length === 1 && (m[0].type === EXPRESS && !/[\.\[]/.test(m[0].text) && ay >= constStart || m[0].type === VALUE || m[0].type === QUOTED && !m[0].length)) {
                    continue;
                }
                if (!iseval || m[m.length - 1] === o.last) {
                    var q = toqueue(m, getdeepname, 1);
                    var qe = q[q.length - 1];
                    splice(o, by, ey - by, { text: qe.name, type: EXPRESS });
                    cy = by + 1;
                }
                else {
                    var q = toqueue(m, getdeepname, false);
                    while (cy < o.length && o[cy].type & (SPACE | COMMENT)) cy++;
                    var c = o[cy];
                    if (c && c.type & STAMP && /^[,;]$/.test(c.text)) cy++;
                    splice(o, 0, cy);
                    cy = -1;
                }
                cache.push(...q);
                nameindex++;
            }
            nameindex = _nameindex;
            // if (!cache.length) continue;
            if (queue.length) flushqueue(result, queue), queue = [];
            for (var c of cache) pushstep(result, c);
            cache = [];
            var n = o.next;
            if (n && !needbreak(n) && !ispropcall(o)) {
                var h = snapExpressHead(o);
                var hx = t.lastIndexOf(h, cx);
                var fs = splice(t, hx, cx + 1 - hx, { type: EXPRESS, text: getname(nameindex) });
                fs.unshift(...scanner2(`${getname(nameindex)}=`));
                relink(fs);
                fs.name = getname(nameindex);
                pushstep(result, fs);
                nameindex++;
                cx = hx - 1;
            }
        }
    }
    if (queue.length) {
        queue.push(t);
        flushqueue(result, queue);
    }
    else if (t.length) {
        var t0 = t[0];
        if (t0.type === EXPRESS && /^[\.\[]/.test(t0.text) || t0.type & (STAMP | STRAP) && powermap[t0.text] < powermap.new) {
            t.unshift(...scanner2(`${qname}=${qname}`));
            relink(t);
        }
        pushstep(result, t);
    }
    return result;
};

var _await = function (t) {
    var t0 = t[0];
    if (t0.type === STRAP) {
        var iw = 0;
        if (t0.text === 'await') iw = 1;
        else if (t0.text === 'yield') iw = 3;
        if (iw) t.shift();
        return iw;
    }
    return false;
};
var ishalf = function (q) {
    var i = q.length - 1;
    var e = q[i];
    while (i > 0 && e.type & (SPACE | COMMENT)) e = q[--i];
    if (!e) return false;
    return e.type === SCOPED && e.entry === '(' && e.prev && e.prev.type === STRAP && /^if$/.test(e.prev.text) || e.type === STRAP && /^else$/.test(e.text);
}
var isempty = function (q, ignore_types) {
    for (var a of q) {
        if (!(a.type & ignore_types || a.type === STAMP && /^[,;]$/.test(a.text))) return false;
    }
    return true;
}
var needcomma = function (q) {
    if (isempty(q, COMMENT | SPACE)) return false;
    if (ishalf(q)) return false;
    var i = q.length - 1;
    var e = q[i];
    while (e.type & (SPACE | COMMENT)) e = q[--i];
    return !needbreak(e);
};
var patchname = function (d, getname) {
    var de = d[d.length - 1];
    if (de && !de.name) {
        splice(de, 0, 0, { type: EXPRESS, text: getname(0) }, { type: STAMP, text: "=" });
        de.name = getname(0);
    }
};
var clone = function (o) {
    return Object.assign(o instanceof Array ? [] : {}, o, { prev: null, next: null });
};
var popass = function (explist) {
    var asn = explist.pop();
    var n;
    if (!asn.ret_ && asn.length) {
        asn = createExpressList(asn);
        if (asn.length > 1) {
            explist.push(...asn.slice(0, asn.length - 1));
            asn = asn.pop();
        }
        else {
            n = true;
            asn = asn.pop();
        }
    }
    else {
        n = asn.name;
        asn = [{ type: EXPRESS, text: n }];
    }
    return [asn, n];
}
var popexp = function (explist) {
    var asn = explist[explist.length - 1];
    var n;
    if (!asn.ret_) {
        explist.pop();
    }
    if (!asn.ret_ && asn.length) {
        if (asn.name) {
            asn = createExpressList(asn);
            if (asn.length > 1) {
                explist.push(...asn.slice(0, asn.length - 1));
            }
            asn = asn.pop();
            asn.shift();
            asn.shift();
        }
    }
    else {
        n = asn.name;
        asn = [{ type: EXPRESS, text: n }];
    }
    return [asn, n];
}

var ternary = function (body, getname, ret) {
    var eqused = 0;
    var getnextname = function (i) {
        return getname(i + eqused);
    };
    var question = [];
    var exphead = [];
    var equalsend = 0;
    var skip = 0;
    var equcount = 0;
    var hascalcequ = false;
    var equals = [];
    var explist = [];
    var hasquestion = false;
    for (var cx = 0, dx = body.length; cx < dx; cx++) {
        var o = body[cx];
        if (o.type === STRAP && /^(var|let|const)$/.test(o.text)) {
            skip = cx + 1;
            equalsend = skip;
            continue;
        }
        if (o.type !== STAMP) continue;
        if (o.text === '?') {
            question.push(cx);
        }
        else if (o.text === ":") {
            var bx = question.pop();
            if (!question.length) {
                var b = body.slice(equalsend, bx);
                relink(b);
                var c = toqueue(body.slice(bx + 1, cx), getnextname, true);
                var d = toqueue(body.slice(cx + 1), getnextname, true);
                patchname(c, getnextname);
                patchname(d, getnextname);
                pushstep(d, stepReturn(1, 0, d));
                pushstep(c, stepReturn(d.length + 1, 0, c));
                pushstep(explist, scanner2(`if(${getCondition(b, function (b) {
                    b = ternary(b, getnextname, true);
                    for (var b of b) pushstep(explist, b);
                    return b;
                }, true)})return [1,0]`));
                var q = explist[explist.length - 1];
                var qi = explist.length - 1;
                var qe = q[q.length - 1];
                if (c.length) {
                    pushstep(explist, c[0]);
                    explist.push(...c.slice(1));
                }
                qe.text = String(explist.length - qi);
                explist.push(...d);
                hasquestion = true;
                break;
            }
        }
        else if (powermap[o.text] === powermap["="]) {
            var ass = toqueue(body.slice(equalsend, cx), getnextname, false);
            var [ass1, n = ++eqused] = popass(ass);
            exphead.push(...ass);
            equals.push(...ass1, o);
            if (!question.length) equalsend = cx + 1, equcount++;
            if (o.text.length > 1) hascalcequ = true;
        }
    }
    if (!hasquestion) {
        var bd = equalsend ? body.slice(equalsend) : body;
        if (!ret && equcount === 1 && !hascalcequ && canbeOnce(bd)) {
            explist = [bd];
        }
        else if (ret === 1 && !equcount && canbeOnce(bd)) {
            var name = getnextname(0);
            var r = [{ type: EXPRESS, text: name }, { type: STAMP, text: '=' }, ...bd]
            r.name = name;
            explist = [r];
        }
        else {
            explist = _express(bd, getnextname, equalsend > skip || ret);
        }
    }
    if (equalsend === skip) {
        return explist;
    }
    relink(equals);
    explist.unshift(...exphead);
    var q = explist[explist.length - 1];
    // if (!q) throw `语法错误: <red>${createString(body)}</red> \r\n行列位置: ${equals[0].row}:${equals[0].col}`
    var n = q.name;
    var i = equals.length - 1;
    var isSimpleAssign = true;
    while (i >= 0) {
        var p = equals[i];
        while (p && p.type & (SPACE | COMMENT)) p = equals[--i];
        if (!p) break;
        var a = p.prev;
        var b = snapExpressHead(a);
        if (b) {
            var ai = equals.lastIndexOf(b, i);
        }
        else {
            var ai = equals.lastIndexOf(a, i);
        }
        if (ai < 0) ai = 0;
        var ass = equals.slice(ai, i);
        var eq = equals[i];
        if (isSimpleAssign) isSimpleAssign = ret !== 1 && canbeTemp(ass);
        if (isSimpleAssign && eq.text === '=') {
            [asn, n = createString(ass)] = popexp(explist);
        }
        else if (n) var asn = [{ type: EXPRESS, text: n }];
        else asn = explist.pop();
        var an = '';
        if (eq.text.length > 1) {
            var punc = eq.text.slice(0, eq.text.length - 1);
            var bdtmp = [...ass.map(clone), { type: STAMP, text: punc }, ...asn];
            relink(bdtmp);
            var explist2 = _express(bdtmp, getnextname, true);
            if (isSimpleAssign) {
                [asn, an = createString(ass)] = popexp(explist2);
            }
            else {
                var q2 = explist2[explist2.length - 1];
                an = q2.name;
                asn = scanner2(an);
            }
            for (var e of explist2) pushstep(explist, e);
            eq.text = "=";
        }
        else an = n;
        ass.push(equals[i], ...asn);
        relink(ass);
        if (evals.length) ass[0].set = getnextname(0);
        ass.name = an;
        patchstep(ass, ass.length, 0);
        pushstep(explist, ass);
        isSimpleAssign = false;
        i = ai - 1;
        n = an;
    }
    return explist;
};
var prefunc = function (sbody) {
    var fx = 0;
    for (var cx = 0, dx = sbody.length; cx < dx; cx++) {
        var o = sbody[cx];
        var bx = cx;
        while (o && o.type & (SPACE | COMMENT)) o = sbody[++cx];
        if (!o) break;
        if (o.type === STRAP && /^(async|function|class)$/.test(o.text)) {
            if (!o.isExpress) {
                var ex = skipAssignment(sbody, cx);
                var fname = '';
                o = o.next;
                while (o.type & (STRAP | STAMP)) o = o.next;
                if (o.type === EXPRESS) fname = o.text;
                if (fname) {
                    if (isHalfSentence(sbody, cx - 1)) {
                        splice(sbody, cx, 0, { type: EXPRESS, text: fname }, { type: STAMP, text: "=" });
                    }
                    else {
                        var sb = splice(sbody, bx, ex - bx);
                        splice(sbody, fx, 0, { type: EXPRESS, text: fname }, { type: STAMP, text: "=" }, ...sb);
                        fx += ex - bx + 2;
                    }
                    ex += 2;
                    dx += 2;
                }
                cx = ex;
                continue;
            }
        }
    }
};

var isFunctionOnly = function (body) {
    for (var cx = 2, dx = body.length; cx < dx; cx++) {
        if (body[cx].type & (SPACE | COMMENT)) continue;
        break;
    }
    var o = body[cx];
    if (!o) return false;
    if (o.type === STRAP) {
        if (/^(async|function)$/.test(o.text)) while (o && o.entry !== "{") o = body[cx++];
        else if (o.text === 'class') {
            while (o && !o.isClass) o = body[cx++];
            while (o && (o.type & (SPACE | COMMENT) || o.isClass)) o = body[cx++];
        }
        else return false;
        if (!o) return true;
    }
    else return false;
    for (; cx < dx; cx++) {
        if (!(body[cx].type & (SPACE | COMMENT))) return false;
    }
    return true;
};
var canbeOnce = function (body) {
    for (var cx = 0, dx = body.length; cx < dx; cx++) {
        if (body[cx].type & (SPACE | COMMENT)) continue;
        break;
    }
    var o = body[cx];
    var n = snapExpressFoot(o);
    var bx = cx;
    cx = n ? body.lastIndexOf(n) + 1 : body.length;
    if (cx < 0) return false;
    for (; cx < dx; cx++) {
        if (body[cx].type & (SPACE | COMMENT)) continue;
        return false;
    }
    for (cx = bx; cx < dx; cx++) {
        var o = body[cx];
        if (o.type & (SPACE | COMMENT)) continue;
        if (o.type & (EXPRESS | VALUE) || o.type === QUOTED && !o.length || o.type === SCOPED && o.entry === "[" && canbeTemp(o)) {
            continue;
        }
        return false;
    }
    return true;
};
var canbeTemp = function (body) {
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
var _express = function (body, getname, ret) {
    if (canbeTemp(body)) {
        var q = [];
        q.name = createString(body);
        return [q];
    }
    var result = [];
    var q = [];
    var needpunc = false;
    var bx = 0;
    var cache = [];
    var n = null;
    var nameindex = 0;
    var maxindex = 0;
    var hasor = false;
    var getdeepname = function (deep = 0) {
        return getname(maxindex + deep);
    };
    var exps = [];
    for (var cx = 0, dx = body.length; cx < dx; cx++) {
        if (!(body[cx].type & (COMMENT | SPACE))) { bx = cx; break; }
    }
    for (; cx < dx; cx++) {
        var o = body[cx];
        if (o.type & (COMMENT | SPACE)) continue;
        a: if (o.type === STRAP) {
            if (/^(async|function)$/.test(o.text)) while (o && (o.type !== SCOPED || o.entry !== '{')) o = body[++cx];
            else if (o.text === 'class') {
                while (o && !o.isClass) o = body[++cx];
                while (o && (o.type & (SPACE | COMMENT) || o.isClass)) o = body[++cx];
            }
            else break a;
            continue;
        }
        if (o.type & (STRAP | STAMP)) {
            var p = 0;
            if (/[!~]|\+\-|\-\+/.test(o.text)) p = powermap["!"];
            if (!p && /[\+\-]/.test(o.text)) p = needpunc ? powermap["+"] : powermap["!"];
            if (!p) p = powermap[o.text];
            needpunc = false;
            var b = body.slice(bx, cx + 1);
            bx = cx + 1;
            b.index = nameindex;
            var isor = p === powermap["||"];
            if (!isor) if (!cache.length || p > cache[cache.length - 1] || p >= powermap.new) {
                cache.push(b, p);
                continue;
            }
            var pb = b.pop();
            if (cache.length) nameindex = cache[cache.length - 2].index;
            else if (isor) q.push(...scanner2(`${getname(nameindex)}=`), ...b);

            while (cache.length && cache[cache.length - 1] >= p) {
                if (needcomma(q)) q.push({ type: STAMP, text: ',' });
                var p0 = cache.pop();
                var t = cache.pop();
                var iw = _await(t);
                if (p0 > powermap["="] || iw) q.push(...scanner2(`${getname(t.index)}=`));
                q.push.apply(q, t);
                q.push.apply(q, b);
                b = scanner2(`${getname(t.index)}`);
                nameindex = t.index;
                if (iw) {
                    if (iw === 1) q.push(NEXT);
                    else if (iw === 3) q.push(YIELD);
                }
            }
            var name = getname(nameindex);
            q.name = name;
            if (isor) {
                if (o.text === '||') {
                    q.push(RE);
                }
                else if (o.text === '&&') {
                    q.push(RZ);
                }
                else if (o.text === '??') {
                    q.push(RD);
                }
                hasor = true;
                nameindex = 0;
            } else {
                var n = scanner2(name);
                n.index = nameindex;
                n.push(pb);
                nameindex++;
                cache.push(n, p);
                if (maxindex < nameindex) maxindex = nameindex;
            }
        }
        else {
            needpunc = true;
            if (o.type === EXPRESS) {
                exps.push(o);
            }
        }
    }
    var b = body.slice(bx, cx);
    var needname = false;
    if (cache.length) while (cache.length) {
        var p = cache.pop();
        if (needcomma(q)) q.push({ type: STAMP, text: ',' });
        nameindex = cache[cache.length - 1].index;
        var t = cache.pop();
        var iw = _await(t, nameindex);
        if (!t.length && canbeTemp(b) && b[0].text === getname(nameindex)) {
        }
        else {
            if (p > powermap["="] && (ret || cache.length > 0 || iw)) q.push(...scanner2(`${getname(nameindex)}=`));
            q.push.apply(q, t);
            q.push.apply(q, b);
        }
        if (iw) {
            if (iw === 1) q.push(NEXT);
            else if (iw === 3) q.push(YIELD);
        }
        needname = true;
        b = [{ type: EXPRESS, text: getname(nameindex) }];
    }
    else {
        if (ret && b.length) {
            q.push(...scanner2(`${getname(nameindex)}=`));
            q.push(...b);
            needname = true;
        }
        else {
            q.push(...b);
        }
    }
    if (needname) q.name = getname(nameindex);
    relink(q);
    if (isFunctionOnly(q, 2)) {
        result = [q];
    }
    else {
        result = _invoke(q, getdeepname);
    }
    if (hasor) result[result.length - 1].ret_ = true;
    return result;
};

var getblock = function (body, cx) {
    var o = body[cx];
    if (o && o.type === SCOPED && o.entry === '{') return [o];
    if (!o || o.type === STAMP && /^[;:]$/.test(o.text)) return [];
    var ax = cx;
    while (o) {
        cx = skipAssignment(body, cx);
        var o = body[cx];
        if (!o || o.type !== STAMP || o.text !== ',') break;
        cx++;
    }
    var b = body.slice(ax, cx);
    while (o && o.type & (SPACE | COMMENT)) o = body[++cx];
    b.next = o;
    return b;
};
var labels = [];
var scopes = [null];
var isbreak = function (o) {
    if (o.type !== STRAP) return false;
    return /^(break|continue)$/.test(o.text) ||
        /^(return)$/.test(o.text) && (o.isend || skipAssignment(o.next) === o.next.next && canbeTemp([o.next]));
};

var ifpatch = function (result, autoskip) {
    if (!result.length) return;
    if (autoskip !== false) {
        var rs = result[result.length - 1];
        if (rs.ret_ !== true && rs.ret_) return;
    }
    var re = stepReturn(1, 0);
    re.ret_ = -2;
    re.ifbrk = autoskip !== undefined;
    pushstep(result, re);
};
var poplabel = function (result) {
    if (!labels.length) return;
    var e = labels.pop();
    if (e.breaks) {
        while (e.breaks.length) {
            var b = e.breaks.pop();
            var end = b;
            for (var cx = result.length - 1; cx >= 0; cx--) {
                var r = result[cx];
                if (r.indexOf(b) >= 0) { break }
            }
            if (cx < 0) throw console.log(result.map(r => createString(r)), e.text, createString([b.prev, b])), "break语句异常";
            end.push({ type: VALUE, text: b.continue ? b.continue.contat - cx : result.length - cx }, { type: STAMP, text: "," }, { type: VALUE, text: "0" });
            relink(end);
        }
    }
};

function toqueue(body, getname, ret = false, result = []) {
    var retn = false;
    if (!ret) prefunc(body);
    var uniftop = function () {
        for (var cx = 4, dx = iftop.length; cx < dx; cx += 4) {
            var isbr = iftop[cx - 3];
            if (isbr) continue;
            var findex = iftop[cx] - 1;
            var p = result[findex];
            if (p.ifbrk) {
                p.pop();
                p.push(scanner2(`[${result.length - findex},0]`)[0]);
                relink(p);
            }
        }
        for (var cx = 1, dx = iftop.length - 2; cx < dx; cx++) {
            var isbr = iftop[cx++];
            var ce = iftop[cx++];
            var cindex = iftop[cx++];
            var findex = iftop[cx] ? iftop[cx] : result.length;
            if (!isbr) {
                ce[0].text = findex - cindex;
                relink(ce);
            }
        };
    };
    var unblock = function (block, ret = true) {
        toqueue(block, getname, ret, result);
        return result[result.length - 1];
    };
    var _poplabel = function () {
        poplabel(result);
    }
    var cx = 0, bx = 0;
    var iftop = null;
    var brk = function (text, YIELD, skip) {
        if (o.text !== text) return;
        retn = [YIELD];
        retn.skip = skip;
        ret = true;
        bx = ++cx;
        return retn;
    };
    do {
        var o = body[cx];
        while (o && (o.type & (SPACE | COMMENT) || o.type === STAMP && /^[,;]$/.test(o.text))) o = body[++cx];
        if (bx < cx) {
            var b = body.slice(bx, cx);
            relink(b);
            pushstep(result, b);
            bx = cx;
        }
        if (!o) break;
        while (labels.length) {
            var e = labels[labels.length - 1];
            if (e.type !== LABEL) break;
            if (scopes.lastIndexOf(e.scope) >= 0) break;
            _poplabel();
        }

        if (o.type === LABEL) {
            o.scope = scopes[scopes.length - 1];
            labels.push(o);
            var next = o.next;
            if (next && next.type === SCOPED && next.entry === '{') {
                ifpatch(result);
                o.contat = result.length;
            }
            bx = ++cx;
            continue;
        }
        if (o.type === SCOPED && o.entry === '{' && !o.isObject) {
            scopes.push(o);
            toqueue(o, getname, false, result);
            scopes.pop();
            bx = ++cx;
            continue;
        }
        a: if (o.type === STRAP) {
            if (/^(new|typeof|delete|await|void|debugger)$/.test(o.text)) {
                break a;
            }
            if (brk("yield", YIELD, skipAssignment)) break a;
            if (brk("return", RETURN, skipSentenceQueue)) break a;
            if (brk("throw", THROW, skipSentenceQueue)) break a;
            if (/^(async|function|class)$/.test(o.text)) {
                // cx = skipAssignment(body, cx);
                // var f = body.slice(bx, cx);

                // addresult(result, f);
                // bx = cx + 1;
                break a;
            }
            if (/^(break|continue)$/.test(o.text)) {
                cx = _break(body, cx, result, o.text === 'continue');
                bx = cx;
                continue;
            };
            if (o.text === 'with') {
                cx = _with(body, cx, unblock, result, getname);
                bx = cx;
                continue;
            }
            if (o.text === 'try') {
                cx = _try(body, cx, unblock, result, getname);
                bx = cx;
                continue;
            }
            if (o.text === 'for') {
                labels.push(o);
                cx = _for(body, cx, unblock, result);
                _poplabel();
                bx = cx;
                continue;
            }
            if (o.text === 'while') {
                labels.push(o);
                cx = _while(body, cx, unblock, result);
                _poplabel();
                bx = cx;
                continue;
            }
            if (o.text === 'do') {
                labels.push(o);
                cx = _do(body, cx, unblock, result);
                _poplabel();
                bx = cx;
                continue;
            }
            if (o.text === 'switch') {
                labels.push(o);
                cx = _switch(body, cx, unblock, result, getname);
                _poplabel();
                bx = cx;
                continue;
            }
            var elseif = false, isbr = false;
            if (o.text === 'else') {
                while (body[cx] !== o.next) cx++;
                o = o.next;
                isbr = isbreak(o);
                if (!isbr) ifpatch(result, true);
                iftop.push(result.length);
                elseif = true;
            }
            if (o.text === 'if') {
                while (body[cx] !== o.next) cx++;
                o = o.next;
                var isbr = isbreak(o.next);
                var i = result.length;
                var n = getCondition(o, unblock, !isbr);
                o = o.next;
                if (isbr) {
                    var c = scanner2(`if(${n})`);
                }
                else {
                    var c = scanner2(`if(${n})return [0,0]`);
                }
                var ce = c[3];
                pushstep(result, c);
                if (!elseif) {
                    iftop = [i, isbr, ce, result.length - 1];
                }
                else {
                    iftop.push(isbr, ce, result.length - 1);
                }
                elseif = true;
            }
            if (elseif) {
                while (body[cx] !== o) cx++;
                var block = getblock(body, cx);
                cx += block.length;
                o = body[cx];
                while (o && o.type & (SPACE | COMMENT)) o = body[++cx];
                unblock(block);
                if (o && o.type === STAMP && o.text === ';') o = o.next;
                while (cx < body.length && body[cx] !== o) cx++;
                if (!o || o.type !== STRAP || o.text !== 'else') {
                    var bn = body.next;
                    if (bn && bn.type === STAMP && bn.text === ';') bn = bn.next;
                    var inif = bn && bn.type === STRAP && bn.text === 'else';
                    if (inif) ifpatch(result, true);
                    else if (!isbr) ifpatch(result, true);
                    uniftop();
                    if (inif) ifpatch(result, false);
                    iftop = null;
                }
            }
            else {
                cx++;
            }
            bx = cx;
            continue;
        }
        if (retn && retn.skip) {
            o = retn.skip(o);
            cx = body.indexOf(o, cx);
            if (cx < 0) cx = body.length;
        }
        else cx = skipAssignment(body, cx);
        var b = body.slice(bx, cx);
        bx = cx
        var a = null;
        for (b of createExpressList(b)) {
            if (isempty(b, SPACE | COMMENT)) {
                if (a) b.name = a.name;
                a = b;
                pushstep(result, a);
                continue;
            }
            b = ternary(b, getname, ret);
            for (a of b) pushstep(result, a);
        }
        if (retn) {
            if (a) retn.name = a.name;
            pushstep(result, retn);
        }
        else {
            var q = b[b.length - 1];
            if (q && !q.length && q.name) pushstep(result, scanner2(q.name));
        }
        retn = false;
    } while (cx < body.length);
    return result;
}
var ret_ = '';
var strip = false;
module.exports = function (body, newname, ret) {
    strip = body.strip;
    if (ret) ret = isString(ret) ? ret : newname();
    var ret0 = ret_;
    var ret1 = null;
    if (ret) ret_ = isString(ret) ? ret : {
        toString() {
            if (ret1) return ret1;
            return newname();
        }
    };
    var tmpnames = [];
    var p = 0;
    var getname = function (i) {
        i += evals.length + p;
        if (!tmpnames[i]) tmpnames[i] = newname();
        return tmpnames[i];
    };
    var res = toqueue(body, getname, false);
    while (labels.length) poplabel(res);
    ret_ = ret0;
    return res;
};