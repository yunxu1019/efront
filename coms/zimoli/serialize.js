function serialize(map, spliter = "&", equals = "=") {
    var result = [];
    var encode = spliter === "&" && equals === "=" ? encodeURIComponent : a => a;
    for (var k in map) {
        result.push(encode(k) + equals + encode(map[k]));
    }
    return result.join(spliter);
}