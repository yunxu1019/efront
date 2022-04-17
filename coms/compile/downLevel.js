var scanner2 = require("./scanner2");
var strings = require("../basic/strings");
var Program = scanner2.Program;
var { STAMP, SCOPED, STRAP, EXPRESS, COMMENT, SPACE, PROPERTY, VALUE, QUOTED, number_reg, rename, getDeclared, skipAssignment, createString } = require("./common");
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
var killdec = function (queue, o, getobjname, _var = 'var', killobj) {
    var tmpname = '';
    var index = 0;
    var deep = 0;
    var dec = function (d, i) {
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
                    insert1(queue, o, ...scanner2(`${index > 0 ? ',' : ''}${n}=${k}`));
                    index++;
                    k = tmpname = n;
                }
                dog(v);
                deep -= dp;
            }
            else {
                deep++;
                var n = getobjname(deep)
                insert1(queue, o, ...scanner2(`${index > 0 ? "," : ''}${n}=${tmpname}!==undefined?${tmpname}:`));
                var skiped = splice1(d[2], d[3], d[4]);
                killobj(skiped);
                insert1(queue, o, ...skiped);
                k = tmpname = n;
                index++;
                dog(v);
                deep--;
            }
            if (tmpname === k) tmpname = previx;
            return;
        }

        if (!tmpname) {
            write(v, null, i < total - 1);
        }
        else if (d.length === 2) {
            write(v, k, i < total - 1);
        }
        else {
            write(v, `{k}!==undefined?${k}:`, i < total - 1);
            var skiped = splice1(d[2], d[3], d[4]);
            killobj(skiped);
            insert1(queue, o, ...skiped);
        }
        index++;
    };
    var doged, total;
    var write = function (name, value, hasnext) {
        if (name === tmpname && hasnext) {
            tmpname = getobjname(deep++);
            insert1(queue, o, ...scanner2(`${index > 0 ? "," : ""}${tmpname}=${name}`));
            index++;
        }

        var text = `${index > 0 ? "," : ''}${name}${value ? '=' + value : ''}`;
        insert1(queue, o, ...scanner2(text));
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
    if (_var) insert1(queue, o, { type: STRAP, text: _var });
    loop: while (o) {
        var next = o.next;
        tmpname = '';
        if (!next || next.type !== STAMP || next.text !== '=') {
            var hasnext = next && next.type === STAMP && next.text === ',';
            if (o.type === SCOPED) {
                var [o0] = splice1(queue, o, o = hasnext ? next.next : next);
                var [[d]] = getDeclared(o0);
                dog(d);
                if (hasnext) continue loop;
            }
            else if (hasnext) {
                o = next.next;
                index++;
                continue;
            }
            o = next;
            break;
        }
        var objs = [];
        do {
            var next = o.next;
            if (!next || next.type !== STAMP || next.text !== "=") {
                if (tmpname) {
                    o = skipAssignment(o);
                    break;
                }
                if (!next || next.type === STAMP && /^[,;]$/.test(next.text)) {
                    if (o.type === EXPRESS && !/\./.test(o.text)) {
                        tmpname = o.text;
                        splice1(queue, o, o = next && next.text === ',' ? next.next : next);
                    }
                }
                break;
            }
            if (o.type === SCOPED) {
                var [o0] = splice1(queue, o, o = next.next);
                delete o0.next;
                if (o0.length && getDeclared(o0).length > 0) objs.push(o0);
            }
            else if (o.type === EXPRESS && !/\.\[/.test(o.text)) {
                if (!tmpname) tmpname = o.text, index++;
                o = next.next;
            }
            else {
                o = next.next;
            }
        } while (o);
        if (!tmpname) {
            if (objs.length === 1) {
                var [[d]] = getDeclared(objs[0]);
                var a = single(d, '');
                if (a) {
                    insert1(queue, o, { type: EXPRESS, text: a[1] });
                    insert1(queue, o, { type: STAMP, text: "=" });
                    o = skipAssignment(o);
                    insert1(queue, o, ...scanner2(a[0]));
                    index++;
                    continue;
                }
            }
            tmpname = getobjname();
            insert1(queue, o, { type: EXPRESS, text: tmpname });
            insert1(queue, o, { type: STAMP, text: "=" });
            o = skipAssignment(o);
            index++;
        }
        for (var o0 of objs) {
            var [[d]] = getDeclared(o0);
            dog(d);
        }
    }
    return o;
};
// 键值对重组
var killmap = function (body, o, _getobjname, killobj) {
    if (!o.length) return o.next;
    var m = o.first;
    var s = m;
    while (m) {
        if (m.type === EXPRESS) break;
        s = m;
        while (m && (m.type === STRAP || m.type === STAMP)) m = m.next;
        if (m.isprop && (m.type === SCOPED || m.type === PROPERTY && /\[/.test(m.text) || m.short || m.next && m.next.type === SCOPED)) {
            break;
        }
        m = m.next;
        m = skipAssignment(m);
    }
    if (!m) return o.next;
    m = s;
    if (m.prev && m.prev.type === STAMP && m.prev.text === ',') {
        splice1(body, m.prev, m);
    }
    var q, qf = o;
    var next = o.next;

    var initq = function () {
        q = scanner2(`(${_getobjname()}=)`)[0];
        var qo = splice1(body, qf, next, q);
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
                    insert1(q, null, ...t);
                }
                else {
                    if (!t) {
                        t = scanner2(`extend()`);
                        var [o0] = splice1(body, o, next, t);
                        insert1(t[1], null, o0);
                        qf = t[0];
                        insert1(body, next, ...t);
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
        else killobj(prop.value);
        setprop(prop, _getobjname(), define_, q);
    }
    if (q) insert1(q, null, ...scanner2(',' + _getobjname()));
    return next;
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
    if (prop.sfunc !== false) insert1(prop.value, prop.value[0], ...scanner2(`${prop.async ? "async " : ""}function${prop["*"] ? "*" : ''}`));
    if (prop.get || prop.set) {
        let end = prop.value[prop.value.length - 1];
        if (end.type === STAMP && /[,;]/.test(end.text)) prop.value.pop();
        if (!d[prop.name]) {
            let tmp = scanner2(`Object.defineProperty(${k},${prop.name},{})`);
            insert1(q, null, ...tmp);
            if (end.type === STAMP && /^[,;]/.test(end.text)) insert1(q, null, end);
            d[prop.name] = tmp[1][4];
        }
        if (d[prop.name].length) insert1(d[prop.name], null, { type: STAMP, text: ',' });
        insert1(d[prop.name], null, { type: PROPERTY, text: prop.get ? "get" : "set" });
        insert1(d[prop.name], null, { type: STAMP, text: ":" });
        insert1(d[prop.name], null, ...prop.value);
    }
    else {
        insert1(q, null, ...scanner2(`${k}${prop.name}=`));
        insert1(q, null, ...prop.value);
    }
}
var killcls = function (body, o, getname_) {
    var extends_ = [];
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
    if (base === 'Array') base = 'Array2';
    var index = 0;
    while (o && o.isClass) {
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
            if (prop.get || prop.set || prop.sfunc !== false) {
                setprop(prop, k, d, defines);
            }
            else if (/^(?:constructor|(['"`])constructor\1)/.test(prop.name)) {
                constructor = prop.value;
            }
            else {
                insert1(assign, null, ...scanner2(`this${prop.name}=`));
                insert1(assign, null, ...prop.value);
            }
        }
        if (invokes.length) insert1(invokes, null, { type: STAMP, text: ',' });
        insert1(invokes, null, ...scanner2('function ' + name));
        insert1(constructor[1], constructor[1][0], ...assign);
        insert1(invokes, null, ...constructor);
        o = o.next;
        if (base) insert1(foot, null, ...scanner2(`${foot.length ? ";" : ""}extends_(${clz.name},${base})`));
        base = clz.name;
        if (clz.name) insert1(head, null, ...scanner2(`${head.length ? ',' : ''}${clz.name}`));
        index++;
    }
    insert1(defines, null, ...foot);
    if (head.length > 1 || start.isExpress) {
        insert1(defines, null, ...scanner2(`; return ${clz.name}`))
        if (decName) insert1(func, func[0], ...scanner2(`var ${decName}=`));
        splice1(body, start, o, ...func);
    }
    else {
        splice1(body, start, o, ...invokes);
        if (defines.length) {
            insert1(body, o, { text: ';', type: STAMP });
            insert1(body, o, ...defines);
        }
    }
    return o;
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
// 数组或参数展开
var killspr = function (body, o, _getobjname, setsolid, killobj) {
    var m = o.first;
    if (!m) return o.next;
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
            if (m.length) killobj(m);
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
    if (!m) return o.next;
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
            return next;
        };
        killnext(m);
        m.text = m.text.replace(/^\.\.\./, '');
        return next;
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
    return next;
};

var killobj = function (body, getobjname, getname_, setsolid, deep = 0) {
    var o = body.first;
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
        killobj(o, getobjname, getname_, setsolid, deep);
    };
    while (o) {
        if (o.type === STRAP) {
            switch (o.text) {
                case "await":
                    if (!body.awaits) body.awaits = [];
                    body.awaits.push(o);
                    break;
                case "yield":
                    if (!body.yields) body.yields = [];
                    body.yields.push(o);
                    break;
                case "var":
                case "let":
                case "const":
                    splice1(body, o, o = o.next);
                    o = killdec(body, o, _getdeepname, 'var', deepkill);
                    break;
                case "class":
                    o = killcls(body, o, getname_);
                    break;
                case "function":
                    o = o.next;
                    if (o && o.type === STAMP) o = o.next;
                    if (o && o.type === EXPRESS) o = o.next;
                    if (o && o.type === SCOPED) o = o.next;// ()
                    if (o && o.type === SCOPED) o = o.next;// {}
                    break;
                default:
                    o = o.next;
            }
            continue;
        }
        else if (o.type === SCOPED) {
            if (o.isObject) {
                if (o.next && o.next.type === STAMP && o.next.text === '=') {
                    o = killdec(body, o, _getdeepname, '', deepkill);
                    continue;
                }
                else {
                    o = killmap(body, o, _getobjname, deepkill);
                    continue;
                }
            }
            else if (o.entry === '[') {
                if (o.next && o.next.type === STAMP && o.next.text === '=') {
                    o = killdec(body, o, _getdeepname, '', deepkill);
                }
                else {
                    o = killspr(body, o, _getobjname, setsolid, deepkill);
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
                    o = killspr(body, o, _getobjname, setsolid, deepkill);
                    continue;
                }
            }
        }
        else if (o.type === STAMP) {
            if (o.text === "=>") {
                o = unarrow(body, o, killobj, getname_);
                continue;
            }
        }
        o = o.next;
    }
    if (body.awaits) unawait(body, body.awaits, getname_);
};
var import_ = function () { };
var export_ = function () { };

// 字面量 false|true|null|Infinity|NaN|undefined|arguments|this|eval|super
var unfalse = function () { };
var unyield = function () { };
var unawait = function (body, awaits, getname_) {
};
var unforof = function (o, gettempname_, getnextname_) {
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
        insert1(o, m, ...scanner2(d.map(a => a.text).join(",")));
    }
    splice1(o, m);
    var iname = gettempname_();
    insert1(o, null, ...scanner2(`${iname}=0`));
    var oname;
    if (f.type === EXPRESS && !/\./.test(oname)) {
        oname = f.text;
    }
    else {
        oname = getnextname_();
        insert1(o, null, ...scanner2(`,${oname}=`));
        insert1(o, null, ...splice1(o, f));
    }
    insert1(o, null, ...scanner2(`;${iname}<${oname}.length&&`));
    var q = scanner2(`(=${oname}[${iname}],true)`)[0];
    insert1(q, q[0], p);
    insert1(o, null, q);
    insert1(o, null, ...scanner2(`;${iname}++`));

};
var unarrow = function (body, o, killobj, getname_) {
    var p = o.prev;
    var n = o.next;
    var b = n, h = p;
    insert1(body, p || o, ...scanner2("function"));
    if (p && p.type !== SCOPED || p.entry !== "(") {
        h = scanner2("()");
        insert1(h[0], null, ...splice1(body, p, o));
        h = h[0];
        insert1(body, o, h);
    }
    if (n.type !== SCOPED || n.text !== "{") {
        var nn = skipAssignment(n);
        b = scanner2('{}');
        b = b[0];
        killarg(h, b, getname_);
        insert1(b, null, { type: STRAP, text: "return" });
        insert1(b, null, ...splice1(body, n, nn));
        insert1(body, o, b);
        killobj(b);
    }
    splice1(body, o, o = o && o.next);
    return o;
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
    while (o) {
        var aname;
        if (o.type === SCOPED) {
            aname = _getname(head.length > 1 ? 'arg' + index : 'arg');
            var dec = splice1(head, o, o = o.next, { type: EXPRESS, text: aname });
            dec = `${createString(dec)}=${aname}`;
            if (/^var\s/.test(argcodes[argcodes.length - 1])) argcodes[argcodes.length - 1] += ',' + dec;
            else argcodes.push(`var ` + dec);
        }
        else if (o.type === EXPRESS) {
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
        }

    }
    if (collect > 0) {
        collect--;
        argcodes.unshift.apply(argcodes, anames.map((a, i) => {
            if (a === cname) cname = '';
            var n = anames.length - i;
            return `${a}=arguments.length>${collect + n - 1}?arguments[arguments.length - ${n}]:undefined`;
        }));

        if (cname) argcodes.unshift(`var ${cname}=Array.prototype.slice.call(arguments,${collect}${index > collect ? `,${collect - index}` : ""})`);
    }
    if (argcodes.length) insert1(body, null, ...scanner2(argcodes.join(";") + ";"));
};

var down = function (scoped) {
    var vars = Object.assign(Object.create(null), scoped.vars);
    var objnames = [];

    var _getname = getname.bind(null, vars, scoped.envs);
    var gettmpname = function (i = 0) {
        if (!objnames[i]) objnames[i] = _getname("_");
        return objnames[i];
    };
    var killvar = function (scoped) {
        if (!scoped.body) return;
    };
    // let 转 var
    var killlet = function (scoped) {
        for (var k in scoped.lets) {
            var nk = _getname(k);
            if (nk !== k) rename(scoped.used, k, nk);
        }
    };
    var precode = function (text) {
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
    if (scoped.used.this) {
        let tn = _getname("this_");
        rename(scoped.used, "this", tn);
        argcodes.push(`var ${tn}=this;`);
    }
    if (scoped.used.arguments) {
        let an = _getname("arguments_");
        rename(scoped.used, "arguments", an);
        argcodes.push(`var ${an}=arguments;`);
    }
    var fordeep = 0;
    var kill = function (scoped) {
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
                    unforof(scoped.head, getdeepname, getdeepname);
                }
                else if (hp.text === 'catch') {
                    killarg(scoped.head, scoped.body, _getname);
                    break a;
                }
            }
            killobj(scoped.head, gettmpname, _getlocal, setsolid);
        }
        if (scoped.body) killobj(scoped.body, gettmpname, _getlocal, setsolid);
        if (scoped.length) scoped.forEach(kill);
        fordeep = saveddeep;
    };
    if (scoped.isfunc) {
        killlet(scoped);
        if (scoped.head) killarg(scoped.head, scoped.body, _getname);
        if (argcodes.length) precode(argcodes.join(";") + ";");
        if (scoped.body) killobj(scoped.body, gettmpname, _getname, setsolid);
        scoped.forEach(kill);
    }
    else {
        kill(scoped);
    }
    Program.prototype.relink(scoped.body);
};
/**
 * @param {Program} code
 */
function downLevel(data) {
    var code = scanner2(data);
    down(code.scoped);
    return code.toString();
}
module.exports = downLevel;