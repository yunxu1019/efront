"use strict";
require("../efront/setupenv");
var { Http2ServerResponse, Http2ServerRequest } = require("http2");
var userdata = require("./userdata");
var { Transform, Writable, Readable } = require("stream");
var memery = require("../efront/memery");
var clients = require("./clients");
var recover = require("./recover");
var message = require("../message");
var net = require("net");
message.listen();
var cert = server$cert;
var quitme = require("../efront/quitme");
var { HTTPS_PORT, HTTP_PORT } = memery;
HTTP_PORT = +HTTP_PORT || 0;
HTTPS_PORT = +HTTPS_PORT || 0;
var liveload = require("./liveload");
var dns = require("dns");
if (memery.DNS) dns.setServers(memery.DNS.trim().split(/[,\s]+/));
if (memery.IPV4FIRST && dns.setDefaultResultOrder) dns.setDefaultResultOrder("ipv4first");
var closeListener = function () {
    if (!portedServersList.filter(s => s && s.listening).length) {
        safeQuitProcess();
        if (isFunction(quitme)) quitme();
    }
};
require("./watch").start();
recover.start();
var safeQuitProcess = function () {
    clearInterval(checker_interval);
    require("./watch").close();
    memery.islive = false;
    portedServersList.forEach((server) => {
        if (!server.listening) return;
        server.removeAllListeners();
        var timeout = setTimeout(function () {
            process.exit();
        }, process.stdin.isTTY ? 100 : 2 * 60 * 60 * 1000);
        var remove = function () {
            clearTimeout(timeout);
        }
        server.unref();
        server.close(remove);
    });
    message.close();
    process.removeAllListeners();
    liveload.splice(0, liveload.length).forEach(res => res.end('') | res.socket.destroy());
    recover.destroy();
};
message.disconnect = function () {
    safeQuitProcess();
};
message.deliver = function (a) {
    return clients.deliver(a[0], a[1], a[2]);
};
message.addmark = function (a) {
    return clients.addMark(a);
};
message.getClients = function () {
    return clients.map(c => ({ id: c.id, optime: c.optime }));
};
message.putuser = function ([clientid, usr]) {
    clients.putUser(clientid, usr);
};
message.send('getmark', null, function (markList) {
    markList.forEach(clients.addMark, clients);
}, null);
message.send('addmark', clients.getMark()[0]);
message.reloadUserdata = function () {
    userdata.reload();
};
message.setauth = function ([auth, data]) {
    if (typeof data === 'string') {
        data = Buffer.from(data);
        data.mime = "application/octet-stream";
    }
    doGet.setAuth(auth, data);
};
var setAuth = function (auth, data) {
    message.broadcast("setauth", [auth, data]);
    setTimeout(function (auth) {
        message.broadcast("setauth", [auth, null]);
    }.bind(null, auth), 120000/*两分钟*/);
};
// 子线程们
// 仅做开发使用的简易服务器
var http = require("http");
var http2 = require("http2");
// build mime
var doGet = require("./doGet");
var doPost = require("./doPost");
var doCross = require("./doCross");
var { referer: crossReferer, prefix: crossPrefix } = doCross;
var doFile = require("./doFile");
var doProxy = require("./doProxy");
var doFolder = require("./doFolder");
var doChannel = require("./doChannel");
var getRequestEnv = require('./getRequestEnv');
var remoteAddress = require("./remoteAddress");
var remoteNetid = function (req) {
    var address = remoteAddress(req);
    var match = /(\d+)\.(\d+)(?:\.\d+){2}$/.exec(address);
    if (!match) return address;
    var [, ip, id] = match;
    switch (+ip) {
        case 10:
            return "10.0.0.0";
        case 172:
            if ((id & 0b11110000) === 16) return "172.16.0.0";
            break;
        case 192:
            if (+id === 168) return "192.168.0.0";
            break;
    }
    return address;
}
var cast = function (req, res, type) {
    var id = type[2], msgid = type[3];
    if (id && msgid) {
        if (msgid.length > 8096) {
            res.writeHead(400, utf8error);
            return;
        }
        var [cid, uid] = id.split("/");
        if (clients.getType(cid) === 1) {// 自动转换到 localIp
            if (!clients.checkId(cid)) return;
            cid = remoteNetid(req);
        }
        try {
            msgid = decodeURIComponent(msgid);
        } catch (e) {
            msgid = unescape(msgid);
        }
        message.send("deliver", [cid, uid, msgid]);
    }
};

var care = function (req, res, type) {
    var id = type[2];
    if (id) {
        if (clients.length > 40000) {
            res.writeHead(503, utf8error);
            res.end(i18n[req.headers['accept-language']]`服务器忙！`);
            return;
        }
        var ct = clients.getType(id);
        var client = null;
        if (ct === 1) {// 自动转换到 localIp
            if (clients.checkId(id)) {
                id = remoteNetid(req);
                client = clients.attach(id, false);
            }
        }
        else {
            client = clients.attach(id);
        }
        if (!client) {
            res.writeHead(403, utf8error);
            res.end();
            return;
        }
        var userinfo = null;
        if (type[3]) {
            userinfo = encode62.timedecode(type[3]);
        }
        var usr = client.listen(res, userinfo);
        client.refresh();
        var uid = userinfo && userinfo.split("/")[0];
        message.send('receive', [id, uid], function (msgids) {
            if (msgids && msgids.length) {
                client.deliver(uid, msgids);
            }
        }, null);
        if (usr) {
            message.broadcast("putuser", [id, userinfo]);
        }
    } else {
        res.writeHead(403, utf8error);
        res.end();
    }
};
/**
 * @param {Http2ServerRequest} req
 * @param {Http2ServerResponse} res
 */
var doOptions = async function (req, res, type) {
    res.setHeader('Content-Type', 'text/plain;charset=UTF-8');
    var needLogin = false;
    switch (type[1]) {
        case "efront":
            if (type[3]) {
                message.send("logsimilar", JSON.stringify({ ip: remoteAddress(req), ppid: type[2], port: type[3], time: Date.now() }));
                if (!selfLogged && type[2] === version.slice(7)) {
                    selfLogged = true;
                }
            }
            break;
        case "version":
            res.write("efront " + require("../../package.json").version);
            break;
        case "live":
            if (memery.istest) {
                let env = await getRequestEnv(req);
                if (!env) break;
                res.env = env;
                res.referer = getHeader(req.headers, "referer");
                var remove = () => {
                    req.off("close", remove);
                    req.off("aborted", remove);
                    req.off("error", remove);
                    removeFromList(liveload, res);
                };
                req.once('close', remove);
                req.once("aborted", remove);
                req.once("error", remove);
                return liveload.mount(type[2], res);
            }
            break;
        case "uptime":
            return message.send("uptime", null, function (error, time) {
                if (error) {
                    res.writeHead(403, utf8error);
                    res.end(String(error));
                    return;
                }
                res.end(String(time));
            })
            break;
        case "login":
            var a = type[2] || '';
            return require("./login")(a, remoteAddress).then(b => {
                if (!b) throw i18n[req.headers["accept-language"]]`密码不正确！`;
                res.end(b);
            }).catch(e => {
                res.writeHead(403, utf8error);
                res.end(String(e));
            });
        case "link":
            if (type[2]) {
                try {
                    var roomid = encode62.timedecode(type[2]);
                    var room = await userdata.getOptionObj("room", roomid);
                    if (!room) { throw i18n[req.headers["accept-language"]]`房间不存在！`; }
                    if (!room.linkid || !clients.checkId(room.linkid)) {
                        room.linkid = clients.create().id;
                        await userdata.setOptionObj("room", roomid, room);
                        await message.broadcast("reloadUserdata");
                        room = await userdata.getOptionObj("room", roomid);
                    }
                    return res.end(String(room.linkid));
                }
                catch (e) {
                    res.writeHead(403, utf8error);
                    res.end(String(e));
                    return;
                }
            }
            var id = clients.create(type[2] === '' ? 1 : 0).id;
            res.write(String(id));
            break;
        case "similar":
            message.send("allsimilar", null, function (datas) {
                res.write(datas);
                res.end();
            }, function () {
                res.writeHead(500, utf8error);
                res.end();
            });
            return;
        case "care":
            care(req, res, type);
            return;
        case "cast":
            cast(req, res, type);
            break;
        default:
            needLogin = true;
    }
    if (needLogin && !await require("./checkAuth")(getHeader(req.headers, 'authorization'), remoteAddress)) {
        res.writeHead(401, utf8error);
        res.write(i18n[req.headers["accept-language"]]`无权访问`);
        needLogin = false;
    }
    if (needLogin) switch (type[1]) {
        case "count":
            userdata.getStream('count.jsam').pipe(res);
            return;
        case "setauth":
            setAuth(type[2], type[3]);
            break;
        case "unique":
            if (type[2]) {
                try {
                    await userdata.setUniqueKeyPair(type.slice(2).join('+'));
                } catch (e) {
                    res.writeHead(500, utf8error);
                    res.write(String(e));
                }
                break;
            }
            res.write(await userdata.getUniqueKeyPair());
            break;
        case "cluster":
            switch (type[2]) {
                case "list":
                    if (type[3]) {
                        message.send("cluster", [+type[3], "getClients"], function (error, clients) {
                            if (error) {
                                res.write(400);
                                res.end(String(error));
                                return;
                            }
                            res.end(JSAM.stringify(clients));
                        });
                        return;
                    }
                    message.send("clusterList", type[3], function (error, list) {
                        if (error) {
                            res.writeHead(500, utf8error);
                            res.end(String(error));
                            return;
                        }
                        res.end(JSAM.stringify(list));
                    });
                    return;
            }
            break;
        case "clear":
            doGet.reset();
            res.write(i18n[getHeader(req.headers, "accept-language")]`清理完成`);
            break;
        case "recert":
            res.on("cert", function () {
                this.socket.destroy();
            });
            await message.broadcast("reloadCert");
            res.end();
            return;
        case "rehost":
            res.on("finish", function () {
                this.socket.destroy();
            });
            res.on("finish", safeQuitProcess);
            safeQuitProcess = function () { };
            message.send('rehost', null, function () {
                res.end(i18n[getHeader(req.headers, "accept-language")]`正在重启`);
            });
            return;
        case "params":
            try {
                var data = await require("../efront/require2").getTaskParams(type[2]);
                res.end(data);
            }
            catch (e) {
                res.writeHead(500, utf8error);
                res.end(String(e));
            }
            return;
        case "invoke":
            try {
                var data = await require("../efront/require2").invokeTask(type[2], type[3]);
                res.end(data);
            }
            catch (e) {
                res.writeHead(500, utf8error);
                res.end(String(e));
            }
            return;
        case "task":
        case "dict":
        case "cert":
        case "room":
        case "proxy":
        case "private":
            try {
                let key = type[2] && encode62.timedecode(type[2]);
                if (type[3] !== undefined) {
                    let act = type[0].charAt(type[0].length - type[3].length - 1);
                    if (type[3] && act === "+" || !type[3] && act === "?") {
                        var exists = await userdata.hasOption(type[1], key);
                        if (!type[3]) return res.end(encode62.timeencode(String(exists)));
                        if (exists && type[3]) {
                            res.writeHead(403, utf8error);
                            res.end(i18n[req.headers["accept-language"]]`已存在相同标识的数据`);
                            return;
                        }
                    }
                    if (type[3] && act === '*') {
                        await userdata.patchOptionStr(type[1], key, encode62.timedecode(type[3]));
                        res.end();
                        return;
                    }
                }
                var data = await userdata.option(type[1], key, type[3] && encode62.timedecode(type[3])) || '';
                await message.broadcast('reloadUserdata');
                res.end(data);
            }
            catch (e) {
                res.writeHead(e.status || 500, utf8error);
                res.end(String(e));
            }
            return;
        case "file":
            try {
                var data = await doFolder(type[2], type[3]);
                res.end(data);
            } catch (e) {
                res.writeHead(e.status || 500, utf8error);
                res.end(String(e));
            }
            return;
        case "share":
            var opt = type[2];
            try {
                if (type[3]) var p = decodeURIComponent(type[3])
                var shared = require("./checkAccess");
                switch (opt) {
                    case 'list':
                        res.write(JSAM.stringify(shared.roots));
                        break;
                    case 'create':
                        await shared.append(p);
                        break;
                    case 'delete':
                        await shared.remove(p);
                        break;
                    default:
                        res.writeHead(400, utf8error);
                        res.write(i18n[req.headers["accept-language"]]`非法操作！`);
                }
            }
            catch (e) {
                res.writeHead(e.status || 500, utf8error);
                res.end(String(e.error || e));
            }
            break;
    }
    res.end();
};
var parseURL = require("../basic/parseURL");
var ppid = process.ppid || process.pid;
var version = `efront-${require("../../package.json").version}/` + ppid;
var utf8error = {
    "Content-Type": "text/plain;charset=UTF-8"
};
/**
 * @this {Http2ServerResponse}
 */
var writeHead = function (crypted, code, map) {
    if (this.closed) return;
    if (isObject(map)) {
        for (var k in map) {
            var v = map[k];
            var k1 = k.toLowerCase();
            if (k1 !== k) {
                delete map[k];
                map[k1] = v;
            }
        }
        if (this instanceof Http2ServerResponse) {
            delete map["transfer-encoding"];
            delete map["connection"];
        }
        var cookie = map["set-cookie"] || map["efront-cookie"];
        if (cookie) {
            delete map["set-cookie"];
            var expose = this.getHeader("access-control-expose-headers") || map["access-control-expose-headers"] || '';
            if (typeof expose === 'string') expose = expose.split(/\s*,\s*/).filter(a => !!a);
            map["efront-cookie"] = [].concat(cookie).map(e => encode62.safeencode(e, crypted));
            if (!~expose.indexOf('efront-cookie')) expose.push('efront-cookie');
            map["access-control-expose-headers"] = expose.join(',');
        }
        delete map["content-length"];
    }
    this.writeHead(code, map);
}
/**
 * @this {Http2ServerResponse}
 */
var setHeader = function (crypted, k, v) {
    if (this.closed) return;
    k = k.toLowerCase();
    if (this instanceof Http2ServerResponse && /^(transfer-encoding|connection)$/.test(k)) return;
    if (k === 'content-length') return;
    if (k === 'set-cookie' || k === 'efront-cookie') {
        v = [].concat(v).map(e => encode62.safeencode(e, crypted));
    }
    try { this.setHeader(k, v); } catch {
        // 忽略客户端传过来的错误头
    }
};
var proxy = require("./url-proxy");
var hasAuth = doGet.hasAuth;
var doAuth = doGet.auth;
/**
 * @param {Http2ServerRequest}req
 * @param {Http2ServerResponse}res
 * @this {net.Server}
 */
var requestListener = async function (req, res) {
    var socket = req.socket;
    if (socket.unref) socket.unref();
    try {
        var remoteAddress = require("./remoteAddress")(req);
    } catch {
    }
    if (!remoteAddress) {
        res.writeHead(403, utf8error);
        res.end(i18n[getHeader(req.headers, 'accept-language')]`禁止访问`);
        return;
    }
    var method = req.method;
    var url = req.url;
    var headers = req.headers;
    if (/^\/\!/.test(url)) {
        var crypted = await userdata.getRequestCode(req);
        if (url.length === 2) return res.end(encode62.timeencode(crypted));
        try {
            url = req.url = url.slice(0, 2) + encode62.safedecode(encode62.timedecode(url.slice(2)), crypted);
        } catch (e) {
            res.writeHead(403, utf8error);
            res.end(i18n[getHeader(headers, "accept-language")]`禁止访问`);
            return;
        }
        delete headers["content-length"];
        var size = 0;
        var res1 = new Transform({
            transform(chunk, _, ok) {
                chunk = String(chunk);
                chunk = encode62.safeencode(chunk, crypted, size);
                size += chunk.length;
                ok(null, chunk);
            }
        });
        res1.pipe(res);
        Object.defineProperties(res1, {
            'headersSent': {
                get: function () {
                    return this.headersSent;
                }.bind(res)
            },
            'closed': {
                get: function () {
                    return this.closed
                }.bind(res),
                set: function (v) {
                    this.closed = v;
                }.bind(res)
            }
        });
        Object.assign(res1, {
            setHeader: setHeader.bind(res, crypted),
            writeHead: writeHead.bind(res, crypted),
            write() {
                if (this.closed) return;
                Transform.prototype.write.apply(this, arguments);
            },
            end() {
                if (this.closed) return;
                Transform.prototype.end.apply(this, arguments);
            },
        });
        res = res1;
        var writedLength = 0;
        var req1 = req.pipe(new Transform({
            autoDestroy: true,
            transform(chunk, _, ok) {
                chunk = String(chunk);
                try {
                    ok(null, encode62.safedecode(chunk, crypted, writedLength));
                    writedLength += chunk.length;
                } catch (e) {
                    if (res.closed) return;
                    res.writeHead(403, utf8error);
                    res.end(i18n[getHeader(headers, "accept-language")]`数据异常！`);
                    req.destroy();
                    res.closed = true;
                    return;
                }
            }
        }));
        req1.headers = headers;
        req1.url = url;
        req1.method = method;
        req1.socket = socket;
        req = req1;
        if (/^\/\!\//.test(url)) url = req.url = url.slice(2);
    }

    req.protocol = this === server1 ? 'http:' : 'https:';
    var req_access_origin = getHeader(headers, "origin");
    var req_access_headers = getHeader(headers, "access-control-request-headers");
    var req_access_method = getHeader(headers, "access-control-request-method");
    if (memery.CORS) {
        req_access_origin && res.setHeader("Access-Control-Allow-Origin", req_access_origin);
        /^cross/i.test(getHeader(headers, "sec-fetch-site")) && res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
        /^https:/i.test(req_access_origin) && res.setHeader("Access-Control-Allow-Credentials", true);
        req_access_headers && res.setHeader("Access-Control-Allow-Headers", req_access_headers);
        req_access_method && res.setHeader("Access-Control-Allow-Methods", req_access_method);
    }
    if (/^option/i.test(method)) {
        if (req_access_method || req_access_headers) {
            return res.end();
        }
        if (/^\/\:/.test(url)) {
            var option = url.slice(2);
            if (option === version) res.setHeader("Powered-By", version);
            else if (!/^(?:\:\:1?|(?:\:\:ffff\:)?127\.0\.0\.1)$/i.test(remoteAddress)) {
            }
            else switch (option) {
                case "quit":
                case "exit":
                    let ports = portedServersList.filter(a => a && a.listening).map(a => a.address().port);
                    message.send('quit');
                    res.end(i18n[getHeader(headers, "accept-language")]`已关闭${ports.join("、")}端口`);
                    return;
            }
            var type = /^(\w+)(?:[\-\/\!]([\/\!\'\(\)\-\.\w]*))?(?:[\?\:\+\*]([\s\S]*))?$/.exec(option);
            if (type) return doOptions(req, res, type);
        }
        return res.end();
    }
    if (hasAuth(url)) {
        return doAuth(req, res);
    }
    if (/^https?\:\/\//i.test(url)) {
        if (memery.noproxy) {
            req.destroy();
            res.destroy();
            return;
        }
        return doCross(req, res);
    }
    if (crossPrefix.test(url)) {
        return doCross(req, res, false);
    }
    var referer = getHeader(headers, 'referer');
    if (crossReferer.test(referer)) {
        return doCross(req, res, referer);
    }
    var authorization = getHeader(headers, "authorization");
    if (/^\/\*{1,2}$/.test(url) && !authorization || /^\/\*{3,}$/.test(url)) {
        res.writeHead(401, {
            "WWW-Authenticate": "Basic",
        });
        res.end(`<script>location.href="/"</script>`);
        return;
    }
    else if (authorization) {
        var auth = Buffer.from(authorization.replace(/^Basic\s+/i, ''), 'base64').toString();
        if (/^~~/.test(auth)) {
            auth = auth.replace(/\:$/, '');
            req.url = "/" + auth + url.replace(/^\/\*+/, '');
            return doCross(req, res);
        }
    }
    try {
        url = req.url = decodeURI(url);
    } catch {
        url = req.url = unescape(url);
    }
    if (/^\/@/i.test(url)) {
        return doFile(req, res);
    }
    if (memery.CHANNEL_ENABLED && /^\/\([\s\S]*\)/.test(url)) {
        return doChannel(req, res);
    };
    if (memery.islive && /\/\:(\w{3,4})\//.test(url)) {
        return doPost.call(this, req, res);
    }
    var url = await proxy(req);
    if (req.jump || /^https?:|^\/\//i.test(url)) {
        res.writeHead(302, {
            Location: url
        });
        res.end();
        return;
    }
    if (/^post/i.test(method) && !crypted) {
        return doPost.call(this, req, res);
    }
    req.url = url;
    if (/^~~?|^&/.test(url)) {
        return doCross(req, res);
    }
    if (getHeader(headers, "range")) {
        return doFile(req, res);
    }
    if (/^get/i.test(method) || crypted) {
        return doGet(req, res);
    }
    else {
        return doFile(req, res);
    }
};
var ipLoged = false;
var selfLogged = false;
/**
 * @param {Http2ServerRequest} http
 */
var checkServerState = function (http, hosted) {
    if (arguments.length === 1) var type = http;
    return new Promise(function (ok, oh) {
        var v = version;
        if (type) v += "?" + type;
        var { hostname: host, port, protocol } = parseURL(hosted ? hosted : memery.REPORT);
        if (!host || !type || selfLogged) {
            if (!hosted) {
                var { hostname: host, port, protocol } = parseURL(http[0]);
            }
            if (type) {
                http = require(protocol.replace(/\:$/, ""));
            }
        }
        else {
            if (!protocol) {
                protocol = +port === 443 ? "https" : 'http';
            }
            http = require(protocol.replace(/\:$/, ''));
        }
        if (!port) {
            port = /^https/.test(protocol) ? 443 : 80;
        }
        var req = http.request(Object.assign({
            method: 'options',
            host,
            port: +port,
            rejectUnauthorized: false,// 放行证书不可用的网站
            path: '/:' + v
        }, httpsOptions), function (response) {
            req.destroy();
            var powered = response.headers["powered-by"];
            if (type) return ok();
            if (powered === version) {
                ok(i18n`检查到${port}可以正常访问\r\n`);
                if (!memery.proted) memery.proted = true;
            } else {
                oh(i18n`端口异常`);
            }
        });
        req.on("error", oh);
        req.end();
    });
};
var loading = 0;
var checkOutside = lazy(async function (type) {
    try {
        await checkServerState(type);
        if (!selfLogged) {
            selfLogged = true;
            await checkServerState(type);
        }
    } catch { };
}, 80);
var isHttpsServer = function (server) {
    return server !== server0 && server !== server1;
};
var showServerInfo = async function () {
    if (--loading > 0) return;
    var address = require("../efront/getLocalIP")();
    var msg = [
        i18n`服务器地址：${address}`];
    var maxLength = 0;
    if (process.stdin.isTTY) process.title = msg.map(a => a.trim()).filter(a => !!a).join('，').replace(/\s/g, '');
    else process.title = 'efront';
    portedServersList.forEach(s => {
        s.hosted.forEach(m => {
            if (maxLength < m.length) maxLength = m.length;
            msg.push(m);
        });
    })
    if (!ipLoged) ipLoged = true, console.info(msg[0] + "\r\n");
    msg = msg.map(a => a.length && a.length < maxLength ? a + " ".repeat(maxLength - a.length) : a);
    var showError = function (i, e = portedServersList[i].error) {
        console.error(msg[i] + "\t" + `<red>${e}</red>`);
    };
    var showValid = function (i) {
        console.info(msg[i] + `\t<green>${i18n`正常访问`}</green>\r\n`);
    }
    var types = [];
    var i = 0;
    for (var s of portedServersList) {
        var ishttps = isHttpsServer(s);
        for (var p of s.hosted) {
            i++;
            if (s.error) {
                showError(i);
                s.removeAllListeners();
                s.close(closeListener);
            }
            else try {
                await checkServerState(ishttps ? require("https") : http, p);
                showValid(i);
                types.push(...s.hosted);
            }
            catch (error) {
                showError(i, error);
            }
        }
    }
    types.sort();
    if (types.length) checkOutside(types);
};
var showServerError = function (error) {
    var s = this;
    if (!s) return;
    if (error instanceof Error) {
        switch (error.code) {
            case "EADDRINUSE":
                error = i18n`端口被占用`;
                break;
            case "EACCES":
                error = i18n`没有权限`;
                break;
            case "EADDRNOTAVAIL":
                error = i18n`分配地址失败`;
                break;
            case "ECONNRESET":
                return;
            default:
                error = error.code;
        }
    }
    s.error = error || i18n`端口打开失败`;
    showServerInfo.call(s);
};
var portedServersList = [];
/**
 * @this http.Server
 */
function initServer(port, hostname, hostnames) {
    loading++;
    var server = this.once("error", showServerError)
        .on('clientError', function (err, socket) {
            if (err.code === 'ECONNRESET' || !socket.writable) {
                return;
            }
            socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
        })
        .once("listening", showServerInfo);
    if (!hostname) server.listen(+port);
    else server.listen(+port, hostname);
    portedServersList.push(server);
    var wraphost = function (hostname) {
        if (!hostname) hostname = 'localhost';
        if (isHttpsServer(server)) {
            if (+port !== 443) {
                hostname += ":" + port;
            }
            hostname = "https://" + hostname;
        }
        else {
            if (+port !== 80) {
                hostname += ":" + port;
            }
            hostname = "http://" + hostname;
        }
        return hostname;
    };
    if (hostnames) {
        server.hosted = hostnames.map(wraphost);
    }
    else {
        server.hosted = [wraphost(hostname)];
    }
    server.port = port;
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
        var server = socket.server;
        if (server !== server0 && server !== server1) server.emit("connection", socket);
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
var server0, server1;
/**
 * @type {http2.SecureServerOptions}
 */
var httpsOptions = {
    allowHTTP1: true,
};

var createHttpsServer = function () {
    if (httpsOptions.pfx || httpsOptions.cert && httpsOptions.key) {
        HTTPS_PORT = +HTTPS_PORT || 443;
        var server2 = http2.createSecureServer(httpsOptions, requestListener);
        initServer.call(server2, HTTPS_PORT);
    }
};

var createCertedServer = function (certlist) {
    var wantdie = portedServersList.filter(s => isHttpsServer(s) && !!portedServersList[s.hostname]);
    wantdie.forEach(servern => {
        removeFromList(portedServersList, servern);
        servern.close();
        servern.removeAllListeners();
        servern.unref();
    });
    if (!certlist.length) return;
    var isSingleCert = !memery.PFX_PATH;
    var wrapkey = k => `-----BEGIN RSA PRIVATE KEY-----\n${k}\n-----END RSA PRIVATE KEY-----\n`;
    if (isSingleCert) {
        var { private: private1, key = wrapkey(private1), cert } = certlist[0];
        for (var cx = 1, dx = certlist.length; cx < dx; cx++) {
            var { private: private1, key: key1 = wrapkey(private1), cert: cert1 } = certlist[0];
            if (key1 !== key || cert1 !== cert) {
                isSingleCert = false;
                break;
            }
        }
        if (isSingleCert) {
            certlist = [{ cert, key, hostnames: certlist.map(c => c.hostname) }];
        }
    }
    certlist.forEach(c => {
        httpsOptions.key = c.key || wrapkey(c.private);
        httpsOptions.cert = c.cert;
        try {
            var serveri = http2.createSecureServer(httpsOptions, requestListener);
            initServer.call(serveri, +HTTPS_PORT || 443, c.hostname, c.hostnames);
            serveri.hostname = c.hostname;
            portedServersList[c.hostname] = serveri;
        } catch (e) {
            //<!-- console.error(e); -->
            console.warn(`<yellow2>${i18n`用于${`<red2>${c.hostname}</red2>`}的证书不可用`}</yellow2>`);
        }
    });
};

var createHttpServer = function () {
    server1 = http.createServer(requestListener);
    if (getIntVersion(process.version) >= getIntVersion('12.19.0')) {
        server0 = net.createServer(netListener);
        initServer.call(server0, HTTP_PORT);
    } else {
        initServer.call(server1, HTTP_PORT);
    }
};

process.on('exit', function () {
    if (process.stdin.unref) process.stdin.unref();
    if (process.stderr.unref) process.stderr.unref();
    if (process.stdout.unref) process.stdout.unref();
});
var cert;
message.count("boot");
var getCertList = async function () {
    var certlist = await userdata.getOptionsList("cert");
    certlist = certlist.filter(c => c.private && c.cert && c.hostname);
    if (memery.PFX_PATH) cert = await import('./cert');
    if (HTTPS_PORT) {
        if (!certlist.length && !memery.PFX_PATH) {
            console.warn(`<yellow2>${i18n`HTTPS端口正在使用默认证书，请不要在生产环境使用此功能！`}</yellow2>`);
            if (!cert) cert = await import('./cert');
            certlist.push(cert);
        }
    }
    return certlist;
}
message.reloadCert = async function () {
    var certlist = await getCertList();
    createCertedServer(certlist);
};
getCertList().then(function (certlist) {
    if (HTTP_PORT) createHttpServer();
    if (certlist.length) createCertedServer(certlist);
    if (memery.PFX_PATH) {
        delete httpsOptions.key;
        delete httpsOptions.cert;
        Object.assign(httpsOptions, cert);
        createHttpsServer();
    }
});
var acme2 = await require("../pivot/acme2");
if (acme2.enabled) {
    message.updateAcme2 = function () {
        return userdata.getUniqueKeyPair().then(function (pair) {
            acme2.makeUnique(pair, false);
        });
    };
    message.updateAcme2();
    var checkTime = 8640000;/* 一天检查10次*/;
    var checker_interval = setInterval(async function () {
        if (!acme2.schaduleEnabled) return;
        var time = +acme2.updateTime();
        var lock = await new Promise(ok => message.send('lock', key, ok));
        if (!lock) return;
        var key = Math.random();
        try {
            if (time > Date.now() + checkTime) {
                return;
            }
            var certlist = await getCertList();
            var domain = certlist.map(a => a.hostname).filter(a => !!a);
            await acme2.autoUpdate(async function () {
                var pair = await acme2.pickUnique();
                await userdata.setUniqueKeyPair(pair);
            }, domain, setAuth, async function (o, data) {
                for (var a of o.identifiers) {
                    await userdata.patchOptionObj(a.value, data);
                }
            });
        }
        finally {
            message.send("unlock", key);
        };
    }, checkTime)
}
else if (acme2.schaduleEnabled) {
    console.error(i18n`当前环境无法启用证书更新服务，nodeJs版本为${process.version}`)
}
