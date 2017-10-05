var cluster = require("cluster");
var fs = require("fs");
var path = require("path");
var message_handlers_path = "./message";
// message 文件夹中定义主进程的方法
// 子进程可通过message的属性访问主进程中的方法
message_handlers_path = path.join(__dirname, message_handlers_path);
if (cluster.isMaster && process.env.IN_DEBUG_MODE != "1") {
    var message = module.exports = function (msg, then) {
        var index = msg.indexOf(":");
        var run, args;
        if (index < 0) {
            run = message[msg]
        } else {
            run = message[msg.slice(0, index)];
            args = msg.slice(index + 1);
        }
        if (run instanceof Function) {
            if (args) {
                run(JSON.parse(args));
            } else {
                run();
            }
        }
    };
    fs.readdirSync(message_handlers_path).forEach(function (name) {
        var match = name.match(/^(.*).js$/);
        if (match) {
            var key = match[1];
            message[key] = require(path.join(message_handlers_path, name));
        }
    });

} else {
    // 发送对主进程方法的访问消息
    var message = function (key, msg, then) {
        process.send([key, JSON.stringify(msg)].join(":"), then);
    };
    fs.readdirSync(message_handlers_path).forEach(function (name) {
        var match = name.match(/^(.*).js$/);
        if (match) {
            var key = match[1];
            message[key] = function (data, then) {
                message(key, data, then);
            };
        }
    });
    module.exports = new Proxy(message, {
        get: function (o, k) {
            if (!(k in o) && ("on" + k) in o) {
                // message文件夹中未定义 并且已定义 on*
                return function (...args) {
                    return message("broadcast", "on" + k + ":" + JSON.stringify(args));
                };
            } else if (k in o) {
                // 自动广播子线程的方法 on*
                return o[k];
            } else {
                throw `message faild with key ${k}!`
            }
        },
        set: function (o, k, v) {
            o[k] = v;
        }
    });
}