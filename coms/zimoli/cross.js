var { cookiesMap, saveCookie } = cookie;
var saveCookie = lazy(function () {
    sessionStorage.setItem(cookieItemsInSessionStorageKey, JSAM.stringify(cookiesMap));
}, 20);
var { efrontURI, cross_host = efrontURI } = this;
var location_href = parseURL(location.href);
location_href = `${location_href.protocol}//${location_href.host}/`;
cross_.setLocation(location_href);

var cookieItemsInSessionStorageKey = "--zimoli-coms-cross";
var cookiesData = sessionStorage.getItem(cookieItemsInSessionStorageKey);
if (cookiesData) {
    try {
        extend(cookiesMap, JSAM.parse(cookiesData));
    } catch (e) {
        console.warn("加载cookie出错！");
    }
}

var digest = function () {
    dispatch('render', window);
};
if (/Trident/i.test(navigator.userAgent)) digest = lazy(digest, 60);
var cross = cross_.bind(function (callback, onerror) {
    var xhr = new XMLHttpRequest;
    var abort = xhr.abort;
    xhr.abort = function () {
        xhr.onreadystatechange = null;
        abort.call(this);
    };
    xhr.onerror = onerror;
    xhr.ontimeout = onerror;
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            switch (xhr.status) {
                case 0:
                    if (!navigator.onLine) {
                        onerror({ status: "网络断开" });
                        break;
                    }
                    break;
                default:
                    if (xhr.response === void 0) {
                        xhr.response = xhr.responseText;
                    }
                    callback();
            }
            saveCookie();
        }
    };

    return xhr;
}, jsonp, digest);

cross.setHost = function (host) {
    var parsed = parseURL(host);
    if (!host) return console.error("cross_host格式不正确", host);
    var host = parsed.host + (parsed.pathname || '/');
    host = (/^https/.test(location_href) ? "https://" : "http://") + host;
    cross_.setHost(host);
};
cross.hostCookie = function (xhr) {
    if (xhr.cookie) return xhr.cookie;
    return cookie;
};
cross.getCookies = function (dp) {
    return cookie.getCookies(dp)
};
cross.addCookie = function (cookie_text, dp) {
    return cookie.addCookie(cookie_text, dp);
};
cross.delCookies = function (dp) {
    return cookie.delCookies(dp);
};
if (cross_host) cross.setHost(cross_host);
