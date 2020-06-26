var http = require("http");
var count = 1000000, cx = 0;
var run = function () {
    if (cx >= count) return;
    cx++;
    if (cx % 1000 === 0) console.log(cx);
    var req = http.request({
        method: 'options',
        path: `/:cast-${Math.random().toString(36).slice(2)}?${String(cx).padStart(40, '0')}`,
        host: '::',
        port: 80
    }, function (res) {
        res.on('end', d => { });
        res.on('data', d => { });
        run();
    });
    req.end();
};
new Array(1000).fill(0).forEach(run);