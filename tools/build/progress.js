var fs = require("fs");
var path = require("path");
if (!process.cwd() === path.dirname(__dirname)) throw new Error("请在项目根目录启动！");
var environment = require("./environment");
var {
    PUBLIC_PATH,
    APP,
    PAGE_PATH,
    COMS_PATH,
    pages_root,
    comms_root
} = environment;
var PUBLIC_APP = /* process.argv[2] || */ APP;
if (!PUBLIC_APP) throw new Error("请配置要发布的项目名称！");
if (!PUBLIC_PATH) throw new Error("请指定输出路径！");
var reload = 0;
var loadData = require("./loadData");
var write = require("./write");
var clean = require("./clean");
var _finish = require("./finish");
function builder(cleanAfterBuild = false, cleanBeforeBuild = false) {
    if (builder.ing) return reload++;
    builder.ing = true;
    reload = 0;
    var savedTime = new Date;
    var finish = function () {
        _finish(new Date - savedTime);
    };
    if (!fs.existsSync(PUBLIC_PATH)) fs.mkdirSync(PUBLIC_PATH);
    if (fs.statSync(PUBLIC_PATH).isFile()) throw new Error("输出路径已存在，并且不是文件夹！");
    var is_commponent_package;
    var resolve_component_file_path = function (public_path = PUBLIC_APP, source_paths = [""].concat(pages_root, comms_root)) {
        for (var cx = 0, dx = source_paths.length; cx < dx; cx++) {
            var temp_path = source_paths[cx];
            var public_app = path.join(temp_path, public_path);
            if (fs.existsSync(public_app) && fs.statSync(public_app).isFile()) return public_app;
        }
        return "";
    };
    var public_app = resolve_component_file_path();
    var getBuiltVersion = function (filepath) {
        return new Promise(function (ok) {
            fs.exists(filepath, function (exists) {
                if (!exists) return ok();
                fs.stat(filepath, function (error, stats) {
                    if (error) return ok();
                    if (!stats.isFile()) return ok();
                    fs.readFile(filepath, function (error, data) {
                        if (error) return ok();
                        ok(data);
                    })
                })
            })
        }).then(function (data) {
            var version = /\bcompiledinfo\s*=\s*(['"`])(.*?GMT[+\-]\d{4})\b.*?\1/i.exec(data);
            if (version) {
                var timepart = version[2];
                return new Date(timepart);
            }
        })
    };
    if (public_app) {
        //导出组件
        var public_path = path.join(PUBLIC_PATH, PUBLIC_APP);
        is_commponent_package = true;
        var toComponent = require("./toComponent");
        return loadData([path.join(COMS_PATH, "/zimoli/[]map.js"), public_app], 0, public_path)
            .then(toComponent)
            .then(function (response) {
                return write(response, PUBLIC_PATH);
            })
            .then(finish);
    } else if (fs.existsSync(pages_root[0]) && fs.statSync(pages_root[0]).isDirectory()) {
        //导出项目
        var public_path = path.join(PUBLIC_PATH, PUBLIC_APP);
        public_app = pages_root;
        is_commponent_package = false;
        var toApplication = require("./toApplication");
        return getBuiltVersion(path.join(public_path, "index.html")).then(function (lastBuildTime) {
            if (cleanBeforeBuild) {
                lastBuildTime = 0;
            }
            loadData(pages_root.concat(
                environment.PAGE_PATH.split(",").map(a => path.join(a, "index.html")),
                environment.pages_root,
                path.join(__dirname, "../../coms", "zimoli/main.js"),
                path.join(__dirname, "../../coms", "zimoli/zimoli.js"),
                path.join(__dirname, "../../coms", "zimoli/[]map.js"),
                path.join(__dirname, "../../coms", "zimoli/promise.js")
            ).concat(environment.ccons_root || []), lastBuildTime, public_path)
                .then(toApplication)
                .then(function (response) {
                    var deletedMap = {};
                    for (var k in response) {
                        if (!response[k].realpath) {
                            if (response[k].warn) deletedMap[k] = [];
                            delete response[k];
                        }
                    }
                    for (var k in response) {
                        let dependence = response[k].dependence;
                        dependence && dependence.forEach(function (key) {
                            if (key in deletedMap) {
                                deletedMap[key].push(k);
                            }
                        });
                    }
                    for (var k in deletedMap) {
                        console.warn(k, "required by '" + deletedMap[k].join(",") + "' skiped");
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
        throw new Error(`要发布或打包的源路径不存在:${public_app}`);
    }
}
module.exports = builder;