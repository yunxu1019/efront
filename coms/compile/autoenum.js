var { skipAssignment, snapSentenceHead, snapExpressFoot, EXPRESS, SCOPED, QUOTED, VALUE, STRAP, STAMP, number_reg, createString } = require("./common");
var strings = require("../basic/strings");

var createRefId = function (o) {
    var ids = [], refs = [];
    var g = o;
    o.refs = refs;
    while (o) {
        if (o.type === SCOPED) {
            if (o.entry !== '[') break;
            var t = o.last;
            if (!t) throw new Error("格式错误");
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
        m.push(o);
        if (o.equal || o.kind) {
            var typeref = o.typeref;
            if (typeref && typeof typeref === 'object') {
                typeref = typeref.typeref;
                o.typeref = typeref;
            }
            if (typeref && typeref !== m.typeref) {
                m.typeref = typeref;
                m.wcount++;
            }
            else if (m.typeref) {
                var n = o.next;
                o[ignore] = true;
                if (n.type === STAMP && /^(\+\+|\-\-)$/.test(n.text)) continue;
                if (/^[\+\-]\=$/.test(n.text)) {
                    var nn = n.next;
                    if (nn && snapExpressFoot(nn) == nn && nn.isdigit && (nn.text & 0x1ff) === +nn.text) continue;
                }
                else if (!n || !/=$/.test(n.text)) continue;
                o[ignore] = false;
                m.wcount++;
            }
            else m.wcount++;
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
            o = p.prev;
            continue;
        }
        break;
    }
    return incondition;

}

function enumref(scoped) {
    var { refs } = scoped;
    for (var k in refs) {
        var rs = refs[k];
        for (var rk in rs) {
            var os = rs[rk];
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
                            if (qp.type === EXPRESS) qp = qp.prev;
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
                    if (o.typeref) {
                        tp = o.typeref;
                        if (isObject(tp)) tp = tp.typeref;
                        continue;
                    }
                    if (o.enumref) {
                        em = o.enumref;
                        continue;
                    }
                    o = o.equal.next;
                    var n = skipAssignment(o);
                    var exps = [];
                    do {
                        exps.push(o);
                        o = o.next;
                    } while (o && o !== n);
                    if (exps.length !== 1) break loop;
                    eq = exps[0];
                    if (eq.type !== VALUE || !eq.isdigit) {
                        eq = null;
                    }
                }
                else {
                    if (tp) {
                        o.typeref = tp;
                        continue;
                    }
                    if (em) {
                        o.enumref = em;
                        continue;
                    }
                    if (!eq) break;
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
    createRefMap(scoped);
    enumref(scoped);
}
var exports = module.exports = function main(code) {
    var rest = [code.scoped];
    while (rest.length) {
        var s = rest.pop();
        if (s.length) rest.push(...s);
        atuoenum(s);
    }
    return code;
}
exports.createRefId = createRefId;
exports.createRefMap = createRefMap;
exports.enumscoped = atuoenum;