module.exports = function (req) {
    return req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;
}