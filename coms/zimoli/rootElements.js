var rootElements = [];
rootElements.pop = function (elem) {
    if (elem) {
        var index = rootElements.lastIndexOf(elem);
        if (~index) {
            rootElements.splice(index, 1);
        }
        return;
    }
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
    if (isFunction(rootElements[cx].onback) && rootElements[cx].onback() === false) return;
    return rootElements.splice(cx, 1)[0];
};
rootElements.mount = function (elem) {
    if (elem.parentNode) return;
    rootElements.push(elem);
    appendChild(document.documentElement, elem);
};
rootElements.unmount = function (elem) {
    if (!elem.parentNode) return;
    rootElements.pop(elem);
    remove(elem);
};
/**
 * 弹出层
 */
on("keydown.esc.only")(document, function (e) {
    if (e.defaultPrevented) return;
    if (rootElements.length) {
        var r = rootElements.pop();
        if (r) {
            r.blur();
            remove(r);
            e.preventDefault();
        }
    }
});
