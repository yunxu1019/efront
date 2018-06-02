function drag(target, event, overflow = false) {
    var saved_delta = { x: target.offsetLeft - event.clientX, y: target.offsetTop - event.clientY };
    var cancelmousemove = onmousemove(window, function (event) {
        event.preventDefault();
        var left = saved_delta.x + event.clientX;
        var top = saved_delta.y + event.clientY;
        if (!overflow) {
            if (left + target.offsetWidth > innerWidth) {
                left = innerWidth - target.offsetWidth;
            }
            if (top + target.offsetHeight > innerHeight) {
                top = innerHeight - target.offsetHeight;
            }
            if (left < 0) {
                left = 0;
            }
            if (top < 0) {
                top = 0;
            }
        }
        css(target, `left:${left}px;top:${top}px;`);
    });
    var cancelmouseup = onmouseup(window, function (event) {
        cancelmousemove();
        cancelmouseup();
    });
}