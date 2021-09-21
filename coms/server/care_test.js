var http = require("http");
var count = 1000000, cx = 0;
var requests = [];
var run = function () {
    if (cx >= count) return;
    cx++;
    if (cx % 1000 === 0) console.log(cx);
    var req = http.request({
        method: 'options',
        path: `/:care-${Math.random().toString(36).slice(2, 6)}`,
        host: '::',
        port: 80
    }, function (res) {
        res.pipe(process.stdout);
    });
    req.setTimeout(100);
    req.on('timeout', () => {
        run();
    });
    req.on('error', (e) => {
        console.log(String(e));
        run();
    });
    req.end();
};
new Array(1000).fill(0).forEach(run);
