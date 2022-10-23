var { skipAssignment, EXPRESS, SCOPED, QUOTED, VALUE, STRAP, STAMP, number_reg, equal_reg, createString } = require("./common");
var strings = require("../basic/strings");

var createRefId = function (o) {
    var ids = [], refs = [];
    o.refs = refs;
    while (o) {
        if (o.type === SCOPED) {
            if (o.entry !== '[') break;
            var t = o.lastUncomment;
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
    o.refs = refs;
    return ids.join('');
}
function createRefMap(scoped) {
    var { used } = scoped;
    var refs = Object.create(null);
    for (var k in used) {
        var u = used[k];
        var map = {};
        for (var o of u) {
            var r = createRefId(o);
            if (!map[r]) {
                map[r] = [];
                map[r].wcount = 0;
            }
            map[r].push(o);
            if (o.equal || o.kind) map[r].wcount++;
        }
        refs[k] = map;
    }
    scoped.forEach(createRefMap);
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
    while (o && o.prev) {
        var p = o.prev;
        var maybeprop = o.type === SCOPED && o.entry === "[" || o.type === EXPRESS && /^\./.test(o.text);
        if (p.type === EXPRESS) {
            if (maybeprop || /\.$/.test(p.text)) {
                o = p;
                continue;
            }
            return false;
        }
        if (p.type === VALUE || p.type === QUOTED) {
            if (maybeprop) {
                o = p;
                if (p.entry === '`' && p.prev && (p.prev.type !== STAMP && p.prev.type !== STRAP)) o = p.prev;
                continue;
            }
            return false;
        }
        if (p.type === SCOPED) {
            if (p.entry === "[" && maybeprop) {
                o = p;
                continue;
            }
            if (p.entry === "(" && !maybeprop) {
                if (!p.prev) return false;
                var pp = p.prev;
                if (pp.type === STRAP) {
                    if (/^(?:if|for|with)$/.test(pp.text)) return true;
                    if (/^(?:while)$/.test(pp.text)) {
                        var ppp = pp.prev;
                        if (!ppp || !ppp.prev) return true;
                        var pppp = ppp.prev;
                        if (pppp.type === STRAP && pppp.text === "do") return false;
                        return true;
                    }
                }
                else if (pp.type !== STAMP) {
                    o = pp;
                    continue;
                }
            }
            o = p;
            continue;
        }
        if (p.type === STRAP) {
            if (/^(?:new|void|typeof|delete|await|var|let|const|class|function)$/.test(p.text)) {
                o = p;
                continue;
            }
            if (/^(in|instanceof)/.test(p.text)) {
                o = p.prev;
                continue;
            }
            return false;
        }
        if (p.type === STAMP) {
            if (p.text === ";") return false;
            if (p.text === ',') {
                o = p.prev;
                continue;
            }
            if (/^(?:[!~]|\+\+|\-\-)$/.test(p.text)) {
                o = p;
                continue;
            }
            o = p.prev;
            continue;
        }
        return true;
    }
    return false;
}

function enumref(scoped) {
    if (scoped.isfunc) {
        var { refs } = scoped;
        for (var k in refs) {
            var rs = refs[k];
            for (var rk in rs) {
                var os = rs[rk];
                if (os.wcount !== 1 || os.length < 2) continue;
                var eq = null;
                loop: for (var o of os) {
                    if (o.equal) {
                        if (o.equal.text !== '=') break;
                        if (o.queue.kind) break;
                        if (o.queue !== scoped.body) break;
                        if (inCondition(o)) break;
                        o = o.equal.next;
                        var n = skipAssignment(o);
                        var exps = [];
                        do {
                            exps.push(o);
                            o = o.next;
                        } while (o && o !== n);
                        if (exps.length !== 1) break loop;
                        if (exps[0].type === VALUE && number_reg.test(exps[0].text)) {
                            eq = exps[0];
                        }
                    }
                    else {
                        if (!eq) break;
                        o.type = eq.type;
                        o.text = eq.text;
                        removeRefs(o);
                    }
                }
            }
        }
    }
    scoped.forEach(enumref)
}

function atuoenum(scoped) {
    createRefMap(scoped);
    enumref(scoped);
}
module.exports = function main(code) {
    atuoenum(code.scoped)
    return code;
}