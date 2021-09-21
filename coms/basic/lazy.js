function lazy(run, time = false) {
    var fireing, args, that;
    var fire = function () {
        if (time > 17) {
            if (fireing === true) {
                fireing = setTimeout(fire, +time);
            }
            else if (isFinite(fireing)) {
                fireing = run.apply(that, args);
            }
            else {
                fireing = false;
            }
        } else {
            if (fireing === true) {
                fireing = run.apply(that, args);
            } else {
                fireing = false;
            }
        }
        if (fireing instanceof Promise) fireing.then(fire, fire);
    };
    return function () {
        args = arguments;
        that = this;
        if (fireing) return fireing = true;
        if (time > 0) {
            fireing = setTimeout(fire, +time);
        } else {
            fireing = requestAnimationFrame(fire);
            if (time === false || time === 0) fireing = true;
            else run();
        }
    };
}
module.exports = lazy;