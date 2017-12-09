"use strict";
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
    "warn:\r\n警告:FgYellow:",
    "error:\r\n错误:FgWhite:BgRed"
].forEach(function (config) {
    var [log, info = log.toUpperCase(), fg, bg] = config.split(":");
    var fgColor = colors[fg] || "",
        bgColor = colors[bg] || "",
        reset = colors.Reset;
    var logger = function (...args) {
        var str = args.join(" ");
        var width = process.stderr.columns;
        /\n/.test(str) ? process.stderr.write(str.replace(/[\r\n]+$/,"\r\n")) : process.stderr.write(("\r" + " ".repeat(width - 1) + "\b".repeat(width - 1)).repeat(parseInt(lastLogLength / width) + 1) + "\r" + str);
        lastLogLength = str.length + str.replace(/[\x00-\xff]/g, "").length;
    }
    console[log] = function (...args) {
        return logger(
            colors.Bright + fgColor + bgColor + info + reset,
            colors.FgGray + new Date().toISOString() + reset,
            ...args);
    }
})