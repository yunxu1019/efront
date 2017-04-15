var fs = require("fs");
var watch = require("../process/watch");
var filesroot = "./apps";
var path = require("path");
var filescount = 0;
var filessize = 0;
/**
 * 取文件夹
 * @param {string} dir 
 */
var getdir = function (dir) {
    var directory = {};
    fs.readdirSync(path.join(filesroot, dir)).forEach(function (name) {
        directory[name] = false;
    });
    return directory;
};
/**
 * 取文件
 * @param {string} url 
 */
var getfile = function (url) {
    return fs.readFileSync(path.join(filesroot, url));
};
/**
 * 是不是文件夹
 * @param {string} url 
 */
var isdir = function (url) {
    return fs.statSync(path.join(filesroot, url)).isDirectory();
}
/**
 * 取数据
 * @param {string} url 
 */
var seek = function (url) {
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
            var load = loader(curl, temp, key);
            load();
            watch(path.join(filesroot, curl), load);
        }
        temp = temp[key];
    }
    if (!key && (temp instanceof Buffer)) {
        return curl.replace("\\","/");
    }
    if(key && !(temp instanceof Buffer)){
        return curl.replace("\\","/")+"/";
    }
    return temp;
}
var loader = function (curl, temp, key) {
    return function () {
        console.info(curl, "change");
        if (isdir(curl)) {
            if (temp[key]) {
                unwatch(path.join(filesroot, curl), temp[key]);
            }
            temp[key] = getdir(curl);
        } else {
            temp[key] = getfile(curl);
        }
    };
};
var tree = getdir("./");
/**
 * 取消路径监听
 * @param {string} curl 
 * @param {object} temp 
 */
var unwatch = function (curl, temp) {
    for (var k in temp) {
        var cvrl = path.join(curl, temp);
        watch(cvrl);
        unwatch(cvrl, temp[k]);
    }
};
module.exports = seek;