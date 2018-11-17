function autodragmove(target, { start, move, end }, initialEvent) {
    var touchLocked = false;
    var offmousemove, offtouchmove, offmouseup, offtouchend, offtouchcancel;
    var mousemove = function (event) {
        move instanceof Function && move.call(this, event);
    };

    var touchmove = function (event) {
        extendTouchEvent(event);
        move instanceof Function && move.call(this, event);
    };
    var cancel = function (event) {
        offmousemove && offmousemove();
        offmouseup && offmouseup();
        offtouchmove && offtouchmove();
        offtouchcancel && offtouchcancel();
        offtouchend && offtouchend();
        touchLocked = false;
        end instanceof Function && end.call(this, event);
    };
    var hookmouse = function () {
        if (touchLocked) return;
        touchLocked = true;
        offmousemove = onmousemove(window, mousemove);
        offmouseup = onmouseup(window, cancel);
    };
    var hooktouch = function () {
        if (touchLocked) return;
        touchLocked = true;
        offtouchmove = ontouchmove(target, touchmove);
        offtouchend = ontouchend(target, cancel);
        offtouchcancel = ontouchcancel(target, cancel);
    };
    if (!start) {
        if (initialEvent) {
            if (initialEvent.type === "mousedown") {
                hookmouse();
            } else {
                hooktouch();
            }
        } else {
            hookmouse();
            hooktouch();
        }
        return;
    }
    onmousedown(target, function (event) {
        hookmouse(event);
        start instanceof Function && start.call(this, event);
    });
    ontouchstart(target, function (event) {
        hooktouch(event);
        extendTouchEvent(event);
        start instanceof Function && start.call(this, event);
    });
}