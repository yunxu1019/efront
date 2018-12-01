var reloadListeners = [];
var listener = function (req, res) {
    if (/^\/reload/i.test(req.url)) {
        var version = /^\/reload\/(\d+)$/i.exec(req.url);
        if (version && +version[1] === global.WATCH_PROJECT_VERSION) {
            var origin = req.headers.origin;
            origin && res.setHeader("Access-Control-Allow-Origin", origin);
            return reloadListeners.push(res);
        }
    }
    res.end();
};
var http = require("http");
var server = http.createServer(listener);
server.once("error", function () {
    console.info("启动自动刷新服务失败！");
});
server.once("listening", function (event) {
    var port = process.env.WATCH_PORT = server.address().port;
    console.info(`watchport:${port}`);
});
module.exports = {
    run() {
        if (server.listening) return;
        server.timeout = 0;
        server.listen(+process.env.WATCH_PORT);
    },
    fire() {
        reloadListeners.splice(0, reloadListeners.length).forEach(res => res.end());
    }
};