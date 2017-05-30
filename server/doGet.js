var getfile = require("../process/getfile");
var path = require("path");
var mimes = require("../process/mime");
var proxy = {};
/**
 * 
 */
module.exports = function (req, res) {
    var url = req.url.replace(/[\?#][\s\S]*/g, "");
    // console.info(req.headers.referer,'req');

    // console.log(req.headers.referer);
    if (proxy[url]) {
        console.info(`Proxy:${url} : ${proxy[url]}`);
        url = proxy[url];
    }
    var data = getfile(url);
    if (!data) {
        res.writeHead(404, {});
        return res.end();
    }
    if (data instanceof Buffer) {
        var extend = url.match(/\.(.*?)$/);
        if (extend) {
            var mime = mimes[extend[1]];
            if (mime) {
                res.writeHead(200, {
                    'Content-Type': mime,
                    "Content-Length": data.length
                });
            }
        }
        res.write(data);
        return res.end();
    } else if (data instanceof Object) {
        var data = data["index.html"];
        if (!data) {
            data = getfile(path.join(url, "/index.html"));
        }
        if (data instanceof Buffer) {
            res.writeHead(200, {
                'Content-Type': mimes.html,
                "Content-Length": data.length
            });
            res.write(data);
            return res.end();
        }
    } else if (typeof data === "string") {
        res.writeHead(301, {
            'Location': data
        });
        return res.end();
    } else {}
    res.writeHead(403, {})
    res.end();
};