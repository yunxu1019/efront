"use strict";
//为了防止因message而形成环形引用，message文件夹中的内容不允许被外界调用
var cluster = require("cluster");
var JSAM = require("../basic/JSAM");
// message 文件夹中定义主进程的方法
// 子进程可通过message的属性访问主进程中的方法
var onmessage = function (msg, __then) {
    var index = msg.indexOf(":");
    var run, args, key, stamp;
    if (index < 0) {
        key = msg;
        run = onmessage[key];
    } else {
        key = msg.slice(0, index);
        run = onmessage[key];
        args = msg.slice(index + 1);
    }
    if (run instanceof Function) {
        if (args) {
            var { params, stamp } = JSAM.parse(args);
            var sended = false;
            var error = null, status = 200;
            var then = stamp ? (result) => {
                if (__then) __then();
                if (sended) return;
                sended = true;
                __send(this, "onresponse", {
                    params: result,
                    error,
                    status,
                    stamp
                });
            } : null;
        } else {
            params = null;
        }
        if (then) {
            var crash = function (error) {
                error = String(error);
                status = 403,
                    then(null);
            };
            try {
                Promise.resolve(run.call(onmessage, params)).then(then, crash);
            } catch (e) {
                crash(e);
            }
        } else {
            try {
                Promise.resolve(run.call(onmessage, params)).catch(console.error);
            } catch (e) {
                console.error(e);
            }
        }
        if (__then && !then) __then();
    }
};
var callback_maps = {};
// 发送消息到指定进程
var send, __send = send = function (worker, key, params, onsuccess, onerror, onfinish) {
    var stamp;
    if (arguments.length === 4) {
        onfinish = onsuccess;
        onsuccess = null;
    }
    if (onsuccess instanceof Function || onerror instanceof Function || onfinish instanceof Function) {
        do {
            stamp = Math.random().toString("36").slice(2);
        } while (stamp in callback_maps);
        callback_maps[stamp] = [onsuccess, onerror, onfinish];
    }
    (worker.process || worker).connected && worker.send([key, JSAM.stringify({
        params, stamp
    })].join(":"));
};
// if (isDebug) {
//     __send = send = function () {
//     };
// }
//收到其他进程的回复
var onresponse = function ({ stamp, params, error }) {
    var callback = callback_maps[stamp];
    delete callback_maps[stamp];
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

if (cluster.isMaster) {
    onmessage["abpi"] = require("./abpi");
    onmessage["count"] = require("./count");
    onmessage["log"] = require("./log");
    onmessage.send = send;
} else {
    onmessage["abpi"] = __send.bind(onmessage, process, "abpi");
    onmessage["count"] = __send.bind(onmessage, process, "count");
    onmessage["log"] = __send.bind(onmessage, process, "log");
    process.on("message", onmessage);

    onmessage.send = send = send.bind(onmessage, process);
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