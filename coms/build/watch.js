#!/usr/bin/env node

require("../efront/console");
var lazy = require("../basic/lazy");
var environment = require("./environment");
var fs = require("fs");
var progress = require("./progress");
var {
    pages_root,
    comms_root,
    ccons_root,
} = environment;
var listener = lazy(() => progress(true), 1000);
[].concat(pages_root, comms_root, ccons_root).forEach(function (rootpath) {
    var recursive = /^(darwin|win32)$/.test(process.platform);
    if (!recursive) console.warn("watch功能在当前操作系统可能无法使用！");
    if (fs.existsSync(rootpath)) fs.watch(rootpath, { recursive }, listener);
});
progress(true);
console.info("efront watch ..");