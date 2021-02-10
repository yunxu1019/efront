var https = require("https");
var http = require("http");
var parseURL = require("../basic/parseURL");
function fetch() {
    var method = 'get', href = '', headers;
    [].forEach.call(arguments, function (arg) {
        if (arg instanceof Object) {
            headers = arg;
        } else if (/:/.test(arg)) {
            href = arg;
        } else if (/^\w+$/.test(arg)) {
            method = arg;
        }
    });
    return new Promise(function (ok, oh) {
        var req = (/^https/i.test(href) ? https : http).request(extend({
            method,
            headers,
        }, parseURL(href)), function (res) {
            var result = [];
            res.on("data", function (buff) {
                result.push(buff);
            });
            res.once("end", function () {
                var data = Buffer.concat(result);
                ok(data);
            });
            res.once("error", oh);
        });
        for (var k in headers) {
            req.setHeader(k, headers[k]);
        }
        req.end();
    });
}