var window = this;
var Array = window.Array;
var setTimeout = window.setTimeout;
var Function = window.Function;
var console = window.console;
var Error = window.Error;
if (!window.Promise) {
    var Promise = window.Promise;
} else {
    var isPromise = function (pendding) {
        return pendding instanceof Promise;
    };

    function concat(threads, f, oks, ohs) {
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
        var onpermit = function () {
            if (!removeed) {
                try {
                    var pendding = f.apply(null, arguments);
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
            if (!removeed) {
                if (_ok) _ok.apply(null, arguments);
                else _oked = arguments;
                removeed = true;
            }
        };
        var onreject = function () {
            if (!removeed) {
                if (_oh) _oh.apply(null, arguments);
                else _ohed = arguments;
                removeed = true;
            }
        };
        threads.push(onpermit);
        oks.push(onresolve);
        ohs.push(onreject);
        return _promise;
    }

    function Promise(executor) {
        var PromiseFulfillReactions = this.PromiseFulfillReactions = [], //thens
            PromiseRejectReactions = this.PromiseRejectReactions = [], //catches
            oked = this.oked, ohed = this.ohed, resolved;




        var ResolvingFunctions_resolve = (result) => { //ok
            if (isPromise(result)) {
                result.then(ResolvingFunctions_resolve).catch(ResolvingFunctions_reject);
            } else {
                oked = this.oked = arguments;
                this.run(PromiseFulfillReactions, oked);
            }
        }

        var ResolvingFunctions_reject = (e) => { //oh
            ohed = this.ohed = arguments;
            this.run(PromiseRejectReactions, ohed);
        }

        setTimeout(function () {
            try {
                executor(ResolvingFunctions_resolve, ResolvingFunctions_reject);
            } catch (e) {
                ResolvingFunctions_reject(e);
            }
        }, 0);
    }
    Promise.prototype = {
        then(f) {
            var _promise = concat(this.PromiseFulfillReactions, f, this.PromiseFulfillReactions, this.PromiseRejectReactions);
            this.oked && this.run(this.PromiseFulfillReactions, this.oked);
            this.ohed && this.run(this.PromiseRejectReactions, this.ohed);
            return _promise;
        },
        catch(f) {
            var _promise = concat(this.PromiseRejectReactions, f, this.PromiseFulfillReactions, this.PromiseRejectReactions);
            this.ohed && this.run(this.PromiseRejectReactions, this.ohed);
            this.oked && this.run(this.PromiseFulfillReactions, this.oked);
            return _promise;
        },
        run(threads, args) {
            do {
                var next = threads.shift();
                if (next instanceof Function) {
                    next.apply(null, args);
                }
            } while (threads.length);
            this.PromiseRejectReactions.splice(0);
            this.PromiseFulfillReactions.splice(0);
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
