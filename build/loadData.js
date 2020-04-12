"use strict";
var getBuildInfo = require("./getBuildInfo");
var getBuildRoot = require("./getBuildRoot");
var getDependence = require("./getDependence");
var compile = require("./compile");
var { include_required } = require("./environment");
function build(pages_root, lastBuiltTime, dest_root) {
    var responseTree = Object.create(null);
    var filterMap = Object.create(null);
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
                    var requiredMap = a.requiredMap;
                    if (a.require) a.require.forEach((k, cx) => reqMap[k] = cx);
                    var destMap = {};
                    if (requiredMap) {
                        Object.keys(requiredMap).forEach(k => {
                            var v = requiredMap[k];
                            destMap[k] = v.replace(/\.([tj]sx?|html?|json)$/i, '');
                        });
                        Object.assign(requiredMap, destMap);
                    }
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
                .map(key => responseTree[key]);
            var getLength = url => String(url).length + String(url).replace(/[^\u01ff-\uffff]/g, '').length;
            var maxLength1 = Math.max.apply(Math, times.map(({ url }) => getLength(url)));
            var maxLength2 = Math.max.apply(Math, times.map(({ time }) => getLength(time)));
            console.time();
            times.forEach(function ({ url, time }, cx) {
                console.info(`url: <green>${url} ${" ".repeat(maxLength1 - getLength(url))}</green> time: ${" ".repeat(maxLength2 - getLength(time))}<green>${time}</green> ms\r\n`);
            });
            ok(responseTree);
        };
        getBuildRoot([].concat(pages_root || [])).then(builder);
    });
}

module.exports = build;