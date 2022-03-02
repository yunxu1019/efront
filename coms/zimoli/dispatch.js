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
/**
 * @param {Event} e 
 */
function dispatch2(t, e) {
    var on = 'on' + e.type;
    var f = t[on];
    var res = dispatch(t, e);
    if (f && (t.nodeType !== 1 || t.constructor === window.HTMLUnknownElement)) {
        return f.call(t, e) !== false;
    }
    return res;
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