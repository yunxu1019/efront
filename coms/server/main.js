"use strict";
/* 
 * 不枝雀
 * 2017-4-5 22:38:04
 */
var cluster = require("cluster");
if (cluster.isMaster) {
    require("./master");
} else {
    require("./waiter");
}