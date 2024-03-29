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
            message.broadcast("setauth", [type[2], type[3]]);
            setTimeout(function (auth) {
                message.broadcast("setauth", [auth, null]);
            }.bind(null, type[2]), 120000/*两分钟*/);
            break;
        case "unique":
            if (type[2]) {
                await userdata.setUniqueKeyPair(type.slice(2).join('+'));
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
            res.write(i18n[req.headers["accept-language"]]`清理完成`);
            break;
        case "rehost":
            res.on("finish", function () {
                this.socket.destroy();
            });
            res.on("finish", safeQuitProcess);
            safeQuitProcess = function () { };
            message.send('rehost', null, function () {
                res.end(i18n[req.headers["accept-language"]]`正在重启`);
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
                        var exists = await userdata.option(type[1], key, null/**检查是否存在*/);
                        if (!type[3]) return res.end(encode62.timeencode(String(exists)));
                        if (exists && type[3]) {
                            res.writeHead(403, utf8error);
                            res.end(i18n[req.headers["accept-language"]]`已存在相同标识的数据`);
                            return;
                        }
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
    this.setHeader(k, v);
};
var proxy = require("./url-proxy");
/**
 * @param {Http2ServerRequest}req
 * @param {Http2ServerResponse}res
 * @this {net.Server}
 */
var requestListener = async function (req, res) {
    if (req.socket.unref) req.socket.unref();
    try {
        var remoteAddress = require("./remoteAddress")(req);
    } catch {
    }
    if (!remoteAddress) {
        res.writeHead(403, utf8error);
        res.end("禁止访问");
        return;
    }
    var crypted = /^\/\!/.test(req.url);
    if (crypted) {
        crypted = await userdata.getRequestCode(req);
        if (req.url.length === 2) return res.end(encode62.timeencode(crypted));
        try {
            req.url = req.url.slice(0, 2) + encode62.safedecode(encode62.timedecode(req.url.slice(2)), crypted);
        } catch (e) {
            res.writeHead(403, utf8error);
            res.end(i18n[req.headers["accept-language"]]`禁止访问`);
            return;
        }
        delete req.headers["content-length"];
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
                    res.end(i18n[req.headers["accept-language"]]`数据异常！`);
                    req.destroy();
                    res.closed = true;
                    return;
                }
            }
        }));
        req1.headers = req.headers;
        req1.url = req.url;
        req1.method = req.method;
        req1.socket = req.socket;
        req = req1;
        if (/^\/\!\//.test(req.url)) req.url = req.url.slice(2);
    }

    req.protocol = this === server1 ? 'http:' : 'https:';
    var req_access_origin = getHeader(req.headers, "origin");
    var req_access_headers = getHeader(req.headers, "access-control-request-headers");
    var req_access_method = getHeader(req.headers, "access-control-request-method");
    if (memery.CORS) {
        req_access_origin && res.setHeader("Access-Control-Allow-Origin", req_access_origin);
        /^cross/i.test(getHeader(req.headers, "sec-fetch-site")) && res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
        /^https:/i.test(req_access_origin) && res.setHeader("Access-Control-Allow-Credentials", true);
        req_access_headers && res.setHeader("Access-Control-Allow-Headers", req_access_headers);
        req_access_method && res.setHeader("Access-Control-Allow-Methods", req_access_method);
    }
    if (/^option/i.test(req.method)) {
        if (req_access_method || req_access_headers) {
            return res.end();
        }
        if (/^\/\:/.test(req.url)) {
            var option = req.url.slice(2);
            if (option === version) res.setHeader("Powered-By", version);
            else if (!/^(?:\:\:1?|(?:\:\:ffff\:)?127\.0\.0\.1)$/i.test(remoteAddress)) {
            }
            else switch (option) {
                case "quit":
                case "exit":
                    let ports = portedServersList.filter(a => a && a.listening).map(a => a.address().port);
                    message.send('quit');
                    res.end(i18n[req.headers["accept-language"]]`已关闭${ports.join("、")}端口`);
                    return;
            }
            var type = /^(\w+)(?:[\-\/\!]([\/\!\'\(\)\*\-\.\w]*))?(?:[\?\:\+]([\s\S]*))?$/.exec(option);
            if (type) return doOptions(req, res, type);
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
    if (doCross.referer.test(getHeader(req.headers, 'referer'))) {
        return doCross(req, res, getHeader(req.headers, 'referer'));
    }
    if (/^\/\*{1,2}$/.test(req.url) && !getHeader(req.headers, "authorization") || /^\/\*{3,}$/.test(req.url)) {
        res.writeHead(401, {
            "WWW-Authenticate": "Basic",
        });
        res.end(`<script>location.href="/"</script>`);
        return;
    }
    else if (getHeader(req.headers, "authorization")) {
        var auth = Buffer.from(getHeader(req.headers, "authorization").replace(/^Basic\s+/i, ''), 'base64').toString();
        if (/^~~/.test(auth)) {
            auth = auth.replace(/\:$/, '');
            req.url = "/" + auth + req.url.replace(/^\/\*+/, '');
            return doCross(req, res);
        }
    }
    try {
        req.url = decodeURI(req.url);
    } catch {
        req.url = unescape(req.url);
    }
    if (/^\/@/i.test(req.url)) {
        return doFile(req, res);
    }
    if (memery.CHANNEL_ENABLED && /^\/\([\s\S]*\)/.test(req.url)) {
        return doChannel(req, res);
    };
    if (memery.islive && /\/\:(\w{3,4})\//.test(req.url)) {
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
    if (/^post/i.test(req.method) && !crypted) {
        return doPost.call(this, req, res);
    }
    req.url = url;
    if (/^~~?|^&/.test(url)) {
        return doCross(req, res);
    }
    if (getHeader(req.headers, "range")) {
        return doFile(req, res);
    }
    if (/^get/i.test(req.method) || crypted) {
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
var checkServerState = function (http, port0) {
    if (arguments.length === 1) var type = http;
    return new Promise(function (ok, oh) {
        var v = version;
        if (type) v += "?" + type;
        var { hostname: host, port, protocol } = parseURL(memery.REPORT);
        if (!host || !type || selfLogged) {
            host = '127.0.0.1';
            if (type) {
                [, protocol, port] = /^([a-z]+)(\d+)$/.exec(type[0]);
                http = require(protocol);
            }
            port = port0;
        }
        else {
            if (!protocol) {
                protocol = +port === 443 ? "https" : 'http';
            }
            if (!port) {
                port = protocol === 'https' ? 443 : 80;
            }
            http = require(protocol);
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
                oh(i18n`<red>端口异常</red>`);
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
var showServerInfo = async function () {
    if (--loading > 0) return;
    var address = require("../efront/getLocalIP")();
    var port = portedServersList.map(a => a && a.port);
    var msg = [
        i18n`服务器地址：${address}`];
    var maxLength = 0;
    for (var cx = 0, dx = port.length; cx < dx; cx++) {
        var p = port[cx];
        var ishttps = portedServersList[cx] === server2
        var m = p ? (ishttps ? `https ` : `http `).toUpperCase() + i18n`端口` + (ishttps ? ': ' : ":  ") + p : '';
        if (maxLength < m.length) maxLength = m.length;
        msg.push(m);
    }
    if (process.stdin.isTTY) process.title = msg.map(a => a.trim()).filter(a => !!a).join('，').replace(/\s/g, '');
    else process.title = 'efront';
    if (!ipLoged) ipLoged = true, console.info(msg[0] + "\r\n");
    msg = msg.map(a => a.length && a.length < maxLength ? a + " ".repeat(maxLength - a.length) : a);
    var showError = function (i, e = portedServersList[i].error) {
        var s = portedServersList[i];
        s.removeAllListeners();
        console.error(msg[i + 1] + "\t" + e);
        s.close(closeListener);
    };
    var showValid = function (i) {
        console.info(msg[i + 1] + `\t<green>${i18n`正常访问`}</green>\r\n`);
    }
    var types = [];
    for (var cx = 1, dx = msg.length; cx < dx; cx++) {
        var m = msg[cx];
        if (!m) continue;
        if (m.length < maxLength) m += ' '.repeat(maxLength - m.length);
        var i = cx - 1;
        var ishttps = portedServersList[i] === server2;
        if (portedServersList[i].error) {
            showError(i);
        }
        else try {
            await checkServerState(ishttps ? require("https") : http, ishttps ? HTTPS_PORT : HTTP_PORT);
            showValid(i);
            types.push(ishttps ? "https" + HTTPS_PORT : "http" + HTTP_PORT);
            types.sort();
        }
        catch (error) {
            showError(i, error);
        }
    }
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
function initServer(port) {
    var server = this.once("error", showServerError)
        .on('clientError', function (err, socket) {
            if (err.code === 'ECONNRESET' || !socket.writable) {
                return;
            }
            socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
        })
        .once("listening", showServerInfo)
        .listen(+port);
    portedServersList.push(server);
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
var server0, server1, server2;
/**
 * @type {http2.SecureServerOptions}
 */
var httpsOptions = {
    allowHTTP1: true,
};

var createHttpsServer = function () {
    if (httpsOptions.pfx || httpsOptions.cert && httpsOptions.key) {
        HTTPS_PORT = +HTTPS_PORT || 443;
        server2 = http2.createSecureServer(httpsOptions, requestListener);
        initServer.call(server2, HTTPS_PORT);
    }
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
var Deno = global.Deno;

if (Deno) {

    var Response = global.Response;
    var TransformStream = global.TransformStream;
    var ServerResponse = class ServerResponse {
        constructor(e) {
            Object.defineProperty(this, '_req', { value: e, configurable: false });
        }
        headers = {};
        writeHead(status, headers) {
            Object.assign(this.headers, headers);
            this.status = status;
        }
        get writer() {
            if (!this._writer) {
                var stream = new TransformStream;
                Object.defineProperty(this, "_writer", { value: stream.writable.getWriter(), configurable: false });
                this._req.respondWith(new Response(stream.readable, this));
            }
            return this._writer;
        }
        setHeader(k, v) {
            this.headers[k] = v;
        }
        write(a) {
            var b = Buffer.from(a);
            b = new Uint8Array(b.buffer, b.byteOffset, b.byteLength);
            this.writer.write(b);
        }
        end(a) {
            if (a) this.write(a);
            this.closed = true;
            this.writer.close();
        }
        on(type, handle) {
        }
    }
    var ServerRequest = class ServerRequest {
        constructor(e, a) {
            e = e.request;
            a.remoteAddress = a.remoteAddr.hostname;
            this.socket = a;
            this.method = e.method;
            var url = parseURL(e.url);
            this.url = url.path;
            this.headers = e.headers;
            this.body = e.body;

        }
        on() { }
        once() { }
        pipe(a) {
            console.log(this.body);
            if (this.body) return this.body.pipe(a);
            else a.end();
        }
    }
    var serve = function (e, a) {
        var res = new ServerResponse(e);
        var req = new ServerRequest(e, a);
        requestListener(req, res).catch(r => e.respondWith(new Response(String(r), { status: 500 })));
    };
    initServer = function (c) {
        c.port = c.addr.port;
        portedServersList.push(c);
        var conn = async function (a) {
            for await (var e of Deno.serveHttp(a)) serve(e, a);
        };
        var handler = async function (a) {
            for await (var a of c) conn(a);
        }
        c.removeAllListeners = function () {
        };
        var close = c.close;
        c.listening = true;
        c.timeout = 0;
        c.close = function (cb) {
            c.listening = false;
            Promise.resolve().then(function () {
                close.call(c);
                cb();
            });
        };
        handler();
        showServerInfo();
    }
    createHttpsServer = function () {
        var c = Deno.listenTls(Object.assign({ port: +HTTPS_PORT || 443 }, httpsOptions));
        initServer(c);
    }
    createHttpServer = function () {
        var c = Deno.listen({ port: HTTP_PORT });
        initServer(c);
    };
}
process.on('exit', function () {
    if (process.stdin.unref) process.stdin.unref();
    if (process.stderr.unref) process.stderr.unref();
    if (process.stdout.unref) process.stdout.unref();
});

message.count("boot");
if (HTTP_PORT) loading++, createHttpServer();
if (memery.PFX_PATH) {
    loading++;
    Object.assign(httpsOptions, cert);
    createHttpsServer();
}
else if (HTTPS_PORT) {
    loading++;
    console.warn(`<yellow>${i18n`HTTPS端口正在使用默认证书，请不要在生产环境使用此功能！`}</yellow>`);
    Object.assign(httpsOptions, cert);
    createHttpsServer();
}