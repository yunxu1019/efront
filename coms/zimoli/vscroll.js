var scroll = function () {
    var scrollY = function (deltay, useIncrease) {
        deltay = scrollOutside.call(this, deltay);
        if (isFunction(this.$scrollY)) return this.$scrollY(deltay, useIncrease);
        var scrollTop = this.scrollTop;
        this.scrollTop += deltay;
        if (this.scrollTop === scrollTop) return false;
    };

    var Height = function () {
        if (isFunction(this.$Height)) return this.$Height();
        return this.scrollHeight;
    };
    var Top = function () {
        if (isFunction(this.$Top)) return this.$Top();
        return this.scrollTop;
    };
    var height = function () {
        if (isFunction(this.height)) return this.$height();
        return this.clientHeight;
    };
    var { max, min } = Math;
    var scrollOutside = function (deltay) {
        var _box = this;
        if (_box.YScrollBoxId === 1) return deltay;
        var offsetParent = _box.offsetParent;
        if (!offsetParent) return deltay;
        var _boxPosition = getScreenPosition(_box);
        var _parentPosition = getScreenPosition(offsetParent);
        if (_boxPosition.bottom - 1 >= _parentPosition.bottom && deltay > 0) {
            var deltaScroll = _boxPosition.bottom - _parentPosition.bottom;
            deltaScroll = min(deltay, deltaScroll);
            scrollY.call(offsetParent, deltaScroll, false);
            deltay = deltay - deltaScroll;
        } else if (_boxPosition.top < _parentPosition.top && deltay < 0) {
            var deltaScroll = _boxPosition.top - _parentPosition.top;
            deltaScroll = max(deltay, deltaScroll);
            scrollY.call(offsetParent, deltaScroll, false);
            deltay = deltay - deltaScroll;
        } else if (Top.call(_box) <= 0 && deltay < 0) {
            var top = Top.call(offsetParent);
            scrollY.call(offsetParent, deltay, false);
            deltaScroll = Top.call(offsetParent) - top;
            deltay = deltay - deltaScroll;
        } else if (Top.call(_box) + height.call(_box) >= Height.call(_box) && deltay > 0) {
            var top = Top.call(offsetParent);
            scrollY.call(offsetParent, deltay, false);
            deltaScroll = Top.call(offsetParent) - top;
            deltay = deltay - deltaScroll;
        }
        return scrollOutside.call(offsetParent, deltay);
    };
    return scrollY;
};
var Vscroll = {
    Y: scroll(),
    X: arriswise(scroll, arguments)()
};