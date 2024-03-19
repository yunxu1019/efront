/**
 * 请求api的逻辑
 */
var baseUrl = "api";
var runner = null;
var lazyRender = function () {
    dispatch(window, 'render');
};
var REQ = null;
var api = function () {
    var method, uri, parameters, prefix;
    for (let cx = 0, dx = arguments.length; cx < dx; cx++) {
        let arg = arguments[cx];
        switch (typeof arg) {
            case "string":
                if (!uri) {
                    uri = arg;
                    break;
                }
                if (!method) {
                    if (/^\w+$/.test(uri)) {
                        method = uri;
                        uri = arg;
                    } else if (/^\w+$/.test(arg)) {
                        method = arg;
                    }
                    if (method) break;
                }
                if (parameters === void 0) {
                    parameters = arg;
                    break;
                }
                prefix = arg;
                break;
            case "object":
                parameters = arg;
                break;
        }
    }
    if (!method) {
        method = "post";
    }

    if (!uri) {
        throw i18n`不存在uri`;
    }
    if (typeof parameters === "string") {
        prefix = parameters;
        parameters = "";
    }
    prefix = prefix || "";
    var url = baseUrl + uri;
    var req = function () {
        onstart && onstart();
        prefix && console.log(i18n`正在` + prefix);
        var clear = function () {
            req.ing = false;
            api.count--;
            api.inqueue--;
            if (runner === req) {
                runner = null;
            }
            onend && onend();
            isFunction(lazyRender) && lazyRender();
        };
        var xhr_onerror = function () {
            setTimeout(clear);
            if (!navigator.onLine) {
                onerror && onerror(i18n`请求网络失败，请确认网络连接正常！`, -1);
            } else {
                onerror && onerror(xhr.responseText || i18n`无法访问服务器！`, xhr);
            }
            prefix && console.error(prefix + i18n`失败！`);
        };

        var xhr_onload = function () {
            setTimeout(clear);
            var text = xhr.responseText;
            if (text) {
                try {
                    var result = JSON.parse(text);
                    if (result.result === "error") {
                        prefix && console.error(prefix + i18n`失败！`);
                        return onerror && onerror(result.message || prefix + i18n`失败！`, 0);
                    }
                    if (result.result === "timeout") {
                        return onlogout && onlogout(result);
                    }
                    try {
                        onsuccess && onsuccess(result);
                    } catch (e) {
                        onerror && onerror(prefix + i18n`处理返回结果失败！`);
                        console.error(i18n`处理结果失败！`, e);
                    }
                    prefix && console.info(prefix + i18n`成功！`);
                } catch (e) {
                    prefix && console.error(prefix + i18n`失败！`, e);
                    onerror && onerror(xhr.responseText || prefix + i18n`接口返回信息异常！`, 1);
                }
            } else {
                prefix && console.error(prefix + i18n`失败！`);
                onerror && onerror(prefix + i18n`接口未返回信息！`, 2);
            }
        };
        if (REQ) {
            var xhr = REQ(method, url).done(xhr_onload).error(xhr_onerror);
            var setRequestHeader = xhr.setRequestHeader;
            var setted_headers = {};
            xhr.setRequestHeader = function (key, value) {
                if (setted_headers[key]) {
                    if (setted_headers[key] === value) return;
                    console.warn(i18n`屏蔽了重复设置`, key);
                    return;
                }
                setted_headers[key] = value;
                setRequestHeader.call(xhr, key, value);
            };
        } else {
            var xhr = new XMLHttpRequest;
            xhr.open(method, url);
            xhr.onreadystatechange = function () {
                if (xhr.readyState !== 4) return;
                switch (xhr.status) {
                    case 0:
                    case 200:
                    case 201:
                    case 304:
                        xhr_onload(xhr);
                        break;
                    default:
                        xhr_onerror(xhr);
                }
            }
        }

        if (xhr.upload) xhr.upload.onprogress = function (event) {
            onupload && onupload(event, xhr);
            req.up_total = event.total;
            req.up_loaded = event.loaded;
            req.up_scale = event.loaded / event.total;
        };
        xhr.onabort = function (event) {
            setTimeout(clear);
            onerror && onerror(i18n`请求取消！`);
            return xhr;
        };
        xhr.onprogress = function (event) {
            setTimeout(ondownload, 0, event);
        };
        xhr.ontimeout = function () {
            setTimeout(clear);
            onerror && onerror(i18n`请求超时！`);
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
                case "[object Array]":
                    parameters = JSON.stringify(parameters);
                    if (parameters === "{}" || parameters === "[]") {
                        parameters = "";
                        break;
                    }
                    if (!/get/i.test(method)) xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                    break;
                case "[object Undefined]":
                    break;
                case "[object FormData]":
                    break;
                default:
                    console.warn(i18n`不支持的数据格式`, {}.toString.call(parameters));
            }
        }
        for (let k in useXMLHttpRequestHeaders) {
            xhr.setRequestHeader(k, useXMLHttpRequestHeaders[k]);
        }
        var headers = api.headers;
        for (var k in headers) {
            xhr.setRequestHeader(k, headers[k]);
        }
        req.up_scale = 0;
        if (parameters) xhr.send(parameters);
        else xhr.send();
        req.abort = req.cancel = function () {
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
        onerror = a => {
            try { _error(a) } catch (e) {
                isFunction(api.onerror) ? api.onerror(a) : alert.error(a);
            }
        };
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
    req.abort = req.cancel = function () { };

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
            console.log(i18n`队列有${api.inqueue}个请求`);
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
var useXMLHttpRequestHeaders = {
    // "X-Requested-With": "XMLHttpRequest"
};

api.setBaseUrl = function (url, cross) {
    baseUrl = url;
    REQ = cross;
};
api.setHeaders = function (object, notclear) {
    if (notclear === false) {
        useXMLHttpRequestHeaders = {};
    }
    extend(useXMLHttpRequestHeaders, object);
};
api.newBaseUrl = function (url) {
    return function () {
        var savedUrl = baseUrl;
        baseUrl = url;
        var req = api.apply(null, arguments);
        baseUrl = savedUrl;
        return req;
    }
};
api.setLazyRender = function (render) {
    lazyRender = render;
};