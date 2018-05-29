function serialize(map, spliter = "&", equals = "=") {
    var result = [];
    for (var k in map) {
        result.push(k + equals + encodeURIComponent(map[k]));
    }
    return result.join(spliter);
}