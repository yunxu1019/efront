var n, i, surviveCheckService = {
    start: function (e) {
        n && clearInterval(n),
            n = setInterval(function () {
                i && i()
            }, e)
    },
    stop: function () {
        n && clearInterval(n)
    },
    callback: function (e) {
        i = e
    }
};