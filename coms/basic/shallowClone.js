var shallowClone = function (origin, deep) {
    if (--deep < 0) return origin;
    if (!isObject(origin)) return origin;
    var temp = origin instanceof Array ? [] : {};
    if (deep > 0) for (var k in origin) temp[k] = shallowClone(origin[k], deep);
    else for (var k in origin) temp[k] = origin[k];
    return temp;
}