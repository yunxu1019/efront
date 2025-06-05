var isConst = a => a.kind === 'const';
var autoiota = require("./autoiota");
var removeFromList = require("../basic/removeFromList");
var scanner2 = require("./scanner2");
var strings = require("../basic/strings");
var split = require("../basic/$split");
var path = require("path");
var fs = require('fs');
var { STAMP, QUOTED, SCOPED, EXPRESS, COMMENT, pickArgument, remove, splice, insertBefore, VALUE, pickAssignment, createString } = require("./common");
var getExported = function (code) {
    var used = code.used;
    var exports = used.exports;
    if (!exports) {
        if (used.module || code.return) return;
        var consts = [];
        for (var k in used) {
            var u = used[k];
            var o = u[0];
            if (isConst(o)) {
                o.name = o.text;
                consts.push(o);
            }
        }
        return consts;
    }
    var consts = [];
    for (var a of exports) {
        if (isConst(a)) {
            a.name = a.origin;
            consts.push(a);
        }
    }
    return consts;
};
var getAssignedConst = function (a, used) {
    var exp = pickAssignment(a);
    var n = a.next;
    if (!n || n.type !== STAMP || n.text !== "=") return;
    var nn = n.next;
    if (!nn) return;
    if (nn !== exp[exp.length - 1]) return;
    if (nn.type === EXPRESS) {
        var a = nn.text;
        if (/[\.\[]/.test(a)) return;
        var u0 = used[a][0];
        if (u0.kind === 'const') {
            return getAssignedConst(u0, used);
        }
        return;
    }
    if (nn.type !== QUOTED && !nn.isdigit) return;
    return nn;

}
var findConsts = function (code) {
    var consts = getExported(code);
    if (!consts) return;
    autoiota(code);
    var used = code.used;
    var vmap = Object.create(null);
    for (var a of consts) {
        var name = a.name;
        if (/[\.\[]/.test(name)) continue;
        var c = getAssignedConst(a, used);
        if (c) vmap[name] = c;
    }
    return vmap;
};
var setEnvDefinedConsts = function (used, k, v) {
    var uk = used[k];
    for (var a of uk) {
        var t = a.text;
        var dots = /^\.+/.exec(t);
        if (dots) t = t.slice(dots[0].length);
        t = t.slice(a.tack.length);
        var comment = { type: COMMENT, text: `/*${k}*/` };
        if (t) {
            insertBefore(a, comment, { type: EXPRESS, text: t });
        }
        else {
            insertBefore(a, comment);
        }
        a.type = v.type;
        a.text = v.text;
    }
};
var setMapDefinedConsts = function (used, k, consts) {
    var u = used[k];
    if (!u) return;
    for (var o of u) {
        var exp = pickAssignment(o);
        var e = exp[exp.length - 1];
        if (!isSimpleEqual(exp, o)) continue;
        if (e !== o) {
            if (e.prev !== o) continue;
            if (o.text !== k) continue;
            var t = null;
            switch (e.type) {
                default: continue;
                case EXPRESS:
                    t = e.text;
                    t = t.replace(/^\./, '');
                    if (/[\.\[]/.test(t)) continue;
                    break;
                case SCOPED:
                    if (e.entry !== "[" || e.first !== e.last) continue;
                    var t = getOnlyString(e);
                    break;
            }
            if (!t || !(t in consts)) continue;
            var c = consts[t];
            o.type = c.type;
            o.text = c.text;
            if (c.isdigit) o.isdigit = true;
            remove(e);
            continue;
        }
        set1Equal(exp, consts, used);
    }
};
var getMaped = require("./getMaped");
var maped = Object.create(null);
var loadConsts = function (fullpath, commap) {
    if (fullpath in maped) return maped[fullpath];
    maped[fullpath] = null;
    var data = fs.readFileSync(fullpath);
    var code = scanner2(String(data));
    code.fix();
    autoConst.call(commap, code, fullpath);
    var consts = findConsts(code);
    maped[fullpath] = consts;
    return consts;
};


var getOnlyString = function (q) {
    var f = q.first;
    if (f !== q.last || f?.type !== QUOTED || f.length) return;
    var t = strings.decode(f.text);
    return t;
};
var getCopy = function (o) {
    var a = { type: o.type, text: o.text };
    if (o.isdigit) a.isdigit = true;
    return a;
}

var set1Equal = function (exp, consts, used) {
    var f = exp[0];
    if (f.type === SCOPED && f.entry === "{") {
        var o = f.first;
        var collected = [];
        while (o) {
            var exp = pickArgument(o);
            var e = exp[exp.length - 1].next;
            if (exp.length === 1) a: {
                var t = o.text;
                if (/[\.\[]/.test(t)) break a;
                if (!(t in consts)) break a;
                remove(o, e);
                o.kind = 'const';
                var eq = { type: STAMP, text: '=' };
                o.equal = eq;
                o.type = EXPRESS;
                delete o.short;
                collected.push(o, eq, getCopy(consts[t]), { type: STAMP, text: ',' });
                var name = o.origin || o.tack;
                var u = used[name];
                removeFromList(u, o);
                u.unshift(o);
            }
            if (e?.type === STAMP && e.text === ',') e = e.next;
            o = e;
        }
        insertBefore(f, ...collected);
    }
};
var isSimpleEqual = function (exp, o) {
    var f = exp[0];
    var eq = f.equal;
    return eq === f.next && eq?.next === o;
}
var setRequiredConsts = function (code, upath, commap) {
    var requires = code.used.require;
    if (!requires) return code;
    var used = code.used;
    for (var r of requires) {
        var q = r.next;
        if (q?.type !== SCOPED || q.entry !== '(') continue;
        var t = getOnlyString(q);
        if (!t) continue;
        var p = getMaped(upath, commap, t);
        if (!p) continue;
        var consts = loadConsts(p, commap);
        if (!consts) continue;
        var exp = pickAssignment(r);
        if (!isSimpleEqual(exp, r)) continue;
        var e = exp[exp.length - 1];
        if (e !== q) {
            if (e.prev !== q) continue;
            var t = null;
            switch (e.type) {
                default: continue;
                case EXPRESS:
                    t = e.text;
                    t = t.replace(/^\./, '');
                    if (/[\.\[]/.test(t)) continue;
                    break;
                case SCOPED:
                    if (e.entry !== "[" || e.first !== e.last) continue;
                    var t = getOnlyString(e);
                    break;
            }
            if (!t || !(t in consts)) continue;
            insertBefore(r, getCopy(consts[t]), { type: STAMP, text: ',' });
            continue;
        }
        var f = exp[0];
        if (f.type === EXPRESS) {
            setMapDefinedConsts(used, f.text, consts);
            continue;
        }
        set1Equal(exp, consts, used);
    }
    return code;
}

var autoConst = function (code, fullpath, ignoreImported) {
    var vmap = this?.["&"];
    var { envs, used, envs } = code;
    var p = path.dirname(fullpath);
    var mp = vmap?.[p];
    if (mp) {
        for (var k in envs) if (k in mp) {
            setEnvDefinedConsts(used, k, mp[k]);
            delete envs[k];
            delete used[k];
            continue;
        }
    }
    var mmap = this?.["?"];
    if (!mmap) return code;
    var url = mmap[fullpath];
    var upath = split(url);
    if (ignoreImported) return code;
    for (var k in envs) {
        if (k === 'require') {
            setRequiredConsts(code, upath, this);
            continue;
        }
        p = getMaped(upath, this, k);
        if (!p) continue;
        var consts = loadConsts(p, this);
        if (!consts) continue;
        setMapDefinedConsts(used, k, consts)
    }
    return code;
};
autoConst.loadConsts = loadConsts;
module.exports = autoConst;