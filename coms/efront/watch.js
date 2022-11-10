"use strict";
var fs = require("fs");
var lazy = require("../basic/lazy");
var watch_tree = {};
function watch(file, then, deep) {
    if (!(then instanceof Function)) {
        var watcher = watch_tree[file];
        if (watcher) {
            delete watch_tree[file];
            watcher[0].close();
            watcher.splice(0, watcher.length);
        }
        return;
    };
    if (watch.closing) return;
    if (watch_tree[file]) {
        return watch_tree[file].push(then);
    }
    var watchers = watch_tree[file] = [];
    watchers[0] = fs.watch(file, {
        persistent: false,
        recursive: /^(darwin|win32)$/i.test(process.platform) && !!deep
    }, lazy(function (file, changeType) {
        if (watch_tree[file] !== this) return;
        if (changeType !== "change") return;
        watchers.slice(1, watchers.length).forEach(w => w(file));
    }.bind(watchers, file), 160));
    watchers[1] = then;
}
watch.close = function () {
    watch.closeing = true;
    Object.keys(watch_tree).forEach(watch);
    return watch;
};
watch.mounted = watch_tree;
module.exports = watch;