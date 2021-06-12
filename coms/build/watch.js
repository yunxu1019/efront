#!/usr/bin/env node

require("../efront/console");
var environment = require("./environment");
var fs = require("fs");
var path = require("path");
if (!process.cwd() === path.dirname(__dirname)) throw new Error("请在项目根目录启动！");
var progress = require("./progress");
var {
    pages_root,
    comms_root,
    ccons_root,
} = environment;
var buildTicker = 0;
var listener = function (event, filename) {
    clearTimeout(buildTicker);
    buildTicker = setTimeout(progress, 60);
};
[].concat(pages_root, comms_root, ccons_root).forEach(function (rootpath) {
    var recursive = /^(darwin|win32)$/.test(process.platform);
    console.warn("watch功能在当前操作系统可能无法使用！");
    if (fs.existsSync(rootpath)) fs.watch(rootpath, { recursive }, listener);

});
progress(true);
console.info("efront watch ..");