
var path = require("path");
var fs = require("fs");
var root = require("../efront/memery").webroot;
function doList(filepath) {
    return new Promise(function (ok, oh) {
        fs.readdir(filepath, { withFileTypes: true }, function (error, names) {
            if (error) return oh(e400);
            names = names.map(file => {
                if (file.isFile()) return file.name;
                return file.name + '/';
            });
            var data = JSON.stringify(names);
            ok(data);
        });
    });
}

function doAdd(filepath) {
    return new Promise(function (ok, oh) {
        fs.mkdir(filepath, { recursive: true }, function (error) {
            if (error) return oh(error);
            ok();
        });
    })
}

function doMove(p1, p2) {
    return new Promise(function (ok, oh) {
        fs.rename(p1, p2, function (error) {
            if (error) return oh(error);
            ok();
        });
    });
}

function doDelete(p1) {
    return new Promise(function (ok, oh) {
        fs.stat(p1, function (error, stats) {
            if (error) return oh(error);
            if (stats.isFile()) fs.unlink(p1, function (error) {
                if (error) return oh(error);
                ok();
            });
            else if (stats.isSymbolicLink()) fs.unlink(p1, function (error) {
                if (error) return oh(error);
                ok();
            });
            else fs.rmdir(p1, function (error) {
                if (error) return oh(error);
                ok();
            })

        })
    });
}

function wrapPath(pathname) {
    try {
        pathname = encode62.timedecode(pathname);
    } catch (e) {
        throw e400;
    }
    pathname = path.normalize(pathname);
    pathname = pathname.replace(/^[\.\/\\]+/, '');
    pathname = path.join(root, pathname);
    return pathname;
}

var e400 = { status: 400, toString: () => "请求无效" };
function doFolder(type, pathname) {
    if (type === 'mov') {
        var p = /^([\s\S]*?)\?([\s\S]*)$/.exec(pathname);
        if (!p) throw e400;
        return doMove(wrapPath(p[1]), wrapPath(p[2]));

    }
    pathname = wrapPath(pathname);
    switch (type) {
        case "list":
            return doList(pathname);
        case "add":
            return doAdd(pathname);
        case "del":
            return doDelete(pathname);
        default:
            throw e400;
    }
}
module.exports = doFolder;