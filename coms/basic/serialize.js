var encodeURIComponent = a => a.replace(/[^\w\.\-_~]/g, a => "%" + encodeUTF8(a).map(a => (a < 16 ? '%0' : '%') + a.toString(16).toUpperCase()));
var trim = a => a.trim();
function serialize(map) {
    var spliter, equals, encode;
    for (var cx = 1, dx = arguments.length; cx < dx; cx++) {
        var a = arguments[cx];
        if (typeof a === 'string') {
            if (!spliter) spliter = a;
            else if (!equals) equals = a;
        }
        else {
            encode = a;
        }
    }
    if (!spliter) spliter = '&';
    if (!equals) equals = '=';
    if (encode === void 0) encode = spliter === "&" && equals === "=" ? encodeURIComponent : trim;
    var result = [];
    for (var k in map) {
        var v = map[k];
        if (isFunction(encode)) {
            if (v instanceof Array) {
                v = v.map(String).map(encode);
            }
            else v = String(v), v = encode(v);
            k = encode(k);
        }
        if (v instanceof Array) for (var v0 of v) result.push(k + equals + v0);
        else result.push(k + equals + v);
    }
    return result.join(spliter);
}
