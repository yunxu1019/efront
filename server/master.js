var readline = require("readline");
var cluster = require("cluster");
var message = require("../process/message");
var watch = require("../process/watch");
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
var counter = 0;
var quitting = [];
var workers = [];
var cpus = require('os').cpus().map(a => 0);
if (process.env.IN_TEST_MODE) {
    cpus = [0];
}
var end = function (event) {
    console.info("正在退出..");
    quitting = quitting.concat(workers);
    workers = [];
    exit();
};
rl.addListener("SIGINT", end);
var afterend = function () {
    rl.removeAllListeners();
    rl.close();
    process.removeAllListeners();
    watch.close();
};
var exit = function () {
    quitting.splice(0).forEach(function (worker) {
        var timeout = setTimeout(function () {
            worker.kill();
        }, 12000);
        worker.on("disconnect", function () {
            clearTimeout(timeout);
        });
        worker.send("quit");
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
    if (quitting.length) console.info(`${quitting.length}个子进程准备退出${quitting.map(a => a.id)}\r\n`);
    var workking = 0;
    workers = cpus.map(function () {
        counter++;
        var worker = cluster.fork();
        worker.on("listening", function () {
            workking++;
            if (workking === cpus.length) {
                console.info(`${workers.length}个子进程已启动${workers.map(a => a.id)}\r\n`);
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
            if (!counter && !workers.length) {
                afterend();
            }
        });
        worker.on("message", message);
        return worker;
    });
};
watch("./", run);
message.quit = end;
message.broadcast = broadcast;
process.on("SIGINT", _ => { });
process.on("SIGTERM", _ => { });
run();
process.on("uncaughtException", function () {
    console.error.apply(console, arguments);
});
process.on("unhandledRejection", function () {
    console.error.apply(console, arguments);
});
