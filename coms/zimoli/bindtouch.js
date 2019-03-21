var abs = Math.abs;
function bindtouch(target, bindder, lockDirection = "x") {
    var direction, saved_x, saved_y;
    moveupon(target, {
        start(event) {
            saved_x = event.clientX, saved_y = event.clientY;
            direction = 0;
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
                    direction = abs(deltax) >= abs(deltay) ? "x" : 'y';
                }
                if (direction !== lockDirection)
                    return;
            }
            event.moveLocked = true;
            var { x = 0, y = 0 } = bindder();
            x += deltax, y += deltay;
            bindder({ x, y }, event);
            saved_x = clientX;
            saved_y = clientY;
        },
        end() {
            direction = 0;
        }
    });

}
