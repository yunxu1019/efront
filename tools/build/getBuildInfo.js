"use strict";
var commbuilder = require("../../process/commbuilder");
var iconbuilder = require("../../process/iconbuilder");
var htmlbuilder = require("../../process/filebuilder");
// var aapibuilder = require("../../process/aapibuilder");
var path = require("path");
var env = require("./environment");
var noopbuilder = a => a;
var BuildInfo = function (info) {
    Object.assign(this, info);
};
BuildInfo.prototype = {
    toString() {
        return this.data || "";
    }
}

function getBuildInfo(url) {
    var match = url.match(/^(.*?)(\/|\$|@|)(.*?)(\.[tj]sx?|\.html?|\.png)?$/);
    var fullpath, destpath, builder;
    if (match) {
        var {
            comms_root,
            ccons_root,
            pages_root,
            // aapis_root
        } = env;
        var appc = match[1],
            type = match[2],
            name = match[3],
            extt = match[4] || "";
        switch (type) {
            case "":
                builder = commbuilder;
                extt = ".js";
                var $name = name.replace(/(\w)\$/g, "$1/");
                fullpath = comms_root instanceof Array ? comms_root.map(a => path.join(a, $name + extt)) : path.join(comms_root, $name + extt);
                destpath = path.join("comm", name);
                break;
            case "/":
                if (/\.html?$/.test(extt)) {
                    builder = htmlbuilder;
                    destpath = path.join(name + extt);
                } else if (!/\.[tj]sx?$/.test(extt)) {
                    builder = noopbuilder;
                    destpath = path.join(name + extt);
                } else {
                    extt = ".js";
                    builder = commbuilder;
                    destpath = path.join("page", name);
                }
                fullpath = path.join(pages_root, name + extt);
                break;
            case "@":
                builder = noopbuilder;
                fullpath = path.join("apps", name + extt);
                destpath = path.join("/", name + extt);
                break;
            case "$":
                builder = iconbuilder;
                extt = ".png";
                fullpath = ccons_root instanceof Array ? ccons_root.map(c => path.join(c, name + extt)) : path.join(ccons_root, name + extt);
                destpath = path.join("ccon", name);
                break;
            // case "_":
            //     builder = aapibuilder;
            //     extt = ".js";
            //     fullpath = path.join(aapis_root, name + extt);
            //     break;
        }
    }
    return new BuildInfo({
        appc,
        type,
        extt,
        builder,
        fullpath,
        destpath,
        name,
        url
    });
}
module.exports = getBuildInfo;