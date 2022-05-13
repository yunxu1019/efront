"use strict";
var setupenv = require("./setupenv");
var memery = require("./memery");
var FILE_BUFFER_SIZE = memery.FILE_BUFFER_SIZE;
var getpagefile = require("./cache");
var commbuilder = require("./commbuilder");
var iconbuilder = require("./iconbuilder");
var aapibuilder = require("./aapibuilder");
var filebuilder = require("./filebuilder");
var getcommfile = require("./cache")(memery.coms_path, commbuilder).async;
var getpagefile = require("./cache")(memery.PAGE_PATH, commbuilder).async;
var getaapifunc = require("./cache")(memery.APIS_PATH, aapibuilder).async;
var geticonfile = require("./cache")(memery.ICON_PATH || require("path").join(__dirname, "../data/cons"), iconbuilder).async;
var getonlyfile = require("./cache")(memery.FILE_PATH || memery.PAGE_PATH, filebuilder, FILE_BUFFER_SIZE).async;

var getfrompath = function (name, __root, getter, extt) {
    __root = String(__root || '').split(/,/);
    return new Promise(function (ok) {
        var inc = 0;
        var res = '';
        var run = function (result) {
            if (result instanceof Buffer || result instanceof Function) return ok(result);
            if (typeof result === "string") {
                res = commbuilder(`require("${result}")`, 'index.js', 'index.js', []);
            }
            if (inc >= __root.length) return res instanceof Promise ? res.then(ok) : ok(res);
            var body = getter(__root[inc] + "/" + name, extt);
            inc++;
            if (body instanceof Promise) {
                var error;
                body.catch(function (e) {
                    error = e;
                }).then(function (body) {
                    if (error) return ok(error);
                    run(body);
                });
            } else {
                run(body);
            }
        };
        run();
    })
};
var geticon = function (name, env) {
    var _ccons_root = env.ICON || memery.ICON;
    return getfrompath(name, _ccons_root, geticonfile, ".png");
};

var getcomm = function (name, env, ext) {
    var _comms_root = env.COMM || memery.COMM;
    name = name.replace(/(\w)\$/g, "$1/");
    var exts = [".js", ".ts", ".json", ".html", '.vue', ''];
    if (ext && !~exts.indexOf(ext)) {
        exts.unshift(ext);
    }
    return getfrompath(name, _comms_root, getcommfile, exts);
};

var getpage = function (name, env, ext) {
    var _pages_root = env.PAGE || memery.PAGE;

    var exts = [".js", ".ts", ".html", '.vue', ''];
    if (ext && !~exts.indexOf(ext)) {
        exts.unshift(ext);
    }
    return getfrompath(name, _pages_root, getpagefile, exts);
};

var getapi = function (name, env) {
    var _aapis_root = env.AAPI || memery.AAPI;
    return getfrompath(name, _aapis_root, getaapifunc, ".js");
};

var getfile = function (name, env) {
    var _files_root = env.FILE || env.PAGE || memery.FILE_PATH;
    return getfrompath(name, _files_root, getonlyfile, [""]);
};

var managers = {
    comm: getcomm,
    api: getapi,
    aapi: getapi,
    page: getpage,
    ccon: geticon,
    file: getfile,
    color: iconbuilder.color
}

var exports = module.exports = function (url, callback) {
    var match = url.match(
        //////// 1 /////////        2           //// 3 //   4   /////////////////////
        /^\/(?:(.*?)\/)?\:?(comm|page|ccon|aa?pi)\/(.*?)(\.[\w]*)?(?:(?:\?|\#).*?)?$/i
    );
    if (match) {
        var appc = match[1],
            type = match[2],
            name = match[3],
            extt = match[4];
        var env = setupenv(appc);
        var manager = managers[type];
        if (!manager) return callback('', type);
        var result = manager(name, env, extt);
    } else {
        url = url.replace(/[\?\#].*?$/, '');
        var result = managers.file(url, {});
    }
    var response = function (result) {
        if (!result) type = 404;
        callback(result, type);
    };
    if (result instanceof Promise) {
        result.then(response)
    } else {
        response(result);
    }
};
exports.reset = function () {
    getcommfile.reset();
    getpagefile.reset();
}
Object.assign(exports, managers);