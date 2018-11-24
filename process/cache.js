"use strict";
var fs = require("fs");
var watch = require("../process/watch");
var path = require("path");
var versionTree = {};
/**
 * 取文件夹
 * @param {string} pathname 
 */
var getdir = function (pathname) {
    var directory = {};
    fs.readdirSync(pathname).forEach(function (name) {
        directory[name] = false;
    });
    return directory;
};
var getdirAsync = function (pathname) {
    return new Promise(function (ok, oh) {
        fs.readdir(pathname, function (error, files) {
            if (error) oh(error);
            else {
                var directory = {}
                files.forEach(function (name) {
                    directory[name] = false;
                });
                ok(directory);
            }
        });
    });
};
/**
 * 取文件
 * @param {string} url 
 */
var getfile = function (pathname, buffer_size) {
    if (isFinite(buffer_size) && getVersion(pathname).size > buffer_size)
        return getFileHead(pathname, buffer_size);
    return fs.readFileSync(pathname);
};
var getFileHead = function (pathname, buffer_size) {
    var h = fs.openSync(pathname, "r");
    var chunk = Buffer.alloc(buffer_size);
    var length = fs.readSync(h, chunk, 0, chunk.length, 0);
    if (length < chunk.length) {
        chunk = chunk.slice(0, length);
    }
    chunk.location = pathname;
    fs.closeSync(h);
    return chunk;
};
var getfileAsync = function (pathname, buffer_size) {
    if (isFinite(buffer_size) && getVersion(pathname).size > buffer_size)
        return getFileHeadAsync(pathname, buffer_size);
    return new Promise(function (ok, oh) {
        fs.readFile(pathname, function (error, data) {
            if (error) oh(error);
            else ok(data);
        });
    });
};
var getFileHeadAsync = function (pathname, buffer_size) {
    return new Promise(function (ok, oh) {
        fs.open(pathname, "r", function (err, h) {
            if (err) {
                return oh(err);
            }
            var chunk = Buffer.alloc(buffer_size);
            fs.read(h, chunk, 0, chunk.length, 0, function (err, length, chunk) {
                if (err) return oh(err);
                if (length < chunk.length) {
                    chunk = chunk.slice(0, length);
                }
                chunk.location = pathname;
                fs.close(h, function (error) {
                    if (error) return oh(error);
                    ok(chunk);
                })
            });
        });
    });
};
/**
 * 是不是文件夹
 * @param {string} url 
 */
var isdir = function (pathname) {
    var stat = fs.statSync(pathname);
    if (stat.isDirectory()) return true;
    else return versionTree[pathname] = stat, false;
};

var isdirAsync = function (pathname) {
    return new Promise(function (ok, oh) {
        fs.stat(pathname, function (error, stats) {
            if (error) oh(error);
            else if (stats.isDirectory()) ok(true);
            else {
                versionTree[pathname] = stats;
                ok(false);
            }
        });
    });
};

var getVersion = function (pathname) {
    return versionTree[pathname];
};
/**
 * 加载器
 * @param {string} curl 
 * @param {object} temp 
 * @param {string} key 
 * @param {function} rebuild 
 */
var loader = function (curl, temp, key, rebuild) {
    var root = String(this);
    var buffer_size = this.buffer_size;
    var durl = path.resolve(root, curl);
    var durls = [durl];
    var load = function (loadType) {
        var is_reload = loadType === "change";
        console.info(root, curl, is_reload ? "change" : "load");
        var pathname = path.join(root, curl);
        if (isdir(pathname)) {
            if (temp[key]) {
                unwatch(pathname, temp[key]);
            }
            temp[key] = getdir(pathname);
        } else {
            var data = getfile(pathname, buffer_size);
            try {
                if (rebuild instanceof Function) {
                    data = rebuild(data, key, durl, is_reload ? [] : durls);
                }
                if (data instanceof Promise) {
                    data.then(function (data) {
                        if (typeof data === "string") {
                            data = Buffer.from(data);
                        }
                        temp[key] = data;
                    })
                }
                if (typeof data === "string") {
                    data = Buffer.from(data);
                }
            } catch (e) {
                console.warn("Build Faild:", curl, e);
                data = e;
            }
            temp[key] = data;
        }
        is_reload && _reload_handlers.forEach(run => run());
    };
    load();
    durls.forEach(curl => watch(curl, load));
    return load;
};

var asyncLoader = function (curl, temp, key, rebuild) {
    var root = String(this);
    var buffer_size = this.buffer_size;
    var durl = path.resolve(root, curl);
    var durls = [durl];
    var load = function (loadType) {
        var is_reload = loadType === "change";
        console.info(root, curl, is_reload ? "change" : "load");
        var pathname = path.join(root, curl);
        temp[key] = isdirAsync(pathname).then(function (isdir) {
            if (isdir) {
                if (temp[key]) {
                    unwatch(pathname, temp[key]);
                }
                temp[key] = getdirAsync(pathname).then(function (dirs) {
                    temp[key] = dirs;
                    is_reload && _reload_handlers.forEach(run => run());
                }).catch(function (error) {
                    temp[key] = error;
                });
            } else {
                temp[key] = getfileAsync(pathname, buffer_size).then(function (data) {
                    try {
                        if (rebuild instanceof Function) {
                            data = rebuild(data, key, durl, is_reload ? [] : durls);
                        }
                    } catch (e) {
                        console.warn("Build Faild:", curl, e);
                        data = e;
                    };
                    return data;
                }).then(function (data) {
                    is_reload && _reload_handlers.forEach(run => run());
                    if (typeof data === "string") {
                        data = Buffer.from(data);
                    }
                    return temp[key] = data;
                }).catch(function (error) {
                    temp[key] = error;
                    console.error(error);
                });
            }
        }).catch(function (error) {
            temp[key] = error;
            console.error(error);
        });
    };
    load();
    durls.forEach(curl => watch(curl, load));
    return load;
};
/**
 * 取数据
 * @param {string} url 
 */
var seek = function (url, tree, rebuild) {
    var temp = tree;
    var keeys = url.split(/[\\\/]+/);
    var curl = "";
    var temps = [];
    search: for (var cx = 0, dx = keeys.length; cx < dx; cx++) {
        var key = keeys[cx];
        if (!(key in temp)) {
            for (var cy = temps.length - 1; cy >= 0; cy--) {
                if (key in temps[cy]) {
                    let searched = seek.call(this, keeys.slice(cx).join("/"), temps[cy], rebuild);
                    if (searched != undefined) {
                        temp = searched;
                        break search;
                    }
                }
            }
            continue;
        }
        curl = path.join(curl, key);
        if (temp[key] === false) {
            loader.call(this, curl, temp, key, rebuild);
        }
        temps.push(temp);
        temp = temp[key];
        if (!temp) break;
    }
    if (!(temp instanceof Object)) {
        return temp;
    }
    if (temp instanceof Function) {
        return temp;
    }
    if (key && !(temp instanceof Buffer || temp instanceof Promise)) {
        return curl.replace(/\\+/g, "/") + "/";
    }
    if ((temp instanceof Buffer || temp instanceof Promise) && !temp.stat) {
        temp.stat = getVersion(path.join(String(this), curl));
    }
    return temp;
};
var seekAsync = function (url, tree, rebuild) {
    var temp = tree;
    if (!temp) return new Error('file system error');
    var keeys = url.split(/[\\\/]+/);
    var curl = "";
    var that = this;
    var temps = [];
    var research = function () {
        return seekAsync.call(that, url, tree, rebuild);
    };
    search: for (var cx = 0, dx = keeys.length; cx < dx; cx++) {
        var key = keeys[cx];
        if (!(key in temp)) {
            for (var cy = temps.length - 1; cy >= 0; cy--) {
                if (key in temps[cy]) {
                    let searched = seekAsync.call(that, keeys.slice(cx).join("/"), temps[cy], rebuild);
                    if (searched instanceof Promise) {
                        return searched.then(research);
                    }
                    if (searched !== undefined) {
                        temp = searched;
                        break search;
                    }
                }
            }
            continue;
        }
        curl = path.join(curl, key);
        if (temp[key] === false) {
            asyncLoader.call(that, curl, temp, key, rebuild);
        }
        temps.push(temp);
        temp = temp[key];
        if (temp instanceof Promise) {
            return temp.then(research);
        }
        if (!temp) break;
    }
    if (!(temp instanceof Object)) {
        return temp;
    }
    if (temp instanceof Function) {
        return temp;
    }
    if (temp instanceof Error) {
        return temp;
    }
    if (key && !(temp instanceof Buffer)) {
        return curl.replace(/\\+/g, "/") + "/";
    }
    if (temp instanceof Buffer && !temp.stat) {
        temp.stat = getVersion(path.join(String(this), curl));
    }
    return temp;
};

/**
 * 取消路径监听
 * @param {string} curl 
 * @param {object} temp 
 */
var unwatch = function (curl, temp) {
    if (temp instanceof Object) {
        for (var k in temp) {
            var cvrl = path.join(curl, k);
            watch(cvrl);
            unwatch(cvrl, temp[k]);
        }
    }
};
var getExtts = function (extts) {
    if (extts instanceof Array && extts.length <= 1) extts = extts;
    return extts || "";
};
/**
 * 根椐filesroot路径设置文件缓冲
 * @param {string} filesroot 
 */
var cache = function (filesroot, rebuild, buffer_size_limit) {
    var seeker = function (url, extts) {
        extts = getExtts(extts);
        if (!Array.isArray(extts)) return seek.call(seeker, url + extts, tree, rebuild);

        for (var cx = 0, dx = extts.length; cx < dx; cx++) {
            var result = seek.call(seeker, url + extts[cx], tree, rebuild);
            if (result) return result;
        }
    };
    var tree = fs.existsSync(filesroot) && fs.statSync(filesroot).isDirectory() && getdir(filesroot) || {};
    seeker.toString = function () {
        return filesroot;
    };
    if (isFinite(buffer_size_limit) && buffer_size_limit >= 0) {
        seeker.buffer_size = buffer_size_limit | 0;
    }
    var seekerAsync = function (url, extts = "") {
        extts = getExtts(extts);
        if (!Array.isArray(extts)) return seekAsync.call(seeker, url + extts, tree, rebuild);
        return new Promise(function (ok, oh) {
            var index = 0;
            var run = function () {
                if (index > extts) return ok();
                var extt = extts[index];
                index++;
                var error;
                seekAsync.call(seeker, url + extt, tree, rebuild).catch(function (e) {
                    error = e;
                }).then(function (result) {
                    if (result) return ok(result);
                    if (error) oh(error);
                    else run();
                });
            };
            run();
        });
    };
    seeker.async = seekerAsync;
    seeker.new = cache;
    return seeker;
}
var _reload_handlers = [];
cache.onreload = function (handler) {
    if (handler instanceof Function) _reload_handlers.push(handler);
};
module.exports = cache;