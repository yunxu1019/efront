"use strict";
var fs = require("fs");
var path = require("path");
var { Http2ServerRequest, Http2ServerResponse } = require("http2");
var checkAccess = require("./checkAccess");
var checkAuth = require("./checkAuth");
var encode62 = require("../crypt/encode62");
var root = require("../efront/memery").webroot;
var cachePieceSize = 32 * 1024;
var cacheCountLimit = 6000;
var allowSocketTime = 24 * 60 * 60 * 1000;
function piperead(h, start, end, res, sign) {
    var inc = start;
    var timeout = false;
    var safeend = function () {
        timeout = true;
        fs.close(h, function () {
            cacheCountLimit++;
        });
        res.end();
    };
    cacheCountLimit--;
    if (cacheCountLimit < 0) {
        safeend();
        return;
    }
    var halfend = setTimeout(safeend, allowSocketTime);
    var saveend = function () {
        clearTimeout(halfend);
        safeend();
    };
    var run = function (err) {
        if (err) return safeend();
        var ind = inc + cachePieceSize;
        if (ind > end) ind = end;
        var chunk = Buffer.alloc(ind - inc);
        if (inc >= end) return saveend();
        fs.read(h, chunk, 0, chunk.length, inc, function (error, size, chunk) {
            if (timeout) return;
            if (error) {
                res.writeHead(403, utf8);
                res.write(String(error));
                saveend();
                return;
            }
            if (size < chunk.length) {
                chunk = chunk.slice(0, size);
            }
            if (sign) {
                var signoffset = inc % sign.length;
                var signcurrent = sign.slice(signoffset) + sign.slice(0, signoffset);
                chunk = encode62.decode(chunk, signcurrent);
            }
            inc = inc + size;
            res.write(chunk, run);
        });
    };
    run();
}

/**
 * @param {Http2ServerRequest} req
 * @param {Http2ServerResponse} res
 */
function doGetFile(req, res, filepath, code) {
    req.setTimeout(allowSocketTime);
    res.setTimeout(allowSocketTime);
    var range = getHeader(req.headers, "range");
    if (range) range = range.match(/bytes\s*=\s*(\d*)\s*\-\s*(\d*)?/);
    if (range) var [, start, end] = range;
    if (!fs.existsSync(filepath)) {
        res.writeHead(404, utf8);
        res.end(i18n[getHeader(req.headers, "accept-language")]`文件不存在`);
        return;
    }
    fs.stat(filepath, function (err, stats) {
        if (err) {
            res.writeHead(403, utf8);
            res.end(String(err));
            return;
        }
        if (stats.isDirectory()) {
            res.writeHead(400, utf8);
            res.end(i18n[getHeader(req.headers, "accept-language")]`请求无效`);
            return;
        }
        if (stats.mtime) {
            var modified = getHeader(req.headers, "if-modified-since");
            if (new Date(modified) - new Date(stats.mtime.toUTCString()) >= 0) {
                res.writeHead(304, utf8);
                res.end();
                return;
            }
        }
        start = +start | 0;
        if (!start || start < 0 || getHeader(req.headers, "if-range") && getHeader(req.headers, "if-range") !== stats.mtime.toUTCString()) {
            start = 0;
        }
        if (start > stats.size || end && end < start || start < 0) {
            res.writeHead(416, utf8);
            res.end(i18n[getHeader(req.headers, "accept-language")]`文件内容不足`);
            return;
        }
        if (code) {
            var sign = encode62.timedecode(code);
            if (!sign) {
                res.writeHead(400, utf8);
                res.end(i18n`请求无效`);
                return;
            }
        }
        if (end) {
            end = +end + 1;
            if (end > stats.size) end = stats.size;
        } else if (range) {
            end = start + (cachePieceSize << 6);
            if (end > stats.size) end = stats.size;
        }
        else {
            end = stats.size;
        }
        fs.open(filepath, "r", function (error, h) {
            if (error) {
                res.writeHead(403, utf8);
                res.end(String(error));
                return fs.closeSync(h);
            }

            var extend = filepath.match(/\.([^\.]*?)$/);
            var headers = {
                "Content-Length": end ? end - start : stats.size - start,
                "Last-Modified": stats.mtime.toUTCString()
            };
            if (range) {
                headers["Accept-Ranges"] = "bytes";
                headers["Content-Range"] = `bytes ${start}-${end ? end - 1 : ''}/${stats.size}`;
                headers["access-control-expose-headers"] = "Content-Range,Accept-Ranges";
            }
            if (extend) {
                var mim1 = mime[extend[1]];
                if (mim1) {
                    headers['Content-Type'] = mim1;
                }
            }
            res.writeHead(range ? 206 : 200, headers);
            piperead(h, start, end ? end : stats.size, res, sign);
        });
    });
}
var utf8 = { "Content-Type": "text/plain;charset=utf-8" };

function doDeleteFile(req, res, filepath) {
    if (!fs.existsSync(filepath)) {
        res.writeHead(404, utf8);
        res.end("");
        return;
    }
    fs.unlink(filepath, function (error) {
        if (error) {
            res.writeHead(403, utf8);
            res.end(String(error));
            return;
        }
        notify();
        res.end('');
    });
}
/**
 * @param {Http2ServerRequest} req
 * @param {Http2ServerResponse} res;
 */
function doPutFile(req, res, filepath, code) {
    if (!fs.existsSync(path.dirname(filepath))) {
        res.writeHead(403, utf8);
        res.end(i18n[getHeader(req.headers, "accept-language")]`路径不存在`);
        return;
    }
    var range = getHeader(req.headers, "range");
    if (range) {
        var [start] = range.replace(/^\s*bytes\s*\=\s*/i, '').split(/\s*\-\s*/);
        start = +start || 0;
    }
    else if (fs.existsSync(filepath)) {
        res.writeHead(409, utf8);
        res.end(i18n[getHeader(req.headers, "accept-language")]`文件已存在`);
        return;
    }
    if (cacheCountLimit <= 1) {
        res.writeHead(403, utf8);
        res.end(i18n[getHeader(req.headers, "accept-language")]`服务繁忙`);
        return;
    }
    if (code) {
        var sign = encode62.timedecode(code);
        if (!sign) {
            res.writeHead(401, utf8);
            res.end("");
            return;
        }
    }
    cacheCountLimit--;
    var w = fs.createWriteStream(filepath, { start });
    var fired = false;
    var safeend = function () {
        if (fired) return;
        cacheCountLimit++;
        fired = true;
        w.close();
        res.end(filepath);
        notify();
    };
    var inc = start || 0;
    req.on("data", function (chunk) {
        if (sign) {
            var signoffset = inc % sign.length;
            var signcurrent = sign.slice(signoffset) + sign.slice(0, signoffset);
            chunk = encode62.decode(chunk, signcurrent);
        }
        inc = inc + chunk.length;
        w.write(chunk);
    });
    req.on("end", function () {
        w.end('');
        safeend();
    });
    req.on("error", safeend);
    req.on("close", safeend);
}


async function doFile(req, res) {
    if (/^\/@/.test(req.url)) {
        var filepath = req.url.slice(2);
        if (!checkAccess(filepath)) {
            res.writeHead(406, utf8);
            res.end(i18n[getHeader(req.headers, "accept-language")]`拒绝访问`);
            return;
        }
    } else {
        var url = path.normalize(req.url).replace(/^[\.\\\/]+/, '');
        var filepath = path.join(root, url);
    }
    if (/\!(\w+)(\.\w*)?$/.test(filepath)) {
        var [, filepath, code, extend] = /^([\s\S]*)\!(\w+)(\.\w*)?$/.exec(filepath);
        filepath = filepath + extend;
    }
    if (!/get/i.test(req.method)) {
        if (!checkAccess(filepath) && !await checkAuth(req, ["file"])) {
            res.writeHead(406, utf8);
            res.end(i18n[getHeader(req.headers, "accept-language")]`拒绝访问`);
            return;
        }
    }


    switch (req.method.toLowerCase()) {
        case "get":
            doGetFile(req, res, filepath, code);
            break;
        case "put":
            doPutFile(req, res, filepath, code);
            break;
        case "delete":
            doDeleteFile(req, res, filepath, code);
            break;
        default:
            res.writeHead(405, utf8);
            res.end(i18n[getHeader(req.headers, "accept-language")]`${req.method} 请求方法无效`);
    }
}
function notify(filepath) {
    if (!isSubpath(filepath, root)) return;
    notify_caches.forEach(c => {
        c.checkUpdate();
    })
}
var notify_caches = [];
doFile.addNotifyCache = function (a) {
    if (notify_caches.indexOf(a) < 0) notify_caches.push(a);
};
doFile.notify = notify;
module.exports = doFile;