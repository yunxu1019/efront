var fs = require("fs");
var path = require("path");
var process = require("process");

var srcPath = '/data-source/';
var dstPath = '/data/xiaohua/'
var code = process.env.PASSWORD;
var crypt = function (error, files) {
    if (error) return;
    queue.call(function (file) {
        return new Promise(function (ok, oh) {
            var r = fs.createReadStream(path.join(srcPath, file));
            var w = fs.createWriteStream(path.join(dstPath, file));
            var i = 0;
            r.once("error", oh);
            r.on("data", function (chunk) {
                var sign = code.slice(i % code.length, code.length) + code.slice(0, i % code.length);
                var chunk = encode62.encode(chunk, sign);
                i += chunk.length;
                if (i > 1024 * 1024 * 1024) console.info(file, (i / 1024 / 1024 / 1024).toFixed(2), 'GiB');
                if (i > 1024 * 1024) console.info(file, (i / 1024 / 1024).toFixed(2), 'MiB');
                else if (i > 1024) console.info(file, (i / 1024).toFixed(2), 'KiB');
                else console.info(file, i, 'Byte');
                w.write(chunk);
            });
            r.on('end', function () {
                w.end();
                ok();
            });
        })
    }, files);
};
if (!code) {
    throw new Error(i18n`请设置密码`);
}
crypt(null, [
    'photos/05.jpg'
]);
// fs.readdir(srcPath, crypt);
