function getScreenPosition(target) {
    if (!target) return;
    if (target.getBoundingClientRect) {
        var rect = target.getBoundingClientRect();
        var { left, top, width, height, right, bottom } = rect;
        rect = { left, top, width, height, right, bottom };
        if (rect.width === undefined) {
            rect.width = rect.right - rect.left;
            rect.height = rect.bottom - rect.top;
        }
        return rect;
    }
    var left = target.offsetLeft,
        top = target.offsetTop,
        width = target.offsetWidth,
        height = target.offsetHeight;
    while (target.offsetParent) {
        target = target.offsetParent;
        left += target.offsetLeft - target.scrollLeft + target.clientLeft;
        top += target.offsetTop - target.scrollTop + target.clientTop;
    }
    var right = left + width,
        bottom = top + height;
    return {
        left,
        right,
        bottom,
        top,
        width,
        height
    };
}