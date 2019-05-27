var fs = require("fs");
var path = require("path");
var proxy = require("./proxy");
var checkAccess = require("./checkAccess");
var encode62 = require("../process/crypt/encode62");
var mimes = require("../process/mime");

var { IN_TEST_MODE, PAGE_PATH, PUBLIC_PATH } = process.env;
var root = IN_TEST_MODE ? PAGE_PATH : PUBLIC_PATH;
var cacheRangeSize = 2 * 1024 * 1024;
var cacheTotalSize = 320 * 1024 * 1024;
var cachePieceSize = 256 * 1024;
var cacheCountLimit = 200;
function pipe(h, start, end, res, sign) {
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
            if (sign) {
                var signoffset = inc % sign.length;
                var signcurrent = sign.slice(signoffset) + sign.slice(0, signoffset);
                chunk = encode62.decode(chunk, signcurrent);
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
        var filepath = req.url.slice(2);
        if (!checkAccess(filepath)) {
            res.writeHead(406, {});
            res.end();
            return;
        }
    } else {
        var url = proxy(req);
        var filepath = path.join(root, url);
    }
    if (/\!(\w+)(\.\w*?)$/.test(filepath)) {
        var [, filepath, code, extend] = /^([\s\S]*)\!(\w+)(\.\w*?)$/.exec(filepath);
        filepath = filepath + extend;
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
                end = start + (req.headers.range ? cacheRangeSize : cacheTotalSize);
            }
            if (end - start > cacheTotalSize) {
                end = start + cacheTotalSize;
            }
            if (end > stats.size) {
                end = stats.size;
            }
            if (code) {
                var sign = encode62.timedecode(code);
                if (!sign) {
                    res.writeHead(404, {});
                    res.end();
                    return;
                }
            }
            fs.open(filepath, "r", function (error, h) {
                if (error) {
                    res.writeHead(403, {});
                    res.end(String(error));
                    return fs.closeSync(h);
                }

                var extend = filepath.match(/\.([^\.]*?)$/);
                var headers = {
                    "Accept-Ranges": "bytes",
                    "Content-Length": end - start,
                    "Content-Range": `bytes ${start}-${end - 1}/${stats.size}`,
                    "Last-Modified": stats.mtime.toUTCString()
                };
                if (extend) {
                    var mime = mimes[extend[1]];
                    if (mime) {
                        headers['Content-Type'] = mime;
                    }
                }
                res.writeHead(end === stats.size && start === 0 ? 200 : 206, headers);
                pipe(h, start, end, res, sign);
            });
        })
    });
}
module.exports = doFile;