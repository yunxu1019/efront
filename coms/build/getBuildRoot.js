"use strict";
var fs = require("fs");
var path = require("path");
var isLib = require("../efront/isLib");
var getBuildInfo = require("./getBuildInfo");
var detectWithExtension = require("../basic/detectWithExtension");
var {
    comms_root,
    pages_root,
    PAGE_PATH
} = require("./environment");
var erroredFiles = Object.create(null);
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
                    var res = result.map(url => url.replace(/\?[\s\S]*?$/, "")).map(url => path.join(path.dirname(fullpath), url));
                    var bodyTag = /<body\s[^\>]*?\>/i.exec(data);
                    if (bodyTag) {
                        var mainPath = '';
                        bodyTag[0].replace(/(?:main|main\-path|main)\=(['"]|)([^\"\']+)\1/i, function (m, q, c) {
                            mainPath = c;
                        });
                        if (mainPath) {
                            res.main = mainPath;
                        }
                    }
                    ok(res);
                });
            });
        })
    );
};
var filterHtmlImportedJs = function (roots) {
    var promises = roots.filter(function (url) {
        return /\.(html?|jsp|asp|php)$/i.test(url);
    }).map(getBuildInfo).filter(a => !!a).map(getScriptsUrlInHtmlFile);
    return Promise.all(promises).then(function (datas) {
        var urls = [].concat.apply([], datas);
        var mainPaths = urls.filter(d => !!d.main).map(d => d.main);
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
        roots = roots.concat(mainPaths).filter(name => {
            name = name.replace(/\.[tj]sx?$/i, ".js");
            var keep = !urlsMap[name];
            if (keep) urlsMap[name] = true;
            return keep;
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
    if (!rel) {
        rel = "./";
    }
    return !path.isAbsolute(rel) && /^[^\.]/i.test(rel) ? rel : null;
};
function paddExtension(file) {
    var parets = [""].concat(/[\/\\]/.test(file) ? pages_root : comms_root);
    return detectWithExtension(file, ['', '.js', '.ts', '.html', '.json', '.jsx', '.tsx'], parets);
}
var getBuildRoot = function (files, matchFileOnly) {
    files = [].concat(files || []);
    var indexMap = Object.create(null);
    files.forEach((f, cx) => indexMap[f] = cx);
    var resolve;
    var result = [];
    var run = function () {
        if (!files.length) return resolve(result);
        var file1 = files.shift();
        if (!file1) return run();
        var save = function (f) {
            indexMap[f] = indexMap[file1];
            result.push(f);
        };
        var saveComm = function (name, file) {
            if (isLib(file)) {
                saveLlib(name);
                return;
            }
            name = name
                .replace(/[\\\/]+/g, "$")
                .replace(/\.\w*$/, '');
            save(name);
        };
        var savePage = function (rel) {
            var name = rel.replace(/[\\\/]+/g, "/");
            save("/" + name);
        };
        var saveCopy = function (rel) {
            var name = "@" + rel.replace(/[\\\/]+/g, "/");
            save(name);
        };
        var saveLlib = function (rel) {
            var name = "\\" + rel.replace(/[\\\/]+/g, "/");
            save(name);
        };
        var saveFolder = function (folder) {
            for (var comm of comms_root) {
                var rel = getPathInFolder(comm, folder);
                if (rel) {
                    saveComm(rel, folder);
                    return true;
                }
            }
            for (var page of pages_root) {
                var rel = getPathInFolder(page, folder);
                if (rel) {
                    savePage(rel);
                    return true;
                }
            }
            return false;
        };
        paddExtension(file1).then(function (file) {
            return new Promise(function (ok, oh) {
                fs.stat(file, function (error, stat) {
                    if (error) return oh(error);
                    if (stat.isFile()) {
                        if (/\.less$/i.test(file)) return ok();
                        if (/\.([tj]sx?|html?|json)$/i.test(file)) {
                            for (var comm of comms_root) {
                                var rel = getPathInFolder(comm, file);
                                if (rel) {
                                    return saveComm(rel, file), ok();
                                }
                            }
                        }
                        if (/\.([tj]sx?|html?)$/i.test(file)) {
                            for (var page of pages_root) {
                                var rel = getPathInFolder(page, file);
                                if (rel) {
                                    return savePage(rel), ok();
                                }
                            }
                        }
                        for (var page of pages_root) {
                            var rel = getPathInFolder(page, file);
                            if (rel) {
                                return savePage(rel), ok();
                            }
                        }
                        for (var page of PAGE_PATH.split(",")) {
                            var rel = getPathInFolder(page, file);
                            if (rel) {
                                return saveCopy(rel), ok();
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
                            return paddExtension(f).then(function () {
                                saveFolder(file);
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
                                });
                            } else {
                                f = path.join(file, 'index');
                                read(f).then(ok).catch(function () {
                                    oh(`${file}不存在！`);
                                });
                            }
                        });

                    } else {
                        fs.readdir(file, function (error, names) {
                            if (error) return oh(error);
                            var indexfile, packagefile;
                            names.forEach(function (name) {
                                files.push(path.join(file, name));
                                if (!indexfile && /^index(\.[jt]sx?|\.node)?$/i.test(name)) {
                                    indexfile = path.join(file, name);
                                }
                                if (!packagefile && /package\.json/i.test(name)) {
                                    packagefile = path.join(file, name);
                                }
                            });
                            if (indexfile || packagefile) {
                                saveFolder(file);
                            }
                            ok();
                        });
                    }
                });
            });
        }).catch(function (e) {
            if (erroredFiles[file1]) return;
            if (/^\w+$/.test(file1)) {
                try {
                    require.resolve(file1);
                    return;
                } catch (e) {
                }
            }
            erroredFiles[file1] = true;
            if (!matchFileOnly) console.error(e, "\r\n");
            else console.warn(e + ",", '已跳过', file1);
        }).then(run);
    };
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
