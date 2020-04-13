"use strict";
var count = require("../efront/count");
var counts = count() || {};
var countTimes = 0;
process.on('exit', function () {
    if (!countTimes) return;
    try {
        count(counts);
    } catch (e) {
        console.log(e);
        console.error("写入文件失败！");
    }
});

module.exports = function count({ path, update }, then) {
    if (update) {
        if (!counts[path]) {
            counts[path] = 0;
        }
        counts[path]++;
        countTimes++;
    }
    if (!counts[path]) {
        return then && then(0);
    }
    then && then(counts[path]);
}