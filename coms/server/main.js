"use strict";
/* 
 * 不枝雀
 * 2017-4-5 22:38:04
 */
require("./manager");
if (global.Deno) {
    console.error(i18n`服务器功能目前仅在nodejs环境中可用！`);
    // require("./waiter");
    return;
}
var cluster = require("../message");
var worker_threads = require("worker_threads");
if (cluster.isPrimary) {
    require("./master");
}
else if (worker_threads.isMainThread) {
    require("./waiter");
}
else {
    require("./worker");
}