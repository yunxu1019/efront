"use strict";
var message = require("../message");
var colored = require("../reptile/colored_console");
var colors = require("../reptile/colors");
var console = module.exports = global.console;
var path = require("path");
if (console.type) return module.exports;
var version = `efront/(${String(require(path.join(__dirname, "../../package.json")).version).replace(/^(\w*(?:\.\w*)?)[\s\S]*$/, "$1")})`;
var lastLogTime = -Infinity;
var logTime = function (str = '') {
    lastLogTime = new Date;
    colored.time(lastLogTime, ` ${colors.FgGreen2 + version + colors.Reset} ` + str);
};
var logStamp = function () {
    if (Date.now() - lastLogTime > 600) logTime();
};
colored.stamp = logStamp;

[
    "begin",
    "end",
    "time",
    "type",
    "line",
    "stamp",
    "pass",
    "fail",
    "test",
    "info",
    "warn",
    "error",
    "drop",
    "log",
    "flush"
].forEach(function (log) {
    if (message.isPrimary) {
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
        var logger = function () {
            var args = Array.prototype.map.call(arguments, colored.format);
            message.log({ log, args });
        };
    }
    console[log] = logger;
});