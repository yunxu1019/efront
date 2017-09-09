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
        e[k] = touch[k];
    }
    return e;
};
/**
 * vbox 纵向滑动框
 * 传入一个页面，将其重构为可纵向平滑滑动的页面
 * @param {Element|Function|string} generator 
 */
function vbox(generator) {
    var _box;
    if (isNode(generator)) {
        _box = generator;
        _box.style.cssText = box.style.cssText + _box.style.cssText;
    } else {
        _box = createElement(box);
    }
    _box.height = function () {
        return _box.offsetHeight;
    };
    _box.width = function () {
        return _box.offsetWidth;
    };
    isFunction(generator) && generator(_box);
    var totalHeight = _box.Height = _box.Height || function () {
        return _box.scrollHeight;
    };
    var currentTop = _box.Top = _box.Top || function (top) {
        if (isNumber(top)) {
            _box.scrollTop = top;
        }
        return _box.scrollTop;
    };
    _box.scroll = function (deltay) {
        var top = currentTop() + deltay;
        var height = _box.height();
        var scrollHeight = totalHeight();
        if (top < 0) {
            // if (speed > 30) speed = 30;
            speed = speed >> 1;
            increase(top);
            top = 0;
        } else if (top + height > scrollHeight) {
            // if (speed > 30) speed = 30;
            speed = speed >> 1;
            increase(top + height - scrollHeight);
        }
        return currentTop(top);
    };
    var saved_x, saved_y, direction, speed = 0,
        lastmoveTime;
    var smooth = function () {
        var abs_speed = abs(speed<<2)/time_splitter;
        if (abs_speed < 1) {
            speed = 0;
            decrease();
            return;
        }
        speed_timer = setTimeout(smooth, time_splitter);
        _box.scroll(-speed);
        speed = speed - sign(speed) * (abs_speed - sqrt(abs_speed) * sqrt(abs_speed - 1));
    };
    var increaser = createElement(div);
    var decrease_timer = 0;
    var time_splitter = 30;
    var decrease = function () {
        var height = parseInt(increaser.style.height);
        var decrease_ing = 0;
        if (height > 1) {
            var scrollTop = currentTop();
            if (scrollTop > 0 && _box.childNodes[0] === increaser) {
                var deltaY = scrollTop > height ? height : scrollTop;
                height -= deltaY;
                currentTop(scrollTop - deltaY);
            }
            var tH = totalHeight();
            var bH = _box.height();
            if (scrollTop + bH < tH && _box.childNodes[_box.childNodes.length - 1] === increaser) {
                var deltaY = tH - bH - scrollTop > height ? height : tH - bH - scrollTop;
                height -= deltaY;
            }
            decrease_timer = setTimeout(decrease, time_splitter);
            decrease_ing++;
            css(increaser, {
                height: (height > 16 ? (height * 2 + 6) / 3 : height >> 1) + "px"
            });
        }
        if (!decrease_ing) {
            remove(increaser);
        }
    };
    var increase = function (deltaY) {
        var height = parseInt(increaser.style.height) || 0;
        if (deltaY < 0) {
            height -= deltaY;
            _box.insertBefore(increaser, _box.childNodes[0] || null);
        } else if (deltaY > 0) {
            height += deltaY;
            appendChild(_box, increaser);
        }
        if (height > 100)
            height = 100;
        css(increaser, {
            height: height + "px"
        });
    };
    onmousewheel(_box, function (event) {
        clearTimeout(speed_timer);
        clearTimeout(decrease_timer);
        var deltay = isNumber(event.deltaY) ? -event.deltaY : event.wheelDeltaY;
        !isNumber(deltay) && (deltay = event.wheelDelta);
        !isNumber(deltay) && (deltay = -event.detail * 40);
        event.preventDefault();
        var now = new Date;
        var deltat = now - lastmoveTime;
        lastmoveTime = now;
        speed = speed ? (speed + deltay * time_splitter / deltat) >> 1 : deltay * time_splitter / deltat;
        _box.scroll(-deltay);
        smooth();
    });
    var speed_timer;
    onmousedown(_box, function (event) {
        clearTimeout(speed_timer);
        clearTimeout(decrease_timer);
        speed = 0;
        lastmoveTime = new Date;
        saved_x = event.clientX, saved_y = event.clientY;
        var cancel = function () {
            direction = 0;
            cancelmousemove();
            cancelmouseup();
            smooth();
        };
        var body = document.body;
        var cancelmousemove = onmousemove(body, function (event) {
            var clientX = event.clientX;
            var clientY = event.clientY;
            var deltax = clientX - saved_x;
            var deltay = clientY - saved_y;
            if (!direction) {
                direction = abs(deltax) >= abs(deltay) ? -1 : 1;
            }
            if (direction < 0)
                return;
            event.preventDefault();
            var now = new Date;
            var deltat = now - lastmoveTime;
            lastmoveTime = now;
            speed = speed ? (speed + deltay * time_splitter / deltat) >> 1 : deltay * time_splitter / deltat;
            _box.scroll(-deltay);
            saved_x = clientX;
            saved_y = clientY;
        });
        var cancelmouseup = onmouseup(body, cancel);
    });
    ontouchstart(_box, function (event) {
        clearTimeout(speed_timer);
        clearTimeout(decrease_timer);
        extendTouch(event);
        lastmoveTime = new Date;
        saved_x = event.clientX, saved_y = event.clientY;
        var moving = event.target;
        speed = 0;
        var cancel = function () {
            direction = 0;
            canceltouchmove();
            canceltouchend();
            canceltouchcancel();
            smooth();
        };
        var canceltouchmove = ontouchmove(moving, function (event) {
            if (event.defaultPrevented) return;
            extendTouch(event);
            var clientX = event.clientX;
            var clientY = event.clientY;
            var deltax = clientX - saved_x;
            var deltay = clientY - saved_y;
            if (!direction) {
                direction = abs(deltax) >= abs(deltay) ? -1 : 1;
            }
            if (direction < 0)
                return;
            event.preventDefault();
            var now = new Date;
            var deltat = now - lastmoveTime;
            lastmoveTime = now;
            speed = speed ? (speed + deltay * time_splitter / deltat) >> 1 : deltay * time_splitter / deltat;
            _box.scroll(-deltay);
            saved_x = clientX;
            saved_y = clientY;
        });
        var canceltouchcancel = ontouchcancel(moving, cancel);
        var canceltouchend = ontouchend(moving, cancel);
    });
    return _box;
}