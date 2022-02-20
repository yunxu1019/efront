"use strict";
var path = require("path");
var reg = /^(0|false|null|uset|none|undefined|nil|unset)$/i;
var test = a => !!a && !reg.test(a);
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
var istest = test(env.IN_TEST_MODE) || test(env.IS_TEST_MODE) || test(env.TEST_MODE);
var namemap = Object.create(null);
var seted = Object.create(null);
var defaults = Object.create(null);
var isEmpty = require("../basic/isEmpty");
var set = function (k, v) {
    var n
    if (k in this) {
        n = k;
    }
    else {
        k = k.toUpperCase();
        if (!(k in namemap)) {
            console.warn("检查到未知环境变量", k);
        }
        var n = namemap[k] || k;
    }
    switch (typeof this[n]) {
        case "number":
            v = +v;
            break;
        case "boolean":
            v = !reg.test(v);
            break;
    }
    this[n] = v;
    if (n !== 'EFRONT') seted[n] = true;
    if (fixme[n]) fixpath(n);
    if (isEmpty(v) || this[n] === defaults[n]) delete seted[n];
};
var get = function (name, _default, fix, limits) {
    var env = this || process.env;
    var alias = String(name).split(/\s*[\|\,;:]\s*/);
    for (var cx = 0, dx = alias.length; cx < dx; cx++) {
        var k = alias[cx];
        namemap[k] = alias[0];
    }
    if (fix) fixme[alias[0]] = fix;
    if (limits) limits[alias[0]] = limits;
    var value = _default;
    if (!isEmpty(_default)) defaults[alias[0]] = _default;
    for (var cx = 0, dx = alias.length; cx < dx; cx++) {
        var k = alias[cx];
        if (k in env) {
            var v = env[k];
            switch (typeof _default) {
                case "number":
                    value = +v;
                case "boolean":
                    value = reg.test(v);
                default:
                    value = v;
            }
        }
    }
    return value;
};
var noproxy, coms_path;
var fixme = {};
var cpus = 0;
var fixpath = function (key) {
    var exports = module.exports;
    var url = exports[key];
    var type = fixme[key];
    if (!fixme[key]) fixme[key] = true;
    if (!url && url !== '') return;
    var fs = require("fs");
    if (url && url >= 0 && !fs.existsSync(url)) {
        url = +url;
        exports[key] = function (deep, path) {
            if (!path || typeof path !== 'string') return '';
            return path.replace(/\\/g, '/').replace(/^\/|\/$/g, '')
                .split('/').slice(0, deep).join("/") + "/";
        }.bind(null, url);
        exports[key].toString = function (a) { return a }.bind(url);
        return;
    }
    if (typeof url !== 'string' || /^\.[\/\\]?$/.test(url)) url = "";
    switch (type) {
        case 1:
            url = path.normalize(url).replace(/[\/\\]+$/, '').replace(/\\/g, '/').replace(/^\.\/|^\.$/, '');
            var temp = path.join(PUBLIC_PATH, url);
            if (fs.existsSync(temp)) fs.stat(temp, function (error, stats) {
                if (error) {
                    throw error;
                }
                if (stats.isDirectory()) {
                    url += '/';
                }
                exports[key] = url;
            });
            else exports[key] = url;
            break;
        case 2:
            exports[key] = url.split(/[,;]/).map(u => u ? path.normalize(u).replace(/^\.[\/\\]|^\.$/, '') : u).join(",");
            break;
        default:
            if (url !== exports[key]) exports[key] = url;
    }
};
var geturlpath = name => get(name, null, 1);
var getdirpath = (name, _default) => get(name, _default, 2);
var COMS_PATH = getdirpath("COMS_PATH, COMM_PATH");
var PUBLIC_PATH = getdirpath("PUBLIC_PATH", 'public');
module.exports = {
    istest,
    loghead: get('LOGHEAD, LOG'),
    defaults,
    get,
    set,
    all() {
        var data = {};
        for (var n in seted) {
            if (!(n in data)) data[n] = this[n];
        }
        return data;
    },
    get noproxy() {
        if (noproxy !== undefined) {
            return noproxy;
        }
        if (env.NOPROXY) {
            noproxy = !reg.test(env.NOPROXY);
        } else if (env.PROXY) {
            noproxy = !test(env.PROXY);
        } else {
            noproxy = !this.istest;
        }
        return noproxy;
    },
    get coms_path() {
        if (coms_path !== undefined) return coms_path;
        var namemap = Object.create(null);
        var pathname = String(COMS_PATH || "");
        pathname.split(',').forEach(p => {
            namemap[p] = true;
        });
        namemap[path.join(__dirname, '..')] = true;
        namemap[path.join(__dirname, '../basic')] = true;
        namemap[path.join(__dirname, '../typescript-helpers')] = true;
        if (this.LIBS_PATH !== undefined) String(this.LIBS_PATH).split(",").forEach(p => {
            namemap[p] = true;
        });
        coms_path = Object.keys(namemap).join(',');
        return coms_path;
    },
    DIRECT: geturlpath("DIRECT,DIRECT_PAGE,DIRECT_PATH,SINGLE,SINGLE_PAGE,SINGLE_PATH"),
    EFRONT: false,
    FILE_BUFFER_SIZE: get("FILE_BUFFER_SIZE, BUFFER_SIZE, BUFFER", 64 * 1024 * 1024),
    APP: get("APP, APPNAME"),
    TITLE: get("TITLE", ''),
    get cpus() {
        if (cpus > 0) return cpus;
        return cpus = get("CPUS, CLUSTERS, SPREADS", this.istest ? 1 : require("os").cpus().length);
    },
    set cpus(v) {
        cpus = v;
    },
    PASSWORD: get('PASSWORD'),
    MSIE: get("IE,MSIE,Trident,IEXPLORE,DETOUR"),
    HTTP_PORT: get('HTTP_PORT', 0),
    HTTPS_PORT: get('HTTPS_PORT', 0),
    WATCH_PORT: get('HTTPS_PORT', 0),
    TRANSFER: get('TRANSFER,TRANSFER_LINK,TRANSFER_HOST,TRANS,TRANS_LINK,TRANS_HOST'),
    WATCH_PROJECT_VERSION: 0,
    EXTT: get("EXTT, EXT, EXTT_NAME, EXT_NAME, PUBLIC_EXTT, PUBLIC_EXT"),
    ENVS_PATH: getdirpath("ENVS_PATH, ENV_PATH, CONFIG_PATH, CONF_PATH"),
    get COMS_PATH() {
        if (typeof COMS_PATH === 'string') return this.coms_path;
        return COMS_PATH;
    },
    set COMS_PATH(v) {
        COMS_PATH = v;
    },
    get PROXY() {
        return !noproxy;
    },
    set PROXY(v) {
        noproxy = !v;
    },
    get NOPROXY() {
        return noproxy;
    },
    set NOPROXY(v) {
        noproxy = v;
    },
    PAGE_PATH: getdirpath("PAGE_PATH, PAGES_PATH, APPS_PATH"),
    APIS_PATH: getdirpath("APIS_PATH, AAPI_PATH, APPS_PATH"),
    LIBS_PATH: getdirpath("LIBS_PATH, LIB_PATH"),
    FILE_PATH: getdirpath("FILE_PATH"),
    ICON_PATH: getdirpath("ICON_PATH, CONS_PATH, CCON_PATH, ICONS_PATH"),
    get PUBLIC_PATH() { return PUBLIC_PATH },
    set PUBLIC_PATH(v) {
        PUBLIC_PATH = v;
        for (var k in fixme) if (fixme[k] === 1) fixpath(k);
    },
    EXPORT_TO: get("EXPORT_TO, TARGET"),
    EXPORT_AS: get("EXPORT_AS, EXPORT"),
    RELEASE: get("RELEASE", 0),
    PREFIX: get("PREFIX", ''),
    POLYFILL: get("POLYFILL", true),
    SOURCEDIR: get("SOURCEDIR", false),
    SYMBOL: get("SYMBOLS, SYMBOL, SYMBOLS_REG, SYMBOL_REGEXP, REGEXP"),
    DESTPATH: getdirpath("DESTPATH, DEST_PATH"),
    PUBLIC_NAME: get("PUBLIC_NAME", ''),
    IN_WATCH_MODE: get("IN_WATCH_MODE", false),
    ENCRYPT: get("ENCRYPT, CRYPT, ENCODE", true),
    COMPRESS: get("COMPRESS, PRESS, ENCRYPT, ENCODE", true),
    OPTIMIZE: get("OPTIMIZE", false),
    RECORD: getdirpath("RECORD_PATH,RECORD"),
    TRANSFORM_PIXEL: get("TRANSFORM_PIXEL", false),
    PFX_PATH: getdirpath("PFX_PATH, PATH.SSL_PFX"),
    PFX_PASSWORD: get("PFX_PASSWORD, SSL_PASSWORD, PASSWORD.SSL_PFX"),
    PAGE: getdirpath("PAGE, APPS"),
    COMM: getdirpath("COMM, COMS"),
    AAPI: getdirpath("AAPI, APIS"),
    IMAG: getdirpath("IMAG, IMGS"),
    LIBS: getdirpath("LIBS, LIB"),
    ICON: getdirpath("ICON, CCON, CONS, ICONS"),
    FORCE: get("FORCE", false),
    UPLEVEL: get("UPLEVEL", false),
    REPORT: get("REPORT", 'efront.cc'),
    CORS: get("CORS,CORP,Cross-Origin-Resource-Policy", true),
    get webroot() {
        return this.isDevelop ? this.PAGE_PATH : this.PUBLIC_PATH;
    },
    get isDevelop() {
        return this.istest;
    },
};
Object.keys(fixme).forEach(fixpath);