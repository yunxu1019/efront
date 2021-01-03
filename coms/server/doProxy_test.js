var net = require('net');
var local_port = 80, real_port;
var proxy = require("./doProxy");
//在本地创建一个server监听本地local_port端口
var proxy_server = net.createServer(function (client) {
    //首先监听浏览器的数据发送事件，直到收到的数据包含完整的http请求头
    client.on('error', client.destroy);

    setTimeout(a => proxy(client), 100);
}).listen(local_port);

process.on("uncaughtException", console.log);
process.on("unhandledRejection", console.log);
proxy_server.once("listening", function () {
    console.log("proxy-server start");
});
proxy_server.on("error", function (a) {
    console.log(a, 'proxy-server error');
})
