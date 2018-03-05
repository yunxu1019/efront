var _onclick = on("click");
var preventClick = false, saved_x, saved_y, lasttime_click;
onmousedown(window, function (event) {
    saved_x = event.clientX, saved_y = event.clientY;
    onclick.preventClick = preventClick = false;
});
onmousemove(window, function (event) {
    var abs = Math.abs;
    if (abs(event.clientX - saved_x) > 2 || abs(event.clientY - saved_y) > 2)
        onclick.preventClick = preventClick = true;
});
var onclick = function (target, handler) {

    return _onclick(target, function (event) {
        saved_time = lasttime_click;
        lasttime_click = +new Date;
        if (lasttime_click - saved_time < 20) {
            // 阻止非人为点击，防止误操作
            return;
        }

        if (preventClick) return;
        return handler.call(this, event);
    });
}