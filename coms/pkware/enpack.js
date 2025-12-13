var fs = require("fs");
var fsp = fs.promises;
var path = require("path");
var encodeUTF16 = require("../basic/encodeUTF16");
var encodeLEB128 = require("../basic/encodeLEB128");
var memery = require("../efront/memery");
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
async function enpack(readfrom, writeto, type, key, cert) {
    if (!writeto) {
        console.error(i18n`请输入目标路径！`);
        return;
    }
    var getPath = function (fullpath) {
        return path.relative(readfrom, fullpath).replace(/\\/g, '/');
    };
    var isZip = type === -1;
    var handle = writeto;
    if (typeof writeto === 'string') handle = await fsp.open(writeto, 'w');
    var totalSize = 0;
    var distSize = 0;
    var queue = [readfrom];
    var files = [];
    var total = 1, index = 0;
    var startTime = new Date;
    while (queue.length) {
        var file = queue.pop();
        var name = getPath(file);
        console.info(i18n`正在处理(${++index}/${total}): ${name}`);
        var stats = await fsp.stat(file);
        if (stats.isDirectory()) {
            let names = await fsp.readdir(file, { withFileTypes: true });
            names.sort(sortname);
            let list = names.map(n => path.join(file, n.name));
            if (isZip) {
                if (names.length === 0 && name) {
                    var pressed = packZip([], name + "/", distSize);
                    distSize += pressed.length;
                    files.push(pressed.central);
                }
            }
            else files.push([name, 0]);
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
            if (key && cert) {
                var needSign = /\.(dll|exe|sys|scr)$/i.test(file);
                if (needSign) data = await pesign$peSign(data, key, cert);
            }
            totalSize += data.length;
            var pressed = isZip ? packZip(data, name, distSize, stats) : encodePack(data, type);
            await handle.write(pressed);
            var plength = pressed.length;
            if (!isZip) {
                var extra = concatTypedArray([
                    packPiece(mtime_stamp, encodeLEB128([+stats.mtime])),
                    packPiece(access_mode, encodeLEB128([stats.mode])),
                ]);
                plength += extra.length;
                await handle.write(extra);
            };
            distSize += plength;
            files.push(isZip ? pressed.central : [name, plength + 1]);
        }
    }
    if (isZip) var names = packZip.packCentral(files, distSize);
    else {
        var infos = files.map(createInfo);
        var index = [];
        names = infos.map(([length, size, name]) => {
            index.push(length, size);
            return name;
        });
        names = [].concat.apply([], names);
        var a = encodeLEB128(index);
        var b = encodeLEB128([a.length]).reverse();
        names.push.apply(names, a);
        names.push.apply(names, b);
    }
    totalSize += names.length;
    distSize += names.length;
    console.info(i18n`原始数据大小为${size(totalSize)}，目标文件大小为${size(distSize)}，压缩率为${percent(distSize / totalSize)}\r\n`);
    names = new Uint8Array(names);
    await handle.write(names);
    if (typeof writeto === 'string') await handle.close(), finish(new Date - startTime);
    return [distSize, names];
}
module.exports = enpack;