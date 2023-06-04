var scanner2 = require("./scanner2");
var strings = require("../basic/strings");
var Program = scanner2.Program;
var { STAMP, SCOPED, STRAP, EXPRESS, COMMENT, SPACE, PROPERTY, VALUE, LABEL, QUOTED, rename, getDeclared, skipAssignment, createScoped, createString, relink, skipSentenceQueue } = require("./common");
var link = function (a, b) {
    if (a) a.next = b;
    if (b) b.prev = a;
};
var splice1 = function (q, from, to, ...a) {
    var index1 = from ? q.indexOf(from) : q.length;
    var index2 = to ? q.indexOf(to) : q.length;
    if (index1 > index2) index2 = index1;
    if (a.length) {
        link(q[index1 - 1], a[0]);
        link(a[a.length - 1], q[index2]);
    }
    else if (index1 !== index2) {
        link(q[index1 - 1], q[index2]);
    }
    var res = q.splice(index1, index2 - index1, ...a);
    if (res[0]) delete res[0].prev, res.first = res[0];
    if (res[res.length - 1]) delete res[res.length - 1].next;
    q.first = q.find(o => o.type !== COMMENT && o.type !== SPACE);
    return res;
};
var insert1 = function (q, r, ...a) {
    splice1(q, r, r, ...a);
};
// 解构赋值
var killdec = function (queue, i, getobjname, _var = 'var', killobj) {
    var tmpname = '';
    var index = 0;
    var deep = 0;
    var dec = function (d, x) {
        var previx = tmpname;
        var [k, v] = d;
        var dp = 0;
        if (typeof k === 'number' && k < 0) {
            dp = 1;
            k = `${tmpname}.length>${doged - k - 1}?${tmpname}[${tmpname}.length - ${-k}]:undefined`;
        } else {
            k = tmpname + k;
        }
        if (v.attributes) {
            tmpname = k;
            if (d.length === 2) {
                if (dp) {
                    deep += dp;
                    var n = getobjname(deep);
                    write(n, k);
                    k = tmpname = n;
                }
                dog(v);
                deep -= dp;
            }
            else {
                deep++;
                var n = getobjname(deep);
                write(n, `${tmpname}!==undefined?${tmpname}:`);
                var skiped = splice1(d[2], d[3], d[4]);
                killobj(skiped);
                queue.splice(i, 0, ...skiped);
                i += skiped.length;
                k = tmpname = n;
                dog(v);
                deep--;
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
            write(v, `${k}!==undefined?${k}:`, x < total - 1);
            var skiped = splice1(d[2], d[3], d[4]);
            killobj(skiped);
            queue.splice(i, 0, ...skiped);
            i += skiped.length;
        }
        index++;
    };
    var doged, total;
    var write = function (name, value, hasnext) {
        if (name === tmpname && hasnext) {
            tmpname = getobjname(deep++);
            if (index > 0) queue.splice(i++, 0, { type: STAMP, text: ',' });
            var q = scanner2(`${tmpname}=${name}`);
            queue.splice(i, 0, ...q);
            i += q.length;
            index++;
        }
        if (index > 0) queue.splice(i++, 0, { type: STAMP, text: ',' });
        queue.splice(i++, 0, { type: EXPRESS, text: name });
        if (value) {
            var q = scanner2("=" + value);
            queue.splice(i, 0, ...q);
            i += q.length;
        }
        index++;
    };
    var dog = function (d) {
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
            write(name, `rest_(${tmpname},[${Object.keys(map)}])`, false);
        }
        else {
            doged = at + 1;
            head.forEach(dec);
            write(name, `Array.prototype.slice.call(${tmpname},${at}${a > at ? `,${at - a}` : ''})`, rest.length > 0);
            doged = at + 1;
            total = rest.length;
            rest.forEach(dec);
        }
        doged = _d;
        total = _t;
    };
    var single = function (d, p) {
        if (d.attributes.length !== 1 || d["..."]) return;
        var [k, v] = d.attributes[0];
        p += k;
        if (!v.attributes) return [p, v];
        return single(v, p);
    };
    if (_var && i < queue.length) queue.splice(i++, 0, { type: STRAP, text: _var });
    loop: while (i < queue.length) {
        var o = queue[i];
        var next = o.next;
        tmpname = '';
        if (!next || next.type !== STAMP || next.text !== '=') {
            // 只声明不赋值的语句
            var hasnext = next && next.type === STAMP && next.text === ',';
            if (hasnext) next = next.next;
            var n = indexof(queue, next, i);
            if (o.type === SCOPED) {
                var [o0] = queue.splice(i, n - i);
                var [[d]] = getDeclared(o0);
                dog(d);
                n = i = indexof(queue, next, i);
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
            var next = o.next;
            if (!next || next.type !== STAMP || next.text !== "=") {
                // 赋值结束
                if (tmpname) {
                    var n = skipAssignment(queue, i);
                    o = queue[n];
                    var skiped = queue.splice(i, n - i);
                    killobj(skiped);
                    queue.splice(i, 0, ...skiped);
                    i += skiped.length;
                    break;
                }
                if (!next || next.type === STAMP && /^[,;]$/.test(next.text)) {
                    if (o.type === EXPRESS && !/\./.test(o.text)) {
                        tmpname = o.text;
                        queue.splice(i, indexof(queue, o = next && next.text === ',' ? next.next : next, i) - i);
                        i = indexof(queue, o, i);
                    }
                }
                break;
            }
            if (o.type === SCOPED) {
                var n = indexof(queue, next.next, i);
                var [o0] = queue.splice(i, n - i);
                delete o0.next;
                if (o0.length && getDeclared(o0).length > 0) objs.push(o0);
            }
            else if (o.type === EXPRESS && !/\.\[/.test(o.text)) {
                if (!tmpname) tmpname = o.text, index++;
            }
            o = next.next;
            i = indexof(queue, o, i);
        } while (o);
        if (!tmpname) {
            if (objs.length === 1) {
                var [[d]] = getDeclared(objs[0]);
                var a = single(d, '');
                if (a) {
                    queue.splice(i, 0, { type: EXPRESS, text: a[1] }, { type: STAMP, text: "=" });
                    i += 2;
                    i = skipAssignment(queue, i);
                    var q = scanner2(a[0])
                    queue.splice(i, 0, ...q);
                    i += q.length;
                    index++;
                    continue;
                }
            }
            tmpname = getobjname();
            queue.splice(i, 0, { type: EXPRESS, text: tmpname }, { type: STAMP, text: "=" });
            i += 2;
            i = skipAssignment(queue, i);
            index++;
        }
        for (var o0 of objs) {
            var [[d]] = getDeclared(o0);
            dog(d);
        }
    }
    relink(queue);
    return i;
};
// 键值对重组
var killmap = function (body, i, _getobjname, killobj) {
    var o = body[i];
    if (!o.length) return indexof(body, o.next, i);
    var m = o.first;
    var s = m;
    loop: while (m) {
        if (m.type === EXPRESS) break;
        s = m;
        while (m && (m.type === STRAP || m.type === STAMP)) m = m.next;
        if (!m || m.isprop && (m.type === SCOPED || m.type === PROPERTY && /\[/.test(m.text) || m.short || m.next && m.next.type === SCOPED)) {
            break;
        }
        m = m.next;
        if (!m) break;
        if (m && m.type === STAMP && m.text === ':') m = m.next;
        if (!m) break;
        var n = skipAssignment(m);
        while (m !== n) {
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
                    m = skipAssignment(m);
                    continue;
                }
                killobj(m);
                if (m.await_) break loop;
            }
            m = m.next;
        }
    }
    if (!m) return indexof(body, o.next, i);
    m = s;
    if (m.prev && m.prev.type === STAMP && m.prev.text === ',') {
        splice1(body, m.prev, m);
    }
    var q;
    var next = o.next;
    var l = 1;
    var initq = function () {
        q = scanner2(`(${_getobjname()}=)`)[0];
        var qo = body.splice(i, l, q);
        insert1(q, null, ...qo);
        insert1(q, null, { type: STAMP, text: ',' });
    }
    var define_ = Object.create(null);
    var t;
    while (m) {
        if (m.type === EXPRESS) {
            var s = m;
            m = skipAssignment(m);
            if (/^\.\.\./.test(s.text)) {
                s.text = s.text.replace(/^\.\.\./, '');
                if (q) {
                    t = scanner2(`extend(${_getobjname()},)`);
                    rootenvs.extend = true;
                    insert1(q, null, ...t);
                }
                else {
                    if (!t) {
                        t = scanner2(`extend()`);
                        rootenvs.extend = true;
                        var [o0] = body.splice(i, 1, ...t);
                        t[1].push(o0);
                        l = 2;
                    }
                    insert1(t[1], null, { type: STAMP, text: "," });
                }
                var e = splice1(o, s, m);
                insert1(t[1], null, ...e);
                if (q) {
                    if (m) {
                        e = splice1(body, m, m = m.next);
                        killobj(e);
                        insert1(q, null, ...e);
                    }
                }
                if (m && m.type === STAMP && m.text === ',') splice1(o, m, m = m.next);
            }
            continue;
        }
        if (!q) initq();
        var [prop, m] = getprop(o, m);
        if (!prop.value.length) insert1(prop.value, null, { type: EXPRESS, text: prop.name })
        else if (prop.sfunc === false) killobj(prop.value);
        setprop(prop, _getobjname(), define_, q);
    }

    if (q) {
        relink(q);
        var qe = q.last;
        if (qe.type !== STAMP || qe.text !== ',') q.push({ type: STAMP, text: ',' });
        q.push(...scanner2(_getobjname()));
        relink(q);
    }
    return indexof(body, next, i);
};
var getprop = function (o, m) {
    var prop = {};
    var s = m;
    while (m && (m.type === STRAP || m.type === STAMP)) {
        prop[m.text] = true;
        m = m.next;
    }
    if (m && (m.type === PROPERTY || m.isprop)) {
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
        if (m && /[\=\:]/.test(m.text)) m = m.next;
    }
    splice1(o, s, m);
    var s = m;
    if (m && prop.sfunc !== false && m.type === SCOPED && m.entry === '(') {
        m = m.next;
        if (m && m.type === SCOPED && m.entry === "{") m = m.next;
    }
    else m = skipAssignment(m);
    if (m && !m.isprop) m = m.next;
    if (!prop.short) prop.value = splice1(o, s, m);
    else splice1(o, s, m);
    return [prop, m];
};
var setprop = function (prop, k, d, q) {
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
            let tmp = scanner2(`\r\nObject.defineProperty(${k},${prop.name},{})`);
            insert1(q, null, ...tmp);
            if (pe) insert1(q, null, pe);
            d[prop.name] = tmp[tmp.length - 1][4];
        }
        if (d[prop.name].length) insert1(d[prop.name], null, { type: STAMP, text: ',' });
        insert1(d[prop.name], null, { type: PROPERTY, text: prop.get ? "get" : "set" });
        insert1(d[prop.name], null, { type: STAMP, text: ":" });
        if (pv && pv.length) insert1(d[prop.name], null, ...pv);
    }
    else {
        insert1(q, null, ...scanner2(`${q && q.length ? "\r\n" : ''}${k}${prop.name}=`));
        insert1(q, null, ...prop.value);
    }
}
var rootenvs = null, rootHyper;
var killcls = function (body, i, getname_) {
    var extends_ = [];
    var o = body[i];
    var start = o;
    var decName = !o.isExpress && o.next.type === EXPRESS && o.next.text;
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
    var func = scanner2("function(){}()");
    var [, head, defines, invokes] = func;
    var foot = [];
    var base = '';
    if (o) {
        var next = o;
        while (next && !next.isClass) next = next.next;
        base = createString(splice1(body, o, o = next));
    }
    if (base === 'Array') base = 'Array2', rootenvs.Array2 = true;
    var index = 0;
    while (o && o.isClass) {
        var scoped = o.scoped;
        var m = o.first;
        var name = extends_.pop();
        if (!name && (base || extends_.length)) name = getname_('class' + index);
        var assign = [];
        var constructor = scanner2('(){}');
        var define_ = Object.create(null);
        var static_ = Object.create(null);
        var clz = { name };
        while (m) {
            var [prop, m] = getprop(o, m);
            if (!prop.value.length) prop.value = scanner2('undefined;');
            var k = prop.static ? clz.name : `${clz.name}.prototype`;
            var d = prop.static ? static_ : define_;
            if (prop.get || prop.set || prop.static) {
                setprop(prop, k, d, defines);
            }
            else if (/^(?:\.constructor|\[(['"`])constructor\1\])$/.test(prop.name)) {
                constructor = prop.value;
            }
            else if (prop.sfunc !== false) {
                setprop(prop, k, d, defines);
            }
            else {
                insert1(assign, null, ...scanner2(`this${prop.name}=`));
                insert1(assign, null, ...prop.value);
            }
        }
        if (invokes.length) insert1(invokes, null, { type: STAMP, text: ',' });
        insert1(invokes, null, ...scanner2('function ' + name));
        constructor[1].unshift(...assign);
        if (base) {
            constructor[1].push(...scanner2('return this'))
            relink(constructor[1]);
            var cs = createScoped(constructor[1]);
            var newt = getname(cs.vars, cs.envs, 'this_');
            if (cs.used.this) rename(cs.used, 'this', newt);
            var inited = false;
            if (cs.used.super) {
                cs.used.super.forEach(o => {
                    if (o.text !== 'super') return;
                    var n = o.next;
                    if (!n || n.type !== SCOPED || n.entry !== "(") return;
                    o.text = base + '.call';
                    inited = true;
                    insert1(o.queue, o, ...scanner2(`var ${newt}=`));
                    n.unshift({ type: EXPRESS, text: 'this' });
                    insert1(o.queue, n.next, ...scanner2(`||this;`));
                })
            }
            if (scoped.used.super) {
                scoped.used.super.forEach(o => {
                    if (!/^super$/.test(o.text)) return;
                    o.text = `${base}.prototype` + o.replace(/^super/, '');
                    insert1(o.queue, o.next, ...scanner2('.bind(this)'));
                })
            }
            if (!inited) constructor[1].unshift(...scanner2(`\r\nvar ${newt}=${base}.apply(this,arguments)||this;\r\n`));
        }
        insert1(invokes, null, ...constructor);
        o = o.next;
        if (base) defines.unshift(...scanner2(`extends_(${clz.name},${base})${defines.length ? "\r\n" : ""}`)), rootenvs.extends_ = true;
        base = clz.name;
        if (clz.name) insert1(head, null, ...scanner2(`${head.length ? ',' : ''}${clz.name}`));
        index++;
    }
    insert1(defines, null, ...foot);
    if (head.length > 1 || start.isExpress) {
        insert1(defines, null, ...scanner2(`\r\nreturn ${clz.name}`))
        if (decName) insert1(func, func[0], ...scanner2(`var ${decName}=`));
        splice1(body, start, o, ...func);
    }
    else {
        splice1(body, start, o, ...invokes);
        if (defines.length) {
            insert1(body, o, { text: ';', type: STAMP });
            insert1(body, o, ...defines);
        }
        if (o) insert1(body, o, { type: SPACE, text: '\r\n' });
    }
    i = body.indexOf(o, i);
    if (i < 0) i = body.length;
    return i;
};
var prevInvoke = function (o) {
    while (o) {
        var prev = o.prev;
        if (!prev) break;
        if (o.type === EXPRESS) {
            if (prev.type === STRAP && /^(class|function|new|extends)$/.test(prev.text));
            else if (!/^\.|\[/.test(o.text) || /^\.\.\./.test(o.text)) break;
        }
        else if (o.type === VALUE || o.type === QUOTED) break;
        else if (prev.type === STAMP) {
            if (prev.text === '*') {
                if (prev.prev && prev.prev.type !== STRAP) break;
            }
            else if (prev.text !== "=>" || o.type !== SCOPED || o.entry !== '{') {
                break;
            }
        }
        else if (prev.type === STRAP) break;
        o = prev;
    }
    return o;
};
var indexof = function (list, o, i) {
    if (o) {
        i = list.indexOf(o, i);
        if (i < 0) i = list.length;
    }
    else i++;
    return i;
};
// 数组或参数展开
var killspr = function (body, i, _getobjname, setsolid, killobj) {
    var o = body[i];
    var m = o.first;
    if (!m) return i + 1;
    killobj(o);
    if (o.await_) body.await_ = true;
    var index = 0;
    var spr = function () {
        var s = m;
        s.text = s.text.replace(/^\.\.\./, '');
        m = skipAssignment(m);
        var q = scanner2(`Array.prototype.slice.call()`);
        var v = splice1(o, s, m);
        if (m) splice1(o, m, m = m.next);
        killobj(v);
        insert1(q[1], null, ...v);
        setsolid(q, q[0]);
        return q;
    };
    var killnext = function (m) {
        while (m && (m.type !== STAMP || m.text !== ',')) {
            m = m.next;
        }
        return m;
    }
    while (m) {
        if (m.type === EXPRESS && /^\.\.\./.test(m.text)) break;
        m = killnext(m);
        if (m) m = m.next;
        index++;
    }
    if (!m) return i + 1;
    var c = scanner2('.concat()');
    var next = o.next;
    if (o.entry === '(') {
        var r = prevInvoke(o);
        if (r === o);
        else if (r === o.prev && r.type === EXPRESS && !/\.[\s\S]*\./.test(r.text)) {
            var p = r;
            var n = /\./.test(p.text) && p.text.replace(/\.[^\.]*$/, '') || "null";
            insert1(o, o.first, ...scanner2(n + ","));
        }
        else {
            var p = o.prev;
            if (p.type === EXPRESS) {
                var n = p.text.replace(/^[\s\S]*?(\.[^\.]*)$/, "$1");
                p.text = p.text.replace(/\.[^\.]*$/, "");
                insert1(body, o, { type: EXPRESS, text: n });
            }
            else {
                // p = p.prev;
            }
            insert1(o, o.first, ...scanner2(`${_getobjname()},`));
            var h = scanner2(`(${_getobjname()}=)`);
            insert1(h[0], null, ...splice1(body, r, p));
            insert1(body, p, ...h);
            if (!p.text) {
                splice1(body, p, p.next);
            }
        }
        insert1(body, o, ...scanner2('.apply'));
        var m1 = skipAssignment(m);
        if (index > 0 || m1 && m1.next) {
            var h = splice1(o, o.first.next.next, null);
            var c = scanner2(`[]`);
            insert1(c[0], null, ...h);
            killobj(c);
            insert1(o, null, ...c);
            return indexof(body, next, i);
        };
        killnext(m);
        m.text = m.text.replace(/^\.\.\./, '');
        return indexof(body, next, i);
    }
    if (index > 0) {
        if (m) splice1(o, m.prev, m);
        insert1(body, next, ...c);
        insert1(c[1], null, ...spr());
    }
    else {
        splice1(body, o, next, ...spr());
        if (m) insert1(body, next, ...c);
    }
    var d;
    while (m) {
        if (m.type === EXPRESS && /^\.\.\./.test(m.text)) {
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
        insert1(d[0], null, ...splice1(o, s, m));
        if (m) splice1(o, m, m = m.next);
    }
    return indexof(body, next, i);
};

var killobj = function (body, getobjname, getletname, getname_, letname_, setsolid, deep = 0) {
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
        killobj(o, getobjname, getletname, getname_, letname_, setsolid, deep);
        if (o.await_) body.await_ = true;
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
                case "let":
                case "const":
                    islet = body.keeplet !== false;
                case "var":
                    body.splice(i, 1);
                    i = killdec(body, i, getletname, 'var', deepkill, islet);
                    break;
                case "class":
                    i = killcls(body, i, getname_);
                    break;
                case "function":
                    o = o.next;
                    if (o && o.type === STAMP) o = o.next;
                    if (o && o.type === EXPRESS) o = o.next;
                    if (o && o.type === SCOPED) o = o.next;// ()
                    if (o && o.type === SCOPED) o = o.next;// {}
                    i = body.indexOf(o, i);
                    if (i < 0) i = body.length;
                    break;
                case "async":
                    body.splice(i, 1);
                    break;
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
                    i = killmap(body, i, _getobjname, deepkill);
                    // i = indexof(body, o, i);
                    continue;
                }
            }
            else if (o.entry === '[') {
                if ((!o.prev || (o.prev.type & STAMP)) && o.next && o.next.type === STAMP && o.next.text === '=' || o.next && o.next.type === STRAP && /^(in|of)$/.test(o.next.type) && body.entry === '(' && body.prev && body.prev.type === STRAP && body.prev.text === 'for') {
                    i = killdec(body, i, _getdeepname, '', deepkill);
                }
                else {
                    i = killspr(body, i, _getobjname, setsolid, deepkill);
                }
                continue;
            }
            else if (o.entry === '(') {
                if (o.next && o.next.type === STAMP && o.next.text === '=>');
                else if (o.prev && o.prev.type === STRAP);
                else if (!o.prev || o.prev.type === STAMP || o.prev.type === STRAP) {
                    deepkill(o);
                }
                else {
                    i = killspr(body, i, _getobjname, setsolid, deepkill);
                    continue;
                }
            }
        }
        else if (o.type === STAMP) {
            if (o.text === "=>") {
                i = unarrow(body, i, deepkill, letname_);
                continue;
            }
        }
        i++;
    }
};

// 字面量 false|true|null|Infinity|NaN|undefined|arguments|this|eval|super
var power_map = {};
[
    '=,+=,-=,*=,/=,%=,|=,&=,^=,**=,~=',
    '=>', '?,:', '&&,||', '&,|,^',
    'instanceof,in,==,>=,<=,>,<,!=,!==,===,!in,!instanceof',
    '>>,>>>,<<', '+,-', '*,/,%', '**',
    'typeof,await,yield,!,~', '++,--'
].forEach((pp, i) => {
    pp.split(",").forEach(p => {
        power_map[p] = i + 1;
    })
});
var unawait = function (body, getname, argname) {
    return unstruct(body, function () {
        return getname("_");
    }, argname);
};
var getsync = function (m) {
    if (m.type === SCOPED && m.await_) return null;
    var n = skipAssignment(m);
    while (m !== n) {
        if (m.await_ || m.type === STRAP && /^(yield|await)$/.test(m.text)) return null;
        m = m.next;
    }
};
var ises3 = function (o) {
    if (o && o.type === SCOPED && o.entry === "{") {
        if (!o.await_) return false;
    }
    else while (o) {
        o = getsync(o);
        if (o === null) return true;
        if (!o || o.type !== STAMP || o.text !== ',') {
            break;
        }
        o = o.next;
    }
    return false;
}
var unforin = function (o, body, getnewname_) {
    // 仅处理有 await 或 yield 的代码
    if (!o.await_) {
        if (!ises3(o.next)) return;
    }
    var m = o.first;
    var hasdeclare = false;
    if (m.type === STRAP) {
        m = m.next;
        hasdeclare = true;
    }
    var n = m.next;
    if (n.type !== STRAP || n.text !== 'in') {
        return;
    }
    n = n.next;
    var tname = getnewname_();
    var sname = getnewname_();
    var kname = getnewname_();
    var s = scanner2(`${sname}=`);
    insert1(s, null, ...splice1(o, n));
    insert1(s, null,
        ...scanner2(`,${tname}=[];for(${kname} in ${sname})${tname}.push(${kname});`)
    );
    insert1(body, o.prev, ...s);
    splice1(o, m.next);
    splice1(o, m);
    insert1(o, o.first, ...scanner2(`${kname}=0;${kname}<${tname}.length`));
    var c = scanner2(`(=${tname}[${kname}]);${kname}++`);
    insert1(c[0], c[0].first, m);
    insert1(o, null, ...c);
};

var unforof = function (o, getnewname, used) {
    var hasawait = false;
    if (o.type === STRAP && o.text === 'await') {
        hasawait = true;
        o = o.next;
    }
    var m = o.first;
    var hasdeclare = false;
    if (m.type === STRAP) {
        m = m.next;
        hasdeclare = true;
    }

    var n = m.next;
    if (n.type !== STRAP || n.text !== 'of') {
        return o.next;
    }
    var f = n.next;
    var p = splice1(o, m, m = n)[0];
    if (hasdeclare) {
        var [d] = getDeclared(p);
        if (d.length) insert1(o, m, ...scanner2(d.join(",") + ","));
    }
    var iname = getnewname();
    var gname = getnewname();
    var oname;
    var useSimpleLoop = !(rootHyper || rootenvs.Symbol || hasawait);
    if (!f.next && f.type === EXPRESS && !/\./.test(f.text) && used[f.origin || f.text].length === 1) {
        splice1(o, m);
        oname = f.text;
    }
    else {
        oname = getnewname();
        splice1(o, n, f);
        var mo = splice1(o, f);
        useSimpleLoop = mo.length === 1 && (mo[0].type === EXPRESS || mo[0].type === SCOPED && mo[0].entry === "[");
        o.push(...scanner2(`${oname}=`));
        o.push(...mo);
        o.push({ type: STAMP, text: ',' });
    }
    if (useSimpleLoop) o.push(...scanner2(`${iname}=0,${gname}=${oname}.length;${iname}<${gname}&&(${createString([p])}=${oname}[${iname}],true);${iname}++`));
    else rootenvs.Symbol = true, o.push(...scanner2(`${gname}=${hasawait ? `${oname}[Symbol.asyncIterator]||${oname}[Symbol.iterator]` : `${oname}[Symbol.iterator]||${oname}[Symbol.asyncIterator]`}||Array.prototype[Symbol.iterator],${gname}=${gname}.call(${oname}),${iname}=${hasawait ? "await " : ''}${gname}.next();!${iname}.done&&(${createString([p])}=${iname}.value,true);${iname}=${gname}.next()`));
    relink(o);
};
var unarrow = function (body, i, killobj, letname_) {
    var o = body[i];
    var p = o.prev;
    var n = o.next;
    var b = n, h = p;
    var pi = body.lastIndexOf(p, i);
    if (pi < 0) pi = 0;
    body.splice(i, 1);
    body.splice(pi, 0, { type: STRAP, text: 'function' });
    var ni = body.indexOf(n, i);
    if (ni < 0) ni = body.length;
    if (p && p.type !== SCOPED || p.entry !== "(") {
        h = scanner2("()")[0];
        h.splice(0, 0, ...body.splice(i, 1, h));
    }
    if (n.type !== SCOPED || n.entry !== "{") {
        var nni = skipAssignment(body, ni);
        b = scanner2('{}')[0];
        b.push({ type: STRAP, text: "return" }, ...body.splice(ni, nni - ni, b));
        killarg(h, b, letname_);
        killobj(b);
        ni = nni;
    }
    else nni = ni + 1;
    return nni;
};
var getname = function (vars, envs, k) {
    if (!(k in vars) && !(k in envs)) return vars[k] = true, k;
    var inc = /\d+$/.exec(k);
    if (inc) k = k.slice(0, k.length - inc[0].length), inc = 1 + +inc[0];
    else inc = 0;
    while ((k + inc) in vars) inc++;
    vars[k + inc] = true;
    return k + inc;
};
var killarg = function (head, body, _getname) {
    var argcodes = [];
    var o = head.first;
    var index = 0;
    var collect = 0, cname, anames = [];
    var namemap = Object.create(null);
    while (o) {
        var aname;
        if (o.type === SCOPED) {
            aname = _getname(head.length > 1 ? 'arg' + index : 'arg');
            var dec = splice1(head, o, o = o.next, { type: EXPRESS, text: aname });
            dec = `${createString(dec)}=${aname}`;
            if (/^var\s/.test(argcodes[argcodes.length - 1])) argcodes[argcodes.length - 1] += ',' + dec;
            else argcodes.push(`var ` + dec);
        }
        else if (o.type === EXPRESS || o.type === VALUE) {
            aname = o.text;
            if (/^\.\.\./.test(aname)) {
                cname = aname.replace(/^\.\.\./, '');
                splice1(head, o.prev ? o.prev : o, o = o.next);
                collect = index + 1;
                continue;
            }
            o = o.next;
            if (collect) {
                anames.push(aname);
            }
            index++;
        }
        if (o && o.type === STAMP) {
            if (o.text === ',') {
                o = o.next; continue;
            }
            var start = o;
            while (o && (o.type !== STAMP || o.text !== ',')) o = o.next;
            var assign = splice1(head, start, o);
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
            return `${a}=arguments.length>${collect + n - 1}?arguments[arguments.length - ${n}]:undefined`;
        }));

        if (cname) argcodes.unshift(`var ${cname}=Array.prototype.slice.call(arguments,${collect}${index > collect ? `,${collect - index}` : ""})`), namemap[cname] = true;
    }
    if (argcodes.length) {
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
            hq.splice(i + 1, j - i, body);
            relink(hq);
        }
        else body.unshift(...scanner2(argcodes.join(";") + ";")), relink(body);
    }
    return namemap;
};
var revar = function (scoped) {
    if (!scoped.body) return;
    var killed = [];
    var rm = function (o, i) {
        if (o.type === STRAP && /^(const|let|var)$/.test(o.text)) {
            var q = o.queue;
            if (!q) return;
            var n = o;
            var s = i, v = o;
            if (o.next) do {
                o = n.next;
                n = o.next;
                if (n && n.text === '=') {
                    n = skipAssignment(n);
                }
                else {
                    i = q.indexOf(o.prev, i);
                    var j = n ? q.indexOf(n, i) : q.length;
                    q.splice(i, j - i);
                }
            } while (n && n.type === STAMP && n.text === ',');
            if (q[s] === v) q.splice(s, 1);
            if (killed.indexOf(q) < 0) killed.push(q);
        }
        else if (o.length) {
            backEach(o, rm);
        }
    };
    backEach(scoped.body, rm);
    killed.forEach(relink);
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
        else if (o.type === SCOPED) {
            killret(o, labels, gettmpname);
            if (o.entry === '{') unlabel = true;
        }
        else if (o.type === STAMP && o.text === ';') {
            unlabel = true;
        }
        if (unlabel) {
            for (var lbl of lbls) delete labels[lbl];
            lbls = [];
        }
        if (o.type !== STRAP) {
            o = o.next;
            continue;
        }
        switch (o.text) {
            case "function":
                while (o && o.type !== SCOPED || o.entry !== '{') o = o.next;
                break;
            case "return":
                if (o.next && !o.isend) insert1(body, o.next, ...scanner2(`${gettmp()}=1,`));
                else insert1(body, o.next, ...scanner2(`${gettmp()}=1,void 0`));
                breakmap[o.text] = 1;
                break;
            case "break":
            case "continue":
                if (o.next && !o.isend) {
                    var lbl = o.next.text;
                    if (labels[lbl]) break;
                    var k = `${o.text} ${lbl}`;
                    var v = breakmap[k] || breakIndex++;
                    o.next.type = VALUE;
                    o.next.text = v;
                    insert1(body, o.next, `${getname()}=`);
                    breakmap[k] = v;
                }
                else {
                    if (labels[o.text]) break;
                    var v = breakmap[o.text] = o.text === 'break' ? 2 : 3;
                    insert1(body, o.next, `${getname()}=${v}`);
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
var down = function (scoped) {
    var inAsync = scoped.async;
    var inAster = scoped.yield;
    var funcMark = [, "aster_", "async_", "asyncAster_"][inAsync << 1 | inAster];
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
        if (!scoped.lets) return;
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
        var wbody = wrapper[2];
        for (var k of lets) vars[k] = true, delete envs[k];
        backEach(body, function (o, i) {
            if (o.type === STRAP && /^(const|let)$/.test(o.text)) body.splice(i, 1);
        });
        wbody.push(...body);
        wbody.first = body.first;
        wbody.last = body.last;
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
        var fix = [{ text: ';', type: STAMP }];
        if (hasret) {
            pre.push({ text: 'if', type: STRAP });
            fix = scanner2('{}');
            var fix0 = fix[0];
            for (var k in retmap) {
                var v = retmap[k];
                if (v === 1) {
                    if (!tmp1) tmp1 = _getname('tmp');
                    fix0.push(...scanner2(`if(${tmp0}===${v}) return ${tmp1}`));
                }
                else {
                    fix0.push(...scanner2(`if(${tmp0}===${v}) ${k}`));
                }
            }
            wrapper.unshift(...scanner2(`${tmp0}=0,${tmp1 ? tmp1 + '=' : ''}`));
        }
        var bp = body.prev;
        var bpp = bp && bp.prev;
        if (body.entry === '{' && (!bp || !bpp || bp.type === SCOPED && bp.entry === '(' && bpp && bpp.type === STRAP || bp.type === LABEL)) {
            splice1(body.queue, body, body.next, ...pre, wrapper, ...fix, { type: SPACE, text: '\r\n' });
        }
        else {
            body.splice(0, body.length, wrapper, { type: SPACE, text: '\r\n' });
            body.first = wrapper;
            body.last = wrapper;
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

    var argcodes = [];
    var solidmap = {};
    var setsolid = function (q, o) {
        var k = o.text;
        if (!/\.[\s\S]+\./.test(k)) return;
        var c = k.replace(/^[\s\S]*?(\.[^\.]*$)/, '$1');
        k = k.replace(/^([\s\S]*?)\.[^\.]*$/, '$1');
        if (!solidmap[k]) {
            solidmap[k] = [q, o];
            return;
        }
        if (typeof solidmap[k] !== 'string') {
            var n = k.replace(/^[\s\S]*?([^\.]*)$/, "$1");
            n = _getname(n + "_");
            var [q, b] = solidmap[k];
            b.text = `(${n} = ${k})${c}`;
            solidmap[k] = n;
        }
        o.text = solidmap[k] + c;
    };
    var markcodes = funcMark ? [] : argcodes;
    if (scoped.used.this) {
        let tn = _getname("this_");
        rename(scoped.used, "this", tn);
        scoped.used.this.forEach(o => o.origin = 'this');
        markcodes.push(`${tn}=this`);
    }
    if (scoped.used.arguments) {
        let an = _getname("arguments_");
        scoped.used.arguments.forEach(o => o.origin = 'arguments');
        rename(scoped.used, "arguments", an);
        markcodes.push(`${an}=arguments`);
    }
    var fordeep = 0;
    var _killobj = function (o, _getlocal) {
        return killobj(o, gettmpname, getletname, _getlocal, _letname, setsolid);
    };
    var kill = function (scoped, _, body) {
        if (scoped.isfunc) return down(scoped);
        killlet(scoped);
        var saveddeep = fordeep;
        var _getlocal = getname.bind(null, scoped.lets, scoped.envs);
        var getdeepname = function () {
            return gettmpname(--fordeep);
        };
        a: if (scoped.head) {
            var hp = scoped.head.prev;
            if (hp && hp.type === STRAP) {
                if (hp.text === 'for') {
                    unforof(scoped.head, getdeepname, scoped.used);
                    unforin(scoped.head, scoped.body, getdeepname);
                    // unforcx(scoped.head, getdeepname);
                }
                else if (hp.text === 'catch') {
                    killarg(scoped.head, scoped.body, _letname);
                    break a;
                }
            }
            _killobj(scoped.head, _getlocal);
        }
        if (scoped.body) _killobj(scoped.body, _getlocal);
        if (scoped.length) scoped.forEach(kill);
        fordeep = saveddeep;
    };
    if (scoped.isfunc) {
        if (scoped.head) var argsmap = killarg(scoped.head, scoped.body, _letname);
        if (argcodes.length) precode(argcodes.join(";") + ";");
        if (scoped.body) scoped.body.keeplet = false, _killobj(scoped.body, _getname);

        scoped.forEach(kill);
        if (funcMark) {
            var argname = _getname("_");
            unstruct.debug = downLevel.debug;
            var code = unawait(scoped.body, _getname, argname);
            var body = scanner2(`return ${funcMark}()`);
            code.forEach(function (c) {
                var f = scanner2(`function(${body[2].length ? argname : ''}){\r\n}`);
                if (!c.length) f[2].push(...scanner2('return [1,0]'));
                else f[2].push(...c);
                f[2].push({ type: SPACE, text: "\r\n" });
                if (body[2].length) body[2].push({ type: STAMP, text: "," });
                body[2].push({ type: SPACE, text: '\r\n' }, ...f);
            });
            scoped.body.splice(0, scoped.body.length);
            if (markcodes.length) {
                scoped.body.push(...scanner2(markcodes.join(';') + ";\r\n"));
            }
            scoped.body.push(...body);
            revar(scoped);
            scoped.vars = {};
        }
        var vars1 = Object.keys(vars).filter(k => !(k in scoped.vars));
        if (argsmap) vars1 = vars1.filter(k => !(k in argsmap));
        if (vars1.length && scoped.body) scoped.body.push(...scanner2(`\r\nvar ${vars1}`));
        if (scoped.body) relink(scoped.body);
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
var downcode = downLevel.code = function (code) {
    rootenvs = code.envs;
    rootHyper = rootenvs.Symbol || code.yield || code.async;
    down(code.scoped);
    rootenvs = null;
    return code;
};
module.exports = downLevel;