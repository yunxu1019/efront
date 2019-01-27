

function createTouchEvent(eventtype, extra = {}) {
    var event = createEvent(eventtype);
    event.touches = [extra];
    event.changedTouches = [extra];
    return event;
}
function test_scroll(banner) {
    var clientY = 10;
    var touchstartEvent = createTouchEvent("touchstart", { clientY });
    var touchendEvent = createTouchEvent("touchend");
    var deltaY = 100;
    dispatch(banner, touchstartEvent);
    var interval_handle = setInterval(function () {
        clientY -= deltaY;
        var touchmoveEvent = createTouchEvent("touchmove", { clientY });
        dispatch(banner, touchmoveEvent);
    }, 10);

    setTimeout(function () {
        deltaY = -10
    }, 300);
    setTimeout(function () {
        deltaY = 100
    }, 400);
    setTimeout(function () {
        deltaY = -10
    }, 420);
    setTimeout(function () {
        deltaY = -50
    }, 450);
    setTimeout(function () {
        deltaY = 50
    }, 470);
    setTimeout(function () {
        deltaY = -100050
    }, 480);
    setTimeout(function () {
        deltaY = +100050
    }, 490);
    setTimeout(function () {
        clearInterval(interval_handle);
        dispatch(banner, touchendEvent);
    }, 510);
}


function tree_test() {
    var banner = tree();
    api("/getAllComponents").success(function (result) {
        banner.src(result.result);
        banner.go(0);
        test_scroll(banner);
    }).error(function (err) {
        alert(err);
    });
    return banner;
}
