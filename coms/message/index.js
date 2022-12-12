"use strict";
//为了防止因message而形成环形引用，message文件夹中的内容不允许被外界调用
var cluster = require("cluster");
// message 文件夹中定义主进程的方法
// 子进程可通过message的属性访问主进程中的方法
var onmessage = async function ([key, params, stamp], handle) {
    var run = onmessage[key];
    if (!run) throw `未定义方法 ${key}`;
    if (!stamp) try {
        return run.call(onmessage, params, handle);
    } catch (e) {
        console.error(e);
        return;
    }
    var sended = false;
    var then = (status, result, error) => {
        if (sended) return;
        sended = true;
        __send(this, "onresponse", {
            params: result,
            error,
            status,
            stamp
        });
    };
    try {
        var res = await run.call(onmessage, params, handle);
        then(200, res);
    }
    catch (e) {
        then(403, null, e);
    }
};
var callbacks_map = Object.create(null);
var createStamp = function () {
    var stamp;
    do {
        stamp = Math.random().toString("36").slice(2);
    } while (stamp in callbacks_map);
    return stamp;
};
// 发送消息到指定进程
var __send = function (worker, key, params, onsuccess, onerror, onfinish) {
    if (!(worker.process || worker).connected) return;
    if (arguments.length === 4) {
        onfinish = onsuccess;
        onsuccess = null;
    }
    if (onsuccess instanceof Function || onerror instanceof Function || onfinish instanceof Function) {
        var stamp = createStamp();
        callbacks_map[stamp] = [onsuccess, onerror, onfinish];
        worker.send([key, params, stamp]);
    }
    else {
        worker.send([key, params], onsuccess);
    }
};
var __invoke = function (worker, key, params, handle) {
    return new Promise(function (ok, oh) {
        var stamp = createStamp();
        callbacks_map[stamp] = [ok, oh];
        worker.send([key, params, stamp], handle);
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
Object.defineProperty(onmessage, 'isPrimary', { value: !cluster.isWorker, enumerable: false });
if (onmessage.isPrimary) {
    onmessage["abpi"] = require("./abpi");
    onmessage["count"] = require("./count");
    onmessage["log"] = require("./log");
    onmessage.fork = cluster.fork;
    onmessage.Wroker = cluster.Worker;
    onmessage.send = __send;
    onmessage.invoke = __invoke;
} else {
    onmessage["abpi"] = __send.bind(onmessage, process, "abpi");
    onmessage["count"] = __send.bind(onmessage, process, "count");
    onmessage["log"] = __send.bind(onmessage, process, "log");
    onmessage.send = __send.bind(onmessage, process);
    onmessage.invoke = __invoke.bind(onmessage, process);
    var broadcastid = 0, broadcastmap = Object.create(null);
    onmessage.broadcast = function (key, data) {
        broadcastid = ++broadcastid & 0x7fff;
        var id = (process.pid * 0x10000) + broadcastid;
        return new Promise(function (ok) {
            broadcastmap[id] = ok;
            __send(process, 'broadcast', { key, id, data });
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
module.exports = onmessage;