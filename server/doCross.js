var URL = require("url");
var headersKeys = "Content-Type,User-Agent,Accept-Language,Accept-Encoding".split(",");
function cross(req, res) {
    var parsed = URL.parse(req.url);
    var search = parsed.search;
    try {
        var response = "";
        var $cross = JSON.parse(decodeURIComponent(search.slice(1)));
        if (!$cross.token) throw new Error("验证身份失败！");
        var
            $url = $cross['url'],
            // $data = $cross['data'],//不再接受数据参数，如果是get请直接写入$url，如果是post，请直接post
            $method = $cross['method'] || req.method,//$_SERVER['REQUEST_METHOD'];
            $headers = $cross['headers'];
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
        }, require("url").parse($url)), function (response) {
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
        request.setTimeout(1);
        var ContentLength = req.headers["Content-Length"];
        if (ContentLength) {
            request.setHeader("Content-Length", $data.length)
        }
        for (var k in $headers) {
            request.setHeader(k, $headers[k]);
        }
        req.pipe(request);
    } catch (e) {
        res.writeHead(403, {});
        res.end(String(e));
    }
}
module.exports = cross;