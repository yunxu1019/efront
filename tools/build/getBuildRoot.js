"use strict";
var fs = require("fs");
var path = require("path");
var {
    comms_root,
    pages_root,
    ccons_root,
    COMS_PATH,
    PAGE_PATH
} = require("./environment");
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
                        if (/\.less/.test(file)) return ok();
                        if (/^[^\.]/i.test(path.relative(pages_root, file))) {
                            var name = path.relative(pages_root, file).replace(/[\\\/]+/g, "/");
                            return result.push("/" + name), ok();
                        }
                        if (/^[^\.]/i.test(path.relative(COMS_PATH, file))) {
                            if (comms_root instanceof Array) {
                                var name = path.parse(file).base;
                            } else {
                                var name = path.relative(comms_root, file).replace(/[\\\/]+/g, "/").replace(/\.[tj]sx?$/, "");
                            }
                            return result.push(name), ok();
                        }
                        if (/^[^\.]/i.test(path.relative(PAGE_PATH, file))) {
                            var name = "@" + path.relative(PAGE_PATH, file).replace(/[\\\/]+/g, "/");
                            return result.push(name), ok();
                        }
                        if (/\.png$/i.test(file)) {
                            var name = path.relative(ccons_root, file).replace(/[\\\/]+/g, "/").replace(/\.png$/, "");
                            return result.push("$" + name), ok();
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
        resolve = ok;
        run();
    });
};
module.exports = getBuildRoot;