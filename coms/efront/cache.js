"use strict";
var fs = require("fs");
var watch = require("../efront/watch");
var path = require("path");
var isObject = require("../basic/isObject");
var lazy = require("../basic/lazy");
var mimes = require("./mime");
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


var getExtts = function (extts) {
    if (extts instanceof Array && extts.length <= 1) extts = extts;
    return extts || "";
};
function PackageData(a) {
    Object.assign(this, JSON.parse(a));
}
PackageData.prototype = Object.create(null);

var $pathname = Symbol(":pathname");
var $updateme = Symbol("/update");
var $isloaded = Symbol(":loaded");
var $promised = Symbol(":promised");
var $geturl = Symbol("/getme");
var $buffered = Symbol(":buffer");
var $mtime = Symbol(":mtime");
var $rebuild = Symbol("/rebuild");
var $limit = Symbol(":limit");
var $root = Symbol(":rootpath");
var $linked = Symbol(":linked");
var $checklink = Symbol("/linked");
var $getbuffer = Symbol("/buffer");
function Directory(pathname, rebuild, limit) {
    this[$rebuild] = rebuild;
    this[$limit] = limit;
    this[$pathname] = pathname;
}
Directory.prototype = Object.create(null);
Directory.prototype[$updateme] = async function (updateonly) {
    var that = this;
    var files = await readdir(that[$pathname]);
    var map = {}, changed = {};
    var limit = that[$limit];
    var rebuild = that[$rebuild];
    var pathname = that[$pathname];
    var updated = false;
    var rest = [];
    for (var f of files) {
        map[f.name] = true;
        if (!that[f.name]) {
            updated = true;
            var p = path.join(pathname, f.name);
            var file = that[f.name] = f.isFile() ? new File(p, rebuild, limit) : new Directory(p, rebuild, limit);
            var key = f.name.replace(/\.\w+$/, '');
            changed[key] = true;
            file[$root] = that[$root] || pathname;
        }
        if (/\-/.test(f.name)) {
            rest.push(f);
        }
    }
    for (var f of rest) {
        var newName = f.name.replace(/\-([\s\S])/g, (_, a) => a.toUpperCase());
        if (!map[newName]) {
            map[newName] = true;
            that[newName] = that[f.name];
        }
    }

    for (var k in that) {
        var o = that[k];
        if (o instanceof Directory || o instanceof File) {
            if (!map[k]) {
                delete that[k];
                var key = k.replace(/\.\w+$/, '');
                changed[key] = true;
                updated = true;
            }
        }
    }
    for (var k in that) {
        var key = k.replace(/\.\w+$/, '');
        var o = that[k];
        if (changed[key]) {
            if (o instanceof File && o[$buffered]) {
                delete o[$buffered];
                delete o[$promised];
                delete o[$mtime];
            }
        } else if (updateonly) {
            var file = that[k];
            if (file instanceof File && file[$buffered]) {
                file[$promised] = file[$updateme]();
            }
            else {
                if (file[$isloaded]) {
                    file[$promised] = file[$updateme](updateonly);
                    await file[$promised];
                }
            }
        }
    }
    if (updated && that[$isloaded]) fireUpdate();
    that[$isloaded] = true;
};
Directory.prototype[$geturl] = function (url) {
    var that = this;
    if (!that[$promised]) that[$promised] = that[$updateme]();
    var reload = function () {
        return that[$geturl](url);
    };
    if (!that[$isloaded]) {
        return that[$promised].then(reload);
    }
    var keeys = url.split(/[\\\/]+/);
    var temps = [that];
    var keypath = [''];
    var temp = that;
    search: for (var cx = 0, dx = keeys.length; cx < dx; cx++) {
        var key = keeys[cx];
        if (key === '' || key === '.') continue;
        if (!(key in temp)) {
            let k = key.replace(matcherReg, replaceCase);
            if (k in temp) {
                key = k;
            }
        }
        if (!(key in temp)) {
            if (!that[$limit]) {
                temp = undefined;
                break;
            }
            for (var cy = temps.length - 1; cy >= 0; cy--) {
                if (key in temps[cy]) {
                    let searched = temps[cy][$geturl](keeys.slice(cx).join("/"));
                    if (searched instanceof Promise) {
                        return searched.then(reload);
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
        temp = temp[key];
        if (!temp) break;
        if (temp instanceof Directory) {

            if (!temp[$promised]) temp[$promised] = temp[$updateme]();
            if (!temp[$isloaded]) return temp[$promised].then(reload);
            if (temp[$buffered]) break;
        }
    }
    if (temp instanceof File) {
        temp = temp[$getbuffer]();
    }
    else if (temp instanceof Directory && temp[$buffered]) {
        temp = temp[$buffered];
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

var fireUpdate = lazy(function () {
    for (var cx = 0, dx = _reload_handlers.length; cx < dx; cx++) {
        var a = _reload_handlers[cx];
        a();
    }
    var reload = require("../message").reload;
    if (isFunction(reload)) reload();
}, 60);


function File(pathname, rebuild, limit) {
    this[$pathname] = pathname;
    this[$limit] = limit;
    this[$rebuild] = rebuild;
}
File.prototype = Object.create(null);
File.prototype[$checklink] = async function () {
    var that = this;
    var linked = that[$linked];
    if (!linked || !linked.length || !that[$mtime]) return true;
    var mtime = 0;
    for (var cx = 0, dx = linked.length; cx < dx; cx++) {
        var stat = await statFile(linked[cx]);
        if (stat instanceof fs.Stats) {
            mtime += +stat.mtime;
        }
        if (linked !== that[$linked]) return true;
    }
    if (!linked[$mtime]) {
        linked[$mtime] = mtime;
        return true;
    }
    if (mtime !== linked[$mtime]) {
        linked[$mtime] = mtime
        return false;
    }
    return true;
};
File.prototype[$getbuffer] = function () {
    var that = this;
    if (that[$buffered]) return that[$buffered];
    if (that[$promised]) return that[$promised];
    return that[$promised] = that[$updateme]();
};
File.prototype[$updateme] = async function () {
    var that = this;
    var stats = await statFile(that[$pathname]);
    if (!(stats instanceof fs.Stats)) {
        return that[$buffered] = stats;
    }
    if (+stats.mtime === that[$mtime]) {
        if (await that[$checklink]()) {
            return that[$buffered];
        }
    }
    that[$mtime] = +stats.mtime;
    if (that[$buffered]) that[$buffered] = null, fireUpdate();

    var buffer = await getfileAsync(that[$pathname], that[$limit], stats);
    if (that[$rebuild] instanceof Function && buffer instanceof Buffer) {
        var url = path.relative(that[$root], that[$pathname]);
        url = url.replace(/\.(\w+)$/, '');
        try {
            var linked = that[$linked] = [];
            buffer = await that[$rebuild](buffer, url, that[$pathname], that[$linked]);
            if (linked.length) await that[$checklink]();
        } catch (e) {
            buffer = e;
            console.log(e);
            console.error("编译错误:", that[$pathname]);
        }
    }
    if (typeof buffer === "string") buffer = Buffer.from(buffer);
    if (buffer instanceof Buffer) buffer.stat = stats;
    var extend = String(that[$pathname]).match(/\.([^\.]*)$/);
    if (extend) {
        buffer.mime = mimes[extend[1]];
        if (!buffer.mime && /^(asp|php|jsp)$/i.test(extend[1])) {
            if (/^\s*\<\!/.test(buffer)) buffer.mime = 'text/html;charset=utf-8';
        }
    }

    return that[$buffered] = buffer;
};

/**
 * 根椐filesroot路径设置文件缓冲
 * @param {string} filesroot 
 */
var cache = function (filesroot, rebuild, buffer_size_limit) {
    var sk = function () {
    };
    filesroot = String(filesroot || '').split(",").map(path.normalize);
    var map = {};
    var treeslist = filesroot.filter(fs.existsSync).map((froot) => {
        var froot = fs.realpathSync(froot);
        if (map[froot]) {
            return;
        }
        map[froot] = true;
        if (fs.existsSync(froot) && fs.statSync(froot).isDirectory()) {
            var roots = new Directory(froot, rebuild, isFinite(buffer_size_limit) && buffer_size_limit >= 0 ? buffer_size_limit | 0 : buffer_size_limit);
            watch(froot, lazy(async function () {
                if (roots[$isloaded]) roots[$promised] = roots[$updateme](true);
                await roots[$promised];
            }, 20), true);
            return roots;
        } else {
            return Object.create(null);
        }
    }).filter(a => !!a);
    map = null;
    var seekerAsync = function (url, extts = "") {
        extts = getExtts(extts);
        if (!Array.isArray(extts)) {
            extts = [extts];
        }
        var findPackage = extts.indexOf(".js") >= 0;
        return new Promise(function (ok, oh) {
            var cy = -1;
            var cx = extts.length;
            var result, matchParent;
            var run = function () {
                if (cx >= extts.length) {
                    cy++;
                    if (cy >= treeslist.length) {
                        if (result === undefined) {
                            if (matchParent) {
                                url = url.replace(/\\/g, '/');
                                if (!/\/$/.test(url)) {
                                    url += '/';
                                    result = url;
                                }
                            }
                        }
                        return ok(result);
                    }
                    cx = 0;
                }
                var tree1 = treeslist[cy];
                var extt = extts[cx];
                var error;
                var promise = tree1[$geturl](url + extt);
                if (promise instanceof Promise) {
                    promise.catch(function (e) {
                        error = e;
                    }).then(function (result) {
                        if (result instanceof Buffer) return ok(result);
                        if (error) oh(error);
                        else run();
                    });
                } else {
                    if (typeof promise === "string" || promise instanceof Buffer || promise instanceof Function) return ok(promise);
                    if (promise instanceof PackageData) return ok(Buffer.from(JSON.stringify(promise)));
                    if (promise instanceof Directory && !result) {
                        if (!findPackage) return ok(promise);
                        var package_file = "package.json";
                        if (package_file in promise) {
                            var file = promise[package_file];
                            if (file instanceof File) {
                                file[$rebuild] = a => a;
                                if (!file[$promised]) file[$promised] = file[$updateme]();
                                if (!file[$buffered]) return file[$promised].then(run, oh);
                                if (file[$buffered] instanceof Buffer) file[$buffered] = new PackageData(file[$buffered]);
                                var package_data = file[$buffered];
                                if (package_data instanceof PackageData && package_data.main) {
                                    var roots = package_data.main.split(/[\/\\]+/).filter(a => a && a !== '.' && !/\:$/.test(a));
                                    if (roots[0] in promise) {
                                        result = path.join(url, roots.join('/')).replace(/\\/g, '/');
                                        return ok(result);
                                    }
                                }
                            }
                        } else {
                            var seek_index = 'index';
                            var index = extts.findIndex(a => seek_index + a in promise);
                            if (~index) {
                                result = path.join(url, seek_index + extts[index]).replace(/\\/g, '/');
                            } else {
                                if (typeof promise === 'string') result = promise;
                            }
                        }
                        matchParent = true;
                    }
                    cx++;
                    run();
                }

            };
            run();
        });
    };
    sk.reset = seekerAsync.reset = function () {
        for (var t of treeslist) {
            delete t[$promised];
        }
    };
    sk.async = seekerAsync;
    return sk;
};
var _reload_handlers = [];
cache.onreload = function (handler) {
    if (handler instanceof Function) _reload_handlers.push(handler);
};
module.exports = cache;