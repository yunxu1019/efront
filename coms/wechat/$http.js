function $http({ method = "get", url, data }) {
    if (/^\/\//.test(url)) {
        url = location.protocol + url;
    } else if (!/^https?:/.test(url)) {
        url = `https://wx2.qq.com/` + url.replace(/^\/+/, "");
    }
    if ($http.injector) {
        var { url = url, data = data } = $http.injector(url, data);
    }
    var xhr = cross(method, url, {
        Referer: "https://wx2.qq.com/?&lang=zh_CN",
        Host: "wx2.qq.com",
        Pragma: "no-cache",
        "Accept-Language": "zh-CN,zh;q=0.9",
        Origin: "https://wx2.qq.com"
    });
    xhr.done(function () {
        render.digest();
    });
    if (data) {
        xhr.send(data)
    }
    extend(xhr, {
        success: xhr.done,
    });
    return xhr;
}
$http.post = function (options, data) {
    options = {
        method: "post",
        url: isString(options) ? options : options.url,
        data: options.data || data
    }
    return $http(options);
}
$http.get = function (options) {
    options = {
        method: "get",
        url: isString(options) ? options : options.url,
        data: options.data || data
    }
    return $http(options);
}
$http.jsonp = function (options) {
    options = {
        method: "get",
        url: isString(options) ? options : options.url,
        data: options.data || data
    }
    return $http(options);
}