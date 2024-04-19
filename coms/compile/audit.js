var { STAMP, EXPRESS, STRAP, isHalfSentence, skipAssignment, skipFunction, getDeclared, VALUE, STRAP, SCOPED, QUOTED, snapSentenceHead, pickSentence, createString, getBodyWith, getFuncBody } = require("./common");
var addAccessedStart = function (matched, namedMap) {
    var start = +namedMap["#1"];
    var body = getBodyWith(matched[0], 'arguments');
    if (body.reststart < start) return;
    body.reststart = start;
};
var getLoop = function (c, root) {
    var loop = null;
    do {
        var h = snapSentenceHead(c);
        if (h.type === STRAP && /^(do|while|for)$/.test(h.text)) {
            loop = h;
        }
        var p = h.prev;
        while (p?.type === SCOPED && p.entry === "(") {
            h = snapSentenceHead(p);
            if (/^(while|for)$/.test(h.text)) {
                loop = h;
            }
            if (!/^(if|with)$/.test(h.text)) break;
            p = h.prev;
        }
        c = h.queue;
    } while (c?.type === SCOPED && c !== root)
    return loop;
};
var hasRupt = function (a) {
    if (a.type === STRAP && /^(await|yield)$/.test(a.text)) return true;
    if (a.length) {
        var a = a.first;
        while (a) {
            if (a.type === STRAP && /^(class|function|async)$/.test(a.text)) {
                a = skipFunction(a);
            }
            else if (a.type === STAMP && a.text === '=>') {
                a = skipAssignment(a);
            }
            else if (a.type === SCOPED) {
                if (a.entry === "{") {
                    if (!a.isObject) {
                        if (hasRupt(a)) return true;
                    }
                }
                else {
                    if (hasRupt(a)) return true;
                }
                a = a.next;
            }
            else a = a.next;
        }
    }
    return false;
};
var getNodePath = function (a, body) {
    var q = a;
    var qs = [];
    while (q && q !== body) {
        qs.push(q);
        q = q.queue;
    }
    return qs.reverse();
};
var hasRuptBetween = function (a1, a2) {
    var qp1 = getNodePath(a1);
    var qp2 = getNodePath(a2);
    var qc = [];
    for (var cx = 0, dx = Math.min(qp1.length, qp2.length); cx < dx; cx++) {
        var q1 = qp1[cx];
        if (q1 !== qp2[cx]) break;
        qc.push(q1);
    }
    if (!qc.length) return false;
    var qce = qc.pop();
    var q2 = qp2[cx];
    for (var cx = qce.indexOf(q1), dx = qce.indexOf(q2) + 1 || qce.length; cx < dx; cx++) {
        var q = qce[cx];
        if (hasRupt(q)) return true;
    }
    return false;
}
var unMultiple = function (matched) {
    var body = getFuncBody(matched[0]);
    if (!body?.prev || body.checked & 0b10) return;
    body.checked |= 0b10;
    var { envs, used } = body.scoped;
    var undec = [];
    for (var k in envs) {
        var w = [];
        for (var o of used[k]) {
            if (o.text !== k) continue;
            if (o.equal && o.next === o.equal) {
                w.push(o);
            }
        }
        if (!w.length) continue;
        for (var cx = 0, dx = w.length; cx < dx; cx++) {
            var loop = getLoop(w[cx]);
            if (loop && hasRupt(loop)) {
                undec.push(k);
                break;
            }
            if (cx > 0 && hasRuptBetween(w[cx - 1], w[cx])) {
                undec.push(k)
                break;
            }
        }
    }
    if (!undec.length) return;
    var h = snapSentenceHead(body.prev);
    matched = [];
    var declared = null;
    while (h && h !== body) {
        if (h.kind) {
            declared = h.text;
        }
        matched.push(h);
        h = h.next;
    }
    if (!declared) {
        declared = h.type & (STRAP | EXPRESS) && /^(module|exports|return)$/.test(h.tack);
        if (!declared) return;
    }

    matched.suggest = `${createString(matched)}{\r\n      // 不建议在可并行执行的函数中更改外部变量，以防并发调用时出现异常\r\n      // 建议在可并行函数内声明如下变量，并修改用到这些变量的代码\r\n      var ${undec.join(',')};\r\n  }`;
    return matched;
}
var suggest = {
    "while($2[$1++]!==$3)": "while($1<$2.length&&$2[$1++]!==$3)",
    "while($2[$1]!==$3)$1++": "while($1<$2.length&&$2[$1]!==$3)$1++",
    "for(var $1=#1,$2=arguments.length;$1<$2;$1++)": addAccessedStart,
    "for(var $1=#1;$1<arguments.length;$1++)": addAccessedStart,
    "await": unMultiple,
    "yield": unMultiple,
    "arguments"(matched) {
        var m = matched[0];
        var body = getBodyWith(m, 'arguments');
        var head = body.prev;
        if (!head?.length || body.checked & 1) return;
        body.checked |= 1;
        var { used, args } = body.scoped;
        if (!args?.length) return;
        var access_start = body.reststart ?? args?.length;
        var checkNames = ["arguments"];
        a: if (access_start > 0) {
            for (var a of used.arguments) {
                if (a.text !== 'arguments') continue;
                var n = a.next;
                if (!n || n.type !== SCOPED || n.entry !== '[') {
                    access_start = 0;
                    var p = a.prev;
                    while (p && p.type === STAMP && p.text === '=') {
                        var pp = p.prev;
                        if (pp?.type === EXPRESS) {
                            checkNames.push(pp.text);
                        }
                        p = pp.prev;
                    }
                    continue;
                }
                if (n.last && n.last === n.first) {
                    if (n.last.isdigit) {
                        var i = +n.last.text;
                        if (i < access_start) access_start = i;
                    }
                }
            }
        }
        if (access_start >= args.length) return;
        var broken = false;
        var arg_start = Infinity;
        a: for (var a of args) {
            if (access_start > 0) {
                access_start--;
                continue;
            }
            if (typeof a !== 'string') continue;
            for (var u of used[a]) {
                if (u.equal) {
                    var loop = getLoop(u, body);
                    var astart;
                    if (loop) {
                        astart = loop.start;
                    }
                    else {
                        var s = pickSentence(u);
                        astart = s[s.length - 1].end;
                    }
                    if (astart < arg_start) arg_start = astart;
                    broken = true;
                    break a;
                }
            }
        }
        if (!broken) return;
        a: {
            for (var a of checkNames) {
                var args = used[a];
                args = args.filter(a => a.start >= arg_start);
                if (args.length) break a;
            }
            return;
        }
        var h = snapSentenceHead(body);
        var matched = [];
        while (h && h !== body) {
            matched.push(h);
            h = h.next;
        }
        matched.suggest = `${createString(matched.slice(0, matched.length - 1))}(){\r\n      var[${createString(head)}]=arguments;\r\n      // ${i18n`后续代码`}..\r\n  }`;
        return matched;
    },
};

var regSuggest = function (c) {
    if (c.type !== QUOTED) return;
    var flag = /\/(\w+)$/.exec(c.text)?.[1];
    if (!flag || !/g\w*$/.test(flag)) return;
    var h = snapSentenceHead(c);
    if (h.type === STRAP || /^(var|let|const)$/.test(h)) {
        h = h.next;
    }
    if (!h.equal) return;
    var [args] = getDeclared(h);
    var scoped = getBodyWith(c, args[0]).scoped;
    if (!scoped?.await && !scoped.yield) return;
    var matched = [c];
    matched.suggest = `new RegExp(${c.text.slice(0, c.text.length - flag.length)}.source,"${flag}")`;
    return matched;
};

var roles = Object.keys(suggest).map(s => {
    var r = scanner2(s);
    var { used } = r;
    for (var k in used) {
        used[k].forEach(f => {
            if (/^\#\d+$/.test(f.text)) {
                f.isdigit = true;
                f.type = VALUE;
                f.sname = f.text;
            }
            else if (/^\$\d+$/.test(f.text)) {
                f.sname = f.text;
            }
        });
    }
    r.matcher = s;
    s = suggest[s];
    if (typeof s === 'string') r.suggest = scanner2(s);
    else r.suggest = s;
    return r;
}).concat(regSuggest);
var match = function (role, c, nameMap = {}) {
    var temp = role.first;
    var matched = [];
    if (typeof role === 'function') {
        return role(c);
    }
    while (temp) {
        if (temp.type === STRAP && /^(var|let|const)$/.test(temp.text)) {
            if (!c) return;
            temp = temp.next;
            if (!temp) return;
            if (c.type === STRAP && /^(var|let|const)$/.test(c.text)) c = c.next;
        }
        if (!c || c.type !== temp.type) return;
        if (temp.sname) {
            var name = temp.sname;
            if (name in nameMap) {
                if (nameMap[name] !== c.text) return;
            }
            else nameMap[name] = c.text;
        }
        else {
            if (temp.entry !== c.entry || temp.leave !== c.leave || temp.text !== c.text) return;
            if (temp.length) {
                if (temp.length !== c.length) return;
                if (!match(temp, c.first, nameMap)) return;
            }
        }
        temp = temp.next;
        matched.push(c);
        c = c.next;
    }
    if (role.suggest) {
        if (isFunction(role.suggest))
            return role.suggest(matched, nameMap);
        var { used } = role.suggest;
        for (var k in nameMap) {
            if (used[k]) patchlist('', used[k], nameMap[k]);
        }
        matched.suggest = createString(role.suggest);
    }
    return matched;
}
var audit = function (code) {
    code.scoped;
    var checked = [];
    for (var r of roles) {
        var rest = [code];
        while (rest.length) {
            var c = rest.pop();
            if (c.length) {
                var a = c.slice().reverse();
                rest.push.apply(rest, a);
            }
            var m = match(r, c);
            if (!m) continue;
            checked.push(m);
        }
    }
    return checked;
};
