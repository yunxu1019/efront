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
var set = function (k, v) {
    if (k in this) {
        this[k] = v;
        if (fixme[k]) fixpath(k);
        return;
    }
    k = k.toUpperCase();
    if (!(k in namemap)) {
        console.warn("检查到未知环境变量", k);
    }
    var n = namemap[k] || k;
    this[n] = v;
    if (fixme[n]) fixpath(n);
}
var get = function (name, _default, fix) {
    var env = this || process.env;
    var alias = String(name).split(/\s*[\|\,;:]\s*/);
    for (var cx = 0, dx = alias.length; cx < dx; cx++) {
        var k = alias[cx];
        namemap[k] = alias[0];
    }
    if (fix) fixme[alias[0]] = fix;
    for (var cx = 0, dx = alias.length; cx < dx; cx++) {
        var k = alias[cx];
        if (k in env) {
            var v = env[k];
            switch (typeof _default) {
                case "number":
                    return +v;
                case "boolean":
                    return test(v);
                default:
                    return v;
            }
        }
    }
    return _default;
};
var noproxy, coms_path;
var fixme = {};
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
    compress: !istest,
    loghead: get('LOGHEAD, LOG'),
    get,
    set,
    get noproxy() {
        if (noproxy !== undefined) {
            return noproxy;
        }
        if (env.NOPROXY) {
            noproxy = !reg.test(env.NOPROXY);
        } else if (env.PROXY) {
            noproxy = !test(env.PROXY);
        } else {
            noproxy = this.compress;
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
    PASSWORD: get('PASSWORD'),
    MSIE: get("IE,MSIE,Trident,IEXPLORE,DETOUR"),
    HTTP_PORT: get('HTTP_PORT', 0),
    HTTPS_PORT: get('HTTPS_PORT', 0),
    WATCH_PORT: get('HTTPS_PORT', 0),
    TRANSFER: get('TRANSFER,TRANSFER_LINK,TRANSFER_HOST,TRANS,TRANS_LINK,TRANS_HOST'),
    WATCH_PROJECT_VERSION: 0,
    EXTT: get("EXTT, EXT, EXTT_NAME, EXT_NAME, PUBLIC_EXTT, PUBLIC_EXT"),
    ENVS_PATH: getdirpath("ENVS_PATH, ENV_PATH, CONFIG_PATH, CONF_PATH"),
    COMS_PATH: getdirpath("COMS_PATH, COMM_PATH"),
    get COMS_PATH() {
        if (typeof COMS_PATH === 'string') return this.coms_path;
        return COMS_PATH;
    },
    set COMS_PATH(v) {
        COMS_PATH = v;
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
    POLYFILL: get("POLYFILL", false),
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
};
Object.keys(fixme).forEach(fixpath);