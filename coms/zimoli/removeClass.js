function removeClass(target, classNames) {
    var _className = target.className;
    var arr = String(_className).trim().split(/\s+/);
    var cls = {};
    for (var cx = 0, dx = arr.length; cx < dx; cx++) {
        var c = arr[cx];
        cls[c] = true;
    }
    if (isString(classNames)) classNames = classNames.trim().split(/\s+/);
    if (isArray(classNames)) for (var cx = 0, dx = classNames.length; cx < dx; cx++) {
        var c = classNames[cx];
        delete cls[c];
    }
    var newarr = [];
    for (var k in cls) {
        if (k && cls[k]) {
            newarr.push(k);
        }
    }
    target.className = newarr.join(" ");
}