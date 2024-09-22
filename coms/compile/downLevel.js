var scanner2 = require("./scanner2");
var strings = require("../basic/strings");
var Program = scanner2.Program;
var { STAMP, SCOPED, STRAP, EXPRESS, pickAssignment, COMMENT, SPACE, PROPERTY, VALUE, LABEL, QUOTED, snapExpressFoot, isEval, canbeTemp, rename, isHalfSentence, skipFunction, getDeclared, skipAssignment, skipSentenceQueue, createScoped, createString, splice, relink, pickSentence, snapExpressHead, needBreakBetween } = require("./common");
var splice2 = function (q, from, to, ...a) {
    var cx = q.indexOf(from);
    if (cx < 0) throw console.log(splice2.caller, console.format(`\r\n<red2>${i18n`自`}</red2>`), from && createString([from]), console.format(`\r\n<yellow>${i18n`至`}</yellow>`), to && createString([to]), console.format(`\r\n<cyan>${i18n`码列`}</cyan>`), createString(pickSentence(from))), i18n`结构异常`;
    var dx = to ? q.indexOf(to, cx) : q.length;
    if (dx < 0) throw console.log(splice2.caller, console.format(`\r\n<yellow>${i18n`自`}</yellow>`), from && createString([from]), console.format(`\r\n<red2>${i18n`至`}</red2>`), to && createString([to]), console.format(`\r\n<cyan>${i18n`码列`}</cyan>`), createString(pickSentence(from))), i18n`结构异常`;
    return splice(q, cx, dx - cx, ...a);
};
var insert1 = function (q, r, ...a) {
    if (r) splice2(q, r, r, ...a);
    else splice(q, q.length, 0, ...a);
};
var unslice = function (arr) {
    var rest = [arr];
    while (rest.length) {
        arr = rest.pop();
        for (var cx = arr.length - 1; cx >= 0; cx--) {
            var o = arr[cx];
            if (o.type === SCOPED) {
                if (o.entry !== "[") {
                    if (o.isObject) rest.push(o);
                    continue;
                }
                var n = o.next;
                if (n && (n.type !== STAMP || n.text !== ',')) {
                    rest.push(o);
                    continue;
                }
                var p = o.prev;
                if (p?.type && (STAMP | EXPRESS) && p.text === '...') {
                    var px = arr.lastIndexOf(p, cx);
                    splice(arr, px, cx - px + 1, ...o);
                    cx += o.length - 1;
                }
                else {
                    rest.push(o);
                }
            }
        }
    };
};
var patchCurve = function (b) {
    if (b.length > 1) {
        var b0 = b[0];
        if (b0.brace) {
            b[0] = scanner2(`()`)[0];
            b[0].push(b0);
            relink(b[0]);
        }
    }
}
// 解构赋值
var killdec = function (queue, i, getobjname, _var = 'var', killobj, islet) {
    var tmpname = '';
    var index = 0;
    var deep = 0;
    var dec = function (d, x) {
        var previx = tmpname;
        var [k, v] = d;
        var dp = 0;
        if (typeof k === 'number' && k < 0) {
            if (iter) throw new Error(i18n`暂不支持在当前语境读取尾部非剩余元素`);
            dp = 1;
            k = `${tmpname}["length"]>${doged - k - 1}?${tmpname}[${tmpname}["length"] - ${-k}]:undefined`;
        } else {
            if (rootenvs.Symbol && /\[\d+\]/.test(k) && iter) {
                var inc = parseInt(k.slice(1, k.length - 1));
                inc++;
                while (iter.index < inc) iter.next();
                k = iter.tname + `["value"]`;
            }
            else k = tmpname + k;
        }
        if (v.attributes) {
            tmpname = k;
            if (d.length === 2) {
                if (dp) {
                    deep += dp;
                    var n = getobjname(deep);
                    write([{ text: n, type: EXPRESS, istmp: true }], k);
                    k = tmpname = n;
                }
                dog(v);
                deep -= dp;
            }
            else {
                var n = getobjname(deep);
                write([{ text: n, type: EXPRESS, istmp: true }], `${tmpname},${n}=${n}!==undefined?${n}:`);
                var skiped = splice2(d[2], d[3], d[4]);
                killobj(skiped);
                splice(queue, i, 0, ...skiped);
                i += skiped.length;
                k = tmpname = n;
                dog(v);
            }
            if (tmpname === k) tmpname = previx;
            return;
        }
        if (!tmpname) {
            write(v, null, x < total - 1);
        }
        else if (d.length === 2) {
            write(v, k, x < total - 1);
        }
        else {
            var objname = getobjname(deep);
            var tmpv = scanner2(`${index++ > 0 ? ',' : ''}${objname}=${k}`)
            splice(queue, i, 0, ...tmpv);
            i += tmpv.length;
            write(v, `${objname}!==undefined?${objname}:`, x < total - 1);
            var skiped = splice2(d[2], d[3], d[4]);
            killobj(skiped);
            splice(queue, i, 0, ...skiped);
            i += skiped.length;
        }
        index++;
    };
    var doged, total;
    var write = function (sname, value, hasnext) {
        if (value && (sname.length === 1 && sname[0].text === tmpname) && hasnext) {
            tmpname = getobjname(deep++);
            if (index > 0) splice(queue, i++, 0, { type: STAMP, text: ',' });
            var q = scanner2(`${tmpname}=${sname[0].text}`);
            splice(queue, i, 0, ...q);
            i += q.length;
            index++;
        }
        if (index > 0) splice(queue, i++, 0, { type: STAMP, text: ',' });
        if (sname[0].type === SCOPED && snapExpressFoot(sname[0]) === sname[0]) {
            var [[d]] = getDeclared(sname[0]);
            if (sname[0].entry === '{') {
                sname = scanner2(tmpname = getobjname(deep));
            }
        }
        splice(queue, i, 0, ...sname);
        i += sname.length;
        if (!value && islet) {
            value = "undefined";
        }
        if (value) {
            var q = scanner2("=" + value);
            splice(queue, i, 0, ...q);
            i += q.length;
        }
        index++;
        if (d) dog(d);
    };
    var dog = function (d) {
        var deepback = deep++;
        var iterbackup = iter;
        dog_(d);
        if (iter && !iter.done) iter.return();
        iter = iterbackup;
        deep = deepback;
    }
    var iter = null;
    var Iter = class {
        index = 0;
        iname = getobjname(deep++);
        tname = getobjname(deep);
        init() {
            var init = scanner2(`${index++ > 0 ? ',' : ''}${this.iname}=(${tmpname}[Symbol["iterator"]]||Array["prototype"][Symbol["iterator"]])["call"](${tmpname}),${this.tname}=undefined`);
            splice(queue, i, 0, ...init);
            i += init.length;
        }
        return() {
            var retn = scanner2(`${index++ > 0 ? "," : ''}${this.tname}=(!${this.tname}||!${this.tname}["done"])&& isFunction(${this.iname}["return"])&&${this.iname}["return"]()`);
            rootenvs.isFunction = true;
            splice(queue, i, 0, ...retn);
            i += retn.length;
        }
        next() {
            var inext = scanner2(`${index++ > 0 ? "," : ""}${this.tname}=${this.iname}["next"]()`);
            splice(queue, i, 0, ...inext);
            i += inext.length;
            this.index++;
        }
    }
    var dog_ = function (d) {
        if (!d) return;
        if (rootenvs.Symbol && d.entry === '[') {
            iter = new Iter;
            iter.init();
        };
        var _d = doged, _t = total;
        total = d.attributes.length;
        var at = total;
        if (d["..."]) at = d["..."][1], total += 1;
        else {
            d.attributes.slice(0, at).forEach(dec);
            return;
        }
        var rest = d.attributes.slice(at);
        var head = d.attributes.slice(0, at);
        for (var r of rest) if (r[1] === name) return d.attributes.forEach(dec);
        var [name, at, a] = d["..."];
        if (name[0].text === "...") name.shift();
        else name[0].text = name[0].text.replace(/^\.\.\./, '');
        var dp = 0;
        if (d.entry === '{') {
            var map = Object.create(null);
            d.attributes.forEach((b, i) => {
                var a = b[0];
                if (/^\./.test(a)) a = JSON.stringify(a.slice(1));
                else if (/^\[[\s\S]*\]$/.test(a)) {
                    var t = scanner2(a)[0].first;
                    if (!t.next && (t.type === EXPRESS || t.type === QUOTED || t.type === VALUE)) {
                        a = t.text;
                    } else {
                        var n = getobjname(deep + dp++);
                        a = `${n}=(${a.slice(1, a.length - 1)})`;
                        b[0] = `[${n}]`;
                        a = n;
                    }
                }
                map[a] = a;
            });
            d.attributes.forEach(dec);
            write(name, `${patchMark}rest_(${tmpname},[${Object.keys(map)}])`, false), rootenvs[patchMark + "rest_"] = true;
        }
        else {
            doged = at + 1;
            head.forEach(dec);
            if (iter) {
                while (iter.index < a) iter.next();
                iter.done = true;
                write(name, `${patchMark}restIter_(${tmpname})`), rootenvs[patchMark + "restIter_"] = true;
            }
            else write(name, `slice_["call"](${tmpname},${at}${a > at ? `,${at - a}` : ''})`, rest.length > 0), rootenvs.slice_ = true;
            total = rest.length;
            rest.forEach(dec);
        }
        doged = _d;
        total = _t;
    };
    var single = function (d, p) {
        if (!d || d.attributes.length !== 1 || d["..."]) return;
        var [k, v, q, f1, f2] = d.attributes[0];
        if (rootenvs.Symbol && /^\[\d+\]$/.test(k)) return;
        p += k;
        if (!v.attributes) return [p, v, q, f1, f2];
        return single(v, p);
    };
    if (_var && i < queue.length) splice(queue, i++, 0, { type: STRAP, text: _var });
    var i0 = i;
    loop: while (i < queue.length) {
        var o = queue[i];
        if (o.type === STAMP) {
            switch (o.text) {
                case ",":
                    i++;
                    continue;
                case ";":
                    return i;
            }
        }
        var next = snapExpressFoot(o).next;
        tmpname = '';
        var index0 = index;
        var hasnext = false;
        if (!next || next.type !== STAMP || next.text !== '=') {
            // 只声明不赋值的语句
            hasnext = next && next.type === STAMP && next.text === ',';
            if (hasnext) next = next.next;
            var n = indexof(queue, next, i);
            if (islet && o.type === EXPRESS) {
                if (!next || next.type !== STRAP || !/^(in|of)$/.test(next.text)) splice(queue, i + 1, 0, ...scanner2('=undefined'));
                n += 2;
            }
            if (o.type === SCOPED) {
                var prev = o.prev;
                if (prev && prev.type === STAMP && prev.text === ',') i = queue.lastIndexOf(prev, i), index = 1;
                else index = 0;
                splice(queue, i, n - i);
                unslice(o);
                var [[d]] = getDeclared(o);
                dog(d);
                n = i = indexof(queue, next, i);
                if (hasnext && index0 < index) splice(queue, i, 0, { type: STAMP, text: ',' }), i++, n++;
                if (hasnext) continue loop;
            }
            else if (hasnext) {
                i = n;
                index++;
                continue;
            }
            i = n;
            break;
        }
        var objs = [];
        do {
            var next = snapExpressFoot(o).next;
            hasnext = next && next.type === STAMP && next.text === ',';
            if (!next || next.type !== STAMP || next.text !== "=") {
                // 赋值结束
                if (tmpname) {
                    var n = skipAssignment(queue, i);
                    o = queue[n];
                    var skiped = splice(queue, i, n - i);
                    killobj(skiped);
                    splice(queue, i, 0, ...skiped);
                    i += skiped.length;
                    break;
                }
                if (!next || next.type === STAMP && /^[,;]$/.test(next.text)) {
                    if (o.type === EXPRESS && !/[\.\[]/.test(o.text) && snapExpressFoot(o) === o) {
                        tmpname = o.text;
                        if (hasnext) next = next.next;
                        splice(queue, i, indexof(queue, o = next, i) - i);
                        i = indexof(queue, o, i);
                    }
                }
                break;
            }
            if (o.type === SCOPED && o.entry !== '(') {
                var n = indexof(queue, next.next, i);
                var prev = o.prev;
                if (prev && prev.type === STAMP && prev.text === ',') i = queue.lastIndexOf(prev, i), index = 1;
                else index = 0;
                splice(queue, i, n - i);
                unslice(o);
                delete o.next;
                if (o.length && getDeclared(o).length > 0) objs.push(o);
            }
            else if (o.type === EXPRESS && !/[\.\[]/.test(o.text) && snapExpressFoot(o) === o) {
                if (!tmpname) tmpname = o.text;
            }
            o = next.next;
            i = indexof(queue, o, i);
        } while (o);
        if (!tmpname) {
            if (objs.length === 1) {
                var [[d]] = getDeclared(objs[0]);
                var a = single(d, '');
                if (a) {
                    if (index > 0) splice(queue, i++, 0, { type: STAMP, text: ',' });
                    patchCurve(a[1]);
                    var i2 = skipAssignment(queue, i);
                    var restq = splice(queue, i, i2 - i, ...a[1], { type: STAMP, text: "=" });
                    killobj(restq);
                    if (restq.length === 1) {
                        restq = restq[0];
                    }
                    else {
                        restq.entry = "("
                        restq.leave = ")";
                        restq.type = SCOPED;
                        relink(restq);
                    }
                    splice(queue, i += a[1].length + 1, 0, restq);
                    i2 = i + 1;
                    if (!a[2]) var q = scanner2(a[0]);
                    else {
                        var objname = getobjname(0);
                        q = scanner2(`(${objname} =)`);
                        q[0].push(...splice(queue, i, i2));
                        q[0].push(...scanner2(`${a[0]},${objname}!== undefined ? ${objname}: `), ...splice2(a[2], a[3], a[4]));
                        i2 = i;
                    }
                    splice(queue, i = i2, 0, ...q);
                    i += q.length;
                    continue;
                }
            }
            tmpname = getobjname(0);
            if (i > i0) splice(queue, i++, 0, { type: STAMP, text: ',' }, { type: EXPRESS, text: tmpname }, { type: STAMP, text: "=" });
            else splice(queue, i, 0, { type: EXPRESS, text: tmpname }, { type: STAMP, text: "=" });
            i += 2;
            var i2 = skipAssignment(queue, i);
            var n = queue[i2];
            killobj(queue.slice(i, i = i2));
            if (hasnext) splice(queue, i, 1);
            index++;
        }
        for (var o0 of objs) {
            deep = 0;
            var dd = getDeclared(o0)[0];
            var d = dd[0];
            if (!d) dog(dd.attributes[0][1]);
            else dog(d);
        }
        if (hasnext && index > index0) {
            splice(queue, i++, 0, { type: STAMP, text: ',' });
        }
        index = 0;
    }
    // relink(queue);
    return i;
};
// 键值对重组
var killmap = function (body, i, _getobjname, _getnewname, killobj) {
    var o = body[i];
    if (!o.length) return i + 1;
    var m = o.first;
    var s = m, p;

    loop: while (m) {
        s = m, p = m.prev;
        if (m.type === STAMP && m.text === '...' || m.type === EXPRESS) break;
        while (m && (m.type === STRAP || m.type === STAMP)) m = m.next;
        if (!m || m.type & (PROPERTY | QUOTED | EXPRESS) && /^\[/.test(m.text) || m.isprop && (m.type === SCOPED || m.short || m.next && m.next.type === SCOPED)) {
            break;
        }
        m = m.next;
        if (!m) break;
        if (m && m.type === STAMP && m.text === ':') m = m.next;
        if (!m) break;
        var n = skipAssignment(m);
        while (m !== n) {
            if (m.type === STAMP && m.text === '=>') {
                body.await_ = true;
                break loop;
            }
            if (m.type === STRAP) {
                if (/^await$/.test(m.text)) {
                    body.await_ = true;
                    break loop;
                }
                if (/^function$/.test(m.text)) {
                    while (m && (m.type !== SCOPED || m.entry !== '{')) m = m.next;
                    continue;
                }
                if (/^class$/.test(m.text)) {
                    while (m && !m.isClass) m = m.next;
                    while (m && m.isClass) m = m.next;
                    continue;
                }
            }
            if (m.type === SCOPED) {
                if (m.entry === "(" && m.next && m.next.type === STAMP && m.next.text === '=>') {
                    s = skipAssignment(m);
                    var mi = o.indexOf(m);
                    var si = o.indexOf(s, mi);
                    if (si < 0) si = o.length;
                    var ms = o.slice(mi, si);
                    killobj(ms);
                    splice(o, mi, si - mi, ...ms);
                    m = s;
                    continue;
                }
                killobj(m);
                if (m.await_) break loop;
            }
            m = m.next;
        }
        if (m && m.type === STAMP && /^[,;]$/.test(m.text)) m = m.next;
    }
    if (!m) return i + 1;
    m = s;
    if (p && p.type === STAMP && p.text === ',') {
        var mi = o.indexOf(m);
        var pi = o.lastIndexOf(p, mi);
        if (pi > 0) splice(o, pi, mi - pi);
    }
    var q;
    var l = 1;
    var initq = function () {
        q = scanner2(`(${_getobjname()} =)`)[0];
        var qo = splice(body, i, l, q);
        insert1(q, null, ...qo);
        insert1(q, null, { type: STAMP, text: ',' });
    }
    var define_ = Object.create(null);
    var tempname = null;
    var t;
    while (m) {
        if (m.type === EXPRESS || m.type === STAMP && m.text === '...') {
            var s = m;
            m = skipAssignment(m);
            if (/^\.\.\./.test(s.text)) {
                s.text = s.text.replace(/^\.\.\./, '');
                if (!s.text) {
                    splice2(o, s, s = s.next);
                }
                if (q) {
                    t = scanner2(`${patchMark}extend(${_getobjname()},)`);
                    rootenvs.extend = true;
                    insert1(q, null, ...t);
                }
                else {
                    if (!t) {
                        t = scanner2(`${patchMark}extend()`);
                        rootenvs.extend = true;
                        var [o0] = splice(body, i, 1, ...t);
                        t[1].push(o0);
                        l = 2;
                    }
                    insert1(t[1], null, { type: STAMP, text: "," });
                }
                var e = splice2(o, s, m);
                insert1(t[1], null, ...e);
                if (q) {
                    if (m) {
                        e = splice2(o, m, m = m.next);
                        killobj(e);
                        insert1(q, null, ...e);
                    }
                }
                if (m && m.type === STAMP && m.text === ',') splice2(o, m, m = m.next);
            }
            continue;
        }
        if (m && m.type === STAMP && m.text === ',') {
            splice2(o, m, m = m.next);
            continue;
        }
        if (!q) initq();

        var [prop, m] = getprop(o, m);
        if (!prop.value.length) insert1(prop.value, null, { type: EXPRESS, text: prop.name })
        else if (prop.sfunc === false) killobj(prop.value);
        if ((prop.get || prop.set) && !tempname) tempname = _getnewname();
        setprop(prop, _getobjname(), define_, q, tempname);
    }

    if (q) {
        relink(q);
        var qe = q.last;
        if (qe.type !== STAMP || qe.text !== ',') q.push({ type: STAMP, text: ',' });
        q.push(...scanner2(_getobjname()));
        relink(q);
    }
    return i + 1;
};
var getprop = function (o, m) {
    var prop = {};
    var s = m;
    while (m && (m.type === STRAP || m.type === STAMP)) {
        prop[m.text] = true;
        m = m.next;
    }
    if (m && (m.isprop)) {
        prop.name = createString([m]);
        if (m.short) {
            prop.short = true;
            prop.value = scanner2(prop.name);
            if (m.next) insert1(prop.value, null, { type: STAMP, text: ',' });
        }
        if (prop.get || prop.set) {
            if (!/^[\d\.'"\[]/.test(prop.name)) prop.name = strings.encode(prop.name);
        }
        else if (/^['"`\d\.]/.test(prop.name)) {
            prop.name = `[${prop.name}]`;
        }
        else if (!/^[\[]/.test(prop.name)) {
            prop.name = "." + prop.name.trim();
        }
        m = m.next;
    }
    if (m && m.type === SCOPED && m.entry === '(') {
        prop.sfunc = true;
    }
    else {
        prop.sfunc = false;
        if (m && /^[\=\:]$/.test(m.text)) m = m.next;
    }
    splice2(o, s, m);
    var s = m;
    if (m && prop.sfunc !== false && m.type === SCOPED && m.entry === '(') {
        m = m.next;
        if (m && m.type === SCOPED && m.brace) m = m.next;
    }
    else m = skipAssignment(m);
    if (m && !m.isprop) m = m.next;
    if (s) {
        if (!prop.short) prop.value = splice2(o, s, m);
        else splice2(o, s, m);
    }
    else if (!prop.value) prop.value = [];
    return [prop, m];
};
var setprop = function (prop, k, d, q, tempname) {
    if (prop.sfunc !== false)
        // insert1(prop.value, prop.value[0], ...scanner2(`${prop.async ? "async " : ""}function${prop["*"] ? "*" : ''}`));
        insert1(prop.value, prop.value[0], ...scanner2(`function`));
    if (prop.get || prop.set) {
        var pv = prop.value;
        if (pv) {
            while (pv.length && pv[pv.length - 1].type & (SPACE | COMMENT)) pv.pop();
            var pe = pv[pv.length - 1];
            if (pe && pe.type === STAMP && /^[,;]$/.test(pe.text)) pv.pop();
            else pe = null;
        }
        if (!d[prop.name]) {
            let tmp = scanner2(`\r\nObject["defineProperty"](${k},${prop.name},(${tempname}={},${tempname}))`);
            insert1(q, null, ...tmp);
            if (pe) insert1(q, null, pe);
            tmp = tmp[tmp.length - 1];
            tmp = tmp[tmp.length - 1];
            d[prop.name] = tmp;
        }
        insert1(d[prop.name], null, ...rescan`[${prop.get ? '"get"' : '"set"'}]=${pv},${tempname}`);
    }
    else {
        insert1(q, null, ...scanner2(`${q && q.length ? "\r\n" : ''}${k}${prop.name}=`));
        insert1(q, null, ...prop.value);
    }
}
var rootenvs = null, rootHyper;
var killcls = function (body, i, letname_, getname_) {
    var extends_ = [];
    var o = body[i];
    var ishalf = isHalfSentence(body, i - 1);
    var hasnew = o.prev && o.prev.type === STRAP && o.prev.text === 'new';
    var start = o;
    var decName = !o.isExpress && o.next.type === EXPRESS && o.next.text;
    var isExpress = o.isExpress;
    while (o) {
        o = o.next;
        if (!o) break;
        var name = '';
        if (o.type === EXPRESS) {
            name = o.text;
            o = o.next;
        }
        else {
            name = '';
        }
        extends_.push(name);
        if (o.type === STRAP && o.text === 'extends') {
            o = o.next;
            if (!o) break;
        }
        if (o.type !== STRAP || o.text !== 'class') break;
    }
    var func = scanner2("(function(){}())")[0];
    var [, head, defines, invokes] = func;
    var foot = [];
    var base = '';
    if (o) {
        var next = o;
        while (next && !next.isClass) next = next.next;
        base = createString(splice2(body, o, o = next));
    }
    if (base === 'Array') base = 'Array2', rootenvs.Array2 = true;
    var index = 0;
    while (o && o.isClass) {
        var scoped = o.scoped;
        var m = o.first;
        var name = extends_.pop();
        if (!name && (base || extends_.length)) name = letname_('cls' + index);
        var assign = [];
        var constructor = scanner2('(){}');
        var define_ = Object.create(null);
        var static_ = Object.create(null);
        var clz = { name };
        if (!clz.name) clz.name = letname_("cls" + index);
        var tempname = null;
        while (m) {
            var [prop, m] = getprop(o, m);
            if (!prop.value.length) prop.value = scanner2('undefined;');
            var k = prop.static ? clz.name : `${clz.name}["prototype"]`;
            var d = prop.static ? static_ : define_;
            if (prop.get || prop.set || prop.static) {
                if (prop.name) {
                    if ((prop.get || prop.set) && !tempname) tempname = getname_("tmp");
                    setprop(prop, k, d, defines, tempname);
                }
                else if (prop.static) {
                    var value = scanner2(`(function(){}())`);
                    splice(value[0], 2, 1, ...prop.value)
                    splice(foot, 0, foot.length, value[0]);
                }
            }
            else if (/^(?:\.constructor|\[(['"`])constructor\1\])$/.test(prop.name)) {
                constructor = prop.value;
                var ce = constructor[constructor.length - 1];
                while (ce.type & (SPACE | COMMENT) || ce.type === STAMP && /^[,;]$/.test(ce.text)) constructor.pop(), ce = constructor[constructor.length - 1];
            }
            else if (prop.sfunc !== false) {
                setprop(prop, k, d, defines);
            }
            else {
                insert1(assign, null, ...scanner2(`this${prop.name}=`));
                insert1(assign, null, ...prop.value);
            }
        }
        relink(o);
        if (invokes.length) insert1(invokes, null, { type: STAMP, text: ',' });
        var fname = scanner2('function ' + name);
        if (isExpress) fname[0].isExpress = true;
        insert1(invokes, null, ...fname);
        if (base) {
            constructor[1].push(...scanner2('return this'))
            relink(constructor[1]);
            var cs = createScoped(constructor[1]);
            var newt = getname(cs.vars, cs.envs, 'this_');
            if (cs.caps.this) rename(cs.caps, 'this', newt);
            var inited = false;
            assign.forEach(o => {
                if (o.type === EXPRESS) o.text = o.text.replace(/^this([\[\.]|$)/g, newt + "$1");
            });
            if (cs.caps.super) {
                cs.caps.super.forEach(o => {
                    if (o.text !== 'super') return;
                    var n = o.next;
                    if (!n || n.type !== SCOPED || n.entry !== "(") return;
                    o.text = base + '["call"]';
                    if (!inited) {
                        insert1(o.queue, skipAssignment(o), ...assign);
                    }
                    inited = true;
                    insert1(o.queue, o, ...scanner2(`var ${newt}=`));
                    if (n.length) n.unshift({ type: STAMP, text: ',' });
                    n.unshift({ type: EXPRESS, text: 'this' });
                    insert1(o.queue, n.next, ...scanner2(`||this;`));
                })
            }
            if (scoped.caps.super) {
                scoped.caps.super.forEach(o => {
                    if (!/^super(\.|\[|$)/.test(o.text)) return;
                    o.text = `${base}["prototype"]` + o.text.replace(/^super/, '');
                    insert1(o.queue, o.next, ...scanner2('["bind"](this)'));
                })
            }
            if (!inited) constructor[1].unshift(...scanner2(`\r\nvar ${newt}=${base}["apply"](this,arguments)||this;\r\n`), ...assign);
        }
        else {
            constructor[1].unshift(...assign);
        }
        insert1(invokes, null, ...constructor);
        o = o.next;
        if (base) defines.unshift(...scanner2(`${patchMark}extends_(${clz.name},${base})${defines.length ? "\r\n" : ""}`)), rootenvs[patchMark + "extends_"] = true;
        base = clz.name;
        if (clz.name) insert1(head, null, ...scanner2(`${head.length ? ',' : ''}${clz.name}`));
        index++;
    }
    insert1(defines, null, ...foot);
    var s = i;
    i = body.indexOf(o, i);
    if (i < 0) i = body.length;
    if (head.length > 1 || start.isExpress && (defines.length) || ishalf && defines.length) {
        splice(defines, defines.length, 0, ...scanner2(`\r\nreturn ${clz.name}`))
        if (decName) splice(func, 0, 0, ...scanner2(`var ${decName}=`));
        if (hasnew) splice(body, s, i - s, func);
        else splice(body, s, i - s, ...func);
    }
    else {
        if (defines.length) {
            splice(invokes, invokes.length, 0, { text: ';', type: STAMP }, ...defines);
        }
        splice(body, s, i - s, ...invokes);
    }
    if (o && needBreakBetween(o.prev, o)) insert1(o.queue, o, { type: SPACE, text: '\r\n' });
    return i;
};
var indexof = function (list, o, i) {
    if (o) {
        i = list.indexOf(o, i);
        if (i < 0) i = list.length;
    }
    else i = list.length;
    return i;
};
var is3dots = function (m) {
    return m.type === STAMP && m.text === '...' || m.type === EXPRESS && /^\.\.\./.test(m.text);
};
// 数组或参数展开
var killspr = function (body, i, _getobjname, killobj) {
    var o = body[i];
    var m = o.first;
    if (!m) return i + 1;
    unslice(o);
    killobj(o);
    m = o.first;
    var index = 0;
    var spr = function () {
        var s = m;
        m = skipAssignment(m);
        s.text = s.text.replace(/^\.\.\./, '');
        var v = splice2(o, s, m);
        if (!s.text) v.shift();
        if (m) splice2(o, m, m = m.next);
        killobj(v);
        var q = scanner2(`slice_["call"]()`);
        rootenvs.slice_ = true;
        insert1(q[q.length - 1], null, ...v);
        return q;
    };
    var killnext = function (m) {
        while (m && (m.type !== STAMP || m.text !== ',')) {
            m = m.next;
        }
        return m;
    }
    while (m) {
        if (is3dots(m)) break;
        m = killnext(m);
        if (m) m = m.next;
        index++;
    }
    if (!m) return i + 1;
    var c = scanner2('["concat"]()');
    if (o.entry === '(') {
        var r = snapExpressHead(o);
        if (r.type === STRAP && r.text === "new") {
            var qt = scanner2(`()`)[0];
            r = r.next;
            var b = body.lastIndexOf(r, i);
            var ct = splice(body, b, i - b + 1, qt);
            var qq = ct[ct.length - 1];
            var qb = scanner2("[null,]")[0];
            qb.push(...splice(qq, 0, qq.length, qb));
            ct[ct.length - 1].unshift({ type: STAMP, text: ',' });
            ct[ct.length - 1].unshift(...ct.slice(0, ct.length - 1).map(a => extend({}, a)));
            ct.splice(ct.length - 1, 0, ...scanner2("['bind']['apply']"));
            qt.push(...ct);
            relink(qq)
            relink(qb)
            relink(qt)
            return b;
        }
        var rt = (r.type & (EXPRESS | STAMP)) && r.text.replace(/^\.\.\./, '');
        var p = o.prev;
        var pp = p?.prev;
        var done = false;
        var hasdot = false;
        if (r === o) done = true;
        else if (r === p) {
            if (r.type === EXPRESS && !/\.[\s\S]*\./.test(rt) && !/\[[^\]]*\]\[[^\]]*\]/.test(rt)) {
                var p = r;
                hasdot = r.text.length !== rt.length;
                var n = /\.|\[/.test(rt) ? rt.replace(/\.[^\.]*|\[[^\]]*\]$/, '') : "null";
                splice(o, 0, 0, ...scanner2(n + ","));
                done = true;
            }
        }
        else if (r === pp) {
            if (p.type === SCOPED && p.entry === "[" && !/[\.\[]/.test(rt)) {
                splice(o, 0, 0, ...scanner2(rt + ","));
                p = r;
                done = true;
            }
        }
        else if (r === pp.prev) {
            var ppp = pp.prev;
            if (pp.text === '.' && p.type === EXPRESS && !/[\.\[]/.test(p.text) && ppp.type === EXPRESS && !/[\.\[]]/.test(ppp.text)) {
                splice(o, 0, 0, ...scanner2(ppp.text + ','));
                p = pp.prev;
                done = true;
            }
        }
        if (!done) {
            var n = null, hasdot = false;
            var pt = p.type === EXPRESS && p.text.replace(/^\.\.\./, '');
            if (p.type === EXPRESS && (n = /^(?:[\s\S]*[^\.])?(\.[^\.]*|\[[^\]]*\])$/.exec(pt))) {
                hasdot = p.text.length !== pt.length;
                var n = n[1];
                p.text = pt.slice(0, pt.length - n.length);
                splice(body, i++, 0, { type: EXPRESS, text: n });
            }
            else if (pp && /\.$/.test(pp.text) && !/[\.\[]/.test(p.text)) {
                p = pp.prev;
            }
            else if (p.type === SCOPED && p.entry === '[') {
                p = p.prev;
            }
            else {
                splice(body, i++, 0, { type: VALUE, text: "null" });
            }
            splice(o, 0, 0, ...scanner2(`${_getobjname()},`));
            var h = scanner2(`${hasdot ? "..." : ''}(${_getobjname()}=)`);
            var cx = body.lastIndexOf(r, i);
            var dx = body.indexOf(p, cx) + 1;
            var h1 = h[h.length - 1];
            var h0 = h[0];
            if (r.prev && needBreakBetween(r.prev, r)) {
                h.unshift({ type: STAMP, text: ';' });
            }
            splice(h1, h1.length, 0, ...splice(body, cx, dx - cx, ...h));
            i += cx - dx + h.length;
            if (p.type & (EXPRESS | STAMP) && !p.text) {
                var cx = h0.lastIndexOf(p);
                if (cx >= 0) splice(h1, cx, 1);
            }
        }
        splice(body, i++, 0, ...scanner2('["apply"]'));
        var m1 = skipAssignment(m);
        if (index > 0 || m1 && m1.next) {
            var h = splice(o, 2, o.length - 2);
            var c = scanner2(`[]`);
            splice(c[0], 0, 0, ...h);
            killobj(c);
            splice(o, o.length, 0, ...c);
            return i + 1;
        };
        m.text = m.text.replace(/^\.\.\./, '');
        if (!m.text) splice2(o, m, m.next);
        return i + 1;
    }
    if (index > 0) {
        if (m) splice2(o, m.prev, m);
        splice(body, i + 1, 0, ...c);
        insert1(c[1], null, ...spr());
    }
    else {
        splice(body, i, 1, ...spr(), ...(m ? c : []));
    }
    var d;
    while (m) {
        if (is3dots(m)) {
            if (c[1].length) insert1(c[1], null, { type: STAMP, text: "," });
            insert1(c[1], null, ...spr());
            d = null;
            continue;
        }
        var s = m;
        m = killnext(m);
        if (!d) {
            d = scanner2('[]');
            if (c[1].length) insert1(c[1], null, { type: STAMP, text: "," });
            insert1(c[1], null, ...d);
        }
        if (d[0].length) insert1(d[0], null, { type: STAMP, text: "," });
        insert1(d[0], null, ...splice2(o, s, m));
        if (m) splice2(o, m, m = m.next);
    }
    return i + 1;
};

var killobj = function (body, getobjname, getletname, getname_, letname_, deep = 0) {
    var i = 0;
    var _getdeep = function () {
        deep++;
        _getdeep = function () {
            return deep;
        }
        return deep;
    };
    var _getobjname = function () {
        return getobjname(_getdeep());
    };
    var _getdeepname = function (i) {
        return getobjname(deep + i);
    };
    var deepkill = function (o) {
        killobj(o, getobjname, getletname, getname_, letname_, deep);
        if (o.await_) body.await_ = true;
    };
    var _getnewname = function () {
        return getname_("_");
    };
    while (i < body.length) {
        var o = body[i];
        var islet = false;
        if (o.type === STRAP) {
            switch (o.text) {
                case "await":
                    body.await_ = true;
                    i++;
                    break;
                case "yield":
                    var o = o.next;
                    if (o && o.type === STAMP && o.text === '*') {
                        i++;
                        var n = body.indexOf(o, i) + 1;
                        o = o.next;
                        splice(body, i, n - i);
                        n = skipAssignment(body, i - 1);
                        var name = getname_("_");
                        var y = scanner2(`for await(var ${name} of)yield ${name}`, innerJs);
                        splice(y[2], y[2].length, 0, ...splice(body, i, n - i));
                        splice(body, i - 1, 1, ...y);
                        innerJs.setType(y[1]);
                        if (y[1].type === EXPRESS) splice(body, i, 1);
                        unforof(y[0], getname_.bind(null, '_'), y.used, deepkill);
                    }
                    i++;
                    break;
                case "let":
                    islet = body.keeplet !== false;
                case "const":
                case "var":
                    splice(body, i, 1);
                    i = killdec(body, i, _getdeepname, 'var', deepkill, islet);
                    break;
                case "catch":
                    var n = o.next;
                    if (n.type !== SCOPED || n.entry !== '(') {
                        splice(body, ++i, 0, scanner2(`(${letname_('e')})`)[0])
                    }
                    i++;
                    break;
                case "class":
                    i = killcls(body, i, letname_, getname_);
                    break;
                case "for":
                case "function":
                    o = o.next;
                    if (o && o.type === STRAP) o = o.next;
                    else if (o && o.type === STAMP) {
                        i++;
                        var n = body.indexOf(o, i) + 1;
                        o = o.next;
                        splice(body, i, n - i);
                    }
                    if (o && o.type === EXPRESS) o = o.next;
                    if (o && o.type === SCOPED) o = o.next;// ()
                    if (o && o.type === SCOPED) o = o.next;// {}
                    i = body.indexOf(o, i);
                    if (i < 0) i = body.length;
                    break;
                case "async":
                    splice(body, i, 1);
                    break;
                case "new":
                    if (o.next?.needle) {
                        o.text = 'undefined';
                        o = o.next;
                        var e = snapExpressFoot(o).next;
                        splice2(o.queue, o, e);
                        break;
                    }
                default:
                    i++;
            }
            continue;
        }
        else if (o.type === SCOPED) {
            if (o.isObject) {
                if (o.next && o.next.type === STAMP && o.next.text === '=') {
                    i = killdec(body, i, _getdeepname, '', deepkill);
                    continue;
                }
                else {
                    i = killmap(body, i, _getobjname, _getnewname, deepkill);
                    // i = indexof(body, o, i);
                    continue;
                }
            }
            else if (o.entry === '[') {
                var a = snapExpressHead(o);

                if (a === o && o.next && o.next.type === STAMP && o.next.text === '=' || o.next && o.next.type === STRAP && /^(in|of)$/.test(o.next.type) && body.entry === '(' && body.prev && body.prev.type === STRAP && body.prev.text === 'for') {
                    i = killdec(body, i, _getdeepname, '', deepkill);
                }
                else {
                    i = killspr(body, i, _getobjname, deepkill);
                }
                continue;
            }
            else if (o.entry === '(') {
                if (o.next && o.next.type === STAMP && o.next.text === '=>');
                else if (o.prev && o.prev.type === STRAP) {
                    var p = o.prev;
                    if (p.transive || /^(if|else|while|with|switch)$/.test(p.text)) deepkill(o);
                }
                else if (!o.prev || o.prev.type & (STAMP | STRAP)) {
                    deepkill(o);
                }
                else {
                    i = killspr(body, i, _getobjname, deepkill);
                    continue;
                }
            }
        }
        else if (o.type === STAMP) {
            if (o.text === "=>") {
                i = unarrow(body, i, deepkill, letname_);
                continue;
            }
            else i = newpunc(body, i, _getnewname);
        }
        else if (o.isdigit) {
            if (/^0[^\.]/.test(o.text)) {
                o.text = String(eval(o.text));
            }
        }
        else if (o.type === EXPRESS) {
            if (o.text === 'new.target') o.text = 'undefined';
        }
        i++;
    }
};

var unawait = function (body, getname, argname) {
    body.patchMark = patchMark;
    return unstruct(body, function () {
        return getname("_");
    }, argname);
};
var isbreak = function (m) {
    return /^(yield|await|throw)$/.test(m.text) || /^(break|continue)/.test(m.text) && !m.isend;
}
var getsync = function (m, killobj) {
    if (m.type === SCOPED && m.await_) return null;
    var n = skipAssignment(m);
    while (m !== n) {
        if (m.type === STRAP && isbreak(m)) return null;
        if (m.length) {
            killobj(m);
            if (m.await_) return null;
            if (hasbreak(m)) return null;
        }
        m = m.next;
    }
    return n;
};
var hasbreak = function (body) {
    for (var o of body) {
        if (o.type !== STRAP) continue;
        if (isbreak(o)) return true;
    }
    for (var o of body) {
        if (o.length && hasbreak(o)) return true;
    }
    return false;
};
var ises3 = function (o, killobj) {
    if (o && o.type === SCOPED && o.brace) {
        killobj(o);
        if (o.await_) return false;
        if (hasbreak(o)) return false;
    }
    else while (o) {
        o = getsync(o, killobj);
        if (o === null) return false;
        if (!o || o.type !== STAMP || o.text !== ',') {
            break;
        }
        o = o.next;
    }
    return true;
}
var getexplist = function (f, m) {
    var explist = [];
    while (f !== m) explist.push(f), f = f.next;
    explist.push(m);
    return explist;
}
var unforin = function (o, getnewname_, killobj) {
    // 仅处理有 await 或 yield 的代码
    var m = o.first;
    var hasdeclare = false;
    if (m.type === STRAP) {
        m = m.next;
        hasdeclare = true;
    }
    var f = m;
    m = snapExpressFoot(m);
    var n = m.next;
    if (n.type !== STRAP || n.text !== 'in') {
        return false;
    }
    if (ises3(o.first, killobj) && ises3(o.next, killobj)) return;
    var prev = o.prev;
    while (prev && prev.type === LABEL) prev = prev.prev;
    var pp = prev && prev.prev;
    var ppp = pp && pp.prev;
    if (pp && pp.type === STRAP && pp.text === 'else' ||
        ppp && pp.type === SCOPED && pp.entry === '(' && ppp.type === STRAP && /^(with|for|while|if)$/.test(ppp.text)) {
        var brace = scanner2("{}")[0];
        var nn = skipAssignment(prev);
        var os = splice2(o.queue, prev, nn, brace);
        splice(brace, 0, 0, ...os);
    }
    n = n.next;
    var tname = getnewname_();
    var sname = getnewname_();
    var kname = getnewname_();
    var s = scanner2(`${sname}=`);
    insert1(s, null, ...splice2(o, n));
    insert1(s, null,
        ...scanner2(`,${tname}=[];for(${hasdeclare ? 'var ' : ''}${hasdeclare ? f.text : kname} in ${sname})${tname}["push"](${hasdeclare ? f.text : kname});`)
    );
    insert1(o.queue, o.prev, ...s);
    splice(o, 0, o.length, ...scanner2(`${kname}=0;${kname}<${tname}["length"]&&`));
    var c = scanner2(`(=${tname}[${kname}],true);${kname}++`);
    splice(c[0], 0, 0, ...getexplist(f, m));
    insert1(o, null, ...c);
};
var Javascript = require("./Javascript");
var innerJs = new Javascript;
innerJs.defaultType = STRAP;
var unforof = function (o, getnewname, used, killobj) {
    var hasawait = false;
    var r = o;
    o = o.next;
    if (o.type === STRAP && o.text === 'await') {
        hasawait = true;
        splice2(o.queue, o, o.next);
        o = o.next;
    }
    var m = o.first;
    var hasdeclare = false;
    if (m.type === STRAP) {
        m = m.next;
        hasdeclare = true;
    }
    var m0 = m;
    m = snapExpressFoot(m);
    var n = m.next;
    if (n.type !== STRAP || n.text !== 'of') {
        return o.next;
    }
    var f = n.next;
    var p = splice2(o, m0, m = n);
    if (hasdeclare) {
        var [d] = getDeclared(m0);
        if (d.length) insert1(o, m, ...scanner2(d.join(",") + ","));
        else splice(o, o.first, m0);
    }
    var iname = getnewname();
    var gname = getnewname();
    var oname;
    var useSimpleLoop = !(rootHyper || used.Symbol) && !hasawait;
    if (!f.next && f.type === EXPRESS && !/\./.test(f.text) && used[f.origin || f.tack].length === 1) {
        splice2(o, m);
        oname = f.text;
    }
    else {
        oname = getnewname();
        splice2(o, n, f);
        var mo = splice2(o, f);
        if (useSimpleLoop && !hasawait) useSimpleLoop = mo.length === 1 && (mo[0].type === EXPRESS || mo[0].type === SCOPED && mo[0].entry === "[");
        splice(o, o.length, 0, ...scanner2(`${oname}=`));
        splice(o, o.length, 0, ...mo);
        splice(o, o.length, 0, { type: STAMP, text: ',' });
    }
    var pnames = [];
    var getpname = function (i) {
        var n = pnames[i];
        if (!n) n = pnames[i] = getnewname();
        return n;
    }
    if (useSimpleLoop) {
        splice(o, o.length, 0, ...scanner2(`${iname}=0;${iname}<${oname}["length"]&&(,true);${iname}++`));
        splice(p, p.length, 0, ...scanner2(`=${oname}[${iname}]`));
        killdec(p, 0, getpname, null, killobj);
        if (p.length) splice(o[o.length - 4], 0, 0, ...p);
        else splice(o[o.length - 4], 0, 1);
    }
    else {
        rootenvs.Symbol = true;
        splice(o, o.length, 0, ...scanner2(`${gname}=${hasawait ? `${oname}[Symbol["asyncIterator"]]||${oname}[Symbol["iterator"]]` : `${oname}[Symbol["iterator"]]`}||Array["prototype"][Symbol["iterator"]],${gname}=${gname}["call"](${oname}),${iname}=${hasawait ? "await " : ''}${gname}["next"]();!${iname}["done"]&&(,true);${iname}=${hasawait ? 'await ' : ''}${gname}["next"]()`, innerJs));
        splice(p, p.length, 0, ...scanner2(`=${hasawait ? 'await ' : ''}${iname}["value"]`, innerJs));
        killdec(p, 0, getpname, null, killobj);
        if (p.length) splice(o[o.length - 7 - hasawait], 0, 0, ...p);
        else splice(o[o.length - 7 - hasawait], 0, 1);
        var n = o.next;
        n = skipSentenceQueue(n);
        var tf = scanner2(`try{}finally{if(${iname}&&!${iname}["done"]&&isFunction(${gname}["return"]))${gname}["return"]()}`);
        splice(tf[1], 0, 0, ...splice2(r.queue, r, n, ...tf));
        rootenvs.isFunction = true;
    }
};
var unarrow = function (body, i, killobj, letname_) {
    var o = body[i];
    var p = o.prev;
    var n = o.next;
    var b = n, h = p;
    var pi = body.lastIndexOf(p, i);
    if (pi < 0) pi = 0;
    splice(body, i, 1);
    splice(body, pi, 0, { type: STRAP, text: 'function' });
    var ni = body.indexOf(n, i);
    if (ni < 0) ni = body.length;
    if (p && p.type !== SCOPED || p.entry !== "(") {
        h = scanner2("()")[0];
        splice(h, 0, 0, ...splice(body, i, 1, h));
    }
    if (n.type !== SCOPED || !n.brace) {
        var nni = skipAssignment(body, ni);
        b = scanner2('{}')[0];
        splice(b, 0, 0, { type: STRAP, transive: true, text: "return" }, ...splice(body, ni, nni - ni, b));
        killarg(h, b, letname_);
        killobj(b);
        ni = nni;
    }
    else nni = ni + 1;
    return nni;
};
var getname = function (vars, envs, k) {
    var extra = this instanceof Array ? this : null;
    a: if (!(k in vars) && !(k in envs)) {
        if (extra) for (var e of extra) {
            if (k in e) break a;
        }
        return vars[k] = true, k;
    }
    var inc = /\d+$/.exec(k);
    if (inc) k = k.slice(0, k.length - inc[0].length), inc = 1 + +inc[0];
    else inc = 0;
    loop: while (true) {
        var k0 = k + inc;
        if (k0 in vars || k0 in envs) {
            inc++;
            continue;
        }
        if (extra) for (var e of extra) {
            if (k0 in e) {
                inc++;
                continue loop;
            }
        }

        break;
    }
    vars[k + inc] = true;
    return k + inc;
};
var killarg = function (head, body, _getname, setarg = true) {
    var argcodes = [];
    var o = head.first;
    var index = 0;
    var collect = 0, cname, anames = [];
    var namemap = Object.create(null);
    while (o) {
        var aname = null;
        var is3darg = false;
        var a = o;
        if (o.type === STAMP && o.text === '...') {
            o = o.next;
            is3darg = true;
        }
        if (o.type === SCOPED) {
            aname = _getname(head.length > 1 ? 'arg' + index : 'arg');
            var dec = splice2(head, o, o = o.next, { type: EXPRESS, text: aname });
            dec = `${createString(dec)}=${aname}`;
            if (/^var\s/.test(argcodes[argcodes.length - 1])) argcodes[argcodes.length - 1] += ',' + dec;
            else argcodes.push(`var ` + dec);
        }
        else if (o.type & (EXPRESS | VALUE)) {
            if (!is3darg) is3darg = is3dots(o);
            aname = o.text;
            if (is3darg) {
                cname = aname.replace(/^\.\.\./, '');
                splice2(head, a.prev || a, o = skipAssignment(o));
                collect = index + 1;
            }
            else {
                o = o.next;
                if (collect) {
                    anames.push(aname);
                }
                index++;
            }
        }
        else if (is3darg) {
            splice2(head, a.prev || a, o = skipAssignment(o));
            aname = '...';
            cname = '';
            collect = index + 1;
        }
        else throw new Error(i18n`参数声明异常！`);
        if (o && o.type === STAMP) {
            if (o.text === ',') {
                o = o.next; continue;
            }
            var start = o;
            while (o && (o.type !== STAMP || o.text !== ',')) o = o.next;
            var assign = splice2(head, start, o);
            argcodes.push(`if(${aname}===undefined)${aname}${createString(assign)}`);
            if (o) o = o.next;
        }
        namemap[aname] = true;
    }
    if (collect > 0) {
        collect--;
        argcodes.unshift.apply(argcodes, anames.map((a, i) => {
            if (a === cname) cname = '';
            var n = anames.length - i;
            return `${a}=arguments["length"]>${collect + n - 1}?arguments[arguments["length"] - ${n}]:undefined`;
        }));

        if (cname) argcodes.unshift(`var ${cname}=slice_["call"](arguments,${collect}${index > collect ? `,${collect - index}` : ""})`), rootenvs.slice_ = true;
    }
    if (argcodes.length && setarg) {
        if (!body) {
            var next = head.next;
            if (next.type === STAMP && /^=>$/.test(next.text)) next = next.next;
            var end = skipAssignment(next);
            var body = scanner2(`{${argcodes.join(";")};return}`)[0];
            while (next !== end) {
                body.push(next);
                next = next.next;
            };
            relink(body);
            var hq = head.queue;
            var i = hq.indexOf(head.next);
            var j = end ? hq.indexOf(end) : hq.length;
            splice(hq, i + 1, j - i, body);
        }
        else body.unshift(...scanner2(argcodes.join(";") + ";")), relink(body);
    }
    return [namemap, argcodes];
};
var revar = function (body) {
    for (var i = 0; i < body.length; i++) {
        var o = body[i];

        if (o.type === STRAP) {
            if (/^(const|let|var)$/.test(o.text)) {
                var q = body;
                if (!q) return;
                splice(q, i, 1)
                o = o.next;
                var s = i, n = o;
                if (o) do {
                    n = snapExpressFoot(n).next;
                    if (n && n.type === STRAP && /^(in|of)$/.test(n.text)) break;
                    if (n && n.text === '=') {
                        n = skipAssignment(n);
                    }
                    else {
                        i = q.indexOf(n, i);
                        var j = n ? q.indexOf(n, i) + 1 : q.length;
                        splice(q, i, j - i);
                    }
                } while (n && n.type === STAMP && n.text === ',');
                i = s - 1;
            }
            else if (/^function$/.test(o.text)) {
                o = skipFunction(o);
                i = indexof(body, o, i);
            }
        }
        else if (o.length) {
            revar(o);
        }
    }
};
var killret = function (body, labels = Object.create(null), gettmpname) {
    var o = body.first;
    var breakmap = {};
    var breakIndex = 4;
    var tmpname = null;
    var gettmp = function () {
        if (tmpname) return tmpname;
        return tmpname = gettmpname();
    }
    var lbls = [];
    while (o) {
        var unlabel = false;
        if (o.type === LABEL) {
            var lbl = o.text.slice(0, o.text.length - 1);
            if (!labels[lbl]) {
                labels[lbl] = true;
                lbls.push(lbl);
            }
        }
        else if (o.type === SCOPED && o.brace) {
            if (o.isClass || o.isObject);
            else killret(o, labels, gettmpname);
            unlabel = true;
        }
        else if (o.type === STAMP && o.text === ';') {
            unlabel = true;
        }
        if (unlabel) {
            for (var lbl of lbls) delete labels[lbl];
            lbls = [];
        }
        if (o.type === STAMP && o.text === "=>") {
            o = skipFunction(o);
            continue;
        }
        if (o.type !== STRAP) {
            o = o.next;
            continue;
        }
        switch (o.text) {
            case "async":
            case "class":
            case "function":
                o = skipFunction(o);
                continue;
            case "return":
                if (o.next && !o.isend) insert1(body, o.next, ...scanner2(`${gettmp(1, o.next)}=1,`));
                else insert1(body, o.next, ...scanner2(`${gettmp()}=1,void 0`)), o.isend = false;
                breakmap[o.text] = 1;
                break;
            case "break":
            case "continue":
                if (o.next && !o.isend) {
                    var lbl = o.next.text;
                    if (labels[lbl]) break;
                    var k = `${o.text} ${lbl}`;
                    var v = breakmap[k] || breakIndex++;
                    breakmap[k] = [v, o.text, o.next];
                    splice2(body, o.next, o.next.next, ...scanner2(`${gettmp()}=${v}`));
                }
                else {
                    if (labels[o.text]) break;
                    var v = breakmap[o.text] = o.text === 'break' ? 2 : 3;
                    insert1(body, o.next, ...scanner2(`${gettmp()}=${v}`));
                    o.isend = false;
                }
                o.text = 'return';
                break;
            case "for":
            case "do":
            case "while":
                if (!labels.continue) {
                    lbls.push('continue');
                    labels.continue = true;
                }
            case "switch":
                if (!labels.break) {
                    labels.break = true;
                    lbls.push('break');
                }
                break;
        }
        o = o.next;
    }
    return breakmap;
}
var puncLeft = function (o) {
    var s = snapExpressHead(o.prev);
    var p = Infinity;
    while (o && o.prev) {
        if (o.type !== STAMP || !(o.text in powermap) || powermap[o.text] < p) return s;
        s = snapExpressHead(o.prev);
        o = s.prev;
    }
    return s;
}
var puncRight = function (o) {
    var s = snapExpressFoot(o.next);
    var p = 0;
    while (o && o.next) {
        if (o.type !== STAMP || !(o.text in powermap) || powermap[o.text] <= p) return s;
        s = snapExpressFoot(o.next);
        o = s.next;
    }
    return s;
}


var newpunc = function (body, i, newname) {
    var o = body[i];
    var t = o.text;
    if (t.length === 3 && /^(\?\?|\*\*|&&|\|\|)=$/.test(t)) {
        i++;
        var punc = t.slice(0, 2);
        o.text = '=';
        var f = skipAssignment(body, i);
        var sentence = splice(body, i, f - i);
        for (var s of sentence) {
            if (s.type === STAMP && /[^!=]=$/.test(s.text)) {
                var temp = scanner2(`()`)
                splice(temp[0], 0, 0, ...sentence);
                sentence = temp;
                break;
            }
        }
        var h = snapExpressHead(o.prev);
        if (!h) return;
        var rt = h.type === EXPRESS && h.text;
        var p = o.prev;
        var done = false;
        var hi = body.lastIndexOf(h, i);
        var pp = p?.prev;
        if (h === p) {
            if (h.type === EXPRESS && !/\.[\s\S]*\./.test(rt) && !/\[[^\]]*\]\[[^\]]*\]/.test(rt)) {
                splice(sentence, 0, 0, ...scanner2(rt + punc));
                hi = i;
                done = true;
            }
        }
        else if (h === pp) {
            if (p.type === SCOPED && p.entry === "[" && !/[\.\[]/.test(rt)) {
                if (canbeTemp(p)) {
                    var name = p.first.text;
                }
                else {
                    var name = newname();
                    splice(p, 0, 0, ...scanner2(`${name}=`));
                }
                splice(sentence, 0, 0, ...scanner2(`${rt}[${name}]` + punc));
                hi = i;
                done = true;
            }
        }
        else if (h === pp.prev) {
            var ppp = pp.prev;
            if (pp.text === '.' && p.type === EXPRESS && ppp.type === EXPRESS && !/[\.\[]/.test(p.text) && !/[\.\[]/.test(ppp.text)) {
                splice(sentence, 0, 0, ...scanner2(`${ppp.text}.${pp.text}+${punc}`));
                hi = i;
                done = true;
            }
        }
        if (!done) {
            var n = null;
            var name = newname();
            var pt = p.type === EXPRESS && p.text;
            var hp = h.prev;
            splice(body, i -= 1, 1);
            if (p.type === EXPRESS && (n = /^(?:[\s\S]*[^\.])?(\.[^\.]*|\[[^\]]*\])$/.exec(pt))) {
                var n = n[1];
                p.text = pt.slice(0, pt.length - n.length);
                splice(sentence, 0, 0, ...scanner2(`,${name}${n}=${name}${n}${punc}`));
            }
            else if (p.type === SCOPED && p.entry === '[') {
                if (canbeTemp(p)) {
                    var name2 = p.first.text;
                }
                else {
                    var name2 = newname();
                    splice(p, 0, 0, ...scanner2(`${name2}=`));
                }
                splice(body, i -= 1, 1);
                splice(sentence, 0, 0, ...scanner2(`,${name}`), p, ...scanner2(`=${name}[${name2}]${punc}`));
                p = p.prev;
            }
            else {
                var n = p.text.replace(/^\./, '');
                var pp = p.prev;
                if (n === p.text) {
                    if (pp.text === '.') pp = pp.prev, splice(body, i -= 2, 2);
                    else if (pp.type & EXPRESS) pp.text = pp.text.replace(/\.$/, ''), splice(body, i -= 1, 1);
                }
                splice(sentence, 0, 0, ...scanner2(`,${name}.${n}=${name}.${n}${punc}`));
            }
            splice(sentence, 0, 0, ...scanner2(`${name}=`), ...splice(body, hi, i));
            if (!isEval(body) || hp && hp.type === STAMP && /[=>]$/.test(hp.text)) {
                var temp = scanner2(`()`)
                splice(temp[0], 0, 0, ...sentence);
                sentence = temp;
            }
        }
        splice(body, hi, 0, ...sentence);
        hi--;
    }
    else {
        hi = i;
        if (/^(\?\?|\*\*)$/.test(t)) {
            var l = puncLeft(o);
            var r = puncRight(o);
            var li = body.lastIndexOf(l, i);
            var ri = body.indexOf(r, i);
            var name = t === '??' ? 'nullish_' : "power_";
            name = patchMark + name;
            rootenvs[name] = true;
            o.text = ',';
            sentence = scanner2(`${name}()`)
            splice(sentence[1], 0, 0, ...splice(body, li, 1 + ri - li));
            splice(body, li, 0, ...sentence);
            hi = li;
        }
    }
    return hi;
}

var down = function (scoped) {
    var inAsync = scoped.async;
    var inAster = scoped.yield;
    var funcMark = [, "aster_", "async_", "asyncAster_"][inAsync << 1 | inAster];
    if (funcMark) funcMark = patchMark + funcMark;
    if (funcMark) rootenvs[funcMark] = true;
    var vars = Object.assign(Object.create(null), scoped.vars);
    var envs = Object.assign(Object.create(null), scoped.envs);
    var objnames = [];

    var _getname = getname.bind(null, vars, envs);
    var _letname = getname.bind(null, envs, vars);
    var gettmpname = function (i = 0) {
        if (!objnames[i]) objnames[i] = _getname("_");
        return objnames[i];
    };
    var letnames = [];
    var getletname = function (i = 0) {
        if (!letnames[i]) letnames[i] = _letname("_");
        return letnames[i];
    };
    // let 转 var
    var killlet = function (scoped) {
        if (!scoped.lets || scoped.isfunc) return;
        for (var k in scoped.lets) {
            var nk = _letname(k);
            if (nk !== k) {
                delete scoped.lets[k];
                scoped.lets[nk] = true;
                rename(scoped.used, k, nk);
            }
        }
        var lets = Object.keys(scoped.lets);
        var hasChildFunc = false;
        var checkScope = function (s) {
            if (s.length) {
                for (var c of s) {
                    if (hasChildFunc) return;
                    checkScope(c);
                }
            }
            if (!s.isfunc) return;
            var sused = s.used;
            for (var k of lets) {
                if (k in sused) {
                    hasChildFunc = true;
                    break;
                }
            }
        };
        checkScope(scoped);
        if (!hasChildFunc) return;
        var tmp0 = _getname("tmp");
        var tmp1 = null;
        var wrapper = scanner2(`(${inAsync ? 'async ' : ''}function${inAster ? "*" : ''}(${lets}){}(${lets}))`)[0];
        var body = scoped.body;
        if (!body) {
            var btemp = scoped.head.next;
            if (!btemp) throw i18n`语句不完整`;
            var btmp2 = skipSentenceQueue(btemp);
            body = scoped.body = scanner2('{}')[0];
            splice(body, 0, 0, ...splice2(btemp.queue, btemp, btmp2, body));
        }
        if (body.isClass) return;
        var bp = body.prev;
        var bn = body.next;
        var bq = body.queue;
        var bpp = bp && bp.prev;
        var isswitch = bp && bp.type === SCOPED && bp.entry === '(' && bpp && bpp.type === STRAP && bpp.text === 'switch';
        var wbody = wrapper[wrapper.length - 2];
        for (var k of lets) vars[k] = true, delete envs[k];
        backEach(body, function (o, i) {
            if (o.type === STRAP && /^(const|let|var)$/.test(o.text)) splice(body, i, 1);
        });
        if (isswitch) splice(wbody, 0, 0, bpp, bp, body);
        else splice(wrapper, wrapper.length - 2, 1, body), wbody = body;
        var retmap = killret(wbody, scoped.lets, function () {
            if (!tmp0) tmp0 = _getname("tmp");
            return tmp0;
        });
        var hasret = false;
        for (var k in retmap) {
            hasret = true;
            break;
        }
        var pre = [];
        var fix = [];
        if (hasret) {
            pre.push({ text: 'if', type: STRAP });
            fix = scanner2('{}');
            var fix0 = fix[0];
            for (var k in retmap) {
                var v = retmap[k];
                if (v === 1) {
                    if (!tmp1) tmp1 = _getname('tmp');
                    fix0.push(...scanner2(`if(${tmp0}===${v}) return ${tmp1}`), { text: ';', type: STAMP });
                }
                else if (v === 2 || v === 3) {
                    fix0.push(...scanner2(`if(${tmp0}===${v}) ${k}`), { text: ';', type: STAMP });
                }
                else {
                    fix0.push(...scanner2(`if(${tmp0}===${v[0]}) ${v[1]}`), v[2], { text: ';', type: STAMP });
                }
            }
            wrapper.unshift(...scanner2(`${tmp0}=0,${tmp1 ? tmp1 + '=' : ''}`));
        }
        if (!pre.length && bn && !(bn.type === STAMP && /^[,;]/.test(bn.text))) fix.push({ type: SPACE, text: ';' });
        if (isswitch) {
            splice2(bq, bpp, bn, ...pre, wrapper, ...fix);
        }
        else if (body.entry === '{' && (!bp || !bpp && (bp.type !== STRAP || !/^(do|try)$/.test(bp.text)) || bp.type === SCOPED && bp.entry === '(' && bpp && bpp.type === STRAP || bp.type === LABEL)) {
            splice2(bq, body, bn, ...pre, wrapper, ...fix);
        }
        else {
            var wrap = scanner2('{}')[0];
            splice(wrap, 0, 0, wrapper);
            splice2(bq, body, bn, wrap);
        }
    };
    var precode = function (text) {
        if (!scoped.body) return;
        var codelist = typeof text === 'string' ? scanner2(text) : text;
        var first = codelist[0];
        var last = codelist[codelist.length - 1];
        var top = scoped.first;
        if (top) top.prev = last;
        if (last) last.next = top;
        if (first) delete first.prev;
        scoped.body.first = first || top;
        scoped.body.unshift.apply(scoped.body, codelist);
    };

    var markcodes = [];
    if (scoped.isfunc && scoped.caps.this && (funcMark && !scoped.isArrow || scoped.insett)) {
        let tn = _getname("this_");
        rename(scoped.caps, "this", tn);
        scoped.caps.this.forEach(o => o.origin = 'this');
        markcodes.push(`${tn}=this`);
    }
    if (scoped.isfunc && scoped.caps.arguments && (funcMark && !scoped.isArrow || scoped.inseta)) {
        let an = _getname("arguments_");
        scoped.caps.arguments.forEach(o => o.origin = 'arguments');
        rename(scoped.caps, "arguments", an);
        markcodes.push(`${an}=arguments`);
    }
    var fordeep = 0;
    var _killobj = function (_getlocal, o) {
        return killobj(o, gettmpname, getletname, _getlocal, _letname);
    };
    var kill = function (scoped, _, parentScope) {
        if (scoped.isfunc) return down(scoped);
        killlet(scoped);
        var saveddeep = fordeep;
        var _getlocal = getname.bind([scoped.lets, scoped.envs], vars, envs);
        var getdeepname = function () {
            return gettmpname(--fordeep);
        };
        var killed = false;
        a: if (scoped.head) {
            var hp = scoped.head.prev;
            if (hp && hp.type === STRAP) {
                if (hp && hp.type === STRAP && hp.text === 'await') hp = hp.prev;
                if (!hp) break a;
                if (hp.text === 'for') {
                    unforof(hp, getdeepname, scoped.used, _killobj.bind(null, _getlocal));
                    if (funcMark) killed = unforin(scoped.head, getdeepname, _killobj.bind(null, _getlocal)) !== false;
                    // unforcx(scoped.head, getdeepname);
                }
                else if (hp.text === 'catch') {
                    killarg(scoped.head, scoped.body, _letname);
                    break a;
                }
            }
            if (!killed) _killobj(_getlocal, scoped.head);
        }
        if (!killed && scoped.body) _killobj(_getlocal, scoped.body);
        if (scoped.length) scoped.forEach(kill);
        fordeep = saveddeep;
    };
    if (scoped.isfunc) {
        if (!scoped.body && scoped.head?.next?.brace) scoped.body = scoped.head.next;
        if (scoped.head) var [argsmap, argcodes] = killarg(scoped.head, scoped.body, _letname, false);
        else argcodes = [];
        if ((markcodes.length || argcodes.length) && !funcMark) precode(markcodes.concat(argcodes).join(";") + ";");
        if (scoped.body) scoped.body.keeplet = false, _killobj(_getname, scoped.body);
        scoped.forEach(kill);
        var requeue = null, requeuei = -1, requeuee = -1;
        if (!scoped.body && scoped.arraw) {
            requeue = scoped.arraw.queue;
            requeuei = requeue.indexOf(scoped.arraw);
            scoped.body = pickAssignment(scoped.arraw);
            requeuee = requeue.indexOf(scoped.body[scoped.body.length - 1], requeuei) + 1;
        }
        if (funcMark) {
            var argname = _letname("_");
            unstruct.debug = downLevel.debug;
            var body = scanner2(`return ${funcMark}()`);
            var body3 = body[body.length - 1];
            var code = unawait(scoped.body, _getname, argname);
            code.forEach(function (c) {
                revar(c);
                var f = scanner2(`function(${c.awaited ? argname : ''}){\r\n}`);
                if (!c.length) f[2].push(...scanner2('return [1,0]'));
                else f[2].push(...c);
                f[2].push({ type: SPACE, text: "\r\n" });
                if (body3.length) body3.push({ type: STAMP, text: "," });
                body3.push({ type: SPACE, text: '\r\n' }, ...f);
            });
            splice(scoped.body, 0, scoped.body.length);
            if (markcodes.length || argcodes.length) {
                argcodes = scanner2(markcodes.concat(argcodes).join(';') + ";\r\n");
                _killobj(_getname, argcodes);
                splice(scoped.body, 0, 0, ...argcodes);
            }
            splice(scoped.body, scoped.body.length, 0, ...body);
            for (var k in envs) if (!(k in scoped.envs)) vars[k] = true;
            delete vars[argname];
            scoped.vars = Object.create(null);
            scoped.async = false;
            scoped.yield = false;
        }
        var vars1 = Object.keys(vars).filter(k => !(k in scoped.vars));
        scoped.vars = vars;
        if (argsmap) vars1 = vars1.filter(k => !(k in argsmap));
        if (vars1.length && scoped.body) scoped.body.push(...scanner2(`\r\nvar ${vars1}`));
        if (scoped.body) relink(scoped.body);

        if (requeuei >= 0) splice(requeue, requeuei, requeuee - requeuei, ...scoped.body);
    }
    else {
        kill(scoped);
    }
};
/**
 * @param {Program} code
 */
function downLevel(data) {
    var code = scanner2(data);
    code = downcode(code);
    return code.toString();
}
var patchMark = '';
var downcode = downLevel.code = function (code) {
    rootenvs = code.envs;
    rootHyper = rootenvs.Symbol || code.yield || code.async;
    var patchMark_ = patchMark;
    if (code.patchMark) patchMark = code.patchMark;
    down(code.scoped);
    code.keepcolor = false;
    if (rootenvs.slice_) {
        delete rootenvs.slice_;
        if (!code.vars.slice_) splice(code, 0, 0, ...scanner2('var slice_ = Array["prototype"]["slice"];\r\n'));
    }
    rootenvs = null;
    patchMark = patchMark_;
    return code;
};
module.exports = downLevel;