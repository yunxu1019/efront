var _onclick = on("click");
var saved_x, saved_y, lasttime_click;
var needFireClick = false;
var touchendFired = false;
function clickstart(event) {
    saved_x = event.clientX, saved_y = event.clientY;
    needFireClick = true;
    touchendFired = false;
    onclick.preventClick = false;
}
function clickcancel(event) {
    var abs = Math.abs;
    if (abs(event.clientX - saved_x) >= MOVELOCK_DELTA || abs(event.clientY - saved_y) >= MOVELOCK_DELTA)
        onclick.preventClick = true;
}
onmousedown(window, clickstart);
onmousemove(window, clickcancel);
ontouchstart(window, function (event) {
    extendTouchEvent(event);
    clickstart.call(this, event);
});
ontouchmove(window, function (event) {
    extendTouchEvent(event);
    clickcancel.call(this, event);
});
if (window.addEventListener) {
    window.addEventListener("touchend", function (event) {
        if (!needFireClick) return;
        if (event.touches.length > 1) return;
        touchendFired = true;
        var target = event.target;
        var touch = event.changedTouches[0];
        var clickEvent = document.createEvent("MouseEvents");
        clickEvent.touchend = true;
        clickEvent.initMouseEvent("click", true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
        dispatch(target, clickEvent);
    }, true);
    window.addEventListener("click", function (event) {
        if (!needFireClick) return;
        needFireClick = false;
        var saved_time = lasttime_click;
        lasttime_click = event.timeStamp;
        if (lasttime_click - saved_time < 60 || onclick.preventClick || touchendFired && !event.touchend) {
            // 阻止非人为点击，防止误操作
            event.preventDefault();
            event.stopPropagation();
            return;
        }
    }, true);
}
var onclick = _onclick;