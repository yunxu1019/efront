"use strict";
var message = require("../message");
var clients = require("./clients");
var fs = require("fs");
var path = require("path");
var getPathIn = require("../build/getPathIn");
var memery = require("../efront/memery");
var recover = require("./recover");
var ipc = require('./ipc');
var rpc = function (type, data) {
    otherported.forEach(port => {
        var ishttps = port & 1;
        port = port >> 1;
        var http = require(ishttps ? "https" : "http");
        var path = "/:" + type;
        if (data) path += '-' + encode62.timeencode(String(data));
        var req = http.request({
            method: "OPTIONS",
            path,
            hostname: '127.0.0.1',
            port,
        });
        req.on('error', function () {
            var i = otherported.indexOf(port);
            otherported.splice(i, 1);
        });
        req.end();
    });
};
var ipcstart = function () {
    ipc.listen(function (event, data) {
        switch (event) {
            case "unload":
                rpc('unload', data);
                if (!getPathIn(memery.webroot, data)) break;
                message.unload(data);
                break;
            case "ported":
                data = +data;
                if (otherported.indexOf(data) < 0) otherported.push(data);
                break;
        }
    });
};
ipcstart();
message.ipcstart = ipcstart;
var otherported = [], thisported = [];
message.ipcend = function (data) {
    if (!data) return;
    data.split(',').map(port => {
        port = +port;
        if (thisported.indexOf(port) >= 0) return;
        if (otherported.indexOf(port) < 0) otherported.push(port);
    });
    ipcstart();
};
message.ported = function (port) {
    if (thisported.indexOf(port) < 0) thisported.push(port);
    var i = otherported.indexOf(port);
    if (i >= 0) otherported.splice(i, 1);
    if (ipc.ported()) return;
    ipc.dispach("ported", port);
}
message.unload = function (madepath) {
    if (!madepath || !getPathIn([memery.webroot], madepath)) return;
    console.time();
    console.info(i18n`静态页面刷新\r\n`);
    waiters.forEach(w => message.send(w, 'unload'));
};
var quitting = [];
/**
 * @type {[:Worker]}
 */
var waiters = [], workers = [];
var end = function () {
    quitting = quitting.concat(waiters, workers);
    if (!quitting.length) {
        console.info(i18n`正在退出..`);
        afterend();
    }
    waiters.splice(0, waiters.length);
    exit();
};
recover.start();
var afterend = function () {
    recover.destroy();
    ipc.remove();
    rpc('ipcend', otherported);
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
        workers.forEach(kill);
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
    quitting = quitting.concat(waiters, workers);
    waiters = [];
    workers = [];
    bindWorker(["dbList", 'dbLoad', 'dbFind', 'dbSave', 'dbPatch', 'dbDrop', 'dbAlloc']);
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
message.deliver = async function (a) {
    var [cid, msg] = a;
    clients.deliver(cid, msg);
};
clients.deliver = async function (cid, msg) {
    var client = clients.attach(cid);
    if (!client) return;
    client.hub = true;
    client.refresh();
    client.deliver(msg);
    var count = 0;
    for (var w of waiters) {
        var a = await message.invoke(w, 'deliver', cid);
        count += +a || 0;
    }
    if (!count) client.keep();
}
message.invokeAll = async function ([a, params]) {
    if (!process.resourceUsage) return;
    var res = [process.resourceUsage().maxRSS];
    for (var w of waiters) {
        var r = await message.invoke(w, a, params);
        res.push(r);
    }
    return res;
};
var bindWorker = function (methods) {
    var w = null;
    methods.forEach(m => {
        message[m] = function (params) {
            if (!w) {
                w = message.forkThread();
                workers = [w];
                bindThread(w, methods);
            }
            return message.invoke(w, m, params);
        };
    });
};
var bindThread = function (w, methods) {
    methods.forEach(m => {
        message[m] = function (params) {
            return message.invoke(w, m, params)
        };
    })
};
var channel = require('./channel');
message["set-waiter"] = function (channelId) {
    var c = channel.getChannel(channelId);
    if (!c) return false;
    c.waiter = this;
    c.flush(channelId);
    return true;
};
message["set-sender"] = function (channelId) {
    var c = channel.getChannel(channelId);
    if (!c) return false;
    c.sender = this;
    c.flush(channelId);
    return true;
};
message["channel-create"] = function (size) {
    var cname = channel.createChannel(size);
    return cname;
};
message["channel-delete"] = function (cname) {
    channel.removeChannel(cname);
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
message.cluster = function ([id, methord, params]) {
    for (var w of waiters) {
        if (w.id === id) return new Promise(function (ok, oh) {
            message.send(w, methord, params, function (error, res) {
                if (error) return oh(error);
                ok(res);
            });
        })
    }
    throw i18n`进程已退出`;
};
message.clusterList = function (id) {
    return waiters.map(w => w.id);
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

var locked = false;
message.lock = function (key) {
    if (locked) return false;
    locked = key;
    return true;
};
message.unlock = function (key) {
    if (locked !== key) return false;
    locked = false;
    return true;
};

require("../efront/quitme")(end);
run();