"use strict";
var bindObjK = function (obj, k, resolve, _object) {
    Object.defineProperty(_object, k, {
        get() {
            var method = obj[k];
            if (typeof method === 'function') {
                return function () {
                    var r = method.apply(obj, arguments);
                    return resolve(r);
                };
            }
            return method;
        },
        set(v) {
            obj[k] = v;
        },
    });
};
var enrich = function enrich(obj) {
    var _promise = Promise.resolve();
    var _object = Object.create(null);
    var _then = _promise.then;
    var pthen = function () {
        var promise = _then.apply(this, arguments);
        return resolve(promise);
    };
    var resolve = function (result) {
        var _promise = Promise.resolve(result);
        for (var k in obj) if (k !== 'then') bindObjK(obj, k, resolve, _promise);
        _promise.then = pthen;
        return _promise;
    };
    for (var k in obj) bindObjK(obj, k, resolve, _object);
    return _object;
};
module.exports = enrich;
