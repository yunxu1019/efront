function removeClass(target, classNames) {
    var _className = target.className;
    var arr = String(_className).trim().split(/\s+/);
    var cls = {};
    for (var cx = 0, dx = arr.length; cx < dx; cx++) {
        var c = arr[cx];
        cls[c] = true;
    }
    if (isString(classNames)) {
        var clsNames = classNames.split(/\s+/);
        for (var cx = 0, dx = arr.length; cx < dx; cx++) {
            var c = clsNames[cx];
            delete cls[c];
        }
    }
    var newarr = [];
    for (var k in cls) {
        if (cls) {
            newarr.push(k);
        }
    }
    target.className = newarr.join(" ");
}