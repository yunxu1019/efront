function $timeout(call, timeout, ...args) {
    setTimeout.apply(null, [function () {
        call.apply(null, arguments);
        render.digest();
    }, ...args])
}