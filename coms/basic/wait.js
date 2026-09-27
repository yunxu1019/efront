var waiter = Symbol('wait');
async function check(call, time = 80, step = +time >>> 8 | 20) {
    while (!(res = await call()) && time > 0) await new Promise(ok => call[waiter] = setTimeout(ok, step)), time -= step
}
async function cancelCheck() {
    clearTimeout(this[waiter][waiter]);
    delete this[waiter][waiter];
}
function wait(call) {
    var res;
    if (isFunction(call)) {
        res = check.apply(this, arguments);
        res[waiter] = call;
        res.cancel = cancelCheck;
    }
    else {
        var timer = 0;
        res = new Promise(ok => timer = setTimeout(ok, call));
        res.cancel = function () {
            clearTimeout(timer)
        };
    }
    return res;
}
