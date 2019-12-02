function parseKV(string, spliter = "&", equals = "=") {
    var object = {};
    var decode = spliter === "&" && equals === "=" ? decodeURIComponent : a => a;
    if (isString(string)) {
        var kvs = string.split(spliter)
        for (var cx = 0, dx = kvs.length; cx < dx; cx++) {
            var kv = kvs[cx];
            if (!kv) continue;
            var index = kv.indexOf(equals);
            if (index < 0) index = kv.length;
            object[decode(kv.slice(0, index))] = index === kv.length ? undefined : decode(kv.slice(index + 1));
        }
    }
    return object;
}