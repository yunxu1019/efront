/**
 * 为可能正在加载的元素添加then方法
 * 占用onload onerror complete then 共4个属性
 * @param {Element|Object|any} image;
 */
function awaitable(image, seeker) {
    if (image.complete || image.then) return image;
    var oks = [];
    var ohs = [];
    var resolved = false,
        errored = false,
        error = null;
    var result = image;
    var fire = function () {
        if (resolved || errored) {
            var _oks = oks.splice(0, oks.length);
            var _ohs = ohs.splice(0, ohs.length);
            if (errored) for (var o of _ohs) o(error);
            delete image.then;
            if (resolved) for (var o of _oks) o(result);
            image.then = then;
        }
    };
    var then = image.then = function (ok, oh) {
        if (ok) oks.push(ok);
        if (oh) ohs.push(oh);
        fire();
    };
    image.onload = function () {
        if (resolved || errored) return;
        resolved = true;
        if (isHandled(seeker)) {
            result = seek(image, seeker);
        }
        if (!image.complete) image.complete = true;
        fire();
    };
    image.onerror = function (e) {
        if (resolved || errored) return;
        errored = true;
        error = e;
        fire();
    };
    return image;
}