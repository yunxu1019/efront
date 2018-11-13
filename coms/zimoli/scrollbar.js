var reshape = function (scrollHeight, offsetHeight) {
    var target = this.target;
    if (target) {
        this.style.height = target.offsetHeight + "px";
    }
    var scrollbarHeight = this.offsetHeight;
    var ratio = offsetHeight / scrollHeight;
    var thumbHeight = scrollbarHeight * ratio;
    if (thumbHeight < 14) thumbHeight = 14;
    if (thumbHeight + 20 > scrollbarHeight) thumbHeight = scrollbarHeight - 20;
    if (thumbHeight < 0) thumbHeight = 0;
    this.restHeight = scrollHeight - offsetHeight;
    this.thumb.style.height = thumbHeight + "px";
};
var getTop = function () {
    var availableHeight = this.offsetHeight - this.thumb.offsetHeight;
    if (!availableHeight) return 0;
    return this.thumb.offsetTop / availableHeight * this.restHeight;
};

var scrollTo = function (scrollTop) {
    var thumb = this.thumb;
    var deltaHeight = this.offsetHeight - thumb.offsetHeight;
    if (deltaHeight > 0) {
        var ratio = scrollTop / this.restHeight;
        var targetTop = +(ratio * deltaHeight).toFixed(4);
        if (targetTop > deltaHeight) targetTop = deltaHeight;
        if (targetTop < 0) targetTop = 0;
        targetTop += "px";
        if (thumb.style.top !== targetTop) thumb.style.top = targetTop;
    }
};

var moving = null;

var mousemove = function (event) {
    var deltaY = event.clientY - moving.y;
    if (!moving.ing) {
        if (Math.abs(deltaY) < MOVELOCK_DELTA) return;
        moving.ing = true;
    }
    var {
        thumb,
        target
    } = moving;
    var thumbTop = thumb.offsetTop;
    var targetY = deltaY + thumbTop;
    if (targetY + thumb.offsetHeight > target.offsetHeight) {
        targetY = target.offsetHeight - thumb.offsetHeight;
    }
    if (targetY < 0) {
        targetY = 0;
    }
    deltaY = targetY - thumbTop;
    moving.y += deltaY;
    if (targetY !== thumbTop) {
        thumb.style.top = targetY + "px";
        dispatch(target, "change");
    }
};

var mousedown = function (event) {
    event.preventDefault();
    moving = {
        x: event.clientX,
        y: event.clientY,
        target: this.parentNode,
        thumb: this
    };
    var cancel = function () {
        moving = null;
        offmousemove();
        offmouseup();
    };
    var offmousemove = onmousemove(window, mousemove);
    var offmouseup = onmouseup(window, cancel);
};
var scrollingTimer = 0;
var scrollTimerTarget;
var startscroll = function (delta) {
    var scroller = this;
    var run = function () {
        var thumbPosition = getScreenPosition(scroller.thumb);
        if (delta > 0 && thumbPosition.bottom - delta / 6 < scrollTimerTarget || delta < 0 && thumbPosition.top - delta / 6 > scrollTimerTarget) {
            var targetTop = scroller.Top() + delta;
            var target = scroller.target;
            scroller.scrollTo(targetTop);
            if (target) setTargetTop(target, targetTop);
        }
        scrollingTimer = setTimeout(run, nextTickTime);
        delta = (delta + saved_delta) / 2;
    };
    var nextTickTime = 200;
    var saved_delta = delta / 3;
    delta -= saved_delta;
    run();
    delta = 0;
    nextTickTime = 15;
};
var cancelscroll = function () {
    clearTimeout(scrollingTimer);
};
var scrollerMousemove = function (event) {
    scrollTimerTarget = event.clientY;
};
var scrollerMousedown = function (event) {
    event.preventDefault();
    if (event.target !== this) return;
    cancelscroll();
    var mouseup = function () {
        cancelscroll();
        offmouseup();
        offmousemove();
    };
    var offmouseup = onmouseup(window, mouseup);
    var offmousemove = onmousemove(window, scrollerMousemove);
    var thumb = this.thumb;
    scrollerMousemove(event);
    startscroll.call(this, event.clientY > getScreenPosition(thumb).top ? this.offsetHeight : -this.offsetHeight);
    once("mouseup")(window, cancelscroll);
}


var setTargetTop = function (target, top) {
    if (target.Top instanceof Function) target.Top(top);
    else target.scrollTop = top;
};
var getTargetTop = function (target) {
    if (target.Top instanceof Function) return target.Top();
    return target.scrollTop;
};

var getTargetHeight = function (target) {
    var Height = target.scrollHeight, height = target.offsetHeight;
    if (target.Height instanceof Function) Height = target.Height();
    if (target.height instanceof Function) height = target.height();
    return { Height, height };
};

function bindTarget(_container) {
    var _scrollbar = this;
    _container.with = _scrollbar;
    onappend(_container, function () {
        var { Height, height } = getTargetHeight(_container);
        _scrollbar.reshape(Height, height);
    });
    _scrollbar.target = _container;
    on("scroll")(_container, function () {
        var top = getTargetTop(_container);
        _scrollbar.scrollTo(top);
    });
    on("change")(_scrollbar, function () {
        var top = _scrollbar.Top();
        setTargetTop(_container, top);
    });
}
function scrollbar() {
    var _scrollbar = div();
    _scrollbar.reshape = reshape;
    _scrollbar.scrollTo = scrollTo;
    var _handler = div();
    _handler.className = "thumb";
    _scrollbar.Top = getTop;
    onmousedown(_handler, mousedown);
    onremove(_scrollbar, cancelscroll);
    onmousedown(_scrollbar, scrollerMousedown);
    appendChild(_scrollbar, _handler);
    _scrollbar.thumb = _handler;
    _scrollbar.bindTarget = bindTarget;
    return _scrollbar;
}