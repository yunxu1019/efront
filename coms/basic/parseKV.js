"use strict";
var trim = a => a.trim();
function parseKV(string, spliter = "&", equals = "=", decode = spliter === "&" && equals === "=" ? decodeURIComponent : trim) {
    var object = {};
    if (typeof string === "string") {
        if (isFunction(decode)) {
            var kvs = string.split(spliter);
            for (var cx = 0, dx = kvs.length; cx < dx; cx++) {
                var kv = kvs[cx];
                if (!kv) continue;
                var index = kv.indexOf(equals);
                if (index < 0) index = kv.length;
                object[decode(kv.slice(0, index))] = index === kv.length ? undefined : decode(kv.slice(index + 1));
            }
        }
        else{
            var kvs = string.split(spliter);
            for (var cx = 0, dx = kvs.length; cx < dx; cx++) {
                var kv = kvs[cx];
                if (!kv) continue;
                var index = kv.indexOf(equals);
                if (index < 0) index = kv.length;
                object[kv.slice(0, index)] = index === kv.length ? undefined : kv.slice(index + 1);
            }
        }
    }
    return object;
}
module.exports = parseKV;