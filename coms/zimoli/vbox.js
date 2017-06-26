var abs = Math.abs;
var sqrt = Math.sqrt;
var sign = Math.sign || function (a) {
    return +a > 0 ? 1 : -a > 0 ? -1 : 0;
};
var pow = Math.pow;
var box = createElement(div);
css(box, "overflow:hidden;");
var extendTouch = function (e) {
    var touch = e.touches[0];
    for (var k in touch) {
        e[k] = touch[k];
    }
    return e;
};

function vbox(generator) {
    var _box = createElement(box);
    _box.height = function () {
        return _box.offsetHeight;
    };
    _box.width = function () {
        return _box.offsetWidth;
    };
    isFunction(generator) && generator(_box);
    var totalHeight = _box.Height || function () {
        return _box.scrollHeight;
    };
    var currentTop = _box.Top || function (top) {
        if (isNumber(top)) {
            _box.scrollTop = top;
        }
        return _box.scrollTop;
    };
    _box.scroll = function (deltay) {
        return currentTop(currentTop() + deltay);
    };
    var saved_x, saved_y, direction, speed = 0,
        lastmoveTime;
    var smooth = function () {
        if (abs(speed) < 1) {
            speed = 0;
            return;
        }
        speed_timer = setTimeout(smooth, 20);
        _box.scroll(-speed);
        speed = speed - 0.5 * sign(speed);
    };
    onmousewheel(_box, function (event) {
        clearTimeout(speed_timer);
        var deltay = isNumber(event.deltaY) ? -event.deltaY : event.wheelDeltaY;
        !isNumber(deltay) && (deltay = event.wheelDelta);
        !isNumber(deltay) && (deltay = -event.detail * 40);
        event.preventDefault();
        var now = new Date;
        var deltat = now - lastmoveTime;
        lastmoveTime = now;
        speed = ((speed || deltay * 20) + deltay * 20 / deltat) >> 1;
        _box.scroll(-deltay);
        smooth();
    });
    var speed_timer;
    onmousedown(_box, function (event) {
        clearTimeout(speed_timer);
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
            speed = ((speed || deltay * 20) + deltay * 20 / deltat) >> 1;
            _box.scroll(-deltay);
            saved_x = clientX;
            saved_y = clientY;
        });
        var cancelmouseup = onmouseup(body, cancel);
    });
    ontouchstart(_box, function (event) {
        clearTimeout(speed_timer);
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
            event.stopPropagation();
            var now = new Date;
            var deltat = now - lastmoveTime;
            lastmoveTime = now;
            speed = ((speed || deltay * 20) + deltay * 20 / deltat) >> 1;
            _box.scroll(-deltay);
            saved_x = clientX;
            saved_y = clientY;
        });
        var canceltouchcancel = ontouchcancel(moving, cancel);
        var canceltouchend = ontouchend(moving, cancel);
    });
    return _box;
}