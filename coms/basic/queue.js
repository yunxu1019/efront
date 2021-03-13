"use strict";
function queue(list, count = 1, context = null) {
    var f = this;
    if (list instanceof Function) {
        f = list;
        list = this;
    }
    if (count instanceof Object) {
        let temp = count;
        count = context || temp;
        context = temp;
    }
    return new Promise(function (ok, oh) {
        var cx = 0;
        var result = [];
        var loaded_count = 0;
        var error_count = 0;
        var run = function () {
            if (error_count && count === 1) return;
            if (cx >= list.length && loaded_count >= list.length) return ok(result);
            var saved_cx = cx;
            var args = list[cx];
            Promise.resolve(f.call(context, args, cx++, list)).then(function (data) {
                result[saved_cx] = data;
                loaded_count++;
                run();
            }, function (e) {
                error_count++;
                oh(e);
            });
        };
        if (count > list.length >> 1) {
            count = list.length >> 1;
        }
        if (!(count >= 1)) {
            count = 1;
        }
        while (cx < count) {
            run();
        }
    });
}
module.exports = queue;