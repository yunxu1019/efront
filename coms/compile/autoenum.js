var { skipAssignment, snapSentenceHead, skipSentenceQueue, snapExpressFoot, pickAssignment, EXPRESS, SPACE, SCOPED, QUOTED, VALUE, STRAP, STAMP, LABEL, number_reg, createString } = require("./common");
var strings = require("../basic/strings");

var createRefId = function (o) {
    var ids = [], refs = [];
    var g = o;
    o.refs = refs;
    while (o) {
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
                    ids.push("[*]");
                    break;
                }
            }
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
var maplist = function (u) {
    var map = Object.create(null);
    for (var o of u) {

        if (o[mapkey]) continue;
        o[mapkey] = true;
        var r = createRefId(o);

        if (!map[r]) {
            map[r] = [];
            map[r].wcount = 0;
            map[r].ccount = 0;
        }
        var m = map[r];
        m.push(o);
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
                else if (enumtype & REFMOVE) m.wcount++;
            }
            else {
                if (o.equal) m.wcount++;
            }
        }
        else if (enumtype & REFSTRC) {
            if (o.enumref && o.enumref !== m.enumref) m.wcount++, m.enumref = o.enumref;
        }
        if (o.called) m.ccount++;
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
        if (p.type === STAMP) {
            if (p.text === ";") break;
            if (/^[\?\:]$/i.test(p.text)) {
                if (p.isExpress) incondition = true;
                else incondition = ":";
                break;
            }
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
function enumref(refitem, scoped) {
    if (enumtype === REFMOVE) {
        var c = 0;
        for (var rk in refitem) {
            c++;
            var a = refitem[rk];
            if (a.ccount > 0) return;
        }
        var a = refitem[""];
        if (a && c > 1) {
            if (a.wcount < a.length) return;
        }
    }
    for (var rk in refitem) {
        var os = refitem[rk];
        var wcount = os.wcount;
        if (wcount < 1 || os.length <= wcount) continue;
        var eq = null, sc = null, tp = null;
        var qs = null, cq = null, oe = Infinity;
        loop: for (var o of os) {
            if (o[ignore]) {
                if (REFTYPE & enumtype) {
                    o.typeref = tp;
                }
                continue;
            }
            if (
                REFTYPE & enumtype && tp === null ||
                REFMOVE & enumtype && eq === null ||
                REFSTRC & enumtype && sc === null
                || o.equal
            ) {
                if (!o.equal) continue;
                if (!wcount) break;
                if (enumtype & REFSTRC) {
                    if (o.enumref) {
                        sc = o.enumref;
                        cq = o.queue;
                        qs.push([cq, o, oe]);
                    }
                    continue;
                }
                tp = eq = sc = null;
                oe = Infinity;
                qs = [], cq = null;
                if (o.equal.text !== "=") {
                    continue;
                }
                wcount--;
                var q = o.queue;
                if (inOperatorLeft(q)) continue;
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
                                    if (fc > 1) continue loop;
                                }
                                f = f.next;
                            }
                            [q, oe] = getConditionBlock(q.queue, q);
                        }
                        else if (q === scoped.head) continue loop;
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
                if (enumtype & REFMOVE) {
                    if (wcount > 0) continue;
                    o = o.equal.next;
                    var n = skipAssignment(o);
                    if (!o || n !== o.next) break loop;
                    if (o.type === VALUE && o.isdigit) {
                        eq = o;
                        qs.push([q, o, oe]);
                        cq = q;
                    }
                    continue;
                }
                if (enumtype & REFTYPE) {
                    if (o.typeref) {
                        tp = o.typeref;
                        if (isObject(tp)) tp = tp.typeref;
                        cq = q;
                        qs.push([cq, o, oe]);
                    }
                    continue;
                }
                continue;
            }
            if (o.queue !== cq) {
                do {
                    var oq = o.queue;
                    while (oq && oq !== cq) oq = oq.queue;
                    if (oq) break;
                    if (!oq) {
                        if (qs.length) [cq, eq, oe] = qs.pop();
                        else cq = qs = null;
                    }
                } while (cq);
                if (!cq) {
                    tp = sc = eq = null;
                    continue;
                }
            }
            if (o.start > oe) {
                tp = eq = sc = null;
                continue;
            }

            if (o.kind) {
                if (enumtype & REFTYPE) {
                    if (o.typeref) {
                        tp = o.typeref;
                        if (isObject(tp)) tp = tp.typeref;
                        continue;
                    }
                }
            }
            else if (o.enumref) {
                if (enumtype & REFSTRC) {
                    sc = o.enumref;
                    continue;
                }
            }
            else {
                if (enumtype & REFTYPE) {
                    if (tp) {
                        o.typeref = tp;
                        continue;
                    }
                }
                if (enumtype & REFSTRC) {
                    if (sc) {
                        o.enumref = sc;
                        continue;
                    }
                }
                if (enumtype & REFMOVE) {
                    if (!eq) continue;
                    if (o.short) continue;
                    // var 替换前 = createString(pickAssignment(o));
                    o.type = eq.type;
                    o.isdigit = true;
                    o.text = eq.text;
                    // var 替换后 = createString(pickAssignment(o));
                    removeRefs(o);
                }
            }
        }
    }
}
function atuoenum(scoped) {
    var { used, caps } = scoped;
    mapkey = Symbol('enumed');
    for (var k in caps) {
        var rs = maplist(used[k]);
        enumref(rs, scoped);
    }
    for (var k in caps) {
        for (var o of used[k]) {
            delete o[mapkey];
        }
    }
}
var enumtype = 0;
var exports = module.exports = function main(code, type = REFMOVE) {
    var rest = [code.scoped];
    enumtype = type;
    while (rest.length) {
        var s = rest.pop();
        if (s.length) rest.push(...s);
        atuoenum(s);
    }
    return code;
}
var REFMOVE = exports.REFMOVE = 1;
var REFSTRC = exports.REFSTRC = 2;
var REFTYPE = exports.REFTYPE = 4;
exports.createRefId = createRefId;
exports.createRefMap = createRefMap;
exports.enumscoped = atuoenum;