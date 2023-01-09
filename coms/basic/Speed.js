var [
    /* 静止 */静止,
    /* 停止 */停止,
    /* 移动 */移动,
    /* 减速 */减速,
    /* 回弹 */回弹,
    /* 停靠 */停靠,
] = new Array(6).fill(0).map((_, i) => i);

function inertia(gun) {
    var spd = new Speed;
    var lastTime = 0;
    var _decrease = function () {
        lastTime = Speed.now() - 1;
        _decrease0();
    }
    var _decrease0 = function () {
        if (
            decrease instanceof Function
        ) {
            if (!spd.length) return;
            var id = smooth_timer;
            var now = Speed.now();
            var res = decrease.call(that, now - lastTime, spd);
            lastTime = now;
            if (smooth_timer !== id) return;
            if (res === false || isEmpty(res)) {
                spd.unset();
                train.state = 停止;
                return;
            }
            smooth_timer = requestAnimationFrame(_decrease0);
        }
    };
    var _cancel = function () {
        cancelAnimationFrame(smooth_timer);
        decrease = null;
    }
    var smooth = function () {
        var args = spd.read();
        var id = smooth_timer;
        var res = gun.apply(that, args);
        if (id !== smooth_timer) return;
        if (false === res) {
            spd.reset();
            train.state = 回弹;
            smooth_timer = requestAnimationFrame(_decrease);
            return;
        }
        if (decrease && args.filter(a => Math.abs(a) > 1).length === 0) {
            train.state = 回弹;
            smooth_timer = requestAnimationFrame(_decrease);
            return;
        }
        smooth_timer = requestAnimationFrame(smooth);
    };
    var spd, smooth_timer, that, decrease;
    var train = function () {
        _cancel();
        var args = [].slice.call(arguments, 0, arguments.length);
        spd.write(args);
        if (train.state !== 移动) train.state = 移动;
        gun.apply(this, args);
        that = this;
    };
    train.smooth = function (d) {
        _cancel();
        decrease = d;
        if (train.state === 移动) {
            train.state = 减速;
            smooth_timer = requestAnimationFrame(smooth);
        }
        else if (train.state === 回弹 || train.state === 停靠) {
            train.state = 停靠;
            smooth_timer = requestAnimationFrame(_decrease);
        }
    };
    train.state = 静止;
    train.reset = train.start = function () {
        _cancel();
        spd.unset();
        train.state = 静止;
    };
    return train;

}

inertia.静止 = 静止;
inertia.停止 = 停止;
inertia.移动 = 移动;
inertia.减速 = 减速;
inertia.回弹 = 回弹;
inertia.停靠 = 停靠;
inertia.STAND = 静止;
inertia.STOPPING = 停止;
inertia.MOVING = 移动;
inertia.SLOWING_DWON = 减速;
inertia.REBOUNDING = 回弹;
inertia.DOCKING = 停靠;
var performance = window.performance;
if (!performance || !performance.now) performance = Date;
var now = performance.now;
if (!performance.now) performance.now = function () {
    return +new Date;
}
class Speed extends Array {
    cache = [];
    stamp = 0;
    deltat = 0;
    accelerate = .1;
    static now() {
        return performance.now();
    }
    static inertia = inertia;
    reset() {
        this.cache.splice(0, this.cache.length, 0);
        for (var cx = 0, dx = this.length; cx < dx; cx++) {
            if (this[cx] > 0) this[cx] = 1e-13;
            if (this[cx] < 0) this[cx] = -1e-13;
        }
    }
    unset() {
        this.splice(0, this.length), this.cache.splice(0, this.cache.length), this.stamp = 0;
    }
    write(values, stamp = now()) {
        if (values.length !== this.length || this.length && this.cache.length < 2) this.unset();
        if (stamp - this.cache[this.cache.length - 1] === 0) return;
        this.cache.push(values, stamp);
        if (this.cache.length > 20) this.cache.splice(0, 12);
        var start = Math.max(this.cache.length - 6, 0);
        var s = values.slice(0, values.length), t = this.cache[this.cache.length - 1] - this.cache[start + 1] + 12;
        for (var cx = start, dx = this.cache.length - 2; cx < dx; cx++) {
            var values = this.cache[cx++];
            for (var cy = 0, dy = values.length; cy < dy; cy++) {
                var v = values[cy];
                if (!s[cy]) s[cy] = 0;
                if (!(v >= 0 ^ s[cy] >= 0)) {
                    s[cy] += v;
                }
            }
        }
        for (var cx = 0, dx = s.length; cx < dx; cx++) {
            this[cx] = s[cx] / t;
        }
    }
    read(now = Speed.now()) {
        var stamp = this.cache[this.cache.length - 1];
        var values = this.slice(0);
        var deltat = now - stamp;
        var ratio;
        if (this.stamp) ratio = now - this.stamp;
        else ratio = deltat;
        if (ratio > 160) ratio = 1e-7;
        if (this.deltat) {
            if (deltat > this.deltat * 10) {
                ratio = 1e-7;
            }
        }
        this.deltat = deltat;
        this.stamp = now;
        var sum = 0;
        for (var v of values) sum += v * v;
        v = Math.sqrt(sum);
        var a = this.accelerate * Math.atan(v + 1);
        if (v > a + 1e-14) {
            v = Math.sqrt(v * (v - a)) / v;
        }
        else {
            v = 1e-9;
        }
        var r = ratio * v;
        for (var cx = 0, dx = values.length; cx < dx; cx++) {
            values[cx] *= r;
            if (Math.abs(this[cx]) > .1) this[cx] *= v;
        }
        return values;
    }
}
