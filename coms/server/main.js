"use strict";
/* 
 * 不枝雀
 * 2017-4-5 22:38:04
 */
var cluster = require("../message");
if (cluster.isPrimary) {
    require("./master");
} else {
    require("./waiter");
}