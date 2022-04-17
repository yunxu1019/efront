"use strict";
function queue(list, count = 1, context = null) {
    var f = this;
    if (isFunction(list)) {
        f = list;
        list = this;
    }
    if (isObject(count)) {
        let temp = count;
        count = context || temp;
        context = temp;
    }
    return new Promise(function (ok, oh) {
        var cx = 0;
        var result = [];
        var promised = false;
        var error_count = 0;
        var reject = function (e) {
            error_count++;
            oh(e);
        };
        var next = function () {
            run();
        };
        var run = function () {
            if (error_count && count === 1) return promised = null;
            if (cx >= list.length) return promised = null, count = 0, Promise.all(result).then(ok, oh);
            var saved_cx = cx;
            var args = list[cx];
            try {
                result[saved_cx] = f.call(context, args, cx++, list);
            } catch (e) {
                oh(e);
                return promised = null;
            }
            if (!promised && (!result[saved_cx] || !isFunction(result[saved_cx].then)));
            else Promise.resolve(result[saved_cx]).then(next, reject), promised = true;
        };
        if (count > list.length) {
            count = list.length;
        }
        if (!(count >= 1)) {
            count = 1;
        }
        while (promised === false || count-- > 0) run();
    });
}
module.exports = queue;