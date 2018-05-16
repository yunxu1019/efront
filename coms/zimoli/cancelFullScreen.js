function cancelFullScreen() {
    (document.exitFullscreen || document.mozCancelFullScreen || document.webkitCancelFullScreen || noop).call(document);
}