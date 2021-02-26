"use strict";
var fs = require("fs");
var path = require("path");
var isLib = require("../efront/isLib");
var getBuildInfo = require("./getBuildInfo");
var getPathIn = require("./getPathIn");
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
                fullpath = path.resolve(fullpath);
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
                var buildinfo = getBuildInfo(root);
                var found = urlsReg.test(buildinfo.url) || urlsReg.test(buildinfo.distpath);
                if (!found) for (var fpath of [].concat(buildinfo.fullpath)) {
                    if (fpath in simpleJsMap || urlsReg.test(fpath)) {
                        found = true;
                        break;
                    }
                }
                if (found) return "@" + path.relative(PAGE_PATH.split(",")[0], fpath).replace(/[\\\/]+/g, "/");
            }
            return root;
        });
        var urlsMap = {};
        roots = roots.concat(mainPaths).filter(name => {
            name = name.replace(/\.[cm]?[jt]sx?$/i, ".js");
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
function paddExtension(file) {
    var parents = [""].concat(/^\.*[\/\\]/.test(file) ? pages_root.concat(comms_root) : comms_root.concat(pages_root));
    return detectWithExtension(file, ['', '.js', '.ts', '.html', '.json', '.jsx', '.tsx', '.vue', '.vuex'], parents);
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
                .replace(/[\\\/]+/g, "$");
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
            var rel = getPathIn(comms_root, folder);
            if (rel) {
                saveComm(rel, folder);
                return true;
            }

            var rel = getPathIn(pages_root, folder);
            if (rel) {
                savePage(rel);
                return true;
            }
            return false;
        };
        paddExtension(file1).then(function (file) {
            return new Promise(function (ok, oh) {
                fs.stat(file, function (error, stat) {
                    if (error) return oh(error);
                    if (stat.isFile()) {
                        if (/\.less$/i.test(file)) return ok();
                        if (/\.([cm]?[jt]sx?|html?|json|vuex?)$/i.test(file)) {
                            var rel = getPathIn(comms_root, file);
                            if (rel) {
                                return saveComm(rel, file), ok();
                            }
                        }
                        if (/\.([cm]?[jt]sx?|html?|vuex?)$/i.test(file)) {
                            var rel = getPathIn(pages_root, file);
                            if (rel) {
                                return savePage(rel), ok();
                            }
                        }
                        var rel = getPathIn(pages_root, file);
                        if (rel) {
                            return savePage(rel), ok();
                        }
                        var rel = getPathIn(PAGE_PATH.split(","), file);
                        if (rel) {
                            return saveCopy(rel), ok();
                        }
                        if (/\.png$/i.test(file)) {
                            var name = path.parse(file).base.replace(/[\\\/]+/g, "/");
                            return save("." + name), ok();
                        }
                        console.warn(`<gray>${file}</gray>`, "已跳过");
                        ok();
                    } else if (matchFileOnly) {
                        var f = path.join(file, 'package.json');
                        var read = function (f) {
                            return paddExtension(f).then(function () {
                                saveFolder(file);
                            });
                        };
                        if (fs.existsSync(f)) {
                            fs.readFile(f, function (error, data) {
                                if (error) {
                                    oh(error);
                                    return;
                                }
                                var d = JSON.parse(
                                    String(data)
                                );
                                var f = path.join(file, d.main || 'index');
                                read(f).then(ok).catch(function () {
                                    oh(`<gray>${f}</gray>不存在！`);
                                });
                            });
                        } else {
                            f = path.join(file, 'index');
                            read(f).then(ok).catch(run);
                        }

                    } else {
                        fs.readdir(file, function (error, names) {
                            if (error) return oh(error);
                            // var indexfile, packagefile;
                            names.forEach(function (name) {
                                files.push(path.join(file, name));
                            });
                            // if (indexfile || packagefile) {
                            //     saveFolder(file);
                            // }
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
            else console.warn(e + ",", '已跳过', `<gray>${file1}</gray>`);
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
