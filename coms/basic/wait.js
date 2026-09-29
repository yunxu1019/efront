var waiter = Symbol('wait');
async function check(call, time = Infinity) {
    // 初始步长0，以10毫秒递增
    // 对于无延时返回的非异步检测函数，有如下效果
    // 一秒约检查14次，最长步长150毫秒
    // 一分钟检查110次，最长步长1.11秒
    // 65秒后，约检查114次，步长1.15秒，指数增长启动
    // 一小时检查849次，最长步长8.5秒
    // 一天检查4157次，最长步长41.58秒
    // 一星期检查10912次，最长步长约113.5秒
    // 31天检查22404次，最长步长约233.3秒
    // 一年检查73993次，最长步长约869.5秒
    // 一年检查73993次，最长步长约869.5秒
    // 一百年检查321867次，最长步长13.78分钟
    // 8919年内不会超出精度，最长步长约为49.71天，总检查613897次
    // 如果公元2026启动，约在公元10496年超出精度，超出精度后，步长增长不再稳定，不会超出原增长幅度，至少增长10毫秒
    var res;
    var step = 0;
    while (!(res = await call()) && time > 0) await new Promise(ok => call[waiter] = setTimeout(ok, step += step >>> 16 | 10)), time -= step;
    return res;
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
