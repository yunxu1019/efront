var window = this;
var Array = window.Array;
var setTimeout = window.setTimeout;
var Function = window.Function;
var console = window.console;
var Error = window.Error;
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
    var PromiseFulfillReactions = [], //thens
        PromiseRejectReactions = [], //catches
        oked, ohed, resolved;

    function run(threads, args) {
        do {
            var next = threads.shift();
            if (next instanceof Function) {
                next.apply(null, args);
            }
        } while (threads.length);
        PromiseRejectReactions.splice(0);
        PromiseFulfillReactions.splice(0);
    }

    function ResolvingFunctions_resolve(result) { //ok
        if (isPromise(result)) {
            result.then(ResolvingFunctions_resolve).catch(ResolvingFunctions_reject);
        } else {
            oked = arguments;
            run(PromiseFulfillReactions, oked);
        }
    }

    function ResolvingFunctions_reject(e) { //oh
        ohed = arguments;
        run(PromiseRejectReactions, ohed);
    }

    setTimeout(function () {
        try {
            executor(ResolvingFunctions_resolve, ResolvingFunctions_reject);
        } catch (e) {
            ResolvingFunctions_reject(e);
        }
    }, 0);
    this.then = function (f) {
        var _promise = concat(PromiseFulfillReactions, f, PromiseFulfillReactions, PromiseRejectReactions);
        oked && run(PromiseFulfillReactions, oked);
        ohed && run(PromiseRejectReactions, ohed);
        return _promise;
    };
    this.catch = function (f) {
        var _promise = concat(PromiseRejectReactions, f, PromiseFulfillReactions, PromiseRejectReactions);
        ohed && run(PromiseRejectReactions, ohed);
        oked && run(PromiseFulfillReactions, oked);
        return _promise;
    };
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
// //test
// new Promise(function (ok, oh) {
//     setTimeout(ok, 1000)
// }).then(function () {
//     console.log(1);
// }).then(function () {
//     console.log(2);
//     throw 3;
// }).then(function () {
//     console.log(false);
// }).catch(function (e) {
//     console.log(e);
// }).then(function () {
//     console.log(4);
// });
// // test
// new Promise(function (ok, oh) {
//     setTimeout(function () {
//         oh(1);
//     }, 1000)
// }).then(function () {
//     console.log(false);
// }).then(function () {
//     console.log(false);
// }).then(function () {
//     console.log(false);
// }).catch(function (e) {
//     console.log(e);
// }).then(function () {
//     console.log(2);
// });
// new Promise(function (ok, oh) {
//     ok(1);
// }).catch(function () {
//     console.log(false);
// }).catch(function () {
//     console.log(false);
// }).then(function (value) {
//     console.log(value);
// }).catch(function () {
//     console.log(false);
// }).then(function () {
//     console.log(2);
// });