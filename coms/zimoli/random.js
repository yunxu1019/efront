function random(source, decimal) {
    var str = "";
    if (typeof source === 'number') {
        return (Math.random() * source).toFixed(decimal) || "";
    }
    var s = source;
    for (var k in s) {
        var v = s[k];
        if (isFunction(v)) {
            str += v(Math.random());
        } else {
            str += v[v.length * Math.random() | 0];
        }
    }
    return str;
}