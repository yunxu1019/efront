"use strict";
var oncetree = {};
function emit(ontype, target, handler, firstmost) {
    var fired = false;
    var off = ontype(target, function (event) {
        if (fired) return;
        fired = true;
        if (!off) Promise.resolve().then(function () {
            off();
        });
        else off();
        return handler.call(this, event);
    }, firstmost);
    return off;
}
function _once(key) {
    if (oncetree[key]) return oncetree[key];
    return oncetree[key] = emit.bind(null, on(key));
}
once.emit = emit;
function once(key, target, handler, firstmost) {
    if (isFunction(handler) && isNode(target)) return _once(key).call(this, target, handler, firstmost);
    return _once(key);
}