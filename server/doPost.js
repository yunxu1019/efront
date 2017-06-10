var getpagefile = require("../process/cache");
var commbuilder = require("../process/commbuilder");
var iconbuilder = require("../process/iconbuilder");
var getcommfile = require("../process/cache")("./coms", commbuilder);
var getpagefile = require("../process/cache")("./apps", commbuilder);
var geticonfile = require("../process/cache")("./cons", iconbuilder);
var env = process.env;
var APP = env.APP || "zimoli";
var COM = env.COM || "zimoli";
var CON = env.CON || "zimoli";

var ccons_root = "./" + CON + "/";
var comms_root = "./" + COM + "/";
var pages_root = "./" + APP + "/";

var geticon = function (name, _ccons_root = ccons_root) {
    return geticonfile(_ccons_root + name + ".png");
};

var getcomm = function (name, _comms_root = comms_root) {
    return getcommfile(_comms_root + name + ".js");
};

var getpage = function (name, _pages_root = pages_root) {
    return getpagefile(_pages_root + name + ".js");
};

var handle = {
    "/count" (req, res) {
        process.send("count." + req.headers.referer);
        res.end();
    },
    "/" (req, res) {
        var main = getcomm("main");
        return res.end(main);
    },
    "/comm" (req, res) {
        var buff = [];
        req.on("data", function (buf) {
            buff.push(String(buf));
        });
        req.on("end", function () {
            var name = buff.join("");
            return res.end(getcomm(name));
        });
    },
    "/ccon" (req, res) {},
    "/page" (req, res) {
        var buff = [];
        req.on("data", function (buf) {
            buff.push(String(buf));
        });
        req.on("end", function () {
            var name = buff.join("");
            return res.end(getpage(name));
        });
    },
    "/api" () {
        res.end();
    }
};
sumedSize = 0;

function read(req, size) {
    sumedSize += size;
    return new Promise(function (ok, oh) {
        var buff = [];
        req.on("data", function (buf) {
            var data = String(buf);
            size -= data.length;
            if (size < 0) {
                buff = null;
                req.resume();
                oh("size error");
            }
            buff.push(data);
        });
        req.on("end", function () {
            buff && ok(buff.join(""));
            sumedSize -= size;
        });
    });
}
var doPost = module.exports = function (req, res) {
    var url = req.url;
    if (handle[url] instanceof Function) {
        return handle[url](req, res);
    }
    var match = url.match(/^\/(comm|page|ccon|api)\/(.*?)(?:\.js|\.png)?$/);
    if (match) {
        var type = match[1],
            name = match[2],
            extt = match[3];
        switch (type) {
            case "comm":
                res.end(getcomm(name));
                break;
            case "page":
                res.end(getpage(name));
                break;
            case "ccon":
                res.end(geticon(name));
                break;
            default:
                res.end();
        }
    } else {
        res.end();
    }
};
doPost.ccon = function (name, color) {
    var data = geticon(name);
    return iconbuilder.color(data, color);
}