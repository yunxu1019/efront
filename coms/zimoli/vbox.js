function ybox(generator) {
    var scrollY = vscroll.Y;
    var abs = Math.abs;
    var sqrt = Math.sqrt;
    var sign = Math.sign || function (a) {
        return +a > 0 ? 1 : -a > 0 ? -1 : 0;
    };
    var _box;
    if (isNode(generator)) {
        _box = generator;
    } else {
        _box = createElement(div);
    }
    _box.height = function () {
        return _box.clientHeight;
    };
    isFunction(generator) && generator(_box);
    // totalHeight
    _box.Height = _box.Height || function () {
        return _box.scrollHeight;
    };
    // currentTop
    var _scrolledTop = _box.scrollTop;
    _box.Top = _box.Top || function (top) {
        if (isNumber(top)) {
            if (_box.scrollTop !== top) {
                _box.scrollTop = top;
            }
            _scrolledTop = top;
        }
        return _box.scrollTop;
    };
    _box.stopY = _box.stopY || function (stopedY) {
        if (isNumber(stopedY)) {
            return stopedY;
        }
        return _box.Top();
    };
    _box.scrollY = function (deltay, useIncrease = true) {
        var _Top = _box.Top();
        var top = _Top + deltay;
        var height = _box.height();
        var scrollHeight = _box.Height();
        if (top < 0) {
            // if (speed > 30) speed = 30;
            __speed = __speed >> 1;
            useIncrease && _Top <= 0 && increase(top);
            top = 0;
            _Top = _box.Top(top);
        } else if (top + height > scrollHeight) {
            // if (speed > 30) speed = 30;
            if (top + height - scrollHeight > increase_height) {
                top = increase_height + scrollHeight - height;
            }
            __speed = __speed >> 1;
            useIncrease && _Top + height >= scrollHeight && increase(top + height - scrollHeight);
            _Top = _box.Top(top);
        } else {
            _Top = _box.Top(top);
            increase(deltay, true);
        }
        return _Top;
    };
    var __speed = 0;
    var smooth = function smooth(useIncrease = true) {
        var abs_speed = abs(__speed << 2) / time_splitter;
        var abs_speed = abs(__speed << 2) / time_splitter;
        if (abs_speed < 1) {
            cancelFrame();
            decrease();
            return;
        }
        onclick.preventClick = true;
        smooth_timer = requestAnimationFrame(() => smooth(useIncrease));
        scrollY.call(_box, -__speed, useIncrease);
        __speed = __speed - sign(__speed) * (abs_speed - sqrt(abs_speed) * sqrt(abs_speed - 1));
    };
    var increaser_t = document.createElement("insert");
    addClass(increaser_t, 'y-insert');
    var increaser_b = increaser_t.cloneNode();
    var decrease_timer = 0;
    var time_splitter = 16;
    var _speed = speed(time_splitter);
    var increase_height = calcPixel(100);
    var _decrease = function (increaser) {
        var height = parseInt(increaser.height);
        if (height > 1) {
            var scrollTop = _box.Top();
            if (scrollTop > 0 && increaser_t === increaser) {
                var deltaY = scrollTop > height ? height : scrollTop;
                height -= deltaY;
                _box.Top(scrollTop - deltaY);
            }
            var tH = _box.Height();
            var bH = _box.height();
            if (scrollTop + bH < tH && increaser_b === increaser) {
                var deltaY = tH - bH - scrollTop > height ? height : tH - bH - scrollTop;
                height -= deltaY;
            }
            increaser.height = height = height > 16 ? (height * 2 + 6) / 3 : height >> 1;
            increaser.style.height = fromOffset(height | 0);
            return 1;
        }
        increaser.height = 0;
        increaser.style.height = 0;
        remove(increaser);
        return 0;
    };
    var stop_timer = 0, stop_id = 0, cancel_id = 0;
    var stop = lazy(function stop() {
        if (cancel_id !== stop_id) return;
        __speed = _speed(0);
        if (Math.abs(_box.stopY() - _box.Top() > 0.0001)) stop_timer = setTimeout(stop, 16);
    }, 310);
    var cancelFrame = function () {
        __speed = _speed(0);
        clearTimeout(stop_timer);
        cancelAnimationFrame(smooth_timer);
        cancelAnimationFrame(decrease_timer);
        return ++cancel_id;
    };
    var decrease = function () {
        if (_decrease(increaser_t) + _decrease(increaser_b)) decrease_timer = requestAnimationFrame(decrease);
        else {
            stop_id = cancelFrame();
            stop();
        }
    };
    var increase = function (deltaY, minusOnly) {
        var t_height = increaser_t.height || 0;
        var b_height = increaser_b.height || 0;
        t_height -= deltaY;
        b_height += deltaY;
        if (!minusOnly && deltaY < 0 && t_height > 0) {
            if (!increaser_t.nextSibling) {
                _box.insertBefore(increaser_t, _box.childNodes[0] || null);
            }
        } else if (!minusOnly && deltaY > 0 && b_height > 0) {
            if (!increaser_b.previousSibling) {
                increaser_b.style.marginTop = 0;
                increaser_b.style.marginBottom = 0;
                increaser_b.height = 0;
                increaser_b.style.height = 0;
                appendChild(_box, increaser_b);
                var deltaMargin = _box.scrollHeight - increaser_b.offsetTop;
                if (deltaMargin > 0) {
                    increaser_b.style.marginTop = fromOffset(deltaMargin);
                    var paddingBottom = getComputedStyle(_box).paddingBottom;
                    if (paddingBottom) {
                        paddingBottom = "-" + paddingBottom;
                        paddingBottom = paddingBottom.replace(/^\-{2}/, "");
                    }
                    increaser_b.style.marginBottom = paddingBottom;
                }
            }
        }
        if (b_height > increase_height) b_height = increase_height;
        if (t_height > increase_height) t_height = increase_height;
        if (b_height < 0) b_height = 0;
        if (t_height < 0) t_height = 0;
        if (!minusOnly || b_height < increaser_b.height) increaser_b.height = b_height, increaser_b.style.height = fromOffset(b_height);
        if (!minusOnly || t_height < increaser_t.height) increaser_t.height = t_height, increaser_t.style.height = fromOffset(t_height);
    };
    if (/Edge|Trident/i.test(navigator.userAgent)) {
        // ie
        addClass(_box, "trident");
    } else {
        onmousewheel(_box, function (event) {
            cancelAnimationFrame(smooth_timer);
            cancelAnimationFrame(decrease_timer);
            var deltay = -event.deltaY;
            if (event.moveLocked) return;
            event.moveLocked = true;
            var box;
            if (deltay > 0) {
                box = getTargetIn(e => e === _box || /^(?:auto|scroll)$/i.test(getComputedStyle(e).overflowY) && e.scrollTop > 0, event.target);
            } else {
                box = getTargetIn(e => e === _box || /^(?:auto|scroll)$/i.test(getComputedStyle(e).overflowY) && e.scrollHeight - e.scrollTop > e.clientHeight, event.target);
            }
            if (box === _box) {
                event.preventDefault();
                scrollY.call(_box, -deltay, false);
                smooth(false);
            }
        });
        bindtouch(_box, {
            start() {
                cancelFrame();
            },
            move(scrolled) {
                var y = -this.Top();
                if (scrolled) {
                    var { deltay } = scrolled;
                    __speed = _speed(deltay);
                    scrollY.call(this, -deltay);
                    y += deltay;
                }
                return { y };
            },
            end() {
                __speed = _speed();
                smooth();
            }
        }, 'y');
    }

    var smooth_timer;
    var initScrollId = function () {
        var temp = this.parentNode;
        var scrollId = 0;
        while (temp && !scrollId) {
            if (isFinite(temp.YScrollBoxId)) scrollId = temp.YScrollBoxId;
            temp = temp.parentNode;
        }
        this.YScrollBoxId = +scrollId + 1;
    }
    if (isMounted(_box)) initScrollId.call(_box);
    on("append")(_box, initScrollId);
    _box.cancelFrame = cancelFrame;
    preventOverflowScrolling(_box);
    return _box;
}
var allArgumentsNames = arguments[arguments.length - 1];
var xbox = arriswise(ybox, [].concat(allArgumentsNames, [].slice.call(arguments, 0)));

/**
 * vbox 纵向滑动框
 * 传入一个页面，将其重构为可纵向平滑滑动的页面
 * @param {Element|Function|string} generator 
 */
function vbox(generator, $Y) {
    if ($Y !== false && $Y !== true) {
        if (!$Y) {
            if (isElement(generator)) {
                if (generator.hasAttribute('x-box') || generator.hasAttribute('xbox') || /^[xh]/i.test(generator.getAttribute('type') || /^[hx]/i.test(generator.getAttribute('mode')))) {
                    $Y = false;
                } else if (/^[xh]/i.test(generator.tagName)) {
                    $Y = false;
                }
            } else if (/^[xh]/i.test($Y) || /^[xh]/i.test(generator)) {
                $Y = false;
            }

        } else {
            $Y = /^[yv]/i.test($Y);
        }
    }

    return ($Y === false ? xbox : ybox)(generator);
}