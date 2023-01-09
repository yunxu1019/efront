
function speed() {
    var speed = new Speed();
    return function (a) {
        var now = Speed.now();
        if (isFinite(a)) {
            if (a === 0) speed.reset();
            else speed.write([a], now);
            return a;
        }
        return speed.read(now)[0];
    };
}