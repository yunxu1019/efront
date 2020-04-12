var setupenv = require("../process/setupenv");
var path = require("path");
var fs = require("fs");
var {
    APP,
    EXPORT_AS,
    EXPORT_TO,
    RELEASE,
    PREFIX
} = process.env;
var PUBLIC_APP = /* process.argv[2] || */ APP;
var env = PUBLIC_APP ? setupenv(PUBLIC_APP) : setupenv('.');
var {
    PUBLIC_PATH = process.env.PUBLIC_PATH || "./public",
    EXTT
} = env;
var PAGE = env.PAGE || "";
var COMM = env.COMM;
var ICON = env.ICON;
var AAPI = env.APIS || "zimoli";
var PAGE_PATH = env.PAGE_PATH;
var COMS_PATH = env.COMS_PATH;
var ICON_PATH = env.ICON_PATH;
var comms_root = [].concat.apply([], COMS_PATH.split(",").map(function (COMS_PATH) {
    return COMM.split(/,/).map(a => path.join(COMS_PATH, a));
})).filter(fs.existsSync);
var ccons_root = ICON && ICON_PATH ? [].concat.apply([], ICON_PATH.split(",").map(function (ICON_PATH) {
    return ICON.split(/,/).map(a => path.join(ICON_PATH, a));
})).filter(fs.existsSync) : [];
var pages_root = [].concat.apply([], PAGE_PATH.split(",").map(function (PAGE_PATH) {
    return PAGE.split(/,/).map(a => path.join(PAGE_PATH, a));
})).filter(fs.existsSync);

var resolve_component_file_path = function (public_path = APP, source_paths = [""].concat(pages_root, comms_root)) {
    for (var cx = 0, dx = source_paths.length; cx < dx; cx++) {
        var temp_path = source_paths[cx];
        var public_app = path.join(temp_path, public_path);
        if (fs.existsSync(public_app) && fs.statSync(public_app).isFile()) return public_app;
    }
    return "";
};
var public_app = resolve_component_file_path().replace(/\\/g, '/');
if (public_app && !pages_root.length) {
    var temp = path.resolve(APP), parent = path.dirname(temp);
    pages_root.push(parent);
    if (/^index(\.[jt]sx?)?$/i.test(path.basename(temp))) pages_root.push(path.dirname(parent));
    while (temp && temp !== parent) {
        temp = parent;
        comms_root.push(path.join(parent, 'node_modules'));
        parent = path.dirname(temp);
    }
}
var comsroot_map = Object.create(null);
var pageroot_map = Object.create(null);
comms_root = comms_root.filter(com => {
    if (comsroot_map[com]) return false;
    return comsroot_map[com] = true;
}).filter(fs.existsSync);
pages_root = pages_root.filter(com => {
    if (pageroot_map[com]) return false;
    return pageroot_map[com] = true;
}).filter(fs.existsSync);
if (EXPORT_TO === undefined) EXPORT_TO = public_app
    .replace(/\.[tj]sx?$/i, '')
    .replace(/([\w\-]+)\/index$/i, "$1")
    .replace(/\-(\w)/g, (_, w) => w.toUpperCase())
    .replace(/[\s\S]*\/([^\\\/]+)$/, "$1");
var aapis_root = "./apis/" + AAPI;
module.exports = {
    comms_root,
    class_prefix: PREFIX || '',
    ccons_root,
    pages_root,
    aapis_root,
    PAGE,
    COMM,
    ICON,
    AAPI,
    PUBLIC_PATH,
    PAGE_PATH,
    COMS_PATH,
    EXTT,
    public_app,
    EXPORT_TO,
    EXPORT_AS,
    include_required: !!RELEASE || !public_app,
    APP
};