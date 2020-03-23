var fs = require("fs");
var watch_tree = {};
function watch(file, then) {
    if (watch.closing) return;
    if (!(then instanceof Function)) {
        var watcher = watch_tree[file];
        if (watcher) {
            delete watch_tree[file];
            watcher.splice(1, watcher.length);
            watcher[0].close();
        }
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
    watch.closeing = true;
    Object.keys(watch_tree).forEach(watch);
    return watch;
};
watch.mounted = watch_tree;
module.exports = watch;