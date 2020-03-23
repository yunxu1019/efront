var readline = require("readline");
var cluster = require("cluster");
var message = require("../process/message");
var fs = require("fs");
var path = require("path");
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
var end = function () {
    quitting = quitting.concat(workers);
    if (!quitting.length) {
        console.info("正在退出..");
        afterend();
    }
    workers = [];
    exit();
};
rl.addListener("SIGINT", end);
var afterend = function () {
    process.removeAllListeners();
    watch.close();
    rl.removeAllListeners();
    rl.pause();
};
var exit = function () {
    quitting.splice(0).forEach(function (worker) {
        var timeout = setTimeout(function () {
            worker.kill();
        }, process.env.IN_TEST_MODE ? 100 : 24 * 60 * 60 * 1000);
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
    if (quitting.length) return;
    if (run.ing) {
        run.ing = 2;
        return;
    }
    run.ing = true;
    quitting = quitting.concat(workers);
    if (quitting.length) console.info(`${quitting.length}个子进程准备退出:${quitting.map(a => a.id)}`);
    var workking = 0;
    workers = cpus.map(function () {
        counter++;
        var worker = cluster.fork();
        worker.on("listening", function () {
            workking++;
            if (workking === cpus.length) {
                console.info(`${workers.length}个子进程已启动:${workers.map(a => a.id)}`);
                run.ing = false;
                exit();
            }
        });
        worker.on("exit", function () {
            if (worker.exitedAfterDisconnect !== true) {
                for (var cx = workers.length - 1; cx >= 0; cx--) {
                    if (workers[cx] === worker) workers.splice(cx, 1);
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
var watch = {
    close: function (watchs) {
        watchs.forEach(a => a.close());
    }.bind(null, [
        fs.watch(__dirname, { recursive: true }, run),
        fs.watch(path.join(__dirname, "../process"), { recursive: true }, run)
    ])
};
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
