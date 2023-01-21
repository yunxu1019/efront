"use strict";
var fs = require("fs");
var path = require("path");
var environment = require("./environment");
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
    var values = Object.values(responseTree).filter(a => !!a.destpath);
    if (values.length) console.info("正在写入文件..");
    var PUBLIC_PATH = environment.PUBLIC_PATH;
    if (!/^\.\.|^$/.test(path.relative(public_path, PUBLIC_PATH))) throw new Error("请不要在非发布目录写文件！");
    return queue.call(values, function ({ destpath, data }) {
        if (!/^\.\./.test(path.relative(destpath, PUBLIC_PATH))) throw new Error("请不要将文件写入非发布目录！");
        return deepwr(path.join(public_path, destpath), data);
    });
}
module.exports = write;