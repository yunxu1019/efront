"use strict";
var { Http2ServerResponse, Http2ServerRequest } = require("http2");
var finalpacker = require("../efront/finalpacker");
var message = require("../message");
var proxy = require("./url-proxy");
var isDevelop = require("../efront/isDevelop");
/**
 * @param {Http2ServerRequest} req;
 */
var readdata = function (req, max_length) {
    return new Promise(function (ok, oh) {
        var buff = [], length = 0;
        req.on("data", function (buf) {
            length += buf.length;
            if (length > max_length) return oh("数据过载...");
            buff.push(buf);
        });
        req.on("end", function () {
            ok(Buffer.concat(buff));
        });
        req.on("close", oh);
        req.on("aborted", oh);
        req.on("error", oh);
    })
};
var handle = {
    "/count"(req, res) {
        message.count(req.headers.referer);
        res.end();
    },
    // async "/webhook"(req, res) {
    //     var buff = await readdata(req, 200);
    //     var token = JSON.parse(String(buff)).token;
    //     require("crypto").createHash("md5").update(token).digest("base64") === "tObhntR/qdhj3QfJGrVKww==" && require("../message").webhook();
    //     res.end();
    // }
};

if (isDevelop) {
    let connections = require("./liveload");
    /**
     * @param {Http2ServerRequest} req
     * @param {Http2ServerResponse} res
     */
    handle["/reload"] = async function (req, res) {
        var a = await readdata(req, 30);
        a = +String(a);
        if (a !== connections.version) return res.end("你的唯一已再生");
        connections.push(res);
    };

    message.reload = function () {
        connections.version++;
        connections.splice(0).forEach(res => res.writeHead(200, { "content-type": "text/plain;charset=utf-8" }) | res.end("我不是你的唯一"));
    };
}

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
                res.end();
        }
    });
};
doPost.ccon = function (name, color) {
    var data = finalpacker.ccon(name);
    return finalpacker.color(String(data), color);
};