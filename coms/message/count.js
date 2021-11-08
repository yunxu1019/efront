"use strict";
var { load, save } = require("../server/userdata");
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
    save(data_file, counts);
});

module.exports = function count({ path, update }) {
    if (update) {
        if (!counts[path]) {
            counts[path] = 0;
        }
        counts[path]++;
        countTimes++;
    }
    if (!counts[path]) {
        return 0;
    }
    return counts[path];
}