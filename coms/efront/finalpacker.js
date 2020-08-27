"use strict";
var setupenv = require("./setupenv");
var env = process.env;
var FILE_BUFFER_SIZE = 64 * 1024 * 1024;
var getpagefile = require("./cache");
var commbuilder = require("./commbuilder");
var iconbuilder = require("./iconbuilder");
var aapibuilder = require("./aapibuilder");
var filebuilder = require("./filebuilder");
var getcommfile = require("./cache")(env.COMS_PATH, commbuilder).async;
var getpagefile = require("./cache")(env.PAGE_PATH, commbuilder).async;
var getaapifunc = require("./cache")(env.APIS_PATH, aapibuilder).async;
var geticonfile = require("./cache")(env.ICON_PATH || require("path").join(__dirname, "../data/cons"), iconbuilder).async;
var getonlyfile = require("./cache")(env.FILE_PATH || env.PAGE_PATH, filebuilder, FILE_BUFFER_SIZE).async;
var {
    PAGE,
    FILE = PAGE,
    COMM,
    AAPI,
    ICON
} = env;
var ccons_root = "./" + ICON;
var comms_root = "./" + COMM;
var pages_root = "./" + PAGE;
var aapis_root = "./" + AAPI;
var files_root = "./" + FILE;
var getfrompath = function (name, __root, getter, extt) {
    __root = __root.split(/,/);
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
    var _ccons_root = env.ICON || ccons_root;
    return getfrompath(name, _ccons_root, geticonfile, ".png");
};

var getcomm = function (name, env) {
    var _comms_root = env.COMM || comms_root;
    name = name.replace(/(\w)\$/g, "$1/");
    return getfrompath(name, _comms_root, getcommfile, [".js", ".ts", ".json", ".html", '.vue', '']);
};

var getpage = function (name, env) {
    var _pages_root = env.PAGE || pages_root;
    return getfrompath(name, _pages_root, getpagefile, [".js", ".ts", ".html", '.vue', '']);
};

var getapi = function (name, env) {
    var _aapis_root = env.AAPI || aapis_root;
    return getfrompath(name, _aapis_root, getaapifunc, ".js");
};

var getfile = function (name, env) {
    var _files_root = env.FILE || env.PAGE || files_root;
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
        ///// 1 //        2           //// 3 //     4      /////////////////////
        /^\/(?:(.*?)\/)?(comm|page|ccon|aa?pi)\/(.*?)(?:\.js|\.png)?(?:(?:\?|\#).*?)?$/i
    );
    if (match) {
        var appc = match[1],
            type = match[2],
            name = match[3],
            extt = match[4];
        var env = setupenv(appc);
        var manager = managers[type];
        if (!manager) return callback('', type);
        var result = manager(name, env);
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
Object.assign(exports, managers);