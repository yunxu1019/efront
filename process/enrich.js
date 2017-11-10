var enrich = function enrich(obj) {
    var _obj = {};
    for (var k in obj) {
        if (obj[k] instanceof Function)
            _obj[k] = function () {
                var method = obj[k];
                return function () {
                    var args = arguments;
                    return this.then(function (res) {
                        return method.apply(this, args);
                    });
                };
            }();
    }
    _obj._enrich = function _enrich(promise) {
        if (!promise._enrich) {
            for (var k in this) promise[k] = this[k];
        }
        return promise;
    };
    return _obj._enrich(Promise.resolve());
};
module.exports = enrich;


var isPromise = function (pendding) {
    return pendding instanceof Promise || padding instanceof Object && padding.then instanceof Function;
};

function concat(threads, f, oks, ohs) {
    var _ok, _oh, removeed;
    var remove = function () {
        var res = !removeed;
        removeed = true;
        return removeed;
    };
    var runable = function (ok, oh) {
        _ok = ok;
        _oh = oh;
    };
    var _promise = new Promise(runable);
    var onpermit = function () {
        remove();
        try {
            var pendding = f.apply(null, arguments);
            if (isPromise(pendding)) {
                pendding.then(_ok);
                pendding.catch(_oh);
            } else {
                _ok(pendding);
            }
        } catch (e) {
            _oh(e);
        }
    };
    var onresolve = function () {
        remove() && _ok.apply(null, arguments);
    };
    var onreject = function () {
        remove() && _oh.apply(null, arguments);
    };
    threads.push(onpermit);
    oks.push(onresolve);
    ohs.push(onreject);
    return _promise;
};

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
    };

    function ResolvingFunctions_resolve() { //ok
        oked = arguments;
        run(PromiseFulfillReactions, oked);
    };

    function ResolvingFunctions_reject(e) { //oh
        ohed = arguments;
        run(PromiseRejectReactions, ohed);
    };

    try {
        executor(ResolvingFunctions_resolve, ResolvingFunctions_reject);
    } catch (e) {
        ResolvingFunctions_reject(e);
    }
    this.then = function (f) {
        var _promise = concat(PromiseFulfillReactions, f, PromiseFulfillReactions, PromiseRejectReactions);
        oked && run(PromiseFulfillReactions, oked);
        ohed && run(PromiseRejectReactions, ohed);
        this._enrich(_promise);
        return _promise;
    };
    this.catch = function (f) {
        var _promise = concat(PromiseRejectReactions, f, PromiseFulfillReactions, PromiseRejectReactions);
        ohed && run(PromiseRejectReactions, ohed);
        oked && run(PromiseFulfillReactions, oked);
        this._enrich(_promise);
        return _promise;
    };
}
Promise.resolve = function () {
    var args = arguments;
    return new Promise(function (ok, oh) {
        ok.apply(null, args);
    });
};