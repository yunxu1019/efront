"use strict";
var zlib = require("zlib");
var filebuilder = require("../process/filebuilder");
var env = process.env;
var FILE_BUFFER_SIZE = 64 * 1024 * 1024;
var PUBLIC_PATH = env.PUBLIC_PATH;
var APPS_PATH = env.PAGE_PATH;
var getfile = require("../process/cache")(env.IN_TEST_MODE ? APPS_PATH : PUBLIC_PATH, function (data) {
    data = filebuilder(data);
    return new Promise(function (ok, oh) {
        zlib.gzip(data, function (error, result) {
            if (error) {
                oh(error);
            } else if (data.length > result.length) {
                result.origin_size = data.length;
                ok(result);
            } else {
                ok(data);
            }
        });
    });
}, FILE_BUFFER_SIZE).async;
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
    if (requiredVersion && data.stat && new Date(requiredVersion) - new Date(data.stat.mtime.toUTCString()) >= 0) {
        res.writeHead(304, {});
    }
    else {
        var extend = url.match(/\.([^\.]*?)$/);
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
            if ((data.origin_size || data.length) < data.stat.size) {
                headers["Accept-Ranges"] = "bytes";
                headers["Content-Range"] = "bytes 0-" + (data.length - 1) + "/" + data.stat.size;
                headers["Content-Length"] = data.length;
                status = 206;
            }
        }
        if (data.origin_size > data.length) {
            headers["Content-Encoding"] = "gzip";
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
        if (data["index.html"]) {
            data = data["index.html"];
        } else {
            if (url[url.length - 1] !== "/") url = url + "/";
            if ("index.html" in data) data = getfile(url + "index.html")
            else data = getfile(process.env.APP + url + "index.html");
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
    if (typeof data === "string" && data !== req.url && "/" + data !== req.url) {
        res.writeHead(302, {
            'Location': data[0] === "/" ? data : "/" + data
        });
        return res.end();
    }
    res.writeHead(404, {});
    res.end("not found");
}
/**
 * doGet
 */
module.exports = function (req, res) {
    try {
        req.url = decodeURI(req.url);
    } catch (e) {
        req.url = unescape(req.url);
    }
    var url = proxy(req);
    url = url.replace(/[\?#][\s\S]*/g, "");
    var data = getfile(url, ['', 'index.html']);
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