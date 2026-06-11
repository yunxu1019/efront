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
    var thro = function (error) {
        // <!--
        console.error(i18n`在异步过程中发现未处理的异常\r\n`, error);
        // -->
    };
    var queue = [];
    var running = false;
    var run = function () {
        while (queue.length) {
            var threads = queue.splice(0, queue.length);
            for (var t of threads) {
                var { $j, $s } = t;
                var PromiseRejectReactions = $j.splice(0, $j.length);
                var PromiseFulfillReactions = $s.splice(0, $s.length);
                if (t.oked) {
                    var oked = t.oked[0];
                    for (var r of PromiseFulfillReactions) {
                        r(oked);
                    }
                }
                if (t.ohed) {
                    var throwed = t.throwed;
                    t.throwed = true;
                    var ohed = t.ohed[0];
                    if (!throwed && !PromiseRejectReactions.length) {
                        requestAnimationFrame(thro.bind(null, ohed));
                    }
                    for (var r of PromiseRejectReactions) {
                        r(ohed);
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
        this.$j = []; // rejects
        this.$s = []; // resolves
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
                    oh(e);
                }
            };
            else resolve = ok;
            if (onoh) reject = function (a) {
                try {
                    a = onoh.apply(null, arguments);
                    ok(a);
                } catch (e) {
                    oh(e);
                }
            };
            else reject = oh;
        })
        if (resolve) this.$s.push(resolve);
        if (reject) this.$j.push(reject);
        if (this.oked || this.ohed) fire(this);
        return promise;
    }
    Promise.prototype.catch = function (f) {
        return this.then(null, f);
    };
    Promise.all = function (penddings) {
        return new Promise(function (ok, oh) {
            if (!(penddings && penddings.length)) {
                return ok([]);
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