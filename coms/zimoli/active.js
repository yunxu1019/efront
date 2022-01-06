// 激活 自定义的 active 事件
function active(target, value, item = value, srcElem) {
    var activeEvent = createEvent("active");
    activeEvent.item = item;
    activeEvent.value = value;
    if (srcElem) {
        if (Object.defineProperty) Object.defineProperty(activeEvent, 'currentTarget', { value: srcElem });
        else activeEvent.currentTarget = srcElem;
    }
    activeEvent = dispatch(target, activeEvent);
    return activeEvent && !activeEvent.defaultPrevented;
}
