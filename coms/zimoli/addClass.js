var classToMap = function (className) {
    if (isString(className)) className = className.trim().split(/\s+/);
    if (isArray(className)) {
        var classMap = Object.create(null);
        for (var c of className) {
            if (isString(c)) classMap[c] = true;
            else Object.assign(classMap, classToMap(c));
        }
        return classMap;
    }
    else if (isObject(className)) return className;
    return Object.create(null);
};
function addClass(target, classNames) {
    var _className = target.className;
    var arr = String(_className || "").trim().split(/\s+/);
    var cls = Object.create(null);
    for (var cx = 0, dx = arr.length; cx < dx; cx++) {
        var c = arr[cx];
        if (c) cls[c] = true;
    }
    classNames = classToMap(classNames);
    Object.assign(cls, classNames);
    var newarr = [];
    for (var k in cls) if (k && cls[k]) newarr.push(k);
    target.className = newarr.join(" ");
}
addClass.classToMap = classToMap;