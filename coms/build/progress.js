var fs = require("fs");
var path = require("path");
var environment = require("./environment");
var {
    PUBLIC_PATH,
    APP,
    PAGE_PATH,
    POLYFILL,
    pages_root,
    public_app
} = environment;
var PUBLIC_APP = /* process.argv[2] || */ APP.replace(/\.html?$/i, "");
// if (!PUBLIC_APP) throw new Error("请配置要发布的项目名称！");
if (!PUBLIC_PATH) throw new Error("请指定输出路径！");
var reload = 0;
var loadData = require("./loadData");
var write = require("./write");
var clean = require("./clean");
var _finish = require("./finish");
var setting = require("./setting");
var memery = require("../efront/memery");
var getBuiltVersion = function (filepath) {
    return new Promise(function (ok) {
        fs.stat(filepath, function (error, stats) {
            if (error) return ok();
            if (!stats.isFile()) return ok();
            fs.readFile(filepath, function (error, data) {
                if (error) return ok();
                ok(data);
            });
        });
    }).then(function (data) {
        var version = /\bcompiledinfo\s*=\s*(['"`])(.*?GMT[+\-]\d{4})\b.*?\1/i.exec(data);
        if (version) {
            var timepart = version[2];
            return new Date(timepart);
        }
    });
};

function builder(cleanAfterBuild = false, cleanBeforeBuild = false) {
    console.time();
    if (builder.ing) return reload++;
    builder.ing = true;
    reload = 0;
    var savedTime = new Date;
    var finish = function () {
        _finish(new Date - savedTime);
    };
    if (!fs.existsSync(PUBLIC_PATH)) fs.mkdirSync(PUBLIC_PATH);
    if (fs.statSync(PUBLIC_PATH).isFile()) throw new Error("输出路径已存在，并且不是文件夹！");
    var commbuilder = require("../efront/commbuilder");
    var promise;
    if (public_app) {
        if (/\.asm$/i.test(public_app)) {
            console.info("正在重写ASM <cyan>", public_app, '</cyan>\r\n');
            //导出组件
            var public_path = path.join(PUBLIC_PATH, public_app);
            setting.is_commponent_package = true;
            var toComponent = require("./toAsm");
            var polyfills = [];
        } else {
            if (memery.EXTT === undefined) memery.EXTT = '.js';
            console.info("正在导出组件 <cyan>", public_app, '</cyan>\r\n');
            //导出组件
            var public_path = path.join(PUBLIC_PATH, public_app);
            setting.is_commponent_package = true;
            var toComponent = require("./toComponent");
            commbuilder.compress = false;
            commbuilder.prepare = false;
            var polyfills = POLYFILL ? [path.join(__dirname, "../", "basic/[]map.js")] : [];
        }
        promise = loadData(polyfills.concat(public_app), 0, public_path)
            .then(toComponent)
            .then(function (response) {
                return write(response, PUBLIC_PATH);
            })
            .then(finish)
    } else if (fs.existsSync(pages_root[0]) && fs.statSync(pages_root[0]).isDirectory()) {
        //导出项目
        require("../efront/isLib").dispose();
        if (memery.EXTT === undefined) memery.EXTT = '.txt';
        console.info("正在编译项目", `<cyan>${PUBLIC_APP}</cyan>`, PUBLIC_APP ? "\r\n" : '');
        var public_path = path.join(PUBLIC_PATH, PUBLIC_APP);
        setting.is_commponent_package = false;
        setting.is_file_target = /\.html?$/i.test(environment.APP);
        commbuilder.prepare = !setting.is_file_target;
        var toApplication = require("./toApplication");
        promise = getBuiltVersion(path.join(public_path, "index.html")).then(function (lastBuildTime) {
            if (cleanBeforeBuild) {
                lastBuildTime = 0;
            }
            var indexHTML = pages_root.map(a => path.join(a, "index.html")).filter(fs.existsSync);
            if (!indexHTML.length) {
                let temp = path.join(PAGE_PATH, "index.html");
                if (fs.existsSync(temp)) indexHTML = temp;
                if (!indexHTML.length) {
                    indexHTML = path.join(__dirname, "..", "..", "apps/index.html");
                }
            }
            polyfills = POLYFILL ? [
                path.join(__dirname, "../", "zimoli/Promise.js"),
                path.join(__dirname, "../", "basic/[]map.js")
            ] : [];
            return loadData(pages_root.concat(
                indexHTML,
                polyfills,
                path.join(__dirname, "../", "zimoli/main.js"),
                path.join(__dirname, "../", "zimoli/zimoli.js"),
            ).concat(environment.ccons_root || []), lastBuildTime, public_path)
                .then(toApplication)
                .then(function (response) {
                    var deletedMap = {};
                    for (var k in response) {
                        if (!response[k].realpath) {
                            if (response[k].warn) {
                                deletedMap[k] = [];
                                deletedMap[k].warn = response[k].warn;
                            }
                            delete response[k];
                        }
                    }
                    function saveDeleted(key) {
                        if (key in deletedMap) {
                            if (!~deletedMap[key].indexOf(k)) deletedMap[key].push(k);
                        }
                    }
                    for (var k in response) {
                        let dependence = response[k].dependence;
                        if (dependence) dependence.forEach(saveDeleted);
                    }
                    for (var k in deletedMap) {
                        if (deletedMap[k].length) {
                            console.warn(`已跳过 <red2>${k}</red2>, `, "该模块用在 <gray>" + deletedMap[k].join("</gray>, <gray>") + "</gray> 中");
                        } else {
                            if (deletedMap[k].warn) {
                                console.warn(deletedMap[k].warn);
                            } else {
                                console.warn("已跳过:", k);
                            }
                        }
                    }
                    var writeApplication = function () {
                        return write(response, public_path);
                    };
                    if (cleanAfterBuild) {
                        return clean(public_path).then(writeApplication);
                    }

                    for (var k in response) {
                        if (response[k].needed === false) {
                            delete response[k];
                        }
                    }
                    return writeApplication();
                })
                .then(finish).then(function () {
                    builder.ing = false;
                    if (reload) builder();
                });
        });
    } else {
        console.error(
            new Error(`要发布或打包的项目不存在:${PUBLIC_APP}`)
        );
        process.exit(1);
    }
    if (promise) promise.catch(function (e) {
        console.log(e);
        console.error(e);
        if (cleanBeforeBuild) {
            process.exit(1);
        }
    });
    return promise;
}
module.exports = builder;