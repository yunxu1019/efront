var window = this;
var Array = window.Array;
var setTimeout = window.setTimeout;
var Function = window.Function;
var console = window.console;
var Error = window.Error;
var requestAnimationFrame = window.setImmediate || window.setTimeout;
var isFunction = function (f) {
    return typeof f === "function";
};
if (window.Promise) {
    var Promise = window.Promise;
} else {
    var isThenable = function (pendding) {
        return pendding instanceof Promise || pendding && isFunction(pendding.then);
    };
    var queue = [];
    var run = function (q) {
        var threads = queue.splice(0, queue.length);
        for (var t of threads) {
            if (t.oked) {
                for (var r of t.PromiseFulfillReactions) {
                    r.call(null, t.oked[0]);
                }
            }
            if (t.ohed) {
                var throwed = t.throwed;
                t.throwed = true;
                if (!throwed && !t.PromiseRejectReactions.length) {
                    // <!--
                    console.warn("在异步过程中发现未处理的异常：", t.ohed[0], t.ohed[1], t.ohed[2]);
                    // -->
                    throw t.ohed[0];
                }
                for (var r of t.PromiseRejectReactions) {
                    r.apply(null, t.ohed);
                }
            }
            t.PromiseRejectReactions.splice(0, t.PromiseRejectReactions.length);
            t.PromiseFulfillReactions.splice(0, t.PromiseFulfillReactions.length);
        }
    };
    var fire = function (p) {
        if (queue.length) return queue.push(p);
        queue.push(p);
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
    Promise.prototype = {
        then(onok, onoh) {
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
                if (onoh) reject = function (a) {
                    try {
                        a = onoh.apply(null, arguments);
                        ok(a);
                    } catch (e) {
                        oh(e, onok, onoh);
                    }
                };
            })
            if (resolve) this.PromiseFulfillReactions.push(resolve);
            if (reject) this.PromiseRejectReactions.push(reject);
            if (this.oked || this.ohed) fire(this);
            return promise;
        },
        catch(f) {
            return this.then(null, f);
        },
    }
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