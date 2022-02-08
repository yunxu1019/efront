
function speed() {
    var speed = new Speed();
    return function (a) {
        var now = performance.now ? performance.now() : Date.now();
        if (isFinite(a)) {
            speed.write([a], now);
            return a;
        }
        return speed.read(now)[0];
    };
}