var fs = require("fs");
var path = require("path");
var cache = {};
function readdir(fullpath) {
    return new Promise(function (ok, oh) {
        fs.readdir(fullpath, { withFileTypes: true }, function (err, names) {
            if (err) return oh(err);
            var map = {};
            var rest = [];
            for (var n of names) {
                map[n.name] = n;
                if (/\-/.test(n.name)) rest.push(n);
            }
            for (var r of rest) {
                var n = r.name.replace(/\-([\s\S])/g, (_, a) => a.toUpperCase());
                if (!(n in map)) {
                    map[n] = r;
                }
            }
            ok(map);
        })
    })
}

async function seek(fullpath, search) {
    search = search.split(/[\\\/]/);
    var pathlist = [fullpath];
    while (search.length) {
        var s = search.shift();
        var p = path.join(...pathlist);
        var map;
        if (p in cache) {
            map = await cache[p];
        }
        else {
            cache[p] = readdir(p);
            map = await readdir(p);
            cache[p] = map;
        }
        if (s in map) {
            pathlist.push(map[s].name);
            continue;
        }
        return null;
    }
    return path.join(...pathlist);
}
async function getFromPath(dirs, name, extt) {
    if (!(dirs instanceof Array)) dirs = [dirs];
    if (!(extt instanceof Array)) extt = [extt];
    for (var d of dirs) {
        for (var e of extt) {
            var p = await seek(d, name + e);
            if (p) return p;
        }
    }
}
module.exports = getFromPath;