function bind(eventName, bindTo = window) {
    return function (target, eventListener) {
        var off;
        var mount = function () {
            if (off) off();
            off = on(eventName).call(bindTo, target, eventListener);
        };
        var off1 = onmounted(target, mount);
        var off2 = on("remove")(target, function () {
            if (off) off();
            off = null;
        });
        return function () { off1(); off2(); if (off) off(); };
    }
}