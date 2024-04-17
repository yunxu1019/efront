var parseCookieFromText = function (cookie) {
    var pairs = cookie.split(/;\s*/);
    var info = {};
    for (var cx = 1, dx = pairs.length; cx < dx; cx++) {
        var kvs = /^(.+?)\=(.+?)$/.exec(pairs[cx]);
        if (!kvs) continue;
        var [, k, v] = kvs;
        k = k.trim().toLowerCase();
        switch (k) {
            case "expires":
                v = +new Date(v);
                break;
            case "max-age":
                k = "expires";
                v = +new Date + v * 1000;
                break;
        }
        info[k] = v;
    }
    var pair = parseKV(pairs[0], ";");
    return [pair, info];
};

class Cookie {
    cookiesMap = {};
}
var CookieProto = Cookie.prototype;
CookieProto.addCookie = function addCookie(cookie_text, originDomain = "") {
    var { cookiesMap } = this;
    originDomain = getDomainPath(originDomain);
    if (!cookie_text) return;
    if (cookie_text instanceof Array) cookie_text = cookie_text.join(",");
    var cookies = cookie_text.replace(/(^|;|,)\s*(expires)=(\w*),([^=]*)(;|$)/ig, "$1$2=$3.$4$5")
        .split(/,\s*/).map(parseCookieFromText);
    for (var cookie of cookies) {
        var [pair, info] = cookie;
        var { path, domain, expires } = info;
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
            if (!cookiesMap[destPath]) {
                cookiesMap[destPath] = {};
            }
            var map = cookiesMap[destPath];
            for (var k in pair) {
                var v = pair[k];
                map[k] = [v, expires];
            }
        }
    }
}

CookieProto.getCookies = function getCookies(domainPath) {
    var { cookiesMap } = this;
    domainPath = getDomainPath(domainPath);
    var cookieObject = {};
    var splited = domainPath.split("/");
    var domain = splited[0];
    var now = +new Date;
    do {
        var copy = splited.slice(0);
        do {
            domainPath = copy.join("/");
            var cookie = cookiesMap[domainPath];
            if (cookie) {
                for (var k in cookie) {
                    if (!cookieObject[k]) {
                        var [cook, expires] = cookie[k];
                        if (expires && expires < now) {
                            delete cookieObject[k];
                            continue;
                        }
                        cookieObject[k] = cook;
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

CookieProto.delCookies = function delCookies(domainPath) {
    var { cookiesMap } = this;
    domainPath = getDomainPath(domainPath);
    var splited = domainPath.split("/");
    var domain = splited[0];
    delete cookiesMap[domain];
}
function getDomainPath(url) {
    var { host, pathname } = parseURL(url);
    if (pathname) return host + pathname;
    return host;
}

CookieProto.linkCookie = function linkCookie(from, to) {
    var { cookiesMap } = this;
    from = getDomainPath(from).replace(/\/$/, '');
    to = getDomainPath(to).replace(/\/$/, '');
    if (cookiesMap[from]) {
        cookiesMap[to] = cookiesMap[from];
    }
    cookiesMap[to] = cookiesMap[from] = extend({}, cookiesMap[to], cookiesMap[from]);
    return to;
}
CookieProto.copyCookie = function copyCookie(from, to) {
    var { cookiesMap } = this;
    from = getDomainPath(from).replace(/\/$,'/, '');
    to = getDomainPath(to).replace(/\/$/, '');
    if (from in cookiesMap) {
        cookiesMap[to] = JSON.parse(JSON.stringify(cookiesMap[from]));
    }
    else {
        delete cookiesMap[to];
    }
}
var defaultCookie = new Cookie;
defaultCookie.new = () => new Cookie;
return defaultCookie;