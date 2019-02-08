"use strict";
var getBuildInfo = require("./getBuildInfo");
var getBuildRoot = require("./getBuildRoot");
var getDependence = require("./getDependence");
var compile = require("./compile");
function build(pages_roots, lastBuiltTime, dest_root) {
    var responseTree = {};
    var filterMap = {};
    var resolve;
    var builder = function (roots) {
        roots = roots.filter(root => filterMap[root] ? false : filterMap[root] = true);
        if (!roots.length) return resolve();

        roots = roots.map(getBuildInfo).map(function (buildInfo) {
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
            datas.map(getDependence).map(a => a.concat(a.require).map(a => deps[a] = true));
            return Object.keys(deps);
        }).then(builder);
    };
    return new Promise(function (ok) {
        resolve = function () {
            ok(responseTree);
        };
        getBuildRoot(pages_roots instanceof Array ? pages_roots : [pages_roots]).then(builder);
    });
}
// function build2() {
//     var {
//         APP,
//         PUBLIC_PATH,
//         pages_root
//     } = require("./environment");
//     console.log(APP, PUBLIC_PATH, pages_root);
//     if (!APP) throw new Error("请配置要发布的项目名称！");
//     if (!PUBLIC_PATH) throw new Error("请指定输出路径！");
//     if (!fs.existsSync(PUBLIC_PATH)) fs.mkdirSync(PUBLIC_PATH);
//     if (fs.statSync(PUBLIC_PATH).isFile()) throw new Error("输出路径已存在，并且不是文件夹！");
//     var responseTree = {};
//     var resolve, loadingCount = 0;
//     var builder = function (roots) {
//         roots = roots.filter(root => responseTree[root] ? false : responseTree[root] = true);
//         if (!roots.length) return resolve();
//         loadingCount += roots.length;
//         roots = roots.map(getBuildInfo).map(compile).map(function (promise) {
//             return promise.then(function (response) {
//                 var {
//                     url
//                 } = response;
//                 var deps = getDependence(response);
//                 responseTree[url] = response;
//                 loadingCount--;
//                 builder(deps);
//                 return response;
//             });
//         });
//     };
//     return new Promise(function (ok) {
//         resolve = function () {
//             if (!loadingCount) ok(responseTree);
//         };
//         getBuildRoot([pages_root]).then(builder);
//     });
// }

// var times = [];
// var test = function (build) {
//     var saved_time = new Date;
//     return build().then(function () {
//         times.push(new Date - saved_time);
//     });
// }
// Promise.resolve().then(function () {
//     return test(build2)
// }).then(function () {
//     return test(build);
// }).then(function () {
//     return test(build2);
// }).then(function () {
//     return test(build);
// }).then(function () {
//     return test(build2);
// }).then(function () {
//     return test(build);
// }).then(function () {
//     console.log(times);
//     // [ 2210, 1429, 1236, 1100, 1133, 1061 ] build2=>build
//     // [ 2215, 1468, 1127, 1159, 1065, 1102 ] build=>build2
// });

module.exports = build;