var fs = require("fs");
var path = require("path");
var proxy = require("./proxy");
var checkAccess = require("./checkAccess");
var root = "./apps/zimoli";
var cacheRangeSize = 320 * 1024 * 1024;
var cachePieceSize = 256 * 1024;
var cacheCountLimit = 200;
function pipe(h, start, end, res) {
    var inc = start;
    var timeout = false;
    var safeend = function () {
        timeout = true;
        res.end();
        fs.closeSync(h);
        cacheCountLimit++;
    };
    cacheCountLimit--;
    if (cacheCountLimit < 0) {
        safeend();
        return;
    }
    var halfend = setTimeout(safeend, 2 * 1000);
    var saveend = function () {
        clearTimeout(halfend);
        safeend();
    };
    var run = function () {
        var ind = inc + cachePieceSize;
        if (ind > end) ind = end;
        var chunk = Buffer.alloc(ind - inc);
        if (inc >= end) return saveend();
        fs.read(h, chunk, 0, chunk.length, inc, function (error, size, chunk) {
            if (timeout) return;
            if (error) {
                res.writeHead(403, {});
                res.write(String(error));
                saveend();
                return;
            }
            if (size < chunk.length) {
                chunk = chunk.slice(0, size);
            }
            res.write(chunk);
            inc = ind;
            run();
        });
    };
    run();
}


function doFile(req, res) {
    if (/^\/@/.test(req.url)) {
        var filepath = decodeURIComponent(req.url.slice(2));
    } else {
        var url = proxy(req);
        var filepath = path.join(root, url);
    }
    if (!checkAccess(filepath)) {
        res.writeHead(406, {});
        res.end();
        return;
    }
    var [, start, end] = String(req.headers.range).match(/bytes=(\d*)\-(\d*)/) || [];
    fs.exists(filepath, function (exists) {
        if (!exists) {
            res.writeHead(404, {});
            res.end();
            return;
        }
        fs.stat(filepath, function (err, stats) {
            if (err) {
                res.writeHead(403, {});
                res.end(String(err));
                return;
            }
            if (stats.isDirectory()) {
                res.writeHead(400, {});
                res.end("folder");
                return;
            }
            start = +start | 0;
            if (!start || start < 0) {
                start = 0;
            }
            if (start > stats.size) {
                res.writeHead(400, {});
                res.end("out of range");
                return;
            }
            end = +end | 0;
            if (!end || end < 0) {
                end = start + cacheRangeSize;
            }
            if (end - start > cacheRangeSize) {
                end = start + cacheRangeSize;
            }
            if (end > stats.size) {
                end = stats.size;
            }
            fs.open(filepath, "r", function (error, h) {
                if (error) {
                    res.writeHead(403, {});
                    res.end(String(error));
                    return fs.closeSync(h);
                }
                res.writeHead(end === stats.size && start === 0 ? 200 : 206, {
                    "Accept-Ranges": "bytes",
                    "Content-Length": end - start,
                    "Content-Range": `bytes ${start}-${end - 1}/${stats.size}`,
                    "Last-Modified": stats.mtime.toUTCString(),
                });
                pipe(h, start, end, res);
            });
        })
    });
}
module.exports = doFile;