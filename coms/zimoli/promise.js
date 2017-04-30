var Array = this.Array;
var setTimeout = this.setTimeout;
var Function = this.Function;
var console = this.console;
var Promise = function Promise(runner) {
    var that = this;
    var thens = [],
        catchs = [],
        oked, ohed;

    function run(threads, args) {
        do {
            var next = threads.shift();
            if (next instanceof Function) {
                next.call(that, args);
            }
        } while (threads.length);
    };

    function ok() {
        oked = arguments;
        run(thens, oked);
    };
    var throwwing = true;

    function oh() {
        ohed = arguments;
        run(catchs, ohed);
        throwwing && setTimeout(function () {
            if (throwwing)
                throw "Uncaught (in promise)";
        });
    };

    function concat(threads, f) {
        var _ok, _oh;
        var _promise = new Promise(function (ok, oh) {
            _ok = ok;
            _oh = oh;
        });
        threads.push(function () {
            try {
                var pendding = f.apply(that, arguments);
                if (pendding.then instanceof Function) {
                    pendding.then(_ok);
                } else {
                    _ok(pendding);
                }
                if (pendding.catch instanceof Function) {
                    pendding.catch(_oh);
                }
            } catch (e) {
                _oh(e);
            }
        });
        return _promise;
    };
    try {
        runner(ok, oh);
    } catch (e) {
        oh(e);
    }
    var promise = {
    };
    promise.then = function t(f) {
        var _promise = concat(thens, f);
        oked && run(thens, oked);
        return _promise;
    };
    promise.catch = function c(f) {
        throwwing = false;
        var _promise = concat(catchs, f);
        ohed && run(catchs, ohed);
        return _promise;
    };
    return promise;
};
Promise.all = function (penddings) {
    return Promise.call(this, function (ok, oh) {
        try {
            var resolved_count = 0,
                rejected_count = 0,
                results = Array(penddings.length);
            for (var cx = 0, dx = penddings.length; cx < dx; cx++) {
                var pendding = penddings[cx];
                if (pendding instanceof Promise) {
                    pendding.then(function (cx) {
                        return function (arg) {
                            results[cx] = arg;
                            if (++resolved_count === dx) {
                                ok(results);
                            }
                        };
                    }(cx)).catch(function (e) {
                        if (rejected_count++ === 0) {
                            oh(e);
                        }
                    });
                } else {
                    results[cx] = pendding;
                };
            }
        } catch (e) {
            oh(e);
        }
    });
};
Promise.race = function (penddings) {
    return Promise.call(this, function (ok, oh) {
        try {
            var resolved_count = 0,
                rejected_count = 0,
                results;
            for (var cx = 0, dx = penddings.length; cx < dx; cx++) {
                var pendding = penddings[cx];
                if (pendding instanceof Promise) {
                    pendding.then(function (cx) {
                        return function (arg) {
                            if (++resolved_count === 0) {
                                ok(arg);
                            }
                        };
                    }(cx)).catch(function (e) {
                        if (rejected_count++ === dx) {
                            oh(e);
                        }
                    });
                } else {
                    results[cx] = pendding;
                };
            }
        } catch (e) {
            oh(e);
        }
    });
};
Promise.reject = function () {
    return Promise.call(this, function (ok, oh) {
        oh();
    });
};
Promise.resolve = function () {
    var args = arguments;
    return Promise.call(this, function (ok, oh) {
        ok.apply(null, args);
    });
};