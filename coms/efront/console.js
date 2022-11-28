"use strict";
var cluster = require("cluster");
var message = require("../message");
var colored = require("../reptile/colored_console");
var colors = require("../reptile/colors");

var path = require("path");
if (console.type) return;
var version = `efront/(${String(require(path.join(__dirname, "../../package.json")).version).replace(/^(\w*(?:\.\w*)?)[\s\S]*$/, "$1")})`;
var lastLogTime = -Infinity;
var logTime = function (str = '') {
    lastLogTime = new Date;
    colored.time(lastLogTime, ` ${colors.FgGreen2 + version + colors.Reset} ` + str);
};
var logStamp = function () {
    if (Date.now() - lastLogTime > 600) logTime();
};

[
    "begin",
    "end",
    "time",
    "type",
    "line",
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
        if (log === 'error') {
            logger = function () {
                logStamp();
                colored.error(...arguments);
            };
        }
        else if (log === 'time') {
            logger = logTime;
        }
    } else {
        var logger = function (...args) {
            message.log({ log, args: args.map(a => String(a)) });
        };
    }
    console[log] = logger;
});
console.log = colored.log;
module.exports = console;