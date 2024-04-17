"use strict";
var message = require("../message");
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
                oh(i18n`数据大小不能超过${"64k"}。`);
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
                oh(i18n`您提供的数据不能转换成json格式。\r\n${e}`);
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
    if (multithreadingApiMap[fullpath] && arguments.length > 1) {
        return new Promise(function (ok, oh) {
            if (multithreading_requestCount > 20000) {
                return oh(i18n`请过一段时间再试`);
            }
            multithreading_requestCount++;
            message.abpi({
                fullpath,
                data: data,
                info: info
            }, function (res) {
                ok(res);
            }, function (err) {
                oh(err);
            }, function () {
                multithreading_requestCount--;
            });
        });
    }
    if (queue.length > 200000) {
        return Promise.reject(i18n`请过一段时间再试`);
    }
    var promise;
    if (arguments.length === 1) {
        promise = new Promise(function (ok, oh) {
            queue.push([fullpath, ok, oh]);
        })
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
            }, function () {
                queue.shift();
                runner();
            });
        } else {
            message.abpi({
                fullpath,
                data: data,
                info: info
            }, ok, oh, function () {
                queue.shift();
                runner();
            });
        }
    };
    setTimeout(runner, 0);
    return promise;
}
var multithreadingApiMap = {};
var multithreading_requestCount = 0;
var getHeader = require('../server/getHeader');
module.exports = async function aapibuilder(buffer, filename, fullpath) {
    if (require.cache) delete require.cache[fullpath];
    delete multithreadingApiMap[fullpath];
    if (/^\s*(["'`])use multithreading\1/.test(String(buffer))) {
        multithreadingApiMap[fullpath] = true;
    }
    await request(fullpath);
    return function ApiManager(req, res) {
        var i18k = getHeader(req.headers, "accept-language");
        var request_accept_time = +new Date;
        return getParameters(req, i18n).then(function (data) {
            try {
                var info = {
                };
                return Promise.race([request(fullpath, data, info), new Promise(
                    (ok, oh) => setTimeout(oh,/*允许建立20秒以内的长连接*/ 20000, i18n[i18k]`服务器取消了您的请求`)
                )])
                    .then(function (result) {
                        res.writeHead(200, {
                            "Content-Type": "text/plain;charset=utf-8"
                        });
                        res.end(JSON.stringify({
                            result: result,
                            accept_time: request_accept_time,
                            response_time: +new Date
                        }));
                        delete data.req;
                        delete data.res;
                    })
                    .catch(function (e) {
                        res.writeHead(403, {});
                        res.end(e);
                    });
            } catch (e) {
                if (typeof e === "number") {
                    res.writeHead(e, {});
                    res.end();
                } else if (e) {
                    res.writeHead(403, {});
                    res.end(e);
                } else {
                    res.writeHead(500, {});
                    res.end(i18n[i18k]`服务器异常${e}`);
                }
            }
        });
    };
};