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
                console.error("counter" + counter);
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

    //子线程们
    process.on("message", function (msg, then) {
        switch (msg) {
            case "quit":
                server.close();
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
    var requestListener = function (req, res) {
        var req_access_origin = req.headers.origin;
        var req_access_headers = req.headers["access-control-request-headers"];
        var req_access_method = req.headers["access-control-request-method"];
        req_access_origin && res.setHeader("Access-Control-Allow-Origin", req_access_origin);
        req_access_origin && res.setHeader("Access-Control-Allow-Credentials", true);
        req_access_headers && res.setHeader("Access-Control-Allow-Headers", req_access_headers);
        req_access_method && res.setHeader("Access-Control-Allow-Methods", req_access_method);
        if (/^option/i.test(req.method)) {
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
    var server = http.createServer(requestListener);
    server.once("error", function () {
        server.removeAllListeners();
        console.error("服务器启动失败!");
        server.close(function () {
            process.exit();
        });
    });
    server.on("listening", function () {
        var address = server.address();
        process.title = `服务器地址：${require("../process/getLocalIP")()} 端口：${address.port}`;
        // console.info("server start success!");
    });
    server.setTimeout(0);
    server.listen(+process.env.HTTP_PORT || 80);
    var SSL_PFX_PATH = process.env["PATH.SSL_PFX"], SSL_ENABLED = false;
    if (SSL_PFX_PATH) {
        var fs = require("fs");
        if (fs.existsSync(SSL_PFX_PATH)) {
            http2.createSecureServer({
                pfx: fs.readFileSync(SSL_PFX_PATH),
                allowHTTP1: true,
                passphrase: process.env["PASSWORD.SSL_PFX"]
            }, requestListener).on("listening", function () {
                SSL_ENABLED = +process.env.IN_TEST_MODE === 1;
            }).on("error", function () {
                SSL_ENABLED = false;
            }).listen(+process.env.HTTPS_PORT || 443).setTimeout(0);
        }
    }
    process.on('exit', function (event) {
        if (event instanceof Error) console.error(event);
    })
    message.count("boot");
}