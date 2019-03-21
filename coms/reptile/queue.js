function queue(list, count = 1, context = null) {
    var f = this;
    return new Promise(function (ok) {
        var cx = 0;
        var run = function () {
            if (cx >= list.length) return ok();
            var args = list[cx++];
            Promise.resolve(f.call(context, args)).then(run).catch(run);
        };
        if (!(count >= 1)) {
            count = 1;
        }
        if (count > list.length >> 1) {
            count = list.length;
        }
        while (count-- > 0) {
            run();
        }
    });
}