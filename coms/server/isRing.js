var isRing = function (req) {
    var socket = req.socket;
    return socket.localAddress === socket.remoteAddress && socket.localPort === socket.remotePort;
};