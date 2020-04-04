"use strict";
var getBuildInfo = require("./getBuildInfo");
var getBuildRoot = require("./getBuildRoot");
var getDependence = require("./getDependence");
var compile = require("./compile");
var { include_required } = require("./environment");
function build(pages_root, lastBuiltTime, dest_root) {
    var responseTree = {};
    var filterMap = {};
    var resolve;
    var builder = function (roots) {
        roots = roots.filter(root => filterMap[root] ? false : filterMap[root] = true);
        if (!roots.length) return resolve();
        roots = roots.sort().map(getBuildInfo).map(function (buildInfo) {
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
            return Promise.all(datas.map(getDependence).map(function (a) {
                if (!include_required) return a.map(k => deps[k] = true);
                return getBuildRoot(a.require || [], true).then(function (required) {
                    var reqMap = Object.create(null);
                    a.required = required.map((k) => k.replace(/\.([tj]sx?|html?|json)$/i, ''));
                    var map = a.requiredMap;
                    if (a.require) a.require.forEach((k, cx) => reqMap[k] = cx);
                    map && Object.keys(map).forEach(k => map[k] = a.required[reqMap[map[k]]] || '');
                    return a.concat(required).map(k => deps[k] = true);
                });
            })).then(function () {
                return Object.keys(deps);
            });
        }).then(builder);
    };
    return new Promise(function (ok) {
        resolve = function () {
            var times = Object.keys(responseTree)
                .sort((k1, k2) => responseTree[k2].time - responseTree[k1].time)
                .slice(0, 3)
                .map(key => responseTree[key]).map(({ url, time }) => ({ url, time }));
            console.log("\r\n", times);
            ok(responseTree);
        };
        getBuildRoot([].concat(pages_root || [])).then(builder);
    });
}

module.exports = build;