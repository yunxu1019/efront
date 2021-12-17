// 激活 自定义的 active 事件
function active(target, value, item, targetElement) {
    var activeEvent = createEvent("active");
    activeEvent.item = item;
    activeEvent.value = value;
    if (targetElement) {
        if (Object.defineProperty) Object.defineProperty(activeEvent, 'currentTarget', { value: targetElement });
        else activeEvent.currentTarget = targetElement;
    }
    activeEvent = dispatch(target, activeEvent);
    return activeEvent && !activeEvent.defaultPrevented;
}
