function lazy(call, wait) {
    return function timer() {
        if (timer.ing) return timer.ing = true;
        wait = +wait;
        var fire = function () {
            if (timer.ing === true) call();
            timer.ing = false;
        };
        if (wait > 0) {
            setTimeout(fire, wait);
            timer.ing = true;
        } else {
            timer.ing = requestAnimationFrame(fire);
            if (wait === false || wait === 0) timer.ing = true;
            else call();
        }
    };
}