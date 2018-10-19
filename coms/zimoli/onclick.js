var _onclick = on("click");
var preventClick = false, saved_x, saved_y, lasttime_click;
function clickstart(event) {
    saved_x = event.clientX, saved_y = event.clientY;
    onclick.preventClick = preventClick = false;
}
function clickcancel(event) {
    var abs = Math.abs;
    if (abs(event.clientX - saved_x) >= MOVELOCK_DELTA || abs(event.clientY - saved_y) >= MOVELOCK_DELTA)
        onclick.preventClick = preventClick = true;
}
onmousedown(document, clickstart);
onmousemove(document, clickcancel);
ontouchstart(document, clickstart);
ontouchmove(document, clickcancel);
var onclick = function (target, handler) {

    return _onclick(target, function (event) {
        var saved_time = lasttime_click;
        lasttime_click = +new Date;
        if (lasttime_click - saved_time < 60) {
            // 阻止非人为点击，防止误操作
            return;
        }
        if (preventClick) return;
        return handler.call(this, event);
    });
}