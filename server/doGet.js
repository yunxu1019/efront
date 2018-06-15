"use strict";
var getfile = require("../process/getfile").async;
var path = require("path");
var mimes = require("../process/mime");
var message = require("../process/message");
var proxy = require("./proxy");
/**
 * 返回数据
 * @param {Buffer} data 
 * @param {string} url 
 * @param {httpRequest} req 
 * @param {httpResponse} res 
 */
var response = function (data, url, req, res) {
    message.count({ path: url, update: true });
    var requiredVersion = req.headers["if-modified-since"];
    if (requiredVersion && data.stat && new Date(requiredVersion) - data.stat.mtime >= 0) {
        res.writeHead(304, {});
    }
    else {
        var extend = url.match(/\.(.*?)$/);
        var headers = {
            "Content-Length": data.length
        };
        if (extend) {
            var mime = mimes[extend[1]];
            if (mime) {
                headers['Content-Type'] = mime;
            }
        }
        var status = 200;
        if (data.stat) {
            headers["Last-Modified"] = data.stat.mtime.toUTCString();
            if (data.length < data.stat.size) {
                headers["Accept-Ranges"] = "bytes";
                headers["Content-Range"] = "bytes 0-" + (data.length - 1) + "/" + data.stat.size;
                headers["Content-Length"] = data.length;
                status = 206;
            }
        }
        res.writeHead(status, headers);
        res.write(data);
    }
    return res.end();
};
/**
 * 根据数据类型进行不同的响应处理
 * @param {Buffer|Object|string} data 
 * @param {string} url 
 * @param {httpRequest} req 
 * @param {httpResponse} res 
 */
var adapter = function (data, url, req, res) {
    if (data instanceof Buffer) {
        return response(data, url, req, res);
    }
    if (data instanceof Error) {
        res.writeHead(404, {});
        return res.end(String(data));
    }
    if (data instanceof Object) {
        if (!data["index.html"]) {
            if (url[url.length - 1] !== "/") data = getfile(path.join(process.env.APP, url));
            else data = "index.html" in data ? getfile(url + "/index.html") : getfile(process.env.APP + url + "index.html");
        } else {
            data = data["index.html"];
        }
        if (data instanceof Buffer) {
            return response(data, "index.html", req, res);
        } else if (data instanceof Promise) {
            return data.then(function (data) {
                adapter(data, "index.html", req, res);
            }).catch(function (error) {
                res.writeHead(500, {});
                res.end(String(error));
            });
        }
    }
    if (typeof data === "string" && data !== url) {
        res.writeHead(301, {
            'Location': data[0] === "/" ? data : "/" + data
        });
        return res.end();
    }
    res.writeHead(404, {});
    res.end(String(data));
}
/**
 * doGet
 */
module.exports = function (req, res) {

    var url = proxy(req);
    url = url.replace(/[\?#][\s\S]*/g, "");
    var data = getfile(url);
    if (!data || data === "/") {
        data = getfile(path.join(process.env.APP, url));
        if (!data) {
            res.writeHead(404, {});
            return res.end();
        }
    }
    if (data instanceof Promise) {
        return data.then(function (data) {
            adapter(data, url, req, res);
        }).catch(function (error) {
            res.writeHead(500, {});
            res.end(String(error));
        });
    } else {
        adapter(data, url, req, res);
    }
};