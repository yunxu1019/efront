var message = require("../message");
var channel = require("./channel");
var getChannelId = function (url) {
    var match = /^\/\((.*)\)/.exec(url);
    if (!match) return null;
    return match[1];
};
message["channel-has"] = function (name) {
    return channel.hasChannel(name);
};
message["channel-size"] = function (name) {
    return channel.getChannel(name).size;
}
message["channel-get"] = function (name, socket) {
    return channel.getChannel(name).addSocketGet(socket);
};
message["channel-post"] = function ([name, type], socket) {
    return channel.getChannel(name).addSocketPost(socket, type);
};
message["channel-destroy"] = function (name) {
    return channel.removeChannel(name);
};

async function doChannel(req, res) {
    var error = function (status, msg = '') {
        res.writeHead(status, { "Content-Type": "text/plain;charset=utf-8" });
        res.end(msg);
    };
    var id = getChannelId(req.url);
    var params = id;
    var dowith = async function (key, socket) {
        if (channel.hasChannel(id)) {
            return message[key](params, socket);
        }
        else {
            return message.invoke("fend", ["channel-has", id, key, params], socket);
        }
    }

    switch (req.method.toLowerCase()) {
        case "get":
            dowith("channel-get", res.socket);
            break;
        case "post":
            params = [id, getHeader(req.headers, "content-type")];
            dowith("channel-post", req.socket);
            break;
        case "put":
            var msg = channel.createChannel(req.socket, +id);
            if (msg) res.end(msg);
            else error(503, '服务器忙!');
            break;
        case "delete":
            dowith('channel-destroy');
            break;
        default:
            error(403, '禁止访问！');
    }
}
module.exports = doChannel;