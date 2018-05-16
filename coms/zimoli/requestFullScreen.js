var requestFullScreen = function (doc) {
    if (!doc) {
        doc = document.documentElement;
    }
    (doc.requestFullscreen || doc.mozRequestFullScreen || doc.webkitRequestFullScreen || noop).call(doc);
}