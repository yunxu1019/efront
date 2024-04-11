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
var referers = [];
counts["#"] = referers;
var referers_cache_drop = 256;
var referers_cache_limit = 1024 + referers_cache_drop;
var updateReferer = function (referer) {
    // 按每个请求最大记录2k数据算，最多用8M内存
    if (referers.length >= referers_cache_limit) {
        referers.splice(0, referers_cache_drop);
    }
    referers.push(referer);
};
var data_file_loaded = false;
loadAsync(data_file).then(c => {
    for (var k in c) {
        if (k === "#") {
            if (referers.length) referers = referers.concat(c["#"]).slice(0, 4096);
            else referers = c["#"];
            counts["#"] = referers;
        }
        else if (k in counts) counts[k] += c[k];
        else counts[k] = c[k];
    }
    data_file_loaded = true;
});
var countTimes = 0;
process.on('exit', function () {
    if (!countTimes) return;
});
var autoSave = lazy(async function () {
    if (!data_file_loaded) return;
    var c = countTimes;
    await saveAsync(data_file, counts);
    if (c === countTimes) countTimes = 0;
}, 60);
module.exports = function count(msg) {
    var { path, indexed, update } = msg;
    if (path === null) return counts;
    if (update) {
        if (!counts[path]) {
            counts[path] = 0;
        }
        counts[path]++;
        countTimes++;
        delete msg.update;
        delete msg.indexed;
        if (indexed) updateReferer(msg);
        autoSave();
    }
    if (!counts[path]) {
        return 0;
    }
    return counts[path];
}