"use strict";
var fs = require("fs");
var lazy = require("../basic/lazy");
var watch_tree = {};
var watching = false;
var watch_ = function (file, watchers) {
    if (watchers[0]) return;
    watchers[0] = fs.watch(file, {
        persistent: false,
        recursive: /^(darwin|win32)$/i.test(process.platform)
    }, lazy(function (file, changeType) {
        if (watch_tree[file] !== this) return;
        if (!/^(change|rename)$/i.test(changeType)) return;
        watchers.slice(1, watchers.length).forEach(w => w(file));
    }.bind(watchers, file), 160));
}
var close = function (file) {
    var watcher = watch_tree[file];
    if (watcher) {
        delete watch_tree[file];
        if (watcher[0]) watcher[0].close();
        watcher.splice(0, watcher.length);
    }
};
function watch(file, then) {
    if (!(then instanceof Function)) {
        close(file);
        return;
    };
    if (watch.closing) return;
    if (watch_tree[file]) {
        return watch_tree[file].push(then);
    }
    var watchers = watch_tree[file] = [];
    if (watching) watch_(file, watchers);
    watchers[1] = then;
}
watch.close = function () {
    watch.closeing = true;
    Object.keys(watch_tree).forEach(close);
    return watch;
};
watch.start = function () {
    watching = true;
    for (var k in watch_tree) watch_(k, watch_tree[k]);
}
module.exports = watch;