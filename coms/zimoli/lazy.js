function lazy(run, wait) {
    return function () {
        var fire = function () {
            if (fire.ing === true) run.apply(that, arguments);
            fire.ing = false;
        };
        var that = this;
        if (arguments.length) {
            var args = arguments;
            return requestAnimationFrame(function () {
                run.apply(that, args);
            });
        }
        if (fire.ing) return fire.ing = true;
        wait = +wait;
        if (wait > 0) {
            setTimeout(fire, wait);
            fire.ing = true;
        } else {
            fire.ing = requestAnimationFrame(fire);
            if (wait === false || wait === 0) fire.ing = true;
            else run();
        }
    };
}