function queue(list, count = 1, context = null) {
    var f = this;
    return new Promise(function (ok) {
        var cx = 0;
        var result = [];
        var loaded_count = 0;
        var error_count = 0;
        var run = function () {
            if (cx >= list.length && loaded_count >= list.length) return ok(result);
            var saved_cx = cx;
            var args = list[cx++];
            Promise.resolve(f.call(context, args)).then(function (data) {
                result[saved_cx] = data;
            }).catch(function () {
                error_count++;
            }).then(function () {
                loaded_count++;
            }).then(run);
        };
        if (count > list.length >> 1) {
            count = list.length >> 1;
        }
        if (!(count >= 1)) {
            count = 1;
        }
        while (count-- > 0) {
            run();
        }
    }).then(function (res) {
        return res;
    });
}