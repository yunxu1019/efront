/**
 * 请求api的逻辑
 */
var baseUrl = "api";
var runner = null;
var api = function (uri, parameters, prefix) {
    if (!uri) {
        throw '不存在uri';
    }
    if (typeof parameters === "string") {
        prefix = parameters;
        parameters = "";
    }
    prefix = prefix || "";
    var req = function () {
        onstart && onstart();
        prefix && console.log("正在" + prefix);
        var url = baseUrl + uri;
        var clear = function () {
            req.ing = false;
            api.count--;
            api.inqueue--;
            if (runner === req) {
                runner = null;
            }
            onend && onend();
        };
        var xhr = XHR();
        xhr.open('post', url);
        xhr.onload = function () {
            setTimeout(clear);
            var text = xhr.responseText;
            if (text) {
                try {
                    var result = JSON.parse(text);
                    if (result.result === "error") {
                        prefix && console.error(prefix + "失败！");
                        return onerror && onerror(result.message || prefix + "失败！", 0);
                    }
                    if (result.result === "timeout") {
                        return onlogout && onlogout(result);
                    }
                    try {
                        onsuccess && onsuccess(result);
                    } catch (e) {
                        onerror && onerror(prefix + "处理返回结果失败！");
                        console.error('处理结果失败！', e);
                    }
                    prefix && console.info(prefix + "成功！");
                } catch (e) {
                    prefix && console.error(prefix + "失败！", e);
                    onerror && onerror(xhr.responseText || prefix + "接口返回信息异常！", 1);
                }
            } else {
                prefix && console.error(prefix + "失败！");
                onerror && onerror(prefix + "接口未返回信息！", 2);
            }
        };
        if (xhr.upload) xhr.upload.onprogress = function (event) {
            onupload && onupload(event, xhr);
            req.up_total = event.total;
            req.up_loaded = event.loaded;
            req.up_scale = event.loaded / event.total;
        };
        xhr.onabort = function (event) {
            setTimeout(clear);
            onerror && onerror("请求取消！");
            return xhr;
        };
        xhr.onprogress = function (event) {
            setTimeout(ondownload, 0, event);
        };
        xhr.ontimeout = function () {
            setTimeout(clear);
            onerror && onerror("请求超时！");
        };
        xhr.onerror = function () {
            setTimeout(clear);
            if (!navigator.onLine) {
                onerror && onerror("请求网络失败，请确认网络连接正常！", -1);
            } else {
                onerror && onerror("无法访问服务器！", xhr);
            }
            prefix && console.error(prefix + "失败！");
        };
        if (typeof parameters !== "string") {
            switch ({
            }.toString.call(parameters)) {
                case "[object FileList]":
                    var temp = new FormData();
                    for (var cx = 0, dx = parameters.length; cx < dx; cx++) {
                        temp.append('files', parameters[cx]);
                    }
                    parameters = temp;
                    break;
                case "[object File]":
                    var temp = new FormData();
                    temp.append('file', parameters);
                    parameters = temp;
                    break;
                case "[object Object]":
                    parameters = JSON.stringify(parameters);
                case "[object Undefined]":
                    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                    break;
                case "[object FormData]":
                    break;
                default:
                    console.warn("不支持的数据格式", {}.toString.call(parameters));
            }
        }
        xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        var headers = api.headers;
        for (var k in headers) {
            xhr.setRequestHeader(k, headers[k]);
        }
        req.up_scale = 0;
        xhr.send(parameters || "");
        req.cancel = function () {
            xhr.abort();
        };
    };

    var onsuccess = api.onsuccess,
        onerror = api.onerror,
        onupload, onlogout, ondownload, onstart, onend;
    req.onsuccess = function (_success) {
        onsuccess = _success;
        return req;
    };
    req.onlogout = function (_logout) {
        onlogout = _logout;
        return req;
    };
    req.onstart = function (_onsend) {
        onstart = _onsend;
        return req;
    };
    req.onerror = function (_error) {
        onerror = _error;
        return req;
    };
    req.onupload = function (_onprogress) {
        onupload = _onprogress;
        return req;
    };
    req.ondownload = function (_onprogress) {
        ondownload = _onprogress;
        return req;
    };
    req.cancel = function () { };

    req.success = req.onsuccess;
    req.error = req.onerror;
    api.count++;
    api.inqueue++;
    var wait = function () {
        if (isqueue) {
            if (runner) {
                return setTimeout(wait, 30);
            }
            runner = req;
            req();
            console.log("队列有" + api.inqueue + "个请求");
        } else {
            if (req.ing) {
                return;
            }
            req.ing = true;
            req();
        }
    };
    setTimeout(wait);
    var isqueue = false;
    req.queue = function (q) {
        isqueue = q !== false;
        return req;
    };
    req.onend = function (f) {
        onend = f;
        return req;
    };
    return req;
};

api.setBaseUrl = function (url) {
    baseUrl = url;
};