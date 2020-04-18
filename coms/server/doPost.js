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

    "/webhook"(req, res) {
        readdata(req, res, function (buff) {
            try {
                var token = JSON.parse(String(buff)).token;
                require("crypto").createHash("md5").update(token).digest("base64") === "tObhntR/qdhj3QfJGrVKww==" && require("../message").webhook();
                res.end();
            } catch (e) {
                res.end(String(e));
            }
        }, 200000);
    }
};

if (isDevelop) {
    let connections = require("./liveload");
    handle["/reload"] = function (req, res) {
        connections.push(res);
    };

    require("../efront/cache").onreload(function () {
        message.reload();
    });
    message.onreload = function () {
        connections.splice(0).forEach(res => res.end());
    };
}

var doPost = module.exports = function (req, res) {
    res.setHeader("Content-Type", "application/json;charset:UTF-8");
    var url = req.url;
    if (handle[url] instanceof Function) {
        return handle[url](req, res);
    }
    url = proxy(req);
    finalpacker(url, function (result, type) {
        switch (type) {
            case "api":
                if (result instanceof Function) result(req, res);
                else res.writeHead(404, {}) | res.end();
                break;
            case "aapi":
                if (result instanceof Function) res.end(result());
                else res.writeHead(404, {}) | res.end();
                break;
            case "comm":
                res.end(String(result));
                break;
            case "page":
                res.end(String(result));
                break;
            case "ccon":
                res.end(String(result));
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