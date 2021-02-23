"use strict";
var commbuilder = require("../efront/commbuilder");
var iconbuilder = require("../efront/iconbuilder");
var htmlbuilder = require("../efront/filebuilder");
var manybuilder = require("./unpublish");
var setting = require("./setting");
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
    var match = url.match(/^(.*?)(\/|\.|@|\:|\\|~|!|\^|\?|\||)(.+?)(\.[cm]?[jt]sx?|\.json|\.html?|\.vuex?|\.png)?$/);
    var fullpath, destpath, builder;
    if (match) {
        var {
            comms_root,
            ccons_root,
            pages_root,
            PAGE_PATH,
            // aapis_root
        } = env;
        var appc = match[1],
            type = match[2],
            name = match[3],
            extt = match[4] || "";
        bigloop: switch (type) {
            case "":
                builder = manybuilder;
                var $name = name.replace(/(\w)\$/g, "$1/");
                fullpath = [];
                extt = extt || [".js", ".ts", ".json", ".html", '.vue', ''];

                if (!Array.isArray(extt)) {
                    extt = [extt];
                }
                if (comms_root instanceof Array) {
                    comms_root.map(function (a) {
                        extt.forEach(function (ext) {
                            fullpath.push(path.join(a, $name + ext));
                        });
                    });
                } else {
                    extt.forEach(function (ext) {
                        fullpath.push(path.join(comms_root, $name + ext));
                    });
                }
                name = name.replace(/\-(\w)/g, (_, w) => w.toUpperCase());
                destpath = path.join("comm", name + env.EXTT);
                if (url === 'main' || url === 'main.js' && !setting.is_commponent_package) {
                    builder = noopbuilder;
                }
                break;
            case "/":
                if (/\.html?$/i.test(extt)) {
                    builder = pagebuilder;
                    destpath = path.join(name + extt);
                } else if (!/\.([cm]?[jt]sx?|vuex?)$/i.test(extt)) {
                    builder = noopbuilder;
                    destpath = path.join(name + extt);
                } else {
                    extt = extt || "";
                    builder = commbuilder;
                    destpath = path.join("page", name + env.EXTT);
                }
                fullpath = pages_root.map(page => path.join(page, name + extt));
                break;
            case "\\":
                builder = noopbuilder;
                destpath = name + extt;
                for (var lib of comms_root) {
                    fullpath = path.join(lib, name + extt);
                    var rel = path.relative(lib, fullpath);
                    if (/^[^\.]/i.test(rel) || !rel) {
                        break bigloop;
                    }
                }
                break;
            case "@":
                builder = noopbuilder;
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
