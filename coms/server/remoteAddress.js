module.exports = function (req) {
    return req.socket ? req.socket.remoteAddress : req.remoteAddress;
}