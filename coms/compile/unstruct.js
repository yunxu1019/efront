var { SPACE, COMMENT, EXPRESS, STRAP, QUOTED, STAMP, SCOPED, VALUE, LABEL, createString, skipAssignment, relink } = require("./common");
var scanner2 = require("./scanner2");
var RE = { type: STRAP, text: "@re" };// if (_) return
var RZ = { type: STRAP, text: "@rz" };// if (!_) return
var RD = { type: STRAP, text: "@rd" };// if (_) return
var RETURN = { type: STRAP, text: "@ret" };// return;
var YIELD = { type: STRAP, text: "@yield" };// return;
var NEXT = { type: STRAP, text: "@next" };// return;
var _break = function (body, cx, result, iscontinue) {
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
                var _b = scanner2(`return[]`);
                if (iscontinue) _b.continue = s, s.continue = true;
                addresult(result, _b);
                b.breaks.push(_b);
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
                var _b = scanner2(`return[]`);
                if (iscontinue) _b.continue = b, b.continue = true;
                addresult(result, _b);
                b.breaks.push(_b);
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
    var trystart = scanner2(`return [,7]`);
    addresult(result, trystart);
    var tryoffset = result.length;
    unblock(o);
    var final = scanner2(`return [0,9]`);

    addresult(result, final);
    o = o.next;
    if (o.type !== STRAP || o.text !== 'catch') throw `缺少catch语句`;
    o = o.next;
    var arg = [];
    var catchoffset = result.length;
    if (o.type === SCOPED && o.entry === "(") {
        var e = o.first;
        if (e) {
            arg = scanner2(`${e.text}=${ret_ || "@"}`);
            addresult(result, arg);
        }
        o = o.next;
    }
    unblock(o);
    o = o.next;
    if (o && o.type === STRAP && o.text === 'finally') {
        o = o.next;
        var finishoffset = result.length;
        unblock(o);
    }
    var tse = trystart[trystart.length - 1];
    tse.unshift({
        text: String(catchoffset - tryoffset << 16 | finishoffset - catchoffset),
        type: VALUE,
    });
    relink(tse);

    var finalend = scanner2(`return [1,9]`);
    addresult(result, finalend);
};
var evals = [];

var _with = function (body, cx, unblock, result, getname) {
    var o = body[cx];
    var c = o.next;
    while (body[cx] !== c) cx++;
    unblock(c);
    evals.push(getname(0));
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
    unblock(o);
    o = o.next;
    while (body[cx++] !== o);
    if (!o) return;
    var cy = 0;
    var m = o.first;
    var tmp = [];
    while (o[cy] !== m) cy++;
    while (cy < o.length) {
        var block = getblock(o, ++cy);
        cy += block.length + 1;
        var getnextname = function (deep) {
            return getname(deep + 1);
        };
        var q = _express(block, getnextname, true);
        for (var q of q) addresult(result, q);
        var case_ = scanner2(`if(${getname(0)}===${getname(1)})return[]`)
        addresult(result, case_);
        var by = cy;
        m = o[cy];
        while (m && (m.type !== STRAP || m.text !== 'case')) m = o[++cy];
        tmp.push(result.length - 1, case_, o.slice(by, cy));
    }
    while (tmp.length) {
        cy = tmp.shift();
        case_ = tmp.shift();
        block = tmp.shift();
        var q = case_[case_.length - 1];
        q.push({ type: VALUE, text: String(result.length - cy) }, { type: STAMP, text: "," }, { type: VALUE, text: '0' });
        relink(q);
        for (var cy = 0, dy = block.length; cy < dy; cy++) {
            var b = getblock(block, cy);
            cy += b.length;
            var r = toqueue(b, getnextname, true);
            for (var r of r) {
                result.push(r);
            }
        }
    }
    return cx;
};
var _for = function (body, cx, unblock, result, tmpname) {
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
        while (body[dx] !== n) dx++;
        addresult(result, body.slice(cx, dx));
        return dx;
    }
    var cy = 0;
    while (o[cy] !== m) cy++;
    var block = getblock(o, cy);// init
    cy += block.length + 1;
    unblock(block, ...scanner2(`;return [1,0]`));
    var block1 = getblock(o, cy);// condition
    cy += block1.length + 1;
    var block2 = getblock(o, cy);// next
    while (body[cx] !== o) cx++;
    var block_ = getblock(body, ++cx);// body
    cx += block_.length;
    unblock(block1);
    relink(result[result.length - 1]);
    var b = scanner2(`;if(!${tmpname})return []`)
    result[result.length - 1].push(...b);
    relink(result[result.length - 1]);
    var i = result.length;
    unblock(block_);
    if (label.continue) label.continue = result.length, result[result.length - 1].cont = true, label.contat = result.length;
    unblock(block2);
    result[result.length - 1].push(...scanner2(`;return [${i - result.length},0]`));
    b[b.length - 1].push(...scanner2(`${result.length - i + 1},0`));
    relink(result[result.length - 1]);
    return cx;
};
var getCondition = function (o, unblock, not_) {
    var n = '';
    var f = o.first;
    var not = f.type === STAMP && f.text === "!";
    if (not) f = f.next;
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
        n = n.await ? ret_ : n.name;
        if (not) n = "!" + n;
    }
    return n;
}
var _while = function (body, cx, unblock, result, tmpname) {
    var o = body[cx];
    o.contat = result.length;
    o = o.next;
    while (body[cx] !== o) cx++;
    var b = scanner2(`if(${getCondition(o, unblock, true)})return []`)
    result.push(b);
    relink(result[result.length - 1]);
    var block = getblock(body, ++cx);
    var i = result.length;
    cx += block.length;
    unblock(block);
    result.push(scanner2(`return [${i - result.length - 1},0]`));
    b[b.length - 1].push(...scanner2(`${result.length - i + 1},0`));
    return cx;
};
var pushstep = function (result, step) {
    if (!step.length) return;
    var q = result[result.length - 1];
    if (!q) {
        result.push(step);
    }
    else if (q.await) {
        if (!step.awaited) step.unshift(...scanner2(`${q.name}=${ret_};`));
        step.awaited = true;
        relink(step);
        result.push(step);
    }
    else if (q.ifrt || q.cont) {
        result.push(step);
    }
    else {
        q.push({ type: STAMP, text: ";" }, ...step);
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
var addresult = function (result, step) {
    if (!step.length) return;
    var savedLength = result.length;
    var prev = result[savedLength - 1];
    if (prev) var patch = prev.length;
    var cx, mx = 0, n;
    var awaited = step.awaited;
    do {
        cx = step.indexOf(NEXT, mx);
        n = step.slice(mx, mx = cx < 0 ? step.length : cx + 1);
        if (awaited) n.awaited = awaited, awaited = false;
        n.name = step.name;
        pushstep(result, n);
    } while (mx < step.length);
    if (ret_) {
        if (prev) patchstep(prev, result.length - savedLength - 1, patch || 0);
        result.slice(savedLength).forEach((a, i) => patchstep(a, result.length - i - savedLength, 0));
    }
};
var _do = function (body, cx, unblock, result, tmpname) {
    var o = body[cx];
    var label = o;
    o = o.next;
    var i = result.length;
    unblock(o);
    o = o.next.next;
    if (label.continue) result[result.length - 1].cont = true, label.contat = result.length;
    var b = scanner2(`if(${getCondition(o, unblock)})return [${i - result.length},0];return [1,0]`);
    addresult(result, b);
    while (body[cx] !== o) cx++;
    return cx;
};

var needbreak = function (o) {
    return o === RE || o === RZ || o === RD || o === RETURN || o === NEXT || o === YIELD;
};
var _return = function (r, nextindex) {
    var name = r.name;
    var e = r[r.length - 1];
    if (!needbreak(e)) return;
    r.ifrt = true;
    r.pop();
    var semicolon = r[r.length - 1];
    semicolon = semicolon && semicolon.type === STAMP && /^[,;]$/.test(semicolon.text);
    var x;
    if (e === RETURN) {
        x = scanner2(`return [${name},2]`);
    }
    else if (e === YIELD) {
        x = scanner2(`return [${name},3]`);
    }
    else if (e === NEXT) {
        x = scanner2(`return [${name},1]`);
        r.await = true;
    }
    if (semicolon) r.pop();
    r.push({ type: STAMP, text: ';' });
    r.push(...x);
    relink(r);
};
var remove_end_comma = function (o) {
    if (!o.length || o.type !== SCOPED || o.entry === '[') return;
    for (var cx = o.length - 1; cx >= 0; cx--) {
        var m = o[cx];
        if (m.type !== SPACE && m.type !== COMMENT) {
            break;
        }
    }
    if (m && m.type === STAMP && m.text === ',') {
        o.splice(cx, cx + 1);
    }
};
var _invoke = function (t, getname) {
    var nameindex = 0;;
    var getdeepname = function (deep = 0) {
        return getname(nameindex + deep)
    };
    var result = [];
    var cache = [];
    var queue = [];
    queue.name = t.name;
    var bx = 0;
    for (var cx = 0; cx < t.length; cx++) {
        var o = t[cx];
        if (o.type === STAMP && /^[,;]$/.test(o.text)) {
            if (queue.length) queue.push({ type: STAMP, text: ',' });
            queue.push(...t.splice(bx, cx + 1));
            cx += bx - cx - 1;
            queue.pop();
            bx = cx + 1;
            continue;
        }
        if (o.type === SCOPED && (o.entry === '[' || o.entry === "(")) {
            var _nameindex = nameindex;
            remove_end_comma(o);
            var cy = 0;
            for (var cy = 0; cy < o.length; cy++) {
                var by = cy;
                cy = skipAssignment(o, cy);
                if (by === cy) continue;
                var m = o.slice(by, cy);
                if (m.length === 1 && (m[0].type === EXPRESS && !/\./.test(m[0].text) || m[0].type === VALUE || m[0].type === QUOTED)) {
                    continue;
                }
                var q = toqueue(m, getdeepname, true);
                o.splice(by, cy, { text: getdeepname(0), type: EXPRESS });
                cy -= cy - by - 1;
                nameindex++;
                cache.push(...q);
            }
            if (!cache.length) continue;
            nameindex = _nameindex;
            if (queue.length) addresult(result, queue), queue = [], queue.name = getdeepname(nameindex);
            result.push(...cache);
            cache = [];
            var m = t.splice(bx, cx + 1);
            m.name = queue.name;
            cx -= m.length;
            if (bx + 1 < t.length && (t[bx].type & (SCOPED | EXPRESS))) t.splice(bx, 0, ...scanner2(`${getname(0)}=${getname(nameindex)}`)), t.name = getname(0);
            relink(m);
            addresult(result, m);
            nameindex++;
            bx = cx + 1;
        }
    }
    if (queue.length) {
        if (t.length) queue.push({ type: STAMP, text: ',' }, ...t), queue.name = t.name;
        addresult(result, queue);
    }
    else if (t.length) addresult(result, t);
    return result;
};

var _await = function (t) {
    if (t[0].type === STRAP && t[0].text === 'await') {
        t.shift();
        return true;
    }
    return false;
};
var needcomma = function (q) {
    if (!q.length) return false;
    var e = q[q.length - 1];
    return !needbreak(e);
};
var ternary = function (body, getname, ret) {
    var question = [];
    var res = [];
    for (var cx = 0, dx = body.length; cx < dx; cx++) {
        var o = body[cx];
        if (o.type == STAMP && o.text === '?') {
            question.push(cx);
        }
        else if (o.type === STAMP && o.text === ":") {
            var bx = question.pop();
            if (!question.length) {
                var b = body.slice(0, bx);
                relink(b);
                var c = ternary(body.slice(bx + 1, cx), getname, true);
                var d = ternary(body.slice(cx + 1), getname, true);
                addresult(c, scanner2(`return [${d.length + 1},0]`));
                addresult(res, scanner2(`if(${getCondition(b, function (b) {
                    addresult(res, _express(b));
                    return res[res.length - 1];
                })})return [1,0]`));
                res.push(...c);
                res.push(...d);
            }
        }
    }
    if (!res.length) return _express(body, getname, ret);
    return res;
};
var _express = function (body, getname, ret) {
    var result = [];
    var q = [];
    var needpunc = false;
    var bx = 0;
    var cache = [];
    var n = null;
    var nameindex = 0;
    var maxindex = 0;
    var getdeepname = function (deep = 0) {
        return getname(maxindex + deep);
    };
    var ax = 0;
    var exps = [];
    for (var cx = 0, dx = body.length; cx < dx; cx++) {
        var o = body[cx];
        if (o.type & (COMMENT | SPACE)) continue;
        if (o.type === STRAP && /^(var|let|const)/.test(o.text)) {
            bx = cx + 1;
            continue;
        }
        if (o.type & (STRAP | STAMP)) {
            var p = 0;
            if (o.text === '=') {
                ax = exps.length;
                bx = cx + 1;
                continue;
            }
            if (/[!~]|\+\-|\-\+/.test(o.text)) p = powermap["!"];
            if (!p && /[\+\-]/.test(o.text)) p = needpunc ? powermap["+"] : powermap["!"];
            if (!p) p = powermap[o.text];
            needpunc = false;
            var b = body.slice(bx, cx + 1);
            bx = cx + 1;
            b.index = nameindex;
            if (!cache.length || p > cache[cache.length - 1]) {
                cache.push(b, p);
                continue;
            }
            var name = getname(nameindex);
            var n = scanner2(name);
            q.name = name;
            n.index = nameindex;
            nameindex = cache[cache.length - 2].index;
            n.push(b.pop());
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
            if (p == powermap["||"]) {
                if (o.text === '||') {
                    q.push(RE);
                }
                else if (o.text === '&&') {
                    q.push(RZ);
                }
                else if (o.text === '??') {
                    q.push(RD);
                }
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
        if (p > powermap["="] && (ret || ax >= 1 || cache.length > 0 || isawait)) q.push(...scanner2(`${getname(nameindex)}=`));
        q.push.apply(q, t);
        q.push.apply(q, b);
        if (isawait) q.push(NEXT);
        needname = true;
        b = [{ type: EXPRESS, text: getname(nameindex) }];
    }
    else if (ax !== 1) {
        if (ret && b.length || ax > 1) {
            q.push(...scanner2(`${getname(nameindex)}=`));
            q.push(...b);
            needname = true;
        }
        else {
            q.push(...b);
        }
    }
    if (needname) q.name = getname(nameindex);
    if (ax === 1) {
        if (q.length) q.push({ type: STAMP, text: ';' });
        q.push(exps[0], { type: STAMP, text: "=" });
        q.push(...b);
        q.name = exps[0].text;
        if (evals.length) exps[0].set = getname(nameindex);
        exps.shift();
    }
    if (ax > 1) {
        while (ax > 0) {
            q.push({ type: STAMP, text: ';' });
            var [e] = exps.splice(ax - 1, 1);
            if (evals.length) e.set = getname(nameindex + 1);
            q.push(e);
            q.push(...scanner2(`=${getname(nameindex)}`))
            ax--;
        }
    }
    if (evals.length && exps.length) for (var cx = q.length - 1; cx >= 0; cx--) {
        var o = q[cx];
        if (o.type !== EXPRESS) continue;
        if (o === exps[exps.length - 1]) {
            exps.pop();
            o.get = true;
            if (!exps.length) {
                break;
            }
        }
    }
    relink(q);
    return _invoke(q, getdeepname);
};

var getblock = function (body, cx) {
    var o = body[cx];
    if (o.type === SCOPED && o.entry === '{') return [o];
    var ax = cx;
    do {
        cx = skipAssignment(body, cx);
        var o = body[cx];
        if (!o || o.type !== STAMP || o.text !== ',') break;
        cx++;
    } while (o);
    return body.slice(ax, cx);
};
var labels = [];
var scopes = [];
var isbreak = function (o) {
    return o.type === STRAP && /^(break|return|continue|yield)$/.test(o.text);
};

function toqueue(body, getname, ret = false) {
    var retn = false;
    var ifpatch = function () {
        var re = scanner2(`return [1,0]`);
        re.awaited = true;
        addresult(result, re);
    }
    var uniftop = function () {
        for (var cx = 3, dx = iftop.length; cx < dx; cx += 3) {
            var findex = iftop[cx];
            var r = iftop[cx + 1];
            var p = result[findex - 1];
            if (!r) {
                p.pop();
                p.push(...scanner2(`[${result.length + 1 - findex},0]`));
                relink(p);
            }
        }
        for (var cx = 0, dx = iftop.length - 2; cx < dx;) {
            var findex = iftop[cx++];
            var f = result[findex];
            var r = iftop[cx++];
            var n = iftop[cx++];
            if (r) {
                var c = scanner2(`if(${n})`);
                f.unshift.apply(f, c);
                relink(f);
            }
            else if (f) {
                var c = scanner2(`if(${n})return [${iftop.length > cx ? iftop[cx] - findex : result.length - findex},0];`);
                f.unshift.apply(f, c);
                relink(f);
            }
        };
    };
    var unblock = function (block, ...end) {
        var c = toqueue(block, getname, true);
        bx = cx + 1;
        if (c.length > 0) {
            c.forEach(q => {
                if (q.length) result.push(q);
            });
            if (end.length) {
                var q = c[c.length - 1];
                q.push(...end);
                relink(q);
            }
        }
        return result[result.length - 1];
    };
    var poplabel = function () {
        var e = labels.pop();
        if (e.breaks) {
            while (e.breaks.length) {
                var b = e.breaks.pop();
                var end = b[b.length - 1];
                for (var cx = result.length - 1; cx >= 0; cx--) {
                    var r = result[cx];
                    if (r[r.length - 1] === end) { break }
                }
                end.push({ type: VALUE, text: b.contat - cx ? b.continue : result.length - cx }, { type: STAMP, text: "," }, { type: VALUE, text: "0" });
                relink(end);
            }
        }
    };

    var result = [];
    var cx = 0, bx = 0;
    var iftop = null;
    do {
        while (cx < body.length && (body[cx].type === SPACE || body[cx].type === COMMENT)) cx++;
        var o = body[cx];
        if (!o) break;
        while (labels.length) {
            var e = labels[labels.length - 1];
            if (e.type !== LABEL && !iftop) break;
            if (scopes.lastIndexOf(e.scope) >= 0) break;
            poplabel();
        }

        if (o.type === LABEL) {
            o.scope = scopes[scopes.length - 1];
            labels.push(o);
            continue;
        }
        if (o.type === SCOPED && o.entry === '{' && !o.isExpress) {
            scopes.push(o);
            var b = toqueue(o, getname, false);
            scopes.pop();
            // addresult(result, b);
            result.push.apply(result, b);
            cx++;
            bx = cx;
            continue;
        }
        a: if (o.type === STRAP) {
            if (/^(new|typeof|await)$/.test(o.text)) {
                break a;
            }
            if (o.text === 'yield') {
                retn = [YIELD];
                ret = true;
                bx = cx + 1;
                cx++;
                break a;
            }
            if (o.text === 'return') {
                retn = [RETURN];
                ret = true;
                bx = cx + 1;
                cx++;
                break a;
            }
            if (/^(async|function)$/.test(o.text)) {
                cx = skipAssignment(body, cx);
                addresult(result, body.slice(bx, cx));
                bx = cx + 1;
                break a;
            }
            if (/^(break|continue)$/.test(o.text)) {
                cx = _break(body, cx, result, o.text === 'continue');
                bx = cx + 1;
                continue;
            };
            if (o.text === 'with') {
                cx = _with(body, cx, unblock, result, getname);
                bx = cx + 1;
                continue;
            }
            if (o.text === 'try') {
                cx = _try(body, cx, unblock, result, getname);
                bx = cx + 1;
                continue;
            }
            if (o.text === 'for') {
                labels.push(o);
                cx = _for(body, cx, unblock, result, getname(0));
                poplabel();
                bx = cx + 1;
                continue;
            }
            if (o.text === 'while') {
                labels.push(o);
                cx = _while(body, cx, unblock, result, getname(0));
                poplabel();
                bx = cx + 1;
                continue;
            }
            if (o.text === 'do') {
                labels.push(o);
                cx = _do(body, cx, unblock, result, getname(0));
                poplabel();
                bx = cx + 1;
                continue;
            }
            if (o.text === 'switch') {
                labels.push(o);
                cx = _switch(body, cx, unblock, result, getname);
                poplabel();
                bx = cx + 1;
                continue;
            }
            var elseif = false;
            if (o.text === 'else') {
                ifpatch();
                while (body[cx] !== o.next) cx++;
                o = o.next;
                var isbr = isbreak(o);
                iftop.push(result.length, isbr);
                elseif = true;
            }
            if (o.text === 'if') {
                while (body[cx] !== o.next) cx++;
                o = o.next;
                var isbr = isbreak(o.next);
                var n = getCondition(o, unblock, !isbr);
                o = o.next;
                if (!elseif) {
                    if (iftop) uniftop();
                    iftop = [result.length, isbr, n];
                }
                else {
                    iftop.push(n);
                }
                elseif = true;
            }
            if (elseif) {
                while (body[cx] !== o) cx++;
                var block = getblock(body, cx);
                cx += block.length;
                o = body[cx];
                unblock(block);
                if (o && o.type === STAMP && o.text === ';') o = o.next;
                while (body[cx] !== o) cx++;
                if (!o || o.type !== STRAP || o.text !== 'else') {
                    uniftop();
                    iftop = null;
                }
            }
            else {
                cx++;
            }
            continue;
        }
        cx = skipAssignment(body, cx);
        var b = body.slice(bx, cx);
        cx++;
        bx = cx;
        b = ternary(b, getname, ret);
        result.push(...b);
        if (retn) {
            retn.name = b[b.length - 1].name;
            addresult(result, retn);
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