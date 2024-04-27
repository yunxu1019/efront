function getScreenPosition(target, bounding = true) {
    if (!target) {
        target = {
            offsetTop: 0,
            offsetLeft: 0,
            offsetWidth: +innerWidth,
            offsetHeight: +innerHeight
        };
    };
    if (!target.getBoundingClientRect) {
        var left = target.offsetLeft,
            top = target.offsetTop,
            width = target.offsetWidth,
            height = target.offsetHeight;
        if (bounding) while (target.offsetParent) {
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
    var rect = target.getBoundingClientRect();
    var { left, top, width, height, right, bottom } = rect;
    if (width === undefined) {
        width = right - left;
        height = bottom - top;
    }
    rect = { left, top, width, height, right, bottom };
    return rect;
}