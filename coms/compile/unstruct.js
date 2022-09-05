var { SPACE, COMMENT, EXPRESS, STRAP, STAMP, SCOPED, VALUE, LABEL, createString, skipAssignment } = require("./common");
var scanner2 = require("./scanner2");
var RE = { type: STRAP, text: "@re" };// if (_) return
var RZ = { type: STRAP, text: "@rz" };// if (!_) return
var RETURN = { type: STRAP, text: "@ret" };// return;
var NEXT = { type: STRAP, text: "@next" };// return;
var relink = scanner2.Program.prototype.relink;
var _break = function (body, cx, result) {
    var label;
    do {
        var o = body[++cx];
        if (!o || o.type === SPACE || o.type === STAMP && o.text === ';') break;
        if (o.type === EXPRESS) label = o.text;
    } while (true);
    var bx = cx;
    if (label) {
        for (var cx = labels.length - 1; cx >= 0; cx--) {
            var b = labels[cx];
            if (b.type === LABEL && b.text === label) {
                if (!b.breaks) b.breaks = [];
                var _b = scanner2(`return[]`);
                addresult(result, _b);
                b.breaks.push(_b);
                break;
            }
        }
    }
    else {
        for (var cx = labels.length - 1; cx >= 0; cx--) {
            var b = labels[cx];
            if (b.type !== LABEL) {
                if (!b.breaks) b.breaks = [];
                var _b = scanner2(`return[]`);
                addresult(result, _b);
                b.breaks.push(_b);
                break;
            }
        }
    }
    return bx;
};
var evals = [];

var _with = function (body, cx, unblock, result, getname) {
    var o = body[cx];
    var c = o.next;
    while (body[cx] !== c) cx++;
    unblock(c);
    addresult(result, []);
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
        addresult(result, scanner2(`if(${getname(0)}===${getname(1)})return[]`));
        var by = cy;
        m = o[cy];
        while (m && (m.type !== STRAP || m.text !== 'case')) m = o[++cy];
        tmp.push(result.length - 1, o.slice(by, cy));
    }
    while (tmp.length) {
        cy = tmp.shift();
        block = tmp.shift();
        var q = result[cy];
        q[q.length - 1].push({ type: VALUE, text: String(result.length - cy) });
        relink(q[q.length - 1]);
        for (var cy = 0, dy = block.length; cy < dy; cy++) {
            var b = getblock(block, cy);
            cy += b.length;
            var r = toqueue(b, getnextname, true);
            for (var r of r) {
                result.push(r);
            }
        }
        addresult(result, []);
    }
    return cx;
};
var _for = function (body, cx, unblock, result, tmpname) {
    var o = body[cx];
    o = o.next;
    var m = o.first;
    if (m.type === STRAP && /^(let|const|var)$/.test(m.text)) {
        m = m.next;
    }
    var cy = 0;
    while (o[cy] !== m) cy++;
    var block = getblock(o, cy);// init
    cy += block.length + 1;
    unblock(block, ...scanner2(`[1]`));
    var block1 = getblock(o, cy);// condition
    cy += block1.length + 1;
    var block2 = getblock(o, cy);// next
    while (body[cx] !== o) cx++;
    var block_ = getblock(body, ++cx);// body
    cx += block_.length;
    unblock(block1);
    result[result.length - 1].pop();
    result[result.length - 1].pop();
    relink(result[result.length - 1]);
    var b = scanner2(`if(!${tmpname})return []`)
    result[result.length - 1].push(...b);
    relink(result[result.length - 1]);
    var i = result.length;
    unblock(block_);
    unblock(block2);
    result[result.length - 1].pop();
    result[result.length - 1].push(...scanner2(`[${i - result.length}]`));
    b[b.length - 1].push(result.length - i + 1);
    relink(result[result.length - 1]);
    return cx;
};
var _while = function (body, cx, unblock, result, tmpname) {
    var o = body[cx];
    o = o.next;
    while (body[cx] !== o) cx++;
    var b = scanner2(`if(!${tmpname})return []`)
    unblock(o);
    result[result.length - 1].pop();
    result[result.length - 1].pop();
    result[result.length - 1].push(...b);
    relink(result[result.length - 1]);
    var block = getblock(body, ++cx);
    var i = result.length;
    cx += block.length;
    unblock(block);
    result.push(scanner2(`return [${i - result.length - 1}]`));
    b[b.length - 1].push(result.length - i + 1);
    return cx;
};
var addresult = function (result, next) {
    var q = result[result.length - 1];
    if (q && q._return) {
        q.pop(), q.pop();
        if (next.length) {
            q.push(...next);
            relink(q);
        }
        else {
            q.pop();
        }
        q._return = next._return;
    }
    else {
        if (next.length) result.push(next);
    }
};
var _do = function (body, cx, unblock, result, tmpname) {
    var o = body[cx];
    o = o.next;
    var i = result.length;
    unblock(o);
    o = o.next.next;
    unblock(o);
    var b = scanner2(`return [${tmpname}?${i - result.length}:${1}]`);
    addresult(result, b);
    while (body[cx] !== o) cx++;
    return cx;
};

var needbreak = function (o) {
    return o === RE || o === RZ || o === RETURN || o === NEXT;
};
var _return = function (q) {
    var result = [];
    var tmp = [];
    for (var q of q) {
        tmp.push(q);
        if (q.type === EXPRESS && q.next && q.next.type === STAMP && q.next.text === '=') {
            tmp.name = q.text;
        }

        if (needbreak(q)) {
            result.push(tmp);
            tmp = [];
        }
    }
    if (tmp.length) result.push(tmp);
    result.forEach((r, i) => {
        var e = r[r.length - 1];
        if (!needbreak(e)) return;
        r.pop();
        var semicolon = r[r.length - 1];
        semicolon = semicolon && semicolon.type === STAMP && semicolon.text === ';';
        var x;
        if (e === RZ) {
            x = scanner2(`if(!${r.name})return [${result.length - i},]`);
        }
        else if (e === RE) {
            x = scanner2(`if(${r.name})return [${result.length - i},]`);
        }
        else if (e === RETURN) {
            if (result.length === 1) r._return = true;
            x = scanner2(`return [${result.length - i},]`);
        }
        else if (e === NEXT) {
            x = scanner2(`return [1,]`);
        }
        if (r.name) {
            if (!semicolon) r.push({ type: STAMP, text: ';' });
            x[x.length - 1].push({ type: EXPRESS, text: r.name });
            relink(x[x.length - 1]);
            r.push(...x);
        }
        else {
            x[x.length - 1].push(...r);
            r.splice(0, r.length, ...x);
        }
        relink(r);
    });
    return result;
};
var power_map = {};
[
    '=,+=,-=,*=,/=,%=,|=,&=,^=,**=,~='/* 1 */,
    '=>'/* 2 */, '?,:'/* 3 */, '&&,||'/* 4 */, '&,|,^'/* 5 */,
    'instanceof,in,==,>=,<=,>,<,!=,!==,===,!in,!instanceof'/* 6 */,
    '>>,>>>,<<'/* 7 */, '+,-'/* 8 */, '*,/,%'/* 9 */, '**'/* 10 */,
    'typeof,await,yield,new,!,~'/* 11 */, '++,--'/* 12 */
].forEach((pp, i) => {
    pp.split(",").forEach(p => {
        power_map[p] = i + 1;
    })
});
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
    var bx = 0;
    for (var cx = 0; cx < t.length; cx++) {
        var o = t[cx];
        if (o.type === STAMP && /^[,;]$/.test(o.text)) {
            if (queue.length) queue.push({ type: STAMP, text: ';' });
            queue.push(...t.splice(bx, cx + 1));
            cx += bx - cx - 1;
            queue.pop();
            bx = cx + 1;
            continue;
        }
        if (o.type === SCOPED && o.entry === '[' || o.entry === "(") {
            var _nameindex = nameindex;
            remove_end_comma(o);
            var cy = 0;
            for (var cy = 0; cy < o.length; cy++) {
                var by = cy;
                cy = skipAssignment(o, cy);
                if (by === cy) continue;
                var m = o.slice(by, cy);
                if (m.length === 1 && (m[0].type === EXPRESS && /\./.test(m[0].text) || m[0].type === VALUE)) {
                    continue;
                }
                var q = toqueue(m, getdeepname, true);
                o.splice(by, cy, { text: getdeepname(0), type: EXPRESS });
                cy -= cy - by - 1;
                nameindex++;
                q.forEach(q => {
                    if (q._return) {
                        q.splice(q.length - 3);
                    }
                    cache.push(q);
                });
            }
            if (!cache.length) continue;
            nameindex = _nameindex;
            if (queue.length) result.push(queue), queue = [];
            result.push(...cache);
            cache = [];
            var m = t.splice(bx, cx + 1);
            cx -= m.length;
            if (bx + 1 < t.length && (t[bx].type === SCOPED || t[bx].type === EXPRESS)) t.splice(bx, 0, ...scanner2(`${getname(0)}=${getname(nameindex)}`));
            relink(m);
            result.push(m);
            nameindex++;
            bx = cx + 1;
        }
    }
    if (t.length) {
        if (!queue.length && result.length) queue = result.pop();
        if (queue.length) queue.push({ type: STAMP, text: ';' });
        queue.push(...t);
    }
    if (queue.length) result.push(..._return(queue, getname(0)));
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
                b = _express(b, getname, true);
                b[b.length - 1].pop();
                b[b.length - 1].pop();
                var c = ternary(body.slice(bx + 1, cx), getname, true);
                var d = ternary(body.slice(cx + 1), getname, true);
                b[b.length - 1].push(...scanner2(`return [${getname(0)}?1:${c.length + 1},${getname(0)}]${ret ? '' : ';'}`));
                c[c.length - 1].pop();
                c[c.length - 1].pop();
                c[c.length - 1].push(...scanner2(`return [${d.length + 1},${getname(0)}]${ret ? '' : ';'}`));
                res.push(...b);
                res.push(...c);
                res.push(...d);
            }
        }
    }
    if (!res.length) return _express(body, getname, ret);
    if (!ret) res = Array.prototype.concat.apply([], res), relink(res);
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
        if (o.type === COMMENT || o.type === SPACE) continue;
        if (o.type === STRAP || o.type === STAMP) {
            var p = 0;
            if (o.text === '=') {
                ax = exps.length;
                bx = cx + 1;
                continue;
            }
            if (/[!~]|\+\-|\-\+/.test(o.text)) p = power_map["!"];
            if (!p && /[\+\-]/.test(o.text)) p = needpunc ? power_map["+"] : power_map["!"];
            if (!p) p = power_map[o.text];
            needpunc = false;
            var b = body.slice(bx, cx + 1);
            bx = cx + 1;
            b.index = nameindex;
            if (!cache.length || p > cache[cache.length - 1]) {
                cache.push(b, p);
                continue;
            }
            var n = scanner2(`${getname(nameindex)}`);
            n.index = nameindex;
            nameindex = cache[cache.length - 2].index;
            n.push(b.pop());
            while (cache.length && cache[cache.length - 1] >= p) {
                if (needcomma(q)) q.push({ type: STAMP, text: ',' });
                var p0 = cache.pop();
                var t = cache.pop();
                var isawait = _await(t);
                if (p0 > power_map["="]) q.push(...scanner2(`${getname(t.index)}=`));
                q.push.apply(q, t);
                q.push.apply(q, b);
                if (isawait) q.push(NEXT);
            }
            nameindex++;
            if (maxindex < nameindex) maxindex = nameindex;
            if (p == power_map["||"]) {
                if (o.text === '||') {
                    q.push(RE);
                }
                else if (o.text === '&&') {
                    q.push(RZ);
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
    if (cache.length) while (cache.length) {
        var p = cache.pop();
        if (needcomma(q)) q.push({ type: STAMP, text: ',' });
        nameindex = cache[cache.length - 1].index;
        var t = cache.pop();
        var isawait = _await(t, nameindex);
        if (p > power_map["="] && (ret || cache.length > 0)) q.push(...scanner2(`${getname(nameindex)}=`));
        q.push.apply(q, t);
        q.push.apply(q, b);
        if (isawait) q.push(NEXT);
        b = [{ type: EXPRESS, text: getname(nameindex) }];
    }
    else {
        if (ax === 1) {
            if (evals.length) {
                q.push.apply(q, scanner2(_withset(exps[0].text, getname(nameindex), createString(b))));
            }
            else {
                q.push(exps[0], { type: STAMP, text: "=" });
                q.push(...b);
            }
            exps.shift();
        }
        else if (ret && b.length || ax > 1) {
            q.push(...scanner2(`${getname(nameindex)}=`));
            q.push(...b);
        }
        else {
            q.push(...b);
        }
    }
    if (ax > 1) {
        while (ax > 0) {
            q.push({ type: STAMP, text: ';' });
            var [e] = exps.splice(ax - 1, 1);
            if (evals.length) {
                _withset(e.text, getname(nameindex + 1), getname(nameindex));
            }
            else {
                q.push(e);
                q.push(...scanner2(`=${getname(nameindex)}`))
            }
            ax--;
        }
    }
    if (evals.length && exps.length) for (var cx = q.length - 1; cx >= 0; cx--) {
        var o = q[cx];
        if (o.type !== EXPRESS) continue;
        if (o === exps[exps.length - 1]) {
            exps.pop();
            q.splice(cx, 1, ...scanner2(_withget(o.text)));
            if (!exps.length) {
                break;
            }
        }
    }
    relink(q);
    if (ret && !needbreak(q[q.length - 1]) && q.length) q.push(RETURN);
    if (ret) result = _invoke(q, getdeepname);
    return ret ? result : q;
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

function toqueue(body, getname, ret = false) {
    var uniftop = function () {
        for (var cx = 0, dx = iftop.length - 1; cx < dx; cx++) {
            var findex = iftop[cx++];
            var f = result[findex];
            var n = iftop[cx];
            var c = scanner2(`if(!${n})return [${iftop[cx + 1] - findex || 1}];`);
            if (f) f.unshift.apply(f, c), relink(f), f[f.length - 1][0].text = String(result.length - findex);
            else result.push(c);
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
                q.pop();
                q.push(...end);
                relink(q);
            }
        }
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
                end.push({ type: VALUE, text: result.length - cx });
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
            if (e.type !== LABEL) {
                break;
            }
            if (e.keep) {
                e.keep = false;
                break;
            }
            poplabel();
        }

        if (o.type === LABEL) {
            o.keep = true;
            labels.push(o);
            continue;
        }
        if (o.type === SCOPED && o.entry === '{' && !o.isExpress) {
            var b = toqueue(o, getname, false);
            result.push.apply(result, b);
            cx++;
            bx = cx;
            continue;
        }
        a: if (o.type === STRAP) {
            if (/^(new|typeof|yield|await)$/.test(o.text)) {
                break a;
            }
            if (o.text === 'return') {
                ret = true;
                bx = cx + 1;
                cx++;
                break a;
            }
            if (o.text === 'break') {
                cx = _break(body, cx, result);
                bx = cx + 1;
                continue;
            };
            if (o.text === 'with') {
                cx = _with(body, cx, unblock, result, getname);
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
                iftop.push(result.length);
                while (body[cx] !== o.next) cx++;
                o = o.next;
                elseif = true;
            }
            if (o.text === 'if') {
                while (body[cx] !== o.next) cx++;
                o = o.next;
                var n = '';
                if (o.first && o.first === o.lastUncomment) {
                    if (o.first.type === EXPRESS) {
                        n = o.first.text;
                    }
                }
                if (!n) {
                    unblock(o);
                    n = getname(0);
                }
                if (!elseif) {
                    if (iftop) uniftop();
                    iftop = [result.length, n];
                }
                else {
                    iftop.push(n);
                }
                elseif = true;
            }
            if (elseif) {
                while (body[cx] !== o.next) cx++;
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
        if (ret) result.push.apply(result, b);
        else result.push(b);
    } while (cx < body.length);
    return result;
}
module.exports = function (body, newname, ret) {
    var tmpnames = [];
    var getname = function (i) {
        i += evals.length;
        if (!tmpnames[i]) tmpnames[i] = newname();
        return tmpnames[i];
    };
    return toqueue(body, getname, ret);
};