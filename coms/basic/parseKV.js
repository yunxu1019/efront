"use strict";
var trim = a => a.trim();
function parseKV(string) {
    var spliter, equals, decode;
    for (var cx = 1, dx = arguments.length; cx < dx; cx++) {
        var a = arguments[cx];
        if (typeof a === 'string' || a instanceof RegExp) {
            if (!spliter) spliter = a;
            else if (!equals) equals = a;
        }
        else if (typeof decode === 'function') {
            decode = a;
        }
    }
    if (!spliter) spliter = '&';
    if (!equals) equals = '=';
    if (decode === void 0) decode = spliter === "&" && equals === "=" ? decodeURIComponent : trim;
    var object = {};
    if (typeof string === "string") {
        var kvs = string.split(spliter);
        for (var cx = 0, dx = kvs.length; cx < dx; cx++) {
            var kv = kvs[cx];
            if (!kv) continue;
            var index = equals instanceof RegExp ? equals.exec(kv).index : kv.indexOf(equals);
            if (index < 0) index = kv.length;
            var k = kv.slice(0, index);
            var v = kv.slice(index + 1);
            if (typeof decode === 'function') {
                k = decode(k);
                v = decode(v);
            }
            if (index === kv.length) v = undefined;
            if (k in object && v !== undefined) {
                if (object[k] instanceof Array);
                else if (object[k] !== undefined) object[k] = [object[k]];
                else object[k] = [];
                if (v !== undefined) object[k].push(v);
            }
            else {
                object[k] = v;
            }
        }
    }
    return object;
}
module.exports = parseKV;