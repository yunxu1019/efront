var trim = a => a.trim();
function serialize(map) {
    var spliter, equals, encode;
    for (var cx = 1, dx = arguments.length; cx < dx; cx++) {
        var a = arguments[cx];
        if (typeof a === 'string') {
            if (spliter === undefined) spliter = a;
            else if (equals === undefined) equals = a;
        }
        else {
            encode = a;
        }
    }
    if (spliter === undefined) spliter = '&';
    if (equals === undefined) equals = '=';
    if (encode === void 0) encode = spliter === "&" && equals === "=" ? encodeURIComponent : trim;
    var result = [];
    for (var k in map) {
        var v = map[k];
        if (isFunction(encode)) {
            if (v instanceof Array) {
                v = v.map(String).map(encode);
            }
            else if (v === undefined);
            else v = String(v), v = encode(v);
            k = encode(k);
        }
        if (v instanceof Array) for (var v0 of v) result.push(k + equals + v0);
        else if (v === undefined) result.push(k);
        else result.push(k + equals + v);
    }
    return result.join(spliter);
}
