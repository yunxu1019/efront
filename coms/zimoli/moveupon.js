var moveListeners = [], offhook;
function mousemove(event) {
    moveListeners.forEach(a => a(event));
}
function addHookListeners(on, hook) {
    // 后加入的要先执行
    var index = moveListeners.indexOf(hook);
    if (~index) {
        moveListeners.splice(index, 1);
    }
    if (!moveListeners.length) {
        offhook = on(window, mousemove);
    }
    moveListeners.unshift(hook);
}
function removeAllListeners() {
    moveListeners.splice(0, moveListeners.length);
    if (isFunction(offhook)) offhook();
    offhook = null;
}

function moveupon(target, { start, move, end }, initialEvent) {
    var touchLocked = false;
    var offmouseup, offtouchend, offtouchcancel;
    var mousemove = function (event) {
        if (isFunction(move)) move.call(target, event);
    };

    var touchmove = function (event) {
        extendTouchEvent(event);
        if (isFunction(move)) move.call(target, event);
    };
    var cancel = function (event) {
        if (event.touches && event.touches.length) return;
        removeAllListeners();
        if (isFunction(offmouseup)) offmouseup();
        if (isFunction(offtouchmove)) offtouchmove();
        if (isFunction(offtouchcancel)) offtouchcancel();
        if (isFunction(offtouchend)) offtouchend();

        touchLocked = false;
        if (isFunction(end)) end.call(target, event);
    };
    var hookmouse = function () {
        if (touchLocked) return;
        touchLocked = true;
        addHookListeners(onmousemove, mousemove);
        offmouseup = onmouseup(window, cancel);
    };
    var hooktouch = function () {
        if (touchLocked) return;
        touchLocked = true;
        addHookListeners(ontouchmove, touchmove);
        offtouchend = ontouchend(target, cancel);
        offtouchcancel = ontouchcancel(target, cancel);
    };
    if (!start) {
        if (!initialEvent) throw new Error("请传入touchstartEvent或者mousedownEvent");
        if (initialEvent.type === "mousedown") {
            hookmouse();
        } else {
            extendTouchEvent(initialEvent);
            initialEvent.preventDefault();
            hooktouch();
        }
        return;
    }
    onmousedown(target, function (event) {
        hookmouse(event);
        if (isFunction(start)) start.call(this, event);
    });
    ontouchstart(target, function (event) {
        extendTouchEvent(event);
        hooktouch(event);
        if (isFunction(start)) start.call(this, event);
    });
}