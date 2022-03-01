"use strict";
var { load, save, saveAsync } = require("../server/userdata");
var lazy = require("../basic/lazy");
/**
 * 只在主线程中使用
 */
var data_file = "count.jsam";
if (!require("cluster").isMaster) {
    throw "只在主线程中使用";
}
var counts = load(data_file) || {};
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