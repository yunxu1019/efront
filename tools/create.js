var fs = require("fs");
var path = require("path");
var appname = process.env.APP;
if (!appname) throw `请先设置app名称！如：${/win\d/i.test(process.platform) ? 'set' : 'export'} app=abc`;
var { COMS_PATH = "./coms", PAGE_PATH = "./apps", PUBLIC_PATH = "./public" } = process.env;
function mkdirIfNotExists(dirname) {
    if (!fs.existsSync(dirname))
        fs.mkdirSync(dirname);
}
function throwMakeIfExists(dirname) {
    if (fs.existsSync(dirname))
        throw new Error(`${dirname} 已存在！`);
    else fs.mkdirSync(dirname);
}
mkdirIfNotExists("_envs");
mkdirIfNotExists(PAGE_PATH);
mkdirIfNotExists(COMS_PATH);
mkdirIfNotExists(PUBLIC_PATH);
mkdirIfNotExists(path.join(PAGE_PATH, `${appname}`));
var setupData = [
    `set app=${appname}`,
    `set PAGE_PATH=${PAGE_PATH}`,
    `set COMS_PATH=${COMS_PATH}`,
    `set public_path=${PUBLIC_PATH}`
].join("\r\n");
setupData = Buffer.from(setupData);
fs.writeFileSync(path.join("_envs", "setup.bat"), setupData);
copy(path.join(__dirname, "../coms/zimoli"), path.join(COMS_PATH, `zimoli`));
var hasindex = false;
fs.readdirSync(path.join(__dirname, "../apps/zimoli")).map(function (name) {
    hasindex = hasindex || /^index.html$/i.test(name);
    copy(path.join(__dirname, "../apps/zimoli/", name), path.join(PAGE_PATH, `${appname}`, name));
});
if (!hasindex) copy(path.join(__dirname, "../apps/index.html"), path.join(PAGE_PATH, `${appname}/index.html`));

function copy(path1, path2) {
    fs.exists(path2, function (exists) {
        if (exists) console.error(`目标路径已存在：${path2}`);
        else fs.exists(path.dirname(path2), function (exists) {
            if (!exists) console.error("目标路径无法创建！");
            else fs.exists(path1, function (exists) {
                if (!exists) console.error(`源路径不存在：${path1}`);
                else fs.stat(path1, function (error, stats) {
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
            });
        });
    });
}