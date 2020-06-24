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
        var notSupport = () => console.info('Not Support', `message[${key}]:${this.id}`);
        if (args) {
            var { params, stamp } = JSON.parse(args);
            var then = stamp ? (result) => {
                if (__then) __then();
                __send(this, "onresponse", {
                    params: result,
                    stamp
                });
            } : null;
            run.call(onmessage, params, then, stamp);
        } else {
            run.call(onmessage, null, then || notSupport);
        }
        if (__then && !then) __then();
    }
};
var callback_maps = {};
// 发送对主进程方法的访问消息
var send, __send = send = function (worker, key, params, then) {
    var stamp;
    if (then instanceof Function) {
        do {
            stamp = Math.random().toString("36").slice(2);
        } while (stamp in callback_maps);
        callback_maps[stamp] = function () {
            delete callback_maps[stamp];
            then.apply(null, arguments);
        };
    }
    worker.send([key, JSON.stringify({
        params, stamp
    })].join(":"));
};
if (isDebug) {
    send = function () {
    };
}
//收到主进程的回复
var onresponse = function ({ stamp, params }) {
    var callback = callback_maps[stamp];
    delete callback_maps[stamp];
    if (callback instanceof Function) {
        callback(params);
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

    module.exports = onmessage;
    onmessage.send = send;
} else {
    fs.readdirSync(message_handlers_path).forEach(function (name) {
        var match = name.match(/^(.*).js$/);
        if (match) {
            var key = match[1];
            onmessage[key] = function (data, then) {
                send(key, data, then);
            };
        }
    });
    process.on("message", onmessage);

    module.exports = new Proxy(onmessage, {
        get: function (o, k) {
            if (!(k in o) && ("on" + k) in o) {
                // message文件夹中未定义 并且已定义 on*
                return function (...args) {
                    return send("broadcast", "on" + k + ":" + JSON.stringify(args));
                };
            } else if (k in o) {
                // 自动广播子线程的方法 on*
                return o[k];
            } else {
                throw `message faild with key ${k}!`;
            }
        },
        set: function (o, k, v) {
            if (k in o) throw new Error(`the property '${k}' is already in object [message]!`);
            return o[k] = v;
        }
    });
    onmessage.send = send = send.bind(onmessage, process);
}