"use strict";
var fs = require("fs");
var fsp = fs.promises;
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
    var fbase = fileinfo.url.replace(/[^\\\/]+$/, '').split(/[\/\\]/);
    fbase.pop();
    var burl = function (url) {
        if (/^\w+\:|^\//.test(url)) return url;
        url = url.split(/[\/\\]/);
        url.reverse();
        var base = fbase.slice();
        while (/^\.+$/.test(url[url.length - 1])) {
            var u = url.pop();
            if (u.length === 2) base.pop();
        }
        while (base.length) url.push(base.pop());
        return url.reverse().join('/');
    };
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
                    var res = result.map(url => url.replace(/\?[\s\S]*?$/, "").replace(/\\/g, "/")).map(burl);
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
var commap = getBuildInfo.commap["?"];
var getBuildRoot = async function (files, matchFileOnly) {
    files = [].concat(files || []);
    if (!files.length) return files;
    var indexMap = Object.create(null);
    files.forEach((f, cx) => indexMap[f] = cx);
    var result = [];
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
    while (files.length) {
        var file = files.shift();
        if (!file) continue;
        var file1 = file;
        if (file in indexMap) {
            file = await paddExtension(file);
        }
        if (getPathIn(ignore_path, file)) continue;
        try {
            var stat = await fsp.stat(file);
            if (stat.isFile()) {
                if (/\.less$/i.test(file)) continue;
                if (file in commap) {
                    saveComm(commap[file], file);
                    continue;
                }
                var rel = getPathIn(comms_root, file);
                if (rel) {
                    saveComm(rel, file);
                    continue;
                }
                var rel = getPathIn(pages_root, file);
                if (rel) {
                    savePage(rel);
                    continue;
                }
                var rel = getPathIn(PAGE_PATH.split(","), file);
                if (rel) {
                    saveCopy(rel);
                    continue;
                }
                if (/\.png$/i.test(file)) {
                    var name = path.parse(file).base.replace(/[\\\/]+/g, "/");
                    save("." + name);
                    continue;
                }
                if (!erroredFiles[file]) console.warn(`<gray>${file}</gray>`, "已跳过");
                erroredFiles[file] = true;
            }
            else if (matchFileOnly) {
                var f = path.join(file, 'package.json');

                if (fs.existsSync(f)) {
                    var data = await fsp.readFile(f);
                    var d = JSON.parse(
                        String(data)
                    );
                    var f = path.join(file, d.main || 'index');
                    await paddExtension(f);
                    saveFolder(file);
                } else {
                    f = path.join(file, 'index');
                    await paddExtension(f);
                    saveFolder(file);
                }
            }
            else {
                if (getPathIn(comms_root, file)) continue;
                var names = await fsp.readdir(file, { withFileTypes: true });
                names.forEach(function (name) {
                    if (name.isDirectory()) name = name.name + path.sep;
                    else name = name.name;
                    files.push(path.join(file, name));
                });
            }
        } catch (e) {
            if (erroredFiles[file1]) return;
            if (/^\w+$/.test(file1)) {
                try {
                    require.resolve(file1);
                    return;
                } catch { }
            }
            erroredFiles[file1] = true;
            if (!matchFileOnly) console.error(e, "\r\n");
            else console.warn(e + ",", i18n`已跳过`, `<gray>${file1}</gray>`);
        }
    }
    var result = await filterHtmlImportedJs(result);
    var res = [];
    if (matchFileOnly) {
        result.forEach(function (a) {
            return res[indexMap[a]] = a;
        });
    } else {
        res = result;
    }
    return res;
};
module.exports = getBuildRoot;
