var fs = require("fs");
var fsp = fs.promises;
var path = require("path");
var encodeUTF16 = require("../basic/encodeUTF16");
var encodeLEB128 = require("../basic/encodeLEB128");
var finish = require("../build/finish");
var createInfo = function ([p, size]) {
    var nametype = +!/^[\u0000-\u00ff]*$/.test(p);
    if (nametype) {
        var name = encodeUTF16(p);
    } else {
        var name = p.split("").map(k => k.charCodeAt(0));
    }
    return [(name.length << 1) + +nametype, size, name];
};
async function enpack(readfrom, writeto, type) {
    var handle = writeto;
    if (typeof writeto === 'string') handle = await fsp.open(writeto, 'w');
    var totalSize = 0;
    var distSize = 0;
    var queue = [readfrom];
    var files = [];
    var total = 1, index = 0;
    var startTime = new Date;
    while (queue.length) {
        console.info(i18n`正在处理(${++index}/${total}): ${file}`);
        var file = queue.pop();
        var stats = await fsp.stat(file);
        if (stats.isDirectory()) {
            files.push([file, 0]);
            var names = await fsp.readdir(file);
            var list = names.map(n => path.join(file, n));
            var max = 0, maxi = 0;
            for (var cx = 0, dx = list.length; cx < dx; cx++) {
                let fsize = fs.statSync(list[cx]).size;
                if (fsize > max) {
                    max = fsize;
                    maxi = cx;
                }
            }
            list.unshift.apply(list, list.splice(maxi, 1));
            queue.push.apply(queue, list);
            total += list.length;
        }
        else {
            var data = await fsp.readFile(file);
            totalSize += data.length;
            var pressed = encodePack(data, type);
            distSize += pressed.length;
            await handle.write(new Uint8Array(pressed));
            files.push([file, pressed.length + 1]);
        }
    }
    files.forEach(a => a[0] = path.relative(readfrom, a[0]));
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
    totalSize += names.length;
    distSize += names.length;
    console.info(i18n`原始数据大小为${size(totalSize)}，目标文件大小为${size(distSize)}，压缩率为${percent(distSize / totalSize)}\r\n`);
    await handle.write(new Uint8Array(names));
    if (typeof writeto === 'string') await handle.close(), finish(new Date - startTime);
    return distSize;
}
module.exports = enpack;