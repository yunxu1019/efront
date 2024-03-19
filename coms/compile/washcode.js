const {
    STRAP,
    STAMP,
    QUOTED,
    EXPRESS,
    SCOPED,
    skipAssignment,
    getDeclared,
    createScoped,
    relink,
    needBreakBetween,
    createExpressList,
} = require("./common");
var {
    createRefId,
    createRefMap
} = require("./autoenum");

var patchExpress = function (exp) {
    var first = exp.first;
    if (first && first.type === QUOTED && /^(['"`])use (strict|strip)\1/i.test(first.text)) {
        exp.marked = true;
    }
};

var getReferedMap = function (o) {
    var res = [];
    while (o) {
        var n = skipAssignment(o);
        var readed = Object.create(null);
        while (o && o !== n) {
            if (o.type === SCOPED) {
                var rfs = getReferedMap(o.first);
                for (var rf of rfs) for (var f in rf) readed[f] = true;
                o = o.next;
                continue;
            }
            else if (o.type !== EXPRESS) {
                o = o.next;
                continue;
            }
            var t = o.text.replace(/^\.+/, '').replace(/^([^\.\[]+)[\s\S]*$/, '$1');
            var id = t + createRefId(o);
            readed[id] = true;
            var o = o.refs[o.refs.length - 1];
            if (!o) break;
            if (o) o = o.next;
        }
        res.push(readed);
        if (o && o.type === STAMP && o.text === ',') {
            o = o.next;
            continue;
        }
        break;
    }
    return res;
};

var addToMap = function (map, k, exp) {
    if (!(k in map)) {
        map[k] = [];
    }
    if (map[k].indexOf(map[k], exp) < 0) map[k].push(exp);
};
var washcode = function (code, pick) {
    var envs = code.envs;
    var explist = createExpressList(code);
    patchExpress(explist[0]);
    var writed_map = Object.create(null), readed_map = Object.create(null);
    var called_map = Object.create(null);
    for (var cx = 0, dx = explist.length; cx < dx; cx++) {
        var exp = explist[cx];
        console.info(i18n`正在处理:${1 + cx}/${dx}`);
        var scoped = createScoped(exp);
        var refs = createRefMap(scoped);
        var used = scoped.used;
        var readed = Object.create(null);
        var writed = Object.create(null);
        var called = Object.create(null);
        for (var k in used) {
            if (k in refs) {
                var ref = refs[k];
                for (var k1 in ref) {
                    var r = ref[k1];
                    var key = k + k1;
                    if (r.ccount > 0) {
                        called[key] = true;
                        addToMap(called_map, key, exp);
                    }
                    if (r.wcount > 0) {
                        writed[key] = true;
                        addToMap(writed_map, key, exp);
                    }
                    if (r.wcount < r.length) {
                        readed[key] = true;
                        addToMap(readed_map, key, exp);
                    }
                }
            }
        }
        if (scoped.return) {
            for (var r of scoped.return) {
                if (r.isend) continue;
                var rds = getReferedMap(r.next);
                for (var rd of rds) for (var r in rd) {
                    readed[r] = true;
                    addToMap(readed_map, r, exp);
                }
            }
            addToMap(writed_map, 'return', exp);
        }
        for (var s of scoped) {
            if (!s.isfunc) continue;
            var funcbody = s.body;

            var rfs = s.refs;
            var fprev = funcbody.prev;
            var args;
            var [args] = fprev.type === SCOPED ? getDeclared(fprev.first) : getDeclared(fprev);
            var q = funcbody.queue;
            if (q && q.type === SCOPED && q.entry === '(' && (q.length === 3 || q.length === 4 && q.first.type === STRAP && q.first.text === 'function')) {
                do {
                    funcbody = q;
                    q = funcbody.queue;
                } while (q && q.type === SCOPED && q.entry === '(');
            }
            var fnext = funcbody.next;
            var iscalled = fnext && fnext.type === SCOPED && fnext.entry === '(';
            if (iscalled) {
                var rmps = getReferedMap(fnext);
                var argMap = Object.create(null);
                args.forEach((a, i) => {
                    argMap[a] = Object.keys(rmps[i]);
                })
                for (var k in rfs) {
                    if (!(k in argMap)) continue;
                    var u = rfs[k];
                    for (var k of argMap[k]) {
                        for (var k1 in u) {
                            var key = k + k1;
                            var u1 = u[k1];
                            if (u1.wcount > 0) {
                                writed[key] = true;
                                addToMap(writed_map, key, exp);
                            }
                            if (u1.ccount > 0) {
                                called[key] = true;
                                addToMap(called_map, key, exp);
                            }
                            if (u1.wcount < u1.length) {
                                readed[key] = true;
                                addToMap(readed_map, key, exp);
                            }
                        }
                    }
                }
            }
        }
        exp.called = called;
        exp.writed = writed;
        exp.readed = readed;
    }

    var prevent_map = Object.create(null);
    if (!pick) var rest = writed_map["module.exports"] || writed_map.return;
    else if (isArray(pick)) {
        var rest = [];
        for (var pk of pick) for (var k in pk) {
            if (writed_map[k]) for (var w of writed_map[k]) rest.push(w);
            if (called_map[k]) for (var c of called_map[k]) rest.push(c);
        }
    }
    else if (pick in writed_map) {
        var ps = pick.split(".");
        while (ps.length) {
            prevent_map[ps.join(".")] = true;
            ps.pop();
        }
        var rest = writed_map[pick];
    }
    for (var exp of explist) {
        var required = [];
        for (var k in exp.readed) {
            if (k in prevent_map) continue;
            var ws = writed_map[k];
            if (!ws) {
                var ks = k.split(".");
                while (ks.length > 1 && !ws) {
                    ks.pop();
                    ws = writed_map[ks.join('.')];
                }
                if (!ws) {
                    if (!(ks[0] in envs) && !/^(arguments|this|true|false|null)$/.test(ks[0])) console.warn(i18n`检测到错误，无法建立代码关联：${k}`);
                    prevent_map[k] = true;
                    continue;
                }
                if (ks.join(".") in prevent_map) continue;
            }
            for (var w of ws) {
                if (required.indexOf(w) < 0) required.push(w);
            }
        }
        exp.required = required;
    }
    var rest = rest ? rest.slice() : [];
    var readed = Object.create(null);
    var writed = Object.create(null);
    var called = Object.create(null);
    while (rest.length > 0) {
        var p = rest.pop();
        if (p.marked) continue;
        p.marked = true;
        extend(readed, p.readed);
        extend(called, p.called);
        extend(writed, p.writed);
        for (var r of p.required) {
            if (!r.marked) rest.push(r);
        }
    }
    code.called = called;
    code.readed = readed;
    code.writed = writed;
    code.scoped = null;
    code.splice(0, code.length);
    var plist = null;
    for (var exp of explist) {
        if (!exp.marked) continue;
        if (plist && needBreakBetween(plist.last, exp.first)) code.push({ type: STAMP, text: ";" });
        plist = exp;
        for (var e of exp) code.push(e);
    }
    relink(code);
    return code;
}

washcode.createExpressList = createExpressList;
module.exports = washcode;