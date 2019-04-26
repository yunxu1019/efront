"use strict";
var cluster = require("cluster");
var message = require("./message");
var colors = {
    Reset: "\x1b[0m",
    Bright: "\x1b[1m",
    Dim: "\x1b[2m",
    Underscore: "\x1b[4m",
    Blink: "\x1b[5m",
    Reverse: "\x1b[7m",
    Hidden: "\x1b[8m",
    FgBlack: "\x1b[30m",
    FgRed: "\x1b[31m",
    FgGreen: "\x1b[32m",
    FgYellow: "\x1b[33m",
    FgBlue: "\x1b[34m",
    FgMagenta: "\x1b[35m",
    FgCyan: "\x1b[36m",
    FgWhite: "\x1b[37m",
    FgGray: "\x1b[90m",
    BgBlack: "\x1b[40m",
    BgRed: "\x1b[41m",
    BgGreen: "\x1b[42m",
    BgYellow: "\x1b[43m",
    BgBlue: "\x1b[44m",
    BgMagenta: "\x1b[45m",
    BgCyan: "\x1b[46m",
    BgWhite: "\x1b[47m",
};
var lastLogLength = 0;
[
    "info:提示:FgBlue:",
    "warn:警告:FgYellow:",
    "error:错误:FgWhite:BgRed"
].forEach(function (config) {
    var [log, info = log.toUpperCase(), fg, bg] = config.split(":");
    var fgColor = colors[fg] || "",
        bgColor = colors[bg] || "",
        reset = colors.Reset;
    if (cluster.isMaster) {
        var toLength = function (n) {
            n = String(n);
            if (n.length < 2) {
                n = '0' + n;
            }
            return n;
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
            if (milli.length < 3) {
                milli = '0' + milli;
            }
            var offset = -this.getTimezoneOffset() / 60;
            if (offset > 0) {
                offset = '+' + toLength(offset);
            } else if (offset < 0) {
                offset = '-' + toLength(-offset);
            } else {
                offset = '';
            }
            return `${[year, month, date].map(toLength).join('-')}T${[hours, minutes, seconds].map(toLength).join(':')}.${milli}Z${offset}`;
        };
        var logger = function (...args) {
            var label = colors.Bright + fgColor + bgColor + info + reset;
            var time_stamp = colors.FgGray + formatDate.call(new Date) + reset;
            var str = [label, time_stamp, ...args].join(" ");
            var width = process.stderr.columns;
            var hasNewLine = /^(warn|error)$/.test(log);
            var cleaner = ("\r" + " ".repeat(width - 1) + "\b".repeat(width - 1)).repeat(parseInt(lastLogLength / width) + 1);
            hasNewLine ? process.stderr.write((lastLogLength ? cleaner : "") + str.trim() + "\r\n") : process.stderr.write(cleaner + "\r" + str);
            lastLogLength = hasNewLine ? 0 : str.length + str.replace(/[\x00-\xff]/g, "").length;
        };
    } else {
        var logger = function (...args) {
            message.log({ log, args: args.map(a => String(a)) });
        };
    }
    console[log] = logger;
})