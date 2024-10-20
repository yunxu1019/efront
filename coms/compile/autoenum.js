var { skipAssignment, snapSentenceHead, snapExpressFoot, EXPRESS, SPACE, SCOPED, QUOTED, VALUE, STRAP, STAMP, number_reg, createString } = require("./common");
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
var maplist = function (u) {
    var map = Object.create(null);
    for (var o of u) {
        var r = createRefId(o);
        if (!map[r]) {
            map[r] = [];
            map[r].wcount = 0;
            map[r].ccount = 0;
        }
        var m = map[r];
        if (!o.equal && o.kind) m.unshift(o);
        else m.push(o);
        if (o.equal || o.kind) {
            if (enumtype & REFTYPE) {
                var typeref = o.typeref;
                if (typeref && typeof typeref === 'object') {
                    typeref = typeref.typeref;
                    o.typeref = typeref;
                }
                if (typeref) {
                    if (m.typeref !== typeref) {
                        m.typeref = typeref;
                        m.wcount++;
                    }
                }
                else if (m.typeref) {
                    var n = o.next;
                    o[ignore] = true;
                    if (n.type === STAMP && /^(\+\+|\-\-)$/.test(n.text)) continue;
                    if (/^[\+\-]\=$/.test(n.text)) {
                        var nn = n.next;
                        if (nn && snapExpressFoot(nn) == nn && nn.isdigit && (nn.text & 0x1ff) === +nn.text) continue;
                    }
                    else if (!n || !/[^=!]?=$/.test(n.text)) continue;
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

function inCondition(o) {
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
                    if (!ppp || !ppp.prev) {
                        incondition = true;
                        break;
                    }
                    var pppp = ppp.prev;
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
                incondition = true;
                break;
            }
            o = p.prev;
            continue;
        }
        break;
    }
    return incondition;

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
        if (os.wcount !== 1 || os.length < 2) continue;
        var eq = null, em = null, tp = null;
        loop: for (var o of os) {
            if (o.equal && !o[ignore]) {
                if (o.equal.text !== '=') break;
                if (o.queue.kind) break;
                var q = o.queue;
                if (q !== scoped.body) {
                    if (q.entry === '(' && q.queue === scoped.body) {
                        var qp = q.prev;
                        if (qp?.type === EXPRESS) qp = qp.prev;
                        if (qp && qp.type === STRAP && qp.text === "await") qp = qp.prev;
                        if (qp && qp.type === STRAP && qp.text === 'for') {
                            var f = q.first;
                            var fc = 0;
                            while (f && f !== o) {
                                if (f.type === STAMP && f.text === ";") {
                                    fc++;
                                    if (fc > 1) break loop;
                                }
                                f = f.next;
                            }
                        }
                    }
                    else break;
                }
                if (inCondition(o)) break;
                if (enumtype & REFTYPE) {
                    if (o.typeref) {
                        tp = o.typeref;
                        if (isObject(tp)) tp = tp.typeref;
                        continue;
                    }
                }
                if (enumtype & REFSTRC) {
                    if (o.enumref) {
                        em = o.enumref;
                        continue;
                    }
                }
                if (enumtype & REFMOVE) {
                    o = o.equal.next;
                    var n = skipAssignment(o);
                    if (!o || n !== o.next) break loop;
                    if (o.type === VALUE && o.isdigit) eq = o;
                }
            }
            else if (o.kind) {
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
                    em = o.enumref;
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
                    if (em) {
                        o.enumref = em;
                        continue;
                    }
                }
                if (enumtype & REFMOVE) {
                    if (!eq) break;
                    if (o.short) continue;
                    o.type = eq.type;
                    o.isdigit = true;
                    o.text = eq.text;
                    removeRefs(o);
                }
            }
        }
    }
}
function atuoenum(scoped) {
    var { used } = scoped;
    for (var k in used) {
        var rs = maplist(used[k]);
        enumref(rs, scoped);
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