#!/usr/bin/env node
var path = require('path');
require("./process/console");
var configs = function () {
    var config = {};
    process.argv.forEach(function (key) {
        key = key.toLowerCase();
        config[key] = true;
    });
    return config;
}();

var setenv = function (evn) {
    Object.assign(process.env, evn);
};


var isTestMode = configs.test;
var isHelpMode = configs.help;
var isPublicMode = configs.build || configs.public;
var isWatchMode = configs.watch;
var isServerMode = configs.server || configs.serve;
var isInitCommand = configs.init;
var isDocsCommand = configs.doc || configs.docs;
var isDemoCommand = configs.demo || configs.zimoli;
var loadModule = process.argv.slice(2).filter(e => /^https?\:\/\/|\/|\.[tj]sx?$/i.test(e));
if (isHelpMode) {
    console.log("these commands can be used: test server public init watch");
} else if (isDocsCommand) {
    setenv({
        public_path: path.join(__dirname, "apps"),
        app: "docs"
    });
    require("./process/setupenv");
    require("./server/main");
} else if (isDemoCommand) {
    setenv({
        public_path: path.join(__dirname, "apps"),
        app: "zimoli"
    });
    require("./process/setupenv");
    require("./server/main");
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
    var fullpath = process.cwd();
    setenv({
        public_path: path.dirname(fullpath),
        app: path.basename(fullpath)
    });
    require("./process/setupenv");
    require("./server/main");
}