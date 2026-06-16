var scrollbary = function () {
    var reshape = function (scrollHeight, offsetHeight) {
        var target = this.target;
        var targetHeight = target.offsetHeight;
        var targetTop = target.offsetTop;
        var restHeight = scrollHeight - offsetHeight;
        if (targetHeight === this.targetHeight && targetTop === this.targetTop && restHeight === this.restHeight) return;
        if (target) {
            if (targetHeight !== this.targetHeight || targetTop !== this.targetTop)
                css(this, { height: targetHeight, top: targetTop });
        }
        var scrollbarHeight = this.offsetHeight;
        var ratio = offsetHeight / scrollHeight;
        var thumbHeight = scrollbarHeight * ratio;
        if (thumbHeight < 36) thumbHeight = 36;
        this.targetHeight = targetHeight;
        this.targetTop = targetTop;
        this.restHeight = restHeight;
        if (thumbHeight !== this.thumb.height) css(this.thumb, {
            height: thumbHeight
        });
        this.thumb.height = thumbHeight;
        if (thumbHeight >= this.clientHeight) {
            this.style.opacity = 0;
        } else {
            this.style.opacity = 1;
            this.autoshow();
        }
    };
    var getTop = function () {
        var availableHeight = this.clientHeight - this.thumb.offsetHeight | 0;
        if (!availableHeight) return 0;
        if (availableHeight < 1) {
            availableHeight = 0;
        }
        var offsetTop = this.thumb.offsetTop;
        if (offsetTop < 1) offsetTop = 0;
        if (offsetTop > availableHeight - 1) offsetTop = availableHeight;
        return offsetTop / availableHeight * this.restHeight;
    };

    var scrollTo = function (scrollTop) {
        var thumb = this.thumb;
        var deltaHeight = this.clientHeight - thumb.offsetHeight;
        if (deltaHeight > 0) {
            var ratio = scrollTop / this.restHeight;
            var targetTop = +(ratio * deltaHeight).toFixed(4);
            if (targetTop > deltaHeight - 1) targetTop = deltaHeight;
            if (targetTop < 1) targetTop = 0;
            targetTop += "px";
            if (thumb.style.top !== targetTop) thumb.style.top = targetTop;
        }
    };

    var moving = null;

    var mousemove = function (event) {
        event.moveLocked = true;
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
                var targetTop = scroller.$Top() + delta;
                var target = scroller.target;
                scroller.scrollTo(targetTop);
                if (target) scroller.setTTop(targetTop);
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


    var setTargetTop = function (top) {
        var target = this.target;
        if (target.$Top instanceof Function) target.$Top(top);
        else target.scrollTop = top;
    };
    var getTargetTop = function () {
        var target = this.target;
        if (target.$Top instanceof Function) return target.$Top();
        return target.scrollTop;
    };
    var getListTop = function () {
        var target = this.target;
        var f = target.getFirstVisibleElement(0);
        if (!f) return;
        return f.index;
    }
    var isList = function (target) {
        return isObject(target) && isFunction(target.index) && isFunction(target.go) && isFunction(target.getFirstVisibleElement) && isFunction(target.getLastVisibleElement);
    }
    var getListHeight = function () {
        var target = this.target;
        var f = target.getFirstVisibleElement(0);
        var l = target.getLastVisibleElement(0);
        var height = 1;
        if (f && l) {
            height = l.index - f.index;
            if (height === 0) height = 1;
        }
        return [target.src.length, height];
    }
    var getTargetHeight = function () {
        var target = this.target;
        var Height, height;
        if (target.$Height instanceof Function) Height = target.$Height();
        else Height = target.scrollHeight;
        if (target.$height instanceof Function) height = target.$height();
        else height = target.clientHeight;
        return [Height, height];
    };
    var setListTop = function (top) {
        this.target.go(top);
    };

    function scrollbar(elem) {
        var onscroll = function () {
            if (moving) return;
            var top = _scrollbar.getTTop();
            if (isFinit(top)) {
                _scrollbar.scrollTo(top);
                _scrollbar.autoshow();
            }
        };
        var onchange = function () {
            var top = _scrollbar.$Top();
            this.setTTop(top);
        };
        function bindTarget(_container, followResize = _container) {
            _container.with = _scrollbar;
            _scrollbar.target = _container;
            if (isList(_container) && hasClass(_container, "list-y")) {
                this.getTTop = getListTop;
                this.setTTop = setListTop;
                this.getTHeight = getListHeight;
            }
            else {
                this.getTHeight = getTargetHeight;
                this.getTTop = getTargetTop;
                this.setTTop = setTargetTop;
            }
            on("scroll")(_container, onscroll);
            on("change")(_scrollbar, onchange);
            if (followResize) resizingList.set(followResize, _scrollbar.reshape);
        }
        var _scrollbar = elem || document.createElement("scrollbar");
        _scrollbar.$digest = _scrollbar.reshape = function () {
            if (!this.target) return;
            var [Height, height] = this.getTHeight();
            if (!isHandled(Height) || !isHandled(height)) return;
            reshape.call(_scrollbar, Height, height);
        };

        _scrollbar.scrollTo = scrollTo;
        var _handler = document.createElement("scrollbar-thumb");
        _handler.className = "thumb";
        var sidebar = document.createElement('scroll-side');
        _scrollbar.$Top = getTop;
        _scrollbar.autohide = lazy(function () {
            this.thumb.style.opacity = 0;
        }, 600);
        _scrollbar.autoshow = function () {
            if (!_scrollbar.nohide &&! _scrollbar.hasAttribute('nohide')) {
                this.autohide();
            }
            this.thumb.style.opacity = 1;
        };

        moveupon(_handler, {
            start: mousedown,
            move: mousemove,
            end: mouseup
        });
        onremove(_scrollbar, cancelscroll);
        onmousedown(_scrollbar, scrollerMousedown);
        appendChild(_scrollbar, _handler, sidebar);
        _scrollbar.thumb = _handler;
        _scrollbar.bindTarget = bindTarget;
        return _scrollbar;
    }
    return scrollbar;
}
var scrollbar_y = scrollbary();
var scrollbar_x = arriswise(scrollbary, arguments)();
var isBody = function (elem) {
    return elem ? hasClass(elem, 'body') || elem.hasAttribute('body') || /body$/i.test(elem.tagName) : false;
}
function main(elem) {
    var direction, bar, target;
    if (typeof elem === 'string') {
        direction = elem;
        elem = null;
    }
    else if (isElement(elem)) {
        if (elem.hasAttribute('y') || hasClass(elem, 'y')) direction = "y";
        else if (elem.hasAttribute('x') || hasClass(elem, 'x')) direction = "x";
        else direction = elem.tagName;
        target = elem.target;
        if (!target) {
            if (isBody(elem.previousElementSibling)) {
                target = elem.previousElementSibling;
            }
            else if (isBody(elem.nextElementSibling)) {
                target = elem.nextElementSibling;
            }
            else if (!/^(\w*\-?)?scroll/i.test(direction)) target = elem, elem = null;
        }
    }
    else {
        elem = null;
    }
    var bar, target;
    if (isElement(direction)) {
        target = direction;
        direction = target.tagName;
    }
    if (/^[xh]/i.test(direction)) {
        bar = scrollbar_x(elem);
        bar.setAttribute('x', '');
    } else {
        bar = scrollbar_y(elem);
        bar.setAttribute('y', '');
    }
    if (target) bar.bindTarget(target);
    return bar;
}