#!/usr/bin/env node
var quitme = require("../efront/quitme");
require("../efront/console");
var environment = require("./environment");
var fs = require("fs");
var watch = require("../server/watch");
var {
    pages_root,
    comms_root,
} = environment;
var listener = () => progress(false);
[].concat(pages_root, comms_root).forEach(function (rootpath) {
    var recursive = /^(darwin|win32)$/.test(process.platform);
    if (!recursive) console.warn(i18n`watch功能在当前操作系统可能无法使用！`);
    if (fs.existsSync(rootpath)) {
        watch(rootpath, listener);
        quitme(() => watch(rootpath));
    }
});
progress(true, true).then(function () {
    watch.start();
    console.info("efront <green>watch</green>");
});