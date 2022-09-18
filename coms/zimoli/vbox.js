function ybox(generator) {
    var scrollY = inertia(vscroll.Y);
    var _box;
    if (isNode(generator)) {
        _box = generator;
    } else {
        _box = createElement(div);
    }
    var _tmp = isFunction(generator) && generator(_box);
    if (isNode(_tmp)) _box = _tmp;
    var _box_height = _box.$height || _box.height;
    var _box_Height = _box.$Height || _box.Height;
    var _box_Top = _box.$Top || _box.Top;
    if (!isFunction(_box_height)) _box_height = function () {
        return _box.clientHeight;
    };
    // totalHeight
    if (!isFunction(_box_Height)) _box_Height = function () {
        return _box.scrollHeight;
    };
    // currentTop
    var _scrolledTop = _box.scrollTop;
    if (!isFunction(_box_Top)) _box_Top = function (top) {
        if (isNumber(top)) {
            if (_box.scrollTop !== top) {
                _box.scrollTop = top;
            }
            _scrolledTop = top;
        }
        return _box.scrollTop;
    };
    if (_box.$Height !== _box_Height) _box.$Height = _box_Height;
    if (_box.$height !== _box_height) _box.$height = _box_height;
    if (_box.$Top !== _box_Top) _box.$Top = _box_Top;
    _box.$scrollY = function (deltay, useIncrease = _box.useIncrease !== false) {
        var _Top = _box.$Top();
        var top = _Top + deltay;
        var height = _box.$height();
        var scrollHeight = _box.$Height();
        var r = true;
        if (top < 0) {
            if (useIncrease && _Top <= 0) {
                r = increase(top);
            }
            _box.$Top(0);
        } else if (top + height >= scrollHeight) {
            if (top + height - scrollHeight > increase_height) {
                top = increase_height + scrollHeight - height;
            }
            if (useIncrease && top + height >= scrollHeight) {
                r = increase(top + height - scrollHeight);
            }
            _box.$Top(top);
        } else {
            r = top !== _box.$Top(top);
            increase(deltay, true);
        }
        return r;
    };
    var increaser_t = document.createElement("insert");
    addClass(increaser_t, 'y-insert');
    var increaser_b = increaser_t.cloneNode();
    increaser_b.height = 0;
    increaser_t.height = 0;
    var increase_height = calcPixel(100);
    var _decrease = function (increaser, t) {
        var height = increaser.height;
        if (height > 1) {
            var scrollTop = _box.$Top();
            if (scrollTop > 0 && increaser_t === increaser) {
                var deltaY = scrollTop > height ? height : scrollTop;
                height -= deltaY;
                _box.$Top(scrollTop - deltaY);
            }
            var tH = _box.$Height();
            var bH = _box.$height();
            if (scrollTop + bH < tH && increaser_b === increaser) {
                var deltaY = tH - bH - scrollTop > height ? height : tH - bH - scrollTop;
                height -= deltaY;
            }
            height = height * Math.pow(.92, t / 6);
            increaser.height = height
            increaser.style.height = fromOffset(height);
            return height;
        }
        if (increaser.height) {
            increaser.height = 0;
            increaser.style.height = 0;
            return 1;
        }
        remove(increaser);
        return 0;
    };
    var stop = _box.$stopY || _box.stopY;
    var stop2 = lazy(function () {
        scrollY.smooth(stop);
    }, 40);
    var decrease = function (t) {
        var res = _decrease(increaser_t, t) + _decrease(increaser_b, t);
        if (!res) {
            scrollY.smooth(stop);
        }
        return true;
    };
    var increase = function (deltaY, minusOnly) {
        var t_height = increaser_t.height;
        var b_height = increaser_b.height;
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
                var deltaMargin = _box.scrollHeight - increaser_b.offsetTop - parseFloat(getComputedStyle(_box).paddingBottom);
                if (deltaMargin > 0) {
                    increaser_b.style.marginTop = fromOffset(deltaMargin);
                }
            }
        }
        if (b_height > increase_height) b_height = increase_height;
        if (t_height > increase_height) t_height = increase_height;
        if (b_height < 0) b_height = 0;
        if (t_height < 0) t_height = 0;
        if (!minusOnly || b_height < increaser_b.height) increaser_b.height = b_height, increaser_b.style.height = fromOffset(b_height);
        if (!minusOnly || t_height < increaser_t.height) increaser_t.height = t_height, increaser_t.style.height = fromOffset(t_height);
        return t_height < increase_height && b_height < increase_height;
    };
    if (/Edge|Trident/i.test(navigator.userAgent)) {
        // ie
        addClass(_box, "trident");
    } else {
        var wheelTime = 0;
        onmousewheel(_box, function (event) {
            event.preventDefault();
            if (event.timeStamp - wheelTime > 40 && Math.abs(event.deltaY) < 12) {
                wheelTime = event.timeStamp;
                return;
            }
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
                scrollY.call(_box, -deltay, false);
                stop2();
            }
        });
        bindtouch(_box, {
            start() {
                scrollY.reset();
            },
            move(scrolled) {
                var y = -_box.$Top();
                if (scrolled) {
                    var { deltay } = scrolled;
                    scrollY.call(this, -deltay);
                    y += deltay;
                }
                return { y };
            },
            end() {
                scrollY.smooth(decrease);
            }
        }, 'y');
    }

    var initScrollId = function () {
        var temp = this.parentNode;
        var scrollId = 0;
        while (temp && !scrollId) {
            if (isFinite(temp.YScrollBoxId)) scrollId = temp.YScrollBoxId;
            temp = temp.parentNode;
        }
        this.YScrollBoxId = +scrollId + 1;
    };
    if (isMounted(_box)) initScrollId.call(_box);
    on("append")(_box, initScrollId);
    on("remove")(_box, scrollY.reset);
    _box.cancelFrame = scrollY.reset;
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