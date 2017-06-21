function enrich(_obj) {
    var _enrich = function _enrich(obj) {
        var promise = obj;
        var that = _obj;
        if (promise._enrich) {
            return promise;
        }
        for (var cx = 0, dx = ["catch", "then"], k; k = dx[cx++];)
            promise[k] = function () {
                var _orig = promise[k];
                return function () {
                    var subobj = _orig.apply(this, arguments);
                    return this._enrich(subobj);
                };
            }();
        for (var k in that) {
            promise[k] = function () {
                var method = that[k];
                return function () {
                    var args = arguments;
                    return this.then(function (res) {
                        return method.apply(this, args);
                    });
                };
            }();
        }
        promise._enrich = function (subobj) {
            return that._enrich(subobj);
        };
        return obj;
    };
    _obj._enrich = _enrich;
    return _obj._enrich(Promise.resolve());
}
module.exports = enrich;