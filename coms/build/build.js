var path = require('path');
var { include_required, pages_root, rest_coms } = require("./environment");
var isRest = rest_coms ? function (restcoms, p) {
    return getPathIn(restcoms, p);
}.bind(null, rest_coms.map(r => path.join(r[0], r[1]))) : function () { return false };
var isOutside = function (r) {
    return !r || !getPathIn(pages_root, r);
};

var curl;
var islone = false;
var filter = function (r) {
    if (/^\.*[\/\\]/.test(r)) {
        if (islone) {
            if (curl) console.warn(i18n`文件：${curl}`);
            console.warn(i18n`路径：${r}`);
            console.warn(i18n`不要在独立代码中使用相对路径！`);
        }
        return true;
    }
    return false;
};
async function collectDeps(r, responseTree, ignormap) {
    if (!r.data) return;
    var { required = [], refered, imported } = r;
    if (!imported) return;
    islone = r.islone;
    curl = r.url;
    if (r.isback) {
        required.filter(filter);
        return imported.concat(required).map(a => responseTree[a] || BuildInfo.fromAbpi(a));
    }
    imported.forEach((a, i, arr) => {
        if (a in dependenceMap) arr[i] = dependenceMap[a];
    });
    var outside = isOutside(r.realpath);
    var b = imported;
    if (ignormap) b = b.filter(a => {
        if (a in ignormap) return false;
        return ignormap[a] = true;
    })
    b = b.map(a => responseTree[a] || BuildInfo.fromRoot(a));
    if (!include_required && outside) return b;
    if (refered && refered.length) required = required.concat(refered);
    required = required.filter(r => {
        if (filter(r)) return true;
        if (!include_required && isOutside(r)) return;
        if (ignormap) {
            if (ignormap[r]) return;
            ignormap[r] = true;
        }
        if (responseTree[r]) b.push(responseTree[r]);
        else b.push(BuildInfo.fromRoot(r));
    });
    var dirname = path.dirname(r.realpath);
    var required2 = required.map(r => /^\.+[\\\/]/.test(r) ? path.join(dirname, r) : r);
    var required3 = await getBuildRoot(required2, true);
    var map = r.requiredMap = {};
    required3.forEach((r, cx) => {
        map[required[cx]] = String(r);
    });
    var isrest = r.isrest;
    b = b.concat(required3)
    b.forEach(o => {
        if (isrest) restRequired[o.url] = true;
    });
    return b;
}

var restRequired = Object.create(null);
var dependenceMap = Object.create(null);
var destpathMap = Object.create(null);
var filterLoaded = function (a) {
    if (!a || !a.destpath) return false;
    var destpath = a.destpath;
    if (!destpathMap[destpath]) {
        destpathMap[destpath] = a;
        return true;
    }
    var url = a.url;
    var a = destpathMap[destpath];
    if (!(url in this)) {
        this[url] = a;
    }
    if (url === a.url) return false;
    dependenceMap[url] = a.url;
    for (var k in this) {
        var response = this[k];
        var dependence = [].concat(response.refered || [], response.required || [], response.imported || []);
        if (!dependence.length) continue;
        for (var cx = 0, dx = dependence.length; cx < dx; cx++) {
            var d = dependence[cx];
            if (d === url) {
                dependence[cx] = a.url;
            }
        }
        var reqMap = a.requiredMap;
        for (var r in reqMap) if (reqMap[r] === url) {
            reqMap[r] = a.url;
        }
    }
    return false;
}
var storeToTree = function (r) {
    this[r.url] = r;
    if (r.realpath && isRest(r.realpath) || r.url in restRequired) r.isrest = true;
};
async function build(infos, responseTree, ignoreMap = Object.create(null)) {
    infos = infos.map(a => responseTree[a.url] || a).filter(filterLoaded, responseTree);
    for (var cx = 0, dx = infos.length; cx < dx; cx++) {
        var info = infos[cx];
        var info = await compile(info);
        infos[cx] = info;
    }
    infos.forEach(storeToTree, responseTree);
    var rest = [];
    for (var r of infos) {
        var nexts = await collectDeps(r, responseTree, ignoreMap);
        if (nexts) for (var n of nexts) {
            if (!n) continue;
            rest.push(n);
        }
    }
    return rest;
}
build.reset = function () {
    restRequired = Object.create(null);
    dependenceMap = Object.create(null);
    destpathMap = Object.create(null);
}
build.getNexts = collectDeps;