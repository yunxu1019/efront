"use strict";
var message = require("../message");
var colored = require("../reptile/colored_console");
var colors = require("../reptile/colors");
var console = module.exports = global.console;
if (console.type) return module.exports;
var version = `efront/(${String(require("../../package.json").version).replace(/^(\w*(?:\.\w*)?)[\s\S]*$/, "$1")})`;
var lastLogTime = -Infinity;
var logTime = function (str = '') {
    lastLogTime = new Date;
    colored.time(lastLogTime, ` ${colors.FgGreen2 + version + colors.Reset} ` + str);
};
var logStamp = function () {
    if (new Date - lastLogTime > 600) logTime();
};
colored.stamp = logStamp;
var setLogger = message.isPrimary ? function (name, logger) {
    console[name] = logger;
} : function (name, logger) {
    var logger = function () {
        var args = Array.prototype.map.call(arguments, colored.format);
        message.log({ log: name, args });
    };
    console[name] = logger;
};

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
    "wrap",
    "flush"
].forEach(function (log) {
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
    setLogger(log, logger);
});
console.setLogger = setLogger;
console.format = colored.format;