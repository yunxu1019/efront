"use strict";
var Database = require("./database/index");
var database = global.database = new Database;
var message = require("./message");
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

/**
 * 
 */
function request(){

}
module.exports = function aapibuilder(buffer, filename, fullpath) {
    delete require.cache[fullpath];
    message.abpi({fullpath});
    return function ApiManager(req, res) {
        var i18n = _i18n(req.headers["accept-language"] || req.headers["Accept-Language"]);
        var request_accept_time = Date.now();
        return getParameters(req, i18n).then(function (data) {
            try {
                var api = require(fullpath);
                return Promise.race([api(data, { req, res, i18n, message }), new Promise((ok, oh) => setTimeout(oh, 2000, "The request was canceled by server!"))])
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