var _onclick = on("click");
var preventClick = false, saved_x, saved_y;
onmousedown(window, function (event) {
    saved_x = event.clientX, saved_y = event.clientY;
    preventClick = false;
});
onmousemove(window, function (event) {
    var abs = Math.abs;
    if (abs(event.clientX - saved_x) > 2 || abs(event.clientY - saved_y) > 2)
        preventClick = true;
});
var onclick = function (target, handler) {
    return _onclick(target, function (event) {
        if (preventClick) return;
        return handler.call(this, event);
    });
}