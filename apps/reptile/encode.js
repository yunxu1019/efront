var fs = require("fs");
var path = require("path");
var process = require("process");

var srcPath = '/data/photos/';
var dstPath = '/data-crypted/photos/'
var code = process.env.PASSWORD;
var crypt = function (error, files) {
    if (error) return;
    queue.call(function (file) {
        return new Promise(function (ok, oh) {
            fs.readFile(path.join(srcPath, file), function (error, chunk) {
                if (error) {
                    oh(error);
                    return;
                }
                var chunk = encode62.encode(chunk, code);
                fs.writeFile(path.join(dstPath, file), chunk, function (error) {
                    if (error) {
                        oh(error);
                        return;
                    }
                    ok();
                });
            });
        })
    }, files);
};
if (!code) {
    throw new Error("请设置密码");
}
fs.readdir(srcPath, crypt);
