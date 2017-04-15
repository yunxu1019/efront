/* 
 * 不枝雀
 * 2017-4-5 22:38:04
 */
var cluster = require("cluster");
if (cluster.isMaster) {
    return function () {
        var killing;
        var cpus = require('os').cpus();
        var counter = 0;
        server = cpus.map(function () {
            counter++;
            return cluster.fork().on("exit", function () {
                counter--;
                if (!counter && killing) {
                    process.exit();
                }
            });
        });
    }();
}
//子线程们
var compile = "process/compile";
console.info(`process ${process.pid} start at ${Date()}`);
process.on("message", function (msg) {
    switch (msg) {
        case "quit":
            console.info(`process ${process.pid} ended at ${Date()}`);
            process.exit();
            break;
    }
});

// 仅做开发使用的简易服务器
var http = require("http");
// build mime
var doGet = require("./doGet");
var doPost = require("./doPost");
// create server
var server = http.createServer(function (req, res) {
    if (req.method === "POST") {
        return doPost(req, res);
    } else {
        return doGet(req, res);
    }
});
server.listen(80);
server.on("error", function () {
    console.info("server is already running!");
});
server.on("listening", function () {
    console.info("server start success!");
});