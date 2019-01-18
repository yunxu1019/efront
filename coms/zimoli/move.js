function getMarginLeft(offsetLeft, offsetWidth, innerWidth) {
    // -marginLeft/offsetWidth=(-marginLeft+offsetLeft)/innerWidth
    // marginLeft/innerWidth-marginLeft/offsetWidth=offsetLeft/innerWidth
    // marginLeft*offsetWidth-marginLeft*innerWidth=offsetLeft*offsetWidth
    // marginLeft(offsetWidth-innerWidth)=offsetLeft*offsetWidth
    // marginLeft=offsetLeft*offsetWidth/(offsetWidth-innerWidth)
    if (offsetWidth === +innerWidth) return -offsetWidth / 2;
    return offsetLeft * offsetWidth / (offsetWidth - innerWidth);
}
function move(offsetLeft, offsetTop, overflow = false) {
    var {
        offsetHeight,
        offsetWidth
    } = this;
    if (!overflow) {
        if (offsetLeft + offsetWidth > innerWidth) {
            offsetLeft = innerWidth - offsetWidth;
        }
        if (offsetTop + offsetHeight > innerHeight) {
            offsetTop = innerHeight - offsetHeight;
        }
        if (offsetLeft < 0) {
            offsetLeft = 0;
        }
        if (offsetTop < 0) {
            offsetTop = 0;
        }
    }
    var marginLeft = getMarginLeft(offsetLeft, offsetWidth, innerWidth);
    var marginTop = getMarginLeft(offsetTop, offsetHeight, innerHeight);
    var left = offsetLeft - marginLeft;
    var top = offsetTop - marginTop;
    css(this, `left:${left * 100 / innerWidth}%;top:${top * 100 / innerHeight}%;margin-left:${marginLeft}px;margin-top:${marginTop}px`);
}