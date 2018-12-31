"use strict";
var URL = require("url");
var headersKeys = "Content-Type,Content-Length,User-Agent,Accept-Language,Accept-Encoding,Range,If-Range,Last-Modified".split(",");
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
    var matchlike = /^%7b(s?)(\/|%2f)\2(.*?)\2(.*?)%7d$/i.exec(jsonlike);
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
        hostpath = encodeURI(hostpath);
    }
    return { jsonlike, realpath, hostpath, headers };
}
function cross(req, res, referer) {
    try {
        if (referer) {
            var { jsonlike, realpath, hostpath, headers } = parseUrl(referer, req.url);
            if (/head|get/i.test(req.method)) {
                var redirect = "/" + encodeURIComponent(jsonlike) + "@" + realpath;
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
        if (/^https?:\/\/[^\/]*\/%7b/i.test(_headers.referer) && !headers.referer) {
            headers.referer = hostpath + parseUrl(_headers.referer).realpath;
            is_proxy = true;
        }
        {
            for (let key in headers) {
                let k = key.toLowerCase();
                if (k !== key) {
                    headers[k] = headers[key];
                    delete headers[key];
                }
            }
        }
        headersKeys.forEach(function (key) {
            key = key.toLowerCase();
            if (!headers[key] && _headers[key]) {
                headers[key] = _headers[key];
            }
        });
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
            headers.origin && (headers["Access-Control-Allow-Credentials"] = true);
            var setCookie = headers["set-cookie"];
            if (setCookie && !is_proxy) headers["cross-cookie"] = setCookie, delete headers["set-cookie"];
            if (headers.location) {
                headers["cross-location"] = headers.location;
                delete headers.location;
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