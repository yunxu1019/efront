function addClass(target, classNames) {
    var _className = target.className;
    var arr = String(_className || "").trim().split(/\s+/);
    var cls = {};
    for (var cx = 0, dx = arr.length; cx < dx; cx++) {
        var c = arr[cx];
        if (c) cls[c] = true;
    }
    if (isString(classNames)) {
        var clsNames = classNames.trim().split(/\s+/);
        for (var cx = 0, dx = clsNames.length; cx < dx; cx++) {
            var c = clsNames[cx];
            if (c) cls[c] = true;
        }
    } else {
        merge(cls, classNames);
    }
    var newarr = [];
    for (var k in cls) {
        if (k && cls[k]) {
            newarr.push(k);
        }
    }
    target.className = newarr.join(" ");
}