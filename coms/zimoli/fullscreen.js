var hasTarget = function () {
    return !!(document.fullscreenElement || document.msFullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement);
};
var fullscreen = {
    allow: function () {
        switch (null) {
            case document.fullscreenElement:
            case document.msFullscreenElement:
            case document.mozFullScreenElement:
            case document.webkitFullscreenElement:
                return true;
        }
        return hasTarget();
    }(),
    is() {
        if (/chrome/i.test(navigator.userAgent)) {//webkit
            var ratio = renderPixelRatio > 1 ? devicePixelRatio : 1;
            var innerHeight = window.innerHeight / ratio;
            var innerWidth = window.innerWidth / ratio;
            return window.innerHeight === screen.height && window.innerWidth === screen.width
                || screen.height - window.outerHeight <= 16 && screen.width <= innerWidth && window.outerWidth <= innerWidth
                || screen.width - window.outerWidth <= 16 && screen.height <= innerHeight && window.outerHeight <= innerHeight
        } else {//IE 9+  fireFox
            return window.outerHeight === screen.height && window.outerWidth === screen.width;
        }
    },
    hasTarget,
    exec(element) {
        requestFullScreen(element);
    },
    change() {
        if (this.is()) this.exit(alert);
        else this.exec(arguments[0] || document.documentElement);
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