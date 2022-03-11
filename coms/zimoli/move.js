

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
function getParentSize(target) {
    if (isFinite(target.outerHeight)) {
        var {
            outerHeight: offsetHeight,
            outerhWidth: offsetWidth,
        } = target;
        var {
            availHeight: clientHeight,
            availWidth: clientWidth
        } = screen;
    } else {
        var {
            offsetHeight,
            offsetWidth
        } = target;
        var [clientWidth, clientHeight] = getParentClient(target);
    }
    return [offsetWidth, offsetHeight, clientWidth, clientHeight];
}

function move(offsetLeft, offsetTop, preventOverflow, keepOriginIfPosible) {
    var [offsetWidth, offsetHeight, clientWidth, clientHeight] = getParentSize(this);
    if (preventOverflow !== false) var [offsetLeft, offsetTop] = trimCoord([clientWidth, clientHeight], [offsetLeft, offsetTop, offsetWidth, offsetHeight], preventOverflow);
    if (isFunction(this.moveTo) && !this.style) {
        if (preventOverflow !== false) {
        }
        this.moveTo(offsetLeft, offsetTop);
    } else {
        var [left, top, marginLeft, marginTop] = coordIn([clientWidth, clientHeight], [offsetLeft, offsetTop, offsetWidth, offsetHeight]);
        var style = {};
        if (offsetLeft !== this.offsetLeft || keepOriginIfPosible !== false) {
            style.left = left;
            style.marginLeft = marginLeft;
        }
        if (offsetTop !== this.offsetTop || keepOriginIfPosible !== false) {
            style.top = top;
            style.marginTop = marginTop;
        }
        css(this, style);
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
    var [clientWidth, clientHeight] = getParentClient(target);
    var marginLeft = getMarginLeft(offsetLeft, offsetWidth, clientWidth);
    var marginTop = getMarginLeft(offsetTop, offsetHeight, clientHeight);
    var left = offsetLeft - marginLeft;
    var top = offsetTop - marginTop;
    return [left / clientWidth, top / clientHeight];
};
var getParentClient = function ({ offsetParent }) {
    if (offsetParent && /^(absolute|fixed|relative)$/i.test(getComputedStyle(offsetParent).position)) {
        var {
            clientWidth,
            clientHeight
        } = offsetParent;
    } else {
        clientWidth = innerWidth;
        clientHeight = innerHeight;
    }
    return [clientWidth, clientHeight];
};
var setPosition = move.setPosition = function (target, [x, y]) {
    var {
        offsetLeft,
        offsetTop,
        offsetHeight,
        offsetWidth
    } = target;
    var [clientWidth, clientHeight] = getParentClient(target);
    var offsetLeft = getOffsetLeft(x, offsetWidth, clientWidth);
    var offsetTop = getOffsetLeft(y, offsetHeight, clientHeight);
    move.call(target, offsetLeft, offsetTop, undefined, false);
};

var fixPosition = move.fixPosition = function (target) {
    var computed = getComputedStyle(target);
    var {
        offsetLeft,
        offsetTop,
        offsetHeight,
        offsetWidth
    } = target;
    var [clientWidth, clientHeight] = getParentClient(target);
    var pointLeft = (offsetLeft - parseFloat(computed.marginLeft)) / clientWidth;
    var pointTop = (offsetTop - parseFloat(computed.marginTop)) / clientHeight;
    var marginLeft = -offsetWidth * pointLeft;
    var marginTop = -offsetHeight * pointTop;
    if (Math.abs(parseFloat(computed.marginLeft) - marginLeft) >= 1 || Math.abs(parseFloat(computed.marginTop) - marginTop) >= 1) {
        css(target, { marginLeft: fromOffset(marginLeft), marginTop: fromOffset(marginTop) });
    }
};
move.coordIn = coordIn;
move.trimCoord = trimCoord;
var fixTarget = function () {
    fixPosition(this);
};
move.bindPosition = function (target, position) {
    oncemount(target, function () {
        setPosition(target, position);
    });
    on("resize")(target, fixTarget);
}