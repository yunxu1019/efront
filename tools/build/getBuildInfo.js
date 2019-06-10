"use strict";
var commbuilder = require("../../process/commbuilder");
var iconbuilder = require("../../process/iconbuilder");
var htmlbuilder = require("../../process/filebuilder");
// var aapibuilder = require("../../process/aapibuilder");
var path = require("path");
var env = require("./environment");
var noopbuilder = a => a;
var pagebuilder = function (buffer, filename) {
    if (/^index.html?$/i.test(filename) || /^\s*<!Doctype\b/i.test(buffer.slice(0, 100).toString())) {
        return htmlbuilder.apply(null, arguments);
    }
    return commbuilder.apply(null, arguments);
};
var BuildInfo = function (info) {
    Object.assign(this, info);
};
BuildInfo.prototype = {
    toString() {
        return this.data || "";
    }
}

function getBuildInfo(url) {
    var match = url.match(/^(.*?)(\/|\.|@|)(.*?)(\.[tj]sx?|\.html?|\.png)?$/);
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
                var $name = name.replace(/(\w)\$/g, "$1/");
                fullpath = [];
                extt = extt || [".js", ".html"];
                if (!Array.isArray(extt)) {
                    extt = [extt];
                }
                if (comms_root instanceof Array) {
                    extt.forEach(function (ext) {
                        comms_root.map(a => fullpath.push(path.join(a, $name + ext)));
                    });
                } else {
                    extt.forEach(function (ext) {
                        fullpath.push(path.join(comms_root, $name + ext));
                    });
                }
                // console.log(fullpath)
                destpath = path.join("comm", name);
                url = url.replace(/\.([tj]sx?|html?)$/i, "");
                break;
            case "/":
                if (/\.html?$/i.test(extt)) {
                    builder = pagebuilder;
                    destpath = path.join(name + extt);
                } else if (!/\.[tj]sx?$/i.test(extt)) {
                    builder = noopbuilder;
                    destpath = path.join(name + extt);
                } else {
                    extt = ".js";
                    builder = commbuilder;
                    destpath = path.join("page", name);
                    url = url.replace(/\.[tj]sx?$/i, "");
                }
                fullpath = pages_root.map(page => path.join(page, name + extt));
                break;
            case "@":
                builder = noopbuilder;
                fullpath = path.join("apps", name + extt);
                for (var page of pages_root) {
                    if (/^[^\.]/i.test(path.relative(page, fullpath))) {
                        destpath = path.relative(page, fullpath);
                    }
                }
                if (!destpath) {
                    destpath = path.join("/", name + extt);
                }
                break;
            case ".":
                builder = iconbuilder;
                extt = ".png";
                fullpath = ccons_root instanceof Array ? ccons_root.map(c => path.join(c, name + extt)) : path.join(ccons_root, name + extt);
                destpath = path.join("ccon", name);
                url = url.replace(/\.png$/i, "");
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