var hooked = false;
var keydown = code => function () {
    var event = document.createEvent("KeyboardEvent");
    Object.defineProperty(event, 'keyCode', { value: code });
    event.initEvent("keydown", false, false);
    dispatch(window, event);
};
try {
    var { mediaSession } = navigator;
} catch { }
if (!mediaSession) return function () { };
var metadata = window.MediaMetadata ? new window.MediaMetadata : null;
return function () {
    if (hooked) return metadata;
    hooked = true;
    var Next = 176;
    var Prev = 177;
    var pause = 179;
    var play = 179;
    var volumeup = 175;
    var volumedown = 174;
    var mute = 173;
    mediaSession.setActionHandler('play', keydown(play));
    mediaSession.setActionHandler('pause', keydown(pause));
    mediaSession.setActionHandler("nexttrack", keydown(Next));
    mediaSession.setActionHandler("previoustrack", keydown(Prev));
    if (metadata) mediaSession.metadata = metadata;
    return metadata;
};