/**
 * 创建自定义事件
 */
if ("createEvent" in document) var createEvent = function createEvent(eventName, canBubble = false, cancelable = true) {
    var event = document.createEvent("Event");
    event.initEvent(eventName, canBubble, cancelable);
    return event;
}
else if ("createEventObject" in document) var createEvent = function createEventObject(eventName) {
    var event = document.createEventObject();
    event.type = eventName;
    return event;
}
else var Event = window.Event, createEvent = function (eventName) {
    var event = new Event(eventName);
    return event;
}