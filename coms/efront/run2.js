"use strict";
var fs = require("fs");
var fsp = fs.promises;
var os = require("os");
var path = require("path");
var parseURL = require("../basic/parseURL");
var userAgent = "Efront/1.0";
var memery = require("./memery");
var mixin = require("./mixin");
var commbuilder = require('./commbuilder');
var getPathIn = require("../build/getPathIn");
var searchList = mixin(memery.COMS_PATH).map(a => a[0]).filter(fs.existsSync);
module.exports = async function (mainpath, args) {
    var data = await fsp.readFile(mainpath);
    var coms = searchList;
    for (var cx = 0, dx = searchList.length; cx < dx; cx++) {
        var r = getPathIn(searchList[cx], mainpath);
        if (r) {
            coms = coms.slice(cx, dx);
            break;
        }
    }
    memery.COMS_PATH = coms.join(',');
    var commap = await require("./commap");
    var require2 = require("./require2");
    require2.commap = commap;
    memery.POLYFILL = false;
    memery.COMPRESS = false;
    var f = await require2.createFunction(data, r || mainpath, mainpath);
    process._argv = args;
    require2.invokeFunction(f);

    return data;
};