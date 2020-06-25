"use strict";
//为了防止因message而形成环形引用，message文件夹中的内容不允许被外界调用

var cluster = require("cluster");
var fs = require("fs");
var path = require("path");
var isDebug = require("../basic/isDebug");
var message_handlers_path = "../../coms/message";
// message 文件夹中定义主进程的方法
// 子进程可通过message的属性访问主进程中的方法
message_handlers_path = path.join(__dirname, message_handlers_path);
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
            var { params, stamp } = JSON.parse(args);
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
var send, __send = send = function (worker, key, params, onsuccess, onerror) {
    var stamp;
    if (onsuccess instanceof Function || onerror instanceof Function) {
        do {
            stamp = Math.random().toString("36").slice(2);
        } while (stamp in callback_maps);
        callback_maps[stamp] = [onsuccess, onerror];
    }
    worker.send([key, JSON.stringify({
        params, stamp
    })].join(":"));
};
if (isDebug) {
    send = function () {
    };
}
//收到其他进程的回复
var onresponse = function ({ stamp, params, error }) {
    var callback = callback_maps[stamp];
    delete callback_maps[stamp];
    if (callback instanceof Array) {
        var [onsuccess, onerror] = callback;
        if (!error) {
            if (onsuccess instanceof Function) onsuccess(params);
        } else {
            if (onerror instanceof Function) onerror(error);
            else console.error(error);
        }
    }
};
onmessage.onresponse = onresponse;

if (cluster.isMaster && !isDebug) {
    fs.readdirSync(message_handlers_path).forEach(function (name) {
        var match = name.match(/^(.*)\.js$/i);
        if (match && !/^index.js$|\_test\.js$/i.test(name)) {
            var key = match[1];
            onmessage[key] = require(path.join(message_handlers_path, name));
        }
    });

    onmessage.send = send;
} else {
    fs.readdirSync(message_handlers_path).forEach(function (name) {
        var match = name.match(/^(.*).js$/);
        if (match) {
            var key = match[1];
            onmessage[key] = __send.bind(onmessage, process, key);
        }
    });
    process.on("message", onmessage);

    onmessage.send = send = send.bind(onmessage, process);
}
module.exports = onmessage;