"use strict";
var cluster = require("cluster");
if (cluster.message) return module.exports = cluster.message;
//为了防止因message而形成环形引用，message文件夹中的内容不允许被外界调用
var worker_threads = require("worker_threads");
var net = require("net");
// message 文件夹中定义主进程的方法
// 子进程可通过message的属性访问主进程中的方法
var onmessage = async function ([key, params, stamp], handle) {
    var run = onmessage[key];
    if (!run) throw i18n`未定义方法 ${key}`;
    if (!stamp) try {
        return await run.call(this, params, handle);
    } catch (e) {
        console.error(e);
        return;
    }
    var sended = false;
    var then = (status, result, error) => {
        if (sended) return;
        sended = true;
        var transferList;
        if (result instanceof Buffer || result instanceof Uint8Array) {
            if (this.isWorker || !worker_threads.isMainThread) transferList = [result.buffer];
        }
        else if (result instanceof net.Socket) {
            transferList = result;
            result = result.id;
        }
        __send(this, "onresponse", {
            params: result,
            error,
            status,
            stamp
        }, transferList);
    };
    try {
        var res = await run.call(this, params, handle);
        then(200, res);
    }
    catch (e) {
        then(403, null, e.message);
    }
};
var callbacks_map = Object.create(null);
var createStamp = function () {
    var stamp;
    do {
        stamp = Math.random().toString("36").slice(2, 6);
    } while (stamp in callbacks_map);
    return stamp;
};
// 发送消息到指定进程
/**
 * @param {worker_threads.Worker} worker
 */
var __send = function (worker, key, params, onsuccess, onerror, onfinish) {
    if (arguments.length === 4) {
        onfinish = onsuccess;
        onsuccess = null;
    }
    if (onsuccess instanceof Function || onerror instanceof Function || onfinish instanceof Function) {
        var stamp = createStamp();
        callbacks_map[stamp] = [onsuccess, onerror, onfinish];
        worker.postMessage([key, params, stamp]);
    }
    else {
        worker.postMessage([key, params], onfinish);
    }
};
var __invoke = function (worker, key, params, transferList) {
    return new Promise(function (ok, oh) {
        var stamp = createStamp();
        callbacks_map[stamp] = [ok, oh];
        worker.postMessage([key, params, stamp], transferList);
    });
};
//收到其他进程的回复
var onresponse = function ({ stamp, params, error }) {
    var callback = callbacks_map[stamp];
    delete callbacks_map[stamp];
    if (callback instanceof Array) {
        var [onsuccess, onerror, onfinish] = callback;
        if (onfinish instanceof Function) {
            onfinish(error, params);
        }
        if (!error) {
            if (onsuccess instanceof Function) onsuccess(params);
        } else {
            if (onerror instanceof Function) onerror(error);
            else console.error(error);
        }
    }
};
onmessage.onresponse = onresponse;
Object.defineProperty(onmessage, 'isPrimary', { value: !cluster.isWorker && worker_threads.isMainThread, enumerable: false });
var processPostMessage = function (msg, h) {
    if ((this.process || this).connected) this.send(msg, h);
};
if (global.Deno) {
    onmessage.listen = function () { };
    onmessage.close = function () { };
    onmessage["abpi"] = require("./abpi");
    onmessage["count"] = require("./count");
    onmessage["log"] = require("./log");
    onmessage.send = async function (key, params, onsuccess, onerror, onfinish) {
        if (arguments.length === 3) {
            onfinish = onsuccess;
            onsuccess = null;
        }
        try {
            var a = await onmessage[key](params);
            if (onsuccess) onsuccess(a);
        } catch (e) {
            if (onerror) onerror(e);
        }
        finally {
            if (onfinish) onfinish();
        }
    };
    onmessage.broadcast = function (key, data) {
        if (onmessage[key] instanceof Function) onmessage[key](data);
    };
}
else if (onmessage.isPrimary) {
    onmessage["abpi"] = require("./abpi");
    onmessage["count"] = require("./count");
    onmessage["log"] = require("./log");
    var settings = { serialization: 'advanced' };
    if (cluster.setupPrimary) cluster.setupPrimary(settings);
    else if (cluster.setupMaster) cluster.setupMaster(settings);
    onmessage.forkCluster = function (maxOldSpace, maxYoungSpace) {
        var opts = [];
        if (maxOldSpace) opts.push(`--max-old-space-size=${maxOldSpace}`);
        if (maxYoungSpace) opts.push(`--max-semi-space-size=${maxYoungSpace}`);
        var w = cluster.fork({
            "NODE_OPTIONS": opts.join(";")
        });
        w.postMessage = processPostMessage;
        w.on("message", onmessage);
        w.threadId = w.id;
        w.isCluster = true;
        return w;
    };
    onmessage.forkThread = function (maxOldSpace, maxYoungSpace) {
        var argv = (process.__proto__?.argv ? process.__proto__ : process).argv;
        var exec = argv[1];
        var worker = new worker_threads.Worker(`${exec.replace(/\\/g, '/')}`, {
            argv: argv.slice(2),
            workerData: [process.stdout.columns],
            maxOldGenerationSizeMb: maxOldSpace,
            maxYoungGenerationSizeMb: maxYoungSpace,
        });
        worker.disconnect = worker.unref;
        worker.on("message", onmessage);
        worker.id = worker.threadId;
        worker.isWorker = true;
        return worker;
    };
    onmessage.fork = onmessage.forkCluster;
    onmessage.Worker = worker_threads.Worker;
    onmessage.send = __send;
    onmessage.invoke = __invoke;
}
else {
    var parentPort = worker_threads.parentPort || (process.__proto__ && process.__proto__.argv ? process.__proto__ : process);
    if (parentPort !== worker_threads.parentPort) parentPort.postMessage = processPostMessage, parentPort.close = process.off.bind(process, 'message', onmessage);
    else[process.stdout.columns] = worker_threads.workerData;
    onmessage["abpi"] = __send.bind(onmessage, parentPort, "abpi");
    onmessage["count"] = __send.bind(onmessage, parentPort, "count");
    onmessage["log"] = __send.bind(onmessage, parentPort, "log");
    onmessage.send = __send.bind(onmessage, parentPort);
    onmessage.invoke = __invoke.bind(onmessage, parentPort);
    var broadcastid = 0, broadcastmap = Object.create(null);
    onmessage.listen = function () {
        parentPort.on("message", onmessage);
    };
    onmessage.close = function () {
        parentPort.close();
    };
    onmessage.broadcast = function (key, data) {
        broadcastid = ++broadcastid & 0x7fff;
        var id = (process.pid * 0x10000) + broadcastid;
        return new Promise(function (ok) {
            broadcastmap[id] = ok;
            __send(parentPort, 'broadcast', { key, id, data });
        });
    };
    onmessage.onbroadcast = function ({ key, id, data }) {
        if (onmessage[key] instanceof Function) onmessage[key](data);
        if (broadcastmap[id]) {
            broadcastmap[id](id);
            delete broadcastmap[id];
        }
    };
}
return cluster.message = module.exports = onmessage;