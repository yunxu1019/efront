"use strict";
var fs = require("fs");
var watch = require("../process/watch");
var path = require("path");
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
/**
 * 取文件
 * @param {string} url 
 */
var getfile = function (url) {
    return fs.readFileSync(path.join(String(this), url));
};
/**
 * 是不是文件夹
 * @param {string} url 
 */
var isdir = function (url) {
    return fs.statSync(path.join(String(this), url)).isDirectory();
}
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
            temp[key] = data;
        }
        is_reload && _reload_handlers.forEach(run => run());
    };
    load();
    durls.forEach(curl=> watch( curl, load));
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
    return temp;
}
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
    seeker.new = cache;
    return seeker;
}
var _reload_handlers = [];
cache.onreload = function (handler) {
    if (handler instanceof Function) _reload_handlers.push(handler);
};
module.exports = cache;