function inertia(gun) {
    var spd = new Speed;
    var animateIndex = 0;
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
            var res = decrease(now - lastTime, spd);
            lastTime = now;
            if (smooth_timer !== id) return;
            if (res === false || isEmpty(res)) {
                spd.unset();
                animateIndex = 0;
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
            animateIndex = 2;
            smooth_timer = requestAnimationFrame(_decrease);
            return;
        }
        if (decrease && args.filter(a => Math.abs(a) > 1).length === 0) {
            animateIndex = 2;
            smooth_timer = requestAnimationFrame(_decrease);
            return;
        }
        smooth_timer = requestAnimationFrame(smooth);
    };
    var spd, smooth_timer, that, decrease;
    var train = function () {
        animateIndex = 1;
        _cancel();
        var args = [].slice.call(arguments, 0, arguments.length);
        spd.write(args);
        gun.apply(this, args);
        that = this;
    };
    train.smooth = function (d) {
        _cancel();
        decrease = d;
        if (animateIndex === 1) {
            smooth_timer = requestAnimationFrame(smooth);
        }
        else if (animateIndex === 2) {
            smooth_timer = requestAnimationFrame(_decrease);
        }
    };
    train.reset = function () {
        _cancel();
        spd.reset();
    };
    return train;

}
class Speed extends Array {
    cache = [];
    stamp = 0;
    deltat = 0;
    static now() {
        return performance.now ? performance.now() : Date.now();
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
    write(values, stamp = Speed.now()) {
        if (values.length !== this.length || this.length && this.cache.length < 2) this.unset();
        this.cache.push(values, stamp);
        if (this.cache.length > 20) this.cache.splice(0, 12);
        var start = Math.max(this.cache.length - 6, 0);
        var s = values.slice(0, values.length), t = this.cache[this.cache.length - 1] - this.cache[start + 1] + 12;
        for (var cx = start, dx = this.cache.length - 2; cx < dx; cx++) {
            var values = this.cache[cx++];
            for (var cy = 0, dy = values.length; cy < dy; cy++) {
                var v = values[cy];
                if (!s[cy]) s[cy] = 0;
                s[cy] += v;
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
        if (ratio > 160) ratio = 1e-3;
        if (this.deltat) {
            if (deltat > this.deltat * 10) {
                ratio = 1e-3;
            }
        }
        this.deltat = deltat;
        this.stamp = now;
        var sum = 0;
        for (var v of values) sum += v * v;
        v = Math.sqrt(sum) * ratio;
        if (v > 1) {
            v = Math.sqrt(v * (v - .996)) / v;
        }
        else {
            v = .9;
        }
        var r = ratio * v;
        for (var cx = 0, dx = values.length; cx < dx; cx++) {
            values[cx] *= r;
            if (Math.abs(this[cx]) > .1) this[cx] *= v;
        }
        return values;
    }
}
