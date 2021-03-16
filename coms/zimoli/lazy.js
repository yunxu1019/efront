function lazy(run, time = false) {
    var fireing, args, that;
    var fire = function () {
        if (time > 17) {
            if (fireing === true) {
                setTimeout(fire, +time);
            } else {
                run.apply(that, args);
            }
        } else {
            if (fireing === true) {
                run.apply(that, args);
            }
        }
        fireing = false;
    };
    return function () {
        args = arguments;
        that = this;
        if (fireing) return fireing = true;
        if (time > 0) {
            setTimeout(fire, +time);
        } else {
            fireing = requestAnimationFrame(fire);
            if (time === false || time === 0) fireing = true;
            else run();
        }
    };
}