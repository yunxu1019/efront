"use strict";
var commbuilder = require("../efront/commbuilder");
var iconbuilder = require("../efront/iconbuilder");
var htmlbuilder = require("../efront/filebuilder");
// var aapibuilder = require("../efront/aapibuilder");
var path = require("path");
var env = require("./environment");
var noopbuilder = a => a;
var pagebuilder = function (buffer, filename) {
    if (/^index\.html?$/i.test(filename) || /^\s*<!Doctype\b/i.test(buffer.slice(0, 2000).toString().replace(/<!--[\s\S]*?--!?>/g, ""))) {
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
};

function getBuildInfo(url) {
    var match = url.match(/^(.*?)(\/|\.|@|\:|)(.+?)(\.[tj]sx?|\.html?|\.png)?$/);
    var fullpath, destpath, builder;
    if (match) {
        var {
            comms_root,
            ccons_root,
            pages_root,
            PAGE_PATH,
            libs_root
            // aapis_root
        } = env;
        var appc = match[1],
            type = match[2],
            name = match[3],
            extt = match[4] || "";
        bigloop: switch (type) {
            case "":
                builder = commbuilder;
                var $name = name.replace(/(\w)\$/g, "$1/");
                fullpath = [];
                extt = extt || [".js", ".ts", ".json", ".html", '/'];
                if (!Array.isArray(extt)) {
                    extt = [extt];
                }
                if (comms_root instanceof Array) {
                    comms_root.map(function (a) {
                        extt.forEach(function (ext) {
                            fullpath.push(path.join(a, $name + ext))
                        });
                    });
                } else {
                    extt.forEach(function (ext) {
                        fullpath.push(path.join(comms_root, $name + ext));
                    });
                }
                destpath = path.join("comm", name.replace(/\-(\w)/g, (_, w) => w.toUpperCase()) + env.EXTT);
                url = url.replace(/\.([tj]sx?|json|html?)$/i, "");
                break;
            case "/":
                if (/\.html?$/i.test(extt)) {
                    builder = pagebuilder;
                    destpath = path.join(name + extt);
                } else if (!/\.[tj]sx?$/i.test(extt)) {
                    builder = noopbuilder;
                    destpath = path.join(name + extt);
                } else {
                    extt = extt || "";
                    builder = commbuilder;
                    destpath = path.join("page", name + env.EXTT);
                    url = url.replace(/\.[tj]sx?$/i, "");
                }
                fullpath = pages_root.map(page => path.join(page, name + extt));
                break;
            case "@":
                builder = noopbuilder;
                for (var page of libs_root) {
                    fullpath = path.join(page, name + extt);
                    if (/^[^\.]/i.test(path.relative(page, fullpath))) {
                        destpath = path.relative(pages_root[0], fullpath);
                        break bigloop;
                    }
                }
                for (var page of PAGE_PATH.split(",")) {
                    fullpath = path.join(page, name + extt);
                    if (/^[^\.]/i.test(path.relative(page, fullpath))) {
                        destpath = path.relative(pages_root[0], fullpath);
                        break bigloop;
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
            default:
                throw new Error("类型不被支持!");
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
    console.warn("路径不支持", url);
}
module.exports = getBuildInfo;
