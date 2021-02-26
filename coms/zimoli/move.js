

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
function trimLeft(clientWidth, offsetWidth, offsetLeft, type) {
    if (clientWidth >= offsetWidth) {
        if (type <= 0) {
            offsetLeft = (clientWidth - offsetWidth) / 2;
        } else if (offsetWidth + offsetLeft > clientWidth) {
            offsetLeft = clientWidth - offsetWidth;
        } else if (offsetLeft < .5) offsetLeft = 0;
    } else if (type <= 0) {
        if (offsetWidth + offsetLeft < clientWidth) {
            offsetLeft = clientWidth - offsetWidth;
        } else if (offsetLeft > .5) offsetLeft = 0;
    }
    return offsetLeft;
}
function trimCoord([clientWidth, clientHeight], [offsetLeft, offsetTop, offsetWidth, offsetHeight], trimtype) {
    offsetLeft = trimLeft(clientWidth, offsetWidth, offsetLeft, trimtype);
    offsetTop = trimLeft(clientHeight, offsetHeight, offsetTop, trimtype);
    return [offsetLeft, offsetTop];
}
function coordIn([clientWidth, clientHeight], [offsetLeft, offsetTop, offsetWidth, offsetHeight]) {
    var marginLeft = getMarginLeft(offsetLeft, offsetWidth, clientWidth);
    var marginTop = getMarginLeft(offsetTop, offsetHeight, clientHeight);
    var left = offsetLeft - marginLeft;
    var top = offsetTop - marginTop;
    return [left * 100 / clientWidth + "%", top * 100 / clientHeight + "%", fromOffset(marginLeft), fromOffset(marginTop)];
}
function move(offsetLeft, offsetTop, preventOverflow) {
    if (isFinite(this.outerHeight)) {
        var {
            outerHeight: offsetHeight,
            outerhWidth: offsetWidth,
        } = this;
        var {
            availHeight: clientHeight,
            availWidth: clientWidth
        } = screen;
    } else {
        var {
            offsetHeight,
            offsetWidth
        } = this;
        var {
            clientWidth = innerWidth,
            clientHeight = innerHeight
        } = this.offsetParent || {};
    }

    [offsetLeft, offsetTop] = trimCoord([clientWidth, clientHeight], [offsetLeft, offsetTop, offsetWidth, offsetHeight], preventOverflow);
    if (isFunction(this.moveTo) && !this.style) {
        if (preventOverflow !== false) {
        }
        this.moveTo(offsetLeft, offsetTop);
    } else {
        var [left, top, marginLeft, marginTop] = coordIn([clientWidth, clientHeight], [offsetLeft, offsetTop, offsetWidth, offsetHeight]);
        css(this, { left, top, marginLeft, marginTop });
    }
    return [offsetLeft, offsetTop];
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
    } = this && this.offsetParent || {};
    var offsetLeft = getOffsetLeft(x, offsetWidth, clientWidth);
    var offsetTop = getOffsetLeft(y, offsetHeight, clientHeight);
    move.call(target, offsetLeft, offsetTop);
};

move.coordIn = coordIn;
move.trimCoord = trimCoord;