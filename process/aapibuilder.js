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
var queue = [];
/**
 * 请求主进程加载或执行相应的api，传入两个参数为执行，一个参数为重载
 * @param {string} fullpath 
 * @param {object} data 
 * @param {object} info
 */
function request(fullpath, data, info) {
    if (queue.length > 200000) {
        return Promise.reject("please wait for a time!");
    }
    var promise;
    if (arguments.length === 1) {
        if (queue.length > 0) {
            queue.splice(1, 0, [fullpath]);
        } else {
            queue.push([fullpath]);
        }
    } else {
        promise = new Promise(function (ok, oh) {
            queue.push([fullpath, ok, oh, data, info]);
        });
    }
    if (queue.length > 1) return promise;
    var runner = function () {
        if (!queue.length) return;
        var args = queue[0];
        var [fullpath, ok, oh, data, info] = args;
        if (args.length === 1) {
            message.abpi({
                fullpath
            }, function (result) {
                queue.shift();
                runner();
            });
        } else {
            message.abpi({
                fullpath,
                data: data,
                info: info
            }, function (result) {
                queue.shift();
                if (result.status === 200) ok(result.result);
                else oh(result.result || result.status);
                runner();
            });
        }
    };
    setTimeout(runner, 0);
    return promise;
}

module.exports = function aapibuilder(buffer, filename, fullpath) {
    delete require.cache[fullpath];
    request(fullpath);
    return function ApiManager(req, res) {
        var i18n = _i18n(req.headers["accept-language"] || req.headers["Accept-Language"]);
        var request_accept_time = Date.now();
        return getParameters(req, i18n).then(function (data) {
            try {
                var info = {
                };
                return Promise.race([request(fullpath, data, info), new Promise(
                    (ok, oh) => setTimeout(oh,/*允许建立20秒以内的长连接*/ 20000, "The request was canceled by server!")
                )])
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
                        res.writeHead(403, {});
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