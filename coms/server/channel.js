"use strict";
var net = require("net");
/**
 * @type {{[key: string]: Channel}}
 */
var channels = Object.create(null);
class Channel {
    type = '';
    socketCount = 0;
    /**
     * @type {net.Socket}
     */
    [0] = null;
    /**
     * @type {net.Socket}
     */
    [1] = null;
    constructor(size) {
        this.size = size;
    }
    optime = +new Date;
    flush() {
        if (this.socketCount !== 2) return;
        this[1].write(`HTTP/1.1 200 OK${this.type ? '\r\nContent-Type:' + this.type : ''}\r\nContent-Length: ${this.size}\r\nContent-Disposition: attachment\r\n\r\n`);
        this[0].write("HTTP/1.1 200 OK\r\n\r\n");
        var error = function (e) {
            c[1].end();
            c[0].end();
            if (c[1]) c[1].destroy();
            if (c[0]) c[0].destroy();
        };
        var close = function (e) {
            if (c[1]) c[1].destroy();
            if (c[0]) c[0].destroy();
        }
        var c = this;
        this[0].once("error", error);
        this[1].once("error", error);
        this[0].once("close", close);
        this[1].once("close", close);
        this[0].pipe(this[1]);
    }
    addSocketGet(s) {
        if (this.socketCount === 2 || this[1]) return;
        this.socketCount++;
        this[1] = s;
        this.flush();
    }
    addSocketPost(s, t) {
        if (this.socketCount === 2 || this[0]) return;
        this.socketCount++;
        this[0] = s;
        this.type = t;
        this.flush();
    }
}
var socketChannels = new WeakMap;
var channelCount = 0;
/**
 * @param {net.Socket} socket
 */
var createChannel = function (socket, size) {
    if (socketChannels.has(socket)) return socketChannels.get(socket);
    if (channelCount > 200) return;
    for (var cx = 0; cx < 3; cx++) {
        var name = (process.pid + Math.random()).toString(36).slice(0, 10);
        if (!(name in channels)) break;
    }
    if (cx === 3) return;
    socketChannels.set(socket, name);
    channels[name] = new Channel(size);
    channelCount++;
    return name;
};
var getChannel = function (name) {
    return channels[name];
};
var removeChannel = function (name) {
    if (name in channels) delete channels[name], channelCount--;
};
var hasChannel = function (name) {
    return name in channels;
};
require("./recover").objects.push({
    recover(now) {
        var id = 0;
        var lowtime = now - 2000;
        for (var k in channels) {
            var c = channels[k];
            if (c.optime < lowtime) {
                removeChannel(k);
            }
        }
    },
    destroy() {

    }
})
module.exports = {
    getChannel,
    hasChannel,
    removeChannel,
    createChannel,
}