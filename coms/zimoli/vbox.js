var abs = Math.abs;
var sqrt = Math.sqrt;
var sign = Math.sign || function (a) {
    return +a > 0 ? 1 : -a > 0 ? -1 : 0;
};
var pow = Math.pow;
var box = createElement(div);
css(box, "overflow:hidden;height:100%");
var extendTouch = function (e) {
    var touch = e.touches[0];
    for (var k in touch) {
        if (!(k in e)) e[k] = touch[k];
    }
    return e;
};

/**
 * vbox 纵向滑动框
 * 传入一个页面，将其重构为可纵向平滑滑动的页面
 * @param {Element|Function|string} generator 
 */
function vbox(generator, $Y = "Y") {
    if ($Y === "X") {
        var $height = "width", $top = "left", $X = "Y";
    } else if ($Y === "Y") {
        var $height = "height", $top = "top", $X = "X";
    }
    var $Height = $height.charAt(0).toUpperCase() + $height.slice(1);
    var $Top = $top.charAt(0).toUpperCase() + $top.slice(1);
    var $scrollHeight = "scroll" + $Height;
    var $scrollTop = "scroll" + $Top;
    var $scrollY = "scroll" + $Y;
    var $clientY = "client" + $Y;
    var $clientX = "client" + $X;
    var $offsetHeight = "offset" + $Height;
    var $deltaY = "delta" + $Y;
    var $stopY = "stop" + $Y;
    var $wheelDeltaY = "wheelDelta" + $Y;
    var _box;
    if (isNode(generator)) {
        _box = generator;
    } else {
        _box = createElement(box);
    }
    _box[$height] = function () {
        return _box[$offsetHeight];
    };
    isFunction(generator) && generator(_box);
    // totalHeight
    _box[$Height] = _box[$Height] || function () {
        return _box[$scrollHeight];
    };
    // currentTop
    _box[$Top] = _box[$Top] || function (top) {
        if (isNumber(top)) {
            _box[$scrollTop] = top;
        }
        return _box[$scrollTop];
    };
    _box[$stopY] = _box[$stopY] || function (stopedY) {
        if (isNumber(stopedY)) {
            return stopedY;
        }
        return _box[$Top]();
    };
    _box[$scrollY] = function (deltay, useIncrease = true) {
        var top = _box[$Top]() + deltay;
        var height = _box[$height]();
        var scrollHeight = _box[$Height]();
        if (top < 0) {
            // if (speed > 30) speed = 30;
            __speed = __speed >> 1;
            useIncrease && increase(top);
            top = 0;
        } else if (top + height > scrollHeight) {
            // if (speed > 30) speed = 30;
            if (top + height - scrollHeight > increase_height) {
                top = increase_height + scrollHeight - height;
            }
            __speed = __speed >> 1;
            useIncrease && increase(top + height - scrollHeight);
        }
        return _box[$Top](top);
    };
    var saved_x, saved_y, direction, __speed = 0;
    var smooth = function (useIncrease = true) {
        var abs_speed = abs(__speed << 2) / time_splitter;
        var abs_speed = abs(__speed << 2) / time_splitter;
        if (abs_speed < 1) {
            __speed = _speed(0);
            decrease();
            return;
        }
        speed_timer = requestAnimationFrame(() => smooth(useIncrease));
        _box[$scrollY](-__speed, useIncrease);
        __speed = __speed - sign(__speed) * (abs_speed - sqrt(abs_speed) * sqrt(abs_speed - 1));
    };
    var increaser_t = createElement(div);
    var increaser_b = createElement(div);
    var decrease_timer = 0;
    var time_splitter = 16;
    var _speed = speed(time_splitter);
    var increase_height = 100 * renderPixelRatio / .75;
    var _decrease = function (increaser) {
        var height = parseInt(increaser.style[$height]);
        if (height > 1) {
            var scrollTop = _box[$Top]();
            if (scrollTop > 0 && increaser_t === increaser) {
                var deltaY = scrollTop > height ? height : scrollTop;
                height -= deltaY;
                _box[$Top](scrollTop - deltaY);
            }
            var tH = _box[$Height]();
            var bH = _box[$height]();
            if (scrollTop + bH < tH && increaser_b === increaser) {
                var deltaY = tH - bH - scrollTop > height ? height : tH - bH - scrollTop;
                height -= deltaY;
            }
            css(increaser, {
                [$height]: (height > 16 ? (height * 2 + 6) / 3 : height >> 1) + "px"
            });
            return 1;
        }
        height && _box[$Top](_box[$Top]() - height);
        css(increaser, { [$height]: 0 });
        remove(increaser);
        return 0;
    };
    var decrease = function () {
        if (_decrease(increaser_t) + _decrease(increaser_b)) decrease_timer = requestAnimationFrame(decrease);
        else if (_box[$stopY]() - _box[$Top]()) decrease_timer = requestAnimationFrame(decrease);
    };
    var increase = function (deltaY) {
        var t_height = parseInt(increaser_t.style[$height]) || 0;
        var b_height = parseInt(increaser_b.style[$height]) || 0;
        t_height -= deltaY;
        b_height += deltaY;
        if (deltaY < 0 && t_height > 0) {
            if (!increaser_t.nextSibling) {
                _box.insertBefore(increaser_t, _box.childNodes[0] || null);
            }
        } else if (deltaY > 0 && b_height > 0) {
            if (!increaser_b.previousSibling) {
                increaser_b.style.marginTop = 0;
                appendChild(_box, increaser_b);
                var deltaMargin = _box.offsetHeight + _box.scrollTop - increaser_b.offsetTop - increaser_b.offsetHeight;
                if (deltaMargin > 0) {
                    increaser_b.style.marginTop = deltaMargin + "px";
                }
            }
        }
        if (b_height > increase_height) b_height = increase_height;
        if (t_height > increase_height) t_height = increase_height;
        if (b_height < 0) b_height = 0;
        if (t_height < 0) t_height = 0;
        b_height && css(increaser_b, {
            [$height]: b_height + "px"
        });
        t_height && css(increaser_t, {
            [$height]: t_height + "px"
        });
    };
    onmousewheel(_box, function (event) {
        cancelAnimationFrame(speed_timer);
        cancelAnimationFrame(decrease_timer);
        var deltay = -event[$deltaY];
        event.preventDefault();
        __speed = _speed(deltay);
        _box[$scrollY](-deltay, false);
        smooth(false);
    });
    var speed_timer, cancelmousemove, cancelmouseup;
    onmousedown(_box, function (event) {
        cancelAnimationFrame(speed_timer);
        cancelAnimationFrame(decrease_timer);
        _speed(0);
        lastmoveTime = new Date;
        saved_x = event[$clientX], saved_y = event[$clientY];
        direction = 0;
        cancelmousemove = onmousemove(window, mousemove);
        cancelmouseup = onmouseup(window, mouseup);
    });
    var mousemove = function (event) {
        if (event.moveLocked) return;
        if (_box.nodrag) return;
        if (event.type !== "touchmove" && event.which === 0) return mouseup();
        var clientX = event[$clientX];
        var clientY = event[$clientY];
        var deltax = clientX - saved_x;
        var deltay = clientY - saved_y;
        if (!direction) {
            if (abs(deltax) < MOVElOCK_DELTA && abs(deltay) < MOVElOCK_DELTA) return;
            direction = abs(deltax) >= abs(deltay) ? -1 : 1;
        }
        if (direction < 0)
            return;
        event.moveLocked = true;
        __speed = _speed(deltay);
        _box[$scrollY](-deltay);
        saved_x = clientX;
        saved_y = clientY;
    };
    var mouseup = function () {
        direction = 0;
        cancelmousemove();
        cancelmouseup();
        smooth();
    };

    ontouchstart(_box, function (event) {
        cancelAnimationFrame(speed_timer);
        cancelAnimationFrame(decrease_timer);
        extendTouch(event);
        lastmoveTime = new Date;
        saved_x = event[$clientX], saved_y = event[$clientY];
        var moving = event.target;
        _speed(0);
        direction = 0;
        var cancel = function () {
            direction = 0;
            canceltouchmove();
            canceltouchend();
            canceltouchcancel();
            __speed = _speed();
            smooth();
        };
        if (_box.style.webkitOverflowScrolling) event.preventDefault();
        var canceltouchmove = ontouchmove(moving, function (event) {
            extendTouch(event);
            mousemove(event);
        });
        var canceltouchcancel = ontouchcancel(moving, cancel);
        var canceltouchend = ontouchend(moving, cancel);
    });
    css(_box, "overflow:hidden;-webkit-overflow-scrolling:auto;over-flow:auto;");
    return _box;
}