
function createTouchEvent(eventtype, extra = {}) {
    var event = createEvent(eventtype);
    event.touches = extra ? [extra] : [];
    event.changedTouches = [extra];
    return event;
}


function _test_scroll() {
    var banner = this;
    var clientY = 2;
    var touchstartEvent = createTouchEvent("touchstart", { clientY, clientX: 0 });
    var deltaY = 100;
    onclick.preventClick = true;
    dispatch(banner, touchstartEvent);
    var interval_handle = setInterval(function () {
        clientY += deltaY;
        var touchmoveEvent = createTouchEvent("touchmove", { clientY, clientX: 0 });
        dispatch(window, touchmoveEvent);
    }, 10);

    setTimeout(function () {
        deltaY = -2
    }, 200);
    setTimeout(function () {
        deltaY = 5
    }, 400);
    setTimeout(function () {
        clearInterval(interval_handle);
    }, 510);
    setTimeout(function () {
        var touchendEvent = createTouchEvent("touchend");
        touchendEvent.touches.pop();
        dispatch(banner, touchendEvent);
    }, 560);
}

function main(banner) {
    oncemount(banner, _test_scroll);

}