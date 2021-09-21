"use strict";
var colored = Object.create(null);
var path = require("path");
var version = `efront/(${String(require(path.join(__dirname, "../../package.json")).version).replace(/^(\w*(?:\.\w*)?)[\s\S]*$/, "$1")})`;

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
    BgBlack: "\x1b[40m",
    BgRed: "\x1b[41m",
    BgGreen: "\x1b[42m",
    BgYellow: "\x1b[43m",
    BgBlue: "\x1b[44m",
    BgMagenta: "\x1b[45m",
    BgCyan: "\x1b[46m",
    BgWhite: "\x1b[47m",
    FgGray: "\x1b[90m",
    FgRed2: "\x1b[91m",
    FgGreen2: "\x1b[92m",
    FgYellow2: "\x1b[93m",
    FgBlue2: "\x1b[94m",
    FgPurple: "\x1b[95m",
    FgCyan2: "\x1b[96m",
    FgWhite2: "\x1b[97m",
    // test: "\x1b[97m",
    BgGray: "\x1b[100m",
    BgRed2: "\x1b[102m",
    BgGreen2: "\x1b[102m",
    BgYellow2: "\x1b[103m",
    BgBlue2: "\x1b[104m",
    BgMagenta2: "\x1b[105m",
    BgCyan2: "\x1b[106m",
    BgWhite2: "\x1b[107m",
};
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
var lastLogLength = 0, lastLogTime = 0;
var logTime = function () {
    lastLogTime = new Date;
    var time = formatDate.call(lastLogTime) + ` ${colors.FgGreen2 + version + colors.Reset} `;
    write(false, '');
    write(true, time);
};
var logStamp = function () {
    if (new Date - lastLogTime > 600) logTime();
};
var getColor = function (c) {
    switch (c) {
        case "red":
        case "error":
        case "danger":
            return colors.FgRed;
        case "info":
        case "tip":
        case "blue":
            return colors.FgBlue;
        case "green":
            return colors.FgGreen;
        default:
            if (c in colors) return colors[c];
            c = c[0].toUpperCase() + c.slice(1).toLowerCase();
            if (c in colors) return colors[c];
            var k = "Fg" + c;
            if (k in colors) {
                return colors[k];
            }
            c = c.slice(0, 2) + c[2].toUpperCase() + c.slice(3);
            if (c in colors) return colors[c];
    }
    return '';
};
var write = function (hasNewLine, str) {
    str = str.replace(/<([a-z][\w]*)[^\>]*\>([\s\S]*?)<\/\1\>/ig, function (_, c, s) {
        var color = getColor(c);
        if (color) return color + s + colors.Reset;
        return s;
    });
    var width = process.stdout.columns;
    var cleaner = ("\r" + " ".repeat(width - 1) + "\b".repeat(width - 1)).repeat(parseInt(lastLogLength / width) + 1);
    hasNewLine ? process.stdout.write((lastLogLength ? cleaner : "") + str + "\r\n") : process.stdout.write(cleaner + "\r" + str);
    lastLogLength = hasNewLine ? 0 : str.length + str.replace(/[\x20-\xff]/g, "").length;
};
[
    "pass:[ ✔ ]:FgGreen:",
    "fail:[ ✘ ]:FgRed2:",
    "test:[ ∞ ]:FgYellow:",
    "info:提示:FgCyan:",
    "warn:注意:FgYellow:",
    "error:错误:FgRed2:"
].forEach(function (config) {
    var [log, info = log.toUpperCase(), fg, bg] = config.split(":");
    var fgColor = colors[fg] || "",
        bgColor = colors[bg] || "",
        reset = colors.Reset;
    var hasNewLine = /^(warn|error|pass|fail)$/.test(log), logTime = log === 'error';
    var logger = function (...args) {
        var label = fgColor + bgColor + info + reset;
        var time_stamp = '';
        if (logTime) logStamp();
        var str = [time_stamp, label, ...args].join(" ");
        write(hasNewLine, str);
    };
    colored[log] = logger;
});
colored.time = logTime;
colored.type = function (...args) {
    write(false, args.join(' '));
};
colored.log = console.log;
colored.begin = function (c) {
    return write(false, getColor(c));
};
colored.end = function () {
    return write(false, colors.Reset);
};
colored.clear = function () {
    return write(false, '');
};
module.exports = colored;