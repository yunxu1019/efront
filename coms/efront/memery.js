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
        return;
    }
    k = k.toUpperCase();
    if (!(k in namemap)) {
        console.warn("检查到未知环境变量", k);
    }
    var n = namemap[k] || k;
    this[n] = v;
}
var get = function (name, _default) {
    var env = this || process.env;
    var alias = String(name).split(/\s*[\|\,;:]\s*/);
    for (var cx = 0, dx = alias.length; cx < dx; cx++) {
        var k = alias[cx];
        namemap[k] = alias[0];
    }
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
var noproxy;

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
        var namemap = Object.create(null);
        var pathname = String(this.COMS_PATH || "");
        pathname.split(',').forEach(p => {
            namemap[p] = true;
        });
        namemap[path.join(__dirname, '..')] = true;
        namemap[path.join(__dirname, '../basic')] = true;
        namemap[path.join(__dirname, '../typescript-helpers')] = true;
        if (this.LIBS_PATH !== undefined) String(this.LIBS_PATH).split(",").forEach(p => {
            namemap[p] = true;
        });
        return Object.keys(namemap).join(',');
    },
    EFRONT: false,
    FILE_BUFFER_SIZE: get("FILE_BUFFER_SIZE, BUFFER_SIZE, BUFFER", 64 * 1024 * 1024),
    APP: get("APP, APPNAME"),
    TITLE: get("TITLE", ''),
    PASSWORD: get('PASSWORD'),
    HTTP_PORT: get('HTTP_PORT', 0),
    HTTPS_PORT: get('HTTPS_PORT', 0),
    WATCH_PORT: get('HTTPS_PORT', 0),
    WATCH_PROJECT_VERSION: 0,
    EXTT: get("EXTT, EXT, EXTT_NAME, EXT_NAME, PUBLIC_EXTT, PUBLIC_EXT"),
    ENVS_PATH: get("ENVS_PATH, ENV_PATH, CONFIG_PATH, CONF_PATH"),
    COMS_PATH: get("COMS_PATH, COMM_PATH"),
    PAGE_PATH: get("PAGE_PATH, PAGES_PATH, APPS_PATH"),
    APIS_PATH: get("APIS_PATH, AAPI_PATH, APPS_PATH"),
    LIBS_PATH: get("LIBS_PATH, LIB_PATH"),
    FILE_PATH: get("FILE_PATH"),
    ICON_PATH: get("ICON_PATH, CONS_PATH, CCON_PATH, ICONS_PATH"),
    PUBLIC_PATH: get("PUBLIC_PATH", 'public'),
    EXPORT_TO: get("EXPORT_TO, TARGET"),
    EXPORT_AS: get("EXPORT_AS, EXPORT"),
    RELEASE: get("RELEASE", 0),
    PREFIX: get("PREFIX", ''),
    POLYFILL: get("POLYFILL"),
    SOURCEDIR: get("SOURCEDIR"),
    SYMBOL: get("SYMBOLS, SYMBOL, SYMBOLS_REG, SYMBOL_REGEXP, REGEXP"),
    DESTPATH: get("DESTPATH, DEST_PATH"),
    PUBLIC_NAME: get("PUBLIC_NAME", ''),
    IN_WATCH_MODE: get("IN_WATCH_MODE", false),
    ENCRYPT: get("ENCRYPT, CRYPT, ENCODE", true),
    COMPRESS: get("COMPRESS, PRESS, ENCRYPT, ENCODE", true),
    OPTIMIZE: get("OPTIMIZE", false),
    RECORD_PATH: get("RECORD_PATH"),
    TRANSFORM_PIXEL: get("TRANSFORM_PIXEL", false),
    PFX_PATH: get("PFX_PATH, PATH.SSL_PFX"),
    PFX_PASSWORD: get("PFX_PASSWORD, SSL_PASSWORD, PASSWORD.SSL_PFX"),
    PAGE: get("PAGE, APPS"),
    COMM: get("COMM, COMS"),
    AAPI: get("AAPI, APIS"),
    IMAG: get("IMAG, IMGS"),
    LIBS: get("LIBS, LIB"),

    ICON: get("ICON, CCON, CONS, ICONS"),
};
