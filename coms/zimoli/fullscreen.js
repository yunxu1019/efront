var fullscreen = {
    is() {
        if (/chrome/i.test(navigator.userAgent)) {//webkit
            return window.innerHeight === screen.height && window.innerWidth === screen.width
                || (screen.height - window.outerHeight <= 16 && window.outerWidth <= window.innerWidth)
                || (screen.width - window.outerWidth <= 16 && window.outerHeight <= window.innerHeight);
        } else {//IE 9+  fireFox
            return window.outerHeight === screen.height && window.outerWidth === screen.width;
        }
    },
    hasTarget() {
        return !!(document.fullscreenElement || document.msFullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement);
    },
    exec(element) {
        requestFullScreen(element);
    },
    exit(alert) {
        if (this.hasTarget()) cancelFullScreen();
        else
            var error = "按 F11 退出全屏";
        if (isFunction(alert) && error) alert(error);
        return error;
    }
};
fullscreen.request = fullscreen.requestFullscreen = fullscreen.exec;
fullscreen.cancel = fullscreen.exitFullscreen = fullscreen.exit;