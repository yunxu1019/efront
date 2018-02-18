"use strict";
var fs = require("fs");
var watch = require("../process/watch");
var path = require("path");
var versionTree = {};
/**
 * 取文件夹
 * @param {string} dir 
 */
var getdir = function (dir) {
    var directory = {};
    fs.readdirSync(path.join(String(this), dir)).forEach(function (name) {
        directory[name] = false;
    });
    return directory;
};
var getdirAsync = function (dir) {
    var that = this;
    return new Promise(function (ok, oh) {
        fs.readdir(path.join(String(that), dir), function (error, files) {
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
var getfile = function (url) {
    return fs.readFileSync(path.join(String(this), url));
};
var getfileAsync = function (url) {
    var that = this;
    return new Promise(function (ok, oh) {
        fs.readFile(path.join(String(that), url), function (error, data) {
            if (error) oh(error);
            else ok(data);
        });
    });
};
/**
 * 是不是文件夹
 * @param {string} url 
 */
var isdir = function (url) {
    var pathname = path.join(String(this), url);
    var stat = fs.statSync(pathname);
    if (stat.isDirectory()) return true;
    else return versionTree[pathname] = stat, false;
};

var isdirAsync = function (url) {
    var pathname = path.join(String(this), url);
    return new Promise(function (ok, oh) {
        var stat = fs.stat(pathname, function (error, stats) {
            if (error) oh(error);
            else if (stats.isDirectory()) ok(true);
            else {
                versionTree[pathname] = stats;
                ok(false);
            }
        });
    });
};

var getVersion = function (url) {
    var pathname = path.join(String(this), url);
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
    var durl = path.resolve(root, curl);
    var durls = [durl];
    var load = function () {
        console.info(root, curl, "change");
        if (isdir.call(root, curl)) {
            if (temp[key]) {
                unwatch(path.join(root, curl), temp[key]);
            }
            temp[key] = getdir.call(root, curl);
        } else {
            var data = getfile.call(root, curl);
            if (rebuild instanceof Function) {
                data = rebuild(data, key, durl, is_reload ? [] : durls);
            }
            if (!(data instanceof Buffer) && typeof data === "string") {
                data = Buffer.from(data);
            }
            temp[key] = data;
        }
        is_reload && _reload_handlers.forEach(run => run());
    };
    load();
    durls.forEach(curl => watch(curl, load));
    var is_reload = true;
    return load;
};

var asyncLoader = function (curl, temp, key, rebuild) {
    var root = String(this);
    var durl = path.resolve(root, curl);
    var durls = [durl];
    var load = function () {
        console.info(root, curl, "change");
        temp[key] = isdirAsync.call(root, curl).then(function (isdir) {
            if (isdir) {
                if (temp[key]) {
                    unwatch(path.join(root, curl), temp[key]);
                }
                temp[key] = getdirAsync.call(root, curl).then(function (dirs) {
                    temp[key] = dirs;
                    is_reload && _reload_handlers.forEach(run => run());
                }).catch(function (error) {
                    temp[key] = error;
                    console.error(error);
                });
            } else {
                temp[key] = getfileAsync.call(root, curl).then(function (data) {
                    if (rebuild instanceof Function) {
                        data = rebuild(data, key, durl, is_reload ? [] : durls);
                    }
                    if (!(data instanceof Buffer) && typeof data === "string") {
                        data = Buffer.from(data);
                    }
                    is_reload && _reload_handlers.forEach(run => run());
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
    var is_reload = true;
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
    for (var cx = 0, dx = keeys.length; cx < dx; cx++) {
        var key = keeys[cx];
        if (!(key in temp)) {
            continue;
        }
        curl = path.join(curl, key);
        if (temp[key] === false) {
            loader.call(this, curl, temp, key, rebuild);
        }
        temp = temp[key];
    }
    if (temp && !(temp instanceof Object)) {
        return temp;
    }
    if (!key && (temp instanceof Buffer)) {
        return curl.replace(/\\+/g, "/");
    }
    if (key && temp instanceof Function) {
        return temp;
    }
    if (key && !(temp instanceof Buffer)) {
        return curl.replace(/\\+/g, "/") + "/";
    }
    temp.stat = getVersion.call(this, curl);
    return temp;
};
var seekAsync = function (url, tree, rebuild) {
    var temp = tree;
    var keeys = url.split(/[\\\/]+/);
    var curl = "";
    var that = this;
    for (var cx = 0, dx = keeys.length; cx < dx; cx++) {
        var key = keeys[cx];
        if (!(key in temp)) {
            continue;
        }
        curl = path.join(curl, key);
        if (temp[key] === false) {
            asyncLoader.call(that, curl, temp, key, rebuild);
        }
        if (temp[key] instanceof Promise) {
            return temp[key].then(function () {
                return seekAsync.call(that, url, tree, rebuild);
            });
        }
        temp = temp[key];
    }
    if (temp && !(temp instanceof Object)) {
        return temp;
    }
    if (!key && (temp instanceof Buffer)) {
        return curl.replace(/\\+/g, "/");
    }
    if (key && temp instanceof Function) {
        return temp;
    }
    if (temp instanceof Error) {
        return String(temp);
    }
    if (key && !(temp instanceof Buffer)) {
        return curl.replace(/\\+/g, "/") + "/";
    }
    temp.stat = getVersion.call(this, curl);
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
/**
 * 根椐filesroot路径设置文件缓冲
 * @param {string} filesroot 
 */
var cache = function (filesroot, rebuild) {
    var filescount = 0;
    var filessize = 0;
    var tree = getdir.call(filesroot, "./");
    var seeker = function (url) {
        return seek.call(filesroot, url, tree, rebuild);
    };
    var seekerAsync = function (url) {
        return seekAsync.call(filesroot, url, tree, rebuild);
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