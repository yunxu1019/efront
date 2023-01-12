var mark = require("./mark");
var dump = function (a, msg) {
    if (a instanceof Object) console.error('对象的属性不符合'), console.log(msg ? msg + " " : "  ", a);
    else if (msg) console.error(msg + ":", a);
    else console.error(a);
};
var assert = function (result, expect, log = dump) {
    var errors = {}, hasCollect;
    var collect = function (k, args) {
        hasCollect = true;
        if (args) return function () {
            errors = `结果 (${args}) 应为 ${JSON.stringify(k)}`;
        }
        if (k === undefined) return function () {
            var color1 = "bgred";
            var color2 = "bgblue";
            mark.setTag1(`</${color1}>`, `<${color1}>`);
            mark.setTag2(`</${color2}>`, `<${color2}>`);
            var [r, e] = mark.pair(result, expect);
            r = String(r).trim().replace(/><\//g, "> </");
            e = String(e).trim().replace(/><\//g, "> </");
            errors = `<cyan>结果  </cyan><${color1}>${r}</${color1}>\r\n      <cyan>应为  </cyan><${color2}>${e}</${color2}>\r\n`;
        };
        return function (error) {
            if (error instanceof Object) {
                errors[k] = Object.keys(error).map(k => `${k} >> ${error[k]}`).join("\r\n");
            } else {
                errors[k] = error;
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