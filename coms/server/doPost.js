"use strict";
var finalpacker = require("../efront/finalpacker");
var proxy = require("./url-proxy");
var handle = {
    // async "/webhook"(req, res) {
    //     var buff = await readdata(req, 200);
    //     var token = JSON.parse(String(buff)).token;
    //     require("crypto").createHash("md5").update(token).digest("base64") === "tObhntR/qdhj3QfJGrVKww==" && require("../message").webhook();
    //     res.end();
    // }
};


var doPost = module.exports = async function (req, res) {
    var url = req.url;
    if (handle[url] instanceof Function) {
        try {
            return handle[url](req, res);
        } catch (e) {
            res.writeHead(403, {});
            res.end(String(e));
            return;
        }
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
                else res.writeHead(404, {}) | res.end();
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
                res.writeHead(404, {});
                res.end(`未没找到匹配的资源：${url}`);
                break;
            default:
                res.end(result);
        }
    });
};
doPost.ccon = function (name, color) {
    var data = finalpacker.ccon(name);
    return finalpacker.color(String(data), color);
};