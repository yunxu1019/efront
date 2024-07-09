"use strict";
var finalpacker = require("../efront/finalpacker");
var getRequestEnv = require("./getRequestEnv");
var handle = Object.create(null);

var utf8err = { "Content-Type": "text/plain;charset=utf-8" };
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
    if (/MSIE|Trident/.test(getHeader(req.headers, "user-agent"))) {
        var memery = require("../efront/memery");
        if (!memery.MSIE) {
            memery.MSIE = true;
            finalpacker.reset();
        }
    }
    var env = await getRequestEnv(req);
    finalpacker.call(env, url, async function (result, type) {
        if (!(result instanceof Buffer || result instanceof Function)) {
            try {
                result = String(result);
            } catch {
                type = 500;
            }
        } else {
            if (result.mime) res.setHeader("Content-Type", result.mime);
        }
        switch (type) {
            case "api":
            case "aapi":
                if (result instanceof Function) res = res.end(await result(req, res));
                else res.writeHead(404, utf8err) | res.end();
                break;
            case "comm":
                res.end(result);
                break;
            case "page":
                res.end(result);
                break;
            case 404:
                res.writeHead(404, utf8err);
                res.end(i18n[getHeader(req.headers, "accept-language")]`未没找到匹配的资源：${url}`);
                break;
            case 500:
                res.writeHead(500, utf8err);
                res.end(i18n[getHeader(req.headers, "accept-language")]`服务异常`);
                break;

            default:
                res.end(result);
        }
    });
};
