var reloadListeners = [];
var memery = require("../efront/memery");
var quitme = require("../efront/quitme");
var listener = function (req, res) {
    if (/^\/reload/i.test(req.url)) {
        var origin = req.headers.origin;
        origin && res.setHeader("Access-Control-Allow-Origin", origin);
        var version = /^\/reload\/(\d+)$/i.exec(req.url);
        if (version && +version[1] === +memery.WATCH_PROJECT_VERSION) {
            return reloadListeners.push(res);
        }
    }
    res.end(String(memery.WATCH_PROJECT_VERSION || ""));
};
var http = require("http");
var createServer = function () {
    var server = http.createServer(listener);
    server.once("error", function () {
        console.error(i18n`启动自动刷新服务失败！`);
    });
    var memery = require("../efront/memery");
    server.once("listening", function (event) {
        var port = memery.WATCH_PORT = server.address().port;
        console.info(i18n`监听端口:${port}\r\n`);
    });
    quitme(function () {
        fire();
        server.removeAllListeners();
        server.close();
    });
    return server;
};
var fire = function () {
    reloadListeners.splice(0, reloadListeners.length).forEach(res => res.end());
};
var server;
module.exports = {
    run() {
        if (!server) server = createServer(), qui;
        if (server.listening) return;
        server.timeout = 0;
        server.listen(memery.WATCH_PORT);
    },
    fire
};