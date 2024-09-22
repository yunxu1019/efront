var readline = require("readline");
var fs = require("fs");
var path = require("path");
var getIndexFromOrderedArray = require("../basic/getIndexFromOrderedArray");
var userdata = require("./userdata");
var logpath = userdata.getFullpath("similar.log");
var hosts = [];
var sortbyId = function (a, b) {
    if (a.id <= b.id) return true;
    return false;
};
var sortbytime = function (a, b) {
    return hosts[a].time - hosts[b].time;
}
var sortnumber = function (a, b) {
    return a - b;
}
var clear = function () {
    var a = new Array(hosts.length);
    for (var cx = 0, dx = a.length; cx < dx; cx++)a[cx] = cx;
    a.sort(sortbytime);
    a = a.slice(0, a.length >> 1).sort(sortnumber);
    for (var cx = a.length - 1; cx >= 0; cx--)hosts.splice(a[cx], 1);
};
var init_promise = null
var init = function (filepath) {
    if (init_promise) return init_promise;
    init_promise = new Promise(function (ok, oh) {
        var folder = path.dirname(filepath);
        if (fs.existsSync(folder)) return ok();
        fs.mkdir(folder, { recursive: true }, function (error) {
            if (error) return oh(error);
            fs.readdir(userdata.getFullpath(""), { withFileTypes: true }, async function (error, names) {
                if (error) return ok(error);
                for (var n of names) {
                    if (n.isFile()) {
                        if (/^similar\s*\d/.test(n.name)) {
                            await new Promise(function (ok) {
                                fs.rename(
                                    userdata.getFullpath(n.name),
                                    path.join(folder, n.name.replace(/^similar\s*/, '')),
                                    ok
                                );
                            });
                        }
                    }
                }
                ok();
            })
        });
    });
    return init_promise;
};
var save = async function (o, filepath = logpath) {
    if (hosts.length > 0xfff) clear();
    o.id = `${o.ip}:${o.port}`;
    var index = getIndexFromOrderedArray(hosts, o, sortbyId);
    hosts.splice(index + 1, 0, o);
    var data = await userdata.encode(`${o.ip} ${o.port} ${o.ppid} ${o.time}`);
    data = encodeURI(data);
    await init(filepath);
    var stream = fs.createWriteStream(filepath, { flags: "a" });
    stream.write(data + "\r\n");
    stream.end();
};
var load = function () {
    var tmppath = userdata.getFullpath("similar.tmp");
    if (fs.existsSync(logpath)) {
        if (fs.existsSync(tmppath)) fs.unlinkSync(tmppath);
        fs.renameSync(logpath, tmppath);
    }
    if (!fs.existsSync(tmppath)) return;
    var stream = fs.createReadStream(tmppath);
    var rl = readline.createInterface(stream);
    var now = +new Date;
    rl.on("line", async function (data) {
        data = decodeURI(data);
        data = await userdata.decode(data);
        var [ip, port, ppid, time] = data.split(/\s+/);
        time = +time;
        if (now - time < 86400000) {
            save({ ip, port, ppid, time });
        }
        else {
            var t = new Date(time);
            var filename = `similar/${t.getFullYear()}-${t.getMonth() + 1}-${t.getDate()}.log`;
            filename = userdata.getFullpath(filename);
            save({ ip, port, ppid, time }, filename);
        }
    });
    rl.on("close", function () {
        fs.unlinkSync(tmppath);
    });
};
load();
module.exports = {
    destroy() {
    },
    all() {
        return hosts;
    },
    log: save
};