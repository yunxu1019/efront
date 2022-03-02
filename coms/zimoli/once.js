"use strict";
var oncetree = {};
function _once(key) {
    if (oncetree[key]) return oncetree[key];
    return oncetree[key] = function (target, handler, firstmost) {
        var off = on(key).call(this, target, function (event) {
            off();
            return handler.call(this, event);
        }, firstmost);
        return off;
    };
}
function once(key, target, handler, firstmost) {
    if (isFunction(handler) && isNode(target)) return _once(key).call(this, target, handler, firstmost);
    return _once(key);
}