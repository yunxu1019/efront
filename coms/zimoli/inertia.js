var { abs, sign = (a) => { if (a > 0) return 1; if (a < 0) return -1; return 0; }, sqrt } = Math;
function main(gun, is_delta = true) {
    var smooth = function () {
        var currentTime = +new Date;
        var delta_time = currentTime - savedTime;

        savedTime = currentTime;
        if (delta_time > 6) {
            var abs_speed = 0;
            var args = speeds.map(function (_speed, i) {
                var __speed = _speed() * delta_time;
                var abs_spd = abs(__speed);
                if (abs_spd <= 1) {
                    return _speed(0);
                }
                abs_speed = Math.max(abs_speed, abs_spd);
                __speed = __speed - sign(__speed) * (abs_spd - sqrt(abs_spd) * sqrt(abs_spd - 1));
                _speed(__speed);
                return __speed;
            });
            if (!(abs_speed >= 1)) {
                if (
                    decrease instanceof Function
                ) decrease();
                return;
            }
            run(args);
        }
        smooth_timer = requestAnimationFrame(smooth);
    };
    var run = function (args) {
        if (false === gun.apply(that, args)) {
            speeds.forEach(a => a(0));
        }
    };
    var saved_args, speeds, smooth_timer, savedTime = 0, that, decrease;
    var trans = function () {
        cancelAnimationFrame(smooth_timer);
        var args = arguments;
        if (!saved_args) {
            saved_args = args;
            speeds = [].map.call(saved_args, a => speed());
            speeds.forEach(a => a(0));
            savedTime = +new Date;
        } else if (args.length !== saved_args.length) {
            saved_args = null;
            // throw new Error("前后传入的参数的个数应该相同！");
        } else {
            if (!is_delta) {
                args = [].map.call(args, (a, i) => a - saved_args[i]);
            }
            that = this;
            run(args);
            args = speeds.map((a, i) => a(args[i]));
            savedTime = +new Date;
        }
    };
    trans.smooth = function (d) {
        decrease = d;
        if (speeds) smooth_timer = requestAnimationFrame(smooth, 20);
        else decrease();
    };
    trans.reset = function () {
        cancelAnimationFrame(smooth_timer);
        saved_args = null;
        speeds = null;
        decrease = null;
    };
    return trans;
}