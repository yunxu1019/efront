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
        if (res !== undefined){
            if (res && res.then instanceof Function) {
                var proto = Object.getPrototypeOf instanceof Function ? Object.getPrototypeOf(res) : res.__proto__;
                if (Object.setPrototypeOf instanceof Function) Object.setPrototypeOf(res, null);
                else res.__proto__ = null;
                if (res.then instanceof Function) {
                    var _then = res.then;
                    res.then = null;
                    if (res.then) _then = null;
    
                }
                resolve(res.then instanceof Function ? null : res);
                if (proto) {
                    if (Object.setPrototypeOf instanceof Function) Object.setPrototypeOf(res, proto);
                    else res.__proto__ = proto;
                }
                if (_then) res.then = _then;
            } else {
                resolve(res);
            }
            return ok(res);
        } 
        requestAnimationFrame(onload);
        needcallback++;
    };
    var onerror = function (e) {
        clear();
        if (!needcallback || needcallback > 1000) return;
        reject(e);
        oh(e);
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
    Promise.resolve().then(function () {
        if (!script.parentNode) {
            if (judger) {
                var res = seek(window, judger);
                if (res !== null && res !== undefined) {
                    ok(res);
                    resolve(res);
                    return;
                }
            }
            appendChild(document.head, script);
        }
    });
    script.loading_promise = promise;
    return script;
}