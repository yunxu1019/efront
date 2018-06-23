function lazy(call) {
    return function timer() {
        if (timer.ing) return;
        timer.ing = setTimeout(function () {
            call();
            timer.ing = false;
        });
    };
}