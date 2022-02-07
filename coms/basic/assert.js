var dump = function (a) {
    if (a instanceof Object) console.error('对象的属性不符合'), console.log("  ", a);
    else console.error(a);
};
var assert = function (result, expect, log = dump) {
    var errors = {}, hasCollect;
    var collect = function (k, args) {
        hasCollect = true;
        if (args) return function () {
            errors = `Except (${args}) to be ${JSON.stringify(k)}`;
        }
        if (k === undefined) return function () {
            errors = `Except ${result} to be ${expect}`;
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
        if (log) log(errors);
    }
    return res;
}
module.exports = assert;