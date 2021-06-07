"use strict";
var fs = require("fs");
var watch = require("../efront/watch");
var path = require("path");
var message = require("../message");
var isDevelop = require("../efront/isDevelop");
var versionTree = {};
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
    return getPromiseInQueue(function (ok, oh) {

        fs.readdir(pathname, function (error, files) {
            if (error) oh(error);
            else {
                var directory = {};
                files.forEach(function (name) {
                    directory[name] = false;
                });
                ok(directory);
            }
        });
    });
};
var getfileAsync = function (pathname, buffer_size) {
    if (isFinite(buffer_size) && getVersion(pathname).size > buffer_size)
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


var isdirAsync = function (pathname) {
    return getPromiseInQueue(function (ok, oh) {
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

var asyncLoader = function (curl, temp, key, rebuild) {
    var root = String(this);
    var buffer_size = this.buffer_size;
    var durl = path.resolve(root, curl);
    var durls = [durl];
    var _watch = function (_durls) {
        durls.forEach(durl => watch(durl));
        durls = _durls;
        _durls.forEach(curl => watch(curl, load));
    };
    var pathname = path.join(root, curl);
    var that = this;
    var load = function (loadType) {
        var durls = [durl];
        var is_change = loadType === "change";
        var saved = is_change && temp[key];
        saved = !(saved instanceof Promise || saved instanceof Error) && saved;
        var origin = temp[key];
        var p0 = temp[key] = isdirAsync(pathname).then(function (isdir) {
            if (p0 !== temp[key]) return;
            if (isdir) {
                var p = temp[key] = getdirAsync(pathname).then(function (dirs) {
                    if (p !== temp[key]) return;
                    temp[key] = dirs;
                    if (isDevelop) {
                        is_change = saved && Object.keys(dirs).sort().join(",") !== Object.keys(saved).sort().join(",");
                        if (is_change) message.broadcast('reload');
                    }
                    if (origin) unwatch(pathname, origin);
                    _watch(durls);
                    console.info(root, curl, is_change ? "change" : "load");
                }).catch(function (error) {
                    if (p !== temp[key]) return;
                    if (origin) unwatch(pathname, origin);
                    temp[key] = error;
                    _watch([]);
                });
            } else {
                var p = temp[key] = getfileAsync(pathname, buffer_size).then(function (data) {
                    if (p !== temp[key]) return;
                    try {
                        if (rebuild instanceof Function) {
                            data = rebuild(data, that.getURL(), durl, durls);
                        }
                    } catch (e) {
                        console.warn("Build Faild:", curl, e);
                        data = e;
                    }
                    return data;
                }).then(function (data) {
                    if (p !== temp[key]) return;
                    if (origin) unwatch(pathname, origin);
                    if (typeof data === "string") {
                        data = Buffer.from(data);
                    }
                    temp[key] = data;
                    if (isDevelop) {
                        is_change = saved && (saved instanceof Buffer && Buffer.compare(saved, data) || String(saved) !== String(data));
                        if (is_change) message.broadcast('reload');
                    }
                    console.info(root, curl, is_change ? "change" : "load");
                    _watch(durls);
                }).catch(function (error) {
                    if (p !== temp[key]) return;
                    if (origin) unwatch(pathname, origin);
                    temp[key] = error;
                    console.error(error);
                    _watch([]);
                });
            }
        }).catch(function (error) {
            if (p0 !== temp[key]) return;
            if (origin) unwatch(pathname, origin);
            temp[key] = error;
            console.error(error);
        });
    };
    load();
    return load;
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

var seekAsync = function (url, tree, rebuild) {
    var temp = tree;
    if (!temp) return new Error('file system error');
    var keeys = url.split(/[\\\/]+/);
    var curl = "";
    var that = this;
    var temps = [tree];

    var research = function () {
        return seekAsync.call(that, url, tree, rebuild);
    };
    var keypath = [''];
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
            if (!that.buffer_size) {
                temp = undefined;
                break;
            }
            for (var cy = temps.length - 1; cy >= 0; cy--) {
                if (key in temps[cy]) {
                    let searched = seekAsync.call(that, keeys.slice(cx).join("/"), temps[cy], rebuild);
                    if (searched instanceof Promise) {
                        return searched.then(research);
                    }
                    if (searched !== undefined) {
                        temp = searched;
                        keypath.splice(cy, keypath.length - cy);
                        temps.splice(cy, keypath.length - cy);
                        break search;
                    }
                }
            }
            continue;
        }
        keypath.push(key);
        if (temp[key] === false) {
            asyncLoader.call(that, keypath.slice(1).join('/'), temp, key, rebuild);
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
    var curl = keypath.join('/');
    if ((temp instanceof Buffer) && !temp.stat) {
        temp.stat = getVersion(path.join(String(this), curl));
        temp.name = key;
    }
    if (temps.length) {
        if (keeys.length - temps.length < 2) return temp;
        if (curl.replace(/^\/|\/$/g, '') !== url.replace(/^\/|\/$/g, '')) {
            if (curl.replace(/^[\s\S]*?([^\/]+)\/?$/, "$1") === url.replace(/^[\s\S]*?([^\/]+)\/?$/, "$1")) {
                return curl;
            }
        }
    }
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
function PackageData(a) {
    Object.assign(this, JSON.parse(a));
}
PackageData.prototype = Object.create(null);
/**
 * 根椐filesroot路径设置文件缓冲
 * @param {string} filesroot 
 */
var cache = function (filesroot, rebuild, buffer_size_limit) {
    var sk = function (url, extts) {
    };
    filesroot = filesroot.split(",");
    var tree = filesroot.map((froot, i) => {
        if (fs.existsSync(froot) && fs.statSync(froot).isDirectory()) {
            var roots = getdir(froot);
            watch(froot, function () {
                getdirAsync(froot, function (a) {
                    for (var k in roots) {
                        if (!(k in a)) {
                            delete roots[k];
                            unwatch(path.join(froot, k));
                        }
                    }
                    for (var k in a) {
                        if (!(k in roots)) {
                            roots[k] = false;
                        }
                    }
                    message.broadcast("reload");
                });
            });
            return roots;
        } else {
            return Object.create(null);
        }
    });
    if (isFinite(buffer_size_limit) && buffer_size_limit >= 0) {
        sk.buffer_size = buffer_size_limit | 0;
    }
    var seekerAsync = function (url, extts = "") {
        extts = getExtts(extts);
        if (!Array.isArray(extts)) {
            extts = [extts];
        }
        var findPackage = extts.indexOf(".js") >= 0;
        var seeker = function () { };
        seeker.toString = function () {
            return this;
        }.bind(filesroot[0]);
        seeker.getURL = function () {
            return url;
        };
        seeker.buffer_size = sk.buffer_size;
        return new Promise(function (ok, oh) {
            var cy = 0;
            var cx = 0;
            var result, matchParent;
            var run = function () {
                if (cx >= extts.length) {
                    cy++;
                    if (cy >= tree.length) {
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
                    seeker.toString = function () {
                        return this;
                    }.bind(filesroot[cy]);
                    cx = 0;
                }
                var tree1 = tree[cy];
                var extt = extts[cx];
                var error;
                var promise = seekAsync.call(seeker, url + extt, tree1, rebuild);
                if (promise instanceof Promise) {
                    promise.catch(function (e) {
                        error = e;
                    }).then(function (result) {
                        if (result instanceof Buffer) return ok(result);
                        if (error) oh(error);
                        else run();
                    });
                } else {
                    if (!findPackage || typeof promise === "string" || promise instanceof Buffer || promise instanceof Function) return ok(promise);
                    if (promise instanceof PackageData) return ok(Buffer.from(JSON.stringify(promise)));
                    if (promise instanceof Object && !result) {
                        var package_file = "package.json";
                        if (package_file in promise) {
                            if (promise[package_file] === false) {
                                seekAsync.call(seeker, url + extt + "/" + package_file, tree1, a => new PackageData(String(a))).catch(oh).then(run);
                                return;
                            } else if (promise[package_file] instanceof Buffer) {
                                promise[package_file] = new PackageData(promise[package_file].toString());
                            }
                            var package_data = promise[package_file];
                            if (package_data instanceof PackageData && package_data.main) {
                                var roots = package_data.main.split(/[\/\\]+/).filter(a => a && a !== '.' && !/\:$/.test(a));
                                if (roots[0] in promise) {
                                    result = path.join(url, roots.join('/')).replace(/\\/g, '/');
                                    return ok(result);
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
    sk.async = seekerAsync;
    sk.new = cache;
    return sk;
};
var _reload_handlers = [];
cache.onreload = function (handler) {
    if (handler instanceof Function) _reload_handlers.push(handler);
};
module.exports = cache;