"use strict";
var message = require("../message");
var clients = require("./clients");
var similar = require("./similar");
var JSAM = require("../basic/JSAM");
var fs = require("fs");
var path = require("path");
var memery = require("../efront/memery");
var recover = require("./recover");

var quitting = [];
/**
 * @type {[:Worker]}
 */
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
recover.start();
var afterend = function () {
    recover.destroy();
    watch.close();
    process.removeAllListeners();
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
};
var createWaiter = function () {
    var M = 1024 * 1024;
    var mem = require("os").freemem() / M - 256 | 0;
    if (mem < 1024) mem = 1024;
    /**
     * @type {message.Worker}
     */
    var worker = message.fork(mem);
    worker.on("exit", workerExit);
    worker.sockets_count = 0;
    return worker;
};
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
var isDevelop = function develop() { return develop.name === 'develop' }();
var watch = require("./watch");
if (isDevelop) [
    "",
    "../efront",
    "../compile",
    "../message",
].map(a => path.join(__dirname, a)).filter(fs.existsSync).forEach(k => watch(k, run)), watch.start();
message.quit = end;
message.broadcast = broadcast;
message.deliver = function (a) {
    var [cid, uid, msgid] = a;
    var client = clients.attach(cid);
    if (!client) return;
    var msgs = client.getMessages(uid);
    if (msgs && msgs.length) {
        client.deliver(uid, msgid);
        return;
    }
    var count = 0;
    var rest = waiters.length;
    client.refresh();
    waiters.forEach(function (worker) {
        message.send(worker, 'deliver', [cid, uid, msgid], function (a) {
            count += +a || 0;
            rest--;
            if (!rest && !count) {
                client.deliver(uid, msgid);
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
message.receive = function ([cid, uid]) {
    var client = clients.get(cid);
    if (client) {
        var msgs = client.getMessages(uid);
        return msgs;
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
var find = async function (key, params) {
    for (var c of waiters) {
        if (await message.invoke(c, key, params)) return c;
    }
};
message.fend = async function ([k1, params1, k2, params2], socket) {
    var c = await find(k1, params1);
    if (!c) return socket.write("HTTP/1.1 404 Not Found\r\nConnection: close\r\n\r\n");
    message.send(c, k2, params2, socket);
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