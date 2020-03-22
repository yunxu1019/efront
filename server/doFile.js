var fs = require("fs");
var path = require("path");
var proxy = require("./proxy");
var checkAccess = require("./checkAccess");
var encode62 = require("../process/crypt/encode62");
var mimes = require("../process/mime");

var { IN_TEST_MODE, PAGE_PATH, PUBLIC_PATH } = process.env;
var root = IN_TEST_MODE ? PAGE_PATH : PUBLIC_PATH;
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
            inc = inc + size;
            res.write(chunk, run);
        });
    };
    run();
}


function doGetFile(req, res, filepath, code) {

    var [, start, end] = String(req.headers.range).match(/bytes\s*=\s*(\d*)\s*\-\s*(\d*)/) || [];
    fs.exists(filepath, function (exists) {
        if (!exists) {
            res.writeHead(404, {});
            res.end("not found");
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
            if (!start || start < 0 || req.headers["if-range"] && req.headers["if-range"] !== stats.mtime.toUTCString()) {
                start = 0;
            }
            if (start > stats.size || end && end < start || start < 0) {
                res.writeHead(416, {});
                res.end("out of range");
                return;
            }
            if (code) {
                var sign = encode62.timedecode(code);
                if (!sign) {
                    res.writeHead(404, {});
                    res.end("not found");
                    return;
                }
            }
            if (end) {
                end = +end + 1;
            } else {
                end = stats.size;
            }
            fs.open(filepath, "r", function (error, h) {
                if (error) {
                    res.writeHead(403, {});
                    res.end(String(error));
                    return fs.closeSync(h);
                }

                var extend = filepath.match(/\.([^\.]*?)$/);
                var headers = {
                    "Content-Length": end ? end - start : stats.size - start,
                    "Last-Modified": stats.mtime.toUTCString()
                };
                if (req.headers.range) {
                    headers["Accept-Ranges"] = "bytes";
                    headers["Content-Range"] = `bytes ${start}-${end ? end - 1 : ''}/${stats.size}`;
                }
                if (extend) {
                    var mime = mimes[extend[1]];
                    if (mime) {
                        headers['Content-Type'] = mime;
                    }
                }
                res.writeHead(start === 0 && (!end || end === stats.size) ? 200 : 206, headers);
                piperead(h, start, end ? end : stats.size, res, sign);
            });
        })
    });

}

function doDeleteFile(req, res, filepath) {
    fs.exists(filepath, function (exists) {
        if (!exists) {
            res.writeHead(404, {});
            res.end("");
            return;
        }
        fs.unlink(filepath, function (error) {
            if (error) {
                res.writeHead(403, {});
                res.end(String(error));
                return;
            }
            res.end('');
        })
    })
}

function doPutFile(req, res, filepath, code) {
    fs.exists(path.dirname(filepath), function (exists) {
        if (!exists) {
            res.writeHead(403, {});
            res.end(`Directory not exists.`);
            return;
        }
        fs.exists(filepath, function (exists) {
            if (exists) {
                res.writeHead(403, {});
                res.end(`File already exists.`);
                return;
            }
        });

        if (cacheCountLimit <= 1) {
            res.writeHead(403, {});
            res.end("");
            return;
        }
        if (code) {
            var sign = encode62.timedecode(code);
            if (!sign) {
                res.writeHead(401, {});
                res.end("");
                return;
            }
        }
        cacheCountLimit--;
        var w = fs.createWriteStream(filepath);
        var fired = false;
        var safeend = function () {
            if (fired) return;
            cacheCountLimit++;
            fired = true;
            w.close();
            res.end(filepath);
        };
        var inc = 0;
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
    });
}

function doPatchFile(req, res) {
    res.end();
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
    if (/\!(\w+)(\.\w*)?$/.test(filepath)) {
        var [, filepath, code, extend] = /^([\s\S]*)\!(\w+)(\.\w*)?$/.exec(filepath);
        filepath = filepath + extend;
    }


    switch (req.method.toLowerCase()) {
        case "get":
            doGetFile(req, res, filepath, code);
            break;
        case "put":
            doPutFile(req, res, filepath, code);
            break;
        case "patch":
            doPatchFile(req, res, filepath, code);
            break;
        case "delete":
            doDeleteFile(req, res, filepath, code);
            break;
        default:
            res.writeHead(405, {});
            res.end(`${req.method} not allowed.`);
    }
}
module.exports = doFile;