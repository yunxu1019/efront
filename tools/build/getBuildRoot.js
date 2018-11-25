"use strict";
var fs = require("fs");
var path = require("path");
var getBuildInfo = require("./getBuildInfo");
var {
    comms_root,
    pages_root,
    COMS_PATH,
    PAGE_PATH
} = require("./environment");
var getScriptsUrlInHtmlFile = function (fileinfo) {
    return new Promise(function (ok, oh) {
        fs.readFile(fileinfo.fullpath, function (error, data) {
            if (error) return ok([]);
            var result = [];
            String(data).replace(/<script\s.*?\bsrc=('.+?'|".+?"|.+?)[\s|>]/ig, function (_, url) {
                result.push(url.replace(/^(['"])(.+?)\1$/g, "$2"));
            });
            ok(result.map(url => url.replace(/\?[\s\S]*?$/, "")).map(url => path.join(path.dirname(fileinfo.fullpath), url)));
        });
    });
}
var filterHtmlImportedJs = function (roots) {
    var promises = roots.filter(function (url) {
        return /\.html?$/i.test(url);
    }).map(getBuildInfo).map(getScriptsUrlInHtmlFile);
    return Promise.all(promises).then(function (datas) {
        var urls = [].concat.apply([], datas);
        var simpleJsMap = {};
        var regUrls = [];
        urls.forEach(function (url) {
            simpleJsMap[url] = true;
            if (/\*/.test(url)) regUrls.push(url);
        });
        var urlsReg = regUrls.map(a => a.replace(/[.|\\\/^$:]/g, "\\$&").replace(/\*/g, ".*?")).join("|");
        urlsReg = new RegExp(`^(?:${urlsReg})$`, "i");
        roots = roots.map(function (root) {
            if (/^\/.*?\.js$/i.test(root)) {
                var fullpath = getBuildInfo(root).fullpath;
                if (fullpath in simpleJsMap || urlsReg.test(fullpath)) {
                    return "@" + path.relative(PAGE_PATH, fullpath).replace(/[\\\/]+/g, "/");
                }
            }
            return root;
        });
        var urlsMap = {};
        roots.forEach(function (name) {
            urlsMap[name] = name.replace(/\.[tj]sx?$/i, ".js");
        });
        for (let cx = roots.length; cx >= 0; cx--) {
            let url = roots[cx];
            if (/\.html?$/i.test(url) && url.replace(/\.html?$/i, ".js") in urlsMap) {
                roots.splice(cx, 1);
            }
        }

        return roots;
    });
};
var getBuildRoot = function (files) {
    var resolve;
    var result = [];
    var run = function () {
        if (!files.length) return resolve(result);
        var file = files.shift();
        new Promise(function (ok, oh) {
            fs.exists(file, function (exists) {
                if (!exists) return oh(`路径${file}不存在`);
                fs.stat(file, function (error, stat) {
                    if (error) return oh(error);
                    if (stat.isFile()) {
                        if (/\.less/i.test(file)) return ok();
                        if (/^[^\.]/i.test(path.relative(pages_root, file))) {
                            var name = path.relative(pages_root, file).replace(/[\\\/]+/g, "/");
                            return result.push("/" + name), ok();
                        }
                        if (/^[^\.]/i.test(path.relative(COMS_PATH, file))) {
                            if (comms_root instanceof Array) {
                                var name = path.parse(file).base;
                            } else {
                                var name = path.relative(comms_root, file);
                            }
                            name = name.replace(/[\\\/]+/g, "/");
                            return result.push(name), ok();
                        }
                        if (/^[^\.]/i.test(path.relative(PAGE_PATH, file))) {
                            var name = "@" + path.relative(PAGE_PATH, file).replace(/[\\\/]+/g, "/");
                            return result.push(name), ok();
                        }
                        if (/\.png$/i.test(file)) {
                            var name = path.parse(file).base.replace(/[\\\/]+/g, "/");
                            return result.push("." + name), ok();
                        }
                        console.warn(file, "skiped");
                        ok();
                    } else {
                        fs.readdir(file, function (error, names) {
                            if (error) return oh(error);
                            names.forEach(function (name) {
                                files.push(path.join(file, name));
                            });
                            ok();
                        });
                    }
                });
            });
        }).catch(function (e) {
            console.error(e, "\r\n");
        }).then(run);
    }
    return new Promise(function (ok) {
        resolve = function (result) {
            result = filterHtmlImportedJs(result);
            ok(result);
        };
        run();
    });
};
module.exports = getBuildRoot;