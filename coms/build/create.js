var fs = require("fs");
var fsp = fs.promises;
var path = require("path");
var memery = require('../efront/memery');
function getFirstPath(p, a) {
    var cwd = process.cwd();
    p = p.split(/[,;]/).filter(a => /^\.\./.test(path.relative(a, cwd)) && !/^\.\./.test(path.relative(cwd, a)));
    return p[0] ?? a;
}
function mkdirIfNotExists(dirname) {
    if (!fs.existsSync(dirname))
        fs.mkdirSync(dirname);
}
function throwMakeIfExists(dirname) {
    if (fs.existsSync(dirname))
        throw new Error(i18n`${dirname} 已存在！`);
    else fs.mkdirSync(dirname);
}
async function from(srcname = 'blank', destname = memery.APP) {
    var appname = memery.APP;
    var {
        COMS_PATH,
        PAGE_PATH,
        PUBLIC_PATH
    } = memery;
    COMS_PATH = getFirstPath(COMS_PATH, "coms");
    PAGE_PATH = getFirstPath(PAGE_PATH, "apps");
    PUBLIC_PATH = getFirstPath(PUBLIC_PATH, "public");
    if (destname) {
        mkdirIfNotExists(PAGE_PATH);
    }
    var packagepath = path.join(PAGE_PATH, '../package.json');
    if (!fs.existsSync(packagepath)) {
        var jsondata = {
            "name": appname || destname || srcname,
            "version": "1.0.0",
            "descriptions": "Efront 创建的项目",
            "scripts": {
                test: "efront live",
                build: "efront build"
            },
        };
        fs.writeFileSync(packagepath, JSON.stringify(jsondata, null, 4));
    }
    await copy(path.join(__dirname, `../../apps/${srcname}`), path.join(PAGE_PATH, destname));
    var names = await fsp.readdir(path.join(PAGE_PATH, destname));
    var hasindex = false;
    for (var n of names) {
        if (memery.webindex.indexOf(n) >= 0) {
            hasindex = true;
            break;
        }
    }
    if (!hasindex) await copy(path.join(__dirname, "../../apps/_index.html"), path.join(PAGE_PATH, `${destname}/${memery.webindex[0]}`));
    await copyIfExists(path.join(__dirname, `../../coms/${srcname}`), path.join(COMS_PATH, destname));
    mkdirIfNotExists(COMS_PATH);
    mkdirIfNotExists(PUBLIC_PATH);
    console.info("创建完成！");
}
module.exports = from;
function copyIfExists(src, dst) {
    if (fs.existsSync(src)) return copy(src, dst);
}
async function copy(src, dst) {
    var rest = [src, dst];
    while (rest.length) {
        dst = rest.pop();
        src = rest.pop();
        if (fs.existsSync(dst)) {
            console.error(i18n`目标路径已存在：${dst}`);
        } else if (!fs.existsSync(path.dirname(dst))) {
            console.error(i18n`目标路径无法创建！`);
        } else if (!fs.existsSync(src)) {
            console.error(i18n`源路径不存在：${src}`);
        }
        else try {
            var stats = fsp.stat(src);
            stats.catch(_ => console.error(i18n`无法读取源路径：${src}`));
            stats = await stats;
            if (stats.isDirectory()) {
                var names = fsp.readdir(src);
                names.catch(_ => console.error(i18n`读取目录失败：${src}`));
                names = await names;
                var p = fsp.mkdir(dst);
                p.catch(_ => console.error(i18n`创建目录失败：${dst}`));
                await p;
                for (var n of names) rest.push(path.join(src, n), path.join(dst, n));
            }
            else {
                var data = fsp.readFile(src);
                data.catch(_ => console.error(i18n`读取文件失败：${src}`));
                data = await data;
                var w = fsp.writeFile(dst, data);
                w.catch(_ => console.error(i18n`写入文件失败：${dst}`));
                await w;
            }
        } catch { }
    }
}