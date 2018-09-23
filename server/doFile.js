var fs = require("fs");
var path = require("path");
var proxy = require("./proxy");
var checkAccess = require("./checkAccess");
var root = "./apps/zimoli";
var cacheRangeSize = 2 * 1024 * 1024;
function doFile(req, res) {
    var url = proxy(req);
    if (/^@/.test(url)) {
        var realpath = decodeURIComponent(req.url.slice(1));
    }
    var filepath = realpath || path.join(root, url);
    if (!checkAccess(filepath)) {
        res.writeHead(406, {});
        res.end();
        return;
    }
    var [, start, end] = String(req.headers.range).match(/bytes=(\d*)\-(\d*)/);
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
            fs.open(filepath, "r", function (error, h) {
                if (error) {
                    res.writeHead(403, {});
                    res.end(String(error));
                    return fs.closeSync(h);
                }
                start = +start | 0;
                if (!start || start < 0) {
                    start = 0;
                }
                end = +end | 0;
                if (!end || end < 0) {
                    end = start + cacheRangeSize;
                }
                if (end - start > cacheRangeSize) {
                    end = start + cacheRangeSize;
                }
                var chunk = Buffer.alloc(end - start);
                fs.read(h, chunk, 0, chunk.length, start, function (error, size, chunk) {
                    if (error) {
                        res.writeHead(403, {});
                        res.end(String(error));
                        return fs.closeSync(h);
                    }
                    if (size < chunk.length) {
                        chunk = chunk.slice(0, size);
                    }
                    res.writeHead(206, {
                        "Accept-Ranges": "bytes",
                        "Content-Length": chunk.length,
                        "Content-Range": `bytes ${start}-${start + chunk.length - 1}/${stats.size}`,
                        "Last-Modified": stats.mtime.toUTCString(),
                    });
                    res.end(chunk);
                    fs.closeSync(h);
                });
            });
        })
    });
}
module.exports = doFile;