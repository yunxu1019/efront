"use strict";
var zlib = require("zlib");
var path = require("path");
var { Http2ServerRequest, Http2ServerResponse } = require("http2");
var filebuilder = require("../efront/filebuilder");
var checkAccess = require("./checkAccess");
var doFile = require("./doFile");
var doCross = require("./doCross");
var memery = require("../efront/memery");
var transfer = require("./transfer");
var parseURL = require("../basic/parseURL");
var isObject = require("../basic/isObject");
var FILE_BUFFER_SIZE = 64 * 1024 * 1024;
var SERVER_ROOT_PATH = memery.webroot;
var Cache = require("./cache");
Cache.mime = mime;
var getfile = function (url, exts) {
    return filecache.seek(url, exts);
};
var filecache = new Cache(SERVER_ROOT_PATH, function (data, filename, fullpath) {
    var origin_size = data.length;
    if (/\.css$/i.test(fullpath)) {
        if (memery.APP) {
            var real = path.dirname(path.relative(SERVER_ROOT_PATH, fullpath).replace(/\\/g, '/'));
            data = Buffer.from(data.toString().replace(/url\s*\(\s*(['"]?)([^\)]*)\1\s*\)/gi, function (a, q, s) {
                if (!/^\/|^\w+\:/i.test(s)) {
                    s = path.join(`/${real}/`, s).replace(/\\/g, '/');
                }
                return `url(${q || ''}${s}${q || ''})`;
            }));
        }
    }
    if (memery.TRANSFER && /\.(m?[tj]sx?|html?|json|css|less)$/i.test(fullpath)) {
        data = Buffer.from(transfer(data));
    }
    var data = filebuilder.call(this, data, filename, fullpath);
    if (data instanceof Function) {
        if (checkAccess(fullpath)) {
            throw i18n`请不要在共享路径中创建服务器脚本！`;
        }
        return data;
    }
    return new Promise(function (ok, oh) {
        data.origin_size = origin_size;
        zlib.gzip(data, function (error, result) {
            if (error) {
                oh(error);
            } else if (data.length > result.length) {
                result.origin_size = origin_size;
                result.isgzip = true;
                ok(result);
            } else {
                ok(data);
            }
        });
    });
}, FILE_BUFFER_SIZE);
var authcache = null, authcount = 0;
var liveload = require("./liveload");
filecache.onreload = function (urls) {
    urls = urls.map(a => path.relative(SERVER_ROOT_PATH, a).replace(/\\/g, '/'));
    for (var u of urls) liveload.reload("/" + u);
}
var message = require("../message");
var setHeader2 = function (k, v) {
    if (this.headersSent !== false) return;
    this.setHeader(k, v);
};
var indexexts = str2array(memery.INDEX_EXTENSIONS);
var denoexts = str2array(memery.DENO_EXTENSIONS);
var indexlist = memery.webindex;
var indexlist2 = [""].concat(indexlist);
var indexexts2 = [""].concat(indexexts);
var denoindex = memery.denoindex;
if (!~denoexts.indexOf("")) denoexts.unshift('');

var indexreg = memery.indexreg;
/**
 * 返回数据
 * @param {Buffer} data 
 * @param {string} url 
 * @param {Http2ServerRequest} req 
 * @param {Http2ServerResponse} res 
 */
var response = function (data, url, req, res) {
    var setHeader = setHeader2.bind(res);
    var requiredVersion = getHeader(req.headers, "if-modified-since");
    if (requiredVersion && data.stat && new Date(requiredVersion) - new Date(data.stat.mtime.toUTCString()) >= 0) {
        res.writeHead(304, {});
    }
    else {
        setHeader("Content-Length", data.length);
        if ("download" in req) setHeader("Content-Disposition", `attachment;filename="${encodeURIComponent(req.download || data.name)}"`);
        if (data.mime) setHeader("Content-Type", data.mime);
        setHeader("Cache-Control", "no-cache");
        if (data.stat) {
            setHeader("Last-Modified", data.stat.mtime.toUTCString());
            if ((data.origin_size || data.length) < data.stat.size) {
                req.url = url;
                return doFile(req, res);
            }
        }
        if (data.isgzip) {
            setHeader("Content-Encoding", "gzip");
        }
        if (res.headersSent === false && !data.mime) res.writeHead(200, utf8);
        res.write(data);
    }
    return res.end();
};
var utf8 = { "Content-Type": "text/plain;charset=utf-8" };
/**
 * 根据数据类型进行不同的响应处理
 * @param {Buffer|Object|string} data 
 * @param {string} url 
 * @param {Http2ServerRequest} req 
 * @param {Http2ServerResponse} res 
 */
var adapter = function (data, url, req, res) {
    if (res.writableEnded || res.finished) return;
    if (data instanceof Function) {
        data = data(req, res);
    }
    if (data instanceof Buffer) {
        message.count({ path: url, update: true });
        return response(data, url, req, res);
    }
    if (data instanceof Error) {
        res.writeHead(404, utf8);
        return res.end(String(data));
    }
    if (data instanceof Promise) {
        return data.then(function (data) {
            return adapter(data, url, req, res);
        }).catch(function (error) {
            res.writeHead(500, utf8);
            res.end(String(error));
        });
    }
    if (isObject(data) && !/\/$/.test(url)) {
        data = url + '/';
    }
    if (typeof data === "string") {
        var new_url = data[0] === "/" ? data : "/" + data;
        new_url = new_url.replace(indexreg, '');
        if (new_url !== req.url) {
            res.writeHead(302, {
                'Location': encodeURI(new_url)
            });
            return res.end();
        }
    }
    if (url) {
        data = getfile(url, req.deno ? denoindex : indexlist);
        return adapter(data, "", req, res);
    }
    if (!req.direct && memery.DIRECT) {
        var direct = req.direct = memery.DIRECT;
        if (typeof direct === 'function') direct = direct(req.url);
        data = getfile(direct, indexlist2);
        return adapter(data, direct, req, res);
    }
    if (typeof memery.TRANSFER === "string") {
        var p = parseURL(memery.TRANSFER);
        req.url = "/" + (/^https:/i.test(p.protocol) ? '~~' : !p.protocol ? "&" : "~") + p.host + p.path + req.url;
        return doCross(req, res);
    }
    res.writeHead(404, utf8);
    res.end(i18n[getHeader(req.headers, "accept-language")]`未找到指定的资源`);
};
/**
 * doGet
 */
var doGet = module.exports = async function (req, res) {
    var url = req.url;
    var download = /\*([\s\S]*)$/.exec(url);
    if (download) req.download = download[1];
    var id = /\:/.test(url) ? url.replace(/^[\s\S]*?\:([\s\S]*?)([\?][\s\S]*)?$/, "$1") : null;
    url = url.replace(/[\:\?#\*][\s\S]*/g, "");
    req.id = id;
    var exts = [''];
    req.deno = /^Deno\//.test(getHeader(req.headers, "user-agent"));
    if (url[url.length - 1] !== '/') exts = req.deno ? denoexts : indexexts2;
    var data = getfile(url, exts);
    if (data instanceof Promise) {
        return data.then(function (data) {
            return adapter(data, url, req, res);
        }).catch(function (error) {
            res.writeHead(500, utf8);
            res.end(String(error));
        });
    } else {
        adapter(data, url, req, res);
    }
};
doGet.reset = function () {
    filecache.reset();
};
doGet.setAuth = function (auth, data) {
    if (isHandled(data)) {
        if (!authcache) authcache = Object.create(null);
        if (auth in authcache) return;
        authcache[auth] = data;
        authcount++;
    }
    else {
        if (!authcache) return;
        if (auth in authcache) {
            delete authcache[auth];
            authcount--;
        }
        if (!authcount) authcache = null;
    }
};
doGet.hasAuth = function (url) {
    return authcache && url in authcache;
};
doGet.auth = function (req, res) {
    var url = req.url;
    response(authcache[url], url, req, res);
};