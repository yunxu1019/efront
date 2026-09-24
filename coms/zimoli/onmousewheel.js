var mousewheel = "onmousewheel" in window || "onmousewheel" in document ? "mousewheel" : "DOMMouseScroll";
var addDeltaY = function (event) {
    if (isNumber(event.deltaY)) return;
    if (isNumber(event.wheelDeltaY)) {
        event.deltaY = event.wheelDeltaY;
        event.deltaX = event.wheelDeltaX;
    } else if (isNumber(event.axis) && event.detail) {
        var delta = event.detail;
        if (delta > 0) {
            delta = 120 - 120 / (1 + delta / 12);
        } else {
            delta = 120 / (1 - delta / 12) - 120;
        }
        delta /= devicePixelRatio;
        if (event.axis === 1) {
            event.deltaX = delta;
            event.deltaY = 0;
        } else {
            event.deltaX = 0;
            event.deltaY = delta;
        }
    } else if (isNumber(event.wheelDelta)) {
        event.deltaY = event.wheelDelta;
    }
};
var _onmousewheel = on(mousewheel + '.passive');
var onmousewheel = function (target, handler) {
    return _onmousewheel(target, function (event) {
        addDeltaY(event);
        return handler.call(this, event);
    });
};
onmousewheel.on = function (k) {
    if (!k) return _onmousewheel;
    return on(mousewheel + '.' + k);
}