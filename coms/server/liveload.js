"use strict";
var { Http2ServerResponse } = require("http2");
/**
 * @type {Http2ServerResponse[]}
 */
var liveload = module.exports = [];
liveload.version = +new Date;
liveload.reload = function () {
    this.version++;
    this.splice(0).forEach(res => res.writeHead(200, { "content-type": "text/plain;charset=utf-8" }) | res.end("我不是你的唯一"));
};
/**
 * @param {Http2ServerRequest} req
 * @param {Http2ServerResponse} res
 */
liveload.mount = function (version, res) {
    if (+version !== this.version) return res.end("你的唯一已再生");
    Array.prototype.push.call(this, res);
};