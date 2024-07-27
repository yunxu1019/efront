var message = require("../message");
var senders = Object.create(null);
var waiters = Object.create(null);
var getChannelId = function (url) {
    var match = /^\/\((.*)\)/.exec(url);
    if (!match) return null;
    return match[1];
};
message["channel-write"] = function ([id, data, offset, total]) {
    var res = waiters[id];
    if (!res) return;
    if (offset === 0) res.writeHead(200, {
        "Content-Length": total,
        "Content-Disposition": "attachment",
        "Content-Type": "application/octet-stream",
    });
    res.write(data);
};
message["channel-error"] = function ([id, error]) {
    try {
        if (id in waiters) {
            waiters[id].destroy();
        }
        if (id in senders) {
            senders[id][1].destroy();
        }
    } catch { };

}
message["channel-end"] = function (id) {
    if (id in waiters) {
        waiters[id].end();
    }
    if (id in senders) {
        senders[id][1].end();
    }
};
message["channel-read"] = function (id) {
    var sender = senders[id];
    if (!sender) return;
    var [req, res] = sender;
    return new Promise(function (ok, oh) {
        var ondata = function (data) {
            req.pause();
            req.off('data', ondata);
            req.off('error', onerror);
            ok(data);
        };
        var onerror = function (error) {
            req.off('data', ondata);
            req.off('error', onerror);
            req.destroy();
            delete senders[id];
            oh(error);
            res.end("发送失败！");
        };
        req.once('data', ondata);
        req.once('error', onerror);
        req.resume();
    })
};

async function doChannel(req, res) {
    var error = function (status, msg = '') {
        res.writeHead(status, utf8error);
        res.end(msg);
    };
    var id = getChannelId(req.url);

    switch (req.method.toLowerCase()) {
        case "get":
            waiters[id] = res;
            if (!await message.invoke('set-waiter', id)) {
                error(403, i18n`通道不存在！`);
            };
            break;
        case "post":
            senders[id] = [req, res];
            req.pause();
            if (!
                await message.invoke("set-sender", id)
            ) {
                error(403, i18n`通道不存在！`);
            }
            break;
        case "put":
            var msg = await message.invoke("channel-create", +id);
            if (msg) res.end(msg);
            else error(503, i18n`服务器忙!`);
            break;
        case "delete":
            message.send('channel-delete', id);
            break;
        default:
            error(403, i18n`禁止访问！`);
    }
}
module.exports = doChannel;