var http_ = require("http");
var https_ = require("https");
var cross = cross_.bind(function (callback, onerror) {
    var response, responseObject, responseType = "", decoder, error;
    var headers = {};
    var http = null;
    var send = async function (data) {
        var { hostname, port, path, auth } = parseURL(xhr.url);
        if (!port) port = http === https_ ? 443 : 80;
        if (data instanceof FormData) data = String(data);
        if (data) {
            data = Buffer.from(data);
            headers["Content-Length"] = data.length;
        }
        if (/^\[/.test(hostname)) hostname = hostname.replace(/^\[(.*?)\]$/, "$1");
        var options = {
            method: xhr.method,
            hostname,
            port,
            path,
            auth,
            headers: headers,
        };
        if (proxy_url) {
            var proxy = parseURL(proxy_url);
            await new Promise((ok, oh) => (/^https\:/.test(proxy_url) ? https_ : http_).request({
                host: proxy.hostname,
                port: proxy.port,
                method: 'CONNECT',
                path: hostname + ":" + port,
            }).on('connect', function (res, socket, head) {
                if (res.statusCode !== 200) {
                    oh(i18n`代理隧道创建失败，状态码：${res.statusCode}`);
                    return;
                }
                options.agent = new http.Agent({ socket, keepAlive: false });
                ok();
            }).on('error', function (err) {
                console.error(i18n`连接到代理服务器失败：${err}`);
            }).end());
        }
        var onerror1 = function (e) {
            xhr.readyState = 4;
            error = e;
            onerror(e);
        };
        var req = http.request(options, (res) => {
            var data = [];
            xhr.status = res.statusCode;
            xhr.responseHeaders = res.headers;
            var totalSize = 0;
            res.on("data", function (chunk) {
                xhr.readyState = 3;
                totalSize += chunk.length;
                if (totalSize > 2 * 1024 * 1024) {
                    onerror1(new Error(i18n`数据过大`));
                    res.destroy();
                    return;
                }
                data.push(chunk);
            });
            res.on("end", function () {
                response = Buffer.concat(data);
                xhr.readyState = 4;
                callback();
            });
            xhr.readyState = 2;
        });
        xhr.readyState = 1;
        req.on("error", onerror1);
        req.on("timeout", onerror1);
        req.setTimeout(120000);
        if (data) req.end(data);
        else req.end();
    }
    var xhr = {
        status: 0,
        readyState: 0,
        method: null,
        url: null,
        responseHeaders: {},
        get response() {
            if (responseType === "" || responseType === "text") {
                if (this.readyState !== 4) return '';
                return decoder ? decoder(response) : String(response);
            }
            else if (error) return null;
            if (responseObject !== null) return responseObject;
            switch (responseType) {
                case "arraybuffer":
                    return response.buffer;
                case "json":
                    if (!response) return null;
                    responseObject = JSON.parse(decoder ? decoder(response) : String(response));
                    return responseObject;
            }
            return responseObject;

        },
        set response(v) {
            response = v;
        },
        getResponseHeader(key) {
            key = String(key).toLowerCase();
            if (this.responseHeaders[key]) return this.responseHeaders[key];
            if (key === "access-control-expose-headers") {
                return 'set-cookie,location';
            }
            return null;
        },
        send(data) {
            send(data);
        },
        open(method, url) {
            if (http) throw new Error('请不要重新打开！');
            this.method = method;
            this.url = url;
            this.status = 0;
            this.readyState = 0;
            response = null;
            responseObject = null;
            error = null;
            if (/^http\:/i.test(url)) {
                http = http_;
            }
            else {
                http = https_;
            }
        },
        get responseType() {
            return responseType;
        },
        set responseType(v) {
            if (v === "document") return;
            if (this.status !== 0) throw new Error(i18n`状态错误`);
            responseType = v;
        },
        setRequestHeader(key, value) {
            headers[key] = value;
        },
        overrideMimeType(type) {
            responseType = type;
            if (/gb(k|2312|18030)/.test(type)) {
                decoder = decodeGBK;
            }
        },
    };
    return xhr;
}, null, undefined);
cross.hostCookie = function (xhr) {
    if (xhr.cookie) return xhr.cookie;
    return xhr.cookie = cookie.new();
};
var proxy_url = null;
Object.defineProperty(cross, 'proxy', {
    get() {
        return proxy_url;
    },
    set(proxyurl) {
        proxy_url = proxyurl;
    }
})