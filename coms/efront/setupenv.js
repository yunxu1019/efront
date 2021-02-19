"use strict";
var loadenv = require("./loadenv");
var path = require("path");
var fs = require("fs");
var env = process.env;

if (!env.cd && !env.CD) {
    env.cd = process.cwd();
}
for (var k in env) {
    var upperKey = k.toUpperCase();
    var lowerKey = k.toLowerCase();
    env[upperKey] = env[k];
    env[lowerKey] = env[k];
}
var envpath = env.ENVS_PATH || env.ENV_PATH || env.CONFIG_PATH;
if (!envpath) {
    envpath = "./_envs," + path.join(require("os").homedir(), '.efront/_envs');
}

envpath = envpath.split(",").filter(fs.existsSync);
var cache = {};
var setup = module.exports = function (app) {
    var appname = String(app || '').replace(/^[\/\\]*(.*?)[\/\\]*$/g, "$1");
    appname = appname.replace(/\.(\w+)$/i, "");
    if (cache[appname]) return cache[appname];
    else env = {};
    envpath.forEach(function (p) {
        Object.assign(env, loadenv(path.join(p, "./app=" + appname + ".bat")))
    });
    cache[appname] = env;
    extend(env, env, appname);
    "IMAG COMM AAPI".split(/\s+/).forEach(function (key) {
        var default_value = env[key] || process.env[key];
        var value_map = Object.create(null);
        if (appname) {
            if (!/\/|\.[cm]?[jt]sx?$/i.test(app)) value_map[appname] = true;
        }
        if (default_value) {
            default_value.split(',').forEach(k => {
                value_map[k] = true;
            });
        } else {
            value_map["zimoli"] = true;
        }
        value_map[""] = true;
        value_map["basic"] = true;
        value_map["typescript-helpers"] = true;
        env[key] = Object.keys(value_map).join(',');
    });
    extend(env, process.env);
    if (!env.PAGE && appname) env.PAGE = appname;
    pollyfill(env, appname);

    return env;
};
var pollyfill = function (env, appname) {

    if (env.PAGE === undefined || env.PAGE === null) env.PAGE = appname;
    for (var k in env) {
        var bootfull = '';
        if (k in bootConfig) {
            bootfull = path.join(__dirname, "../../", bootConfig[k]);
            var bootpath = path.relative(bootConfig[k], bootfull);
            if (bootpath) {
                bootfull = bootConfig[k] + "," + bootfull;
            }
        }
        bootpath = bootfull || '';
        var envma = Object.create(null);
        env[k] = (env[k] ? env[k] : bootpath).split(",").map(a => a === ":" ? bootpath : a).map(
            k => k.replace(/\\/g, '/').replace(/^\.\//, '')
        ).filter(
            k => envma[k] ? false : envma[k] = true
        ).join(",");
    }
    if (!env.PAGE_PATH) {
        env.PAGE_PATH = "./apps";
    }
    if (!env.PUBLIC_PATH) {
        env.PUBLIC_PATH = "./public";
    }

};
var normalize = function (o) {
    for (var k in o) {
        var v = o[k];
        if (/\//.test(v)^/\\/.test(v)) {
            o[k] = path.normalize(v);
        }
    }
};
var bootConfig = {
    COMS_PATH: "./coms",
    APIS_PATH: "./apis",
};

var extend = function (dst, env) {
    var obj = {
        EXTT: dst.EXTT || dst.PUBLIC_EXTT || dst.PUBLIC_EXT || dst.EXTT_NAME || dst.EXT_NAME || dst.EXT || env.EXTT || '',
        COMS_PATH: dst.COMS_PATH || dst.COMM_PATH || env.COMS_PATH || "",
        PAGE_PATH: dst.PAGE_PATH || dst.PAGES_PATH || dst.APPS_PATH || env.PAGE_PATH || "",
        APIS_PATH: dst.APIS_PATH || dst.AAPI_PATH || env.APIS_PATH || "",
        LIBS_PATH: dst.LIBS_PATH || dst.LIB_PATH || env.LIBS_PATH || "",
        ICON_PATH: dst.ICON_PATH || dst.CONS_PATH || dst.CCON_PAT || dst.ICONS_PATHH || env.ICON_PATH || "",
        PAGE: dst.PAGE || dst.APPS || env.PAGE || "",
        COMM: dst.COMM || dst.COMS || env.COMM || "",
        AAPI: dst.AAPI || dst.APIS || env.AAPI || "",
        IMAG: dst.IMAG || dst.IMGS || env.IMAG || "",
        LIBS: dst.LIBS || env.LIBS || "",
        ICON: dst.ICON || dst.CCON || dst.CONS || dst.ICONS || env.ICON || "",
        PUBLIC_PATH: dst.PUBLIC_PATH || env.PUBLIC_PATH || "",
    };
    Object.assign(dst, obj);
    normalize(dst);
};
extend(process.env, process.env);
envpath.forEach(function (p) {
    var env = loadenv(path.join(p, 'setup'));
    Object.keys(env).forEach(function (key) {
        var value = process.env[key];
        if (value === null || value === undefined) {
            process.env[key] = env[key];
        }
    });
});
if ("APP" in env) {
    let _tmp = setup(env.APP || "./");
    pollyfill(_tmp, env.APP);
    for (var k in _tmp) {
        if (/\_PATH$/i.test(k)) {
            process.env[k] = _tmp[k];
        }
    }
}