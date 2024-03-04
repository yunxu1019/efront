var mark = require("./mark");
if (console.format) {
    var gray = console.format('<gray>;</gray>').split(';');
    var green = console.format('<green>;</green>').split(';');
    var crack = console.format('<red2>;</red2>').split(';');
}
else {
    var gray = [, ,];
    var green = [, ,];
    var crack = [, ,];
}
var dump = function (a, msg) {
    if (a instanceof Object) console.error('属性错误'), console.log(msg ? msg + " " : "  {\r\n", Object.keys(a).map(k => `  ${k}${gray.join(':')}\r\n      ${a[k]}`).join('\r\n') + "\r\n }");
    else if (msg) console.log(msg + ":", a);
    else console.log(a);
};
var colorString = function (s, color1, e, color2) {
    s = String(s);
    e = String(e);
    var [c0, c1] = color1;
    var [r0, r1] = color2;
    if (s.indexOf(c1) === 0 && e.indexOf(r1) === 0) s = s.slice(c1.length);
    else s = c0 + s;
    if (s.lastIndexOf(c0) === s.length - c0.length && e.lastIndexOf(r0) === e.length - r0.length) {
        s = s.slice(0, s.length - c0.length);
    }
    else s += c1;
    return s;
}
var assert = function (result, expect, log = dump) {
    var errors = {}, hasCollect;
    var collect = function (k, args) {
        hasCollect = true;
        if (args) return function () {
            errors = `结果 (${args}) 应为 ${JSON.stringify(k)}`;
        }
        if (k === undefined) return function () {
            var color1 = console.format("<bgred>; </bgred>").split(";");
            var color2 = console.format("<bgblue>; </bgblue>").split(";");
            var color3 = console.format("<cyan>;</cyan>").split(";");
            mark.setTag1(color1[1], color1[0]);
            mark.setTag2(color2[1], color2[0]);
            var [r, e] = mark.pair(result, expect);
            var s = r;
            r = colorString(r, color1, e, color2);
            e = colorString(e, color2, s, color1);
            errors = `${color3[0]}结果  ${color3[1]}${r}\r\n      ${color3[0]}应为  ${color3[1]}${e}\r\n`;
        };
        return function (error) {
            if (error instanceof Object) {
                Object.keys(error).forEach(y => {
                    var e = y;
                    errors[`${gray.join('[')}${green.join(k)}${gray.join("]->")}` + e] = error[y];
                })
            } else {
                errors[gray.join("[") + crack.join(k) + gray.join("]")] = error;
            }
        };
    };
    var res = false;
    if (result === expect) {
        res = true;
    }
    else if (typeof result === "number" && typeof expect === "number") {
        var e = (result - expect) * (result - expect) / Math.sqrt(result * result + expect * expect);
        if (e < 1e-14) res = true;
    }
    else if (expect instanceof Date) {
        if (result instanceof Date)
            res = assert(+expect, +result, collect());
    } else if (expect instanceof Array) {
        if (result instanceof Array && result.length === expect.length) {
            res = true;
            for (var cx = 0, dx = expect.length; cx < dx; cx++) {
                res = res && assert(result[cx], expect[cx], collect(cx));
            }
        }
    } else if (expect instanceof Function) {
        res = expect(result, (...args) => (b) => assert(result.apply(null, args), b, collect(b, args)), collect(`()`)) !== false;
    } else if (expect instanceof Object && result instanceof Object) {
        var res = true;
        for (var k in expect) {
            res = res && assert(result[k], expect[k], collect(k));
        }
    }
    if (!res) {
        if (!hasCollect) collect()();
        if (typeof log === 'function') log(errors);
        else dump(errors, log);
    }
    return res;
}
module.exports = assert;