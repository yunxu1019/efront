"use strict";
var start_time = 0;
var fs = require("fs");
var watch_tree = {};
function watch(file, then) {
    if (!(then instanceof Function)) {
        watch_tree[file] && watch_tree[file][0].close();
        delete watch_tree[file];
        return;
    };
    if (watch_tree[file]) {
        return watch_tree[file].push(then);
    }
    var timmer = 0;
    var watchers = [fs.watch(file, function (changeType) {
        if (changeType !== "change") return;
        clearTimeout(timmer);
        var args = arguments;
        timmer = setTimeout(function () {
            try {
                watchers.slice(1, watchers.length).forEach(function (watch) {
                    console.log(args);
                    watch.apply(null, args);
                });
            } catch (e) {
                console.error("执行失败！", e.message);
            }
        }, 80);
    }), then];
    watch_tree[file] = watchers;
}
watch.close = function () {
    Object.keys(watch_tree).forEach(watch);
};
module.exports = watch;