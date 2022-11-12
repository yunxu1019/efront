"use strict";
var fs = require("fs");
var path = require("path");

var mkkingTree = {};
var mkdir = function (dir, then) {
    if (mkkingTree[dir]) return mkkingTree[dir].push(then);
    else mkkingTree[dir] = [then];
    var done = function (error) {
        var thens = mkkingTree[dir];
        delete mkkingTree[dir];
        thens && thens.forEach(e => e(error));
    }
    if (fs.existsSync(dir)) done();
    else fs.mkdir(dir, done);
};
var deepwr = function (dir, data) {
    var dirname = path.dirname(dir);
    var paths = [];
    return new Promise(function (ok, oh) {
        var detect = function () {
            if (fs.existsSync(dirname)) {
                if (!paths.length) {
                    if (fs.existsSync(dir)) fs.unlinkSync(dir);
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
        };
        detect();
    });
}
function write(responseTree, public_path) {
    var values = Object.values(responseTree);
    var promises = values.map(({ destpath, data }) => deepwr(path.join(public_path, destpath), data))
    return Promise.all(promises);
}
module.exports = write;