"use strict";
var commbuilder = require("../efront/commbuilder");
var htmlbuilder = require("../efront/filebuilder");
var asmbuilder = require("../efront/asmbuilder");
var manybuilder = require("./unpublish");
var setting = require("./setting");
var path = require("path");
var memery = require("../efront/memery");
var env = require("./environment");
var noopbuilder = a => a;
var getCommmap = require("../efront/getCommap");
var commap = await getCommmap(memery.APP, Infinity);
var xhtbuilder = commbuilder = commbuilder.bind(commap);
manybuilder = manybuilder.bind(commap);
var pagebuilder = function (buffer, filename) {
    if (memery.webindex.indexOf(filename) >= 0 || /^\s*<!Doctype\b/i.test(buffer.slice(0, 2000).toString().replace(/^(\s*<!--[\s\S]*?--!?>)*/g, ""))) {
        return htmlbuilder.apply(null, arguments);
    }
    return commbuilder.apply(commap, arguments);
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
    var match = url.match(/^(.*?)(\/|\.|\*|\:|\\|~|!|\^|\?|\||)(.+?)(\.[^\/\\.]+|\/|\\)?$/);
    var fullpath = url, destpath, builder, searchpath, searchname, realpath;
    if (match) {
        var {
            comms_root,
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
                if (/\.asm$/i.test(extt)) {
                    builder = asmbuilder
                } else {
                    if (setting.is_commponent_package) builder = manybuilder;
                    else builder = xhtbuilder;
                }
                searchname = name.replace(/(\w)\$/g, "$1/");
                extt = extt || comexts;
                if (url in commap && (extt instanceof Array ? extt.indexOf(path.extname(commap[url])) >= 0 : extt === path.extname(commap[url]))) {
                    realpath = commap[url];
                }
                else if (comms_root instanceof Array) {
                    searchpath = comms_root;
                }
                else {
                    searchpath = [comms_root];
                }
                destpath = path.join("comm", name + memery.EXTT);
                if (realpath && realpath === commap[";"] && !setting.is_commponent_package) {
                    builder = noopbuilder;
                }
                break;
            case "/":
                if (/\.html?$/i.test(extt)) {
                    destpath = path.join(name + extt);
                    if (memery.webindex.indexOf(destpath) < 0) {
                        name = "/" + name;
                        builder = pagebuilder;
                    }
                } else if (!/\.([cm]?[jt]sx?|xht|vuex?)$/i.test(extt)) {
                    if (/\.asm$/i.test(extt)) {
                        builder = asmbuilder
                    } else {
                        builder = noopbuilder;
                        type = "*";
                    }
                    destpath = path.join(name + extt);
                    name = "/" + name;
                } else {
                    extt = extt || "";
                    builder = xhtbuilder;
                    destpath = path.join("page", name + memery.EXTT);
                    name = "/" + name;
                }
                if (builder) {
                    fullpath = pages_root.map(page => path.join(page, name + extt));
                    break;
                }

            case "*":
                builder = noopbuilder;
                for (var page of pages_root.concat(PAGE_PATH.split(","))) {
                    fullpath = path.join(page, name + extt);
                    if (/^[^\.]/i.test(path.relative(page, fullpath))) {
                        destpath = path.relative(pages_root[0], fullpath);
                        name = '*' + name;
                        break bigloop;
                    }
                }
                if (!destpath) {
                    destpath = path.join("/", name + extt);
                }
                name = '*' + name;
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
            // case ".":
            //     builder = iconbuilder;
            //     extt = ".png";
            //     fullpath = ccons_root instanceof Array ? ccons_root.map(c => path.join(c, name + extt)) : path.join(ccons_root, name + extt);
            //     destpath = path.join("ccon", name);
            //     break;
            // case "_":
            //     builder = aapibuilder;
            //     extt = ".js";
            //     fullpath = path.join(aapis_root, name + extt);
            //     break;
            default:
                throw new Error(i18n`类型不被支持!`);
        }
        return new BuildInfo({
            appc,
            type,
            extt,
            builder,
            searchpath,
            searchname,
            fullpath,
            realpath,
            destpath,
            name,
            url
        });
    }
    console.warn(i18n`路径不支持`, url);
}
module.exports = getBuildInfo;
getBuildInfo.commap = commap;
