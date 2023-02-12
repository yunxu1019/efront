var cross = cross_.bind(function (callback, onerror) {
    var response, responseObject, responseType = "", decoder, error;
    var xhr = {
        status: 0,
        readyState: 0,
        method: null,
        url: null,
        http: null,
        headers: {},
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
            var { hostname, port, path, auth } = parseURL(this.url);
            if (data instanceof FormData) data = String(data);
            if (data) {
                data = Buffer.from(data);
                this.headers["Content-Length"] = data.length;
            }
            var options = {
                method: this.method,
                hostname,
                port,
                path,
                auth,
                headers: this.headers,
            };
            var req = this.http.request(options, function (res) {
                var data = [];
                xhr.status = res.statusCode;
                xhr.responseHeaders = res.headers;
                res.on("data", function (chunk) {
                    xhr.readyState = 4;
                    data.push(chunk);
                });
                res.on("end", function () {
                    response = Buffer.concat(data);
                    xhr.readyState = 4;
                    callback();
                });
                var onerror1 = function (e) {
                    xhr.readyState = 4;
                    error = e;
                    onerror(e);
                };
                res.on("error", onerror1);
                res.on('timeout', onerror1);
                this.readyState = 2;
            });
            this.readyState = 1;
            req.setTimeout(3000);
            if (data) req.end(data);
            else req.end();
        },
        open(method, url) {
            this.method = method;
            this.url = url;
            this.status = 0;
            this.readyState = 0;
            response = null;
            responseObject = null;
            error = null;
            var http;
            if (/^http\:/i.test(url)) {
                http = require("http");
            }
            else {
                http = require("https");
            }
            this.http = http;
        },
        get responseType() {
            return responseType;
        },
        set responseType(v) {
            if (v === "document") return;
            if (this.status !== 0) throw new Error("状态错误");
            responseType = v;
        },
        setRequestHeader(key, value) {
            this.headers[key] = value;
        },
        overrideMimeType(type) {
            responseType = type;
            if (/gb(k|2312|18030)/.test(type)) {
                decoder = require("./gbk2utf8");
            }
        },
    };
    return xhr;
}, null, undefined);
cross.hostCookie = function (xhr) {
    if (xhr.cookie) return xhr.cookie;
    return xhr.cookie = cookie.new();
};