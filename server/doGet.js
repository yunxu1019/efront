"use strict";
var getfile = require("../process/getfile");
var path = require("path");
var mimes = require("../process/mime");
var message = require("../process/message");
var referer_proxy = {
    "/": "/" + process.env.APP || "",
};
referer_proxy[""] = referer_proxy["/"];
var URL = require("url");
/**
 * 
 */
module.exports = function (req, res) {

    var url = req.url.replace(/[\?#][\s\S]*/g, "");
    // console.info(req.headers.referer,'req');

    if (req.headers.referer) {
        var referer = req.headers.referer;
        var pathname = URL.parse(referer).pathname;
        if (referer_proxy[pathname]) {
            console.info(`Proxy:${url} : ${referer_proxy[pathname]}${url}`);
            url = referer_proxy[pathname] + url;
        }
    }
    var data = getfile(url);
    if (!data || data === "/") {
        data = getfile(path.join(process.env.APP, url));
        if (!data) {
            res.writeHead(404, {});
            return res.end();
        }
    }
    if (data instanceof Buffer) {
        message.count({ path: url, update: true });
        var requiredVersion = req.headers["if-modified-since"];
        if (requiredVersion && new Date(requiredVersion) - data.stat.mtime >= 0) {
            res.writeHead(304, {});
        }
        else {
            var extend = url.match(/\.(.*?)$/);
            if (extend) {
                var mime = mimes[extend[1]];
                if (mime) {
                    res.writeHead(200, {
                        "Last-Modified": data.stat.mtime.toUTCString(),
                        'Content-Type': mime,
                        "Content-Length": data.length
                    });
                }
            }
            res.write(data);
        }
        message.count({ path: url, update: true });
        return res.end();
    } else if (data instanceof Object) {
        if (!data["index.html"]) {
            if (url[url.length - 1] !== "/") data = getfile(path.join(process.env.APP, url));
            else data = "index.html" in data ? getfile(url + "/index.html") : getfile(process.env.APP + url + "index.html");
        } else {
            data = data["index.html"];
        }
        if (data instanceof Buffer) {
            message.count({ path: url, update: true });
            var requiredVersion = req.headers["if-modified-since"];
            if (requiredVersion && new Date(requiredVersion) - data.stat.mtime >= 0) {
                res.writeHead(304, {});
            } else {
                res.writeHead(200, {
                    "Last-Modified": data.stat.mtime.toUTCString(),
                    'Content-Type': mimes.html,
                    "Content-Length": data.length
                });
                res.write(data);
            }
            return res.end();
        }
    } else if (typeof data === "string") {
        res.writeHead(301, {
            'Location': data[0] === "/" ? data : "/" + data
        });
        return res.end();
    } else {

    }
    res.writeHead(403, {})
    res.end();
};