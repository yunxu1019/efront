"use strict";
var is_addEventListener_enabled = "addEventListener" in window;
var handlersMap = {};
if (is_addEventListener_enabled) {
    var on = function (k) {
        var on_event_path = "on" + k;
        if (handlersMap[on_event_path]) return handlersMap[on_event_path];
        function addhandler(element, handler) {
            if (handler instanceof Array) {
                handler.map(function (handler) {
                    this.addEventListener(k, handler);
                }, element);
                var remove = function () {
                    handler.map(function (handler) {
                        this.removeEventListener(k, handler);
                    }, element);
                };
            } else {
                element.addEventListener(k, handler);
                var remove = function () {
                    element.removeEventListener(k, handler);
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
            // 仅在hack事件中使用firstmost参数
            if (!(on_event_path in element)) {
                if (element === window && on_event_path in document) {
                    element = document;
                    if (!addhandler.logged) addhandler.logged = true, console.warn("use", on_event_path, "on document instead of on window");
                }
            }
            if (element[handler_path]) {
                if (firstmost) element[handler_path].unshift(handler);
                else element[handler_path].push(handler);
            } else {
                element[handler_path] = element[on_event_path] ? [element[on_event_path], handler] : [handler];
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