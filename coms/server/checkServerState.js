var checkServerState = function (checkwith, version, reportdata) {
    return new Promise(function (ok, oh) {
        var v = "/:" + version;
        if (reportdata) v += "?" + checkwith;
        var { hostname: host, port, protocol } = parseURL(checkwith);
        if (!protocol) {
            protocol = +port === 443 ? "https" : 'http';
        }
        else protocol = protocol.replace(/\:$/, '');
        if (!port) {
            port = /^https/.test(protocol) ? 443 : 80;
        }
        var http = require(protocol, '');
        var req = http.request({
            method: 'options',
            host,
            port: +port,
            rejectUnauthorized: false,// 放行证书不可用的网站
            path: v,
        }, function (response) {
            req.destroy();
            var powered = response.headers["powered-by"];
            if (reportdata) return ok();
            if (powered === version) {
                ok(i18n`检查到${port}可以正常访问\r\n`);
            } else {
                oh(i18n`端口异常`);
            }
        });
        req.on("error", oh);
        req.end();
    });
};
