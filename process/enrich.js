"use strict";
var enrich = function enrich(obj) {
    var _obj = {};
    for (var k in obj) {
        if (obj[k] instanceof Function)
            _obj[k] = function (k) {
                return function () {
                    var method = obj[k];
                    var args = arguments;
                    return this.then(function (res) {
                        return method.apply(_obj, args);
                    });
                };
            }(k);
    }
    _obj._enrich = function (promise) {
        if (!promise._enrich) {
            var then = promise.then;
            var _catch = promise.catch;
            this.then = function () {
                return this._enrich(then.apply(promise, arguments));
            };
            this.catch = function () {
                return this.then(_catch.apply(promise, arguments));
            }
            for (var k in this) promise[k] = this[k];
        }
        return promise;
    };
    return _obj._enrich(Promise.resolve());
};
module.exports = enrich;


// var Promise = new Function(require("fs").readFileSync("coms/zimoli/promise.js").toString()+"\r\nreturn Promise;").apply(global);