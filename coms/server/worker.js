"use strict";
require("../efront/setupenv");
var clients = require("./clients");
var message = require("../message");
var readline = require("readline");
if (require("cluster").isMaster) {
    if (process.stdin.isTTY) {
        var rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        rl.addListener("SIGINT", process.exit);
    }
} else {
    process.on("SIGINT", function () { });
    process.on("SIGTERM", function () { });
}
process.on("uncaughtException", process.exit);
process.on("unhandledRejection", process.exit);
var { HTTPS_PORT, HTTP_PORT } = process.env;
HTTP_PORT = +HTTP_PORT || 0;
HTTPS_PORT = +HTTPS_PORT || 0;
var closed = false;
var reload = require("./liveload");
var closeListener = function () {
    if (!(server1 && server1.listening) && !(server2 && server2.listening)) {
        process.removeAllListeners();
        require("../efront/watch").close();
    }
};
var safeQuitProcess = function () {
    closed = true;
    if (server1) {
        server1.removeAllListeners();
        server1.close(closeListener);
    }
    if (server2) {
        server2.removeAllListeners();
        server2.close(closeListener);
    }
    reload.splice(0, reload.length).forEach(res => res.end(''));
    process.exit();
};
var messageListener = function (msg, then) {
    switch (msg) {
        case "quit":
            safeQuitProcess();
            if (then instanceof Function) then();
            break;
    }
};
//子线程们
process.on("message", messageListener);
// 仅做开发使用的简易服务器
var http = require("http");
var http2 = require("http2");
// build mime
var doGet = require("./doGet");
var doPost = require("./doPost");
var doCross = require("./doCross");
var doFile = require("./doFile");
var ppid = process.ppid;
var version = 'efront/' + ppid;
var requestListener = function (req, res) {
    var req_access_origin = req.headers.origin;
    var req_access_headers = req.headers["access-control-request-headers"];
    var req_access_method = req.headers["access-control-request-method"];
    req_access_origin && res.setHeader("Access-Control-Allow-Origin", req_access_origin);
    req_access_origin && res.setHeader("Access-Control-Allow-Credentials", true);
    req_access_headers && res.setHeader("Access-Control-Allow-Headers", req_access_headers);
    req_access_method && res.setHeader("Access-Control-Allow-Methods", req_access_method);
    if (/^option/i.test(req.method)) {
        if (/^\/\:/.test(req.url)) {
            var option = req.url.slice(2);
            var address = req.connection.remoteAddress ||
                req.socket.remoteAddress ||
                req.connection.socket.remoteAddress;
            if (option === version) res.setHeader("Powered-By", version);
            else if (address !== '::1') {
            }
            else switch (option) {
                case "quit":
                case "exit":
                    let ports = [server1, server2].filter(a => a && a.listening).map(a => a.address().port);
                    process.send('quit');
                    res.end(`已关闭${ports.join("、")}端口`);
                    break;
                case "link":
                    var id = clients.create().id;
                    res.write(String(id));
                    break;
            }
        }
        return res.end();
    }
    if (/^\/@/i.test(req.url)) {
        return doFile(req, res);
    }
    if (/^\/(\{|%7b)/i.test(req.url)) {
        return doCross(req, res);
    }
    if (/^https?\:\/\/[^\/]*\/(?:\{|%7b)/i.test(req.headers.referer)) {
        return doCross(req, res, req.headers.referer);
    }
    if (req.headers.range) {
        return doFile(req, res);
    }
    var match = req.url.match(/ccon\/(.*?)\.([\da-f]+)\.png$/i);
    if (match) {
        var name = match[1];
        var color = parseInt(match[2], 16);
        return res.end(doPost.ccon(name, color));
    }
    if (/^get/i.test(req.method)) {
        if (SSL_ENABLED && req.socket.localPort === 80) {
            // 现代浏览器不会给http网站标记为不安全，并且火狐等浏览器对网站进行云检查以判断是否安全
            // 没有必要自动转向https，所以请让以下代码胎死腹中
            // if (req.headers["upgrade-insecure-requests"] && req.headers.host) {
            //     res.writeHead(302, { "Location": "https://" + req.headers.host + req.url });
            //     return res.end();
            // }
            // res.setHeader("Content-Security-Policy", "upgrade-insecure-requests");
        }
        return doGet(req, res);
    } else {
        return doPost.call(this, req, res);
    }
};
var ipLoged = false;
var checkServerState = function (http, port) {
    return new Promise(function (ok, oh) {
        var req = http.request(Object.assign({
            method: 'options',
            host: '127.0.0.1',
            port: port,
            rejectUnauthorized: false,// 放行证书不可用的网站
            path: '/:' + version
        }, httpsOptions), function (response) {
            var powered = response.headers["powered-by"];
            if (powered === version) {
                ok(`检查到${port}可以正常访问\r\n`);
            } else {
                oh("<red>端口异常</red>");
            }
        });
        req.end();
    });
};

var showServerInfo = function () {
    var address = require("../efront/getLocalIP")();
    var port = [server1, server2].map(a => a && a.address());
    port = port.map(a => a && a.port);
    var msg = [`服务器地址：${address}`, port[0] ? `http端口  ：${port[0]}` : '', port[1] ? `https端口 ：${port[1]}` : ''].map(a => a.toUpperCase());
    var maxLength = Math.max(msg[1].length, msg[2].length);
    process.title = msg.map(a => a.trim()).filter(a => !!a).join('，').replace(/\s/g, '');
    if (!ipLoged) ipLoged = true, console.info(msg[0] + "\r\n");
    if (~port.indexOf(null)) {
        return;
    }
    msg = msg.map(a => a.length && a.length < maxLength ? a + " ".repeat(maxLength - a.length) : a);
    if (msg[1]) checkServerState(http, HTTP_PORT).then(function () {
        console.info(msg[1] + "\t<green>正常访问</green>\r\n");
    }).catch(function (error) {
        showServerError.call(server1, msg[1] + "\t" + error);
    });
    if (msg[2]) checkServerState(require("https"), HTTPS_PORT).then(function () {
        console.info(msg[2] + "\t<green>正常访问</green>\r\n");
    }).catch(function (error) {
        showServerError.call(server2, msg[2] + "\t" + error);
    });
};
var showServerError = function (error) {
    var s = this;
    if (!s) return;

    s.removeAllListeners();
    if (error instanceof Error) {
        switch (error.code) {
            case "EADDRINUSE":
                error = `<red>${error.port}</red>端口被占用`;
                break;
        }
    }
    console.error(error || `${s === server2 ? "https" : "http"}服务器启动失败!`);
    s.close(closeListener);
};
// create server
if (HTTP_PORT) {
    var server1 = http.createServer(requestListener);
    server1.once("error", showServerError);
    server1.once("listening", showServerInfo);
    server1.setTimeout(0);
    server1.listen(+HTTP_PORT);
}
var SSL_PFX_PATH = process.env["PATH.SSL_PFX"], SSL_ENABLED = false;
var httpsOptions = {
    allowHTTP1: true,
};
var fs = require("fs");
var path = require("path");
if (SSL_PFX_PATH) {
    if (fs.existsSync(SSL_PFX_PATH)) {
        httpsOptions.pfx = fs.readFileSync(SSL_PFX_PATH);
        SSL_ENABLED = true;
    }
    httpsOptions.passphrase = process.env["PASSWORD.SSL_PFX"];
}
else if (HTTPS_PORT) {
    console.warn("<yellow>HTTPS端口正在使用默认证书，请不要在生产环境使用此功能！</yellow>");
    httpsOptions.key = fs.readFileSync(path.join(__dirname, '../../data/keystore/cross-key.pem'));
    httpsOptions.cert = fs.readFileSync(path.join(__dirname, '../../data/keystore/cross-cert.pem'));
    SSL_ENABLED = true;
}
if (SSL_ENABLED) {
    HTTPS_PORT = +HTTPS_PORT || 443;
    var server2 = http2.createSecureServer(httpsOptions, requestListener);
    server2.once("listening", showServerInfo).once("error", showServerError).listen(HTTPS_PORT).setTimeout(0);
}
process.on('exit', function (event) {
    if (event instanceof Error) console.error(event);
});
message.count("boot");
