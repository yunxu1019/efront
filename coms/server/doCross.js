"use strict";
var parseURL = require("../basic/parseURL");
var Http2ServerResponse = require("http2").Http2ServerResponse;
var headersKeys = "Content-Type,Content-Length,User-Agent,Accept-Language,Accept-Encoding,Range,If-Range,Last-Modified".split(",");
var privateKeys = Object.create(null);
"Cookie,Connection,Referer,Host,Origin".split(",").forEach(k => privateKeys[k] = privateKeys[k.toLowerCase()] = true);
var memery = require("../efront/memery");
var options = {
    record_path: memery.RECORD_PATH
};

if (options.record_path) {
    let { record_path } = options.record_path;
    let parseKV = require("../basic/parseKV");
    if (/\=/.test(record_path)) {
        options.record_path = parseKV(record_path);
    }
}
-function () {
    var fs = require("fs");
    var path = require("path");
    var loadCertFile = function (keyname, reletivepath) {
        var fullpath = path.join(__dirname, "../../data/keystore", reletivepath);
        fs.readFile(fullpath, function (err, chunk) {
            if (err) console.error(err);
            else options[keyname] = chunk;
        });
    }
    loadCertFile("key", "cross-key.pem");
    loadCertFile("cert", "cross-cert.pem");
}();
function parseUrl(hostpath, real) {
    var { pathname, search, hostname, protocol, port } = parseURL(hostpath);
    if (real === undefined && /^https?\:\/\//i.test(hostpath)) {
        var headers = {};
        var realpath = pathname.slice(1);
        hostpath = `${protocol}//${hostname}${port ? ':' + port : ''}/`;
    } else {

        var slice_end = pathname.indexOf("@");
        if (slice_end < 0) slice_end = pathname.length;
        var realpath = real ? real.slice(1) : pathname.slice(slice_end + 1) + (search || "");
        var jsonlike = pathname.slice(1, slice_end);
        var matchlike = /^(?:\{|%7b)(s?)(\/|%2f)\2(.*?)\2(.*?)(?:\}|%7d)$/i.exec(jsonlike);
        if (matchlike) {
            // {s//wx2.qq.com/k=v,k=v,k=v}
            var headers = {};
            let [, s, , host, header] = matchlike;
            var hostpath = `http${s}://${host}/`;
            header.split(/[,&]/).forEach(function (kv) {
                var [k, v] = kv.split("=");
                if (k && v) try {
                    headers[decodeURIComponent(k)] = decodeURIComponent(v);
                } catch (e) {
                    headers[unescape(k)] = unescape(v);
                }
            });
        } else {
            var { url: hostpath, token, headers = {} } = JSON.parse(decodeURIComponent(jsonlike));
            if (!token) throw new Error("验证身份失败！");
            hostpath = escape(hostpath);
        }
    }
    return { jsonlike, realpath, hostpath, headers };
}
// https://github.com/nodejs/node/blob/02a0c74861c3107e6a9a1752e91540f8d4c49a76/lib/_http_common.js :204
const tokenRegExp = /^[\^_`a-zA-Z\-0-9!#$%&'*+.|~]+$/
/**
 * Verifies that the given val is a valid HTTP token
 * per the rules defined in RFC 7230
 * See https://tools.ietf.org/html/rfc7230#section-3.2.6
 */
function checkIsHttpToken(val) {
    return tokenRegExp.test(val);
}
/**
 * 
 * @param {*} req 
 * @param {http.ServerResponse} res 
 * @param {*} referer 
 */
function cross(req, res, referer) {
    try {
        if (referer) {
            var { jsonlike, realpath, hostpath, headers } = parseUrl(referer, req.url);
            if (/^head|^get/i.test(req.method)) {
                var redirect = "/" + unescape(jsonlike) + "@" + realpath;
                res.writeHead(302, {
                    "Location": redirect
                });
                return res.end();
            }
            var $url = hostpath + realpath;
        } else {
            var { jsonlike, realpath, hostpath, headers } = parseUrl(req.url);
            var $url = hostpath + realpath;
        }
        // $data = $cross['data'],//不再接受数据参数，如果是get请直接写入$url，如果是post，请直接post
        var method = req.method;//$_SERVER['REQUEST_METHOD'];
        var _headers = req.headers;
        var is_proxy = false;
        if (/^https?\:\/\/[^\/]*\/(?:\{|%7b)/i.test(_headers.referer) && !headers.referer) {
            headers.referer = hostpath + parseUrl(_headers.referer, false).realpath;
            is_proxy = true;
        } else if (_headers.referer || _headers.origin === 'null') {
            headers.referer = hostpath;
        }
        for (let key in headers) {
            let k = key.toLowerCase();
            if (k !== key) {
                headers[k] = headers[key];
                delete headers[key];
            }
        }
        headersKeys.forEach(function (key) {
            key = key.toLowerCase();
            if (!headers[key] && _headers[key]) {
                headers[key] = _headers[key];
            }
        });
        for (var k in _headers) {
            if ({}.hasOwnProperty.call(privateKeys, k)) {
                continue;
            }
            if (!headers[k] && _headers[k] && checkIsHttpToken(k)) {
                headers[k] = _headers[k];
            }
        }
        var http;
        if (/^https\:/i.test(hostpath)) {
            http = require("https");
        } else {
            http = require("http");
        }
        var request = http.request(Object.assign({
            method: method,
            headers: headers,
            rejectUnauthorized: false// 放行证书不可用的网站
        }, parseURL($url), options), function (response) {
            var headers = response.headers;
            var setCookie = headers["set-cookie"];
            if (setCookie && !is_proxy) headers["efront-cookie"] = setCookie, delete headers["set-cookie"];
            if (headers.location && referer === false) {
                headers["efront-location"] = headers.location;
                delete headers.location;
            }
            headers["Access-Control-Expose-Headers"] = ["efront-location", "efront-cookie"].join();
            delete headers["access-control-allow-origin"];
            delete headers["access-control-allow-methods"];
            if (res instanceof Http2ServerResponse) {
                delete headers["transfer-encoding"];
                delete headers["connection"];
            }
            if (!closed) {
                res.writeHead(response.statusCode, headers);
                let { record_path } = options;
                try {
                    $url = decodeURI($url);
                } catch (e) {
                    $url = escape($url);
                }
                let { pathname, hostname } = parseURL($url);
                if (record_path instanceof Object) {
                    record_path = record_path[hostname];
                    if (!record_path) {
                        console.warn("已跳过", $url);
                    }
                }
                if (record_path && response.statusCode === 200) {
                    let fs = require("fs");
                    let path = require("path");
                    if (/[\/\\]$/.test(pathname)) {
                        pathname = path.join(pathname, 'index.html');
                    }
                    let fullpath = path.join(record_path, pathname);
                    response.pipe(res);
                    var buffers = [];
                    response.on("data", function (data) {
                        buffers.push(data);
                    });
                    response.on("end", function () {
                        fs.mkdir(path.dirname(fullpath), { recursive: true }, function (error) {
                            if (error) {
                                console.error("创建文件夹失败", error);
                            }
                            var stream = fs.createWriteStream(fullpath);
                            var data = Buffer.concat(buffers);
                            var write = function (error, data) {
                                if (error) {
                                    console.error(fullpath, error);
                                    return;
                                }
                                console.info('grap', fullpath);
                                stream.write(data);
                                stream.end();
                            };
                            switch (response.headers["content-encoding"]) {
                                case "gzip":
                                    require("zlib").gunzip(data, write);
                                    break;
                                case null:
                                case "":
                                case undefined:
                                    write(null, data);
                                    break;
                                default:
                                    console.warn(response.headers["content-encoding"], "not support!");
                                    write(null, data);
                            }
                            // console.log(data);
                        });
                    })
                } else {
                    response.pipe(res);
                }
            } else {
                response.destroy();
                res.end();
            }
        });
        var closed = false;
        req.on("close", function (e) {
            closed = true;
        });
        request.setTimeout(120000/*support for wechat long pull*/);
        request.on("error", function (e) {
            var code;
            switch (e.code) {
                case "ECONNRESET":
                case "ECONNREFUSED":
                    code = 502;
                    break;
                case "ETIMEDOUT":
                    code = 504;
                    break;
                default:
                    code = 500;
            }
            closed = true;
            res.writeHead(code, {});
            res.end(String(e));
        });
        req.pipe(request);
    } catch (e) {
        res.writeHead(500, {});
        res.end(String(e));
    }
}
module.exports = cross;