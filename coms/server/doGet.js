"use strict";
var zlib = require("zlib");
var path = require("path");
var filebuilder = require("../efront/filebuilder");
var checkAccess = require("./checkAccess");
var doFile = require("./doFile");
var doCross = require("./doCross");
var isDevelop = require("../efront/isDevelop");
var memery = require("../efront/memery");
var transfer = require("./transfer");
var parseURL = require("../basic/parseURL");
var isObject = require("../basic/isObject");
var FILE_BUFFER_SIZE = 64 * 1024 * 1024;
var PUBLIC_PATH = memery.PUBLIC_PATH;
var APPS_PATH = memery.PAGE_PATH;
var SERVER_ROOT_PATH = isDevelop ? APPS_PATH : PUBLIC_PATH;
var getfile = require("../efront/cache")(SERVER_ROOT_PATH, function (data, filename, fullpath) {
    var origin_size = data.length;
    var data = filebuilder.apply(this, arguments);
    if (/\.css$/i.test(fullpath)) {
        if (memery.APP) {
            var real = path.dirname(path.relative(SERVER_ROOT_PATH, fullpath).replace(/\\/g, '/'));
            data = Buffer.from(data.toString().replace(/url\s*\(\s*(['"]?)([^\)]*)\1\s*\)/gi, function (a, q, s) {
                if (!/^\/|^\w+\:/i.test(s)) {
                    s = path.join(`/${real}/`, s).replace(/\\/g, '/');
                }
                return `url(${q || ''}${s}${q || ''})`;
            }));
        }
    }
    if (memery.TRANSFER && /\.(m?[tj]sx?|html?|json|css|less)$/i.test(fullpath)) {
        data = Buffer.from(transfer(data));
    }
    return new Promise(function (ok, oh) {
        if (data instanceof Function) {
            if (checkAccess(fullpath)) {
                oh(new Error('请不要在共享路径中创建服务器脚本！'));
                return;
            }
            return ok(data);
        }
        data.origin_size = origin_size;
        zlib.gzip(data, function (error, result) {
            if (error) {
                oh(error);
            } else if (data.length > result.length) {
                result.origin_size = origin_size;
                result.isgzip = true;
                ok(result);
            } else {
                ok(data);
            }
        });
    });
}, FILE_BUFFER_SIZE).async;
var mimes = require("../efront/mime");
var message = require("../message");
var proxy = require("./url-proxy");
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
        var extend = (data.name || url).match(/\.([^\.]*?)$/);
        var headers = {
            "Content-Length": data.length
        };
        if (extend) {
            var mime = mimes[extend[1]];
            if (mime) {
                headers['Content-Type'] = mime;
            }
            else if (/^(php|asp|jsp)$/i.test(extend[1])) {
                if (/^\s*\<\!/.test(data)) headers['Content-Type'] = 'text/html;charset=utf-8';
                else headers['Content-Type'] = 'text/plain;charset=utf-8';
            }
        }
        var status = 200;
        if (data.stat) {
            headers["Last-Modified"] = data.stat.mtime.toUTCString();
            if ((data.origin_size || data.length) < data.stat.size) {
                return doFile(req, res);
                // headers["Accept-Ranges"] = "bytes";
                // headers["Content-Range"] = "bytes 0-" + (data.length - 1) + "/" + data.stat.size;
                // headers["Content-Length"] = data.length;

                // status = 206;
            }
        }
        if (data.isgzip) {
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
    if (data instanceof Function) {
        data = data(req, res);
    }
    if (data instanceof Promise) {
        return data.then(function (data) {
            adapter(data, url, req, res);
        }).catch(function (error) {
            res.writeHead(500, {});
            res.end(String(error));
        });
    }
    if (isObject(data) && !/\/$/.test(url)) {
        data = url + '/';
    }
    if (typeof data === "string") {
        var new_url = data[0] === "/" ? data : "/" + data;
        if (new_url !== req.url) {
            res.writeHead(302, {
                'Location': new_url
            });
            return res.end();
        }
    }
    if (url) {
        data = getfile(url, [
            'default.html',
            'index.html', 'index.htm',
            'index.jsp', 'index.asp', 'index.php',
        ]);
        return adapter(data, "", req, res);
    }
    if (!req.direct && memery.DIRECT) {
        var direct = req.direct = memery.DIRECT;
        if (typeof direct === 'function') direct = direct(req.url);
        data = getfile(direct, ['', 'default.html', "index.html", 'index.htm', 'index.jsp', 'index.asp', 'index.php']);
        return adapter(data, direct, req, res);
    }
    if (typeof memery.TRANSFER === "string") {
        var p = parseURL(memery.TRANSFER);
        req.url = "/" + (/^https:/i.test(p.protocol) ? '~~' : !p.protocol ? "&" : "~") + p.host + p.path + req.url;
        return doCross(req, res);
    }

    res.writeHead(404, {});
    res.end("not found");
};
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
    url = url.replace(/[\:\?#][\s\S]*/g, "");
    var id = /\:/.test(req.url) ? req.url.replace(/^[\s\S]*?\:([\s\S]*?)([\?][\s\S]*)?$/, "$1") : null;
    req.id = id;
    var exts = [''];
    if (url[url.length - 1] !== '/') exts.push(
        '.html',
        '.jsp',
        '.asp',
        '.php'
    );
    var data = getfile(url, exts);
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
module.exports.reset = getfile.reset;