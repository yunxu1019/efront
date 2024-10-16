"use strict";
if (document.efronton) return document.efronton;
var is_addEventListener_enabled = !!window.addEventListener;
// Edg 禁用passive原因：无滚动条的元素上纵向滚动时触发整个页面回弹
// Chrome 禁用passive原因：无滚动条的元素上横向滚动触发浏览器导航
var supportPassive = false, preventPassive = /Edg|Chrome/.test(navigator.userAgent);
if (is_addEventListener_enabled) try {
    window.addEventListener('test', null, { get passive() { return supportPassive = true } });
} catch { }

var listenerOptions = [];
/**
 * @param {EventNeed} eventtype
 */
var getListenerOption = function (eventtype, k) {
    if (!supportPassive || preventPassive && /wheel$/.test(k)) return eventtype.capture;
    var index = +eventtype.capture | +eventtype.passive << 1;
    if (!listenerOptions[index]) listenerOptions[index] = { capture: eventtype.capture, passive: eventtype.passive };
    return listenerOptions[index];
};

if ('attachEvent' in document) {
    is_addEventListener_enabled = false;
}

if (!is_addEventListener_enabled) var __call = function (target, context, handler, firstmost) {
    // use strict 无效的情况
    if (isEmpty(target)) {
        this(context, context, handler, firstmost);
    }
    else {
        this(target, context, handler, firstmost);
    }
};

var handlersMap = {};
var changes_key = 'changes';
var eventtypereg = /(?:\.once|\.prevent|\.stop|\.capture|\.self|\.passive|\.only|\.[!-~←↑→↓⇄↵⨉]+)+\.?$/i;
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
    "⌘": 57,
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
    mute: 173,// 静音
    volumedown: 174,// 音量减
    quiet: 174,// 音量减
    volumeup: 175,// 音量加
    loud: 175,// 音量加
    next: 176,// 下一首
    prev: 177,// 上一首
    pause: 179,// 暂停/播放
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
    "?": 191,
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
class EventNeed {
    once = false;
    stop = false;
    capture = false;
    self = false;
    singly = false;
    prevent = false;
    passive = false;
    keyNeed = [];
    keyCode = 0
};
var parseEventTypes = function (eventtypes) {
    var types = new EventNeed;
    var keyneed = types.keyNeed;
    eventtypes = eventtypereg.exec(eventtypes);
    if (eventtypes) eventtypes = eventtypes[0].slice(1);
    if (eventtypes) {
        var etypes = eventtypes.split(".");
        etypes.forEach(t => {
            if (t.length === 1 && /^[0-9a-zA-Z]$/.test(t)) {
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
                case "only":
                    if (!types.keyCode) types.keyCode = true;
                    types.only = true;
                    break;
                default:
                    if (isFinite(t)) {
                        types.keyCode = +t;
                    }
                    else if (keyCodeMap[t]) {
                        types.keyCode = keyCodeMap[t];
                    }
                    else {
                        throw new Error(i18n`绑定事件参数无效${t}`);
                    }

            }

        });
    }
    return types;
}
/**
 * @param {EventNeed} eventtypes
 * @param {Event} e;
 */
function checkKeyNeed(eventtypes, e) {
    var keyneed = eventtypes.keyNeed;
    var keykeep = {}
    if (eventtypes.keyNeed) {
        for (var cx = 0, dx = keyneed.length; cx < dx; cx++) {
            var key = keyneed[cx];
            keykeep[key] = true;
            if (!e[key + "Key"] && e.keyCode !== keyCodeMap[key]) return false;
        }
    }
    if (eventtypes.only) {
        for (var key of ["meta", 'shift', 'ctrl', 'alt']) {
            if (!keykeep[key] && e[key + "Key"]) return false;
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
        h.pending = true;
        var res = h.call(this, event);
        if (res && isFunction(res.then) && this.setAttribute) {
            var id = ++pendingid;
            pendingid &= 0x7fffffff;
            this.setAttribute('pending', id);
            var removePending = () => {
                if (h.pending) setTimeout(function () {
                    h.pending = false;
                }, 120)
                if (+this.getAttribute('pending') === id) this.removeAttribute('pending');
            };
            res.then(removePending, removePending);
        }
        else h.pending = false
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
            if (h === handler && shallowEqual(e, eventtypes, 2) && c === context) {
                hs.splice(cx, 1);
                if (k === changes_key) element.$needchanges--;
            }
        }
        if (!hs.length && hs.h) {
            element[hk] = null;
            if (element.removeEventListener) {
                element.removeEventListener(k, hs.h, getListenerOption(eventtypes, k));
            }
            if (element["on" + k] === hs.h) element["on" + k] = null;
        }
    }
};
var broadcast = function (k, hk, event) {
    var element = this;
    var handlers = element[hk];
    if (handlers.length > 1) handlers = handlers.slice();
    if (event.which === 1 && event.buttons === 0) {
        // firefox 无按键
        Object.defineProperty(event, 'which', { value: 0 });
    }
    if (event.which === 1 && event.buttons === 2) {
        // firefox 右键
        Object.defineProperty(event, 'which', { value: 3 });
    }
    if (event.which === 1 && event.buttons === 4) {
        // firefox 中键
        Object.defineProperty(event, 'which', { value: 2 });
    }
    for (var [eventtypes, handler, context] of handlers) {
        if (eventtypes.self && event.target !== element) continue;
        if (!checkKeyNeed(eventtypes, event)) continue;
        if (eventtypes.stop) event.stopPropagation();
        if (eventtypes.passive && !preventPassive) event.preventDefault = function () { };
        if (eventtypes.prevent) event.preventDefault();
        if (eventtypes.singly && handler.pending) continue;
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
            // <!--
            if (!checkroot[k]) checkroot[k] = true, console.warn(i18n`使用 document 的`, k, "替代 window 的");
            // -->
        }
    }
    return element;
}

var append = function (k, hk, listener2, firstmost) {
    var [eventtypes, handler, context] = listener2;
    var element = this;
    var handlers = element[hk];
    for (var [e, h, c] of handlers) {
        if (h === handler && shallowEqual(eventtypes, e, 2) && c === context) return;
    }
    if (k === changes_key) {
        if (!element.$needchanges) element.$needchanges = 0;
        element.$needchanges++;
    }
    if (firstmost) handlers.unshift(listener2);
    else handlers.push(listener2);
};

var on = document.efronton = function (k) {
    var on_event_path = "on" + k;
    if (handlersMap[on_event_path]) return handlersMap[on_event_path];
    var eventtypes = parseEventTypes(k);
    k = k.replace(eventtypereg, '');
    var handler_path = "$h_" + k;
    var hk = handler_path + +!!eventtypes.capture;
    if (supportPassive) hk += +!!eventtypes.passive;
    if (is_addEventListener_enabled) var addhandler = function (context, handler, firstmost = false) {
        var target = this || context;
        target = checkroot(target, k);
        if (target[hk] instanceof Array) {
        } else {
            var h = broadcast.bind(target, k, hk);
            target[hk] = [];
            target[hk].h = h;
            if (target.addEventListener)
                target.addEventListener(k, h, getListenerOption(eventtypes, k));
            else target[on_event_path] = h;
        }
        var listener = [eventtypes, handler, context];
        append.call(target, k, hk, listener, firstmost);
        return remove.bind(target, k, hk, listener);
    };

    else {
        var _addhandler = function (target, context, handler, firstmost = false) {
            if (eventtypes.capture) {
                console.warn(i18n`当前运行环境不支持事件capture`);
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
        }, addhandler = function (context, handler, firstmost) {
            return _addhandler(context, context, handler, firstmost);
        };
        addhandler.call = __call.bind(_addhandler);
    }
    handlersMap[on_event_path] = addhandler;
    return addhandler;
};
var invoke = function (event, type, pointerType) {
    var target = event.target;
    var touch = event.changedTouches ? event.changedTouches[0] : event;
    var clickEvent = createEvent("MouseEvents");
    clickEvent.touchend = true;
    clickEvent.pointerType = pointerType
    clickEvent.initMouseEvent(type, true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
    dispatch(target, clickEvent);
};

(function () {
    var pointeractive = null;
    if ("onpointerdown" in document) return;
    document.onpointerdown = null;
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
    // 不再兼容fastclick
    var onclick = on("click");
    var onmousedown = on("mousedown");
    var onmousemove = on("mousemove");
    var pointerX, pointerY, lasttime_click;
    var needFireClick = false;
    var isClickWithPointer = false;
    var touchendFired = false;
    function clickstart(event) {
        needFireClick = true;
        touchendFired = false;
        isClickWithPointer = true;
        onclick.preventClick = false;
        pointerX = event.clientX, pointerY = event.clientY;
    }
    var dis = (a, b) => a * a + b * b
    function clickcancel(event) {
        if (!event || (event.which || event.touches) && dis(event.clientX - pointerX, event.clientY - pointerY) >= MOVELOCK_DELTA * MOVELOCK_DELTA) {
            onclick.preventClick = true;
        }
    }
    onmousedown(window, clickstart, true);

    onmousemove(window, clickcancel, true);
    if (window.addEventListener) {
        window.addEventListener("touchmove", function (event) {
            extendTouchEvent(event);
            clickcancel.call(this, event);
        }, true);
        window.addEventListener("touchstart", function (event) {
            if (event.touches.length > 1) {
                clickcancel();
                return;
            }
            extendTouchEvent(event);
            clickstart.call(this, event);
        }, true);
        window.addEventListener("touchend", function (event) {
            if (event.touches.length > 1) return;
            if (onclick.preventClick) return;
            needFireClick = true;
            touchendFired = true;
            invoke(event, 'click');
        }, true);
        var lasttime_dblclick = true;
        window.addEventListener("dblclick", function (event) {
            var saved_time = lasttime_dblclick;
            lasttime_dblclick = event.timeStamp;
            if (lasttime_dblclick - saved_time < 300) {
                event.preventDefault();
                event.stopPropagation();
                return;
            }
        }, true);
        window.addEventListener("click", function (event) {
            if (!isClickWithPointer) return;
            var need = needFireClick;
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
            if (lasttime_click - saved_time < 300) {
                invoke(event, 'dblclick');
            }
        }, true);
    }

}());

/**
 * 在挂载后执行
 * 如果是已挂载的元素，立即执行传入的函数
 * 如果是未挂载的元素，等到挂载时执行
 * @param {Element} target 
 * @param {Function} handle 
 */
var onmounted = on('mounted');
handlersMap["onmounted"] = function (target, handle) {
    if (isMounted(target)) {
        handle.call(target);
    }
    onmounted(target, handle);
};
