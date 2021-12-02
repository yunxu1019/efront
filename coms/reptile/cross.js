return _cross.bind(function (callback, onerror) {
    var response;
    var xhr = {
        status: 0,
        method: null,
        url: null,
        http: null,
        headers: {},
        response: null,
        getResponseHeader(key) {
            return response.headers[key];
        },
        send(data) {
            var { hostname, port, path, auth } = parseURL(this.url);
            if (data) {
                data = Buffer.from(data);
                this.headers["Content-Length"] = data.length;
            }
            var req = http.request({
                method: this.method,
                hostname,
                port,
                path,
                auth,
                headers: this.headers,
            }, function (res) {
                var data = [];
                var session_text = res.headers["set-cookie"];
                if (session_text instanceof Array) session_text.forEach(t => cookie.addCookie(t));
                else if (typeof session_text === "string") cookie.addCookie(session_text);
                xhr.status = res.statusCode;
                xhr.response = res;
                res.on("data", function (chunk) {
                    data.push(chunk);
                });
                res.on("end", function () {
                    data = Buffer.concat(data);
                    xhr.response = data;
                    callback(res.statusCode, data);
                    console.log(String(data), res.statusCode);
                });
                res.on("error", function (e) {
                    onerror(e);
                });
            });
            if (data) req.end(data);
            else req.end();
        },
        open(method, url) {
            this.method = method;
            this.url = url;
            this.status = 0;
            var http;
            if (/^https?\:/i.test(url)) {
                http = require("http");
            }
            else {
                http = require("https");
            }
            this.http = http;
        },
        setRequestHeader(key, value) {
            this.headers[key] = value;
        },

    };
    return xhr;
}, null, undefined);