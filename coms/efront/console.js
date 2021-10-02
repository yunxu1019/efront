"use strict";
var cluster = require("cluster");
var message = require("../message");
var colored = require("./colored_console");
if (console.type) return;
[
    "begin",
    "end",
    "time",
    "type",
    "pass",
    "fail",
    "test",
    "info",
    "warn",
    "error",
    "drop",
    "flush"
].forEach(function (log) {
    if (cluster.isMaster) {
        var logger = colored[log];
    } else {
        var logger = function (...args) {
            message.log({ log, args: args.map(a => String(a)) });
        };
    }
    console[log] = logger;
});
console.log = colored.log;
module.exports = console;