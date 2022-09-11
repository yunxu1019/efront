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
var locktouch = function (target) {
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
        if (event.touches) extendTouchEvent(event);
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

    if (!start) {
        if (!initialEvent) throw new Error("请传入touchstartEvent或者mousedownEvent");
        if (locktouch(initialEvent.target)) return;
        if (initialEvent.type === "touchstart") {
            extendTouchEvent(initialEvent);
            initialEvent.preventDefault();
            hooktouch();
        } else {
            hookmouse();
        }
        return;
    }
    onmousedown(target, function (event) {
        if (touchLocked) return;
        if (locktouch(event.target)) return;
        touchLocked = true;
        hookmouse(event);
        if (isFunction(start)) start.call(this, event);
    });
    ontouchstart(target, function (event) {
        if (touchLocked) return;
        if (locktouch(event.target)) return;
        touchLocked = true;
        extendTouchEvent(event);
        hooktouch(event);
        if (isFunction(start)) start.call(this, event);
    });
}