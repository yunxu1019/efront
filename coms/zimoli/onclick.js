var _onclick = on("click");
var preventClick = false;
onmousedown(window, function (event) {
    preventClick = false;
});
onmousemove(window, function (event) {
    preventClick = true;
});
var onclick = function (target, handler) {
    return _onclick(target, function (event) {
        if (preventClick) return;
        return handler.call(this, event);
    });
}