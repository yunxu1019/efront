function parseKV(string, spliter = "&", equals = "=") {
    var object = {};
    if (isString(string)) {
        var kvs = string.split(spliter)
        for (var cx = 0, dx = kvs.length; cx < dx; cx++) {
            var kv = kvs[cx];
            var index = kv.indexOf(equals);
            object[kv.slice(0, index)] = kv.slice(index + 1);
        }
    }
    return object;
}