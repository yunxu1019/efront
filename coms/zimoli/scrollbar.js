var scrollbary = function () {
    var reshape = function (scrollHeight, offsetHeight) {
        var target = this.target;
        if (target) {
            css(this, { height: target.offsetHeight });
        }
        var scrollbarHeight = this.offsetHeight;
        var ratio = offsetHeight / scrollHeight;
        var thumbHeight = scrollbarHeight * ratio;
        if (thumbHeight < 14) thumbHeight = 14;
        if (thumbHeight < 0) thumbHeight = 0;
        this.restHeight = scrollHeight - offsetHeight;
        css(this.thumb, {
            height: thumbHeight
        });
        if (thumbHeight >= this.clientHeight) {
            this.style.opacity = 0;
        } else {
            this.style.opacity = 1;
            this.autoshow();
        }
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
        if (targetY + thumb.offsetHeight > target.clientHeight) {
            targetY = target.clientHeight - thumb.offsetHeight;
        }
        if (targetY < 0) {
            targetY = 0;
        }
        deltaY = targetY - thumbTop;
        moving.y += deltaY;
        if (targetY !== thumbTop) {
            css(thumb, { top: targetY });
            dispatch(target, "change");
        }
    };

    var mouseup = function () {
        moving = null;
    };
    var mousedown = function (event) {
        event.preventDefault();
        moving = {
            x: event.clientX,
            y: event.clientY,
            target: this.parentNode,
            thumb: this
        };
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
        var Height = target.scrollHeight, height = target.clientHeight;
        if (target.Height instanceof Function) Height = target.Height();
        if (target.height instanceof Function) height = target.height();
        return { Height, height };
    };

    function bindTarget(_container, followResize = _container) {
        var _scrollbar = this;
        _container.with = _scrollbar;
        _scrollbar.target = _container;
        onmounted(_container, _scrollbar.reshape);
        on("scroll")(_container, function () {
            var top = getTargetTop(_container);
            _scrollbar.scrollTo(top);
            _scrollbar.autoshow();
        });
        on("change")(_scrollbar, function () {
            var top = _scrollbar.Top();
            setTargetTop(_container, top);
        });
        if (followResize) on("resize")(followResize, _scrollbar.reshape);
    }
    function scrollbar(elem) {
        var _scrollbar = elem || document.createElement("scrollbar");
        _scrollbar.reshape = function () {
            var _container = _scrollbar.target;
            var { Height, height } = getTargetHeight(_container);
            reshape.call(_scrollbar, Height, height);
        };
        _scrollbar.scrollTo = scrollTo;
        var _handler = document.createElement("scrollbar-thumb");
        _handler.className = "thumb";
        _scrollbar.Top = getTop;
        _scrollbar.autohide = lazy(function () {
            this.thumb.style.opacity = 0;
        }, 600);
        _scrollbar.autoshow = function () {
            this.autohide();
            this.thumb.style.opacity = 1;
        };

        moveupon(_handler, {
            start: mousedown,
            move: mousemove,
            end: mouseup
        });
        onremove(_scrollbar, cancelscroll);
        onmousedown(_scrollbar, scrollerMousedown);
        appendChild(_scrollbar, _handler);
        _scrollbar.thumb = _handler;
        _scrollbar.bindTarget = bindTarget;
        return _scrollbar;
    }
    return scrollbar;
}
var scrollbar_y = scrollbary();
var scrollbar_x = arriswise(scrollbary, arguments)();
function main(direction) {
    var bar, target;
    if (isElement(direction)) {
        target = direction;
        direction = target.tagName;
    }
    if (/^[xh]/i.test(direction)) {
        bar = scrollbar_x();
    } else {
        bar = scrollbar_y();
    }
    if (target) bar.bindTarget(target);
    return bar;
}