
var path = require("path");
var fs = require("fs");
var root = require("../efront/memery").webroot;
var Task = require("../basic/Task");
var { Transform } = require("stream");
var stat = function (fullpath) {
    return new Promise(function (ok, oh) {
        fs.stat(fullpath, function (error, stats) {
            if (error) return oh(error);
            ok(stats);
        })
    });
};
var readdir = function (filepath) {
    return new Promise(function (ok, oh) {
        fs.readdir(filepath, { withFileTypes: true }, function (error, names) {
            if (error) return oh(error);
            ok(names);
        })
    });
};
async function doCopy(from, to) {
    if (fs.existsSync(to)) throw i18n`目标文件已存在`;
    var stats = await stat(from);
    var task = new Task;
    /**
     * @this {Task}
     */
    var transform = new Transform({
        /**
         * @this {Task}
         */
        transform: function (chunk, encoding, callback) {
            callback(null, chunk);
            this.loaded += chunk.length;
            this.percent = this.loaded / this.total;
        }.bind(task)
    })
    var load = async function ([from, to]) {
        var stats = stat(from);
        task.total = stats.size;
        task.loaded = 0;
        if ((await stat(from)).isDirectory()) {
            if (this.aboted) return;
            await doAdd(to);
            if (this.aboted) return;
            var files = await doList(from);
            if (this.aboted) return;
            for (var f of files) this.rest.push([path.join(from, f), path.join(to, f)])
        } else {
            this.total = stats.size;
            this.loaded = 0;
            var r = fs.createReadStream(from);
            var w = fs.createWriteStream(to);
            r.pipe(transform).pipe(w);
        }
    };
    if (stats.isDirectory()) {
        task.open(i18n`复制文件夹`, load);
    }
    else {
        task.open(i18n`复制文件`, load);
    }
    task.send([from, to]);
    return task;
}

async function doList(fullpath) {
    var names = await readdir(fullpath);
    names = names.map(file => {
        if (file.isFile()) return file.name;
        return file.name + '/';
    });
    return JSON.stringify(names);
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
            var cb = function (error) {
                if (error) return oh(error);
                ok();;
            }
            if (stats.isFile()) fs.unlink(p1, cb);
            else if (stats.isSymbolicLink()) fs.unlink(p1, cb);
            else if (fs.rm) fs.rm(p1, { recursive: true }, cb);
            else fs.rmdir(p1, { recursive: true }, cb)
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
    if (doFolder.hasOwnProperty(type) && isFunction(doFolder[type])) {
        var [, from, to] = /^([\s\S]*?)(?:\?([\s\S]*))?$/.exec(pathname);
        from = wrapPath(from);
        if (to) to = wrapPath(to);
        return doFolder[type](from, to);
    }
    throw e400;
}
doFolder.list = doList;
doFolder.add = doAdd;
doFolder.del = doDelete;
doFolder.mv = doFolder.move = doFolder.mov = function (from, to) {
    if (!to) throw e400;
    return doMove(from, to);
};
doFolder.copy = doFolder.cp = doCopy;
module.exports = doFolder;