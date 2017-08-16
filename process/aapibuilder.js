
var Database = require("../database/index")
global.database = new Database;

/**
 * 读取参数
 */
function getParameters(req) {
    return new Promise(function (ok, oh) {
        var chunks = [],
            cached_length = 0;
        req.on("data", function (buff) {
            cached_length += buff.length;
            if (cached_length > 0xffff) { //64k
                delete chunks;
                oh("parameters too large!");
            } else {
                chunks.push(buff);
            }
        });
        req.on("end", function () {
            var data = Buffer.concat(chunks).toString().trim() || "{}";
            try {
                var json = JSON.parse(data);
                ok(json);
            } catch (e) {
                oh("parse parameters failed!");
            }
        });
    });
}
module.exports = function aapibuilder(buffer, filename, fullpath) {
    delete require.cache[fullpath];
    return function ApiManager(req, res) {
        var request_accept_time = Date.now();
        return getParameters(req).then(function (data) {
            try {
                data.req = req;
                data.res = res;
                var api = require(fullpath);
                return Promise.race([api(data, req, res), new Promise((ok, oh) => setTimeout(oh, 2000, "Timeout!"))])
                    .then(function (result) {
                        res.writeHead(200, {
                            "Content-Type": "text/plain"
                        });
                        res.end(JSON.stringify({
                            result: result,
                            accept_time: request_accept_time,
                            response_time: Date.now()
                        }));
                        delete data.req;
                        delete data.res;
                        delete data;
                    })
                    .catch(function (e) {
                        res.writeHead(500, {});
                        res.end(String(e));
                    });
            } catch (e) {
                if (typeof e === "number") {
                    res.writeHead(e, {});
                    res.end();
                } else if (e) {
                    res.writeHead(403, {});
                    res.end(String(e));
                } else {
                    res.writeHead(500, {});
                    res.end("Server side error!");
                }
            }
        }).catch(function (e) {
            res.writeHead(400, {});
            res.end(e);
        });
    };
};