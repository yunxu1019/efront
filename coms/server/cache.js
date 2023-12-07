"use strict";
var fs = require("fs");
var watch = require("./watch");
var path = require("path");
var isObject = require("../basic/isObject");
var lazy = require("../basic/lazy");
var loading_queue = [], loading_count = 0;
var runPromiseInQueue = function () {
    if (loading_count > 2) return;
    if (loading_queue.length) {
        loading_count++;
        loading_queue.shift()();
    }
};
var delPromiseInQueue = function (a) {
    loading_count--;
    runPromiseInQueue();
    return a;
};
var getPromiseInQueue = function (runner) {
    var promise = new Promise(function (ok) {
        loading_queue.push(ok);
    }).then(function () {
        return new Promise(runner);
    }).then(delPromiseInQueue, delPromiseInQueue);
    runPromiseInQueue();
    return promise;
};

var getfileAsync = function (pathname, buffer_size, stat) {
    if (isFinite(buffer_size) && stat.size > buffer_size)
        return getFileHeadAsync(pathname, 0);
    return getPromiseInQueue(function (ok, oh) {
        fs.readFile(pathname, function (error, data) {
            if (error) oh(error);
            else ok(data);
        });
    });
};
var getFileHeadAsync = function (pathname, buffer_size) {
    return getPromiseInQueue(function (ok, oh) {
        fs.open(pathname, "r", function (err, h) {
            if (err) {
                return oh(err);
            }
            var chunk = Buffer.alloc(buffer_size);
            fs.read(h, chunk, 0, chunk.length, 0, function (err, length, chunk) {
                if (err) return fs.close(h), oh(err);
                if (length < chunk.length) {
                    chunk = chunk.slice(0, length);
                }
                chunk.location = pathname;
                fs.close(h, function (error) {
                    if (error) return oh(error);
                    ok(chunk);
                });
            });
        });
    });
};
var statFile = function (pathname) {
    return getPromiseInQueue(function (ok, oh) {
        fs.stat(pathname, function (error, stat) {
            if (error) return oh(error);
            ok(stat);
        });
    });
};

var readdir = function (pathame) {
    return getPromiseInQueue(function (ok, oh) {
        fs.readdir(pathame, { withFileTypes: true }, function (error, files) {
            if (error) return oh(error);
            ok(files);
        });
    });
};

var matcherReg = /[A-Z]+/g;
var replaceCase = function (match, index, input) {
    if (match.length === 1) {
        return "-" + match.toLowerCase();
    }
    if (match.length === 2) {
        match = match.toLowerCase();
        return "-" + match[0] + "-" + match[1];
    }
    if (index + match.length === input.length) {
        return "-" + match;
    }
    return '-' + match.slice(0, match.length - 1) + "-" + match[match.length - 1].toLowerCase();
};


var formatExtts = function (extts) {
    if (extts instanceof Array && extts.length <= 1) extts = extts[0];
    extts = extts || "";
    if (!Array.isArray(extts)) extts = [extts];
    return extts;
};
function PackageData(a) {
    Object.assign(this, JSON.parse(a));
}
PackageData.prototype = Object.create(null);

function Directory(pathname, rebuild, limit) {
    this.rebuild = rebuild;
    this.limit = limit;
    this.pathname = pathname;
    this.loaded = Object.create(null);
}
Directory.prototype = Object.create(null);
Directory.prototype.update = async function (updateonly) {
    var that = this;
    var loaded = that.loaded;
    that.isloaded = false;
    var files = await readdir(that.pathname);
    var map = {}, changed = {};
    var limit = that.limit;
    var rebuild = that.rebuild;
    var pathname = that.pathname;
    var updated = [];
    var rest = [];
    var hasLoaded = 0;
    for (var f of files) {
        if (/#/.test(f.name)) continue;
        map[f.name] = true;
        if (!loaded[f.name]) {
            var p = path.join(pathname, f.name);
            var o = loaded[f.name] = f.isFile() ? new File(p, rebuild, limit) : new Directory(p, rebuild, limit);
            var key = f.name.replace(/\.\w+$/, '');
            changed[key] = true;
            o.root = that.root || pathname;
            if (f instanceof File) {
                updated.push(f.pathname);
            }
        }
        if (/\-/.test(f.name)) {
            rest.push(f);
        }
    }
    for (var f of rest) {
        var newName = f.name.replace(/\-([a-z])/g, (_, a) => a.toUpperCase());
        if (!map[newName]) {
            map[newName] = true;
            loaded[newName] = loaded[f.name];
        }
    }

    for (var k in loaded) {
        var o = loaded[k];
        if (o instanceof Directory || o instanceof File) {
            if (!map[k]) {
                updated.push(loaded[k].pathname);
                delete loaded[k];
                var key = k.replace(/\.\w+$/, '');
                changed[key] = true;
            }
        }
    }
    for (var k in loaded) {
        var key = k.replace(/\.\w+$/, '');
        var o = loaded[k];
        if (changed[key]) {
            if (o instanceof File) o.unload();
        } else if (updateonly) {
            if (o instanceof File && o.data) {
                var data = o.data;
                o.promise = o.update();
                if (data !== await o.promise) {
                    updated.push(o.pathname);
                    hasLoaded++;
                }
            }
            else {
                if (o.isloaded) {
                    o.promise = o.update(updateonly);
                    var _updated = await o.promise;
                    if (_updated) updated.push.apply(updated, _updated);
                    hasLoaded += _updated.loaded;
                }
            }
        }
    }
    that.isloaded = true;
    updated.loaded = hasLoaded;
    return updated;
};
Directory.prototype.get = function (url) {
    var that = this;
    var reloadAfter = async function (promise) {
        await promise;
        await that.promise;
        if (!that.isloaded) throw `加载${url}失败！`;
        return that.get(url);
    };
    var keeys = url.split(/[\\\/]+/);
    var temps = [that];
    var keypath = [''];
    var temp = temps[0];
    search: for (var cx = 0, dx = keeys.length; cx < dx; cx++) {
        if (!(temp instanceof Directory)) {
            temp = undefined;
            break;
        }
        if (!temp.promise) temp.promise = temp.update();
        if (!temp.isloaded) return reloadAfter(temp.promise);
        var loaded = temp.loaded;
        var key = keeys[cx];
        if (key === '' || key === '.') continue;
        if (!(key in loaded)) {
            let k = key.replace(matcherReg, replaceCase);
            if (k in loaded) {
                key = k;
            }
        }
        if (!(key in loaded)) {
            if (!that.limit) {
                temp = undefined;
                break;
            }
            for (var cy = temps.length - 1; cy > 0; cy--) {
                if (key in temps[cy].loaded) {
                    let searched = temps[cy].get(keeys.slice(cx).join("/"));
                    if (searched instanceof Promise) {
                        return reloadAfter(searched);
                    }
                    if (searched !== undefined) {
                        temp = searched;
                        keypath.splice(cy, keypath.length - cy);
                        if (typeof searched === 'string') {
                            keypath.push.apply(keypath, searched.split('/'));
                        } else {
                            keypath.push.apply(keypath, keeys.slice(cx));
                        }
                        temps.splice(cy, keypath.length - cy, temp);
                        break search;
                    }
                }
            }
            continue;
        }
        keypath.push(key);
        temps.push(temp);
        temp = loaded[key];
        if (!temp) break;
    }
    if (temp instanceof File) {
        temp = temp.getBuffer();
    }
    else if (temp instanceof Directory && temp.data) {
        temp = temp.data;
    }

    if (temp instanceof Function) {
        return temp;
    }
    if (temp instanceof Error) {
        return temp;
    }
    if (!isObject(temp)) {
        return temp;
    }
    var curl = keypath.join('/');
    if (temps.length) {
        if (curl.replace(/^\/|\/$/g, '') === keeys.join('/').replace(/^\/|\/$/g, '')) {
            return temp;
        }
        else {
            if (curl.replace(/^[\s\S]*?([^\/]+)\/?$/, "$1") === url.replace(/^[\s\S]*?([^\/]+)\/?$/, "$1")) {
                return curl;
            }
        }
    }
};

function File(pathname, rebuild, limit) {
    this.pathname = pathname;
    this.limit = limit;
    this.rebuild = rebuild;
    this.dataid = 0;
}
File.prototype = Object.create(null);
File.prototype.checkLinked = async function () {
    var that = this;
    var linked = that.linked;
    if (!linked || !linked.length || !that.mtime) return true;
    var mtime = 0;
    for (var cx = 0, dx = linked.length; cx < dx; cx++) {
        var stat = await statFile(linked[cx]);
        if (stat instanceof fs.Stats) {
            mtime += +stat.mtime;
        }
        if (linked !== that.linked) return true;
    }
    if (!linked.mtime) {
        linked.mtime = mtime;
        return true;
    }
    if (mtime !== linked.mtime) {
        linked.mtime = mtime
        return false;
    }
    return true;
};
File.prototype.getBuffer = function () {
    var that = this;
    if (!that.promise) {
        delete that.data;
        delete that.mtime;
        that.promise = that.update();
    }
    if (that.data !== undefined) return that.data;
    return that.promise;
};
File.prototype.unload = function () {
    delete this.promise;
    delete this.data;
    delete this.mtime;
};
File.prototype.update = async function () {
    var that = this;
    var id = ++that.dataid;
    var stats = await statFile(that.pathname);
    if (id !== that.dataid) return that.promise;
    if (stats instanceof Error) {
        return that.data = stats;
    }
    if (+stats.mtime === that.mtime) {
        if (await that.checkLinked()) {
            if (id !== that.dataid) return that.promise;
            return that.data;
        }
    }
    that.mtime = +stats.mtime;
    if (that.data) {
        that.data = null;
    }

    var buffer = await getfileAsync(that.pathname, that.limit, stats);
    if (id !== that.dataid) return that.promise;
    if (that.rebuild instanceof Function && buffer instanceof Buffer) {
        var url = path.relative(that.root, that.pathname);
        url = url.replace(/\.(\w+)$/, '');
        try {
            var linked = that.linked = [];
            buffer = await that.rebuild(buffer, url, that.pathname, linked);
            if (id !== that.dataid) return that.promise;
            if (linked.length) await that.checkLinked();
            if (id !== that.dataid) return that.promise;
            if (typeof buffer === "string") buffer = Buffer.from(buffer);
            if (buffer instanceof Buffer) {
                buffer.stat = stats;
                if (!buffer.mime) {
                    var extend = String(that.pathname).match(/\.([^\.]*)$/);
                    if (extend && Cache.mime) buffer.mime = Cache.mime[extend[1]];
                }
                buffer.name = path.basename(that.pathname);
            }
        } catch (e) {
            buffer = e;
            console.log(e);
            console.error("编译错误:", that.pathname);
        }
    }

    return that.data = buffer;
};
var formatpathlist = function (filesroot) {
    var loaded = Object.create(null);
    filesroot = String(filesroot || '').split(",").filter(fs.existsSync).map(a => fs.realpathSync(a))
        .filter(a => loaded[a] ? false : loaded[a] = true);
    return filesroot;
}
var directRoots = Object.create(null);
var createDirect = function (froot, rebuild, limit) {
    var direct;
    if (!rebuild) {
        if (directRoots[froot]) return directRoots[froot];
        direct = directRoots[froot] = new Directory(froot, rebuild, limit);
    }
    else {
        if (!rebuild.cached_roots) rebuild.cached_roots = Object.create(null);
        if (rebuild.cached_roots[froot]) return rebuild.cached_roots[froot];
        direct = rebuild.cached_roots[froot] = new Directory(froot, rebuild, limit);
    }
    return direct;
};
var seekAsync = async function (directs, url, extts) {
    var findPackage = extts.indexOf(".js") >= 0;
    var package_file = "package.json";
    var result, matchParent;
    for (var d of directs) {
        var rest = extts.map(e => url + e);
        while (rest.length) {
            var u = rest.shift();
            var r = await d.get(u);
            if (isValidData(r)) return r;
            else if (typeof r === 'string') {
                if (result === undefined) result = r;
            }
            else if (r instanceof PackageData) return Buffer.from(JSON.stringify(r));
            else if (r instanceof Directory) {
                if (!r.promise) r.promise = r.update();
                if (!r.isloaded) await r.promise;
                if (!findPackage) return r.loaded;
                if (package_file in r.loaded) {
                    var f = r.loaded[package_file];
                    if (!f || !(f instanceof File)) continue;
                    if (!f.promise) f.promise = f.update();
                    if (!f.data) await f.promise;
                    if (f.data instanceof Buffer) f.data = new PackageData(f.data);
                    var package_main = getPackageMain(u, f.data, r.loaded);
                    if (package_main) return package_main;
                }
                else {
                    var seek_index = "index";
                    var index = extts.findIndex(a => seek_index + a in r.loaded);
                    if (~index) return path.join(url, seek_index + extts[index]).replace(/\\/g, '/');
                }
                matchParent = true;
            }
        }
    }
    if (result === undefined && matchParent) {
        result = url.replace(/\\/g, '/');
        if (!/\/$/.test(result)) {
            result += '/';
        }
    }
    return result;
}

var isValidData = function (data) {
    if (data instanceof Buffer || data instanceof Function) return true;
};
var getPackageMain = function (url, data, map) {
    if (!data instanceof PackageData) return;
    if (typeof data.main !== 'string') return;
    var roots = data.main.split(/[\/\\]+/).filter(a => a && a !== '.' && !/\:$/.test(a));
    if (roots[0] in map) {
        return path.join(url, roots.join('/')).replace(/\\/g, '/');
    }
}
class Cache {
    mime = null;
    updateid = 0;
    emitUpdate(updated) {
        if (this.onreload instanceof Function) this.onreload(updated);
    }
    _emitUpdate = lazy(this.emitUpdate, 20);
    checkUpdate = async function (rootpath) {
        var updated = [];;
        for (var direct of this.directs) {
            if (direct.pathname !== rootpath) continue;
            if (direct.isloaded) {
                direct.promise = direct.update(true);
                var _updated = await direct.promise;
                updated.push.apply(updated, _updated);
                if (_updated.loaded) updated.loaded = true;
            }
        }
        if (updated.length) this._emitUpdate(updated);
    }.bind(this);
    onreload = null;
    constructor(filesroot, rebuild, buffer_size_limit) {
        buffer_size_limit = isFinite(buffer_size_limit) && buffer_size_limit >= 0 ? buffer_size_limit | 0 : buffer_size_limit
        var filesroot = formatpathlist(filesroot);
        this.directs = filesroot.map(t => createDirect(t, rebuild, buffer_size_limit));
        this.directs.forEach(this.bindWatch, this);
    }
    bindWatch(direct) {
        if (fs.existsSync(direct.pathname) && fs.statSync(direct.pathname).isDirectory()) {
            watch(direct.pathname, this.checkUpdate, true);
        }
    }
    forEachLoaded(call) {
        var rest = this.directs.slice();
        while (rest.length) {
            var t = rest.pop();
            var loaded = t.loaded;
            for (var k in loaded) {
                if (t[k] instanceof File) {
                    call(t[k]);
                }
                else if (t[k] instanceof Directory) {
                    rest.push(t[k]);
                }
            }
        }
    }
    seek(url, extts = "") {
        extts = formatExtts(extts);
        var findPackage = extts.indexOf(".js") >= 0;
        var package_file = "package.json";
        var result, matchParent;
        for (var d of this.directs) {
            var rest = extts.map(e => url + e);
            while (rest.length) {
                var u = rest.shift();
                var r = d.get(u);
                if (r instanceof Promise) return seekAsync(this.directs, url, extts);
                if (isValidData(r)) return r;
                else if (typeof r === 'string') {
                    if (result === undefined) result = r;
                }
                else if (r instanceof PackageData) return Buffer.from(JSON.stringify(r));
                else if (r instanceof Directory) {
                    if (!r.isloaded) return seekAsync(this.directs, url, extts);
                    if (!findPackage) return r.loaded;
                    if (package_file in r.loaded) {
                        var f = r.loaded[package_file];
                        if (!f || !(f instanceof File)) continue;
                        if (!f.promise || !f.data) return seekAsync(this.directs, url, extts);
                        if (f.data instanceof Buffer) f.data = new PackageData(f.data);
                        var package_main = getPackageMain(u, f.data, r.loaded);
                        if (package_main) return package_main;
                    }
                    else {
                        var seek_index = "index";
                        var index = extts.findIndex(a => seek_index + a in r.loaded);
                        if (~index) return path.join(url, seek_index + extts[index]).replace(/\\/g, '/');
                    }
                    matchParent = true;
                }
            }
        }
        if (result === undefined && matchParent) {
            result = url.replace(/\\/g, '/');
            if (!/\/$/.test(result)) {
                result += '/';
            }
        }
        return result;
    }
    reset() {
        for (var t of this.directs) {
            delete t.promise;
        }
    }
}

module.exports = Cache;