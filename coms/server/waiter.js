"use strict";
require("../efront/setupenv");
var memery = require("../efront/memery");
var clients = require("./clients");
var message = require("../message");
require("../efront/quitme");
process.on("uncaughtException", process.exit);
process.on("unhandledRejection", process.exit);
var { HTTPS_PORT, HTTP_PORT } = memery;
HTTP_PORT = +HTTP_PORT || 0;
HTTPS_PORT = +HTTPS_PORT || 0;
var closed = false;
var reload = require("./liveload");
var closeListener = function () {
    if (!portedServersList.filter(s => s && s.listening).length) {
        process.removeAllListeners();
        require("../efront/watch").close();
        safeQuitProcess();
    }
};
var safeQuitProcess = function () {
    closed = true;
    portedServersList.forEach((server) => {
        server.removeAllListeners();
        server.close(closeListener);
    });
    reload.splice(0, reload.length).forEach(res => res.end(''));
    process.removeAllListeners();
    clients.destroy();
    process.exit();
};

message.quit = safeQuitProcess;
message.deliver = function (a) {
    return clients.deliver(a[0], a[1]);
};
message.addmark = function (a) {
    return clients.addMark(a);
};
message.send('getmark', null, function (markList) {
    markList.forEach(clients.addMark, clients);
}, null);
message.send('addmark', clients.getMark()[0]);
// 子线程们
// 仅做开发使用的简易服务器
var http = require("http");
var http2 = require("http2");
// build mime
var doGet = require("./doGet");
var doPost = require("./doPost");
var doCross = require("./doCross");
var doFile = require("./doFile");
var doProxy = require("./doProxy");
var ppid = process.ppid;
var version = 'efront/' + ppid;
var requestListener = function (req, res) {
    var req_access_origin = req.headers["origin"];
    var req_access_headers = req.headers["access-control-request-headers"];
    var req_access_method = req.headers["access-control-request-method"];
    req_access_origin && res.setHeader("Access-Control-Allow-Origin", req_access_origin);
    req_access_origin && res.setHeader("Access-Control-Allow-Credentials", true);
    req_access_headers && res.setHeader("Access-Control-Allow-Headers", req_access_headers);
    req_access_method && res.setHeader("Access-Control-Allow-Methods", req_access_method);
    if (/^option/i.test(req.method)) {
        efront:
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
                    let ports = portedServersList.filter(a => a && a.listening).map(a => a.address().port);
                    process.send('quit');
                    res.end(`已关闭${ports.join("、")}端口`);
                    break efront;
            }
            var type = /^(\w+)([\/\w\-]+)?(\?[\s\S]*)?$/.exec(option);
            if (type) switch (type[1]) {
                case "link":
                    var id = clients.create().id;
                    res.write(String(id));
                    break;
                case "care":
                    var id = type[2];
                    if (id) {
                        id = id.slice(1);
                        var client = clients.attach(id);
                        if (!client) {
                            res.writeHead(403, {});
                            break;
                        }
                        client.listen(res);
                        client.refresh();
                        message.send('receive', id, function (msgids) {
                            if (msgids && msgids.length) {
                                client.deliver(msgids);
                            }
                        }, null);
                        if (clients.length > 40000) {
                            res.writeHead(503);
                            res.end();
                        }
                    } else {
                        res.writeHead(403);
                        res.end();
                    }
                    return;
                case "cast":
                    var id = type[2], msgid = type[3];
                    if (id && msgid) {
                        id = id.slice(1);
                        msgid = msgid.slice(1);
                        if (msgid.length > 8096) {
                            res.writeHead(400);
                            break;
                        }
                        try {
                            msgid = decodeURIComponent(msgid);
                        } catch (e) {
                            msgid = unescape(msgid);
                        }
                        message.send("deliver", [id, msgid]);
                    }
                    break;
            }
        }
        return res.end();
    }
    if (/^https?\:\/\//i.test(req.url)) {
        if (memery.noproxy) {
            req.destroy();
            res.destroy();
            return;
        }
        return doCross(req, res);
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
    var match = req.url.match(/\/ccon\/(.*?)\.([\da-f]+)\.png$/i);
    if (match) {
        var name = match[1];
        var color = parseInt(match[2], 16);
        return res.end(doPost.ccon(name, color));
    }
    if (/^get/i.test(req.method)) {
        var match = req.url.match(/\/:(?:comm|page|ccon|aa?pi)\/.*?$/i);
        if (match) {
            return doPost(req, res);
        }
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
    var port = portedServersList.map(a => a && a.address());
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
        showServerError.call(portedServersList[0], msg[1] + "\t" + error);
    });
    if (msg[2]) checkServerState(require("https"), HTTPS_PORT).then(function () {
        console.info(msg[2] + "\t<green>正常访问</green>\r\n");
    }).catch(function (error) {
        showServerError.call(portedServersList[1], msg[2] + "\t" + error);
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
    console.error(error || `${error.port}端口打开失败!`);
    s.close(closeListener);
};
var portedServersList = [];
function initServer(port) {
    var server = this.once("error", showServerError)
        .once("listening", showServerInfo)
        .listen(+port);
    portedServersList.push(server);
    return server;
}
function netOnceDataAdapter(buf) {
    var socket_type = [0x1603, 0x434f].indexOf((buf[0] << 8) + buf[1]);
    if (memery.loghead) {
        console.clear();
        console.log(String(buf));
    }
    var socket = this;
    socket.on('error', function () { })
    socket.unshift(buf);
    if (socket_type === 0) {
        if (server2 === socket.server) server2.emit("connection", socket);
        else socket.destroy();
    } else if (socket_type > 0) {
        doProxy(socket);
    } else {
        if (server1) server1.emit("connection", socket);
        else socket.destroy();
    }
}

function netListener(socket) {
    socket.on('error', socket.destroy);
    socket.once("data", netOnceDataAdapter);
}
var getIntVersion = function (version) {
    version = String(version).replace(/[^\.\d]+/, '');
    var [a, b, c] = version.split('.');
    return (+a << 16) + (+b << 8) + +c;
};
if (HTTP_PORT) {
    var server1 = http.createServer(requestListener).setTimeout(0);
    if (getIntVersion(process.version) >= getIntVersion('12.19.0')) {
        var server0 = require("net").createServer(netListener);
        initServer.call(server0, HTTP_PORT);
    } else {
        initServer.call(server1, HTTP_PORT);
    }
}
var SSL_PFX_PATH = memery.PFX_PATH, SSL_ENABLED = false;
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
    httpsOptions.passphrase = memery.PFX_PASSWORD;
}
else if (HTTPS_PORT) {
    console.warn("<yellow>HTTPS端口正在使用默认证书，请不要在生产环境使用此功能！</yellow>");
    httpsOptions.key = fs.readFileSync(path.join(__dirname, '../../data/keystore/cross-key.pem'));
    httpsOptions.cert = fs.readFileSync(path.join(__dirname, '../../data/keystore/cross-cert.pem'));
    SSL_ENABLED = true;
}
if (SSL_ENABLED) {
    HTTPS_PORT = +HTTPS_PORT || 443;
    var server2 = http2.createSecureServer(httpsOptions, requestListener).setTimeout(0);
    initServer.call(server2, HTTPS_PORT);
}
process.on('exit', function (event) {
    if (event instanceof Error) console.error(event);
});
message.count("boot");
