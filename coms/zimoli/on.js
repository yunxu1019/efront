"use strict";
var is_addEventListener_enabled = "addEventListener" in window;
if (is_addEventListener_enabled) {
    var on = function (k) {
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
        return addhandler;
    };
} else {
    var on = function on(k) {
        var handler_path = k + "handlers";
        var on_event_path = "on" + k;
        function addhandler(element, handler) {
            if (element[handler_path]) {
                element[handler_path].push(handler);
            } else {
                element[handler_path] = element[on_event_path] ? [element[on_event_path], handler] : [handler];
                element[on_event_path] = function (e) {
                    if (!e) e = window.event || {};
                    if (!e.preventDefault) {
                        e.preventDefault = function () {
                            e.returnValue = false;
                        };
                    }
                    broadcast(element[handler_path], e);
                };
            }
            var broadcast = function (handlers, e) {
                for (var cx = 0, dx = handlers.length; cx < dx; cx++) {
                    var _handler = handlers[cx];
                    if (handler instanceof Function) {
                        handler.call(element, e);
                    } else if (handler instanceof Array) {
                        broadcast(handler, e);
                    }
                    handlers[cx].call(element, e);
                }
            };
            var remove = function () {
                var handlers = element[handler_path];
                for (var cx = handlers.length - 1; cx >= 0; cx--) {
                    if (handlers[cx] === handler) {
                        handlers.splice(cx, 1);
                    }
                }
            };
            return remove;
        }
        return addhandler;
    };
}