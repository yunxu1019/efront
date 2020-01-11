"use strict";
var URL = require("url");
var Http2ServerResponse = require("http2").Http2ServerResponse;
var headersKeys = "Content-Type,Content-Length,User-Agent,Accept-Language,Accept-Encoding,Range,If-Range,Last-Modified".split(",");
var privateKeys = Object.create(null);
"Cookie,Connection,Referer,Host,Origin".split(",").forEach(k => privateKeys[k] = privateKeys[k.toLowerCase()] = true);
var options = {};
-function () {
    var fs = require("fs");
    var path = require("path");
    var loadCertFile = function (keyname, reletivepath) {
        var fullpath = path.join(__dirname, "../data/keystore", reletivepath);
        fs.readFile(fullpath, function (err, chunk) {
            if (err) console.error(err);
            else options[keyname] = chunk;
        });
    }
    loadCertFile("key", "cross-key.pem");
    loadCertFile("cert", "cross-cert.pem");
}();
function parseUrl(hostpath, real) {
    var { pathname, search } = URL.parse(hostpath);
    var slice_end = pathname.indexOf("@");
    if (slice_end < 0) slice_end = pathname.length;
    var jsonlike = pathname.slice(1, slice_end);
    var realpath = real ? real.slice(1) : pathname.slice(slice_end + 1) + (search || "");
    var matchlike = /^(?:\{|%7b)(s?)(\/|%2f)\2(.*?)\2(.*?)(?:\}|%7d)$/i.exec(jsonlike);
    if (matchlike) {
        // {s//wx2.qq.com/k=v,k=v,k=v}
        var headers = {};
        let [, s, , host, header] = matchlike;
        var hostpath = `http${s}://${host}/`;
        header.split(/[,&]/).forEach(function (kv) {
            var [k, v] = kv.split("=");
            if (k && v) headers[decodeURIComponent(k)] = decodeURIComponent(v);
        });
    } else {
        var { url: hostpath, token, headers = {} } = JSON.parse(decodeURIComponent(jsonlike));
        if (!token) throw new Error("验证身份失败！");
        hostpath = escape(hostpath);
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
function cross(req, res, referer) {
    try {
        if (referer) {
            var { jsonlike, realpath, hostpath, headers } = parseUrl(referer, req.url);
            if (/head|get/i.test(req.method)) {
                var redirect = "/" + escape(jsonlike) + "@" + realpath;
                res.writeHead(302, {
                    "Location": redirect
                });
                return res.end();
            }
        } else {
            var { jsonlike, realpath, hostpath, headers } = parseUrl(req.url);
        }
        var
            $url = hostpath + realpath,
            // $data = $cross['data'],//不再接受数据参数，如果是get请直接写入$url，如果是post，请直接post
            method = req.method;//$_SERVER['REQUEST_METHOD'];
        var _headers = req.headers;
        var is_proxy = false;
        if (/^https?\:\/\/[^\/]*\/(?:\{|%7b)/i.test(_headers.referer) && !headers.referer) {
            headers.referer = hostpath + parseUrl(_headers.referer).realpath;
            is_proxy = true;
        } else if (_headers.referer) {
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
        }, URL.parse($url), options), function (response) {
            var headers = response.headers;
            var setCookie = headers["set-cookie"];
            var header_keys = [];
            if (setCookie && !is_proxy) headers["efront-cookie"] = setCookie, delete headers["set-cookie"], header_keys.push("efront-cookie");
            if (headers.location) {
                headers["efront-location"] = headers.location;
                header_keys.push("efront-location");
                delete headers.location;
            }
            if (header_keys.length) {
                headers["Access-Control-Expose-Headers"] = header_keys.join();
            }
            delete headers["access-control-allow-origin"];
            delete headers["access-control-allow-methods"];
            if (res instanceof Http2ServerResponse) {
                delete headers["transfer-encoding"];
                delete headers["connection"];
            }
            res.writeHead(response.statusCode, headers);
            response.pipe(res);
        });
        request.setTimeout(36000/*support for wechat long pull*/);
        request.on("error", function (e) {
            res.writeHead(403, {});
            res.end(String(e));
        });
        req.pipe(request);
    } catch (e) {
        res.writeHead(403, {});
        res.end(String(e));
    }
}
module.exports = cross;