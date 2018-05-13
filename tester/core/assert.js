var assert = function (result, expect, log = console.error) {
    var errors = {}, hasCollect;
    var collect = function (k) {
        hasCollect = true;
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
    } else if (expect instanceof Date) {
        if (result instanceof Date)
            res = assert(+expect, +result, collect());
    } else if (expect instanceof Array) {
        if (result instanceof Array && result.length === expect.length) {
            res = true;
            for (var cx = 0, dx = expect.length; cx < dx; cx++) {
                res = res && assert(result[cx], expect[cx], collect(cx));
            }
        }
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