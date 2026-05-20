var moveListeners = [], offhook;
function mousemove(event) {
    moveListeners.forEach(a => a(event));
}
function addHookListener(on, hook, isroot) {
    if (!moveListeners.length) {
        offhook = on(window, mousemove);
    }
    else {
        var index = moveListeners.indexOf(hook);
        if (~index) {
            moveListeners.splice(index, 1);
        }
    }
    if (isroot) {
        moveListeners.unshift(hook);
    } else {
        moveListeners.push(hook);
    }
}
function removeAllListeners() {
    moveListeners.splice(0, moveListeners.length);
    if (isFunction(offhook)) offhook();
    offhook = null;
}
if (/Firefox/.test(navigator.userAgent)) on('dragstart')(document, function (e) {
    if (e.target.draggable === false) {
        e.preventDefault();
        return false;
    }
});
var locktouch = function (target, handles) {
    var resizing = moveupon.resizing;
    if (resizing) return resizing !== handles;
    if (target.resizable) return false;
    if (/(input|textarea|select)/i.test(target.tagName) || getTargetIn(a => String(a.contentEditable) === 'true' || a.draggable, target)) {
        return true;
    } else {
        var { childNodes } = target;
        var a = getTargetIn(a => {
            if ((getComputedStyle(a).userSelect || getComputedStyle(a).webkitUserSelect) !== 'auto') return a;
        });
        if (!a) return;
        var computed = getComputedStyle(a);
        if (computed.cursor === 'auto' && (computed.userSelect || computed.webkitUserSelect) !== 'none') for (var cx = 0, dx = childNodes.length; cx < dx; cx++) {
            var child = childNodes[cx];
            if (child.nodeType === 3) {
                return true;
            }
        }
    }
};
var getX = function (event) {
    if ('screenX' in event) return event.screenX;
    return event.clientX;
};
var getY = function (event) {
    if ('screenY' in event) return event.screenY;
    return event.clientY;
};
function moveupon(target, handles, initialEvent) {
    var { start, move, end } = handles;
    var touchLocked = false;
    var savedX, savedY;
    var offmouseup, offtouchend, offtouchcancel;
    var setMovement = function (event) {
        if ("movementX" in event) return
        var x = getX(event);
        event.movementX = x - savedX;
        savedX = x;
        var y = getY(event);
        event.movementY = y - savedY;
        savedY = y;
    }
    var mousemove = function (event) {
        setMovement(event);
        if (isFunction(move)) move.call(target, event);
    };

    var touchmove = function (event) {
        setMovement(event);
        extendTouchEvent(event);
        if (isFunction(move)) move.call(target, event);
    };
    var cancel = function (event) {
        if (event.touches && event.touches.length) return;
        if (event.touches) extendTouchEvent(event);
        if (onclick.preventClick) event.preventDefault();
        removeAllListeners();
        if (isFunction(offmouseup)) offmouseup();
        if (isFunction(offtouchcancel)) offtouchcancel();
        if (isFunction(offtouchend)) offtouchend();

        touchLocked = false;
        if (isFunction(end)) end.call(target, event);
    };
    var hookmouse = function () {
        addHookListener(onmousemove, mousemove, target === window);
        offmouseup = onmouseup(window, cancel);
    };
    var hooktouch = function () {
        addHookListener(ontouchmove, touchmove, target === window);
        offtouchend = ontouchend(target, cancel);
        offtouchcancel = ontouchcancel(target, cancel);
    };

    if (initialEvent) {
        if (locktouch(initialEvent.target, handles)) return;
        if (initialEvent.type === "touchstart") {
            extendTouchEvent(initialEvent);
            initialEvent.preventDefault();
            hooktouch();
        } else {
            hookmouse();
        }
        if (isFunction(start)) start.call(target, initialEvent);
        return;
    }
    onmousedown(target, function (event) {
        if (touchLocked) return;
        if (locktouch(event.target, handles)) return;
        touchLocked = true;
        hookmouse(event);
        savedX = getX(event);
        savedY = getY(event);
        if (isFunction(start)) start.call(this, event);
    });
    ontouchstart(target, function (event) {
        if (touchLocked) return;
        if (locktouch(event.target, handles)) return;
        touchLocked = true;
        extendTouchEvent(event);
        savedX = getX(event);
        savedY = getY(event);
        hooktouch(event);
        if (isFunction(start)) start.call(this, event);
    });
}