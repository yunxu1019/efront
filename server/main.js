"use strict";
/* 
 * 不枝雀
 * 2017-4-5 22:38:04
 */
var cluster = require("cluster");
var message = require("../process/message");
if (cluster.isMaster && process.env.IN_DEBUG_MODE != "1") {
    var watch = require("../process/watch");
    var counter = 0;
    var quitting = [];
    var workers = [];
    var cpus = require('os').cpus().map(a => 0);
    if (process.env.IN_TEST_MODE) {
        cpus = [0];
    }
    var end = function () {
        quitting = quitting.concat(workers);
        workers = [];
        exit();
    };
    var exit = function () {
        quitting.splice(0).forEach(function (worker) {
            worker.send("quit");
            var timeout = setTimeout(function () {
                worker.kill();
            }, 12000);
            worker.on("disconnect", function () {
                clearTimeout(timeout);
            });
        });
    };
    var broadcast = function (value) {
        var index = value.indexOf(":");
        var key = value.slice(0, index);
        var data = value.slice(index + 1);
        quitting.concat(workers).forEach(function (worker) {
            worker.send([key, data].join(":"));
        });
    };
    var run = function () {
        quitting = quitting.concat(workers);
        var workking = 0;
        workers = cpus.map(function () {
            counter++;
            var worker = cluster.fork();
            worker.on("listening", function () {
                console.info(`process ${worker.id} start at ${Date()}`);
                workking++;
                if (workking === cpus.length) {
                    exit();
                }
            });
            worker.on("exit", function () {
                if (worker.exitedAfterDisconnect !== true) {
                    for (var cx = workers.length - 1; cx >= 0; cx--) {
                        workers[cx] === worker && workers.splice(cx, 1);
                    }
                }
                counter--;
                console.info(`process ${worker.id} ended at ${Date()}`);
                if (!counter && !workers.length) {
                    // console.info("按 ctrl + c 退出!");
                    process.exit();
                }
            });
            worker.on("message", message);
            return worker;
        });
    };
    watch("./", run);
    message.quit = end;
    message.broadcast = broadcast;
    process.on("SIGINT", end);
    process.on("SIGTERM", end);
    run();
    process.on("uncaughtException", function () {
        console.error.apply(console, arguments);
    });
    process.on("unhandledRejection", function () {
        console.error.apply(console, arguments);
    });
} else {
    process.on("SIGINT", function () { });
    process.on("SIGTERM", function () { });
    process.on("uncaughtException", process.exit);
    process.on("unhandledRejection", process.exit);
    var { HTTPS_PORT, HTTP_PORT } = process.env;
    HTTP_PORT = +HTTP_PORT || 80;
    HTTPS_PORT = +HTTPS_PORT || 0;

    //子线程们
    process.on("message", function (msg, then) {
        switch (msg) {
            case "quit":
                server1.close();
                then instanceof Function && then();
                process.exit();
                break;
        }
    });
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
            if (req.url === '/:' + version) res.setHeader("Powered-By", version);
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
            return doPost(req, res);
        }
    };
    // create server
    var server1 = http.createServer(requestListener);
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
        var address = require("../process/getLocalIP")();
        var port = [server1, server2].map(a => a && a.address());
        port = port.map(a => a && a.port);
        var msg = [`服务器地址：${address}`, port[0] ? `http      ：\t${port[0]}` : '', port[1] ? `https     ：\t${port[1]}` : ''].map(a => a.toUpperCase());
        process.title = msg.map(a => a.trim()).join('，').replace(/\s/g, '');
        if (!ipLoged) ipLoged = true, console.info(msg[0] + "\r\n");
        if (~port.indexOf(null)) {
            return;
        }
        msg[1] && checkServerState(http, HTTP_PORT).then(function () {
            console.info(msg[1] + "\t<green>正常访问</green>\r\n");
        }).catch(function (error) {
            showServerError.call(server1, msg[1] + "\t" + error);
        });
        msg[2] && checkServerState(require("https"), HTTPS_PORT).then(function () {
            console.info(msg[2] + "\t<green>正常访问</green>\r\n");
        }).catch(function (error) {
            showServerError.call(server2, msg[2] + "\t" + error);
        });
    };
    var showServerError = function (error) {
        var s = this;
        s.removeAllListeners();
        console.error(error || `${s === server2 ? "https" : "http"}服务器启动失败!`);
        s.close(function () {
            if (s === server1) server1 = null;
            if (s === server2) server2 = null;
            if (!server2 && !server1) process.exit();
        });
    };
    server1.once("error", showServerError);
    server1.once("listening", showServerInfo);
    server1.setTimeout(0);
    server1.listen(+HTTP_PORT || 80);
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
        console.warn("HTTPS端口正在使用默认证书，请不要在生产环境使用此功能！");
        httpsOptions.key = fs.readFileSync(path.join(__dirname, '../data/keystore/cross-key.pem'));
        httpsOptions.cert = fs.readFileSync(path.join(__dirname, '../data/keystore/cross-cert.pem'));
        SSL_ENABLED = true;
    }
    if (SSL_ENABLED) {
        HTTPS_PORT = +HTTPS_PORT || 443;
        var server2 = http2.createSecureServer(httpsOptions, requestListener);
        server2.once("listening", showServerInfo).once("error", showServerError).listen(HTTPS_PORT).setTimeout(0);
    }
    process.on('exit', function (event) {
        if (event instanceof Error) console.error(event);
    })
    message.count("boot");
}