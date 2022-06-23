var encodeURIComponent = a => a.replace(/[^\w\.\-_~]/g, a => "%" + a.charCodeAt().toString(16).toUpperCase());
function serialize(map, spliter = "&", equals = "=", encode = spliter === "&" && equals === "=" ? encodeURIComponent : a => a) {
    var result = [];
    if (isFunction(encode)) {
        for (var k in map) {
            if (map[k] !== undefined) result.push(encode(k) + equals + encode(map[k]));
            else result.push(encode(k));
        }
    }
    else {
        for (var k in map) if (map[k] !== undefined) result.push(k + equals + map[k]);
        else result.push(k);
    }
    return result.join(spliter);
}
