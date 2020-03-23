function tickCall(runner, times = 10, interval) {
    var a = setInterval(function () {
        if (!(times--)) {
            clearInterval(a);
            return;
        }
        runner();
    }, +interval || 100);
    runner();
}

module.exports = tickCall;