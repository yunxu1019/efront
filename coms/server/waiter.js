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
var reload = require("./liveload");
var closeListener = function () {
    if (!portedServersList.filter(s => s && s.listening).length) {
        process.removeAllListeners();
        require("../efront/watch").close();
        safeQuitProcess();
    }
};
var closed = false;
var safeQuitProcess = function () {
    closed = true;
    portedServersList.forEach((server) => {
        server.removeAllListeners();
        var timeout = setTimeout(function () {
            server.unref();
        }, process.stdin.isTTY ? 100 : 24 * 60 * 60 * 1000);
        var remove = function () {
            clearTimeout(timeout);
        }
        server.close(remove);

    });
    reload.splice(0, reload.length).forEach(res => res.end(''));
    process.removeAllListeners();
    clients.destroy();
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
var requestListener = async function (req, res) {
    if (closed) return req.destroy();
    req.protocol = this === server1 ? 'http:' : 'https:';
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
            else if (!/^(?:\:\:1?|(?:\:\:ffff\:)?127\.0\.0\.1)$/i.test(address)) {
            }
            else switch (option) {
                case "quit":
                case "exit":
                    let ports = portedServersList.filter(a => a && a.listening).map(a => a.address().port);
                    process.send('quit');
                    res.end(`已关闭${ports.join("、")}端口`);
                    return;
            }
            res.setHeader('Content-Type', 'text/plain;charset=UTF-8');
            var type = /^(\w+)([\/\w\-]+)?(\?[\s\S]*)?$/.exec(option);
            var needLogin = false;
            var remoteAddress = req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;
            if (type) switch (type[1]) {
                case "login":
                    var a = type[2] || '';
                    return require("./login")(a.slice(1), remoteAddress).then(b => {
                        if (!b) throw "密码不正确！";
                        res.end(b);
                    }).catch(e => {
                        res.writeHead(403);
                        res.end(String(e));
                    });
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
                case "clear":
                    break;
                default:
                    needLogin = true;
            }
            if (needLogin && await require("./checkAuth")(req.headers.authorization, remoteAddress)) switch (type[1]) {
                case "clear":
                    doGet.reset();
                    res.write("清理完成");
                    break;
                case "share":
                    var opt = type[2] && type[2].slice(1);
                    switch (opt) {
                        case 'list':
                            res.write(JSAM.stringify(require("./checkAccess").roots));
                            break;
                        case 'create':
                            var optname = '添加'
                        case 'delete':
                            var optname = optname || '删除'
                        case 'update':
                            var optname = optname || '修改'
                            res.writeHead(403);
                            res.write(`暂不支持${optname}共享路径！`);
                            break;
                        default:
                            res.writeHead(403);
                            res.write("非法操作！");
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
    if (doCross.prefix.test(req.url)) {
        return doCross(req, res, false);
    }
    if (doCross.referer.test(req.headers.referer)) {
        return doCross(req, res, req.headers.referer);
    }
    if (/^\/\*{1,2}$/.test(req.url) && !req.headers.authorization || /^\/\*{3,}$/.test(req.url)) {
        res.writeHead(401, {
            "WWW-Authenticate": "Basic",
        });
        res.end(`<script>location.href="/"</script>`);
        return;
    }
    else if (req.headers.authorization) {
        var auth = Buffer.from(req.headers.authorization.replace(/^Basic\s+/i, ''), 'base64').toString();
        if (/^~~/.test(auth)) {
            auth = auth.replace(/\:$/, '');
            req.url = "/" + auth + req.url.replace(/^\/\*+/, '');
            return doCross(req, res);
        }
    }
    if (/^\/@/i.test(req.url)) {
        return doFile(req, res);
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
var loaded = 0;
var showServerInfo = function () {
    if (++loaded < portedServersList.length) return;
    var address = require("../efront/getLocalIP")();
    var port = portedServersList.map(a => a && a.address());
    port = port.map((a, i) => a && a.port || portedServersList[i].port);
    var msg = [`服务器地址：${address}`, port[0] ? `http端口  ：${port[0]}` : '', port[1] ? `https端口 ：${port[1]}` : ''].map(a => a.toUpperCase());
    var maxLength = Math.max(msg[1].length, msg[2].length);
    process.title = msg.map(a => a.trim()).filter(a => !!a).join('，').replace(/\s/g, '');
    if (!ipLoged) ipLoged = true, console.info(msg[0] + "\r\n");
    if (~port.indexOf(null)) {
        console.log(port)
        return;
    }
    msg = msg.map(a => a.length && a.length < maxLength ? a + " ".repeat(maxLength - a.length) : a);
    var showError = function (i, e = portedServersList[i].error) {
        var s = portedServersList[i];
        s.removeAllListeners();
        console.error(msg[i + 1] + "\t" + e);
        s.close(closeListener);
    };
    var showValid = function (i) {
        console.info(msg[i + 1] + "\t<green>正常访问</green>\r\n");
    }
    if (msg[1]) {
        if (portedServersList[0].error) {
            showError(0);
        }
        else checkServerState(http, HTTP_PORT).then(function () {
            showValid(0);
        }).catch(function (error) {
            showError(0, error);
        });
    }
    if (msg[2]) {
        if (portedServersList[1].error) {
            showError(1);
        }
        else checkServerState(require("https"), HTTPS_PORT).then(function () {
            showValid(1);
        }).catch(function (error) {
            showError(1, error);
        });
    }
};
var showServerError = function (error) {
    var s = this;
    if (!s) return;

    if (error instanceof Error) {
        switch (error.code) {
            case "EADDRINUSE":
                error = `端口被占用`;
                break;
            case "EACCES":
                error = "没有权限";
                break;
            default:
                error = error.code;
        }
    }
    s.error = error || `端口打开失败`;
    showServerInfo.call(s);
};
var portedServersList = [];
function initServer(port) {
    var server = this.once("error", showServerError)
        .once("listening", showServerInfo)
        .listen(+port);
    server.port = port;
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
    process.stdin.unref();
    process.stderr.unref();
    process.stdout.unref();
    if (event instanceof Error) console.error(event);
});
message.count("boot");
