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
    if (dispatch(target || window, event)) {
        return event;
    };
    return false;
}