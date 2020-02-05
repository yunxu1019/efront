var rootElements = [];
rootElements.pop = function () {
    var maxZIndex = 0, maxCX;
    for (var cx = rootElements.length - 1; cx >= 0; cx--) {
        var element = rootElements[cx];
        if (getTargetIn(element, document.activeElement)) {
            break;
        }
        var { zIndex } = element.style;
        if (zIndex > maxZIndex) {
            maxZIndex = zIndex;
            maxCX = cx;
        }
    }
    if (maxZIndex > 0) {
        cx = maxCX;
    }
    if (cx < 0) {
        cx = rootElements.length - 1;
    }
    return rootElements.splice(cx, 1)[0];
};