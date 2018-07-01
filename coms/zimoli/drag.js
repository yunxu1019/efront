function getMarginLeft(offsetLeft, offsetWidth, innerWidth) {
    // -marginLeft/offsetWidth=(-marginLeft+offsetLeft)/innerWidth
    // marginLeft/innerWidth-marginLeft/offsetWidth=offsetLeft/innerWidth
    // marginLeft*offsetWidth-marginLeft*innerWidth=offsetLeft*offsetWidth
    // marginLeft(offsetWidth-innerWidth)=offsetLeft*offsetWidth
    // marginLeft=offsetLeft*offsetWidth/(offsetWidth-innerWidth)
    if (offsetWidth === +innerWidth) return -offsetWidth / 2;
    return offsetLeft * offsetWidth / (offsetWidth - innerWidth);
}
function drag(target, event, overflow = false) {
    var saved_delta = { x: target.offsetLeft - event.clientX, y: target.offsetTop - event.clientY };
    var cancelmousemove = onmousemove(window, function (event) {
        if (event.defaultPrevented) return;
        if (!saved_delta.ing) {
            var abs = Math.abs;
            if (abs(target.offsetLeft - event.clientX - saved_delta.x < 3) && abs(target.offsetTop - event.clientY - saved_delta.y) < 3) return;
            saved_delta.ing = true;
        }
        event.preventDefault();
        var offsetLeft = saved_delta.x + event.clientX;
        var offsetTop = saved_delta.y + event.clientY;
        var {
            offsetHeight,
            offsetWidth
        } = target;
        if (!overflow) {
            if (offsetLeft + offsetWidth > innerWidth) {
                offsetLeft = innerWidth - offsetWidth;
            }
            if (offsetTop + offsetHeight > innerHeight) {
                offsetTop = innerHeight - offsetHeight;
            }
            if (offsetLeft < 0) {
                offsetLeft = 0;
            }
            if (offsetTop < 0) {
                offsetTop = 0;
            }
        }
        var marginLeft = getMarginLeft(offsetLeft, offsetWidth, innerWidth);
        var marginTop = getMarginLeft(offsetTop, offsetHeight, innerHeight);
        var left = offsetLeft - marginLeft;
        var top = offsetTop - marginTop;
        css(target, `left:${left * 100 / innerWidth}%;top:${top * 100 / innerHeight}%;margin-left:${marginLeft}px;margin-top:${marginTop}px`);
    });
    var cancelmouseup = onmouseup(window, function (event) {
        saved_delta = null;
        cancelmousemove();
        cancelmouseup();
    });
}