var setupenv = require("../efront/setupenv");
var path = require("path");
var mixin = require("../efront/mixin");
var fs = require("fs");
var memery = require('../efront/memery');
var {
    APP = ".",
    EXPORT_TO,
    RELEASE,
    PREFIX,
    POLYFILL,
    SOURCEDIR,
    DESTPATH,
} = memery

var PUBLIC_APP = /* process.argv[2] || */ APP;
var env = PUBLIC_APP ? setupenv(PUBLIC_APP) : setupenv('.');
var {
    PUBLIC_PATH = memery.PUBLIC_PATH || "./public",
} = memery;
var PAGE = env.PAGE || "";
var COMM = env.COMM;
var ICON = env.ICON;
var AAPI = env.APIS || "";
var PAGE_PATH = env.PAGE_PATH;
var COMS_PATH = env.COMS_PATH;
var ICON_PATH = env.ICON_PATH;
var joinpath = ([a, b]) => path.resolve(path.join(a || '', b || ''));
var comsroot_map = Object.create(null);
var comms_root = mixin(env.COMS_PATH, env.COMM)
    .map(joinpath)
    .filter(a => a in comsroot_map ? false : comsroot_map[a] = true)
    .filter(fs.existsSync);
var comms_root_length = comms_root.length;
var buildinpath = path.join(__dirname, '..');
comms_root = comms_root.filter(a => path.resolve(a) !== buildinpath);
if (comms_root.length < comms_root_length) comms_root.push(buildinpath);
var ccons_root = ICON && ICON_PATH ? mixin(env.ICON_PATH, env.ICON).map(joinpath).filter(fs.existsSync) : [];
var pages_root = mixin(memery.PAGE_PATH, env.PAGE).map(joinpath).filter(fs.existsSync);
POLYFILL = !/^(0|false|null)$/i.test(POLYFILL);
var resolve_component_file_path = function (public_path = APP, source_paths = ["."].concat(pages_root, comms_root)) {
    for (var cx = 0, dx = source_paths.length; cx < dx; cx++) {
        var temp_path = source_paths[cx];
        var public_app = path.join(temp_path, public_path);
        if (fs.existsSync(public_app) && fs.statSync(public_app).isFile()) {
            if (cx === 0) pages_root = ["."];
            return public_app;
        }
    }
    return "";
};
var public_app = resolve_component_file_path().replace(/\\/g, '/');
if (public_app && !pages_root.length) {
    var temp = path.resolve(APP), parent = path.dirname(temp);
    if (fs.existsSync(parent)) pages_root.push(parent);
    if (/^index(\.[cm]?[jt]sx?)?$/i.test(path.basename(temp))) pages_root.push(path.dirname(parent));
    while (temp && temp !== parent) {
        temp = parent;
        var modulepath = path.join(parent, 'node_modules');
        if (fs.existsSync(modulepath)) {
            if (!comms_root.indexOf(modulepath)) comms_root.push(modulepath);
        }
        parent = path.dirname(temp);
    }
}

if (EXPORT_TO === undefined) EXPORT_TO = public_app
    .replace(/\.[cm]?[jt]sx?$/i, '')
    .replace(/([\w\-]+)\/index$/i, "$1")
    .replace(/\-(\w)/g, (_, w) => w.toUpperCase())
    .replace(/[\s\S]*\/([^\\\/]+)$/, "$1");
var aapis_root = "./apis/" + AAPI;
var ignore_path = PUBLIC_PATH.split(/[,;]/).concat((memery.ENVS_PATH || "./_envs").split(/[,;]/))
    .filter(fs.existsSync).map(a => fs.realpathSync(a)).filter(a => {
        for (var p of pages_root) {
            if (getPathIn(p, a)) return true;
        }
    });

module.exports = {
    comms_root,
    class_prefix: PREFIX || '',
    ccons_root,
    pages_root,
    aapis_root,
    ignore_path,
    PAGE,
    COMM,
    ICON,
    SOURCEDIR,
    AAPI,
    PUBLIC_PATH,
    PAGE_PATH,
    COMS_PATH,
    POLYFILL,
    public_app,
    EXPORT_TO,
    DESTPATH,
    include_required: !!RELEASE || !public_app,
    APP
};
