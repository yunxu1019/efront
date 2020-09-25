var abs = Math.abs;
function bindtouch(target, bindder, lockDirection = false) {
    var direction, saved_x, saved_y;
    if (lockDirection) lockDirection = lockDirection.toLowerCase();
    if (!isFunction(bindder) && isObject(bindder)) {
        var { start, move, end } = bindder;
    } else {
        var move = bindder;
    }
    moveupon(target, {
        start(event) {
            saved_x = event.clientX;
            saved_y = event.clientY;
            direction = 0;
            if (isFunction(start)) start.call(this, event);
        },
        move(event) {
            if (event.moveLocked) return;
            var clientX = event.clientX;
            var clientY = event.clientY;
            var deltax = clientX - saved_x;
            var deltay = clientY - saved_y;
            if (lockDirection) {
                if (!direction) {
                    if (abs(deltax) < MOVELOCK_DELTA && abs(deltay) < MOVELOCK_DELTA) return;
                    if (target.onmovestart) {
                        target.onmovestart();
                    }
                    if (abs(deltax) * .618 >= abs(deltay)) {
                        direction = "x";
                    } else if (abs(deltax) <= .618 * abs(deltay)) {
                        direction = "y";
                    } else {
                        return;
                    }
                }
                if (direction !== lockDirection)
                    return;
                event.moveLocked = true;
                if (direction === "y" && deltay === 0 || direction === "x" && deltax === 0) return;
            }

            var pos = move.call(this, null, event);
            if (isObject(pos)) {
                var { x = 0, y = 0 } = pos;
                x += deltax;
                y += deltay;
                if (isFunction(move)) move.call(this, { x, y, deltax, deltay }, event);
                saved_x = clientX;
                saved_y = clientY;
            }
            event.moveLocked = true;
        },
        end(event) {
            if (isFunction(end)) end.call(this, event);
            direction = 0;
        }
    });

} 
