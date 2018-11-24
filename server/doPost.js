"use strict";
var setupenv = require("../process/setupenv");
var env = process.env;
var getpagefile = require("../process/cache");
var commbuilder = require("../process/commbuilder");
var iconbuilder = require("../process/iconbuilder");
var aapibuilder = require("../process/aapibuilder");
var getcommfile = require("../process/cache")(env.COMS_PATH, commbuilder).async;
var getpagefile = require("../process/cache")(env.PAGE_PATH, commbuilder).async;
var getaapifunc = require("../process/cache")(env.APIS_PATH, aapibuilder).async;
var geticonfile = require("../process/cache")(env.ICON_PATH, iconbuilder).async;
var message = require("../process/message");
var proxy = require("./proxy");
var {
    PAGE,
    COMM,
    AAPI,
    ICON
} = env;
var ccons_root = "./" + ICON;
var comms_root = "./" + COMM;
var pages_root = "./" + PAGE;
var aapis_root = "./" + AAPI;
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
    return getfrompath(name, _comms_root, getcommfile, [".js", ".html"]);
};

var getpage = function (name, env) {
    var _pages_root = env.PAGE || pages_root;
    return getfrompath(name, _pages_root, getpagefile, [".js", ".html"]);
};

var getapi = function (name, env) {
    var _aapis_root = env.AAPI || aapis_root;
    return getfrompath(name, _aapis_root, getaapifunc, ".js");
};

var readdata = function (req, res, then, max_length) {
    var buff = [],
        length = 0;
    req.on("data", function (buf) {
        length += buf.length;
        if (length > max_length) return res.writeHead(403, {}), res.end();
        buff.push(buf);
    });
    req.on("end", function () {
        length <= max_length && then(Buffer.concat(buff));
    });
};
var handle = {
    "/count"(req, res) {
        message.count(req.headers.referer);
        res.end();
    },

    "/webhook"(req, res) {
        readdata(req, res, function (buff) {
            try {
                var token = JSON.parse(String(buff)).token;
                require("crypto").createHash("md5").update(token).digest("base64") === "tObhntR/qdhj3QfJGrVKww==" && require("./message").webhook();
                res.end();
            } catch (e) {
                res.end(String(e));
            }
        }, 200000);
    }
};
var managers = {
    comm: getcomm,
    api: getapi,
    aapi: getapi,
    page: getpage,
    ccon: geticon,
}

if (process.env.IN_TEST_MODE) {
    let connections = [];
    handle["/reload"] = function (req, res) {
        connections.push(res);
    };

    require("../process/cache").onreload(function () {
        message.reload();
    });
    message.onreload = function () {
        connections.splice(0).forEach(res => res.end());
    };
}

var doPost = module.exports = function (req, res) {
    res.setHeader("Content-Type", "application/json;charset:UTF-8");
    var url = req.url;
    if (handle[url] instanceof Function) {
        return handle[url](req, res);
    }
    url = proxy(req);
    var match = url.match(
        ///// 1 //            2            //// 3 //     4      ////
        /^\/(.*?)(comm|page|ccon|aa?pi)\/(.*?)(?:\.js|\.png)?$/
    );
    if (match) {
        var appc = match[1],
            type = match[2],
            name = match[3],
            extt = match[4];
        var env = appc ? setupenv(appc) : {};
        var manager = managers[type];
        if (!manager) return res.end();
        var result = manager(name, env);
        var response = function (result) {
            switch (type) {
                case "api":
                    if (result instanceof Function) result(req, res);
                    else res.writeHead(404, {}) | res.end();
                    break;
                case "aapi":
                    if (result instanceof Function) res.end(result());
                    else res.writeHead(404, {}) | res.end();
                    break;
                case "comm":
                    res.end(String(result));
                    break;
                case "page":
                    res.end(String(result));
                    break;
                case "ccon":
                    res.end(String(result));
                    break;
                default:
                    res.end();
            }
        };
        if (result instanceof Promise) {
            result.then(response)
        } else {
            response(result);
        }
    } else {
        res.end();
    }
};
doPost.ccon = function (name, color) {
    var data = geticon(name);
    return iconbuilder.color(String(data), color);
}