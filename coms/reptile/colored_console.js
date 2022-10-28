"use strict";
var colored = Object.create(null);
var lazy = require("../basic/lazy");
var colors = require("./colors");
var lastLogLength = 0;
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
    str = String(str).replace(/<([a-z][\w]*)[^\>]*\>([\s\S]*?)<\/\1\>/ig, function (_, c, s) {
        var color = getColor(c);
        if (color) return color + s + colors.Reset;
        return s;
    });
    process.stdout.cork();
    var hasNextLine = /[\r\n\u2028\u2029]/.test(str);
    if (process.stdout.isTTY) {
        if (lastLogLength) {
            var width = process.stdout.columns;
            var dx = lastLogLength % width;
            var dy = (lastLogLength - 1) / width | 0;
            process.stdout.moveCursor(-dx, -dy);
            process.stdout.clearScreenDown();
        }
    }
    else {
        if (!hasNewLine && !hasNextLine) str = '';
    }
    hasNewLine && !hasNextLine ? process.stdout.write(str + "\r\n") : process.stdout.write("\r" + str);
    if (hasNextLine) hasNewLine = true;
    if (hasNewLine) {
        lastLogLength = 0;
    } else {
        str = str.replace(/\x1b\[\d+m/g, '').replace(/\b/g, '');
        lastLogLength = str.length + str.replace(/[\x20-\xff]/g, "").length;
    }
    process.stdout.uncork();
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
    var hasNewLine = /^(warn|error|pass|fail)$/.test(log);
    var logger = function (...args) {
        var label = fgColor + bgColor + info + reset;
        var time_stamp = '';
        var str = [time_stamp, label, ...args].join(" ");
        if (queue.length > 1 && !queue[queue.length - 2] && !/[\r\n\u2028\u2029]/.test(queue[queue.length - 1])) {
            queue.pop();
            queue.pop();
        }
        write1(hasNewLine, str);
    };
    colored[log] = logger;
});
var queue = [];
var flush = function () {
    while (queue.length) write(queue.shift(), queue.shift());
};
// var write0 = lazy(flush, -60);
var write1 = function (hasNewLine, str) {
    writeid++;
    // queue.push(hasNewLine, str);
    write(hasNewLine, str);
};
colored.flush = flush;
colored.type = function (...args) {
    write1(false, args.join(' '));
};
var _log = console.log;
colored.log = function () {
    flush();
    _log.apply(console, arguments);
};
colored.begin = function (c) {
    return write1(false, getColor(c));
};
var writeid = 0;
var drop = lazy(function (dropid) {
    if (dropid === writeid) write1(false, "");
}, 160);
colored.drop = function () {
    drop(++writeid);
};
colored.end = function () {
    return write1(false, colors.Reset);
};
colored.clear = function (tag) {
    write1(false, '');
    if (tag) write1(true, tag);
};
module.exports = colored;