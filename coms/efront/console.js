"use strict";
var cluster = require("cluster");
var message = require("../message");
var colored = require("../reptile/colored_console");
var colors = require("../reptile/colors");
var toLength = function (n, a = -1) {
    n = String(n);
    if (n.length < 2) {
        n = '0' + n;
    }
    if (a === -1 && n.length < 3) {
        n = '0' + n;
    }
    return colors.BgGray + colors.FgWhite2 + n + colors.BgGray + colors.FgWhite;
};
var formatDate = function () {
    var year = this.getFullYear();
    var month = this.getMonth() + 1;
    var date = this.getDate();
    var hours = this.getHours();
    var minutes = this.getMinutes();
    var seconds = this.getSeconds();
    var milli = this.getMilliseconds();
    milli = toLength(milli);
    var offset = -this.getTimezoneOffset();
    if (offset >= 0) {
        offset = '+' + toLength(offset / 60 | 0, 0) + toLength(offset % 60, 0);
    } else {
        offset = '-' + toLength(-offset / 60 | 0, 0) + toLength(-offset % 60, 0);
    }
    return `${[year, month, date].map(toLength).join('-') + colors.FgGray}T${[hours, minutes, seconds].map(toLength).join(':')}.${milli}${offset}`;
};

var path = require("path");
if (console.type) return;
var version = `efront/(${String(require(path.join(__dirname, "../../package.json")).version).replace(/^(\w*(?:\.\w*)?)[\s\S]*$/, "$1")})`;
var lastLogTime = -Infinity;
var logTime = function (str = '') {
    lastLogTime = new Date;
    var time = formatDate.call(lastLogTime) + ` ${colors.FgGreen2 + version + colors.Reset} ` + str;
    colored.clear(time);
};
var logStamp = function () {
    if (Date.now() - lastLogTime > 600) logTime();
};
colored.time = logTime;


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
        if (log === 'error') {
            logger = function () {
                logStamp();
                colored.error(...arguments);
            };
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