"use strict";
var cluster = require("cluster");
var isDevelop = require("../efront/isDevelop");
var isDebug = require("../efront/isDebug")
var message = require("../message");
var clients = require("./clients");
var fs = require("fs");
var path = require("path");
var memery = require("../efront/memery");

var working = 0;

var quitting = [], notkilled = [];
var workers = [];
var cpus = new Array(memery.CPUS).fill(0);
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
    if (process.stdin.unref) process.stdin.unref();
    if (process.stderr.unref) process.stderr.unref();
    if (process.stdout.unref) process.stdout.unref();
};
var exit = function () {
    quitting.splice(0).forEach(function (worker) {
        worker.disconnect();
    });
};
var broadcast = function (data) {
    quitting.concat(workers).forEach(function (worker) {
        message.send(worker, 'onbroadcast', data);
    });
};
var workerLisening = function () {
    working++;
    if (working === cpus.length) {
        run.ing = false;
        exit();
    }
};
var workerExit = function (code) {
    if (code !== 0 && this.exitedAfterDisconnect !== true) {
        var index = workers.indexOf(this);
        if (index >= 0) {
            workers[index] = createWorker();
        }
        return;
    }
    for (var cx = workers.length - 1; cx >= 0; cx--) {
        if (workers[cx] === this) workers.splice(cx, 1);
    }
    if (!workers.length) {
        afterend();
    }
}
var createWorker = function () {
    var mem = require("os").freemem() / 1024 - 256 | 0;
    if (mem < 1024) mem = 1024;
    var worker = cluster.fork({
        "NODE_OPTIONS": "--max-old-space-size=" + mem,
    });
    worker.on("listening", workerLisening);
    worker.on("exit", workerExit);
    worker.on("message", message);
    return worker;

}
var run = function () {
    if (quitting.length) return;
    if (run.ing) {
        run.ing = 2;
        return;
    }
    run.ing = true;
    quitting = quitting.concat(workers);
    if (quitting.length) console.info(`${quitting.length}个子进程准备退出:${quitting.map(a => a.id)}`);
    var _workers = cpus.map(createWorker);
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
        message.send(worker, 'deliver', [clientid, msgid], function (a) {
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
        message.send(worker, 'addmark', m);
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
message.cluster = function ([id, methord, params]) {
    for (var w of workers) {
        if (w.id === id) return new Promise(function (ok, oh) {
            message.send(w, methord, params, function (error, res) {
                if (error) return oh(error);
                ok(res);
            });
        })
    }
    throw "进程已退出";
};
message.clusterList = function (id) {
    return workers.map(w => w.id);
};
message.uptime = function () {
    return process.uptime();
};
message.rehost = function () {
    var argv = process.__proto__ && process.__proto__.argv || process.argv;
    end();
    var child = require("child_process").spawn(argv[0], argv.slice(1), {
        detached: true,
        stdio: 'ignore'
    });
    child.unref();
};
require("../efront/quitme")(end);
run();