"use strict";
var is_addEventListener_enabled = "addEventListener" in window;
var handlersMap = {};
var changes_key = 'changes';
var eventtypereg = /(?:\.once|\.prevent|\.stop|\.capture|\.self|\.passive|\.[a-z0-9]+)+\.?$/i;
var keyCodeMap = {
    backspace: 8,
    tab: 9,
    ceter: 12,// num5 when numlock is off.
    enter: 13,
    shift: 16,
    ctrl: 17,
    control: 17,
    alt: 18,
    pausebreak: 19,
    caps: 20,
    capslock: 20,
    esc: 27,
    escape: 27,
    space: 32,
    pageup: 33,
    pagedown: 34,
    end: 35,
    home: 36,
    left: 37,
    up: 38,
    right: 39,
    down: 40,
    insert: 45,
    delete: 46,
    key0: 47,
    key1: 48,
    key2: 49,
    key3: 50,
    key4: 51,
    key5: 52,
    key6: 53,
    key7: 54,
    key8: 55,
    key9: 56,
    meta: 57,
    help: 91,
    context: 93,
    menu: 93,
    contextmenu: 93,
    num0: 96,
    num1: 97,
    num2: 98,
    num3: 99,
    num4: 100,
    num5: 101,
    num6: 102,
    num7: 103,
    num8: 104,
    num9: 105,
    times: 106,
    numplus: 107,
    numminus: 109,
    dot: 110,
    divid: 111,
    f1: 112,
    f2: 113,
    f3: 114,
    f4: 115,
    f5: 116,
    f6: 117,
    f7: 118,
    f8: 119,
    f9: 120,
    f10: 121,
    f11: 122,
    f12: 123,
    num: 144,
    numlock: 144,
    scrolllock: 145,
    semicolon: 186,
    equal: 187,
    plus: 187,
    comma: 188,
    minus: 189,
    period: 190,
    slash: 191,
    backquote: 192,
    bracketleft: 219,
    backslash: 220,
    bracketright: 221,
    quote: 222,
    bright: 255,
};
var parseEventTypes = function (eventtypes) {
    var types = {
        once: false,
        stop: false,
        capture: false,
        self: false,
        prevent: false,
        passive: false,
        keyNeed: [],
        keyCode: 0,
    };
    var keyneed = types.keyNeed;
    eventtypes = eventtypereg.exec(eventtypes);
    if (eventtypes) eventtypes = eventtypes[0].slice(1);
    if (eventtypes) {
        var etypes = eventtypes.split(".");
        etypes.forEach(t => {
            if (t.length === 1) {
                types.keyCode = t.toUpperCase().charCodeAt(0);
                return;
            }
            t = t.toLowerCase();
            if (t in types) {
                types[t] = true;
            } else switch (t.toLowerCase()) {
                case "meta":
                case "alt":
                case "shift":
                case "ctrl":
                    keyneed.push(t);
                    break;
                case "":
                    if (!types.keyCode) types.keyCode = true;
                    break;
                default:
                    if (isFinite(t)) {
                        types.keyCode = +t;
                    }
                    else if (keyCodeMap[t]) {
                        types.keyCode = keyCodeMap[t];
                    }

            }

        });
    }
    return types;
}
function checkKeyNeed(eventtypes, e) {
    var keyneed = eventtypes.keyNeed;
    if (eventtypes.keyNeed) {
        for (var cx = 0, dx = keyneed.length; cx < dx; cx++) {
            var key = keyneed[cx];
            if (!e[key + "Key"]) return false;
        }
    }
    if (eventtypes.keyCode === true) {
        for (var cx = 0, dx = keyneed.length; cx < dx; cx++) {
            var key = keyneed[cx];
            if (e.keyCode === keyCodeMap[key]) return true;
        }
        return false;
    }
    if (eventtypes.keyCode) {
        return e.keyCode === eventtypes.keyCode;
    }
    return true;
}
var pendingid = 0;
function wrapHandler(h) {
    if (h instanceof Function) {
        return function () {
            var res = h.apply(this, arguments);
            if (res && isFunction(res.then)) {
                var id = ++pendingid & 0x1fffffffffffff;
                this.setAttribute('pending', id);
                var removePending = () => {
                    if (+this.getAttribute('pending') === id) this.removeAttribute('pending');
                };
                res.then(removePending, removePending);
            }
            return res;
        }
    }
    return h;
}
if (is_addEventListener_enabled) {
    var on = function (k) {
        var on_event_path = "on" + k;
        if (handlersMap[on_event_path]) return handlersMap[on_event_path];
        var eventtypes = parseEventTypes(k);
        k = k.replace(eventtypereg, '');
        function addhandler(element, handler, firstmost) {
            var target = this;
            handler = wrapHandler(handler);
            if (eventtypes.capture) firstmost = true;
            if (target && element !== target) {
                handler = handler.bind(element);
                element = target;
            }
            if (k === changes_key) {
                if (!element.needchanges) element.needchanges = 0;
                element.needchanges++;
            }
            var h = function (e) {
                if (eventtypes.self && e.target !== this) return;
                if (!checkKeyNeed(eventtypes, e)) return;
                if (eventtypes.stop) e.stopPropagation();
                if (eventtypes.passive) e.preventDefault = function () { };
                if (eventtypes.prevent) e.preventDefault();
                if (handler instanceof Array) {
                    handler.forEach(function (h) {
                        h.call(this, e);
                    }, this);
                } else {
                    handler.call(this, e);
                }
                if (eventtypes.once) remove();
            };
            var remove = function () {
                if (k === changes_key) element.needchanges--;
                element.removeEventListener(k, h, firstmost);
            };
            element.addEventListener(k, h, firstmost);
            return remove;
        }
        return handlersMap[on_event_path] = addhandler;
    };
} else {
    var on = function on(k) {
        var handler_path = k + "handlers";
        var on_event_path = "on" + k;

        var eventtypes = parseEventTypes(k);
        k = k.replace(eventtypereg, '');

        if (handlersMap[on_event_path]) return handlersMap[on_event_path];
        function addhandler(element, handler, firstmost = false) {
            var target = this;
            handler = wrapHandler(handler);
            if (eventtypes.capture) {
                console.warn("当前运行环境不支持事件capture");
                firstmost = true;
            }
            if (target && element !== target) {
                handler = handler.bind(element);
                element = target;
            }
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
                    if (!e.target && e.srcElement) {
                        e.target = e.srcElement;
                    }
                    if (eventtypes.self && e.target !== this) return;
                    if (!checkKeyNeed(eventtypes, e)) return;
                    if (e.stopedPropagation) return;
                    if (!e.stopPropagation) {
                        e.stopPropagation = function () {
                            this.stopedPropagation = true;
                        };
                    }
                    if (eventtypes.stop) {
                        e.stopPropagation();
                    }
                    if (!e.preventDefault) {
                        e.preventDefault = function () {
                            e.returnValue = false;
                        };
                    }
                    if (e.button) {
                        if (e.buttons === undefined) e.buttons = e.button;
                        if (e.which === undefined) e.which = e.button + 1;
                    }
                    if (e.keyCode) {
                        if (e.which === undefined) e.which = e.keyCode;
                    }
                    if (eventtypes.passive) {
                        e.preventDefault = function () { };
                    }
                    if (eventtypes.prevent) {
                        e.preventDefault();
                    }

                    broadcast(element[handler_path], e);
                    if (eventtypes.once) {
                        remove();
                    }
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
var invoke = function (event, type, pointerType) {
    var target = event.target;
    var touch = event.changedTouches ? event.changedTouches[0] : event;
    var clickEvent = document.createEvent("MouseEvents");
    clickEvent.touchend = true;
    clickEvent.pointerType = pointerType
    clickEvent.initMouseEvent(type, true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
    dispatch(target, clickEvent);
};

(function () {
    var pointeractive = null;
    if ("onpointerdown" in window) return;
    var getPointerType = function (event) {
        return event.type.replace(/(start|move|end|cancel|down|up|leave|out|over|enter)$/i, '');
    };
    var pointerdown = function (event) {
        if (pointeractive) return;
        pointeractive = getPointerType(event);
        invoke(event, 'pointerdown', pointeractive);
    };
    var pointerup = function (event) {
        var pointerType = getPointerType(event);
        if (!pointeractive || pointerType !== pointeractive) return;
        invoke(event, 'pointerup', pointerType);
    };
    var pointermove = function (event) {
        var pointerType = getPointerType(event);
        if (pointeractive && pointerType !== pointeractive) return;
        invoke(event, 'pointermove', pointerType);
    };
    on('mousedown')(window, pointerdown, true);
    on('mouseup')(window, pointerdown, true);
    on('touchstart')(window, pointerdown, true);
    on("touchmove")(window, pointermove, true);
    on("mousemove")(window, pointermove, true);
    on("touchend")(window, pointerup, true);
    on("touchcancel")(window, pointerup, true);
}());

(function () {
    // fastclick
    if (window.fastclick) return;
    if (document.efronton) return on = document.efronton;
    document.efronton = on;
    var onclick = on("click");
    var onmousedown = on("mousedown");
    var onmousemove = on("mousemove");
    var mouse_x, mouse_y, lasttime_click;
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
        lasttime_click = event.timeStamp;
        mouse_x = event.clientX, mouse_y = event.clientY;
        clickstart.call(this, event);
    });

    onmousemove(window, function (event) {
        if (abs(event.clientX - mouse_x) >= MOVELOCK_DELTA || abs(event.clientY - mouse_y) >= MOVELOCK_DELTA)
            clickcancel.call(this, event);
    });
    if (window.addEventListener) {
        window.addEventListener("touchmove", clickcancel, true);
        window.addEventListener("touchstart", clickstart, true);
        window.addEventListener("touchend", function (event) {
            if (event.touches.length > 1) return;
            if (onclick.preventClick) return;
            needFireClick = true;
            touchendFired = true;
            invoke(event, 'click');
        }, true);
        window.addEventListener("click", function (event) {
            if (!isClickWithPointer) return;
            var need = needFireClick;
            needFireClick = false;
            isClickWithPointer = false;
            var saved_time = lasttime_click;
            lasttime_click = event.timeStamp;
            if (!need || lasttime_click - saved_time < 60 || onclick.preventClick || touchendFired && !event.touchend) {
                // 阻止非人为点击，防止误操作
                event.preventDefault();
                event.stopPropagation();
                return;
            }
        }, true);
    }

}());
