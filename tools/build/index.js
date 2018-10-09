#!/usr/bin/env node

require("../../process/console");
var environment = require("./environment");
var fs = require("fs");
var path = require("path");
if (!process.cwd() === path.dirname(__dirname)) throw new Error("请在项目根目录启动！");
var {
    PUBLIC_PATH,
    APP,
    pages_root,
    comms_root
} = environment;
var PUBLIC_APP = /* process.argv[2] || */ APP;
if (!PUBLIC_APP) throw new Error("请配置要发布的项目名称！");
if (!PUBLIC_PATH) throw new Error("请指定输出路径！");
if (!fs.existsSync(PUBLIC_PATH)) fs.mkdirSync(PUBLIC_PATH);
if (fs.statSync(PUBLIC_PATH).isFile()) throw new Error("输出路径已存在，并且不是文件夹！");
var loadData = require("./loadData");
var write = require("./write");
var clean = require("./clean");
var finish = require("./finish");
var is_commponent_package;
var resolve_component_file_path = function (public_path = PUBLIC_APP, source_paths = [""].concat(pages_root).concat(comms_root)) {
    for (var cx = 0, dx = source_paths.length; cx < dx; cx++) {
        var temp_path = source_paths[cx];
        var public_app = path.join(temp_path, public_path);
        if (fs.existsSync(public_app) && fs.statSync(public_app).isFile()) return public_app;
    }
    return "";
};
var public_app = resolve_component_file_path();
if (public_app) {
    //导出组件
    console.log(public_app);
    is_commponent_package = true;
    var toComponent = require("./toComponent");
    loadData(["coms/zimoli/[].map.js", public_app])
        .then(toComponent)
        .then(function (response) {
            return write(response, PUBLIC_PATH);
        })
        .then(finish);
} else if (fs.existsSync(pages_root) && fs.statSync(pages_root).isDirectory()) {
    //导出项目
    var public_path = path.join(PUBLIC_PATH, PUBLIC_APP);
    public_app = pages_root;
    is_commponent_package = false;
    var toApplication = require("./toApplication");
    loadData([
        pages_root,
        "apps/index.html",
        "apps/favicon.ico",
        "coms/zimoli/main.js",
        "coms/zimoli/zimoli.js",
        "coms/zimoli/[].map.js",
        "coms/zimoli/promise.js",
        "coms/zimoli/fastclick.js"
    ].concat(environment.ccons_root))
        .then(toApplication)
        .then(function (response) {
            return clean(public_path).then(function () {
                return write(response, public_path);
            });
        })
        .then(finish);
} else {
    throw new Error(`要发布或打包的源路径不存在:${public_app}`);
}