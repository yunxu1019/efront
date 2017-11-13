"use strict";
var enrich = function enrich(obj) {
    var _obj = Promise.resolve();
    for (var k in obj) {
        if (obj[k] instanceof Function)
            _obj[k] = function () {
                var method = obj[k];
                return function () {
                    var args = arguments;
                    return this.then(function (res) {
                        return method.apply(_obj, args);
                    });
                };
            }();
    }
    _obj._enrich = function (promise) {
        if (!promise._enrich) {
            for (var k in _obj) promise[k] = _obj[k];
        }
        return promise;
    };
    var then = _obj.then;
    var _catch = _obj.catch;
    _obj.then = function () {
        var promise = then.apply(this, arguments);
        return this._enrich(promise);
    };
    _obj.catch = function () {
        var promise = _catch.apply(this, arguments);
        return this._enrich(promise);
    }
    return _obj;
};
module.exports = enrich;


// var Promise = new Function(require("fs").readFileSync("coms/zimoli/promise.js").toString()+"\r\nreturn Promise;").apply(global);