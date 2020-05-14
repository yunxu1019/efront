"use strict";
var is_addEventListener_enabled = "addEventListener" in window;
var handlersMap = {};
var changes_key = 'changes';
if (is_addEventListener_enabled) {
    var on = function (k) {
        var on_event_path = "on" + k;
        if (handlersMap[on_event_path]) return handlersMap[on_event_path];
        function addhandler(element, handler, firstmost) {
            if (k === changes_key) {
                if (!element.needchanges) element.needchanges = 0;
                element.needchanges++;
            }
            if (handler instanceof Array) {
                handler = handler.slice(0);
                handler.map(function (handler) {
                    this.addEventListener(k, handler, firstmost);
                }, element);

                var remove = function () {
                    if (k === changes_key) element.needchanges--;
                    handler.map(function (handler) {
                        this.removeEventListener(k, handler, firstmost);
                    }, element);
                };
            } else {
                element.addEventListener(k, handler, firstmost);
                var remove = function () {
                    if (k === changes_key) element.needchanges--;
                    element.removeEventListener(k, handler, firstmost);
                };
            }
            return remove;
        }
        return handlersMap[on_event_path] = addhandler;
    };
} else {
    var on = function on(k) {
        var handler_path = k + "handlers";
        var on_event_path = "on" + k;
        if (handlersMap[on_event_path]) return handlersMap[on_event_path];
        function addhandler(element, handler, firstmost = false) {
            if (k === changes_key) {
                if (!element.needchanges) element.needchanges = 0;
                element.needchanges++;
            }
            // 仅在hack事件中使用firstmost参数
            if (!(on_event_path in element)) {
                if (element === window && on_event_path in document) {
                    element = document;
                    if (!addhandler.logged) addhandler.logged = true, console.warn("use", on_event_path, "on document instead of on window");
                }
            }
            if (element[handler_path] instanceof Array) {
                if (~element[handler_path].indexOf(handler)) return;
                if (firstmost) element[handler_path].unshift(handler);
                else element[handler_path].push(handler);
            } else {
                element[handler_path] = element[on_event_path] && element[on_event_path] !== handler ? [element[on_event_path], handler] : [handler];
                element[on_event_path] = function (e) {
                    if (!e) e = window.event || {};
                    if (!e.preventDefault) {
                        e.preventDefault = function () {
                            e.returnValue = false;
                        };
                    }
                    if (e.button) {
                        if (e.buttons === undefined) e.buttons = e.button;
                        if (e.which === undefined) e.which = e.button;
                    }
                    if (!e.target && e.srcElement) {
                        e.target = e.srcElement;
                    }
                    broadcast(element[handler_path], e);
                };
                var broadcast = function (handlers, e) {
                    for (var cx = 0, dx = handlers.length; cx < dx; cx++) {
                        var _handler = handlers[handlers.length + cx - dx];
                        if (_handler instanceof Function) {
                            _handler.call(element, e);
                        } else if (_handler instanceof Array) {
                            broadcast(_handler, e);
                        }
                    }
                };
            }
            var remove = function () {
                if (k === changes_key) element.needchanges--;
                var handlers = element[handler_path];
                for (var cx = handlers.length - 1; cx >= 0; cx--) {
                    if (handlers[cx] === handler) {
                        handlers.splice(cx, 1);
                    }
                }
                if (!handlers.length) {
                    element[handler_path] = null;
                    element[on_event_path] = null;
                }
            };
            return remove;
        }
        return handlersMap[on_event_path] = addhandler;
    };
    if (!("onmousedown" in window)) on("mousedown")(document, function () {
        var cancelup = on("mouseup")(document, function () {
            cancelmove();
            cancelup();
        }, true);
        var cancelmove = on("mousemove")(document, function (event) {
            if (!event.which) dispatch("mouseup", document)/* ,console.warn("dispatch mouseup nanually.")*/;
        }, true);
    });
}

(function () {
    // fastclick
    var onclick = on("click");
    var onmousedown = on("mousedown");
    var onmousemove = on("mousemove");
    var ontouchstart = on("touchstart");
    var ontouchmove = on("touchmove");
    var mouse_x, mouse_y, touch_x, touch_y, lasttime_click;
    var needFireClick = false;
    var isClickWithPointer = false;
    var touchendFired = false;
    function clickstart() {
        needFireClick = true;
        touchendFired = false;
        isClickWithPointer = true;
        onclick.preventClick = false;
    }
    var abs = Math.abs;
    function clickcancel() {
        onclick.preventClick = true;
    }
    onmousedown(window, function (event) {
        mouse_x = event.clientX, mouse_y = event.clientY;
        clickstart.call(this, event);
    });

    onmousemove(window, function (event) {
        if (abs(event.clientX - mouse_x) >= MOVELOCK_DELTA || abs(event.clientY - mouse_y) >= MOVELOCK_DELTA)
            clickcancel.call(this, event);
    });
    ontouchstart(window, function (event) {
        extendTouchEvent(event);
        touch_x = event.clientX, touch_y = event.clientY;
        clickstart.call(this, event);
    });
    ontouchmove(window, function (event) {
        extendTouchEvent(event);
        if (abs(event.clientX - touch_x) >= MOVELOCK_DELTA || abs(event.clientY - touch_y) >= MOVELOCK_DELTA)
            clickcancel.call(this, event);
    });
    if (window.addEventListener) {
        window.addEventListener("touchend", function (event) {
            if (event.touches.length > 1) return;
            needFireClick = true;
            touchendFired = true;
            var target = event.target;
            var touch = event.changedTouches[0];
            var clickEvent = document.createEvent("MouseEvents");
            clickEvent.touchend = true;
            clickEvent.initMouseEvent("click", true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
            dispatch(target, clickEvent);
        }, true);
        window.addEventListener("click", function (event) {
            var need = needFireClick || !isClickWithPointer;
            needFireClick = false;
            isClickWithPointer = false;
            var saved_time = lasttime_click;
            lasttime_click = event.timeStamp;
            if (!need || lasttime_click - saved_time < 120 || onclick.preventClick || touchendFired && !event.touchend) {
                // 阻止非人为点击，防止误操作
                event.preventDefault();
                event.stopPropagation();
                return;
            }
        }, true);
    }

}());
