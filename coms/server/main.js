"use strict";
/* 
 * 不枝雀
 * 2017-4-5 22:38:04
 */
if (global.Deno) {
    console.error("服务器功能目前仅在nodejs环境中可用！");
    return;
}
var cluster = require("../message");
if (cluster.isPrimary) {
    require("./master");
} else {
    require("./waiter");
}