var https = require("https");
var http = require("http");
function fetch(href) {
    return new Promise(function (ok, oh) {
        (/^https/i.test(href) ? https : http).get(href, function (res) {
            var result = [];
            res.on("data", function (buff) {
                result.push(buff);
            });
            res.once("end", function () {
                var data = Buffer.concat(result);
                ok(data);
            });
            res.once("error", oh);
        }).end();
    });
}