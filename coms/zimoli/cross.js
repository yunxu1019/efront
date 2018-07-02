var cookiesMap = {};
var domainReg = /^https?\:\/\/(.*?)(\/.*?)?(?:[\?#].*)?$/i;
var base = domainReg.test(location.href) ? "/" : "http://efront.cc/";
var HeadersKeys = ["Content-Type"];
var cookieItemsInSessionStorageKey = "--zimoli-coms-cross";
var cookiesData = sessionStorage.getItem(cookieItemsInSessionStorageKey);
if (cookiesData) {
    try {
        extend(cookiesMap, JSON.parse(cookiesData));
    } catch (e) {
        console.warn("加载cookie出错！");
    }
}
function getDomainPath(url) {
    return url.replace(domainReg, "$1$2");
}
function getRequestProtocol(url) {
    if (/^https:/i.test(url)) {
        return "https";
    }
    return "http";
}
function getCookies(domainPath) {
    var cookieObject = {};
    var splited = domainPath.split("/");
    var domain = splited[0];
    do {
        var copy = splited.slice(0);
        do {
            domainPath = copy.join("/");
            var cookie = cookiesMap[domainPath];
            if (cookie) {
                for (var k in cookie) {
                    if (!cookieObject[k]) {
                        cookieObject[k] = cookie[k];
                    }
                }
            }
            copy.pop();
        } while (copy.length);
        domain = domain.replace(/^.*?(\.|$)/, "");
        splited[0] = domain;
    } while (domain.length);
    return serialize(cookieObject, ";");
}
function addCookie(cookie, originDomain = "") {
    if (cookie) {
        clearTimeout(addCookie.save_timer);
        addCookie.save_timer = setTimeout(function () {
            sessionStorage.setItem(cookieItemsInSessionStorageKey, JSON.stringify(cookiesMap));
        }, 20);
        cookie.replace(/(^|;|,)\s*(expires)=(\w*),([^=]*)(;|$)/ig, "$1$2=$3.$4$5")
            .split(/,\s*/).map(function (cookie) {
                var cookieObject = {};
                var result = cookie.split(/;\s*/);
                result.slice(1).map(function (kev) {
                    var kvs = /^(.+?)\=(.+?)$/.exec(kev);
                    if (kvs) {
                        var [, k, v] = kvs;
                        cookieObject[k.toLowerCase()] = v;
                    }
                });
                var { path, domain } = cookieObject;
                if (!domain) {
                    domain = originDomain.replace(/[^\/]+$/, "");
                }
                if (/^\./.test(domain)) {
                    domain = domain.replace(/^\.+/, "");
                }
                var destPath;
                if (/^\//.test(path)) {
                    destPath = domain.replace(/\/.*$/, "") + path;
                } else {
                    destPath = domain;
                }
                destPath = destPath.replace(/\/+$/, "");
                if (originDomain.indexOf(destPath) >= 0) {
                    var cookieMap = parseKV(result[0], ";");
                    if (!cookiesMap[destPath]) {
                        cookiesMap[destPath] = cookieMap;
                    } else {
                        extend(cookiesMap[destPath], cookieMap);
                    }
                }
            });
    }
}
function isChildPath(relative, path) {
    return relative.replace(/^(.*\/)[^\/]*$/, path);
}
var digest = function () {
    if (cross.digest instanceof Function) cross.digest();
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
    var xhr = new XHR;
    xhr.open(method, base + encodeURIComponent(JSON.stringify({
        url,
        token: "0",
        headers: _headers
    })));
    HeadersKeys.map(function (k) {
        if (_headers[k]) xhr.setRequestHeader(k, _headers[k]);
        delete _headers[k];
    });

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.getResponseHeader) {
                var cookie = xhr.getResponseHeader("cross-cookie");
                addCookie(cookie, originDomain);
            }
            switch (xhr.status) {
                case 0:
                case 200:
                case 304:
                    onload(xhr);
                    break;
                case 302:
                case 301:
                    if (xhr.isRedirected > 2) break;
                    var location = xhr.getResponseHeader("cross-location");
                    if (!domainReg.test(location)) {
                        if (/^\//.test(location)) {
                            location = originDomain.replace(/\/.*$/, location);
                        } else {
                            location = originDomain.replace(/[^\/+]$/, location);
                        }
                        location = getRequestProtocol(url) + "://" + location;
                    }
                    var crs = cross("get", location, headers);
                    crs.isRedirected = (xhr.isRedirected || 0) + 1;
                    onload && crs.done(onload, false);
                    onerror && crs.error(onerror, false);
                    break;
                default:
                    onerror(xhr);
            }
        }
    };
    setTimeout(function () {
        if (jsondata && !datas) {
            datas = JSON.stringify(jsondata);
            xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        }
        send.call(xhr, datas);
    }, 0);
    var onload = function (xhr) {
        if (xhr.decoder) {
            xhr = xhr.decoder(xhr);
        }
        onloads.map(e => e instanceof Function && e(xhr));
        digest();
    };
    var onerror = function (xhr) {
        onerrors.map(e => e instanceof Function && e(xhr));
        digest();
    };
    var onloads = [], onerrors = [];
    xhr.done = function (on, asqueue = true) {
        if (asqueue) {
            onloads.push(on);
        } else {
            onload = on;
        }
        return xhr;
    };
    var send = xhr.send;
    var datas = "";
    var jsondata = null;
    xhr.json = xhr.data = xhr.send = function (data, value) {
        if (!jsondata) jsondata = {};
        if (data instanceof Object) {
            extend(jsondata, data);
        } else if (value) {
            extend(jsondata, { [data]: value })
        } else if (isString(data) && value !== false) {
            var data = /^\{/.test(data) ? JSON.parse(data) : parseKV(data, "&", "=");
            extend(jsondata, data);
        } else {
            datas = data;
        }
        return xhr;
    };
    xhr.form = function (data) {
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.data(data);
        datas = serialize(jsondata, "&", "=");
    };
    xhr.fail = xhr.error = function (on, asqueue = true) {
        if (asqueue) {
            onerrors.push(on);
        } else {
            onerror = on;
        }
        onerror = on;
        return xhr;
    };
    return xhr;
}
extend(cross, {
    getCookies,
    addCookie
});