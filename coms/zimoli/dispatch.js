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