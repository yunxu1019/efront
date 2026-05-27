"use strict";
var path = require('path');
var memery = require("../efront/memery");
var compile = require("./compile");
var { include_required, pages_root, rest_coms } = require("./environment");
var isRest = rest_coms ? function (restcoms, p) {
    return getPathIn(restcoms, p);
}.bind(null, rest_coms.map(r => path.join(r[0], r[1]))) : function () { return false };
var isOutside = function (r) {
    return !r || !getPathIn(pages_root, r);
};
function build(pages_root, lastBuiltTime, dest_root) {
    var responseTree = Object.create(null);
    var filterMap = Object.create(null);
    var destpathMap = Object.create(null);
    var resolve;
    var dependenceMap = Object.create(null);
    var restRequired = Object.create(null);
    var builder = async function (roots) {
        roots = roots.sort().map(getBuildInfo).filter(a => {
            if (!a || !a.destpath) return false;
            var destpath = a.destpath;
            if (!destpathMap[destpath]) {
                destpathMap[destpath] = a;
                return true;
            }
            var url = a.url;
            var a = destpathMap[destpath];
            if (url === a.url) return false;
            dependenceMap[url] = a.url;
            for (var k in responseTree) {
                var dependence = responseTree[k].dependence;
                if (!dependence) continue;
                for (var cx = 0, dx = dependence.length; cx < dx; cx++) {
                    var d = dependence[cx];
                    if (d === url) {
                        dependence[cx] = a.url;
                    }
                }
                var reqMap = dependence.requiredMap;
                for (var r in reqMap) if (reqMap[r] === url) {
                    reqMap[r] = a.url;
                }
            }
            return false;
        }).map(function (buildInfo) {
            return compile(buildInfo, lastBuiltTime, dest_root);
        });
        var datas = await Promise.all(roots);
        datas.forEach(function (r) {
            responseTree[r.url] = r;
            if (r.realpath && isRest(r.realpath) || r.url in restRequired) r.isrest = true;
        });
        var deps = {};
        var filter = r => {
            if (/^\.*[\/\\]/.test(r)) {
                if (isback) console.warn(i18n`不要在后端代码中使用相对路径\r\n    文件：${r}`);
                return true;
            }
            if (isback) r = "+" + r;
            deps[r] = true;
            return false;
        };
        var isback = false;
        var reqs = datas.map(async function (r, i) {
            if (!r.data) return;
            isback = r.isback;
            if (isback) {
                var { required, imported } = r.data;
                required.filter(filter);
                imported.forEach(k => {
                    deps["+" + k] = true;
                });
                return;
            }
            var a = getDependence(r);
            a.forEach((a, i, arr) => {
                if (a in dependenceMap) arr[i] = dependenceMap[a];
            });
            var required = (a.require || []).filter(filter);
            var outside = isOutside(r.realpath);
            if (!include_required && !outside) return a.map(k => deps[k] = true);
            var required2 = required.map(r => /^\./.test(r) ? path.join(a.dirname, r) : r);
            var required3 = await getBuildRoot(required2, true);
            var map = a.requiredMap;
            required3.forEach((r, cx) => {
                map[required[cx]] = String(r);
            });
            var isrest = r.isrest;
            a.concat(required3).forEach(k => {
                deps[k] = true;
                if (isrest) restRequired[k] = true;
            });
        });
        await Promise.all(reqs);
        return Object.keys(deps);
    };
    return new Promise(async function (ok) {
        resolve = function () {
            ok(responseTree);
        };
        var roots = [].concat(pages_root || [])
        roots = await getBuildRoot(roots);

        if (rest_coms) {
            var fs = require("fs").promises;
            var path = require("path");
            var rest = [].concat(rest_coms);
            var finded = Object.create(null);
            while (rest.length) {
                // 只处理一级
                var [p, n] = rest.pop();
                var files = await fs.readdir(path.join(p, n), { withFileTypes: true });
                for (var f of files) {
                    if (/^[#\.]|\_test\.[^\.\/\\]*$/.test(f.name)) continue;
                    if (f.isDirectory()) {
                        rest.push([p, path.join(n, f.name)]);
                    }
                    else {
                        if (!/\.([cm]?jsx?|xht|tsx?|vue)$/i.test(f.name)) continue;
                        var name = path.join(n, f.name).replace(/[\\\/]/g, '$').replace(/\.[^\.\/]+$/, '');
                        if (name in finded) continue;
                        finded[name] = true;
                        roots.push(name);
                    }
                }
            }
        }
        while (roots.length) {
            roots = await builder(roots);
            roots = roots.filter(root => filterMap[root] ? false : filterMap[root] = true);
            if (!memery.EMIT) break;
        }
        return resolve();
    });
}

module.exports = build;