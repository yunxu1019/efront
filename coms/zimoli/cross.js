var FormData = this.FormData;
var { cookiesMap, getCookies, addCookie } = cookie;
var saveCookie = lazy(function () {
    sessionStorage.setItem(cookieItemsInSessionStorageKey, JSON.stringify(cookiesMap));
}, 20);
//               /////  1   ////////// 2 /////// 3 ////    4  //
var domainReg = /^(?:(https?)\:)?\/\/(.*?)(?:\/(.*?))?([\?#].*)?$/i;
var base = domainReg.test(location.href) ? '/' : "http://efront.cc/";
var location_host = location.href.replace(domainReg, '$1://$2/');
var setHost = function (host) {
    var parsed = parseURL(host);
    if (!host) return console.error("cross_host格式不正确", host);
    var host = parsed.host + (parsed.pathname || '/');
    host = (/^https/.test(location_host) ? "https://" : "http://") + host;
    base = host;
};
var { efrontURI, cross_host = efrontURI } = this;
if (cross_host) setHost(cross_host);
var HeadersKeys = ["Content-Type"];
var cookieItemsInSessionStorageKey = "--zimoli-coms-cross";
var cookiesData = sessionStorage.getItem(cookieItemsInSessionStorageKey);
var cors_hosts = [];
if (cookiesData) {
    try {
        extend(cookiesMap, JSON.parse(cookiesData));
    } catch (e) {
        console.warn("加载cookie出错！");
    }
}
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
var digest = function () {
    dispatch('render', window);
};

var getCrossUrl = function (domain, headers) {
    if (notCross(domain)) return domain;
    var originDomain = getDomainPath(domain);
    var _cookies = getCookies(originDomain);
    var _headers = {};
    if (_cookies) {
        _headers.Cookie = _cookies;
    }
    extend(_headers, headers);
    _headers = serialize(_headers);
    if (_headers) _headers = "," + _headers;
    return domain
        .replace(/^(s?)(\/\/)/i, "http$1:$2")
        .replace(domainReg, base + `*${/^(https\:|s\/\/)/i.test(domain) ? "*" : ""}$2${_headers}/$3$4`);
};
function cross(method, url, headers) {
    var originDomain = getDomainPath(url);
    if (!originDomain) throw new Error("Unsupposed url format!");
    var _cookies = getCookies(originDomain);
    var _headers = {};
    if (_cookies) {
        _headers.Cookie = _cookies;
    }
    extend(_headers, headers);
    if (/^[mc]/i.test(method)) {
        _headers["User-Agent"] = /^m/i.test(method)
            ? "Efront/1.9 (iPhone) Safari/602.1"
            : "Efront/1.9 (Windows) Chrome/77.0.3865.90";
        method = method.slice(1);
    }
    if (/^jsonp/i.test(method)) {
        var cb = method.split('\-')[1] || 'callback';
        setTimeout(function () {
            if (!isEmpty(jsondata) && isEmpty(datas)) {
                datas = serialize(jsondata);
            }
            if (datas) {
                xhr.src += "&" + datas;
            }
        });
        var xhr = jsonp(url, {
            [cb](a) {
                xhr.response = xhr.responseText = JSON.stringify(a);
                onload(xhr);
            }
        });
        xhr.onerror = function (e) {
            onerror(e);
        };
        xhr.abort = function () {
            removeFromList(requests, this);
            remove(this);
        };
    } else {
        var nocross = notCross(url);
        var xhr = new XMLHttpRequest;
        var abort = xhr.abort;
        xhr.abort = function () {
            xhr.onreadystatechange = null;
            removeFromList(requests, this);
            abort.call(this);
            clearTimeout(sendtimer);
        };

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.getResponseHeader && !nocross) {
                    var cookie = xhr.getResponseHeader("efront-cookie");
                    addCookie(cookie, originDomain);
                    saveCookie();
                }
                switch (xhr.status) {
                    case 0:
                        if (!navigator.onLine) {
                            onerror({ status: "网络断开" });
                            break;
                        }
                        if (!xhr.response) {
                            onerror({ status: "无法访问服务器" });
                            break;
                        }
                    case 200:
                    case 201:
                    case 304:
                        onload(xhr);
                        break;
                    case 302:
                    case 301:
                        if (xhr.isRedirected > 2 || nocross) break;
                        var location = xhr.getResponseHeader("efront-location");
                        if (!domainReg.test(location)) {
                            if (/^\//.test(location)) {
                                location = originDomain.replace(/\/.*$/, location);
                            } else {
                                location = originDomain.replace(/[^\/+]$/, location);
                            }
                            location = getRequestProtocol(url) + "//" + location;
                        }
                        var crs = cross("get", location, headers);
                        crs.isRedirected = (xhr.isRedirected || 0) + 1;
                        crs.done(onload, false);
                        crs.error(onerror, false);
                        break;
                    default:
                        onerror(xhr);
                }
                dispatch(window, 'render');
            }
        };
        var setRequestHeader = xhr.setRequestHeader;
        var realHeaders = Object.create(null);
        xhr.setRequestHeader = function (key, value) {
            realHeaders[key] = value;
        };
        xhr.then = function (ok, oh) {
            onloads.push(ok);
            onerrors.push(oh);
            flush();
        };
        var fire = function () {
            var isform = /^f/i.test(method);
            if (isform) {
                if (method === 'form') method = 'post';
                else method = method.slice(1);
            }
            if (!isEmpty(jsondata) && isEmpty(datas)) {
                if (/^(get|head|trace)$/i.test(method)) {
                    url = url.replace(/#[\s\S]*/, '');
                    datas = serialize(jsondata);
                    if (datas) url += (/\?/.test(url) ? "&" : "?") + datas;
                } else if (isform) {
                    xhr.form(jsondata);
                } else {
                    datas = JSON.stringify(jsondata);
                    if (datas === "{}" || datas === "[]") {
                        datas = '';
                    } else {
                        realHeaders["Content-Type"] = "application/json;charset=UTF-8";
                    }
                }
            }
            if (nocross) {
                extend(realHeaders, _headers);
                xhr.open(method, url);
            } else {
                xhr.open(method, getCrossUrl(url, _headers));
            }
            Object.keys(realHeaders).forEach(key => setRequestHeader.call(xhr, key, realHeaders[key]));
            send.call(xhr, datas);
            digest();
        };
        var sendtimer = setTimeout(fire, 0);
    }
    var loaded, errored;
    var onload = function (xhr) {
        removeFromList(requests, xhr);
        if (xhr.decoder) {
            xhr = xhr.decoder(xhr);
        }
        loaded = xhr;
        flush();
        digest();
    };
    var onerror1 = function (e) {
        removeFromList(requests, e);
        errored = e || "未知错误！";
        flush();
        digest();
    };
    var onerror = async function (e) {
        for (var r of reforms) {
            var r = await reform(r, { method, url, status: xhr.status, headers: _headers }, fire, onerror1, e);
            if (r === false) return;
        }
        onerror1(e);
    };
    var flush = function () {
        var then = xhr.then;
        delete xhr.then;
        if (loaded) onloads.splice(0, onloads.length).map(e => e instanceof Function && e(xhr));
        if (errored) onerrors.splice(0, onerrors.length).map(e => e instanceof Function && e(errored));
        xhr.then = then;
    };
    var onloads = [], onerrors = [];
    xhr.done = xhr.success = function (on, asqueue = true) {
        if (!asqueue) onloads.splice(0, onloads.length);
        onloads.push(on);
        flush();
        return xhr;
    };
    var send = xhr.send;
    var datas = "";
    var jsondata = null;
    xhr.json = xhr.data = xhr.send = function (data, value) {
        if (!jsondata && !(isEmpty(data) && isEmpty(value))) jsondata = data instanceof Array ? [] : {};
        if (FormData && data instanceof FormData) {
            datas = data;
        } else if (isObject(data) && !isFile(data)) {
            extend(jsondata, data);
        } else if (!isEmpty(value)) {
            extend(jsondata, { [data]: value });
        } else if (isString(data) && value !== false && /^\s*\{|\=/.test(data)) {
            var data = /^\s*\{/.test(data) ? JSON.parse(data) : parseKV(data, "&", "=");
            extend(jsondata, data);
        } else {
            datas = data;
        }
        return xhr;
    };
    xhr.form = function (data) {
        xhr.data(data);
        if (FormData) {
            datas = new FormData;
            for (var k in jsondata) {
                datas.append(k, jsondata[k]);
            }
        } else {
            realHeaders["Content-Type"] = "application/x-www-form-urlencoded";
            datas = serialize(jsondata, "&", "=");
        }
    };
    xhr.fail = xhr.error = function (on, asqueue = true) {
        if (!asqueue) {
            onerrors.splice(0, onerrors.length);
        }
        onerrors.push(on);
        flush();
        return xhr;
    };
    requests.push(xhr);
    return xhr;
}
function addDirect(a) {
    if (cors_hosts.indexOf(a) >= 0) return;
    if (typeof a === 'string' || a instanceof RegExp) cors_hosts.push(a);
}
function notCross(domain) {
    if (location_host === domain.slice(0, location_host.length) || !/^https?\:\/\/|^s?\/\//.test(domain)) return true;
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
    return r(info, function () {
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
extend(cross, {
    requests,
    abortAll() {
        var rs = requests.splice(0, requests.length);
        for (var r of rs) r.abort();
    },
    setHost,
    addReform,
    getCookies,
    saveCookie,
    addCookie,
    addDirect,
    getCrossUrl
});