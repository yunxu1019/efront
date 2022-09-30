"use strict";
var loadenv = require("./loadenv");
var path = require("path");
var fs = require("fs");
var memery = require("./memery");
var extendIfNeed = require("../basic/extendIfNeeded");
var isEmpty = require("../basic/isEmpty");
var env = process.env;
var envpath = memery.ENVS_PATH;
if (typeof envpath !== "string") envpath = "./_envs," + path.join(require("os").homedir(), '.efront/_envs');
envpath = envpath.split(",").filter(fs.existsSync);
var cache = {};
var setup = module.exports = function (app) {
    var appname = String(app || '').replace(/^[\/\\]*(.*?)[\/\\]*$/g, "$1");
    appname = appname.replace(/\.(\w+)$/i, "");
    if (cache[appname]) return cache[appname];
    else env = {};
    if (appname) {
        memery.setTo(env, 'APP', appname);
    }
    envpath.forEach(function (p) {
        memery.mergeTo(env, loadenv(path.join(p, "./app=" + appname)))
    });
    cache[appname] = env;
    pollyfill(env);
    normalize(env);
    extendIfNeed(env, rootEnvs);
    "IMAG COMM AAPI".split(/\s+/).forEach(function (key) {
        var default_value = memery.get.call(env, key);
        if (default_value === undefined) default_value = memery.get.call(rootEnvs, key);
        if (default_value === undefined) default_value = memery.get(key);
        var value_map = Object.create(null);
        if (appname !== undefined) {
            if (!/\/|\.[cm]?[jt]sx?$/i.test(app)) value_map[appname] = true;
        }
        if (typeof default_value === "string") {
            default_value.split(',').forEach(k => {
                value_map[k] = true;
            });
        }
        if (!value_map[""]) value_map[""] = true;
        if (default_value === undefined) value_map["zimoli"] = true;
        var value = Object.keys(value_map).join(',');
        memery.setTo(env, key, value);
    });
    if (!memery.get.call(env, 'PAGE') && appname && !/\.([cm]?[jt]sx?|json)$/i.test(app)) memery.setTo(env, 'page', appname);
    return env;
};
var formatPath = function (a, b) {
    if (/^[\:\&]/.test(a) && b) {
        return path.join(__dirname, "../../", b);
    }
    if (/^[@\:\&]/.test(a)) {
        return path.join(process.cwd(), a.slice(1));
    }
    return a;
}
var pollyfill = function (dst) {
    for (var k in dst) {
        var d = Object.getOwnPropertyDescriptor(dst, k);
        if (!d.writable && !d.set) continue;
        if (typeof dst[k] !== 'string') {
            if (!(k in bootConfig)) {
                continue;
            }
        }
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
        dst[k] = String(isEmpty(dst[k]) ? bootpath : dst[k]).split(",").map(a => formatPath(a, bootfull)).map(
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
            if (typeof v === 'string' && v) {
                o[k] = v.split(",").map(o => {
                    o = path.normalize(o);
                    if (fs.existsSync(o)) o = fs.realpathSync(o);
                    return o
                }).join(",");
            }
        }
    }
};
var bootConfig = memery.mergeTo({}, {
    COMS_PATH: "./coms",
    APIS_PATH: "./apis",
});
var rootEnvs = memery.mergeTo({}, {
    COMS_PATH: null,
    APIS_PATH: null,
});
envpath.forEach(function (p) {
    var env = loadenv(path.join(p, 'setup'));
    Object.keys(env).forEach(function (key) {
        var value = process.env[key];
        memery.setTo(rootEnvs, key, env[key]);
        if (value === null || value === undefined) {
            process.env[key] = env[key];
        }
    });
});
pollyfill(rootEnvs);
normalize(rootEnvs);
memery.mergeTo(memery, rootEnvs);
if ("APP" in env) {
    let _tmp = setup(env.APP || "");
    for (let k in _tmp) {
        if (/\_PATH$/i.test(k)) {
            memery.set(k, _tmp[k]);
        }
    }
}
