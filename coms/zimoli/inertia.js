var smooth = function (useIncrease = true) {
    var abs_speed = abs(__speed << 2) / time_splitter;
    var abs_speed = abs(__speed << 2) / time_splitter;
    if (abs_speed < 1) {
        __speed = _speed(0);
        decrease();
        return;
    }
    onclick.preventClick = true;
    smooth_timer = requestAnimationFrame(() => smooth(useIncrease));
    scrollY.call(_box, -__speed, useIncrease);
    __speed = __speed - sign(__speed) * (abs_speed - sqrt(abs_speed) * sqrt(abs_speed - 1));
};
function main(gun) {
    var time_splitter = 16;
    function createFrames(position, spd, mode, limit) {
    }
    var _speed = speed(time_splitter);
    var record, delta, spd;
    var frames = [];
    return {
        damping(ratio) {
            _speed = speed(ratio);
        },
        record(value) {
            if (record !== undefined) {
                delta = value - record;
                record = value;
                spd = _speed(delta);
            }
            gun(value);
        },
        smooth(limit) {
        }
    };
}