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
var cache = Object.create(null);
module.exports = function (app) {
    var appname = String(app || memery.APP || '').replace(/^[\/\\]*(.*?)[\/\\]*$/g, "$1");
    appname = appname.replace(/\.(\w+)$/i, "");
    if (cache[appname]) return cache[appname];
    else env = {};
    var nameonly = appname.replace(/^(\.+[\\\/\$])+/g, '');
    if (appname) {
        memery.setTo(env, 'APP', nameonly);
    }
    cache[appname] = env;
    envpath.forEach(function (p) {
        memery.mergeTo(env, loadenv(path.join(p, "./app=" + nameonly)))
    });
    pollyfill(env);
    normalize(env);
    extendIfNeed(env, rootEnvs);
    "IMAG COMM AAPI".split(/\s+/).forEach(function (key) {
        var default_value = memery.get.call(env, key);
        if (default_value === undefined) default_value = memery.get.call(rootEnvs, key);
        if (default_value === undefined) default_value = memery.get(key);
        var value_map = Object.create(null);
        if (app !== undefined) {
            if (!/\.[cm]?[jt]sx?$/i.test(app)) value_map[nameonly] = true;
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
    return a || '.';
}
var pollyfill = function (dst, src = dst) {
    for (var k in src) {
        var d = Object.getOwnPropertyDescriptor(dst, k);
        if (!d.writable && !d.set) continue;
        if (typeof dst[k] !== 'string') {
            if (!(k in bootConfig)) {
                continue;
            }
        }
        var bootfull = dst[k] || memery.get(k);
        if (k in bootConfig) {
            var patch = isEmpty(bootfull);
            if (patch) {
                bootfull = path.join(__dirname, "../../", bootConfig[k]);
                patch = !!path.relative(bootConfig[k], bootfull);
            }
            if (k === "COMS_PATH") {
                let namemap = Object.create(null);
                if (patch) {
                    namemap[bootConfig[k]] = true;
                }
                bootfull.split(',').forEach(p => {
                    namemap[p] = true;
                });
                namemap[path.join(__dirname, '..')] = true;
                namemap[path.join(__dirname, '../basic')] = true;
                if (memery.POLYFILL) {
                    namemap[path.join(__dirname, '../basic_')] = true;
                }
                if (dst.LIBS_PATH !== undefined) String(dst.LIBS_PATH).split(",").forEach(p => {
                    namemap[p] = true;
                });
                bootfull = Object.keys(namemap).join(',');
            }
        }
        if (/_PATH$/i.test(k)) {
            var exists = Object.create(null);
            bootfull = bootfull.split(',').map(a => a || '.').filter(fs.existsSync).map(a => fs.realpathSync(a)).filter(a => exists[a] ? false : exists[a] = true);
            if (!bootfull.length) bootfull = null;
            else bootfull = bootfull.join(',');
        }
        if (bootfull != null) {
            var envma = Object.create(null);
            dst[k] = String(bootfull).split(",").map(a => formatPath(a, bootConfig[k])).map(
                k => k.replace(/\\/g, '/').replace(/^\.\//, '')
            ).filter(
                k => envma[k] ? false : envma[k] = true
            ).join(",");
        }
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
    PAGE_PATH: memery.PAGE_PATH,
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
pollyfill(memery, rootEnvs);