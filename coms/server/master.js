"use strict";
var cluster = require("cluster");
var message = require("../message");
var clients = require("./clients");
var similar = require("./similar");
var JSAM = require("../basic/JSAM");
var fs = require("fs");
var path = require("path");
var memery = require("../efront/memery");

var quitting = [];
var waiters = [];
var end = function () {
    quitting = quitting.concat(waiters);
    if (!quitting.length) {
        console.info("正在退出..");
        afterend();
    }
    waiters.splice(0, waiters.length);
    exit();
};
var afterend = function () {
    process.removeAllListeners();
    watch.close();
    clients.destroy();
    similar.destroy();
    if (process.stdin.unref) process.stdin.unref();
    if (process.stderr.unref) process.stderr.unref();
    if (process.stdout.unref) process.stdout.unref();
};
var kill = function (worker) {
    message.send(worker, 'disconnect');
    worker.disconnect();
};
var exit = function () {
    quitting.splice(0).forEach(kill);
};
var broadcast = function (data) {
    quitting.concat(waiters).forEach(function (worker) {
        message.send(worker, 'onbroadcast', data);
    });
};
var workerExit = function (code) {
    if (code !== 0 && this.exitedAfterDisconnect !== true) {
        var index = waiters.indexOf(this);
        if (index >= 0) {
            waiters[index] = createWaiter();
        }
        return;
    }
    removeFromList(waiters, this);
    if (!waiters.length) {
        afterend();
    }
}
var createWaiter = function () {
    var M = 1024 * 1024;
    var mem = require("os").freemem() / M - 256 | 0;
    if (mem < 1024) mem = 1024;
    /**
     * @type {cluster.Worker}
     */
    var worker = cluster.fork({
        "NODE_OPTIONS": "--max-old-space-size=" + mem * M,
    });
    worker.on("exit", workerExit);
    worker.on("message", message);
    return worker;
}
var run = async function () {
    if (quitting.length) return;
    if (run.ing) {
        run.ing = 2;
        return;
    }
    run.ing = true;
    quitting = quitting.concat(waiters);
    var count = memery.WAITER_NUMBER;
    while (count-- > 0) {
        var waiter = createWaiter();
        await new Promise(ok => waiter.once("listening", ok));
        waiters.push(waiter);
    }
    if (quitting.length) console.info(`${quitting.length}个子进程准备退出:${quitting.map(a => a.id)}`);
    exit();
    run.ing = false;
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
    var rest = waiters.length;
    client.refresh();
    waiters.forEach(function (worker) {
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
    waiters.forEach(function (worker) {
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
    for (var w of waiters) {
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
    return waiters.map(w => w.id);
};
message.uptime = function () {
    return process.uptime();
};
message.rehost = function () {
    console.info("服务器重启");
    var argv = process.__proto__ && process.__proto__.argv || process.argv;
    end();
    var child = require("child_process").spawn(argv[0], argv.slice(1), {
        detached: true,
        stdio: 'ignore'
    });
    child.unref();
};

var similar = require("./similar");
message.logsimilar = function (a) {
    a = JSON.parse(a);
    similar.log(a);
};
message.allsimilar = function () {
    return JSAM.stringify(similar.all());
};

require("../efront/quitme")(end);
run();