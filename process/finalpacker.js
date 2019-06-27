var setupenv = require("../process/setupenv");
var env = process.env;
var FILE_BUFFER_SIZE = 64 * 1024 * 1024;
var getpagefile = require("../process/cache");
var commbuilder = require("../process/commbuilder");
var iconbuilder = require("../process/iconbuilder");
var aapibuilder = require("../process/aapibuilder");
var filebuilder = require("../process/filebuilder");
var getcommfile = require("../process/cache")(env.COMS_PATH, commbuilder).async;
var getpagefile = require("../process/cache")(env.PAGE_PATH, commbuilder).async;
var getaapifunc = require("../process/cache")(env.APIS_PATH, aapibuilder).async;
var geticonfile = require("../process/cache")(env.ICON_PATH || require("path").join(__dirname, "../cons"), iconbuilder).async;
var getonlyfile = require("../process/cache")(env.FILE_PATH || env.PAGE_PATH, filebuilder, FILE_BUFFER_SIZE).async;

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
        var run = function () {
            if (inc >= __root.length) return ok("");
            var body = getter(__root[inc] + "/" + name, extt);
            inc++;
            if (body instanceof Promise) {
                var error;
                body.catch(function (e) {
                    error = e;
                }).then(function (body) {
                    if (error) return ok(error);
                    if (body instanceof Buffer || body instanceof Function) ok(body);
                    else run();
                });
            } else {
                if (body instanceof Buffer || body instanceof Function) ok(body);
                else run();
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
    return getfrompath(name, _comms_root, getcommfile, [".js", ".ts", ".json", ".html"]);
};

var getpage = function (name, env) {
    var _pages_root = env.PAGE || pages_root;
    return getfrompath(name, _pages_root, getpagefile, [".js", ".ts", ".html"]);
};

var getapi = function (name, env) {
    var _aapis_root = env.AAPI || aapis_root;
    console.log(name, _aapis_root);
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
        if (!manager) return res.end();
        var result = manager(name, env);
    } else {
        url = url.replace(/[\?\#].*?$/, '');
        var result = managers.file(url, {});
    }
    var response = function (result) {
        callback(result, type);
    };
    if (result instanceof Promise) {
        result.then(response)
    } else {
        response(result);
    }
};
Object.assign(exports, managers);