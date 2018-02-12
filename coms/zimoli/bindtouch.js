var extendTouch = function (e) {
    var touch = e.touches[0];
    for (var k in touch) {
        if (!(k in e)) e[k] = touch[k];
    }
    return e;
};
var abs = Math.abs;
function bindtouch(target, bindder, lockDirection = "x") {
    var direction, cancelmousemove, cancelmouseup, onend;
    onmousedown(target, function (event) {
        cancelmousemove = onmousemove(window, mousemove);
        cancelmouseup = onmouseup(window, mouseup);
    });
    var onend;
    var _onend = function () {
        onend = null;
        if (target.onmoveend instanceof Function) {
            target.onmoveend();
        }
    };
    var mousemove = function (event) {
        if (event.defaultPrevented) return;
        if (event.type !== "touchmove" && event.which === 0) return mouseup();
        var clientX = event.clientX;
        var clientY = event.clientY;
        var deltax = clientX - saved_x;
        var deltay = clientY - saved_y;
        if (lockDirection) {
            if (!direction) {
                if (abs(deltax) < 3 && abs(deltay) < 3) return;
                if (target.onmovestart) {
                    target.onmovestart();
                }
                onend = _onend;
                direction = abs(deltax) >= abs(deltay) ? "x" : 'y';
            }
            if (direction !== lockDirection)
                return;
        }
        event.preventDefault();
        var { x = 0, y = 0 } = bindder();
        x += deltax, y += deltay;
        bindder({ x, y }, event);
        saved_x = clientX;
        saved_y = clientY;
    };
    var mouseup = function () {
        direction = 0;
        cancelmousemove();
        cancelmouseup();
        onend && onend();
    };

    ontouchstart(target, function (event) {
        extendTouch(event);
        saved_x = event.clientX, saved_y = event.clientY;
        var moving = event.target;
        speed = 0;
        direction = 0;
        var cancel = function () {
            direction = 0;
            canceltouchmove();
            canceltouchend();
            canceltouchcancel();
            onend && onend();
        };
        var canceltouchmove = ontouchmove(moving, function (event) {
            extendTouch(event);
            mousemove(event);
        });
        var canceltouchcancel = ontouchcancel(moving, cancel);
        var canceltouchend = ontouchend(moving, cancel);
    });
}
