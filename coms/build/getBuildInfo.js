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
var commap = await getCommmap(memery.APP, undefined, Infinity);
var pagemap = await getCommmap(memery.APP, undefined, Infinity);
if (pagemap['zimoli'] || pagemap["zimoli$zimoli"]) {
    ["state", 'login', 'prepare', 'upwith', "go"].forEach(name => {
        var f = pagemap[name];
        if (f) delete this[f];
        delete pagemap[name];
    }, pagemap["?"]);
}
var xhtbuilder = commbuilder = commbuilder.bind(commap);
var backmap = await require("../efront/commap");
var dynabuilder = require("../efront/dynabuilder").bind(backmap);
var backbuilder = require("../efront/backbuilder").bind(backmap);
var getPathIn = require("./getPathIn");
manybuilder = manybuilder.bind(commap);
var pagebuilder = function (buffer, filename) {
    if (memery.webindex.indexOf(filename) >= 0 || /^\s*<!Doctype\b/i.test(buffer.slice(0, 2000).toString().replace(/^(\s*<!--[\s\S]*?--!?>)*/g, ""))) {
        return htmlbuilder.apply(null, arguments);
    }
    return commbuilder.apply(pagemap, arguments);
};
var BuildInfo = function (info) {
    Object.assign(this, info);
};
BuildInfo.prototype = {
    toString() {
        return this.data || "";
    }
};
var {
    comms_root,
    pages_root,
    PAGE_PATH,
    COMS_PATH,
    backs_root,
    aapis_root
} = env;
function getBuildInfo(url) {
    var match = url.match(/^(.*?)(\/|\.|\*|\:|\\|~|!|\^|\?|\||\+|\-|)(.+?)(\.[^\/\\.]+|\/|\\)?$/);
    var fullpath = url, destpath, builder, searchpath, searchname, realpath;
    var isback = false;
    if (match) {

        var appc = match[1],
            type = match[2],
            name = match[3],
            extt = match[4] || "";
        bigloop: switch (type) {
            case "":
                var name1 = name.replace(/\-([\s\S])/g, (_, a) => a.toUpperCase());
                realpath = extt ? commap[name + extt] : commap[name1];
                if (/\.asm$/i.test(extt)) {
                    builder = asmbuilder;
                } else {
                    if (setting.is_commponent_package) builder = manybuilder;
                    else builder = xhtbuilder;
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
                }
                else if (/\.(jsp|asp|php)$/i.test(extt)) {
                    isback = true;
                    destpath = path.join(name + extt);
                    name = "/" + name;
                    type = "*";
                    builder = dynabuilder;
                }
                else if (!/\.([cm]?[jt]sx?|xht|vuex?)$/i.test(extt)) {
                    if (/\.asm$/i.test(extt)) {
                        builder = asmbuilder
                    } else {
                        builder = noopbuilder;
                        type = "*";
                    }
                    destpath = path.join(name + extt);
                    name = "/" + name;
                }
                else {
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
            case "+":
                isback = true;
                builder = backbuilder;
                searchname = name.replace(/(\w)\$/g, "$1/");
                if (name in backmap) {
                    realpath = backmap[name];
                    if (!getPathIn(backs_root, realpath)) {
                        realpath = null;
                    }
                }
                destpath = path.join("#abpi", name + '.js');
                type = "+";
                break;
            case "-":
                isback = true;
                searchname = name.replace(/(\w)\$/g, "$1/");
                builder = backbuilder;
                destpath = path.join("#aapi", name + '.js');
                type = '-';
                searchpath = aapis_root;
                break;

            default:
                throw new Error(i18n`类型不被支持!`);
        }
        return new BuildInfo({
            isback,
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
