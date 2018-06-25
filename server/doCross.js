"use strict";
var URL = require("url");
var headersKeys = "Content-Type,Content-Length,User-Agent,Accept-Language,Accept-Encoding,Range,If-Range,Last-Modified".split(",");
function cross(req, res, referer) {
    if (referer) {
        var { pathname, search } = URL.parse(referer);
    } else {
        var { pathname, search } = URL.parse(req.url);
    }
    var slice_end = pathname.indexOf("@");
    if (slice_end < 0) {
        slice_end = pathname.length;
    }
    var jsondata = decodeURIComponent(pathname.slice(1, slice_end));
    var realpath = referer ? req.url.slice(1) : pathname.slice(slice_end + 1) + (search || "");
    if (referer) {
        var redirect = "/" + encodeURIComponent(jsondata) + "@" + realpath;
        res.writeHead(302, {
            "Location": redirect
        });
        return res.end();
    }
    try {
        var $cross = JSON.parse(jsondata);
        if (!$cross.token) throw new Error("验证身份失败！");
        var
            $url = encodeURI($cross['url'] + realpath),
            // $data = $cross['data'],//不再接受数据参数，如果是get请直接写入$url，如果是post，请直接post
            $method = $cross['method'] || req.method,//$_SERVER['REQUEST_METHOD'];
            $headers = $cross['headers'] || {};
        var _headers = req.headers;
        headersKeys.forEach(function (key) {
            if (!$headers[key] && _headers[key]) {
                $headers[key] = _headers[key];
            }
        });
        var http;
        if (/^https\:/i.test($url)) {
            http = require("https");
        } else {
            http = require("http");
        }
        var request = http.request(Object.assign({
            method: $method,
            headers: $headers,
            rejectUnauthorized: false// 放行证书不可用的网站
        }, URL.parse($url)), function (response) {
            var headers = response.headers;
            headers.origin && (headers["Access-Control-Allow-Credentials"] = true);
            var setCookie = headers["set-cookie"];
            if (setCookie) headers["cross-cookie"] = setCookie, delete headers["set-cookie"];
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