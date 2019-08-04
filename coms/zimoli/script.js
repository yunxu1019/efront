function script(url, judger) {
    var script = document.createElement("script");
    var oh, ok = oh = function () { };
    var needcallback = !!judger;
    var clear = function () {
        remove(script);
    };
    var onload = function () {
        clear();
        if (!needcallback || needcallback > 1000) return;
        var res = seek(window, judger);
        if (res !== undefined) return ok(res);
        requestAnimationFrame(onload);
        needcallback++;
    };
    var onerror = function (e) {
        clear();
        if (!needcallback || needcallback > 1000) return;
        oh(e);
    };
    on('load')(script, onload);
    on('error')(script, onerror);
    script.onabort = function () {
        clear();
        needcallback = false;
    };
    script.done = script.then = function (f) {
        if (f instanceof Function) ok = f;
    };
    script.error = script.catch = function (f) {
        if (f instanceof Function) oh = f;
    };
    script.src = url;
    setTimeout(function () {
        if (!script.parentNode) {
            appendChild(document.head, script);
        }
    });
    return script;
}