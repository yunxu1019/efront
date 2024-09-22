function readRequestAsJson(req, limit = 6000000) {
    var total = 0;
    var data = [];
    return new Promise(function (ok, oh) {
        req.on('data', function (buff) {
            if (total > limit) return;
            total += buff.length;
            if (total > limit) {
                oh(`数据量过大`);
                return;
            }
            data.push(buff);
        });
        req.once('error', oh);
        req.on('end', function () {
            if (total > limit) return;
            try {
                var str = Buffer.concat(data).toString();
                ok(JSON.parse(str));
            }
            catch (e) {
                oh(e);
            }
        });
    })
}