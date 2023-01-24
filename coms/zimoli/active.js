// 激活 自定义的 active 事件
function active(target, value, item = value, srcElem) {
    var activeEvent = createEvent("active");
    activeEvent.item = item;
    activeEvent.value = value;
    if (srcElem) {
        if (Object.defineProperty) Object.defineProperty(activeEvent, 'active', { value: srcElem });
        else activeEvent.active = srcElem;
    }
    activeEvent = dispatch(target, activeEvent);
    return activeEvent && !activeEvent.defaultPrevented;
}
