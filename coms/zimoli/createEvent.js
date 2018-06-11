/**
 * 创建自定义事件
 */
var createEvent = "createEvent" in document ? function createEvent(eventName, canBubble = false, cancelable = true) {
    var event = document.createEvent("Event");
    event.initEvent(eventName, canBubble, cancelable);
    return event;
} : function createEventObject(eventName) {
    var event = document.createEventObject();
    event.type = eventName;
    return event;
};