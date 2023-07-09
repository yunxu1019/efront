var window = this;
var Array = window.Array;
var setTimeout = window.setTimeout;
var Function = window.Function;
var Object = window.Object;
var console = window.console;
var navigator = window.navigator;
var requestAnimationFrame = window.setImmediate || window.setTimeout;
var isFunction = function (f) {
    return typeof f === "function";
};
var Promise = window.Promise;
"use ./#checkPromise.js";
if (!Promise) {
    var isThenable = function (pendding) {
        return pendding instanceof Promise || pendding && isFunction(pendding.then);
    };
    var queue = [];
    var running = false;
    var run = function (q) {
        while (queue.length) {
            var threads = queue.splice(0, queue.length);
            for (var t of threads) {
                var PromiseRejectReactions = t.PromiseRejectReactions.splice(0, t.PromiseRejectReactions.length);
                var PromiseFulfillReactions = t.PromiseFulfillReactions.splice(0, t.PromiseFulfillReactions.length);
                if (t.oked) {
                    for (var r of PromiseFulfillReactions) {
                        r.call(null, t.oked[0]);
                    }
                }
                if (t.ohed) {
                    var throwed = t.throwed;
                    t.throwed = true;
                    if (!throwed && !PromiseRejectReactions.length) {
                        // <!--
                        console.warn("在异步过程中发现未处理的异常：", t.ohed[0], t.ohed[1], t.ohed[2]);
                        // -->
                        throw t.ohed[0];
                    }
                    for (var r of PromiseRejectReactions) {
                        r.apply(null, t.ohed);
                    }
                }
            }
        }
        running = false;
    };
    var fire = function (p) {
        queue.push(p);
        if (running) return;
        running = true;
        requestAnimationFrame(run);
    };
    var Promise = function (executor) {
        this.PromiseFulfillReactions = []; //thens
        this.PromiseRejectReactions = []; //catches
        this.oked = this.ohed = null;
        var p = this;
        var ResolvingFunctions_resolve = function (result) { //ok
            if (p.oked || p.ohed) return;
            if (isThenable(result)) {
                result.then(ResolvingFunctions_resolve, ResolvingFunctions_reject);
            } else {
                p.oked = arguments;
                fire(p);
            }
        };
        var ResolvingFunctions_reject = function (e) { //oh
            if (p.oked || p.ohed) return;
            p.ohed = arguments;
            fire(p);
        };
        executor(ResolvingFunctions_resolve, ResolvingFunctions_reject);
    };
    Promise.prototype.then = function (onok, onoh) {
        var resolve, reject;
        var promise = new Promise(function (ok, oh) {
            if (onok) resolve = function (a) {
                try {
                    a = onok(a);
                    ok(a);
                } catch (e) {
                    oh(e, onok, onoh);
                }
            };
            else resolve = ok;
            if (onoh) reject = function (a) {
                try {
                    a = onoh.apply(null, arguments);
                    ok(a);
                } catch (e) {
                    oh(e, onok, onoh);
                }
            };
            else reject = oh;
        })
        if (resolve) this.PromiseFulfillReactions.push(resolve);
        if (reject) this.PromiseRejectReactions.push(reject);
        if (this.oked || this.ohed) fire(this);
        return promise;
    }
    Promise.prototype.catch = function (f) {
        return this.then(null, f);
    };
    Promise.all = function (penddings) {
        return new Promise(function (ok, oh) {
            if (!(penddings && penddings.length)) {
                return ok();
            }
            var resolved_count = 0,
                results = Array(penddings.length);
            for (var cx = 0, dx = penddings.length; cx < dx; cx++) {
                var pendding = penddings[cx];
                if (isThenable(pendding)) {
                    pendding.then(function (cx) {
                        return function (arg) {
                            results[cx] = arg;
                            if (++resolved_count === dx) {
                                ok(results);
                            }
                        };
                    }(cx), oh);
                } else {
                    results[cx] = pendding;
                    if (++resolved_count === dx) {
                        ok(results);
                    }
                };
            }
        });
    };
    Promise.race = function (penddings) {
        return new Promise(function (ok, oh) {
            for (var cx = 0, dx = penddings.length; cx < dx; cx++) {
                var pendding = penddings[cx];
                if (isThenable(pendding)) {
                    pendding.then(ok, oh);
                } else {
                    ok(pendding);
                };
            }
        });
    };
    Promise.reject = function (error) {
        return new Promise(function (ok, oh) {
            oh(error);
        });
    };
    Promise.resolve = function () {
        var args = arguments;
        return new Promise(function (ok, oh) {
            ok.apply(null, args);
        });
    };
}