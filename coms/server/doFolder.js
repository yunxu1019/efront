
var path = require("path");
var fs = require("fs");
var fsp = fs.promises;
var root = require("../efront/memery").fileroot;
var Task = require("../basic/Task");
var { Transform } = require("stream");
var stat = function (fullpath) {
    return fsp.stat(fullpath);
};
var readdir = function (filepath) {
    return fsp.readdir(filepath, { withFileTypes: true });
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
        var stats = await stat(from);
        task.total = stats.size;
        task.loaded = 0;
        if (stats.isDirectory()) {
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
    return fsp.mkdir(filepath, { recursive: true });
}

async function doGet(filepath) {
    var stats = await stat(filepath);
    var size = stats.size;
    var stream = fs.createReadStream(filepath);
    stream.name = path.basename(filepath);
    stream.size = size;
    return stream;
}

function doMove(p1, p2) {
    return fsp.rename(p1, p2,);
}

async function doDelete(p1) {
    var stats = await stat(p1);
    if (stats.isFile()) await fsp.unlink(p1);
    else if (stats.isSymbolicLink()) await fsp.unlink(p1);
    else if (fsp.rm) await fsp.rm(p1, { recursive: true });
    else await fsp.rmdir(p1, { recursive: true });
}

function wrapPath(pathname) {
    try {
        pathname = encode62.packdecode(pathname);
    } catch (e) {
        throw e400;
    }
    pathname = path.normalize(pathname);
    pathname = pathname.replace(/^([\.]*[\/\\])+/, '');
    pathname = path.join(root, pathname);
    return pathname;
}

var e400 = { status: 400, toString: () => "请求无效" };
function doFolder(type, pathname) {
    if (doFolder.hasOwnProperty(type) && isFunction(doFolder[type])) {
        var [, from, to] = /^([\s\S]*?)(?:\?([\s\S]*))?$/.exec(pathname);
        from = wrapPath(from);
        if (to) to = wrapPath(to);
        var du = doFolder[type];
        var p = du(from, to);
        if (du !== doList && du !== doGet) {
            var notify = function () {
                doFile.notify(from);
                if (to) doFile.notify(to);
            }
            p.then(notify, notify);
        }
        return p;
    }
    throw e400;
}
doFolder.list = doList;
doFolder.add = doAdd;
doFolder.del = doDelete;
doFolder.get = doGet;
doFolder.mv = doFolder.move = doFolder.mov = function (from, to) {
    if (!to) throw e400;
    return doMove(from, to);
};
doFolder.copy = doFolder.cp = doCopy;
module.exports = doFolder;