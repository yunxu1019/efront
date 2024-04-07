// 激活 自定义的 active 事件
function active(target, value, item = value, srcElem) {
    var dispatchEvent = function (eventname) {
        var activeEvent = createEvent(eventname);
        activeEvent.item = item;
        activeEvent.value = value;
        if (srcElem) {
            if (Object.defineProperty) Object.defineProperty(activeEvent, 'active', { value: srcElem });
            else activeEvent.active = srcElem;
        }
        activeEvent = dispatch(target, activeEvent);
    };
    var activeEvent = dispatchEvent("active");
    var actived = activeEvent && !activeEvent.defaultPrevented;
    if (actived !== false) {
        Promise.resolve().then(function () {
            dispatchEvent("actived");
        });
    }
    return actived;
}
