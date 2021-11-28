function bind(eventName, bindTo = window) {
    return function (target, eventListener) {
        var off;
        var off1 = on("append")(target, function () {
            if (off) off();
            off = on(eventName).call(bindTo, target, eventListener);
        });
        var off2 = on("remove")(target, function () {
            if (off) off();
            off = null;
        });
        return function () { off1(); off2(); };
    }
}