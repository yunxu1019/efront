var Database = require("../database/index");
var database = global.database = new Database;
// database.init();
var _i18n = require("./i18n");
/**
 * 读取参数
 */
function getParameters(req, i18n) {
    return new Promise(function (ok, oh) {
        var chunks = [],
            cached_length = 0;
        req.on("data", function (buff) {
            cached_length += buff.length;
            if (cached_length > 0xffff) { //64k
                delete chunks;
                oh(i18n.the_data_you_send_should_be_less_than("64k"));
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
                oh(i18n.the_data_you_send_can_not_be_parsed_as_json(e));
            }
        });
    });
}
module.exports = function aapibuilder(buffer, filename, fullpath) {
    delete require.cache[fullpath];
    return function ApiManager(req, res) {
        var i18n = _i18n(req.headers["accept-language"] || req.headers["Accept-Language"]);
        var request_accept_time = Date.now();
        return getParameters(req, i18n).then(function (data) {
            try {
                data.req = req;
                data.res = res;
                data.i18n = i18n;
                var api = require(fullpath);
                return Promise.race([api(data, req, res), new Promise((ok, oh) => setTimeout(oh, 2000, "The request was canceled by server!"))])
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
                        res.end(i18n(e));
                    });
            } catch (e) {
                if (typeof e === "number") {
                    res.writeHead(e, {});
                    res.end();
                } else if (e) {
                    res.writeHead(403, {});
                    res.end(i18n(e));
                } else {
                    res.writeHead(500, {});
                    res.end(i18n.server_side_error(e));
                }
            }
        }).catch(function (e) {
            res.writeHead(400, {});
            res.end(i18n(e));
        });
    };
};