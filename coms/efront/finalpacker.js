"use strict";
var setupenv = require("./setupenv");
var parseURL = require("../basic/parseURL");
var memery = require("./memery");
var getCommap = require("./getCommap");
var commbuilder = require("./commbuilder");
var aapibuilder = require("./aapibuilder");
var filebuilder = require("./filebuilder");
var path = require("path");
var mixin = require("./mixin");
var fs = require("fs");
var globals = require("./globals");
var FILE_BUFFER_SIZE = memery.FILE_BUFFER_SIZE;
var sortPath = function (a, b) {
    a = a.split(/[\\\/]/);
    b = b.split(/[\\\/]/);
    for (var cx = 0, dx = Math.min(a.length, b.length); cx < dx; cx++) {
        if (a[cx] !== b[cx]) return 0;
    }
    return b.length - a.length;
}
var formatdir = a => a.replace(/\\/g, '/').replace(/\/$/, '') + "/";
var createManagersWithEnv = async function (env) {
    var commap = await getCommap(env.APP);
    if (env.root) commap[""] = env.root;
    var Cache = require("../server/cache");
    var cbuilder = commbuilder.bind(commap);
    var root = env.root;
    if (root) root = formatdir(root);
    var mixpath = (a, b) => {
        var map = Object.create(null);
        var ps = mixin(a, b || '').map(a => path.join.apply(path, a)).filter(m => map[m] ? false : map[m] = true).filter(fs.existsSync).map(formatdir);
        if (root) {
            ps.sort((a, b) => {
                var ai = a.indexOf(root);
                var bi = b.indexOf(root);
                return bi - ai;
            });
        }
        ps.sort(sortPath);
        return ps.join(',');
    };
    var coms_path = mixpath(env.COMS_PATH, env.COMM);
    var page_path = mixpath(env.PAGE_PATH, env.PAGE);
    var comscache = new Cache(coms_path, cbuilder);
    var pagecache = new Cache(page_path, cbuilder);
    var fireload = function () {
        if (env.reload instanceof Function) env.reload();
    };
    var update = async function (updated) {
        if (update.ing) return;
        update.ing = true;
        try {
            await update1();
        } catch { }
        update.ing = false;
        if (updated.loaded) fireload();
    }
    var update1 = async function () {
        var cm = await getCommap(env.APP);
        a: {
            for (var k in cm) if (!(k in commap)) break a;
            for (var k in commap) if (cm[k] !== commap[k]) break a;
            return;
        }
        var changed = Object.create(null);
        for (var k in commap) {
            if (k && !(k in cm)) {
                changed[k] = true;
                delete commap[k];
            }
        }
        for (var k in cm) {
            if (commap[k] !== cm[k]) {
                changed[k] = true;
                commap[k] = cm[k];
            }
        }
        comscache.forEachLoaded(f => {
            if (/\.xht$/i.test(f.pathname)) {
                f.unload();
            }
        })
    };
    comscache.onreload = update;
    pagecache.onreload = update;
    var apicache = new Cache(mixpath(env.APIS_PATH, env.AAPI), aapibuilder);
    apicache.onreload = fireload;
    var filecache = new Cache(mixpath(env.FILE_PATH || env.PAGE_PATH, env.FILE || env.PAGE), filebuilder, FILE_BUFFER_SIZE);
    filecache.onreload = fireload;
    var managers = {
        comm(name, ext) {
            var exts = fixExtentions([".js", '.mjs', '.xht', ".ts", ".json", ".html", '.vue', ''], ext);
            name = require("../basic/$split")(name).join("/");
            var res = comscache.seek(name, exts);
            return responseFromCache(res);
        },
        page(name, ext) {
            var exts = fixExtentions([".js", ".mjs", ".xht", ".ts", ".html", '.vue', ''], ext);
            var res = pagecache.seek(name, exts);
            return responseFromCache(res);
        },
        aapi(name, ext) {
            var exts = fixExtentions([".js", ".mjs", '.ts'], ext);
            return apicache.seek(name, exts);
        },
        file(name, ext) {
            var exts = [ext]
            return filecache.seek(name, exts);
        },
    }
    managers.api = managers.aapi;
    managers.colr = managers.color;
    return managers;
}
var responseFromCache = function (data) {
    if (data instanceof Promise) return data.then(responseFromCache, responseFromCache);
    if (data instanceof Buffer || data instanceof Function) return data;
    if (typeof data === "string") {
        data = commbuilder(`require("${data}")`, 'index.js', 'index.js', []);
        return data;
    }
    return data;
};
var allManagers = [];
var getManagersWithEnv = function (env) {
    if (!env.managers) {
        env.managers = createManagersWithEnv(env);
        env.managers.then(m => {
            env.managers = m
            if (allManagers.indexOf(m) < 0) allManagers.push(m);
        });
    }
    return env.managers;
};
var fixExtentions = function (exts, ext) {
    if (ext) {
        exts = exts.filter(a => a !== ext);
        exts.unshift(ext);
    }
    return exts;
};

var exports = module.exports = async function (url, callback) {
    url = parseURL(url).pathname;
    var match = url.match(
        //////// 1 /////////        2           //// 3 //   4   /////////////////////
        /[\/\:](comm|page|aa?pi)\/(.*?)(\.[\w]*)?(?:(?:\?|\#).*?)?$/i
    );
    if (match) {
        var type = match[1],
            name = match[2],
            extt = match[3];
        var env = this || setupenv(url.slice(0, url.length - match[0].length));
        var managers = await getManagersWithEnv(env);
        var manager = managers[type];
        if (!manager) {
            callback('', type);
            return;
        }
        var result = await manager(name, extt);
    } else {
        url = url.replace(/[\?\#].*?$/, '');
        var env = this || setupenv(memery.APP || '');
        var managers = await getManagersWithEnv(env);
        var result = await managers.file(url, "");
    }
    if (!result) {
        if (name in globals) callback('', type);
        else callback(result, 404);
    }
    else callback(result, type);
    return result;
};
exports.reset = function () {
    for (var m of allManagers) {
        for (var k in m) {
            if (m[k] && isFunction(m[k].reset)) m[k].reset();
        }
    }
}