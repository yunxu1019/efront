"use strict";
var message = require(".");
var cluster = require("cluster");
if (cluster.isMaster) {
    require("../efront/console");
    var workers = new Array(90).fill(0).map(e => cluster.fork());
    workers.map(worker => worker.on("message", message));
    global.counts = {};
    // process.on("uncaughtException", function(){
    //     console.error.apply(console,arguments);
    // });
    // process.on("unhandledRejection", function(){
    //     console.error.apply(console,arguments);
    // });
} else {
    //子线程们
    message.count({ fullpath: "../efront/enrich", data: "", info: "info" }, function (count) {
        message.log({ log: "info", args: ["count", "123"] });
        message.abpi({ fullpath: "../efront/enrich", data: "", info: "info" });
        process.exit();
    });
}