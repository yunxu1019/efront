function extendIfOccurs(o1) {
    o1 = Object(o1);
    var ks = Object.keys(o1);
    for (var cx = 1, dx = arguments.length; cx < dx; cx++) {
        var o2 = arguments[cx];
        if (isObject(o2)) for (var k of ks) {
            if (k in o2) o1[k] = o2[k];
        }
    }
    return o1;
}
