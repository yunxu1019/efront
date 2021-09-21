function hasClass(target, classNames) {
    var _className = target.className;
    var arr = String(_className).trim().split(/\s+/);
    var cls = {};
    for (var cx = 0, dx = arr.length; cx < dx; cx++) {
        var c = arr[cx];
        cls[c] = true;
    }
    if (isString(classNames)) {
        var clsNames = classNames.trim().split(/\s+/);
        for (var cx = 0, dx = clsNames.length; cx < dx; cx++) {
            var c = clsNames[cx];
            if (!cls[c]) return false;
        }
        return !!clsNames.length;
    }
    return false;
}