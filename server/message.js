var cluster = require("cluster");
var fs = require("fs");
var path = require("path");
var message_handlers_path = "./message";
message_handlers_path=path.join(__dirname,message_handlers_path);
if (cluster.isMaster) {
    var message = module.exports = function (msg, then) {
        var index = msg.indexOf(":");
        var run, args;
        if (index < 0) {
            run = message[msg]
        } else {
            run = message[msg.slice(-index)];
            args = message[msg.slice(index + 1)];
        }
        if (run instanceof Function) {
            if (args !== void 0) {
                run(JSON.parse(args));
            } else {
                run();
            }
        }
    };
    fs.readdirSync(message_handlers_path).forEach(function (name) {
        key = name.match(/^(.*).js$/);
        if (key) {
            message[key] = require(path.join(message_handlers_path, name));
        }
    });
    return message;
}
var message = module.exports = function (key, msg, then) {
    process.send(key + ":" + JSON.stringify(msg), then);
};
fs.readdirSync(message_handlers_path).forEach(function (name) {
    key = name.match(/^(.*).js$/);
    if (key) {
        message[key] = function (data, then) {
            message(key, data, then);
        };
    }
});