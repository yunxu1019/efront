function lazy(call) {
    return function timer() {
        if (timer.ing) return timer.ing = true;
        call();
        timer.ing = requestAnimationFrame(function () {
            if (timer.ing === true) call();
            timer.ing = false;
        });
    };
}