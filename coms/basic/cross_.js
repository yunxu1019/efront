var { getCookies, addCookie, delCookies } = cookie;
var { File } = this;
function hasFile(o) {
    if (!File) return false;
    for (var k in o) {
        var v = o[k];
        if (v instanceof Array) {
            for (var v0 of v) {
                if (v0 instanceof File) return true;
            }
        }
        else if (v instanceof File) return true;
    }
    return false;
}
var base = null, location_href = null;
var encrypt = null;
//               /////  1   ////////// 2 /////// 3 ////    4  //
var domainReg = /^(?:(https?)\:)?\/\/(.*?)(?:\/(.*?))?([\?#].*)?$/i;
var setHost = function (host) {
    base = host;
    encrypt = null;
};
var HeadersKeys = ["Content-Type"];
var cors_hosts = [];
function getDomainPath(url) {
    return url.replace(domainReg, "$2/$3");
}
function getRequestProtocol(url) {
    if (/^https:/i.test(url)) {
        return "https:";
    }
    return "http:";
}
function isChildPath(relative, path) {
    return relative.replace(/^(.*\/)[^\/]*$/, path);
}

var getCrossUrl = function (domain, headers, encrypt) {
    if (notCross(domain, encrypt)) return domain;
    var basehost = parseURL(base).host || parseURL(location_href).host;
    if (parseURL(domain).host === basehost) {
        if (!encrypt) return domain;
        domain = domain.replace(domainReg, "/$3$4");
    }
    var originDomain = getDomainPath(domain);
    var _cookies = getCookies(originDomain);
    var _headers = {};
    if (_cookies) {
        _headers.Cookie = _cookies;
    }
    extend(_headers, headers);
    _headers = serialize(_headers);
    if (_headers) _headers = "," + _headers;
    var b = encrypt ? "!" : `*`;
    var ishttps = /^(https\:|s\/\/)/i.test(domain);
    domain = domain
        .replace(/^(s?)(\/\/)/i, "http$1:$2")
        .replace(domainReg, `$2${_headers}/$3$4`)
    if (ishttps) domain = b + domain;
    if (encrypt) domain = encode62.timeencode(encode62.safeencode(domain, encrypt));
    return base + b + domain;
};
function noop() { }
function toResponse() {
    if (this.responseType === 'json') return JSON.stringify(this.response);
    return this.response;
}
/**
 * @this {XMLHttpRequest}
 */
var XMLHttpRequest_abort = function () {
    removeFromList(requests, this);
    delete this.abort;
    if (isFunction(this.abort)) this.abort(this);
};

var form2kv = function (f) {
    var objs = {};
    if (isForm(f)) {
        for (var k of f.keys()) {
            var vs = f.getAll(k);
            if (vs.length === 1) vs = vs[0];
            objs[k] = vs;
        }
    }
    return objs;
};

var kv2form = function (obj, r = new FormData) {
    for (var k in obj) {
        var vs = obj[k];
        if (vs instanceof Array) {
            for (var o of vs) r.append(k, o);
        }
        else r.append(k, vs);
    }
    return r;
};

var isForm = function (f) {
    return FormData && f instanceof FormData;
};
var pkv1 = function (f) {
    return parseKV(f, null);
};
var mergedata = function (cachedata, pkv) {
    var res = null;
    for (var c of cachedata) {
        if (isString(c)) c = /^\s*\{/.test(c) ? JSON.parse(c) : pkv(c);
        else if (isForm(c)) c = form2kv(c);
        if (!res) res = c instanceof Array ? [] : {};
        extend(res, c);
    }
    return res;
};

/**
 * @param { () => XMLHttpRequest } jsonp
 * @this { () => XMLHttpRequest }
 */
function cross_(jsonp, digest = noop, method, url, headers) {
    var originDomain = getDomainPath(url);
    if (!originDomain) throw new Error("路径格式错误！");
    var _cookies = getCookies(originDomain);
    var _headers = {};
    if (_cookies) {
        _headers.Cookie = _cookies;
    }
    extend(_headers, headers);
    if (/^[mc]/i.test(method)) {
        _headers["User-Agent"] = /^m/i.test(method)
            ? "efront/3.25 (iPhone) Safari/602.1"
            : "efront/3.25 (Windows) Chrome/77.0.3865.90";
        method = method.slice(1);
    }
    var loaded, errored;
    var onload = function (data) {
        if (!~requests.indexOf(_xhr)) return;
        removeFromList(requests, _xhr);
        if (xhr.decoder) {
            data = xhr.decoder(data);
        }
        loaded = data;
        flush();
        digest();
    };
    var onerror1 = function (e) {
        if (!~requests.indexOf(_xhr)) return;
        removeFromList(requests, _xhr);
        errored = e || "未知错误！";
        flush();
        digest();
    };
    var onerror = async function (e) {
        if (e.type === 'error') {
            e = { response: "无法访问服务器", toString: toResponse };
        }
        for (var r of reforms) {
            var r = await reform.call(xhr, r, { method, url, status: xhr.status, headers: _headers }, fire, onerror1, e);
            if (r === false) {
                return;
            }
        }
        onerror1(e);
    };
    var flush = function () {
        var then = xhr.then;
        delete xhr.then;
        if (loaded) onloads.forEach(e => e instanceof Function && e(xhr));
        if (errored) onerrors.forEach(e => e instanceof Function && e(errored));
        if (loaded || errored) {
            onloads.splice(0, onloads.length);
            onerrors.splice(0, onerrors.length);
        }
        xhr.then = then;
    };
    if (/^jsonp/i.test(method)) {
        var cb = method.split('\-')[1] || 'callback';
        Promise.resolve().then(function () {
            if (cachedata.length && isEmpty(datas)) {
                datas = mergedata(cachedata);
            }
            if (datas) {
                xhr.src += (/\?/.test(xhr.src) ? "&" : "?") + datas;
            }
        });
        var xhr = jsonp(url, {
            [cb](a) {
                removeFromList(requests, this);
                onload({ status: 200, response: JSON.stringify(a), toString: toResponse });
            }
        });
        xhr.onerror = onerror;
    }
    else {
        var isencrypt = /^[夏商周秦xszq]/i.test(method);
        if (isencrypt) method = method.slice(1);
        var nocross = notCross(url, isencrypt);
        if (nocross) isencrypt = false;
        var callback = async function () {
            if (xhr.getResponseHeader) {
                var exposeHeaders = (!nocross || !location_href) && xhr.getResponseHeader("access-control-expose-headers");
                var exposeMap = {};
                if (exposeHeaders) exposeHeaders.split(",").forEach(h => exposeMap[h.toLowerCase()] = true);
                var exposekey = nocross ? "set-cookie" : "efront-cookie";
                if (exposeMap[exposekey]) {
                    var cookie = xhr.getResponseHeader(exposekey);
                    if (cookie && !xhr.nocookie) {
                        try {
                            if (isencrypt) cookie = encode62.safedecode(cookie, xhr.encrypt);
                        }
                        catch (e) {
                            onerror({ status: xhr.status, response: "Cookie解析异常!", toString: toResponse });
                            return;
                        }
                        addCookie(cookie, originDomain);
                    }

                }
                if (exposeMap["strict-transport-security"] || exposeMap["efront-transport-security"]) {
                    if (!/^https\:\/\/|^s\/\//.test(url)) console.warn("请使用https访问如下路径:" + url);
                }
            }
            if (isencrypt && xhr.response) {
                try {
                    xhr = {
                        status: xhr.status,
                        response: encode62.safedecode(xhr.response || xhr.responseText, xhr.encrypt),
                        getResponseHeader: xhr.getResponseHeader && xhr.getResponseHeader.bind(xhr)
                    };
                    xhr.responseText = xhr.response;
                }
                catch (e) {
                    return onerror({ status: xhr.status, response: "数据无法解析！", toString: toResponse })
                }
            };
            switch (xhr.status) {
                case 0:
                    if (!xhr.response) {
                        onerror({ status: 0, response: "无法访问服务器", toString: toResponse });
                        break;
                    }
                case 200:
                case 201:
                case 202:
                case 203:
                case 204:
                case 205:
                case 206:
                case 304:
                    onload(xhr);
                    break;
                case 302:
                case 301:
                    method = 'get';
                    datas = null;
                    cachedata = [];
                case 307:
                    if (xhr.isRedirected > 2) break;
                    var exposekey = nocross ? "location" : "efront-location";
                    var location = exposeMap[exposekey] && xhr.getResponseHeader(exposekey);
                    if (!domainReg.test(location)) {
                        if (/^\//.test(location)) {
                            location = originDomain.replace(/\/.*$/, location);
                        } else {
                            location = originDomain.replace(/[^\/+]$/, location);
                        }
                        location = getRequestProtocol(url) + "//" + location;
                    }
                    var crs = cross_.call(cross, jsonp, digest, method, location, _headers);
                    crs.isRedirected = (xhr.isRedirected || 0) + 1;
                    crs.done(onload, false);
                    crs.error(onerror, false);
                    if (!isEmpty(datas)) crs.send(datas);
                    break;
                default:
                    onerror(xhr);
            }
        };
        var cross = this;
        var xhr = cross(callback, onerror);
        var send = xhr.send;
        xhr.toString = toResponse;
        if (isencrypt && !encrypt) encrypt = cross.getCode();
        if (isencrypt) xhr.encrypt = encrypt;
        var cachedata = [];
        xhr.json = xhr.data = xhr.send = function (data, value) {
            if (!isEmpty(value)) {
                cachedata.push({ [data]: value });
            }
            else if (!isEmpty(data)) {
                cachedata.push(data);
            }
            return xhr;
        };
        var forceForm = false;
        xhr.form = function (data) {
            forceForm = true;
            xhr.data(data);
        };
        var fire = async function () {
            if (!~requests.indexOf(xhr)) return;
            var code = await xhr.encrypt;
            if (!~requests.indexOf(xhr)) return;
            xhr.encrypt = code;
            var isform = /^f/i.test(method);
            if (isform) {
                if (method === 'form') method = 'post';
                else method = method.slice(1);
            }
            if (forceForm) isform = true;
            if (/^jsonp/i.test(method)) method = "get";
            if (/^(get|head|trace)$/i.test(method)) {
                url = url.replace(/#[\s\S]*/, '');
                if (cachedata.length && isEmpty(datas)) datas = serialize(mergedata(cachedata, pkv1), null);
                if (datas) {
                    url += (/\?/.test(url) ? "&" : "?") + datas;
                    datas = "";
                }
            }
            else if (cachedata.length && isEmpty(datas)) {
                var jsondata = mergedata(cachedata, parseKV);
                if (isform) {
                    var hasfile = hasFile(jsondata);
                    if (hasfile) {
                        datas = kv2form(jsondata);
                    } else {
                        realHeaders["Content-Type"] = "application/x-www-form-urlencoded";
                        datas = serialize(jsondata, "&", "=");
                    }
                } else {
                    datas = JSON.stringify(jsondata);
                    if (datas === "{}" || datas === "[]") {
                        datas = '';
                    } else {
                        realHeaders["Content-Type"] = "application/json;charset=UTF-8";
                    }
                }
            }
            var is_gb2312 = /^[gbk][^e]/i.test(method);
            if (is_gb2312) method = method.slice(1);
            if (nocross) {
                extend(realHeaders, _headers);
                xhr.open(method, url);
            } else {
                xhr.open(method, getCrossUrl(url, _headers, isencrypt && code));
            }
            if (is_gb2312) xhr.overrideMimeType("text/plain; charset=gb2312");
            if (location_href) delete realHeaders.Cookie;
            Object.keys(realHeaders).forEach(key => setRequestHeader.call(xhr, key, realHeaders[key]));
            if (!isEmpty(datas)) send.call(xhr, !isencrypt ? datas : encode62.safeencode(datas, code));
            else send.call(xhr);
            digest();
        };
        Promise.resolve().then(fire);
    }
    var setRequestHeader = xhr.setRequestHeader;
    var realHeaders = Object.create(null);
    xhr.setRequestHeader = function (key, value) {
        realHeaders[key] = value;
    };

    var onloads = [], onerrors = [];
    xhr.done = xhr.success = function (on, asqueue = true) {
        if (!asqueue) onloads.splice(0, onloads.length);
        onloads.push(on);
        flush();
        return xhr;
    };
    var datas = "";
    xhr.fail = xhr.error = function (on, asqueue = true) {
        if (!asqueue) {
            onerrors.splice(0, onerrors.length);
        }
        onerrors.push(on);
        flush();
        return xhr;
    };
    xhr.then = function (ok, oh) {
        onloads.push(ok);
        onerrors.push(oh);
        flush();
    };
    xhr.abort = XMLHttpRequest_abort;
    xhr.delCookies = function () {
        delCookies(originDomain);
        xhr.nocookie = true;
        return xhr;
    };
    xhr.getCookies = function () {
        return getCookies(originDomain);
    };
    requests.push(xhr);
    var _xhr = xhr;
    return xhr;
}
function addDirect(a) {
    if (cors_hosts.indexOf(a) >= 0) return;
    if (typeof a === 'string' || a instanceof RegExp) cors_hosts.push(a);
}
function notCross(domain, encrypt) {
    if (!location_href || !base || !/^https?\:\/\/|^s?\/\//.test(domain)) return true;
    if (location_href === domain.slice(0, location_href.length) ||
        domain.replace(domainReg, '$2') === base.replace(domainReg, '$2') || /^\/[^\/]/.test(domain)) return !encrypt;
    for (var cx = 0, dx = cors_hosts.length; cx < dx; cx++) {
        var host = cors_hosts[cx];
        if (host instanceof RegExp) {
            if (host.test(domain)) return true;
        } else {
            host = host.replace(domainReg, '$2/$3');
            if (domain.replace(domainReg, '$2/$3').slice(0, host.length) === host) return true;
        }
    }
    return false;
}

var requests = [];
var reforms = [];
function reform(r, info, fire, cancel, e) {
    var fired = false;
    return r.call(this, info, function () {
        if (fired) return;
        fired = true;
        fire();
    }, function () {
        if (fired) return;
        fired = true;
        cancel(e);
    })
}
function addReform(r) {
    if (isFunction(r)) reforms.push(r);
}
function getCode() {
    return new Promise((ok, oh) => {
        this('get', base + "!").then((xhr) => { return ok(encode62.timedecode(xhr.response || xhr.responseText)) }, () => {
            return oh('未连接到可加密的服务器！');
        });
    });
}
var bind = cross_.bind;
cross_.bind = function () {
    var cross_ = bind.apply(this, arguments);
    arguments[0].getCode = getCode.bind(cross_);
    extend(cross_, {
        requests,
        abortAll() {
            for (var r of requests) r.abort();
        },
        setHost,
        addReform,
        getCookies,
        addCookie,
        addDirect,
        getCrossUrl
    });
    return cross_;
}
cross_.setHost = setHost;
cross_.setLocation = function (host) {
    location_href = host;
    if (!base) base = /^https?\:/i.test(location_href) ? '/' : "http://efront.cc/";
};