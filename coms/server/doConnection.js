var memery = require("../efront/memery");
var pickSocks5 = require("./socks5");
var stun = require("./stun");
var picks = [];
if (!memery.noproxy) {
    picks.push(pickSocks5);
}
picks.push(stun);

var pick = function (data) {
    for (var p of picks) {
        p.call(this, data)
        if (this.picked) return;
    }
}
var onConnection = (clientSocket) => {
    // 处理客户端数据
    clientSocket.prependOnceListener('data', pick);
};
// net.createServer(onConnection).listen(1080);
return onConnection;
