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
    var target, event;
    for (var cx = 0, dx = arguments.length; cx < dx; cx++) {
        var arg = arguments[cx];
        if (isString(arg)) {
            event = createEvent(arg);
        } else if (isNode(arg)) {
            target = arg;
        } else {
            event = arg;
        }
    }
    if (dispatch(target || window, event)) {
        return event;
    };
    return false;
}