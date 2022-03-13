"use strict";
var parseURL = require("../basic/parseURL");
var userdata = require("./userdata");
var { Http2ServerResponse, Http2ServerRequest } = require("http2");
var headersKeys = "Content-Type,Content-Length,User-Agent,Accept-Language,Accept-Encoding,Range,If-Range,Last-Modified".split(",");
var privateKeys = Object.create(null);
"Cookie,Connection,Referer,Host,Origin,Authorization".split(",").forEach(k => privateKeys[k] = privateKeys[k.toLowerCase()] = true);
var record = require("./record");
var options = {};
var crossmark = /[~,;\.&\*\!]/;
// ------------ //////////////1--------------- --/ 2 ----------------- ///// 3 ////////// 4 /////
var matchmark = new RegExp(`^(${crossmark.source}(${crossmark.source}?))${/(.*?)(?:[\,&](.*?))?$/.source}`);
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
    var crypted = /^\/\!/.test(pathname);
    if (crypted) pathname = pathname.slice(0, 2) + encode62.timedecode(pathname.slice(2));
    if (real === undefined && /^https?\:\/\//i.test(hostpath)) {
        var headers = {};
        var realpath = pathname.slice(1);
        hostpath = `${protocol}//${hostname}${port ? ':' + port : ''}/`;
    } else {
        if (crossmark.test(pathname[1])) var slice_end = pathname.indexOf("/", 2);
        else slice_end = pathname.indexOf("@", 2);
        if (slice_end < 0) slice_end = pathname.length;
        var realpath = real ? real.slice(1) : pathname.slice(slice_end + 1) + (search || "");
        var jsonlike = pathname.slice(1, slice_end);
        // //////////////// 1 -- 2 - /// 3 ////////// 4 /////
        var matchlike = matchmark.exec(jsonlike);
        if (!matchlike) matchlike = /^(?:\{|%7b)(s?)(\/|%2f)\2(.*?)\2(.*?)(?:\}|%7d)$/i.exec(jsonlike);
        if (matchlike) {
            // {s//wx2.qq.com/k=v,k=v,k=v}
            // *wx2.qq.com,k=v,k=v,k=v    http only
            // **wx2.qq.com,k=v,k=v,k=v   https only

            var headers = {};
            let [, s, , host, header] = matchlike;
            if (crossmark.test(s)) s = s.length > 1 ? 's' : '';
            var hostpath = `http${s}://${host}/`;
            if (header) header.split(/[,&]/).forEach(function (kv) {
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
    return { jsonlike, realpath, hostpath, headers, crypted };
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
var { Transform } = require("stream");
var utf8error = { "content-type": "text/plain;charset=utf-8" };
/**
 * 
 * @param {Http2ServerRequest} req 
 * @param {Http2ServerResponse} res 
 * @param {string|undefined|boolean} referer 
 */
async function cross(req, res, referer) {
    try {
        if (referer) {
            var { jsonlike, realpath, hostpath, headers } = parseUrl(referer, req.url);
            req.url = "/" + unescape(jsonlike) + (crossmark.test(jsonlike[0]) ? "/" : "@") + realpath;
        }
        var { jsonlike, realpath, hostpath, headers, crypted } = parseUrl(req.url);
        if (crypted) crypted = await userdata.getRequestCode(req);
        if (crypted && /https?:\/\/\//.test(hostpath)) return res.end(encode62.timeencode(crypted));
        if (/^&/.test(jsonlike)) hostpath = req.protocol + hostpath.replace(/^https?:/i, "");
        var $url = hostpath + realpath;
        // $data = $cross['data'],//不再接受数据参数，如果是get请直接写入$url，如果是post，请直接post
        var method = req.method;//$_SERVER['REQUEST_METHOD'];
        var _headers = req.headers;
        req.referer = _headers.referer;
        if (cross.referer.test(_headers.referer) && !headers.referer) {
            headers.referer = hostpath + parseUrl(_headers.referer, false).realpath;
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
        if (crypted) delete headers["content-length"];
        var request = http.request(Object.assign({
            method: method,
            headers: headers,
            rejectUnauthorized: false// 放行证书不可用的网站
        }, parseURL($url), options), function (response) {
            var headers = response.headers;
            var exposeHeaders = [];
            var setCookie = headers["set-cookie"];
            if (setCookie && (req.referer || crypted) && referer === false) {
                if (crypted) setCookie = setCookie.map(e => encode62.safeencode(e, crypted));
                headers["efront-cookie"] = setCookie;
                delete headers["set-cookie"];
                exposeHeaders.push("efront-cookie");
            }
            a: if (headers.location && referer === false) {
                var parsed = parseURL(headers.location);
                if (parsed.host) {
                    var mark = crossmark.test(jsonlike[0]) ? jsonlike[0] : '~';
                    if (parsed.protocol) mark = "~";
                    headers["location"] = "/" + mark + (/^https:/i.test(parsed.protocol || req.protocol) ? mark : "") + parsed.host + parsed.path;
                    break a;
                }
                headers["efront-location"] = headers.location;
                exposeHeaders.push("efront-location");
                delete headers.location;
            }
            headers["access-control-expose-headers"] = exposeHeaders.join();
            delete headers["access-control-allow-origin"];
            delete headers["access-control-allow-methods"];
            delete headers["access-control-allow-credentials"];
            delete headers["access-control-allow-headers"];
            delete headers["cross-origin-resource-policy"];
            if (crypted) delete headers["content-length"];
            if (res instanceof Http2ServerResponse) {
                delete headers["transfer-encoding"];
                delete headers["connection"];
            }
            res.writeHead(response.statusCode, headers);
            if (crypted) {
                var size = 0;
                response = response.pipe(new Transform({
                    transform(chunk, _, ok) {
                        chunk = String(chunk);
                        chunk = encode62.safeencode(chunk, crypted, size);
                        size += chunk.length;
                        ok(null, chunk);
                    }
                }));
            }
            if (!closed) {
                if (/get/i.test(req.method) && (record.enabled || /^[\.&~]/.test(jsonlike)) && response.statusCode === 200) {
                    record($url, request, response, req, res);
                } else {
                    response.pipe(res);
                }
            } else {
                response.destroy();
                res.end();
            }
        });
        var closed = false;
        request.setTimeout(120000/*support for wechat long pull*/);
        request.on("error", function (e) {
            if (closed) return;
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
        if (crypted) {
            var writedLength = 0;
            req = req.pipe(new Transform({
                autoDestroy: true,
                transform(chunk, _, ok) {
                    chunk = String(chunk);
                    try {
                        ok(null, encode62.safedecode(chunk, crypted, writedLength));
                        writedLength += chunk.length;
                    } catch (e) {
                        if (closed) return;
                        closed = true;
                        res.writeHead(403, utf8error);
                        res.end("数据异常！");
                        request.destroy();
                        return;
                    }
                }
            }));
        }
        req.pipe(request);
    } catch (e) {
        res.writeHead(500, utf8error);
        res.end(String(e));
    }
}
cross.prefix = new RegExp(`${/^\//.source}(?:${/\{/.source}|%7b|${crossmark.source}+[^${crossmark.source.replace(/^\[|\]/g, '')}])`, 'i');
cross.referer = new RegExp(`${/^https?\:\/\/[^\/]*/.source}${cross.prefix.source.slice(1)}`, 'i');
module.exports = cross;