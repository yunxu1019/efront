"use strict";
var enrich = function enrich(obj) {
    var _promise = Promise.resolve();
    var Base = function () {
    };
    Base.prototype = obj;
    var _object = new Base;
    for (var k in obj) {
        if (obj[k] instanceof Function) {
            _promise[k] = function () {
                var method = obj[k];
                var caller = function () {
                    "use strict";
                    var args = arguments;
                    return this.then(function () {
                        return method.apply(_promise, args);
                    });
                };
                _object[k] = function () {
                    return caller.apply(_promise, arguments);
                };
                return caller;
            }();
        }
    }
    _promise._enrich = function (promise) {
        if (!promise._enrich) {
            for (var k in _promise) promise[k] = _promise[k];
        }
        return promise;
    };
    var _then = _promise.then;
    var _catch = _promise.catch;
    _promise.then = function () {
        var promise = _then.apply(this, arguments);
        return this._enrich(promise);
    };
    _promise.catch = function () {
        var promise = _catch.apply(this, arguments);
        return this._enrich(promise);
    }
    return _object;
};
module.exports = enrich;


// var Promise = new Function(require("fs").readFileSync("coms/zimoli/promise.js").toString()+"\r\nreturn Promise;").apply(global);