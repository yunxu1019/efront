var maxWidth = function (target, pixels_count) {
    return css(target, "max-width:" + fromPixel(pixels_count));
};
if (/MSIE\s*[2-7]/.test(navigator.userAgent)) {
    maxWidth = function (target, pixels_count) {
        var width = target.style.width;
        if (String(width).charAt(width.length - 1) === "%") {
            width = parseInt(width) / 100;
            return css(target, "width:expression(this.parentNode.offsetWidth*" + width + ">" + pixels_count + "?" + pixels_count + ":this.parentNode.offsetWidth*" + width + ");");
        }
    }
}