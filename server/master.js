var cluster = require("cluster");
var message = require("../process/message");
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
    if (quitting.length) console.info(`${quitting.length}个进程退出：${quitting.map(a => a.id)}\r\n`);
    quitting.splice(0).forEach(function (worker) {
        worker.send("quit");
        var timeout = setTimeout(function () {
            worker.kill();
        }, 12000);
        worker.on("disconnect", function () {
            clearTimeout(timeout);
        });
    });

    if (!workers.length) {
        // console.info("按 ctrl + c 退出!");
        process.exit();
    }
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
            workking++;
            if (workking === cpus.length) {
                console.info(`${workers.length}个进程已启动：${workers.map(a => a.id)}\r\n`);
                exit();
            }
        });
        worker.on("exit", function () {
            if (worker.exitedAfterDisconnect !== true) {
                for (var cx = workers.length - 1; cx >= 0; cx--) {
                    workers[cx] === worker && workers.splice(cx, 1);
                }
            }
        });
        worker.on("message", message);
        return worker;
    });
};
watch(__dirname, run);
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
