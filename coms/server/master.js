"use strict";
var cluster = require("cluster");
var isDevelop = require("../efront/isDevelop");
var isDebug = require("../efront/isDebug")
var message = require("../message");
var clients = require("./clients");
var fs = require("fs");
var path = require("path");


var counter = 0;
var quitting = [], notkilled = [];
var workers = [];
var cpus = require('os').cpus().map(a => 0);
if (isDevelop || isDebug) {
    cpus = [0];
}
var end = function () {
    quitting = quitting.concat(workers);
    if (!quitting.length) {
        console.info("正在退出..");
        afterend();
    }
    workers.splice(0, workers.length);
    exit();
};
var afterend = function () {
    process.removeAllListeners();
    watch.close();
    notkilled.forEach(a => a.kill("SIGKILL"));
    clients.destroy();
    process.stdin.unref();
    process.stdout.unref();
    process.stderr.unref();
};
var exit = function () {
    if (!workers.length) var isQuit = true;
    quitting.splice(0).forEach(function (worker) {
        if (worker.working) message.send(worker, 'quit');
    });
};
var broadcast = function (data) {
    quitting.concat(workers).forEach(function (worker) {
        if (worker.working) message.send(worker, 'onbroadcast', data);
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
    var working = 0;
    var _workers = cpus.map(function () {
        counter++;
        var mem = require("os").freemem() / 1024 - 256 | 0;
        if (mem < 1024) mem = 1024;
        var worker = cluster.fork({
            "NODE_OPTIONS": "--max-old-space-size=" + mem,
        });
        worker.on("listening", function () {
            this.working = true;
            working++;
            if (working === cpus.length) {
                console.info(`${workers.length}个子进程已启动:${workers.map(a => a.id)}`);
                run.ing = false;
                exit();
            }
        });
        worker.on("exit", function () {
            if (worker.exitedAfterDisconnect !== true) {
                for (var cx = workers.length - 1; cx >= 0; cx--) {
                    if (workers[cx] === this) workers.splice(cx, 1);
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
    workers.push.apply(workers, _workers);
};
var isProduction = function develop() { return develop.name === 'develop' }();
var watch = {
    close: function (watchs) {
        watchs.forEach(a => a.close());
    }.bind(null, isProduction ? [
        "",
        "../efront",
        "../compile",
        "../message",
    ].map(a => path.join(__dirname, a)).filter(fs.existsSync).map(a => fs.watch(a, { recursive: /^(darwin|win32)$/i.test(process.platform) }, run)) : [])
};
message.quit = end;
message.broadcast = broadcast;
message.deliver = function (a) {
    var [clientid, msgid] = a;
    var client = clients.attach(clientid);
    if (!client) return;
    if (client.messages.length) {
        client.deliver(msgid);
        return;
    }
    var count = 0;
    var rest = workers.length;
    client.refresh();
    workers.forEach(function (worker) {
        if (worker.working) message.send(worker, 'deliver', [clientid, msgid], function (a) {
            count += +a || 0;
            rest--;
            if (!rest && !count) {
                client.deliver(msgid);
                client.keep();
            }
        }, null);
    });
};
message.getmark = function () {
    return clients.getMark();
};
message.addmark = function (m) {
    clients.addMark(m);
    workers.forEach(function (worker) {
        if (worker.working) message.send(worker, 'addmark', m);
    });
};
message.receive = function (clientid) {
    var client = clients.get(clientid);
    if (client) {
        var messages = client.messages.slice(0);
        client.clean();
        return messages;
    }
};
require("../efront/quitme")(end);
run();