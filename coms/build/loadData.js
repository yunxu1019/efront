"use strict";
var getBuildInfo = require("./getBuildInfo");
var getBuildRoot = require("./getBuildRoot");
var getDependence = require("./getDependence");
var compile = require("./compile");
var { include_required } = require("./environment");
function build(pages_root, lastBuiltTime, dest_root) {
    var responseTree = Object.create(null);
    var filterMap = Object.create(null);
    var destpathMap = Object.create(null);
    var resolve;
    var builder = function (roots) {
        roots = roots.filter(root => filterMap[root] ? false : filterMap[root] = true);
        if (!roots.length) return resolve();
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
        }).map(function (promise) {
            return promise.then(function (response) {
                var {
                    url
                } = response;
                return responseTree[url] = response;
            });
        });
        Promise.all(roots).then(function (datas) {
            var deps = {};
            var filter = r => {
                if (/[\/\\]/.test(r)) return true;
                deps[r] = true;
                return false;
            };
            return Promise.all(datas.map(getDependence).map(function (a) {
                var required = (a.require || []).filter(filter);
                if (!include_required) return a.map(k => deps[k] = true);
                var required2 = required.map(r => require("path").join(a.dirname, r));
                return getBuildRoot(required2, true).then(function (required3) {
                    var map = a.requiredMap;
                    required3.forEach((r, cx) => {
                        map[required[cx]] = String(r);
                    });
                    a.concat(required3).forEach(k => deps[k] = true);
                });
            })).then(function () {
                return Object.keys(deps);
            });
        }).then(builder);
    };
    return new Promise(function (ok) {
        resolve = function () {
            ok(responseTree);
        };
        getBuildRoot([].concat(pages_root || [])).then(builder);
    });
}

module.exports = build;