var { SPACE, COMMENT, EXPRESS, STRAP, QUOTED, STAMP, SCOPED, VALUE, LABEL, createString, skipAssignment, splice, relink, createExpressList, snapExpressHead, snapExpressFoot } = require("./common");
var scanner2 = require("./scanner2");
var RE = { type: STRAP, text: "@re" };// if (_) return
var RZ = { type: STRAP, text: "@rz" };// if (!_) return
var RD = { type: STRAP, text: "@rd" };// if (_) return
var RETURN = { type: STRAP, text: "@ret" };// return;
var THROW = { type: STRAP, text: "@throw" };// return;
var YIELD = { type: STRAP, text: "@yield" };// return;
var NEXT = { type: STRAP, text: "@next" };// return;
var _break = function (body, cx, result, iscontinue) {
    if (!result.length || result[result.length - 1].ret_) return;
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
            if (b.type === LABEL && b.text === label) {
                if (!b.breaks) b.breaks = [];
                var _b = scanner2('return []');
                _b.ret_ = true;
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
            if (b.type !== LABEL) {
                if (!b.breaks) b.breaks = [];
                var _b = scanner2("return []");
                _b.ret_ = true;
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
    if (o.type !== STRAP || o.text !== 'catch') throw `缺少catch语句`;
    o = o.next;
    var arg = [];
    var catchoffset = result.length;
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
    var finishoffset = result.length;
    if (o && o.type === STRAP && o.text === 'finally') {
        o = o.next;
        unblock(o);
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
        else case_ = scanner2(`return[]`), case_.ret_ = true;
        pushstep(result, case_);
        var by = cy;
        m = o[cy];
        while (m && (m.type !== STRAP || !/^(default|case)$/i.test(m.text))) m = o[++cy];
        tmp.push(result.length - 1, case_[case_.length - 1], o.slice(by, cy));
    }
    if (!result[result.length - 1].ret_) {
        case_ = scanner2(`return[]`), case_.ret_ = true;
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
    if (!step.length) return;
    var q = result[result.length - 1];
    if (!q) {
        result.push(step);
    }
    else if (q.await_) {
        if (!step.awaited) step.unshift(...scanner2(`${q.name}=${ret_};`)), relink(step);
        step.awaited = true;
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
        }
        q.push(...step);
        q.await_ = step.await_;
        q.name = step.name;
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
var flusqueue = function (result, queue) {
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

var addresult = function (result, step) {
    if (!step.length) return;
    var cx, mx = 0, n;
    var awaited = step.awaited;
    var queue = [];
    do {
        while (step[mx] && step[mx].type === STAMP && /^[,;]$/.test(step[mx].text)) mx++;
        cx = step.indexOf(NEXT, mx);
        n = step.slice(mx, mx = cx < 0 ? step.length : cx + 1);
        if (awaited) n.awaited = awaited, awaited = false;
        n.name = step.name;
        queue.push(n);
    } while (mx < step.length);
    flusqueue(result, queue);
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
    r.ret_ = true;
    if (q && q.length) r.name = q[q.length - 1].name;
    return r;
}
var needbreak = function (o) {
    return o && o.type === STAMP && /^[,;]$/.test(o.text) || o === RD || o == RE || o === RZ || isretn(o);
};
var isretn = function (o) {
    return o === RETURN || o === NEXT || o === YIELD || o === THROW;
}
var _return = function (r, nextindex) {
    var name = r.name;
    var e = r[r.length - 1];
    if (!isretn(e)) return;
    r.pop();
    r.ret_ = !ishalf(r);
    var x;
    if (e === RETURN) {
        x = stepReturn(name, 2);
    }
    else if (e === YIELD) {
        x = stepReturn(name, 3);
    }
    else if (e === THROW) {
        x = scanner2(`throw ${name}`);
    }
    else if (e === NEXT) {
        x = stepReturn(name, 1);
        r.await_ = true;
    }
    if (needcomma(r)) r.push({ type: STAMP, text: ';' });
    else if (r.length) r[r.length - 1].text = ';';
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
}
var _invoke = function (t, getname) {
    var nameindex = 0;;
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
        if (needbreak(o)) {
            if (needcomma(queue)) queue.push({ type: STAMP, text: ',' });
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
            for (var cy = 0; cy < o.length; cy++) {
                var by = cy;
                while (cy < o.length && o[cy].type & (SPACE | COMMENT)) cy++;
                var ay = cy;
                cy = skipAssignment(o, cy);
                var ey = cy;
                if (ay === ey || ay >= o.length) continue;
                var m = o.slice(ay, ey);
                if (m.length === 1 && (m[0].type === EXPRESS && !/\./.test(m[0].text) || m[0].type === VALUE || m[0].type === QUOTED && !m[0].length)) {
                    continue;
                }
                var q = toqueue(m, getdeepname, true);
                var qe = q[q.length - 1];
                if (!iseval || m[m.length - 1] === o.last) {
                    splice(o, by, ey - by, { text: qe.name, type: EXPRESS });
                    cy = by + 1;
                }
                else {
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
            if (!cache.length) continue;
            if (queue.length) flusqueue(result, queue), queue = [];
            for (var c of cache) pushstep(result, c);
            cache = [];
            var n = o.next;
            if (n && !needbreak(n)) {
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
        flusqueue(result, queue);
    }
    else if (t.length) {
        var t0 = t[0];
        if (t0.type === EXPRESS && /^\./.test(t0.text) || t0.type & (STAMP | STRAP) && powermap[t0.text] < powermap.new) {
            t.unshift(...scanner2(`${qname}=${qname}`));
            relink(t);
        }
        addresult(result, t);
    }
    return result;
};

var _await = function (t) {
    if (t[0].type === STRAP && t[0].text === 'await') {
        t.shift();
        return true;
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
var needcomma = function (q) {
    if (!q.length) return false;
    var e = q[q.length - 1];
    if (ishalf(q)) return false;
    return !needbreak(e);
};
var patchname = function (d, getname) {
    var de = d[d.length - 1];
    if (de && !de.name) {
        splice(de, 0, 0, { type: EXPRESS, text: getname(0) }, { type: STAMP, text: "=" });
        de.name = getname(0);
    }
}
var ternary = function (body, getname, ret) {
    var getnextname = function (i) {
        return getname(i + 1);
    };
    var question = [];
    var res = [];
    var equalsend = 0;
    var skip = 0;
    var equcount = 0;
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
                var c = toqueue(body.slice(bx + 1, cx), getname, true);
                var d = toqueue(body.slice(cx + 1), getname, true);
                patchname(c, getname);
                patchname(d, getname);
                pushstep(d, stepReturn(1, 0, d));
                pushstep(c, stepReturn(d.length + 1, 0, c));
                addresult(res, scanner2(`if(${getCondition(b, function (b) {
                    b = ternary(b, getname, true);
                    for (var b of b) addresult(res, b);
                    return b;
                }, true)})return [1,0]`));
                var q = res[res.length - 1];
                var qi = res.length - 1;
                var qe = q[q.length - 1];
                if (c.length) {
                    pushstep(res, c[0]);
                    res.push(...c.slice(1));
                }
                qe.text = String(res.length - qi);
                res.push(...d);
            }
        }
        else if (powermap[o.text] === powermap["="]) {
            if (!question.length) equalsend = cx + 1, equcount += o.text.length;
        }
    }
    if (!res.length) {
        var bd = equalsend ? body.slice(equalsend) : body;
        if (!ret && equcount === 1 && canbeOnce(bd)) {
            res = [bd];
        }
        else {
            res = _express(bd, getname, equalsend > skip || ret);
        }
    }
    if (equalsend === skip) {
        return res;
    }
    var equals = body.slice(skip, equalsend);
    var explist = res;
    var q = explist[explist.length - 1];
    // if (!q) throw `语法错误: <red>${createString(body)}</red> \r\n行列位置: ${equals[0].row}:${equals[0].col}`
    var n = q.name;
    var i = equals.length - 1;
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
        if (n) var asn = [{ type: EXPRESS, text: n }];
        else asn = explist.pop();
        for (var a of ass) {
            if (a.type === SCOPED) {
                if (a.entry === '[') {
                    var q = ternary(a, getnextname, true);
                    for (var q of q) {
                        if (q.length) pushstep(explist, q);
                    }
                    splice(a, 0, a.length, { type: EXPRESS, text: q.name });
                }
                else if (a.entry === '(') {
                    _invoke(a);
                }
            }
        }
        var an = '';
        var eq = equals[i];
        if (eq.text.length > 1) {
            var punc = eq.text.slice(0, eq.text.length - 1);
            var bdtmp = ass.concat({ type: STAMP, text: punc }, ...asn);
            var explist2 = _express(bdtmp, getname, true);
            for (var e of explist2) pushstep(explist, e);
            eq.text = "=";
            var q2 = explist2[explist2.length - 1];
            an = q2.name;
        }
        else an = n;
        ass.push(equals[i], ...asn);
        relink(ass);
        if (evals.length) ass[0].set = getname(0);
        ass.name = an;
        patchstep(ass, ass.length, 0);
        pushstep(explist, ass);
        i = ai - 1;
        n = an;
    }
    return explist;
};
var isFunctionOnly = function (body) {
    for (var cx = 2, dx = body.length; cx < dx; cx++) {
        if (body[cx].type & (SPACE | COMMENT)) continue;
        break;
    }
    var o = body[cx];
    if (!o) return false;
    if (o.type === STRAP && o.text === 'function') {
        while (o && o.entry !== "{") o = body[cx++];
        if (!o) return false;
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
    return o.type === EXPRESS && !/[\.\[]/.test(o.text) || o.type === VALUE || o.type === QUOTED && !o.length;
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
        if (o.type === STRAP && o.text === 'function') {
            while (o && (o.type !== SCOPED || o.entry !== '{')) o = body[++cx];
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
            var name = getname(nameindex);
            var n = scanner2(name);
            q.name = name;
            n.index = nameindex;
            n.push(b.pop());

            if (cache.length) nameindex = cache[cache.length - 2].index;
            else if (isor) n.pop(), q.push(...scanner2(`${getname(nameindex)}=`), ...b);

            while (cache.length && cache[cache.length - 1] >= p) {
                if (needcomma(q)) q.push({ type: STAMP, text: ',' });
                var p0 = cache.pop();
                var t = cache.pop();
                var isawait = _await(t);
                if (p0 > powermap["="] || isawait) q.push(...scanner2(`${getname(t.index)}=`));
                q.push.apply(q, t);
                q.push.apply(q, b);
                if (isawait) q.push(NEXT);
            }
            nameindex++;
            if (maxindex < nameindex) maxindex = nameindex;
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
                cache.push(n, p);
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
        var isawait = _await(t, nameindex);
        if (!t.length && canbeTemp(b) && b[0].text === getname(nameindex)) {
        }
        else {
            if (p > powermap["="] && (ret || cache.length > 0 || isawait)) q.push(...scanner2(`${getname(nameindex)}=`));
            q.push.apply(q, t);
            q.push.apply(q, b);
        }
        if (isawait) q.push(NEXT);
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
    if (isFunctionOnly(q)) {
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
    b.next = o;
    return b;
};
var labels = [];
var scopes = [];
var isbreak = function (o) {
    if (o.type !== STRAP) return false;
    return /^(break|continue)$/.test(o.text) ||
        /^(yield|return)$/.test(o.text) && (o.isend || skipAssignment(o.next) === o.next.next && canbeTemp([o.next]));
};

var ifpatch = function (result, autoskip) {
    if (!result.length) return;
    if (autoskip !== false) {
        var rs = result[result.length - 1];
        if (rs.ret_ && !rs.await_) return;
    }
    var re = stepReturn(1, 0);
    pushstep(result, re);
};
function toqueue(body, getname, ret = false, result = []) {
    var retn = false;
    var uniftop = function () {
        for (var cx = 4, dx = iftop.length; cx < dx; cx += 4) {
            var isbr = iftop[cx - 3];
            if (isbr) continue;
            var findex = iftop[cx] - 1;
            var p = result[findex];
            p.pop();
            p.push(scanner2(`[${result.length - findex},0]`)[0]);
            relink(p);
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
    var unblock = function (block) {
        toqueue(block, getname, true, result);
        return result[result.length - 1];
    };
    var poplabel = function () {
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
                end.push({ type: VALUE, text: b.continue ? b.continue.contat - cx : result.length - cx }, { type: STAMP, text: "," }, { type: VALUE, text: "0" });
                relink(end);
            }
        }
    };
    var cx = 0, bx = 0;
    var iftop = null;
    var brk = function (text, YIELD) {
        if (o.text !== text) return;
        retn = [YIELD];
        ret = true;
        bx = ++cx;
        return retn;
    };
    do {
        var o = body[cx];
        while (o && (o.type & (SPACE | COMMENT) || o.type === STAMP && /^[,;]$/.test(o.text))) o = body[++cx];
        if (!o) break;
        while (labels.length) {
            var e = labels[labels.length - 1];
            if (e.type !== LABEL) break;
            if (scopes.lastIndexOf(e.scope) >= 0) break;
            poplabel();
        }

        if (o.type === LABEL) {
            o.scope = scopes[scopes.length - 1];
            labels.push(o);
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
            if (/^(new|typeof|await|delete|void|debugger)$/.test(o.text)) {
                break a;
            }
            if (brk("yield", YIELD)) break a;
            if (brk("return", RETURN)) break a;
            if (brk("throw", THROW)) break a;
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
                poplabel();
                bx = cx;
                continue;
            }
            if (o.text === 'while') {
                labels.push(o);
                cx = _while(body, cx, unblock, result);
                poplabel();
                bx = cx;
                continue;
            }
            if (o.text === 'do') {
                labels.push(o);
                cx = _do(body, cx, unblock, result);
                poplabel();
                bx = cx;
                continue;
            }
            if (o.text === 'switch') {
                labels.push(o);
                cx = _switch(body, cx, unblock, result, getname);
                poplabel();
                bx = cx;
                continue;
            }
            var elseif = false, isbr = false;
            if (o.text === 'else') {
                while (body[cx] !== o.next) cx++;
                o = o.next;
                isbr = isbreak(o);
                if (!isbr) ifpatch(result);
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
                    if (inif) ifpatch(result);
                    else if (!isbr) ifpatch(result);
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
        cx = skipAssignment(body, cx);
        var b = body.slice(bx, cx);
        bx = ++cx;
        b = ternary(b, getname, ret);
        for (var a of b) pushstep(result, a);
        if (retn) {
            if (b.length) retn.name = b[b.length - 1].name;
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
module.exports = function (body, newname, ret) {
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
    ret_ = ret0;
    return res;
};