var shallowClone = function (origin, deep = /^[^\$\_]/) {
    if (!isObject(origin)) return origin;
    var temp = origin instanceof Array ? [] : {};
    if (deep instanceof RegExp) {
        for (var k in origin) if (deep.test(k)) temp[k] = origin[k];
        return temp;
    }
    if (--deep < 0) return origin;
    if (deep > 0) for (var k in origin) temp[k] = shallowClone(origin[k], deep);
    else for (var k in origin) temp[k] = origin[k];
    return temp;
}