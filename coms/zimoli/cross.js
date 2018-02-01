var cookies_map = {};
var base = /^https?:\/\//.test(location.href) ? "/?" : "http://efront.cc/?";
function cross(method, url, headers) {
    var _cookies = cookies_map[url];
    if (_cookies) {
        headers.cookie = _cookies;
    }
    var xhr = new XHR;
    xhr.open(method, base + encodeURIComponent(JSON.stringify({
        url,
        token: "0",
        headers
    })));
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            var status = xhr.status;
            if (status === 0 || status === 200 || status === 304) {
                onload instanceof Function && onload(xhr);
            } else {
                onerror instanceof Function && onerror(xhr);
            }
        }
    };
    setTimeout(function () {
        xhr.send();
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