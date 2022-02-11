function inertia(gun) {
    var _decreased = 0, spd = new Speed;
    var _decrease = function () {
        if (
            decrease instanceof Function
        ) {
            if (!spd.length || !spd[0]) return;
            var id = smooth_timer;
            var res = decrease(_decreased++, spd);
            if (smooth_timer !== id) return;
            if (res === false || isEmpty(res)) {
                spd.unset();
                return;
            }
            smooth_timer = requestAnimationFrame(_decrease);
        }
    };
    var _cancel = function () {
        cancelAnimationFrame(smooth_timer);
        _decreased = 0;
        decrease = null;
    }
    var smooth = function () {
        var args = spd.read();
        if (decrease && args.filter(a => Math.abs(a) > .5).length === 0) {
            spd.reset();
            _decrease();
            return;
        }
        if (args.filter(a => Math.abs(a) > .1).length === 0) {
            spd.reset();
            return;
        }
        var id = smooth_timer;
        var res = gun.apply(that, args);
        if (id !== smooth_timer) return;
        if (false === res) {
            spd.reset();
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
        gun.apply(this, args);
        that = this;
    };
    train.smooth = function (d) {
        _cancel();
        decrease = d;
        smooth_timer = requestAnimationFrame(smooth);
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
    static now() {
        return performance.now ? performance.now() : Date.now();
    }
    static inertia = inertia;
    reset() {
        this.cache.splice(0, this.cache.length, 0);
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
        this.stamp = now;
        var sum = 0;
        for (var v of values) sum += v * v;
        v = Math.sqrt(sum) * ratio;
        if (v > 1) {
            v = Math.sqrt(v * (v - 1)) / v;
        }
        else {
            v = 1e-7;
        }
        var r = ratio * v;
        for (var cx = 0, dx = values.length; cx < dx; cx++) {
            values[cx] *= r;
            this[cx] *= v;
        }
        return values;
    }
}
