var dispatch = "dispatchEvent" in document ? function dispatchEvent(target, event) {
    return target.dispatchEvent(event);
} : function fireEvent(target, event) {
    var fire = "on" + event.type;
    try {
        return target.fireEvent(fire, event);
    } catch (e) {
        return target[fire] && target[fire](event);
    }
};
function dispatch2(t, e) {
    var on = 'on' + e.type;
    var f = t[on];
    if (f) {
        var fired, res, res2;
        t[on] = function (e) {
            res = f.call(this, e);
            fired = true;
        };
        res = dispatch(t, e);
        if (t[on]) {
            t[on] = f;
            if (!fired) res = t[on].call(t, e);
        }
    }
    return res !== false && res2 !== false;
}
function main() {
    var target, event, value;
    for (var cx = 0, dx = arguments.length; cx < dx; cx++) {
        var arg = arguments[cx];
        if (isNode(arg) || arg === window || arg === document) {
            target = arg;
        }
        else if (!event) {
            if (isString(arg)) {
                event = createEvent(arg);
            }
            else {
                event = arg;
            }
        }
        else {
            event.value = arg;
        }
    }
    if (dispatch2(target || window, event)) {
        return event;
    };
    return false;
}