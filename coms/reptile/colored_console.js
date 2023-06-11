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
var colorReg = /<(\/?)([a-z][\w]*)\>/ig;
var renderColor = function (obj) {
    var colorpath = [];
    return String(obj).replace(colorReg, function (_, e, c) {
        if (!c || c.length < 3 || !getColor(c)) return _;
        if (e) {
            colorpath.pop();
            c = colorpath[colorpath.length - 1];
        }
        else colorpath.push(c);
        if (c) var color = getColor(c);
        var res = [];
        if (e) res.push(colors.Reset);
        if (color) res.push(color);
        if (res.length) return res.join('');
        return _;
    });
};

var write = function (hasNewLine, str) {
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
        str = String(str).replace(/\x1b\[\d+m/g, '').replace(/\b/g, '');
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
        var str = [time_stamp, label, ...args.map(a => renderColor(a))].join(" ");
        write1(hasNewLine, str);
    };
    colored[log] = logger;
});
var write1 = function (hasNewLine, str) {
    drop.cancel();
    str = renderColor(str);
    write(hasNewLine, str);
};
var formatRows = function (arg, rows, deep, entry, leave) {
    if (rows.length === 0) return entry + leave;
    var ci = circleobjs.indexOf(arg);
    if (ci >= 0) {
        entry = `<cyan><引用点 *${ci + 1}></cyan> ` + entry;
    }
    if (deepobjs.length === 0) circleobjs.splice(0, circleobjs.length);
    var space = new Array(deep).join("    ");
    var deepspace = new Array(deep + 1).join("    ");
    var lens = rows.slice(0, 100).map(r => r.replace(colorReg, '').replace(/[\u00ff-\uffff]/g, '00').length);
    var maxLength = Math.max(...lens) + 2;
    var itemcount = (process.stdout.columns - deepspace.length - 10) / maxLength | 0;
    if (rows.length > itemcount) {
        if (itemcount * itemcount > rows.length + process.stdout.columns) itemcount = Math.ceil(Math.sqrt(rows.length + process.stdout.columns));
        if (itemcount > 20) itemcount = 20;
        else if (itemcount > 10) itemcount = 10;
        else if (itemcount > 5) itemcount = 5;
    }
    if (itemcount < 1) itemcount = 1;
    var hasNextLine = false;
    var isArray = arg instanceof Array;
    for (var r of rows) {
        if (/[\r\n\u2028\u2029]/.test(r)) {
            itemcount = 1;
            hasNextLine = true;
            break;
        }
    }
    if (!hasNextLine && deepspace.length + maxLength * rows.length < process.stdout.columns)
        return `${entry} ${rows.join(", ")} ${leave}`;
    var res;
    if (itemcount <= 1) {
        res = rows;
    }
    else {
        var maxLength = Array(itemcount).fill(0);
        for (var cy = 0, dy = itemcount; cy < dy; cy++) {
            for (var cx = cy, dx = rows.length - 1; cx < dx; cx += itemcount) {
                if (maxLength[cy] < lens[cx]) maxLength[cy] = lens[cx];
            }
        }
        maxLength = maxLength.map(i => i + 2);
        res = [];
        if (isArray) {
            for (var cx = 0, dx = rows.length; cx < dx; cx += itemcount) {
                res.push(rows.slice(cx, cx + itemcount).map((r, i) => {
                    return Array(maxLength[i] - lens[cx + i] + 1).join(" ") + r;
                }).join(', '));
            }
        }
        else {
            for (var cx = 0, dx = rows.length; cx < dx; cx += itemcount) {
                res.push([rows[cx], ...rows.slice(cx + 1, cx + itemcount).map((r, i) => {
                    return Array(maxLength[i] - lens[cx + i] + 1).join(" ") + r;
                })].join(', '));
            }
        }
    }
    return `${entry}\r\n${deepspace + res.join(",\r\n" + deepspace)}\r\n${space}${leave}`
};
var deepobjs = [];
var circleobjs = [];
var format = function (arg, deep = 0) {
    deep++;
    if (arg === null) return String(arg);
    if (typeof arg === 'string') {
        if (deep > 1) return "<green>" + strings.encode(arg) + "</green>";
        return arg;
    }
    if (typeof arg === 'function') return `<cyan>[${arg.__proto__.constructor.name}${arg.name ? ": " + arg.name : " (匿名)"}]</cyan>`;
    if (/^(number|boolean)$/.test(typeof arg)) return '<yellow>' + arg + "</yellow>";
    if (arg === undefined) return "<gray>undefined</gray>";
    if (typeof arg === "object") {
        if (deepobjs.indexOf(arg) >= 0) {
            var ci = circleobjs.indexOf(arg);
            if (ci < 0) ci = circleobjs.length, circleobjs.push(arg);
            return `<cyan>[循环点 *${ci + 1}]</cyan>`;
        }
        if (arg instanceof Error) {
            if (deep > 1) return String(arg.message);
            return String(arg.stack || arg.message);
        }
        if (arg instanceof Buffer || arg instanceof ArrayBuffer || arg instanceof SharedArrayBuffer) {
            var data = new Uint8Array(arg.buffer || arg, arg.byteOffset || 0, arg.byteLength);
            return `<magenta><${arg.__proto__.constructor.name} ${Array.prototype.slice.call(data, 0, 20).map(a => a < 16 ? "0" + a.toString(16) : a.toString(16)).join(' ')}${arg.byteLength > 20 ? ` ... 其他 ${arg.byteLength - 20} 字节` : ''}></megenta>`;
        }
        else if (isFinite(arg.length)) {
            var entry = "[";
            var leave = "]";
            entry = `${arg.__proto__.constructor.name}(${arg.length})${entry}`;
            if (arg.length === 0) return entry + leave;
            if (deep > 3 && deep + arg.length > 5) return `${entry} ... ${leave}`;
            deepobjs.push(arg);
            var res = Array.prototype.slice.call(arg, 0, 100).map(a => format(a, deep));
            deepobjs.pop();
            if (arg.length > res.length) res.push(`<gray>.. 其他 ${arg.length - res.length} 项</gray>`);
            return formatRows(arg, res, deep, entry, leave);
        }
        if (arg.constructor === Date) {
            return '<purple>' + formatDate.call(arg) + "</purple>";
        }
        if (arg.constructor === RegExp) {
            return `<red2>/${arg.source}/</red2><cyan>${arg.flags}</cyan>`;
        }
        var keys = Object.keys(arg);
        var ks = keys.slice(0, 100);
        if (deep > 3 && deep + keys.length > 5) {
            var kvs = [];
            if (keys.length > 0) kvs.push(`<gray>.. 共 ${keys.length} 个属性</gray>`);
        }
        else {
            deepobjs.push(arg);
            var kvs = ks.map(k => `${/[\:'"`\[\{\(\r\n\u2028\u2029]|^\s|\s$/.test(k) ? format(k, deep) : k}: ${format(arg[k], deep)}`);
            deepobjs.pop();
            if (keys.length > ks.length) kvs.push(`<gray>.. 其他 ${keys.length - ks.length} 个属性</gray>`);
        }
        var entry = '{';
        if (arg.constructor && arg.constructor !== Object) entry = arg.constructor.name + entry;
        return formatRows(arg, kvs, deep, entry, '}');
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
colored.format = function (a) {
    a = format(a);
    a = renderColor(a);
    return a;
};
module.exports = colored;