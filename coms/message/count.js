"use strict";
var { loadAsync, saveAsync } = require("../server/userdata");
var lazy = require("../basic/lazy");
/**
 * 只在主线程中使用
 */
var data_file = "count.jsam";
if (require("cluster").isWorker || !require("worker_threads").isMainThread) {
    throw i18n`只在主线程中使用`;
}
var counts = {};
loadAsync(data_file).then(c => {
    for (var k in c) {
        if (k in counts) counts[k] += c[k];
        else counts[k] = c[k];
    }
});
var countTimes = 0;
process.on('exit', function () {
    if (!countTimes) return;
});
var autoSave = lazy(async function () {
    var c = countTimes;
    await saveAsync(data_file, counts);
    if (c === countTimes) countTimes = 0;
}, 60);
module.exports = function count({ path, update }) {
    if (path === null) return counts;
    if (update) {
        if (!counts[path]) {
            counts[path] = 0;
        }
        counts[path]++;
        countTimes++;
        autoSave();
    }
    if (!counts[path]) {
        return 0;
    }
    return counts[path];
}