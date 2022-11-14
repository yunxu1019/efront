"use strict";
var { Http2ServerResponse } = require("http2");
/**
 * @type {Http2ServerResponse[]}
 */
var liveload = module.exports = [];
liveload.version = +new Date;
liveload.reload = function (env) {
    this.version++;
    if (typeof env === 'string') {
        var unloads = [];
        for (var cx = this.length - 1; cx >= 0; cx--) {
            var res = this[cx];
            if (env.indexOf(parseURL(res.referer).pathname.replace(/[^\/]*$/, '')) >= 0) {
                console.log(res.referer)
                unloads.push(res);
                this.splice(cx, 1);
            }
        }
    }
    else if (env) {
        var unloads = [];
        for (var cx = this.length - 1; cx >= 0; cx--) {
            var res = this[cx];
            if (res.env === env) {
                this.splice(cx, 1);
                unloads.push(res);
            }
        }
    } else {
        unloads = this.splice(0, this.length);
    }
    unloads.forEach(res => res.writeHead(200, { "content-type": "text/plain;charset=utf-8" }) | res.end("我不是你的唯一"));
};
/**
 * @param {Http2ServerRequest} req
 * @param {Http2ServerResponse} res
 */
liveload.mount = function (version, res) {
    if (+version !== this.version) return res.end("你的唯一已再生");
    Array.prototype.push.call(this, res);
};