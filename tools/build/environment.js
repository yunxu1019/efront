var setupenv = require("../../process/setupenv");
var path = require("path");
var {
    APP
} = process.env;
var PUBLIC_APP = /* process.argv[2] || */ APP;
var env = PUBLIC_APP ? setupenv(PUBLIC_APP) : process.env;
var {
    PUBLIC_PATH = process.env.PUBLIC_PATH || "./public"
} = env;
var PAGE = env.PAGE || "zimoli";
var COMM = env.COMM || "zimoli," + PUBLIC_APP.replace(/\/$/, "");
var ICON = env.ICON || PUBLIC_APP.replace(/\/$/, "");
var AAPI = env.APIS || "zimoli";
var PAGE_PATH = env.APPS_PATH || env.PAGE_PATH || env.PAGES_PATH || "./apps";
var COMS_PATH = env.COMS_PATH || env.COMM_PATH || "./coms";
var ICON_PATH = env.ICON_PATH || env.CCON_PATH || env.CONS_PATH || "./cons";
var ccons_root = /,/.test(ICON) ? ICON.split(/,/).map(a => path.join(ICON_PATH, a)) : path.join(ICON_PATH, ICON);
var comms_root = /,/.test(COMM) ? COMM.split(/,/).map(a => path.join(COMS_PATH, a)) : path.join(COMS_PATH, COMM);
var pages_root = path.join(PAGE_PATH, PAGE);
var aapis_root = "./apis/" + AAPI;
module.exports = {
    comms_root,
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
    APP
}