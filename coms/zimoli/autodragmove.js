function autodragmove(target, { start, move, end }) {
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
    onmousedown(target, function (event) {
        if (touchLocked) return;
        touchLocked = true;
        offmousemove = onmousemove(window, mousemove);
        offmouseup = onmouseup(window, cancel);
        start instanceof Function && start.call(this, event);
    });
    ontouchstart(target, function (event) {
        if (touchLocked) return;
        extendTouchEvent(event);
        touchLocked = true;
        offtouchmove = ontouchmove(event.target, touchmove);
        offtouchend = ontouchend(target, cancel);
        offtouchcancel = ontouchcancel(target, cancel);
        start instanceof Function && start.call(this, event);
    });
}