"use strict";
var finalpacker = require("../efront/finalpacker");
var message = require("../message");
var proxy = require("./url-proxy");
var isDevelop = require("../efront/isDevelop");
var readdata = function (req, res, then, max_length) {
    var buff = [],
        length = 0;
    req.on("data", function (buf) {
        length += buf.length;
        if (length > max_length) return res.writeHead(403, {}), res.end();
        buff.push(buf);
    });
    req.on("end", function () {
        length <= max_length && then(Buffer.concat(buff));
    });
};
var handle = {
    "/count"(req, res) {
        message.count(req.headers.referer);
        res.end();
    },
    // "/webhook"(req, res) {
    //     readdata(req, res, function (buff) {
    //         try {
    //             var token = JSON.parse(String(buff)).token;
    //             require("crypto").createHash("md5").update(token).digest("base64") === "tObhntR/qdhj3QfJGrVKww==" && require("../message").webhook();
    //             res.end();
    //         } catch (e) {
    //             res.end(String(e));
    //         }
    //     }, 200000);
    // }
};

if (isDevelop) {
    let connections = require("./liveload");
    handle["/reload"] = function (req, res) {
        connections.push(res);
    };

    message.reload = function () {
        connections.splice(0).forEach(res => res.end());
    };
}

var doPost = module.exports = async function (req, res) {
    var url = req.url;
    if (handle[url] instanceof Function) {
        return handle[url](req, res);
    }
    if (/MSIE|Trident/.test(req.headers["user-agent"])) {
        var memery = require("../efront/memery");
        if (!memery.MSIE) {
            memery.MSIE = true;
            finalpacker.reset();
        }
    }
    url = await proxy(req);
    finalpacker(url, async function (result, type) {
        if (!(result instanceof Buffer || result instanceof Function)) {
            result = String(result);
        } else {
            if (result.mime) res.setHeader("Content-Type", result.mime);
        }
        switch (type) {
            case "api":
            case "aapi":
                if (result instanceof Function) res = res.end(await result(req, res));
                else res.writeHead(404, {
                    "Connection": "close"
                }) | res.end();
                break;
            case "comm":
                res.end(result);
                break;
            case "page":
                res.end(result);
                break;
            case "ccon":
                res.end(result);
                break;
            case 404:
                res.writeHead(404, {
                    "Connection": "close"
                });
                res.end(`未没找到匹配的资源：${url}`);
                break;
            default:
                res.end();
        }
    });
};
doPost.ccon = function (name, color) {
    var data = finalpacker.ccon(name);
    return finalpacker.color(String(data), color);
};