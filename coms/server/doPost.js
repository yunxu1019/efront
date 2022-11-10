"use strict";
var finalpacker = require("../efront/finalpacker");
var getRequestEnv = require("./getRequestEnv");
var handle = Object.create(null);


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
    var env = getRequestEnv(req);
    finalpacker.call(env, url, async function (result, type) {
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