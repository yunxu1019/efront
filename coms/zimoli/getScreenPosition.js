function getScreenPosition(target) {
    if (!target) return;
    var left = target.offsetLeft,
        top = target.offsetTop,
        width = target.offsetWidth,
        height = target.offsetHeight;
    while (target.offsetParent) {
        target = target.offsetParent;
        left += target.offsetLeft - target.scrollLeft;
        top += target.offsetTop - target.scrollTop;
    }
    return {
        left,
        top,
        width,
        height
    };
}