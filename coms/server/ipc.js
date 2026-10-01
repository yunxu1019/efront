const net = require('net');
var quitme = require("../efront/quitme");
// 动态确定 IPC 路径
const SOCKET_PATH = process.platform === 'win32'
    ? '\\\\.\\pipe\\efront-ipc'  // Windows: 使用命名管道
    : '/tmp/efront-ipc.sock';    // Unix/Linux/Mac: 使用 Unix Domain Socket
/**
 * @type {net.Server}
 */
var server;
var listener = function (socket) {
    socket.on('data', async function (buff) {
        var name = String(buff);
        var i = name.indexOf(" ");
        var type = name.slice(0, i);
        var data = name.slice(i + 1);
        for (var cb of callbacks) {
            var res = await cb(type, data);
            if (res) socket.write(res);
        }
        socket.end();
    });
}

var callbacks = [];
export function listen(cb) {
    if (!server) {
        server = net.createServer(listener);
        server.listen(SOCKET_PATH);
        server.on('error', remove);
        quitme(remove);
    }
    if (cb) callbacks.push(cb);
}

export function ported() {
    return !!server;
}

export function remove() {
    if (server) server.close(), server.removeAllListeners();
    server = null;
}

export function exists() {
    return require('fs').existsSync(SOCKET_PATH);
}

export function dispach(event, data) {
    return new Promise(function (ok) {
        var client = net.createConnection({ path: SOCKET_PATH }, () => {
            if (event && data) event = [event, data].join(' ');
            client.write(event);
        });
        client.on('data', function () {
            client.end();
            ok();
        });
        client.on("close", function () {
            client.destroy();
            ok();
        })
        client.on('error', ok);
    })
}
