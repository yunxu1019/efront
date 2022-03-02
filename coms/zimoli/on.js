"use strict";
if (document.efronton) return document.efronton;
var is_addEventListener_enabled = "addEventListener" in window;
var handlersMap = {};
var changes_key = 'changes';
var eventtypereg = /(?:\.once|\.prevent|\.stop|\.capture|\.self|\.passive|\.[a-z0-9]+)+\.?$/i;
var keyCodeMap = {
    backspace: 8,
    tab: 9,
    "⇄": 9,
    ceter: 12,// num5 when numlock is off.
    enter: 13,
    "↵": 13,
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
    "←": 37,
    up: 38,
    "↑": 38,
    right: 39,
    "→": 39,
    down: 40,
    "↓": 40,
    insert: 45,
    "ins": 45,
    delete: 46,
    del: 46,
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
    "⨉": 106,
    numplus: 107,
    numminus: 109,
    dot: 110,
    numdot: 110,
    divide: 111,
    div: 111,
    "/": 111,
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
    ";": 186,
    ":": 186,
    equal: 187,
    "=": 187,
    plus: 187,
    "+": 187,
    comma: 188,
    ",": 188,
    "<": 188,
    minus: 189,
    "-": 189,
    "_": 189,
    period: 190,
    ".": 110,
    ">": 110,
    slash: 191,
    "/": 191,
    ">": 191,
    backquote: 192,
    "`": 192,
    "~": 192,
    bracketleft: 219,
    "[": 219,
    "{": 219,
    backslash: 220,
    "\\": 220,
    "|": 220,
    bracketright: 221,
    "]": 221,
    "}": 221,
    quote: 222,
    "'": 222,
    "\"": 222,
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
function pending(h, event) {
    if (h instanceof Function) {
        var res = h.call(this, event);
        if (res && isFunction(res.then) && this.setAttribute) {
            var id = ++pendingid & 0x1fffffffffffff;
            this.setAttribute('pending', id);
            var removePending = () => {
                if (+this.getAttribute('pending') === id) this.removeAttribute('pending');
            };
            res.then(removePending, removePending);
        }
        return res;
    }
    return h;
}
var remove = function (k, hk, [eventtypes, handler, context]) {
    var element = this;
    var hs = element[hk];
    if (hs) {
        for (var cx = hs.length - 1; cx >= 0; cx--) {
            var [e, h, c] = hs[cx];
            if (h === handler && e === eventtypes && c === context) {
                hs.splice(cx, 1);
                if (k === changes_key) element.needchanges--;
            }
        }
        if (!hs.length && hs.h) {
            element[hk] = null;
            if (is_addEventListener_enabled) {
                element.removeEventListener(k, hs.h, /1$/.test(hk));
            } else {
                if (element["on" + k] === hs.h) element["on" + k] = null;
            }
        }
    }
};
var broadcast = function (k, hk, event) {
    var element = this;
    var handlers = element[hk];
    if (handlers.length > 1) handlers = handlers.slice();
    for (var [eventtypes, handler, context] of handlers) {
        if (eventtypes.self && event.target !== element) continue;
        if (!checkKeyNeed(eventtypes, event)) continue;
        if (eventtypes.stop) event.stopPropagation();
        if (eventtypes.passive) event.preventDefault = function () { };
        if (eventtypes.prevent) event.preventDefault();
        if (handler instanceof Array) {
            for (var h of handler) {
                h.call(context, event);
            }
        } else {
            pending.call(context, handler, event);
        }
        if (eventtypes.once) remove.call(element, k, hk, eventtypes, handler);
    }
};

var checkroot = function (element, k) {
    k = "on" + k;
    if (!(k in element)) {
        if (element === window && k in document) {
            element = document;
            if (!checkroot[k]) checkroot[k] = true, console.warn("使用 document 的", k, "替代 window 的");
        }
    }
    return element;
}

var append = function (k, hk, listener2, firstmost) {
    var [eventtypes, handler, context] = listener2;
    var element = this;
    var handlers = element[hk];
    for (var [h, e, c] of handlers) {
        if (h === handler && eventtypes === e && c === context) return;
    }
    if (k === changes_key) {
        if (!element.needchanges) element.needchanges = 0;
        element.needchanges++;
    }
    if (firstmost) handlers.unshift(listener2);
    else handlers.push(listener2);
};

var on = document.efronton = function (k) {
    var on_event_path = "on" + k;
    if (handlersMap[on_event_path]) return handlersMap[on_event_path];
    var eventtypes = parseEventTypes(k);
    k = k.replace(eventtypereg, '');
    var handler_path = k + "handlers";
    var hk = handler_path + +!!eventtypes.capture;
    if (is_addEventListener_enabled) var addhandler = function (context, handler, firstmost = false) {
        var target = this || context;
        target = checkroot(target, k);
        if (target[hk] instanceof Array) {
        } else {
            var h = broadcast.bind(target, k, hk);
            target[hk] = [];
            target[hk].h = h;
            target.addEventListener(k, h, eventtypes.capture);
        }
        var listener = [eventtypes, handler, context];
        append.call(target, k, hk, listener, firstmost);
        return remove.bind(target, k, hk, listener);
    };

    else var addhandler = function (context, handler, firstmost = false) {
        var target = this || context;
        if (eventtypes.capture) {
            console.warn("当前运行环境不支持事件capture");
            firstmost = true;
        }
        target = checkroot(target, k);
        if (target[handler_path] instanceof Array) {
        } else {
            var h = function (e) {
                if (!e) e = window.event || {};
                if (!e.target && e.srcElement) {
                    e.target = e.srcElement;
                }
                if (e.stopedPropagation) return;
                if (!e.stopPropagation) {
                    e.stopPropagation = function () {
                        this.stopedPropagation = true;
                    };
                }
                if (!e.preventDefault) {
                    e.preventDefault = function () {
                        e.returnValue = false;
                        e.defaultPrevented = true;
                    };
                }
                if (e.button) {
                    if (e.buttons === undefined) e.buttons = e.button;
                    if (e.which === undefined) e.which = e.button + 1;
                }
                if (e.keyCode) {
                    if (e.which === undefined) e.which = e.keyCode;
                }
                broadcast.call(target, k, handler_path, e);
                return e.returnValue;
            };
            target[handler_path] = target["on" + k] && target["on" + k] !== handler ? [[{}, target["on" + k]]] : [];
            target[handler_path].h = h;
            target["on" + k] = h;
        }
        var listener = [eventtypes, handler, context];
        append.call(target, k, handler_path, listener, firstmost);
        return remove.bind(target, k, handler_path, listener);
    };
    handlersMap[on_event_path] = addhandler;
    return addhandler;
};
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
    if ("onpointerdown" in window || document.efronton) return;
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
