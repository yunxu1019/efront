var _preich = function _preich(obj) {
    function EnrichedPromise(){}
    var _obj = {};
    for (var k in obj) {
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
    for (var cx = 0, dx = ["catch", "then"], k; k = dx[cx++];)
        _obj[k] = function () {
            var _orig = Promise.prototype[k];
            return function () {
                var subobj = _orig.apply(this, arguments);
                return _enrich(subobj, _obj);
            };
        }();
    return _obj;
};
var _enrich = function _enrich(promise, _obj) {
    if (!promise._enrich) {
        promise._enrich = _obj;
        for (var k in _obj) promise[k] = _obj[k];
    }
    return promise;
};
function enrich(obj) {
    var _obj = _preich(obj);
    return _enrich(Promise.resolve(), _obj);
}
module.exports = enrich;