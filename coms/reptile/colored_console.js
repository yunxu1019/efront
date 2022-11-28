"use strict";
var colored = Object.create(null);
var lazy = require("../basic/lazy");
var colors = require("./colors");
var strings = require("../basic/strings");
var lastLogLength = 0;
var needNextLine = false;
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
    var colorpath = [];
    str = String(str).replace(/<(\/?)([a-z][\w]*)[^\>]*\>/ig, function (_, e, c) {
        if (e) {
            colorpath.pop();
            c = colorpath[colorpath.length - 1];
        }
        else colorpath.push(c);
        if (c) var color = getColor(c);
        var res = [];
        if (e) res.push(colors.Reset);
        if (color) res.push(color);
        return res.join('');
    });
    process.stdout.cork();
    var hasNextLine = /[\r\n\u2028\u2029]$/.test(str);
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
    if (needNextLine && !/^[\r\n\u2028\u2029]/.test(str)) {
        process.stdout.write("\r\n");
    }
    if (hasNewLine && !hasNextLine) {
        process.stdout.write(str)
        needNextLine = true;
    }
    else {
        process.stdout.write("\r" + str);
        needNextLine = false;
    }
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
        var str = [time_stamp, label, ...args.map(a => format(a))].join(" ");
        write1(hasNewLine, str);
    };
    colored[log] = logger;
});
var write1 = function (hasNewLine, str) {
    drop.cancel();
    write(hasNewLine, str);
};
var format = function (arg, deep = 0) {
    deep++;
    if (typeof arg === 'string') {
        if (deep > 1) return "<green>" + strings.encode(arg) + "</green>";
        return arg;
    }
    if (typeof arg === 'function') return `<cyan>[${arg.__proto__.constructor.name}${arg.name ? ": " + arg.name : " (匿名)"}]</cyan>`;
    if (/^(number|boolean)$/.test(typeof arg)) return '<yellow>' + arg + "</yellow>";
    if (arg === undefined) return "<gray>undefined</gray>";
    if (arg instanceof Array) {
        if (deep > 1) return `[... ${arg.length} 项]`;
        var res = arg.slice(0, 100).map(a => format(a, deep));
        if (arg.length > res.length) res.push(`... 其他 ${arg.length - res.length} 项`);
        return `[${res.join(", ")}]`;
    }
    if (arg instanceof Object) {
        if (arg.constructor === Date) {
            return '<magenta>' + formatDate.call(arg) + "</magenta>";
        }
        var keys = Object.keys(arg);
        var ks = keys.slice(0, 100);
        var kvs = ks.map(k => `${/[\:'"`\[\{\(]/.test(k) ? strings.encode(k) : k}: ${format(arg[k])}`);
        if (keys.length > ks.length) kvs.push(`... 其他 ${keys.length - ks.length} 项`);
        return `${arg.constructor && arg.constructor !== Object ? arg.constructor.name : ''}{ ${kvs.join(', ')} }`;
    }
    return String(arg);
};
var toLength = function (n, a = -1) {
    n = String(n);
    if (n.length < 2) {
        n = '0' + n;
    }
    if (a === -1 && n.length < 3) {
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
    var offset = -this.getTimezoneOffset();
    if (offset >= 0) {
        offset = '+' + toLength(offset / 60 | 0, 0) + toLength(offset % 60, 0);
    } else {
        offset = '-' + toLength(-offset / 60 | 0, 0) + toLength(-offset % 60, 0);
    }
    return `${[year, month, date].map(toLength).join('-')} ${[hours, minutes, seconds].map(toLength).join(':')}.${milli} ${offset}`;
};

colored.time = function (date = new Date, str) {
    write1(true, colors.BgGray + colors.FgWhite2 + formatDate.call(date) + str + colors.Reset);
};

colored.type = function (...args) {
    write1(false, args.map(a => format(a)).join(' '));
};
colored.line = function (...args) {
    write1(true, args.map(a => format(a)).join(' '));
};
var _log = console.log;
colored.log = function () {
    if (lastLogLength > 0) write1(false, '');
    if (needNextLine) needNextLine = false;
    _log.apply(console, arguments);
};
colored.begin = function (c) {
    return write1(false, getColor(c));
};
var drop = lazy(function () {
    write(false, "");
}, 160);
colored.drop = drop;
colored.end = function () {
    return write1(false, colors.Reset);
};
colored.clear = function (tag) {
    write1(false, '');
    if (tag) write1(true, tag);
};
module.exports = colored;