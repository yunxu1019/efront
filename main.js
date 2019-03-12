#!/usr/bin/env node
// 中文编码 utf-8
var isTestMode = process.argv.indexOf("test") >= 0;
var isHelpMode = process.argv.indexOf("help") >= 0;
var isPublicMode = process.argv.indexOf("public") >= 0 || process.argv.indexOf("build") >= 0;
var isWatchMode = process.argv.indexOf("watch") >= 0;
var isServerMode = process.argv.indexOf("server") >= 0;
var isInitCommand = process.argv.indexOf("init") >= 0;
var loadModule = process.argv.slice(2).filter(e => /^https?\:\/\/|\/|\.[tj]sx?$/i.test(e));
if (isHelpMode) {
    console.log("these commands can be used: test server public init watch");
} else if (isTestMode) {
    require("./tester/main");
} else if (isServerMode) {
    require("./server/index");
} else if (isPublicMode) {
    require("./tools/build");
} else if (isInitCommand) {
    require("./tools/create");
} else if (isWatchMode) {
    require("./tools/watch");
} else if (loadModule.length > 0) {
    require("./process/efront")(loadModule[0]);
} else {
    require("./process/setupenv");
    require("./process/console");
    var server = require(/*sdf*/"./server/main");
}