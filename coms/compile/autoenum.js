var {
    skipAssignment,
    snapSentenceHead,
    snapAssignmentHead,
    skipSentenceQueue,
    snapExpressFoot,
    pickArgument,
    EXPRESS,
    PROPERTY,
    SPACE,
    SCOPED,
    QUOTED,
    VALUE,
    STRAP,
    STAMP,
    LABEL,
    number_reg,
    createString
} = require("./common");
var strings = require("../basic/strings");
var getSimpleQuotedKey = function (t) {
    if (!t.length) if (/[\.\[\]]|^#/.test(t.text)) {
        return `[${t.text}]`;
    }
    else {
        return "." + strings.decode(t.text);
    }
    return "[*]";
}
var getSimpleProperty = function (o) {
    var t = o.last;
    if (!t) throw new Error(i18n`代码结构错误`);
    var p = t.prev;
    if (p && (p.type !== STAMP || p.text !== ",")) return ["[*]"];
    switch (t.type) {
        case QUOTED: return getSimpleQuotedKey(t);
        case VALUE:
            if (t.isdigit) return `[${t.text}]`;
            return "[*]";
    }
    return "[*]";
}


var createRefId = function (o) {
    var ids = [], refs = [];
    var g = o;
    o.refs = refs;
    while (o) {
        if (o.type === SCOPED) {
            if (o.entry !== '[') break;
            ids.push(getSimpleProperty(o))
        }
        else if (o.type === EXPRESS) {
            var t = o.text.replace(/^\.\.\.|\.\.\.$/g, "").replace(/^[^\.\[]+/, '');
            t.replace(/[^\.\[]+|\[[\s\S]*?\]/g, function (m) {
                if (/^\[/.test(m)) {
                    ids.push(strings.decode(m.slice(1, -1)));
                }
                else {
                    ids.push("." + m);
                }
            })
        }
        else {
            if (o.needle) {
                ids.push(o.text);
                o = o.next;
                continue;
            }
            break;
        }
        var n = o.next;
        refs.push(o);
        if (!n) break;
        if (n.type === EXPRESS && !/\.$/.test(o.text) && !/^[\.\[]/.test(n.text)) break;
        o = n;
    }
    if (o && o.type === SCOPED && o.entry === '(') {
        g.called = true;
    }
    return ids.join('');
}
var ignore = Symbol("ignore");
var mapkey = null;
var patchFnFromProperty = function (o) {
    var kpath = [];
    var origin = o;
    if (!o.queue.isObject) return;
    while (o?.queue?.kind) {
        if (o.type & (EXPRESS | PROPERTY)) {
            if (o.short) {
                kpath.push(o.text);
                o = o.queue;
                continue;
            }
        }
        var p = o.prev;
        if (!p) return;
        if (p.type & (STAMP | STRAP)) {
            if (/^(\:|as)$/.test(p.text)) p = p.prev;
            else return;
        }
        if (!p) return;
        if (p.type === PROPERTY) {//不处理字符串属性
            kpath.push(o.text);
            o = o.queue;
            if (o.entry !== '{') return;
            continue;
        }
        return;
    }
    if (!o || !o.equal || o.next !== o.equal) return;
    var next = skipAssignment(o.equal);
    var obj = o.equal.next;
    if (obj.next !== next) return;
    obj = outObjects[obj.text];
    if (!obj) return;
    var next = o.euqal;
    while (kpath.length) {
        var k = kpath.pop();
        if (k in obj) obj = obj[k];
        if (obj == null) return;
    }
    origin.fnq = o;
    origin.fn = obj;
}
var maplist = function (oused) {
    var map = Object.create(null);
    for (var o of oused) {

        if (o[mapkey]) continue;
        o[mapkey] = true;
        var r = createRefId(o);
        if (/\[\*\]/.test(r)) continue;
        if (!map[r]) {
            map[r] = [];
            map[r].wcount = 0;
        }
        var m = map[r];
        if (enumtype & REFTYPE && o.kind) {
            m.unshift(o);
        }
        else m.push(o);
        if (o.equal || o.kind) {
            if (enumtype & REFTYPE) {
                var typeref = o.typeref;
                if (typeref && typeof typeref === 'object') {
                    typeref = typeref.typeref;
                    o.typeref = typeref;
                }
                if (typeref) {
                    m.typeref = typeref;
                    m.wcount++;
                }
                else {
                    var n = o.equal;
                    if (n?.type !== STAMP) continue;
                    if (n?.type === STAMP && /^(\+\+|\-\-)$/.test(n.text)) {
                        o[ignore] = true;
                        continue;
                    }
                    if (/^[\+\-]\=$/.test(n.text)) {
                        var nn = n.next;
                        if (nn && snapExpressFoot(nn) == nn && nn.isdigit && (nn.text & 0x1ff) === +nn.text) {
                            if (m.typeref === 'uint') o[ignore] = true;
                            continue;
                        }
                    }
                    else if (!/[^=!]?=$/.test(n.text)) continue;
                    o[ignore] = false;
                    m.wcount++;
                }
            }
            else if (enumtype & (REFSTRC | REFMOVE)) {
                if (o.property) o[ignore] = true;
                else if (o.equal) {
                    if (o.enumref && o.enumref !== m.enumref) {
                        m.enumref = o.enumref;
                        m.wcount++;
                    }
                    else if (enumtype & REFMOVE) m.wcount++;
                }
                else if (enumtype & REFMOVE) {
                    m.wcount++;
                    if (o.kind !== 'argument') patchFnFromProperty(o);
                }
            }
            else {
                if (o.equal) m.wcount++;
            }
        }
        else if (enumtype & REFSTRC) {
            if (o.enumref && o.enumref !== m.enumref) m.wcount++, m.enumref = o.enumref;
        }
    }
    return map;
}
function createRefMap(scoped) {
    var { used } = scoped;
    var refs = Object.create(null);
    for (var k in used) refs[k] = maplist(used[k]);
    return scoped.refs = refs;
}
function removeRefs(o) {
    var refs = o.refs;
    if (!refs || !refs.length) return;
    var q = o.queue;
    var start = q.indexOf(o) + 1;
    var r = refs[refs.length - 1];
    var end = q.indexOf(r) + 1;
    q.splice(start, end - start);
    o.next = r.next;
    if (o.next) o.next.prev = o;
}
function getFirstBreak(o, labels = []) {
    while (o.type === LABEL) {
        labels.push(o.text.replace(/\:$/, ''));
        o = o.next;
    }
    if (o.type === STRAP && /^(for|while|do|switch)$/.test(o.text)) {
        labels.push("break");
        o = o.next;
    }
    if (o.type === STRAP) o = o.next;
    if (o.type === SCOPED && o.entry === '(') o = o.next;
    while (o.type === LABEL) {
        labels.push(o.text.replace(/\:$/, ''));
        o = o.next;
    }
    if (o.type !== SCOPED || o.entry !== "{") return;
    var m = o.first;
    while (m) switch (m.type) {
        case SCOPED:
            var h = snapSentenceHead(m);
            var fb = getFirstBreak(h, labels.concat("{"));
            if (fb) return fb;
            m = m.next;
            continue;
        case STRAP:
            if (m.type === STRAP && m.text === 'break') {
                if (!m.isend) m = m.next;
                var n = m.text;
                var i = labels.lastIndexOf(n);
                if (i >= 0) {
                    i = labels.lastIndexOf("{", i);
                }
                if (i < 0) {
                    return m.start;
                }
            }
            m = m.next;
            continue;
        default: m = m.next;
    }
}
function getConditionBlock(q, s) {
    do {
        var o = snapSentenceHead(q);
        var p = o.prev;
        if (p) {
            if (p.type === SCOPED && p.entry === '(') {
                p = p.prev;
                if (p.type === STRAP && /^(if|while|with|for|switch)$/.test(p.text)) {
                    return [q, q.end];
                }
            }
            if (p.type === STRAP && p.text === 'else') {
                return [q, q.end];
            }
        }
        if (o.type === STRAP) {
            if (/^(if|while|with|for)$/.test(o.text)) return [q, q.end];
            if (o.text === 'switch') {
                var m = s;
                while (o) {
                    if (m.type === STRAP) {
                        if (/^(case|default)$/.test(m.text)) {
                            return [q, m.start];
                        }
                    }
                }
                return [q, q.end];
            }
        }
        if (o.type === LABEL) a: {
            var fb = getFirstBreak(o);
            var m = q.first;
            while (m) {
                if (m.start > fb) return [q, q.end];
                if (m === s) break a;
                m = m.next;
            }
        }
        s = q;
        q = q.queue;
    } while (q);
    return [o, o.end];
}
function preCondition(o) {
    // 只检查一级
    var incondition = false;
    while (o && o.prev) {
        o = snapSentenceHead(o);
        var p = o.prev;
        if (!p) break;
        if (p.type === STRAP) {
            incondition = p.text === 'else';
            break;
        }
        if (p.type === SCOPED) {
            if (p.entry !== "(") break;
            if (!p.prev) break;
            var pp = p.prev;
            if (pp.type === STRAP) {
                if (/^(?:if|for|with)$/.test(pp.text)) {
                    incondition = true;
                    break;
                }
                if (/^(?:while)$/.test(pp.text)) {
                    var ppp = pp.prev;
                    if (!ppp || !ppp.prev || ppp.type !== SCOPED || ppp.entry !== '{') {
                        incondition = true;
                        break;
                    }
                    var pppp = ppp.prev;
                    while (pppp?.type === LABEL) pppp = pppp.prev;
                    if (pppp.type === STRAP && pppp.text === "do") break;
                    incondition = true;
                    break;
                }
            }
            break;
        }
        if (p.type === STAMP) switch (p.text) {
            case ";": break;
            case "?": incondition = true; break;
            case ":":
                if (p.isExpress) incondition = true;
                else incondition = ":";
                break;
            case "=>": incondition = true; break;
            default:
                o = p.prev;
                continue;
        }
        break;
    }
    return incondition;
}

function inOperatorLeft(q) {
    if (!q.isObject) return false;
    do {
        if (q.kind) return true;
        var n = q.next;
        if (n?.type === STAMP && !/[,;]/.test(n.text)) {
            return true;
        }
        q = q.queue;
    } while (q);
    return false;
}
function getEnumRange(o, scoped) {
    var q = o.queue, oe = Infinity;
    if (inOperatorLeft(q)) return;
    if (q !== scoped.body) {
        if (q.entry === '(') {
            var qp = q.prev;
            if (qp?.type === EXPRESS) qp = qp.prev;
            if (qp && qp.type === STRAP && qp.text === "await") qp = qp.prev;
            if (qp && qp.type === STRAP && qp.text === 'for') {
                var f = q.first;
                var fc = 0;
                while (f && f !== o) {
                    if (f.type === STAMP && f.text === ";") {
                        fc++;
                        if (fc > 1) return;
                    }
                    f = f.next;
                }
                [q, oe] = getConditionBlock(q.queue, q);
            }
            else if (q === scoped.head) return;
            else[q, oe] = getConditionBlock(q, o);
        }
        else[q, oe] = getConditionBlock(q, o);
    }
    var pc = preCondition(o);
    if (pc) {
        var e = o;
        if (pc === ':') while (e) {
            if (e.type === STRAP && /^(case|default)$/.test(e.text)) break;
            e = e.next;
        }
        else e = skipSentenceQueue(o);
        q = o.queue;
        if (e) oe = e.end;
        else oe = q.end;
    }
    return [q, oe];
}
function enumequal(refitem, scoped) {
    for (var rk in refitem) {
        var os = refitem[rk];
        var wcount = os.wcount;
        if (wcount < 1 || os.length <= wcount) continue;
        var eq = null;
        var cq = null, oe = Infinity;
        loop: for (var o of os) {
            if (o[ignore]) {
                if (REFTYPE & enumtype) {
                    o.typeref = eq;
                }
                continue;
            }
            if (
                eq === null || o.equal || o.fn !== undefined
            ) {
                if (!o.equal && o.fn === undefined) continue;
                eq = null;
                oe = Infinity;
                cq = null;
                if (!wcount) break;
                if (o.fn === undefined && o.equal.text !== "=") {
                    continue;
                }
                wcount--;
                if (wcount > 0) continue;
                if (o.fn !== undefined) {
                    var range = getEnumRange(o.fnq, scoped);
                    if (!range) continue;
                    [cq, oe] = range;
                    eq = o;
                    continue;
                }
                var range = getEnumRange(o, scoped);
                if (!range) continue;
                [cq, oe] = range;
                o = o.equal.next;
                var n = skipAssignment(o);
                if (!o || n !== o.next) break loop;
                if (o.type === VALUE && o.isdigit) {
                    eq = o;
                }
                else if (o.type === EXPRESS && o.tack in outObjects) {
                    eq = o;
                    var k = o.text.slice(o.tack.length + 1);
                    o.fn = outObjects[o.tack][k];
                }
                continue;
            }
            if (o.queue !== cq) {
                var oq = o.queue;
                while (oq && oq !== cq) oq = oq.queue;
                if (!oq) {
                    eq = null;
                    continue;
                }
            }
            if (o.start > oe) {
                eq = null;
                continue;
            }
            if (!eq) continue;
            if (o.short) continue;
            // var 替换前 = createString(pickAssignment(o));
            if (eq.isdigit) {
                o.type = eq.type;
                o.isdigit = true;
                o.text = eq.text;
            }
            else if (eq.fn !== undefined) {
                o.fn = eq.fn;
            }
            // var 替换后 = createString(pickAssignment(o));
            removeRefs(o);
        }
    }
}
function enummark(refitem, scoped) {
    var rest = [];
    for (var rk in refitem) {
        var os = refitem[rk];
        var wcount = os.wcount;
        if (wcount < 1 || os.length <= wcount) return;
        var eq = null;
        var cq = null, oe = Infinity;
        loop: for (var o of os) {
            if (o[ignore]) {
                o.typeref = eq;
                continue;
            }
            if (eq === null || o.equal) {
                if (!o.equal && !o.kind) continue;
                if (!wcount) break;
                var _eq = o.typeref;
                if (!_eq && o.equal && o.equal === o.next) {
                    var n = o.equal.next;
                    if (n.type === STAMP && n.text === '++') {
                        n = n.next;
                    }
                    if (skipAssignment(n) === n.next) {
                        _eq = n;
                    }
                }
                if (isObject(_eq)) {
                    if (_eq.typeref) _eq = _eq.typeref;
                }
                if (eq === _eq) {
                    var oq = o.queue;
                    while (oq && oq !== cq) oq = oq.queue;
                    if (oq) continue;
                }
                eq = null;
                oe = Infinity;
                cq = null;
                if (o.equal && o.equal.text !== "=") {
                    continue;
                }
                wcount--;

                var range = getEnumRange(o, scoped);
                if (!range) {
                    eq = null;
                    continue;
                }
                [cq, oe] = range;
                eq = _eq;
                continue;
            }
            if (o.queue !== cq) {
                var oq = o.queue;
                while (oq && oq !== cq) oq = oq.queue;
                if (!oq) {
                    eq = null;
                    continue;
                }
            }
            if (o.start > oe) {
                eq = null;
                continue;
            }

            if (o.kind) {
                if (o.typeref) {
                    eq = o.typeref;
                    if (isObject(eq)) eq = eq.typeref;
                }
            }
            else {
                if (eq) o.typeref = eq;
            }
        }
    }
}
function enumstruct(refitem, scoped) {
    for (var rk in refitem) {
        var os = refitem[rk];
        var eq = null;
        var qs = [], cq = null, oe = Infinity;
        loop: for (var o of os) {
            if (eq === null || o.equal || o.kind) a: {
                if (o.enumref) {
                    eq = o.enumref;
                    cq = o.queue;
                    qs.push([cq, eq, Infinity]);
                    continue;
                }
                if (!o.equal) break a;
                if (o.equal.text !== "=") break a;
                var range = getEnumRange(o, scoped);
                if (!range) break a;
                var o1 = o.equal.next;
                var n = skipAssignment(o1);
                if (!o1 || n !== o1.next) break a;
                if (o1.enumref) {
                    [cq, oe] = range;
                    eq = o1.enumref;
                    qs.push([cq, eq, oe]);
                    continue;
                }
            }
            if (o.queue !== cq) {
                do {
                    var oq = o.queue;
                    while (oq && oq !== cq) oq = oq.queue;
                    if (oq) break;
                    if (!oq) {
                        if (qs.length) [cq, eq, oe] = qs.pop();
                        else cq = null, oe = Infinity;
                    }
                } while (cq);
                if (!cq) {
                    eq = null;
                    continue;
                }
            }
            if (o.start > oe) {
                eq = null;
                continue;
            }

            if (o.enumref) {
                eq = o.enumref;
                continue;
            }
            else {
                if (eq) {
                    o.enumref = eq;
                    continue;
                }
            }
        }
    }
}
function atuoenum(scoped) {
    var { used, caps } = scoped;
    mapkey = Symbol('enumed');
    for (var k in caps) {
        var rs = null;
        var os = used[k];
        if (enumtype & REFSTRC) {
            rs = maplist(os);
            enumstruct(rs, scoped);
        }
        if (enumtype & REFTYPE) {
            if (!rs) rs = maplist(os);
            enummark(rs, scoped);
        }
        if (enumtype & REFMOVE) {
            if (os.ignore) continue;
            if (!rs) rs = maplist(used[k]);
            enumequal(rs, scoped);
        }
    }
    for (var k in caps) {
        for (var o of used[k]) {
            delete o[mapkey];
        }
    }
}
var setStalk = function (scoped) {
    for (var s of scoped) setStalk(s);
    if (!scoped.isfunc) return;
    var used = scoped.used;
    for (var k in scoped.envs) {
        var os = used[k];
        for (var o of os) if (o.equal) {
            if (!o.stalk) o.stalk = scoped;
        }
    }
    loop: for (var k in used) {
        var os = used[k];
        if (os) for (var o of os) if (o.stalk) {
            if (o.stalk !== scoped) {
                os.ignore = true;
                continue loop;
            }
        }
    }
}
var enumtype = 0;
var outObjects = null;
var exports = module.exports = function main(code, type = REFMOVE) {
    var scoped = code.scoped;
    outObjects = Object.create(null);
    if (scoped.envs.Math) outObjects.Math = Math;
    if (scoped.envs.Number) outObjects.Number = Number;
    setStalk(scoped);
    var rest = [scoped];
    var backq = [];
    enumtype = type;
    while (rest.length) {
        var s = rest.pop();
        backq.push(s);
        if (s.length) rest.push(...s), backq.push(...s);
    }
    while (backq.length) {
        atuoenum(backq.pop());
    }
    outObjects = null;
    return code;
}
var REFMOVE = exports.REFMOVE = 1;
var REFSTRC = exports.REFSTRC = 2;
var REFTYPE = exports.REFTYPE = 4;
exports.createRefId = createRefId;
exports.createRefMap = createRefMap;
exports.enumscoped = atuoenum;