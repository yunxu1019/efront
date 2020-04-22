"use strict";
var cluster = require("cluster");
var message = require("../message");
var colored = require("../basic/colored_console");
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
    "error"
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
module.exports = console;