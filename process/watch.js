"use strict";
var start_time = 0;
var fs = require("fs");
var watch_tree = {};
function watch(file, then) {
    watch_tree[file] && watch_tree[file].forEach(function (watcher) {
        watcher.close();
    });
    if (!(then instanceof Function)) {
        delete watch_tree[file];
        return;
    };
    var timmer = 0;
    var watchers = [fs.watch(file, function (a) {
        var args = arguments;
        clearTimeout(timmer);
        timmer = setTimeout(function () {
            try {
                then.apply(null, args);
            } catch (e) {
                console.error("执行失败！", e.message);
            }
        }, 80);
    })];
    watch_tree[file] = watchers;
}
module.exports = watch;