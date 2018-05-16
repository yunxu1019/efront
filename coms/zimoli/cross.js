var cookiesMap = {};
var domainReg = /^https?\:\/\/(.*?)(\/.*?)?(?:[\?#].*)?$/i;
var base = domainReg.test(location.href) ? "/?" : "http://efront.cc/?";
function getDomainPath(url) {
    return url.replace(domainReg, "$1$2");
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
function isChildPath(relative, path) {
    return relative.replace(/^(.*\/)[^\/]*$/, path);
}
function cross(method, url, headers) {
    var originDomain = getDomainPath(url);
    if (!originDomain) throw new Error("Unsupposed url format!");
    var _cookies = getCookies(originDomain);
    if (_cookies) {
        if (!headers) headers = {};
        headers.Cookie = _cookies;
    }
    var xhr = new XHR;
    xhr.open(method, base + encodeURIComponent(JSON.stringify({
        url,
        token: "0",
        headers
    })));

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.getResponseHeader) {
                var cookie = xhr.getResponseHeader("cross-cookie");
                if (cookie) {
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
            var status = xhr.status;
            if (status === 0 || status === 200 || status === 304) {
                onload instanceof Function && onload(xhr);
            } else {
                onerror instanceof Function && onerror(xhr);
            }
        }
    };
    setTimeout(function () {
        if (xhr.readyState === 1) xhr.send();
    }, 0);
    var onload, onerror;
    xhr.done = function (on) {
        onload = on;
        return xhr;
    };
    xhr.error = function (on) {
        onerror = on;
        return xhr;
    }
    return xhr;
}