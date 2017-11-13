var enrich = function enrich(obj) {
    var _obj = {};
    for (var k in obj) {
        if (obj[k] instanceof Function)
            _obj[k] = function (k) {
                return function () {
                    var method = obj[k];
                    var args = arguments;
                    return this.then(function (res) {
                        return method.apply(this, args);
                    });
                };
            }(k);
    }
    _obj._enrich = function _enrich(promise) {
        if (!promise._enrich) {
            for (var k in this) if (!/^(catch|then)$/.test(k)) promise[k] = this[k];
            var then = promise.then;
            var _catch = promise.catch;
            promise.then = function () {
                return this._enrich(then.apply(this, arguments));
            };
            promise.catch = function () {
                return this.then(_catch.apply(this, arguments));
            }
        }
        return promise;
    };
    return _obj._enrich(Promise.resolve());
};
module.exports = enrich;


// var Promise = new Function(require("fs").readFileSync("coms/zimoli/promise.js").toString()+"\r\nreturn Promise;").apply(global);