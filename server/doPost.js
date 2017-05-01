var getpagefile = require("../process/cache");
var commbuiler = require("../process/commbuilder");
var getcommfile = require("../process/cache")("./coms", commbuiler);
var getpagefile = require("../process/cache")("./apps", commbuiler);
var getcomm = function (name) {
    var comms_root = "./zimoli/";
    return getcommfile(comms_root + name + ".js");
};
var getpage = function (name) {
    var pages_root = "./zimoli/";
    return getpagefile(pages_root + name + ".js");
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
module.exports = function (req, res) {
    var url = req.url;
    if (handle[url] instanceof Function) {
        return handle[url](req, res);
    }
    var match = url.match(/^\/(comm|page|api)\/(.*?)(?:\.js)?$/);
    if (match) {
        var type = match[1],
            name = match[2];
        switch (type) {
            case "comm":
                res.end(getcomm(name));
                break;
            case "page":
                res.end(getpage(name));
                break;
        }
    } else {

    }
};