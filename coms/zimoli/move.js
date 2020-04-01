

/**
 * 让子窗口位置适应父窗口大小变化，即让两窗口锁定点的位置比例相等
 */
function getMarginLeft(offsetLeft, offsetWidth, innerWidth) {
    // -marginLeft/offsetWidth=(-marginLeft+offsetLeft)/innerWidth
    // marginLeft/innerWidth-marginLeft/offsetWidth=offsetLeft/innerWidth
    // marginLeft*offsetWidth-marginLeft*innerWidth=offsetLeft*offsetWidth
    // marginLeft(offsetWidth-innerWidth)=offsetLeft*offsetWidth
    // marginLeft=offsetLeft*offsetWidth/(offsetWidth-innerWidth)
    if (offsetWidth === +innerWidth) return -offsetWidth / 2;
    return offsetLeft * offsetWidth / (offsetWidth - innerWidth);
}

function getOffsetLeft(x, offsetWidth, innerWidth) {
    // left=x*innerWidth;
    // marginLeft=offsetLeft-left
    // -marginLeft/offsetWidth=(-marginLeft+offsetLeft)/innerWidth
    // (left-offsetLeft)/offsetWidth=(left-offsetLeft+offsetLeft)/innerWidth
    // (left-offsetLeft)/offsetWidth=left/innerWidth
    // (left-offsetLeft)/offsetWidth=x
    // (left-offsetLeft)=x*offsetWidth
    // offsetLeft=left-x*offsetWidth
    // offsetLeft=x*innerWidth-x*offsetWidth
    // offsetLeft=x*(innerWidth-offsetWidth)
    return x * (innerWidth - offsetWidth);
}
function move(offsetLeft, offsetTop, preventOverflow = true) {
    var {
        offsetHeight,
        offsetWidth
    } = this;
    var {
        clientWidth = innerWidth,
        clientHeight = innerHeight
    } = this.offsetParent || {};
    if (preventOverflow !== false) {
        if (offsetLeft + offsetWidth > clientWidth) {
            offsetLeft = clientWidth - offsetWidth;
        }
        if (offsetTop + offsetHeight > clientHeight) {
            offsetTop = clientHeight - offsetHeight;
        }
        if (offsetLeft < 0) {
            offsetLeft = 0;
        }
        if (offsetTop < 0) {
            offsetTop = 0;
        }
    }
    var marginLeft = getMarginLeft(offsetLeft, offsetWidth, clientWidth);
    var marginTop = getMarginLeft(offsetTop, offsetHeight, clientHeight);
    var left = offsetLeft - marginLeft;
    var top = offsetTop - marginTop;
    css(this, `left:${left * 100 / clientWidth}%;top:${top * 100 / clientHeight}%;margin-left:${fromOffset(marginLeft)};margin-top:${fromOffset(marginTop)}`);
}
move.getPosition = function (target) {
    var {
        offsetLeft,
        offsetTop,
        offsetHeight,
        offsetWidth
    } = target;
    var {
        clientWidth = innerWidth,
        clientHeight = innerHeight
    } = this.offsetParent || {};
    var marginLeft = getMarginLeft(offsetLeft, offsetWidth, clientWidth);
    var marginTop = getMarginLeft(offsetTop, offsetHeight, clientHeight);
    var left = offsetLeft - marginLeft;
    var top = offsetTop - marginTop;
    return [left / clientWidth, top / clientHeight];
};

move.setPosition = function (target, [x, y]) {
    var {
        offsetLeft,
        offsetTop,
        offsetHeight,
        offsetWidth
    } = target;
    var {
        clientWidth = innerWidth,
        clientHeight = innerHeight
    } = this.offsetParent || {};
    var offsetLeft = getOffsetLeft(x, offsetWidth, clientWidth);
    var offsetTop = getOffsetLeft(y, offsetHeight, clientHeight);
    move.call(target, offsetLeft, offsetTop);
};