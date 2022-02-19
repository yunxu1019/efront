const {
    /*-1 */COMMENT,
    /* 0 */SPACE,
    /* 1 */STRAP,
    /* 2 */STAMP,
    /* 3 */VALUE,
    /* 4 */QUOTED,
    /* 5 */PIECE,
    /* 6 */EXPRESS,
    /* 7 */SCOPED,
    /* 8 */LABEL,
    /* 9 */PROPERTY,
    skipAssignment,
    getDeclared,
    createScoped,
    createString,
} = require("./common");
var strings = require("../basic/strings");

/**
 * 按语句分割代码
 */
var createExpressList = function (parsed) {
    var list = [];
    for (var cx = 0, dx = parsed.length; cx < dx; cx++) {
        var o = parsed[cx];
        switch (o.type) {
            case LABEL:
                var exp = [o];
                exp.first = exp[0];
                list.push(exp);
                break;
            case STRAP:
            case SCOPED:
            case EXPRESS:
            case VALUE:
            case QUOTED:
                var o0 = skipAssignment(o);
                var exp = [];
                do {
                    exp.push(o);
                    o = parsed[++cx];
                } while (o0 !== o);
                cx--;
                patchExpress(exp);
                list.push(exp);
                break;
            case COMMENT:
            case SPACE:
            case STAMP:
                list.push([o]);
                break;
            default:
                console.log(o.type, 'type');
        }
    }
    return list;
};
var getFunctionEnd = function (first) {
    if (!first) return false;
    var o = first.next;
    if (!o) return false;
    if (first.type === STRAP && first.text === 'function') {
        if (o.type === EXPRESS) o = o.next;
        if (!o) return false;
        if (o.next && !o.next.next) return o.next;
    }
    return false;
}
var patchExpress = function (exp) {
    if (!exp.first) {
        exp.first = exp[0];
    }
    if (!exp.lastUncomment) {
        exp.lastUncomment = exp[exp.length - 1];
    }
    if (exp.first) {
        delete exp.first.prev;
    }
    if (exp.lastUncomment) {
        delete exp.lastUncomment.next;
    }
    var first = exp.first;
    if (first && first.type === QUOTED && /^(['"`])use strict\1/i.test(first.text)) {
        exp.saved = true;
    }
    if (first && first.type === SCOPED && first.entry === '(') {
        var ff = first.first;
        var fn = first.next;
        if (fn && fn.type === SCOPED && fn.entry === '(') {
            var fe = getFunctionEnd(ff);
            if (fe) {
                first.push(fn);
                var fnn = fn.next;
                if (fnn) {
                    first.next = fnn;
                    fnn.prev = first;
                }
                fn.prev = fe;
                fe.next = fn;
                delete fn.next;
                exp.splice(1, 1);
            }
        }
    }
};

function createExpressKey(exp) {
    var keys = [];
    for (var e of exp) {
        if (e.type === EXPRESS) {
            var t = e.text;
            while (t.length > 0) {
                if (/^\./.test(t)) {
                    if (!keys.length) keys.push('');
                    t = t.slice(1);
                }
                var m = /[^\.\[]+/.exec(t);
                if (m) {
                    m = m[0];
                    keys.push(m);
                    t = t.slice(m.length);
                    continue;
                }
                var m = /^\[(['"`])([\s\S]*?)\1\]/.exec(t)
                if (m) {
                    m = m[0];
                    t = t.slice(m.length);
                    m = m.slice(1, m.length - 1);
                    m = strings.decode(m);
                    keys.push(m);
                    continue;
                }
                break;
            }
        }
    }
    return keys.join('.');
}
function needLeft(o) {
    if (o.type === EXPRESS && /^[\.\[]/.test(o.text)) return true;
    if (o.type === SCOPED && o.entry === '[') return true;
    return false;
}
function needRight(o) {
    if (o.type === EXPRESS && /[\.\]]$/.test(o.text)) return true;
    if (o.type === SCOPED && o.entry === '[') return true;
    return false;
}
function renameId(id, amap) {
    var m = /^[^\.]+/.exec(id);
    if (m) {
        var id0 = m[0];
        var w = amap[id0];
        if (w) return w + id.slice(id0.length);
    }
};
function checkRefered(scope) {
    var { used } = scope;
    var map = Object.create(null);
    for (var k in used) {
        var u = used[k];
        for (var o of u) {
            var right = [];
            var e = o;
            while (e) {
                if (right.length) {
                    if (!needRight(right[right.length - 1]) && !needLeft(e)) break;
                }
                right.push(e);
                e = e.next;
            }
            if (right.length) {
                var key = createExpressKey(right);
                var iswrite = false;
                iswrite = !!o.kind || !!e && e.type === STAMP && /(?<![\!\=])\=$/.test(e.text);
                if (key) map[key] = map[key] | 1 + iswrite;
            }
        }
    }
    var readed, writed;
    for (var k in map) {
        if (map[k] >> 1) {
            if (!writed) writed = Object.create(null);
            writed[k] = true;
        }
        if (map[k] & 1) {
            if (!readed) readed = Object.create(null);
            readed[k] = true;
        }
    }
    for (var s of scope) {
        if (s.isfunc && s.pass) {
            var [writed0, readed0] = checkRefered(s);
            var { pass, args } = s;
            var amap = {};
            for (var cx = 0, dx = pass.length; cx < dx; cx++) {
                amap[args[cx]] = pass[cx];
            }
            for (var w in writed0) {
                var id = renameId(w, amap);
                if (id) writed[id] = true;
            }
            for (var r in readed0) {
                var id = renameId(r, amap);
                if (id) readed[id] = true;
            }
        }
    }

    return [writed, readed];
}

var getroot = function (pick) {
    if (pick) {
        var match = /^[^\.]+/.exec(pick);
        if (match) match = match[0];
        return match;
    }
}

function washcode(code, pick) {
    var avoid = getroot(pick);
    var needs = Object.assign(Object.create(null), pick ? { [pick]: true } : code.envs);
    var explist = createExpressList(code);
    var maped = Object.create(null);
    for (var exp of explist) {
        exp.scoped = createScoped(exp, true);
        if (avoid && avoid in exp.scoped.used) {
            if (code.vars[avoid] && !code.envs[avoid] && !maped[avoid]) {
                exp.saved = true;
                maped[avoid] = true;
            }
        }
        var [writed, readed] = checkRefered(exp.scoped);
        exp.writed = writed;
        exp.readed = readed;
    }
    var count = 0;
    while (count < explist.length) {
        var saved_count = count;
        for (var exp of explist) {
            if (exp.saved) continue;
            if (!exp.first) {
                exp.saved = true;
                count++;
                break;
            }
            var { writed, readed } = exp;
            for (var w in writed) {
                if (w === avoid) continue;
                if (needs[w] || getroot(w) in code.envs) {
                    exp.saved = true;
                    for (var r in readed) {

                        var rs = r.split('.');
                        while (rs.length) {
                            needs[rs.join('.')] = true;
                            rs.pop();
                        }
                    }
                    count++;
                    break;
                }
            }
        }
        if (saved_count === count) break;
    }
    for (var cx = 0, dx = explist.length; cx < dx; cx++) {
        var exp = explist[cx];
        var prev = explist[cx - 1], next = explist[cx + 1];
        if (!exp.first) {
            if (!exp.saved) continue;
            if (exp.length !== 1 || !prev && !next) continue;
            if (exp[0].type === STAMP) {
                if (prev && !prev.saved || next && !next.saved) {
                    exp.saved = false;
                }
                continue;
            }
            if (next && !next.saved) {
                exp.saved = false;
            }
            continue;
        }
        if (!exp.saved) {
            if (exp[0].type === STRAP && /^(let|var|const)$/.test(exp[0].text)) {
                var save = false, inc = 2;
                while (next && next[0].type === STAMP && /^,$/.test(next[0].text)) {
                    next.saved = false;
                    next = explist[cx + inc++];
                    if (!next) break;
                    if (next.saved) {
                        save = true;
                        break;
                    }
                    next = explist[cx + inc++];
                }
                exp.saved = save;
                if (exp.saved) {
                    if (!prev.saved) prev.saved = true;
                    exp.splice(1, exp.length - 1, ' ');
                    patchExpress(exp);
                }
            }
        }
    }
    explist = explist.filter(e => e.saved);
    var text = explist.map(createString).join("");
    return text;
}

module.exports = washcode;