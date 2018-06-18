"use strict";
var fs = require("fs");
var path = require("path");

var mkkingTree = {};
var mkdir = function (dir, then) {
    if (mkkingTree[dir]) return mkkingTree[dir].push(then);
    else mkkingTree[dir] = [then];
    fs.mkdir(dir, function (error) {
        setTimeout(function () {
            var thens = mkkingTree[dir];
            thens && thens.forEach(e => e(error));
        }, 10);
    });
};
var deepwr = function (dir, data) {
    console.info(dir);
    var dirname = path.dirname(dir);
    var paths = [];
    return new Promise(function (ok, oh) {
        var detect = function () {
            fs.exists(dirname, function (exists) {
                if (exists) {
                    if (!paths.length) {
                        fs.writeFile(dir, data, function (err) {
                            if (err) return oh(err);
                            else ok();
                        });
                    } else {
                        dirname = path.join(dirname, paths.shift());
                        mkdir(dirname, function (err) {
                            if (err) return oh(err);
                            else detect();
                        });
                    }
                } else {
                    if (dirname === ".") return oh();
                    paths.unshift(path.basename(dirname));
                    dirname = path.dirname(dirname);
                    detect();
                }
            });
        };
        detect();
    });
}
function write(responseTree, public_path) {
    var promises = Object.values(responseTree).map(({ destpath, data }) => deepwr(path.join(public_path, destpath), data))
    return Promise.all(promises);
}
module.exports = write;