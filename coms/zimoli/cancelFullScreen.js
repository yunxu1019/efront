function cancelFullScreen() {
    (document.exitFullscreen || document.msExitFullscreen || document.mozCancelFullScreen || document.webkitCancelFullScreen || noop).call(document);
}