let fs = require("fs");
let path = require("path");
var memery = require("../efront/memery");
var record_path;
if (memery.RECORD) {
    let { RECORD } = memery;
    let parseKV = require("../basic/parseKV");
    if (/\=/.test(RECORD)) {
        record_path = parseKV(RECORD);
    }
    else {
        record_path = RECORD;
    }
}


function getBasepath(hostname) {
    var basepath = record_path || '';
    if (basepath instanceof Object) {
        basepath = basepath[hostname];
    }
    if (basepath === true || basepath === '*') {
        basepath = hostname;
    }
    if (basepath === '.') basepath = '';
    return basepath;
}
function getFilepath($url) {
    if (!record_path) return;
    try {
        $url = decodeURI($url);
    } catch (e) {
        $url = escape($url);
    }
    let { pathname, hostname } = parseURL($url);
    if (/[\/\\]$/.test(pathname)) {
        pathname = path.join(pathname, 'index.html');
    }
    var basepath = getBasepath(hostname);
    return path.join(basepath, pathname);
}
function write(fullpath, data) {
    fs.mkdir(path.dirname(fullpath), { recursive: true }, function (error) {
        if (error) {
            console.error("创建文件夹失败", error);
        }
        var stream = fs.createWriteStream(fullpath);
        stream.write(data);
        stream.end();

        console.info('grap', fullpath);
    });
}
function record($url, response, res) {
    var fullpath = getFilepath($url);
    var _error = function (error) {
        res.writeHead(response.statusCode, response.headers);
        res.end(String(error));
    };
    var _write = function (error, data, compress) {
        if (error) return _error(error);
        if (/(text|javascript|json)/i.test(headers["content-type"]) || /^\s*<!/.test(data)) {
            var reg = /(\s*src=|<(?:link|a)[^>]*\shref=|:\s*|\(|\s)([`'"]?)(?:http(s?):)?\/\/([^\/\2\s\?\#]*)/gi;
            if (record.enabled) {
                var data1 = String(data).replace(reg, (_, a, b, c, d) => `${a}${b}/${getBasepath(d)}`);
                write(fullpath, data1);
            }
            var mark = record.enabled ? "*" : "~";
            data = String(data).replace(reg, (_, a, b, c, d) => `${a}${b}/${mark}${c ? mark : ''}${d}`);
        } else {
            if (record.enabled) write(fullpath, data);
        }
        if (compress === false) {
            res.writeHead(response.statusCode, headers);
            res.end(data);
            return;
        }
        require("zlib").deflate(data, function (error, data) {
            if (error) return res.writeHead(500), res.end(String(error));
            headers["content-encoding"] = "deflate";
            headers["content-length"] = data.length;
            res.writeHead(response.statusCode, headers);
            res.end(data);
        });
    };
    var buffers = [];
    var headers = response.headers;
    response.on("data", function (data) {
        buffers.push(data);
    });
    response.on('error', _error);

    response.on("end", function () {
        var data = Buffer.concat(buffers);
        switch (headers["content-encoding"]) {
            case "gzip":
                require("zlib").gunzip(data, _write);
                break;
            case "br":
                require("zlib").brotliDecompress(data, _write);
                break;
            case "deflate":
                require("zlib").deflateSync(data, _write);
                break;
            case null:
            case "":
            case undefined:
                _write(null, data, false);
                break;
            default:
                console.warn(response.headers["content-encoding"], "content-encoding not support!");
                _write(null, data, false);
        }
    });
    return true;
}
record.enabled = !!record_path;
module.exports = record;