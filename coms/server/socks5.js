var net = require('net');
var noAuth = 0;
var gssApi = 1;
var upPair = 2;
var noAble = 0xff;
var connected = new Uint8Array([
    0x5, 0x00, 0x00,
]);
var onShaked = function (buff) {
    console.log(buff, 'shaked');
    switch (buff[1]) {
        case 0x01:// connect
            var domain = null, domainLength = 0, port = null;
            switch (buff[3]) {
                case 0x01:// ipv4
                    domainLength = 4;
                    domain = buff.slice(4, 4 + domainLength);
                    domain = Array.apply(null, domain).join('.');
                    port = buff.readUInt16BE(8);
                    break;
                case 0x03:// 域名
                    var domainLength = buff[4]; // 获取域名长度
                    domain = buff.slice(5, 5 + domainLength);
                    domain = domain.toString(); // 获取域名
                    port = buff.readUInt16BE(5 + domainLength); // 获取端口号
                    domainLength++;
                    break;
                case 0x04:// ipv6
                    domain = [];
                    domainLength = 16;
                    for (var cx = 4, dx = 4 + domainLength; cx < dx; cx += 2) {
                        domain.push(buff.slice(cx, cx + 2).toString("hex"))
                    }
                    domain = domain.join(':');
                    port = buff.readUInt16BE(20, 22);
                    break;
                default:
                    this.end();

            }
            // 创建到目标服务器的连接
            var bounddAddress = buff.slice(3, 4 + domainLength + 2);
            var target = net.createConnection(port, domain, () => {
                this.write(Buffer.concat([connected, bounddAddress]))
            });
            target.on('error', (error) => {
                switch (error.code) {
                    case "ECONNREFUSED":
                        this.end(new Uint8Array([version, 0x05]));
                        break;
                    default:
                        this.end(new Uint8Array([version, 0x04]));
                        break;
                }
            })
            target.on('data',
                buff => this.write(buff)
            );
            this.pipe(target); // 将客户端数据转发到目标服务器
            break;
        default:
            this.end();
            break;
    }
}
var pickSock5 = function (buff) {
    var version = buff[0];
    if (version !== 0x05) return;
    this.socks5 = true;
    var methods = buff.slice(2, 2 + buff[1]);
    var support = null;
    find: for (var m of methods) switch (m) {
        case noAuth: support = m; break find; // 仅支持无密码方案
    }
    if (support !== null) {
        this.once('data', onShaked);
    }
    else {
        support = noAble;
    }
    this.write(new Uint8Array([version, support]));
    return false;
};
var onConnection = (clientSocket) => {
    // 处理客户端数据
    clientSocket.prependOnceListener('data', pickSock5);
};
// net.createServer(onConnection).listen(1080);

module.exports = onConnection;