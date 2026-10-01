var reloadListeners = [];
var memery = require("../efront/memery");
var quitme = require("../efront/quitme");
/**
 * @this {net.Socket}
 */
var response = function (status) {
    var headers = this.headers;
    var version = String(memery.WATCH_PROJECT_VERSION || "");
    headers = Object.keys(headers).map(k => `${k}:${headers[k]}\r\n`).join("");
    this.write(`HTTP/1.1 200 efront ${status}\r\n${headers}Content-Length:${version.length}\r\nContent-Type:text/plain;charset=utf-8;\r\n\r\n${version}`);
    this.end();
}
var listener = function (socket) {
    socket.on('data', function (data) {
        data = String(data);
        var match = /^(\w+)\s+(\S+)\s+HTTP\/[\d\.]+\r\n/i.exec(data.slice(0, 100));
        if (!match) return socket.distroy();
        var [, method, url] = match;
        var headers = {};
        var end = 0;
        data.slice(match[0].length).split(/\r\n/).forEach(a => {
            if (!a || end) {
                end = 1;
                return;
            }
            var i = a.indexOf(':');
            if (i < 0) return;
            var k = a.slice(0, i);
            var v = a.slice(i + 1);
            if (k && v) headers[k.toLowerCase().trim()] = v.trim();
        });
        var origin0 = headers.origin;
        var method1 = headers["access-control-request-method"];
        var responseHeaders = {};
        socket.headers = responseHeaders;
        if (origin0) responseHeaders["Access-Control-Allow-Origin"] = origin0;
        if (method1) responseHeaders["Access-Control-Allow-Methods"] = method1;
        socket.response = response;
        if (/^\/reload/i.test(url) && method.toLowerCase() === 'efront') {
            var version = /^\/reload\/(\d+)$/i.exec(url);
            if (version && +version[1] === +memery.WATCH_PROJECT_VERSION) {
                return reloadListeners.push(socket);
            }
        }
        socket.response("watching");
    });
};
var net = require("net");
var createServer = function () {
    var server = net.createServer(listener);
    server.once("error", function () {
        console.error(i18n`启动自动刷新服务失败！`);
    });
    var memery = require("../efront/memery");
    server.once("listening", function (event) {
        var port = memery.WATCH_PORT = server.address().port;
        console.info(i18n`监听端口:${port}\r\n`);
    });
    quitme(function () {
        server.close();
        server.removeAllListeners();
        fire();
    });
    return server;
};
var fire = function () {
    reloadListeners.splice(0, reloadListeners.length).forEach(res => res.response("updated"));
};
var server;
module.exports = {
    run() {
        if (!server) server = createServer();
        if (server.listening) return;
        server.timeout = 0;
        server.listen(memery.WATCH_PORT);
    },
    fire
};