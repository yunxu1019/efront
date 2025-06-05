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
var findConsts = function (text) {
    var code = scanner2(text);
    code.fix();
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
    for (var a of used[k]) {
        var t = a.text;
        var dots = /^\.+/.exec(t);
        if (dots) t = t.slice(dots[0].length);
        t = t.slice(a.tack.length);
        var comment = { type: COMMENT, text: `/*${k}*/` };
        // if (t) {
        //     insertBefore(a, comment, { type: EXPRESS, text: t });
        // }
        // else {
        //     insertBefore(a, comment);
        // }
        // a.type = v.type;
        // a.text = v.text;
    }
};
var setMapDefinedConsts = function (u, m) {

};
var getMaped = require("./getMaped");
var maped = Object.create(null);
var loadConsts = function (fullpath) {
    if (fullpath in maped) return maped[fullpath];
    var data = fs.readFileSync(fullpath);
    var consts = findConsts(String(data));
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

var setRequiredConsts = function (code, fullpath, commap) {
    var mmap = commap["?"]
    if (!mmap) return code;
    var url = mmap[fullpath];
    var upath = split(url);
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
        var consts = loadConsts(p);
        if (!consts) continue;
        var exp = pickAssignment(r);
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
            setMapDefinedConsts(f.text, consts);
            continue;
        }
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
    }
    return code;
}
var autoConst = function (code, fullpath) {
    var vmap = this?.["&"];
    var { envs, used } = code;
    if (!vmap) return setRequiredConsts(code, fullpath, this);
    var p = path.dirname(fullpath);
    var mp = vmap[p];
    if (!mp) return setRequiredConsts(code, fullpath, this);
    for (var k in envs) {
        if (k === 'require') {
            setRequiredConsts(code, fullpath, this);
            continue;
        }
        if (k in mp) setEnvDefinedConsts(used, k, mp[k]);
    }
    return code;
};
autoConst.findConsts = findConsts;
module.exports = autoConst;