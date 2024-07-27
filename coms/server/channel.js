"use strict";
var net = require("net");
/**
 * @type {{[key: string]: Channel}}
 */
var channels = Object.create(null);
var message = require("../message");
class Channel {
    waiter = null;
    sender = null;
    offset = 0;
    optime = +new Date;
    constructor(size) {
        this.size = size;
    }
    async flush(id) {
        if (this.sender && this.waiter) {
            try {
                while (this.offset < this.size) {
                    this.optime = +new Date;
                    var data = await message.invoke(this.sender, "channel-read", id);
                    if (!data) {
                        message.send(this.waiter, 'channel-error', [id, i18n`数据异常！`]);
                        break;
                    }
                    await message.invoke(this.waiter, 'channel-write', [id, data, this.offset, this.size]);
                    this.offset += data.length;
                }
                message.send(this.waiter, 'channel-end', id);
                message.send(this.sender, 'channel-end', id);
            } catch (e) {
                message.send(this.waiter, 'channel-error', [id, e]);
            }
            removeChannel(this);
        };
    }
}
var channelCount = 0;
/**
 * @param {net.Socket} socket
 */
var createChannel = function (size) {
    if (channelCount > 2000) return;
    for (var cx = 0; cx < 3; cx++) {
        var name = (process.pid + Math.random()).toString(36).slice(0, 10);
        if (!(name in channels)) break;
    }
    if (cx === 3) return;
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
        var lowtime = now - 2000;
        for (var k in channels) {
            var c = channels[k];
            if (c.optime < lowtime) {
                removeChannel(k);
            }
        }
    },
    destroy() {
        for (var k in channels) removeChannel(k);
    }
})
module.exports = {
    getChannel,
    hasChannel,
    removeChannel,
    createChannel,
}