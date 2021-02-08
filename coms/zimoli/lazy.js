function lazy(run, time = false) {
    var fireing;
    return function () {
        var fire = function () {
            if (fireing === true) run.apply(that, arguments);
            fireing = false;
        };
        var that = this;
        if (arguments.length) {
            var args = arguments;
            return requestAnimationFrame(function () {
                run.apply(that, args);
            });
        }
        if (fireing) return fireing = true;
        if (time > 0) {
            setTimeout(fire, +time);
            fireing = true;
        } else {
            fireing = requestAnimationFrame(fire);
            if (time === false || time === 0) fireing = true;
            else run();
        }
    };
}