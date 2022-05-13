var fs = require("fs");
var path = require("path");
var memery = require('../efront/memery');
var appname = memery.APP;
var {
    ENVS_PATH = "_envs",
    COMS_PATH = "./coms",
    PAGE_PATH = "./apps",
    PUBLIC_PATH = "./public"
} = memery;
function getFirstPath(p) {
    return p.split(/[,;]/)[0];
}
ENVS_PATH = getFirstPath(ENVS_PATH);
COMS_PATH = getFirstPath(COMS_PATH);
PAGE_PATH = getFirstPath(PAGE_PATH);
PUBLIC_PATH = getFirstPath(PUBLIC_PATH);
function mkdirIfNotExists(dirname) {
    if (!fs.existsSync(dirname))
        fs.mkdirSync(dirname);
}
function throwMakeIfExists(dirname) {
    if (fs.existsSync(dirname))
        throw new Error(`${dirname} 已存在！`);
    else fs.mkdirSync(dirname);
}
function from(srcname = 'kugou', destname = appname) {
    if (!appname) throw `请先设置app名称！如：${/win\d/i.test(process.platform) ? 'set' : 'export'} app=abc`;
    var setupData = [
    ];
    if (destname) {
        setupData.push(`if not defined app set app=${destname}`);
        setupData.push(`set page=${destname}`);
    }
    setupData.push('set coms=' + destname + "," + srcname + (srcname !== "zimoli" ? ",zimoli" : ""));
    mkdirIfNotExists(ENVS_PATH);
    mkdirIfNotExists(PAGE_PATH);
    mkdirIfNotExists(COMS_PATH);
    mkdirIfNotExists(PUBLIC_PATH);
    mkdirIfNotExists(path.join(PAGE_PATH, `${destname}`));

    var jsondata = {
        "name": appname || srcname,
        "version": "1.0.0",
        "descriptions": "Efront 创建的项目",
        "scripts": {
            test: "efront live",
            build: "efront build"
        },
    };
    setupData = Buffer.from(setupData.join("\r\n"));
    if (destname) {
        fs.writeFileSync(path.join(ENVS_PATH, `app=${destname}.bat`), setupData);
    } else {
        fs.writeFileSync(path.join(ENVS_PATH, "setup.bat"), setupData);
    }
    var packagepath = path.join(PAGE_PATH, '../package.json');
    if (!fs.existsSync(packagepath)) {
        fs.writeFileSync(packagepath, JSON.stringify(jsondata, null, 4));
    }
    var hasindex = false;
    fs.readdirSync(path.join(__dirname, `../../apps/${srcname}`)).map(function (name) {
        hasindex = hasindex || /^index\.(html?|asp|jsp|php)$/i.test(name);
        copy(path.join(__dirname, `../../apps/${srcname}/`, name), path.join(PAGE_PATH, `${destname}`, name));
    });
    if (!hasindex) copy(path.join(__dirname, "../../apps/_index.html"), path.join(PAGE_PATH, `${destname}/index.html`));
}
module.exports = from;
function copy(path1, path2) {
    if (fs.existsSync(path2)) {
        console.error(`目标路径已存在：${path2}`);
    } else if (!fs.existsSync(path.dirname(path2))) {
        console.error("目标路径无法创建！");
    } else if (!fs.existsSync(path1)) {
        console.error(`源路径不存在：${path1}`);
    } else {
        fs.stat(path1, function (error, stats) {
            if (error) console.error(`无法读取源路径：${path1}`);
            else if (stats.isDirectory()) {
                fs.readdir(path1, function (error, names) {
                    if (error) console.error(`读取目录失败：${path1}`)
                    else fs.mkdir(path2, function (error) {
                        if (error) console.error(`创建目录失败：${path2}`);
                        else names.forEach(function (name) {
                            copy(path.join(path1, name), path.join(path2, name));
                        })
                    });
                });
            } else {
                fs.readFile(path1, function (error, data) {
                    if (error) console.error(`读取文件失败：${path1}`);
                    else fs.writeFile(path2, data, function (error) {
                        if (error) console.error(`写入文件失败：${path2}`);
                    });
                })
            }
        });
    }
}