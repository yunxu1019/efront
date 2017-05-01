/* 
 * 不枝雀
 * 2017-4-5 22:38:04
 */
var cluster = require("cluster");
var message = require("./message");
if (cluster.isMaster) {
    var watch = require("../process/watch");
    var counter = 0;
    var killing;
    var quitting = [];
    var workers = [];
    var cpus = require('os').cpus();
    var count = require("../process/count");
    var counts = count() || {};
    var end = function () {
        quitting = quitting.concat(workers);
        workers = [];
        killing = true;
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
                if (!counter && killing) {
                    count(counts);
                    console.info("按 ctrl + c 退出!");
                    setTimeout(function () {
                        process.exit();
                    });
                }
            });
            worker.on("message", message);
            return worker;
        });
    };
    watch("./", run);
    message.quit = end;
    process.on("SIGINT", end);
    process.on("SIGTERM", end);
    run();
} else {

//子线程们
    process.on("message", function (msg, then) {
        if (!(then instanceof Function)) {
            then = function () {};
        }
        switch (msg) {
            case "quit":
                server.close();
                process.exit();
                break;
        }
    });
// 仅做开发使用的简易服务器
    var http = require("http");
// build mime
    var doGet = require("./doGet");
    var doPost = require("./doPost");
// create server
    var server = http.createServer(function (req, res) {
        if (req.method === "GET") {
            return doGet(req, res);
        } else {
            return doPost(req, res);
        }
    });
    server.on("error", function () {
        // console.info("server is already running!");
    });
    server.on("listening", function () {
        // console.info("server start success!");
    });
    server.listen(80);
    process.send("count.count");
}
