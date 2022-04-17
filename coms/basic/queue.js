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
        var loaded_count = 0;
        var error_count = 0;
        var reject = function (e) {
            error_count++;
            oh(e);
        };
        var next = function () {
            loaded_count++;
            run();
        };
        var run = function () {
            if (error_count && count === 1) return;
            if (cx >= list.length) return Promise.all(result).then(ok, oh);
            var saved_cx = cx;
            var args = list[cx];
            try {
                result[saved_cx] = f.call(context, args, cx++, list);
            } catch (e) {
                oh(e);
                return;
            }
            Promise.resolve(result[saved_cx]).then(next, reject);
        };
        if (count > list.length >> 1) {
            count = list.length >> 1;
        }
        if (!(count >= 1)) {
            count = 1;
        }
        if (list.length === 0) run();
        else while (cx < count) {
            run();
        }
    });
}
module.exports = queue;