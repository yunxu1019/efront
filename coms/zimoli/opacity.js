var isIE8 = /MSIE\s*[2-8]/.test(navigator.userAgent);
if (isIE8) {
    var opacity = function (element, opacity) {
        css(element, {
            filter: "Alpha(opacity=" + parseInt(opacity * 100) + ")",
        });
        [].map.call(element.children, function (element) {
            css(element, "filter:inherit");
        });
    };
} else {
    var opacity = function opacity(element, opacity) {
        css(element, {
            opacity: opacity,
        });
    };
}
