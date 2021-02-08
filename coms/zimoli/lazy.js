function lazy(run, time = false) {
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
        time = +time;
        if (time > 0) {
            setTimeout(fire, time);
            fire.ing = true;
        } else {
            fire.ing = requestAnimationFrame(fire);
            if (time === false || time === 0) fire.ing = true;
            else run();
        }
    };
}