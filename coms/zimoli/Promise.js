var window = this;
var Array = window.Array;
var setTimeout = window.setTimeout;
var Function = window.Function;
var console = window.console;
var Error = window.Error;
var isFunction = function (f) {
    return typeof f === "function";
};
if (window.Promise) {
    var Promise = window.Promise;
} else {
    var isPromise = function (pendding) {
        return pendding instanceof Promise || pendding && isFunction(pendding.then) && isFunction(pendding.catch);
    };

    var concat = function (okfun, ohfun, oks, ohs) {
        var _oked, _ohed, _ok, _oh, removeed;
        var runable = function (ok, oh) {
            if (_oked) {
                ok.apply(null, _oked);
            } else if (_ohed) {
                oh.apply(null, _ohed);
            } else {
                _ok = ok;
                _oh = oh;
            }
        };
        var _promise = new Promise(runable);
        var onpermit = function (f, args) {
            if (!removeed) {
                try {
                    var pendding = f.apply(null, args);
                    if (_ok) _ok(pendding);
                    else _oked = [pendding];
                } catch (e) {
                    if (_oh) _oh(e);
                    else _ohed = [e];
                }
                removeed = true;
            }
        };
        var onresolve = function () {
            if (okfun instanceof Function) onpermit(okfun, arguments);
            if (!removeed) {
                if (_ok) _ok.apply(null, arguments);
                else _oked = arguments;
                removeed = true;
            }
        };
        var onreject = function () {
            if (ohfun instanceof Function) onpermit(ohfun, arguments);
            if (!removeed) {
                if (_oh) _oh.apply(null, arguments);
                else _ohed = arguments;
                removeed = true;
            }
        };
        oks.push(onresolve);
        ohs.push(onreject);
        return _promise;
    }

    var Promise = function (executor) {
        var PromiseFulfillReactions = this.PromiseFulfillReactions = [], //thens
            PromiseRejectReactions = this.PromiseRejectReactions = [], //catches
            oked = this.oked, ohed = this.ohed;

        var ResolvingFunctions_resolve = (result) => { //ok
            if (isPromise(result)) {
                result.then(ResolvingFunctions_resolve).catch(ResolvingFunctions_reject);
            } else {
                oked = this.oked = arguments;
                this.run(PromiseFulfillReactions, oked);
            }
        };

        var ResolvingFunctions_reject = (e) => { //oh
            ohed = this.ohed = arguments;
            this.run(PromiseRejectReactions, ohed);
        };

        try {
            executor(ResolvingFunctions_resolve, ResolvingFunctions_reject);
        } catch (e) {
            ResolvingFunctions_reject(e);
        }
    };
    Promise.prototype = {
        then(onok, onoh) {
            var _promise = concat(onok, onoh, this.PromiseFulfillReactions, this.PromiseRejectReactions);
            this.oked && this.run(this.PromiseFulfillReactions, this.oked);
            this.ohed && this.run(this.PromiseRejectReactions, this.ohed);
            return _promise;
        },
        catch(f) {
            return this.then(null, f);
        },
        run(threads, args) {
            if (threads.pendding) return;
            threads.pendding = true;
            setTimeout(_ => {
                do {
                    var next = threads.shift();
                    if (next instanceof Function) {
                        next.apply(null, args);
                    }
                } while (threads.length);
                this.PromiseRejectReactions.splice(0, this.PromiseRejectReactions.length);
                this.PromiseFulfillReactions.splice(0, this.PromiseFulfillReactions.length);
                threads.pendding = false;
            }, 0);
        }
    }
    Promise.all = function (penddings) {
        return new Promise(function (ok, oh) {
            if (!(penddings && penddings.length)) {
                return ok();
            }
            try {
                var resolved_count = 0,
                    rejected_count = 0,
                    results = Array(penddings.length);
                for (var cx = 0, dx = penddings.length; cx < dx; cx++) {
                    var pendding = penddings[cx];
                    if (isPromise(pendding)) {
                        pendding.then(function (cx) {
                            return function (arg) {
                                results[cx] = arg;
                                if (++resolved_count === dx) {
                                    ok(results);
                                }
                            };
                        }(cx));
                        pendding.catch(function (e) {
                            if (rejected_count++ === 0) {
                                oh(e);
                            }
                        });
                    } else {
                        results[cx] = pendding;
                        if (++resolved_count === dx) {
                            ok(results);
                        }
                    };
                }
            } catch (e) {
                oh(e);
            }
        });
    };
    Promise.race = function (penddings) {
        return new Promise(function (ok, oh) {
            try {
                var resolved_count = 0,
                    rejected_count = 0,
                    results = Array(penddings.length);
                for (var cx = 0, dx = penddings.length; cx < dx; cx++) {
                    var pendding = penddings[cx];
                    if (isPromise(pendding)) {
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