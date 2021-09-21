// 激活 自定义的 active 事件
function active(target, value, item) {
    var activeEvent = createEvent("active");
    activeEvent.item = item;
    activeEvent.value = value;
    activeEvent = dispatch(target, activeEvent);
    return activeEvent && !activeEvent.defaultPrevented;
}
