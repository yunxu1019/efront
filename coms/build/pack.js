var fs = require("fs");
var path = require("path");
var encodeUTF16 = require("../basic/encodeUTF16");
var encodeLEB128 = require("../basic/encodeLEB128");
var encodePack = require("../basic/encodePack");
var finish = require("./finish");
function pack(readfrom, writeto, type) {
    var createInfo = function ([file, size]) {
        var p = path.relative(readfrom, file);
        var nametype = +!/^[\u0000-\u00ff]*$/.test(p);
        if (nametype) {
            var name = encodeUTF16(p);
        } else {
            var name = p.split("").map(k => k.charCodeAt(0));
        }
        return [(name.length << 1) + +nametype, size, name];
    };
    var handle;
    new Promise(function (ok, oh) {
        var dist = [], queue = [readfrom];
        var total = 1, index = 0;
        var run = function () {
            if (!queue.length) return ok(dist);
            var file = queue.pop();
            console.info(i18n`正在处理(${++index}/${total}): ${file}`);
            fs.stat(file, function (error, stats) {
                if (error) return oh(error);
                if (stats.isDirectory()) {
                    dist.push([file, 0]);
                    fs.readdir(file, function (error, names) {
                        if (error) return oh(error);
                        var list = names.map(n => path.join(file, n));
                        var max = 0, maxi = 0;
                        for (var cx = 0, dx = list.length; cx < dx; cx++) {
                            var size = fs.statSync(list[cx]).size;
                            if (size > max) {
                                max = size;
                                maxi = cx;
                            }
                        }
                        list.unshift.apply(list, list.splice(maxi, 1));
                        queue.push.apply(queue, list);
                        total += list.length;
                        run();
                    });
                } else {
                    fs.readFile(file, function (error, data) {
                        if (error) return oh(error);
                        var pressed = encodePack(data, type);
                        fs.write(handle, new Uint8Array(pressed), function (error) {
                            if (error) return oh(error);
                            dist.push([file, pressed.length + 1]);
                            run();
                        });
                    });
                }
            });
        };
        if (typeof writeto === "string") {
            fs.open(writeto, 'w+', function (error, hd) {
                if (error) return oh(error);
                handle = hd;
                run();
            });
        } else {
            handle = writeto;
            run();
        }
    }).then(function (files) {
        var infos = files.map(createInfo);
        var index = [];
        var names = infos.map(([length, size, name]) => {
            index.push(length, size);
            return name;
        });
        names = [].concat.apply([], names);
        var a = encodeLEB128(index);
        var b = encodeLEB128([a.length]).reverse();
        names.push.apply(names, a);
        names.push.apply(names, b);
        return new Promise(function (ok, oh) {
            fs.write(handle, new Uint8Array(names), function (error) {
                if (error) return oh(error);
                fs.close(handle, function (error) {
                    if (error) return oh(error);
                    ok();
                    finish(new Date - startTime);
                });
            });
        });
    }, console.error);
    var startTime = new Date;
}
module.exports = pack;