var oncetree = {};
function _once(key) {
    if (oncetree[key]) return oncetree[key];
    return oncetree[key] = function (target, handler) {
        var off = on(key)(target, function (event) {
            off();
            return handler.call(this, event);
        });
        return off;
    };
}
function once(key, target, handler) {
    if (isFunction(handler) && isNode(target)) return _once(key)(target, handler);
    return _once(key);
}