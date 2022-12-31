"use strict";
var getBuildRoot = require("./getBuildRoot");
var getDependence = require("./getDependence");
var memery = require("../efront/memery");
var compile = require("./compile");
var { include_required } = require("./environment");
function build(pages_root, lastBuiltTime, dest_root) {
    var responseTree = Object.create(null);
    var filterMap = Object.create(null);
    var destpathMap = Object.create(null);
    var resolve;
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
        });
        var deps = {};
        var filter = r => {
            if (/[\/\\]/.test(r)) return true;
            deps[r] = true;
            return false;
        };
        datas = datas.map(getDependence).map(async function (a) {
            var required = (a.require || []).filter(filter);
            if (!include_required) return a.map(k => deps[k] = true);
            var required2 = required.map(r => require("path").join(a.dirname, r));
            var required3 = await getBuildRoot(required2, true);
            var map = a.requiredMap;
            required3.forEach((r, cx) => {
                map[required[cx]] = String(r);
            });
            a.concat(required3).forEach(k => deps[k] = true);
        });
        await Promise.all(datas);
        return Object.keys(deps);
    };
    return new Promise(async function (ok) {
        resolve = function () {
            ok(responseTree);
        };
        var roots = [].concat(pages_root || [])
        roots = await getBuildRoot(roots);
        while (roots.length) {
            roots = await builder(roots);
            roots = roots.filter(root => filterMap[root] ? false : filterMap[root] = true);
            if (!memery.EMIT) break;
        }
        return resolve();
    });
}

module.exports = build;