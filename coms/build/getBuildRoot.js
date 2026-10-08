var fs = require("fs");
var fsp = fs.promises;
var path = require("path");
var isLib = require("../efront/isLib");
var libs_root = isLib.libs_root;
var getPathIn = require("./getPathIn");
var {
    comms_root,
    pages_root,
    ignore_path,
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
    return new Promise(function (ok, oh) {
        var realpath = fileinfo.realpath;
        fs.readFile(realpath, function (error, data) {
            if (error) return ok([]);
            var result = [], ignorelist = [];
            String(data).replace(/<!--[\s\S]*?-->/g, '').replace(/<script\s[^\>]*?\bsrc\=('.+?'|".+?"|.+?)[\s|\>]/ig, function (_, url) {
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
                    res.main = BuildInfo.fromPage(mainPath, path.join(realpath, '..', mainPath));
                }
            }
            ok(res);
        });
    });
};
var filterHtmlImportedJs = async function (infos) {
    var promises = infos.filter(function ({ url }) {
        return /\.(xht|html?|jsp|asp|php)$/i.test(url);
    }).map(getScriptsUrlInHtmlFile);
    var datas = await Promise.all(promises);
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
    var founed = new Set;
    infos = infos.map(function (info) {
        var { url, realpath, destpath } = info;
        if (test(ignoreReg, ignoreJsMap, url)) {// 忽略文件，目标代码中不出现
            return;
        }
        var found = test(urlsReg, simpleJsMap, url);
        if (found) {
            var info = BuildInfo.fromLone(url, realpath);
            founed.add(info);
            return info;
        }
        if (/^\/.*?\.js$/i.test(url)) {
            for (var fpath of [url, destpath, realpath]) {
                if (fpath in simpleJsMap || urlsReg.test(fpath)) {
                    found = true;
                    break;
                }
            }
            if (found) {
                info = BuildInfo.fromLone(url, realpath);
                founed.add(info);
                return info;

            }
        }
        return info;
    }).filter(a => !!a);
    var urlsMap = Object.create(null);
    infos = infos.concat(mainPaths).filter(({ url }) => {
        url = url.replace(/\.[cm][tj]sx?$/i, '.js');
        var keep = !urlsMap[url];
        if (keep) urlsMap[url] = true;
        return keep;
    });
    infos = infos.filter(info => {
        if (founed.has(info)) return true;
        var { url } = info;
        if (/\.html?$/i.test(url) && url.replace(/\.html?$/i, ".js") in urlsMap) return false;
        return true;
    });
    return infos;
};
function paddExtension(file) {
    var parents = [""].concat(/^\.*[\/\\]/.test(file) ? pages_root.concat(comms_root, libs_root) : comms_root.concat(pages_root, libs_root));
    return detectWithExtension(file, comexts, parents);
}
var fromFile = BuildInfo.fromFile;
var fromFolder = BuildInfo.fromFolder;
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
        indexMap[f.url] = indexMap[file1];
    };
    files.reverse();
    while (files.length) {
        var file = files.pop();
        if (!file) continue;
        var file1 = file;
        if (file in indexMap) {
            if (matchFileOnly) try {
                file = await paddExtension(file);
            } catch (e) {
                save(BuildInfo.fromWarn(file, e));
                continue;
            }
            else file = await paddExtension(file);
        }
        if (getPathIn(ignore_path, file)) continue;
        try {
            var stat = await fsp.stat(file);
            if (stat.isFile()) {
                if (/\.less$/i.test(file)) continue;
                var rel = fromFile(file);
                if (rel) {
                    save(rel);
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
                    f = await paddExtension(f);
                    var rel = fromFolder(file, f);
                } else {
                    f = path.join(file, 'index');
                    f = await paddExtension(f);
                    rel = fromFolder(file, f);
                }
                if (rel) {
                    save(rel);
                }
            }
            else {
                if (getPathIn(comms_root, file)) continue;
                var names = await fsp.readdir(file, { withFileTypes: true });
                names.forEach(function (name) {
                    if (name.isDirectory()) name = name.name + path.sep;
                    else name = name.name;
                    if (/^\./.test(name)) return;
                    if (/^#/.test(name)) return;
                    files.push(path.join(file, name));
                });
            }
        } catch (e) {
            if (erroredFiles[file1]) break;
            if (/^\w+$/.test(file1)) {
                try {
                    require.resolve(file1);
                    break;
                } catch { }
            }
            erroredFiles[file1] = true;
            if (!matchFileOnly) console.error(e, "\r\n");
            else console.warn(e + ",", i18n`已跳过`, `<gray>${file1}</gray>`);
        }
    }
    var result = await filterHtmlImportedJs(result);
    if (matchFileOnly) {
        var res = [];
        result.forEach(function (a) {
            return res[indexMap[a.url]] = a;
        });
        result = res;
    }
    return result;
};
module.exports = getBuildRoot;
