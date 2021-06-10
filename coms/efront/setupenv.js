"use strict";
var loadenv = require("./loadenv");
var path = require("path");
var fs = require("fs");
var memery = require("./memery");
var env = process.env;
var envpath = memery.ENVS_PATH;
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
        var default_value = env[key];
        if (default_value !== undefined) default_value = memery[key];
        var value_map = Object.create(null);
        if (appname !== undefined) {
            if (!/\/|\.[cm]?[jt]sx?$/i.test(app)) value_map[appname] = true;
        }
        if (default_value !== undefined) {
            default_value.split(',').forEach(k => {
                value_map[k] = true;
            });
        }
        if (!default_value) value_map["zimoli"] = true;
        env[key] = Object.keys(value_map).join(',');
    });
    if (!env.PAGE && appname && !/\.([cm]?[jt]sx?|json)$/i.test(app)) env.PAGE = appname;
    pollyfill(env, appname);
    return env;
};
var pollyfill = function (dst, appname) {

    if (dst.PAGE === undefined || dst.PAGE === null) dst.PAGE = appname;
    for (var k in dst) {
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
        dst[k] = (dst[k] ? dst[k] : bootpath).split(",").map(a => a === ":" ? bootpath : a).map(
            k => k.replace(/\\/g, '/').replace(/^\.\//, '')
        ).filter(
            k => envma[k] ? false : envma[k] = true
        ).join(",");
    }
};
var normalize = function (o) {
    for (var k in o) {
        var v = o[k];
        if (/\//.test(v) ^ /\\/.test(v) || /path$/i.test(k)) {
            if (v) o[k] = path.normalize(v);
        }
    }
};
var bootConfig = {
    COMS_PATH: "./coms",
    APIS_PATH: "./apis",
};

var extend = function (dst, env) {
    var obj = {
        COMS_PATH: env.COMS_PATH || "",
        PAGE_PATH: env.PAGE_PATH || "",
        APIS_PATH: env.APIS_PATH || "",
        LIBS_PATH: env.LIBS_PATH || "",
        ICON_PATH: env.ICON_PATH || "",
        PAGE: env.PAGE || "",
        COMM: env.COMM || "",
        AAPI: env.AAPI || "",
        IMAG: env.IMAG || "",
        LIBS: env.LIBS || "",
        ICON: env.ICON || "",
        PUBLIC_PATH: env.PUBLIC_PATH || "",
    };
    for (var k in obj) {
        obj[k] = dst[k] || env[k] || memery[k] || '';
        if (/\_PATH$/i.test(k)) {
            dst[k] = path.normalize(obj[k]);
        } else {
            dst[k] = obj[k];
        }
    }

    Object.assign(dst, obj);
    normalize(dst);
};
Object.assign(memery, setup());
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
            memery[k] = _tmp[k];
        }
    }
    normalize(memery);
}