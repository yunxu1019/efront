"use strict";
// 今天做了个梦，我左手一个美女，右手一个美女。
// 两个人长的各有千秋，却都合我的胃口，在我眼中是天花板的存在。
// 她们是我一路坎坷在不同环境中遇到的，经历过分离与重逢，都与我生死相依。
// 后来，她们不见了，我遇到个更好看的，竟也是我的旧识。
// 天花板破了，我似乎看到了夜空。
// 只是当初认识她时，也没看出她有今天这么漂亮。
// 她躺在院里床上，我俯身在她的身上。
// 我们一边聊起过往，一边怎么也进不去。
// 我定睛一看，原来是没对准。
// 进去以后，没想像的那么紧，只是略感滚烫，还有掠过毛刺的感觉。
// 然而，美好总是那么短暂，我又一次在该死的尘世醒来。
// 她的样子一点点模糊，一点点离我而去
var path = require("path");
var false_reg = /^(0|false|null|uset|none|undefined|nil|unset)$/i;
var test = a => !!a && !false_reg.test(a);
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
            console.warn(i18n`检查到未知环境变量`, k);
        }
        var n = namemap[k] || k;
    }
    switch (typeof this[n]) {
        case "number":
            v = +v;
            break;
        case "boolean":
            v = !false_reg.test(v);
            break;
    }
    this[n] = v;
    if (n !== 'EFRONT') seted[n] = true;
    if (fixme[n]) fixpath(n);
    if (isEmpty(v) || this[n] === defaults[n]) delete seted[n];
};
var get = function (name, _default, fix, limits) {
    var env = this || process.env;
    if (name in namemap) {
        var alias = [namemap[name]];
        if (isEmpty(_default)) _default = defaults[alias[0]];
    }
    else {
        var alias = String(name).split(/\s*[\|\,;:]\s*/);
        for (var cx = 0, dx = alias.length; cx < dx; cx++) {
            var k = alias[cx];
            namemap[k] = alias[0];
        }
        if (!isEmpty(_default)) {
            if (!isEmpty(defaults[alias[0]])) console.warn(i18n`发现重名配置`, alias);
            defaults[alias[0]] = _default;
        }
    }
    if (fix) fixme[alias[0]] = fix;
    if (limits) limits[alias[0]] = limits;
    var value = _default;
    for (var cx = 0, dx = alias.length; cx < dx; cx++) {
        var k = alias[cx];
        if (k in env) {
            var v = env[k];
            if (_default === undefined) {
                switch (v) {
                    case "true":
                    case "false":
                        _default = false;
                        break;
                    default:
                        if (/^\d+$/.test(v)) _default = 0;
                }
            }
            switch (typeof _default) {
                case "number":
                    value = +v;
                    break;
                case "boolean":
                    value = !false_reg.test(v);
                    break;
                case "object":
                    if (Array.isArray(_default)) {
                        value = str2array(value);
                        break;
                    }
                default:
                    value = v;
            }
        }
    }
    return value;
};
var noproxy;
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
        case 3:
            exports[key] = url.split(/[,;]/).map(u => u ? path.resolve(u).replace(/^\.[\/\\]|^\.$/, '').replace(/\\/g, '/') : u).join(",");
            break;
        default:
            if (url !== exports[key]) exports[key] = url;
    }
};
var geturlpath = name => get(name, null, 1);
var getdirpath = (name, _default) => get(name, _default, 2);
var getfullpath = (name, _default) => get(name, _default, 3);
var PUBLIC_PATH = getfullpath("PUBLIC_PATH", 'public');
var webindex, indexreg, denoindex;
var str2array = require("../basic/str2array");
var _memery = {
};
var _ifempty = {
    get POLYFILL() {
        return !memery.UPLEVEL && memery.EMIT;
    },
    get COMPRESS() {
        return memery.ENCRYPT;
    },
    get KEEPSPACE() {
        return !memery.COMPRESS;
    },
    get BREAK() {
        return memery.ENCRYPT;
    },
    get AUTOEVAL() {
        return memery.BREAK;
    },
    get WAITER_NUMBER() {
        return memery.islive ? 1 : require("os").cpus().length;
    },
    get HELPCODE() {
        return memery.istest;
    },
    get islive() {
        return !!memery.LIVEMODE;
    }
};
var memery = module.exports = {
    islive: undefined,
    get istest() {
        return this.webroot === this.PAGE_PATH;
    },
    proted: undefined,
    loghead: get('LOGHEAD, LOG'),
    defaults,
    get,
    set,
    setTo(dst, key, value) {
        set.call(dst, key, value);
    },
    mergeTo(dst, src) {
        for (var k in src) set.call(dst, k, src[k]);
        return dst;
    },
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
            noproxy = !false_reg.test(env.NOPROXY);
        } else if (env.PROXY) {
            noproxy = !test(env.PROXY);
        } else {
            noproxy = !this.istest;
        }
        return noproxy;
    },
    LIVEMODE: get("LIVEMODE,LIVE"),
    HELPCODE: get("HELPCODE"),
    RESTCOMS: get("RESTCOMS,REST_COMS"),
    DIRECT: geturlpath("DIRECT,DIRECT_PAGE,DIRECT_PATH,SINGLE,SINGLE_PAGE,SINGLE_PATH"),
    EFRONT: false,
    FILE_BUFFER_SIZE: get("FILE_BUFFER_SIZE, BUFFER_SIZE, BUFFER", 64 * 1024 * 1024),
    APP: get("APP, APPNAME"),
    TITLE: get("TITLE", ''),
    WAITER_NUMBER: get("WAITER_NUMBER, CLUSTERS_NUMBER, CLUSTERS, CPUS, SPREADS", NaN),
    PASSWORD: get('PASSWORD'),
    DNS: get("DNS", ''),
    IPV4FIRST: get("IPV4FIRST, IPV4", true),
    MSIE: get("IE,MSIE,Trident,IEXPLORE,DETOUR"),
    DHT_PORT: get('DHT_PORT', 0),
    RECROSS_LIMIT: get("RECROSS_LIMIT,RETRY,RETRY_LIMIT,RECROSSLIMIT,RETRYLIMIT", 2),
    HTTP_PORT: get('HTTP_PORT', 80),
    HTTPS_PORT: get('HTTPS_PORT', 443),
    WATCH_PORT: get('WATCH_PORT', 0),
    ENTRY_NAME: get('ENTRY_NAME, EXPORT_NAME', 'main, Main, MAIN, <文件名>, <file name>'),
    TRANSFER: get('TRANSFER,TRANSFER_LINK,TRANSFER_HOST,TRANS,TRANS_LINK,TRANS_HOST'),
    WATCH_PROJECT_VERSION: 0,
    EXTT: get("EXTT, EXT, EXTT_NAME, EXT_NAME, PUBLIC_EXTT, PUBLIC_EXT"),
    ENVS_PATH: getfullpath("ENVS_PATH, ENV_PATH, CONFIG_PATH, CONF_PATH"),
    COMS_PATH: getfullpath("COMS_PATH,COMM_PATH"),
    SCITER: get("SCITER,QUICKJS,QJS", false),
    I18NNAME: get("I18N_FILENAME,I18N_NAME,I18NFILE,I18NNAME", '#国际化.yml'),
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
    PAGE_PATH: getfullpath("PAGE_PATH, PAGES_PATH, APPS_PATH"),
    APIS_PATH: getfullpath("APIS_PATH, AAPI_PATH, APPS_PATH"),
    LIBS_PATH: getfullpath("LIBS_PATH, LIB_PATH"),
    FILE_PATH: getfullpath("FILE_PATH"),
    get PUBLIC_PATH() { return PUBLIC_PATH },
    set PUBLIC_PATH(v) {
        PUBLIC_PATH = v;
        for (var k in fixme) if (fixme[k] === 1) fixpath(k);
    },
    EXPORT_TO: get("EXPORT_TO, TARGET"),
    EXPORT_AS: get("EXPORT_AS, EXPORT"),
    DENO: get("DENO, DENO_TARGET", false),
    NODE: get("NODE, NODE_TARGET", false),
    RELEASE: get("RELEASE,INCLUDE_REQUIRED", 0),
    PREFIX: get("PREFIX", ''),
    COMMENT: get("COMMENT", false),
    CHANNEL_ENABLED: get("CHANNEL_ENABLED,CHANNEL", true),
    POLYFILL: get("POLYFILL"),
    SOURCEDIR: get("SOURCEDIR", false),
    SYMBOL: get("SYMBOLS, SYMBOL, SYMBOLS_REG, SYMBOL_REGEXP, REGEXP"),
    DESTPATH: getfullpath("DESTPATH, DEST_PATH"),
    PUBLIC_NAME: get("PUBLIC_NAME", ''),
    IN_WATCH_MODE: get("IN_WATCH_MODE", false),
    ENCRYPT: get("ENCRYPT, CRYPT, ENCODE", true),
    COMPRESS: get("COMPRESS, PRESS, ENCODE"),
    KEEPSPACE: get("KEEPSPACE, SPACE"),
    AUTOEVAL: get("AUTOEVAL, AUTOENUM, EVAL, ENUM"),
    RECORD: getdirpath("RECORD_PATH,RECORD"),
    TRANSFORM_PIXEL: get("TRANSFORM_PIXEL", false),
    PFX_PATH: getdirpath("PFX_PATH, PATH.SSL_PFX"),
    PFX_PASSWORD: get("PFX_PASSWORD, SSL_PASSWORD, PASSWORD.SSL_PFX", ''),
    PAGE: getdirpath("PAGE, APPS"),
    COMM: getdirpath("COMM, COMS", ''),
    AAPI: getdirpath("AAPI, APIS"),
    IMAG: getdirpath("IMAG, IMGS"),
    LIBS: getdirpath("LIBS, LIB"),
    EMIT: get("EMIT,DEEP,LINK", true),
    FORCE: false,
    BREAK: get("BREAK,DETOUR"),
    UPLEVEL: get("UPLEVEL", false),
    REPORT: get("REPORT"),
    PACKAGE_NAME: get("PACKAGE_NAME", 'package.json'),
    PACKAGE_INDEXES: get("PACKAGE_INDEX", str2array('index.js|index.mjs')),
    EXTRACT: get("EXTRACT, EXTRACT_MAIN_SCRIPT, EXTRACT_MAIN, EXTRACT_SCRIPT"),
    INDEX_NAME: get("INDEX_NAME", "default|index|主页|主页面|默认|默认页|默认页面"),
    DENO_EXTENSIONS: get("DENO_EXTENSIONS", '.js'),
    INDEX_EXTENSIONS: get("INDEX_EXTENSIONS", '.html,.htm,.jsp,.asp,.php'),
    NODEID: get("NODEID,DHTID,DHT", Buffer.from([101, 102, 114, 111, 110, 116, 46, 99, 99].concat(Array(11).fill(0).map(() => Math.random() * 256 | 0))).toString("hex")),
    CORS: get("CORS,CORP,Cross-Origin-Resource-Policy", true),
    get webindex() {
        if (!webindex) webindex = require("./mixin")(this.INDEX_NAME, '.', str2array(this.INDEX_EXTENSIONS).map(a => a.replace(/^\./, ''))).map(a => a.join(''));
        return webindex;
    },
    get denoindex() {
        if (!denoindex) denoindex = require("./mixin")(this.INDEX_NAME, '.', str2array(this.DENO_EXTENSIONS).map(a => a.replace(/^\./, ''))).map(a => a.join(""));
        return denoindex;
    },
    get indexreg() {
        if (!indexreg) indexreg = new RegExp(`(${/(?:[\/\\]|^)/.source + str2array(this.INDEX_NAME).join("|")})(${/\./.source + str2array(this.INDEX_EXTENSIONS).map(a => a.replace(/^\./, '')).join("|")})$`, 'i')
        return indexreg;
    },
    get webroot() {
        return this.islive ? this.PAGE_PATH : this.PUBLIC_PATH;
    },
};
var isHandled = require('../basic/isHandled');
Object.keys(memery).forEach(function (key) {
    if (!(key in _ifempty)) return;
    _memery[key] = memery[key];
    Object.defineProperty(memery, key, {
        get() {
            var value = _memery[key];
            if (!isHandled(value)) return _ifempty[key];
            return value;
        },
        set(value) {
            _memery[key] = value;
        }
    })
});
Object.keys(fixme).forEach(fixpath);