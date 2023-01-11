"use strict";
var setupenv = require("./setupenv");
var parseURL = require("../basic/parseURL");
var memery = require("./memery");
var getCommap = require("./getCommap");
var commbuilder = require("./commbuilder");
var iconbuilder = require("./iconbuilder");
var aapibuilder = require("./aapibuilder");
var filebuilder = require("./filebuilder");
var path = require("path");
var mixin = require("./mixin");
var fs = require("fs");
var globals = require("./globals");
var FILE_BUFFER_SIZE = memery.FILE_BUFFER_SIZE;
var createManagersWithEnv = async function (env) {
    var commap = await getCommap(env.APP);
    var Cache = require("../server/cache");
    var cbuilder = commbuilder.bind(commap);
    var mixpath = (a, b) => mixin(a, b || '').map(a => path.join.apply(path, a)).filter(fs.existsSync).join(',');
    var coms_path = mixpath(env.COMS_PATH, env.COMM);
    var page_path = mixpath(env.PAGE_PATH, env.PAGE);
    var comscache = new Cache(coms_path, cbuilder);
    var pagecache = new Cache(page_path, cbuilder);
    var fireload = function () {
        if (env.reload instanceof Function) env.reload();
    };
    var update = async function () {
        if (update.ing) return;
        update.ing = true;
        try {
            await update1();
        } catch { }
        update.ing = false;
        fireload();
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
            if (!k in cm) {
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
    var iconcache = new Cache(mixpath(env.ICON_PATH || require("path").join(__dirname, "../data/cons"), env.ICON), iconbuilder);
    iconcache.onreload = fireload;
    var filecache = new Cache(mixpath(env.FILE_PATH || env.PAGE_PATH, env.FILE || env.PAGE), filebuilder, FILE_BUFFER_SIZE);
    filecache.onreload = fireload;
    var managers = {
        comm(name, ext) {
            var exts = fixExtentions([".js", '.xht', ".ts", ".json", ".html", '.vue', ''], ext);
            name = require("./$split")(name).join("/");
            var res = comscache.seek(name, exts);
            return responseFromCache(res);
        },
        page(name, ext) {
            var exts = fixExtentions([".js", ".xht", ".ts", ".html", '.vue', ''], ext);
            var res = pagecache.seek(name, exts);
            return responseFromCache(res);
        },
        aapi(name, ext) {
            var exts = fixExtentions([".js", '.ts'], ext);
            return apicache.seek(name, exts);
        },
        ccon(name, ext) {
            var exts = fixExtentions([".png"], ext);
            return iconcache.seek(name, exts);
        },
        file(name, ext) {
            var exts = [ext]
            return filecache.seek(name, exts);
        },
        color: iconbuilder.color
    }
    managers.icon = managers.ccon;
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
        /[\/\:](comm|page|ccon|aa?pi)\/(.*?)(\.[\w]*)?(?:(?:\?|\#).*?)?$/i
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
            if (isFunction(m[k].reset)) m[k].reset();
        }
    }
}