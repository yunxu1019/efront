var getpagefile = require("../process/cache");
var commbuilder = require("../process/commbuilder");
var iconbuilder = require("../process/iconbuilder");
var aapibuilder = require("../process/aapibuilder");
var getcommfile = require("../process/cache")("./coms", commbuilder);
var getpagefile = require("../process/cache")("./apps", commbuilder);
var geticonfile = require("../process/cache")("./cons", iconbuilder);
var getaapifunc = require("../process/cache")("./apis", aapibuilder);
var setupenv = require("../process/setupenv");
var message = require("./message");
var env = process.env;
var PAGE = env.PAGE || "zimoli";
var COMM = env.COMM || "zimoli";
var ICON = env.ICON || "zimoli";
var AAPI = env.APIS || "zimoli";
var ccons_root = "./" + ICON;
var comms_root = "./" + COMM;
var pages_root = "./" + PAGE;
var aapis_root = "./" + AAPI;
var geticon = function (name, _ccons_root = ccons_root) {
    return geticonfile(_ccons_root + "/" + name + ".png");
};

var getcomm = function (name, _comms_root = comms_root) {
    return getcommfile(_comms_root + "/" + name + ".js");
};

var getpage = function (name, _pages_root = pages_root) {
    return getpagefile(_pages_root + "/" + name + ".js");
};

var getapi = function (name, _aapis_root = aapis_root) {
    return getaapifunc(_aapis_root + "/" + name + ".js");
}

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
}
var handle = {
    "/count" (req, res) {
        message.count(req.headers.referer);
        res.end();
    },
    "/" (req, res) {
        var main = getcomm("main");
        return res.end(main);
    },
    "/comm" (req, res) {
        readdata(req, res, function (buff) {
            res.end(getcomm(buff.toString()));
        }, 1000);
    },
    "/ccon" (req, res) {},
    "/page" (req, res) {
        readdata(req, res, function (buff) {
            return res.end(getpage(buff.toString()));
        }, 1000);
    },
    "/api" (req, res) {
        res.end();
    },
    "/webhook" (req, res) {
        readdata(req, res, function (buff) {
            try {
                var token = JSON.parse(buff.toString()).token;
                console.log(buff.toString())
                require("crypto").createHash("md5").update(token).digest("base64") === "tObhntR/qdhj3QfJGrVKww==" && require("./message").webhook();
            } catch (e) {}
        }, 1000);
    }
};

if (process.env.IN_TEST_MODE) {
    let connections = [];
    handle["/reload"] = function (req, res) {
        connections.push(res);
    };

    require("../process/cache").onreload(function () {
        require("./message").reload();
    });
    require("./message").onreload = function () {
        connections.splice(0).forEach(res => res.end());
    };
}
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
    var match = url.match(/^\/(.*?)(comm|page|ccon|api)\/(.*?)(?:\.js|\.png)?$/);
    if (match) {
        var appc = match[1],
            type = match[2],
            name = match[3],
            extt = match[4];
        var env = appc ? setupenv(appc) : {};
        switch (type) {
            case "comm":
                res.end(getcomm(name, env.COMM));
                break;
            case "page":
                res.end(getpage(name, env.PAGE));
                break;
            case "ccon":
                res.end(geticon(name, env.ICON));
                break;
            case "api":
                var api = getapi(name, env.AAPI)
                if (api instanceof Function) api(req, res);
                else res.writeHead(404, {}) | res.end();
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