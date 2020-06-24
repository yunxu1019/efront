"use strict";
/**
 * 只在主线程中使用
 */
var count = function () {
    if (!require("cluster").isMaster) {
        throw "只在主线程中使用";
    }
    var fs = require("fs");
    var data_file = require("path").join(__dirname, "../../data/count.json");

    function load() {
        try {
            var data = fs.readFileSync(data_file);
            return JSON.parse(String(data)) || {};
        } catch (e) {
            return {};
        }
    }

    function save(data) {
        data instanceof Object && fs.writeFileSync(data_file, JSON.stringify(data));
    }
    return function (a) {
        return arguments.length > 0 ? save(a) : load();
    }
}();
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