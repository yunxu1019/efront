#!/usr/bin/env node
// 中文编码 utf-8
var isTestMode = process.argv.indexOf("test") >= 0;
var isPublicMode = process.argv.indexOf("public") >= 0;
var isServerMode = process.argv.indexOf("server") >= 0;
var isInitCommand = process.argv.indexOf("init") >= 0;
if (isTestMode) {
    require("./tester/main");
} else if (isServerMode) {
    require("./server/index");
} else if (isPublicMode) {
    require("./tools/public");
} else if (isInitCommand) {
    require("./tools/create");
} else {
    require("./process/setupenv");
    require("./process/console");
    var server = require(/*sdf*/"./server/main");
}