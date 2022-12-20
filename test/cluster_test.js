// https://github.com/nodejs/node/issues/45879
"use strict";
var cluster = require("cluster");
process = Object.create(process);
if (cluster.isWorker) {
    require("http").createServer(function (req) {
        process.send('abc', req.socket);
    }).listen(80);
    process.on('message', function (a) {
        console.log(a);
    })
}
else {
    var w3 = cluster.fork();
    w3.on("message", function (msg, handle) {
        w1.send("handle");
        w1.send(msg, handle);
    })
    var w1 = cluster.fork();
}