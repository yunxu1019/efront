"use strict";
var fs = require("fs");
var path = require("path");
var getBuildInfo = require("./getBuildInfo");
var {
    comms_root,
    pages_root,
    PAGE_PATH
} = require("./environment");
var getScriptsUrlInHtmlFile = function (fileinfo) {
    return Promise.all(
        [].concat(fileinfo.fullpath).map(function (fullpath) {
            return new Promise(function (ok, oh) {
                fs.readFile(fullpath, function (error, data) {
                    if (error) return ok([]);
                    var result = [];
                    String(data).replace(/<script\s[^\>]*?\bsrc\=('.+?'|".+?"|.+?)[\s|\>]/ig, function (_, url) {
                        result.push(url.replace(/^(['"])(.+?)\1$/g, "$2"));
                    });
                    ok(result.map(url => url.replace(/\?[\s\S]*?$/, "")).map(url => path.join(path.dirname(fullpath), url)));
                });
            });
        })
    );
}
var filterHtmlImportedJs = function (roots) {
    var promises = roots.filter(function (url) {
        return /\.html?$/i.test(url);
    }).map(getBuildInfo).filter(a => !!a).map(getScriptsUrlInHtmlFile);
    return Promise.all(promises).then(function (datas) {
        var urls = [].concat.apply([], datas);
        urls = [].concat.apply([], urls);
        var simpleJsMap = {};
        var regUrls = [];
        urls.forEach(function (url) {
            simpleJsMap[url] = true;
            if (/\*/.test(url)) regUrls.push(url);
        });
        var urlsReg = regUrls.map(a => a.replace(/[\.\|\\\/\^\$\:]/g, "\\$&").replace(/\*/g, ".*?")).join("|");
        urlsReg = new RegExp(`^(?:${urlsReg})$`, "i");
        roots = roots.map(function (root) {
            if (/^\/.*?\.js$/i.test(root)) {
                var fullpath = getBuildInfo(root).fullpath;
                for (var fpath of [].concat(fullpath)) {
                    if (fpath in simpleJsMap || urlsReg.test(fpath)) {
                        return "@" + path.relative(PAGE_PATH.split(",")[0], fpath).replace(/[\\\/]+/g, "/");
                    }
                }
            }
            return root;
        });
        var urlsMap = {};
        roots.forEach(function (name) {
            urlsMap[name.replace(/\.[tj]sx?$/i, ".js")] = true;
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
var getPathInFolder = function (folder, filepath) {
    let rel = path.relative(folder, filepath);
    return !path.isAbsolute(rel) && /^[^\.]/i.test(rel) ? rel : null;
};
function paddExtension(file) {
    return new Promise(function (ok, oh) {
        var extt = ['', '.js', '.ts', '.html', '.json', '.jsx', '.tsx'];
        var parets = [""].concat(pages_root);
        var prefix = 0;
        var aftfix = 0;

        var run = function () {
            var f = path.join(parets[prefix], file) + extt[aftfix++];
            fs.exists(f, function (exists) {
                if (exists) ok(f);
                else if (aftfix >= extt.length) {
                    if (prefix + 1 < pages_root.length) {
                        prefix++;
                        aftfix = 0;
                        run();
                    } else {
                        oh(`路径${file}不存在`);
                    }
                }
                else run();
            });
        };
        run();
    });
}
var getBuildRoot = function (files, matchFileOnly) {
    files = [].concat(files || []);
    var indexMap = {};
    files.forEach((f, cx) => indexMap[f] = cx);
    var resolve;
    var result = [];
    var run = function () {
        if (!files.length) return resolve(result);
        var file1 = files.shift();
        var save = function (f) {
            indexMap[f] = indexMap[file1];
            result.push(f);
        };
        paddExtension(file1).then(function (file) {
            return new Promise(function (ok, oh) {
                fs.stat(file, function (error, stat) {
                    if (error) return oh(error);
                    if (stat.isFile()) {
                        if (/\.less$/i.test(file)) return ok();
                        if (/\.([tj]sx?|html|json)$/i.test(file)) {
                            for (var comm of comms_root) {
                                var rel = getPathInFolder(comm, file);
                                if (rel) {
                                    var name = path.parse(file).base;
                                    name = name.replace(/[\\\/]+/g, "/");
                                    return save(name), ok();
                                }
                            }
                        }
                        if (/\.([tj]sx?|html)$/i.test(file)) {
                            for (var page of pages_root) {
                                var rel = getPathInFolder(page, file);
                                if (rel) {
                                    var name = rel.replace(/[\\\/]+/g, "/");
                                    return save("/" + name), ok();
                                }
                            }
                        }
                        for (var page of pages_root) {
                            var rel = getPathInFolder(page, file);
                            if (rel) {
                                var name = "/" + rel.replace(/[\\\/]+/g, "/");
                                return save(name), ok();
                            }
                        }
                        for (var page of PAGE_PATH.split(",")) {
                            var rel = getPathInFolder(page, file);
                            if (rel) {
                                var name = "@" + rel.replace(/[\\\/]+/g, "/");
                                return save(name), ok();
                            }
                        }
                        if (/\.png$/i.test(file)) {
                            var name = path.parse(file).base.replace(/[\\\/]+/g, "/");
                            return save("." + name), ok();
                        }
                        console.warn(file, "skiped");
                        ok();
                    } else if (matchFileOnly) {
                        var f = path.join(file, 'package.json');
                        var read = function (f) {
                            return paddExtension(f).then(function (file) {
                                indexMap[file] = indexMap[file1];
                                files.push(file);
                            });
                        };
                        fs.exists(f, function (exists) {
                            if (exists) {
                                fs.readFile(f, function (error, data) {
                                    if (error) {
                                        oh(error);
                                        return;
                                    }
                                    var d = JSON.parse(
                                        String(data)
                                    );
                                    var f = path.join(file, d.main);
                                    read(f).then(ok).catch(function () {
                                        oh(`${f}不存在！`);
                                    });
                                })
                            } else {
                                f = path.join(file, 'index');
                                read(f).then(ok).catch(function () {
                                    oh(`${file}不存在！`)
                                });
                            }
                        });

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
            if (!matchFileOnly) console.error(e, "\r\n");
            else console.info(e);
        }).then(run);
    }
    return new Promise(function (ok) {
        resolve = function (result) {
            var res = [];
            if (matchFileOnly) {
                result.forEach(function (a) {
                    return res[indexMap[a]] = a;
                });
            } else {
                res = result;
            }
            var res = filterHtmlImportedJs(res);
            ok(res);
        };
        run();
    });
};
module.exports = getBuildRoot;