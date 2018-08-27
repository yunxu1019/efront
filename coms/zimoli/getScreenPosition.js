function getScreenPosition(target) {
    if (!target) return;
    if (target.getBoundingClientRect) {
        return target.getBoundingClientRect();
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
    return {
        left,
        top,
        width,
        height
    };
}