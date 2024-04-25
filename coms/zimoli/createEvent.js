/**
 * 创建自定义事件
 */
if ("createEvent" in document) var createEvent = function createEvent(eventName, canBubble = false, cancelable = true) {
    var event = document.createEvent(/Events?$/.test(eventName) ? eventName : "Event");
    event.initEvent(eventName, canBubble, cancelable);
    return event;
}
else var createEvent = function createEventObject(eventName) {
    if ("createEventObject" in document) var event = document.createEventObject();
    else if (window.Event) event = new Event(eventName);
    else event = {};
    event.type = eventName;
    if (!event.initMouseEvent) event.initMouseEvent = function () { };
    return event;
}