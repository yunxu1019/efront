function script(url, judger) {
    var script = document.createElement("script");
    var oh, ok = oh = function () { };
    var reject, resolve;
    var promise = new Promise((ok, oh) => {
        reject = oh;
        resolve = ok;
    });
    var needcallback = !!judger;

    var clear = function () {
        remove(script);
    };
    var onload = function () {
        clear();
        if (!needcallback || needcallback > 1000) return;
        var res = seek(window, judger);
        if (res !== undefined) return ok(res), resolve(res);
        requestAnimationFrame(onload);
        needcallback++;
    };
    var onerror = function (e) {
        clear();
        if (!needcallback || needcallback > 1000) return;
        oh(e);
        reject(e);
    };
    on('load')(script, onload);
    on('error')(script, onerror);
    script.onabort = function () {
        clear();
        needcallback = false;
    };
    script.done = function (f) {
        if (f instanceof Function) ok = f;
        return script;
    };
    script.error = function (f) {
        if (f instanceof Function) oh = f;
        return script;
    };
    script.then = function (f) {
        return promise.then(f);
    };
    script.catch = function (f) {
        return promise.catch(f);
    };
    script.src = url;
    setTimeout(function () {
        if (!script.parentNode) {
            appendChild(document.head, script);
        }
    });
    script.loading_promise = promise;
    return script;
}