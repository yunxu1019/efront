"use strict";
var fs = require("fs");
var path = require("path");
var isLib = require("../efront/isLib");
var getPathIn = require("./getPathIn");
var {
    comms_root,
    pages_root,
    PAGE_PATH,
    ignore_path,
    include_required
} = require("./environment");
var erroredFiles = Object.create(null);
var getScriptsUrlInHtmlFile = function (fileinfo) {
    return Promise.all(
        [].concat(fileinfo.fullpath).map(function (fullpath) {
            return new Promise(function (ok, oh) {
                fullpath = path.resolve(fullpath);
                fs.readFile(fullpath, function (error, data) {
                    if (error) return ok([]);
                    var result = [], ignorelist = [], workerlist = [];
                    String(data).replace(/<script\s[^\>]*?\bsrc\=('.+?'|".+?"|.+?)[\s|\>]/ig, function (_, url) {
                        if (/ignoreoncompile|efrontworker/i.test(_)) {
                            ignorelist.push(result.length);
                        }
                        result.push(url.replace(/^(['"])(.+?)\1$/g, "$2"));
                    });
                    var res = result.map(url => url.replace(/\?[\s\S]*?$/, "").replace(/\\/g, "/"));
                    res.ignore = ignorelist;
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
        return /\.(xht|html?|jsp|asp|php)$/i.test(url);
    }).map(getBuildInfo).filter(a => !!a).map(getScriptsUrlInHtmlFile);
    return Promise.all(promises).then(function (datas) {
        var urls = [].concat.apply([], datas);
        var mainPaths = urls.filter(d => !!d.main).map(d => d.main);
        var ignoreJsMap = {};
        urls.forEach(a => {
            if (a.ignore) {
                a.ignore.forEach(b => {
                    ignoreJsMap[a[b]] = true;
                });
            }
        })
        urls = [].concat.apply([], urls);
        var simpleJsMap = {};
        var regUrls = [], ignoreUrls = [];
        urls.forEach(function (url) {
            simpleJsMap[url] = true;
            try {
                var regsource = new RegExp(url.replace(/[\.\/\^\$\:]/g, "\\$&").replace(/\*/g, ".*?")).source;
                if (ignoreJsMap[url]) {
                    ignoreUrls.push(regsource);
                } else {
                    regUrls.push(regsource);
                }
            } catch (e) { }
        });
        var creatReg = urls => new RegExp(`^(?:${urls.join("|")})$`, "i");
        var urlsReg = creatReg(regUrls);
        var ignoreReg = creatReg(ignoreUrls);
        var test = (r, m, t) => t in m || t.slice(1) in m || r.test(t) || r.test(t.slice(1));
        roots = roots.map(function (root) {
            if (test(ignoreReg, ignoreJsMap, root)) {
                return '';
            }
            var found = test(urlsReg, simpleJsMap, root);
            if (found) {
                return "@" + root.slice(1);
            }
            if (/^\/.*?\.js$/i.test(root)) {
                var buildinfo = getBuildInfo(root);
                for (var fpath of [buildinfo.url, buildinfo.destpath].concat(buildinfo.fullpath)) {
                    if (fpath in simpleJsMap || urlsReg.test(fpath)) {
                        found = true;
                        break;
                    }
                }
                if (found) return "@" + path.relative(PAGE_PATH.split(",")[0], fpath).replace(/[\\\/]+/g, "/");
            }
            return root;
        }).filter(a => !!a);
        var urlsMap = {};
        mainPaths = mainPaths.map(m => m.replace(/\.[^\.]*$/i, "") + ".js");
        roots = roots.concat(mainPaths).filter(name => {
            name = String(name).replace(/\.[mc]?[jt]sx?$/i, "") + ".js";
            var keep = !urlsMap[name];
            if (keep) urlsMap[name] = true;
            return keep;
        });
        for (let cx = roots.length; cx >= 0; cx--) {
            let url = roots[cx];
            if (!/^@/.test(url) && /\.html?$/i.test(url) && url.replace(/\.html?$/i, ".js") in urlsMap) {
                roots.splice(cx, 1);
            }
        }
        return roots;
    });
};
function paddExtension(file) {
    var parents = [""].concat(/^\.*[\/\\]/.test(file) ? pages_root.concat(comms_root) : comms_root.concat(pages_root));
    return detectWithExtension(file, ['', '.js', '.xht', '.ts', '.html', '.json', '.yml', '.jsx', '.tsx', '.vue', '.vuex'], parents);
}
var toString = function () { return this.url };
var commap = getBuildInfo.commap["?"];
var getBuildRoot = function (files, matchFileOnly) {
    files = [].concat(files || []);
    if (!files.length) return Promise.resolve(files);
    var indexMap = Object.create(null);
    files.forEach((f, cx) => indexMap[f] = cx);
    var resolve;
    var result = [];
    var run = function () {
        if (!files.length) return resolve(result);
        var file1 = files.shift();
        if (!file1) return run();
        var save = function (f) {
            if (!(f in indexMap)) {
                result.push(f);
            }
            indexMap[f] = indexMap[file1];
        };
        var saveComm = function (rel, file) {
            if (!include_required && isLib(file)) {
                saveLlib(rel);
                return;
            }
            var name = String(rel)
                .replace(/[\\\/]+/g, "$");
            save(name);
        };
        var savePage = function (rel) {
            var name = String(rel).replace(/[\\\/]+/g, "/");
            save("/" + name);
        };
        var saveCopy = function (rel) {
            var name = "@" + String(rel).replace(/[\\\/]+/g, "/");
            save(name);
        };
        var saveLlib = function (rel) {
            var name = "\\" + String(rel).replace(/[\\\/]+/g, "/");
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
            if (getPathIn(ignore_path, file)) return;
            return new Promise(function (ok, oh) {
                fs.stat(file, function (error, stat) {
                    if (error) return oh(error);
                    if (stat.isFile()) {
                        if (/\.less$/i.test(file)) return ok();
                        if (file in commap) {
                            return saveComm(commap[file], file), ok();
                        }
                        var rel = getPathIn(comms_root, file);
                        if (rel) {
                            return saveComm(rel, file), ok();
                        }
                        var rel = getPathIn(pages_root, file);
                        if (rel) {
                            return savePage(rel), ok();
                        }
                        var rel = getPathIn(PAGE_PATH.split(","), file);
                        if (rel) {
                            console.log(rel, file)
                            return saveCopy(rel), ok();
                        }
                        if (/\.png$/i.test(file)) {
                            var name = path.parse(file).base.replace(/[\\\/]+/g, "/");
                            return save("." + name), ok();
                        }
                        if (!erroredFiles[file]) console.warn(`<gray>${file}</gray>`, "已跳过");
                        erroredFiles[file] = true;
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
                        if (getPathIn(comms_root, file)) return ok();
                        fs.readdir(file, { withFileTypes: true }, function (error, names) {
                            if (error) return oh(error);
                            // var indexfile, packagefile;
                            names.forEach(function (name) {
                                if (name.isDirectory()) name = name.name + path.sep;
                                else name = name.name;
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
            else console.warn(e + ",", i18n`已跳过`, `<gray>${file1}</gray>`);
        }).then(run);
    };
    return new Promise(function (ok) {
        resolve = async function (result) {
            var result = await filterHtmlImportedJs(result);
            var res = [];
            if (matchFileOnly) {
                result.forEach(function (a) {
                    return res[indexMap[a]] = a;
                });
            } else {
                res = result;
            }
            ok(res);
        };
        run();
    });
};
module.exports = getBuildRoot;
