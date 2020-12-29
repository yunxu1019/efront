var net = require('net');
var doProxy = function (client) {
    var buffer = Buffer.alloc(16 * 1024), data_length = 0;
    client.on('data', function (data) {
        if (data_length + data.length > buffer.length) {
            client.destroy();
            buffer = null;
            return;
        }
        data.copy(buffer, data_length);
        if (!reach_header_end(buffer, data_length, data_length + data.length)) {
            data_length += data.length;
            return;
        }
        // buffer = buffer.slice(0, data_length + data.length);
        var req = parse_request(buffer);
        client.removeAllListeners('data');
        if (req !== false) relay_connection(req);
    });

    //从http请求头部取得请求信息后，继续监听浏览器发送数据，同时连接目标服务器，并把目标服务器的数据传给浏览器
    function relay_connection(req) {

        //如果请求不是CONNECT方法（GET, POST），那么替换掉头部的一些东西
        if (req.method != 'CONNECT') {
            //先从buffer中取出头部
            var _body_pos = reach_header_end(buffer);
            if (_body_pos < 0) _body_pos = buffer.length;
            var header = buffer.slice(0, _body_pos).toString('utf8');
            //替换connection头
            header = header.replace(/(proxy\-)?connection\:.+\r\n/ig, '')
                .replace(/Keep\-Alive\:.+\r\n/i, '')
                .replace("\r\n", '\r\nConnection: close\r\n');
            //替换网址格式(去掉域名部分)
            if (req.httpVersion == '1.1') {
                var url = req.path.replace(/http\:\/\/[^\/]+/, '');
                if (url.path != url) header = header.replace(req.path, url);
            }
            buffer = Buffer.concat([Buffer.from(header, 'utf8'), buffer.slice(_body_pos)]);
        }

        // //建立到目标服务器的连接
        // var server = net.createConnection(req.port, req.host);
        // //交换服务器与浏览器的数据
        // client.on("data", function (data) { server.write(data); });
        // server.on("data", function (data) { client.write(data); });
        var server = net.createConnection(req.port, req.host);
        server.setTimeout(0);
        client.setTimeout(0);
        server.pipe(client);
        client.pipe(server);
        server.once('error', () => { });
        client.once('error', () => { });
        if (req.method == 'CONNECT') {
            client.write(Buffer.from("HTTP/1.1 200 Connection established\r\nConnection: close\r\n\r\n"));
        }
        else {
            server.write(buffer);
        }
    }
};


/**
* 从请求头部取得请求详细信息
* 如果是 CONNECT 方法，那么会返回 { method,host,port,httpVersion}
* 如果是 GET/POST 方法，那么返回 { metod,host,port,path,httpVersion}
*/
function parse_request(buffer) {
    var s = buffer.toString('utf8');
    var method = s.split('\n')[0].match(/^([A-Z]+)\s/)[1];
    if (method == 'CONNECT') {
        var arr = s.match(/^([A-Z]+)\s([^\:\s]+)\:(\d+)\sHTTP\/(\d\.\d)/);
        if (arr && arr[1] && arr[2] && arr[3] && arr[4])
            return { method: arr[1], host: arr[2], port: arr[3], httpVersion: arr[4] };
    }
    else {
        var arr = s.match(/^([A-Z]+)\s([^\s]+)\sHTTP\/(\d\.\d)/);
        if (arr && arr[1] && arr[2] && arr[3]) {
            var host = s.match(/Host\:\s+([^\n\s\r]+)/)[1];
            if (host) {
                var _p = host.split(':', 2);
                return { method: arr[1], host: _p[0], port: _p[1] ? _p[1] : 80, path: arr[2], httpVersion: arr[3] };
            }
        }
    }
    return false;
}


function reach_header_end(b, start, end) {
    start = start >> 2 << 2;
    for (var cx = start, dx = end - 3; cx < dx; cx++) {
        if (b[cx] == 0x0d && b[cx + 1] == 0x0a && b[cx + 2] == 0x0d && b[cx + 3] == 0x0a) {
            return cx + 4;
        }
    }
    return false;
}
module.exports = doProxy;