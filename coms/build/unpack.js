var fs = require("fs");
var path = require("path");
var decodeUTF16 = require("../basic/decodeUTF16");
var decodeLEB128 = require("../basic/decodeLEB128");
var decodePack = require("../basic/decodePack");
var finish = require("./finish");
var readbuff = function (h, offset, length) {
    var buff = new Uint8Array(length);
    return new Promise(function (ok, oh) {
        fs.read(h, buff, 0, length, offset, function (error, readed, buff) {
            if (error) return oh(error);
            if (readed < buff.length) buff = buff.slice(0, readed);
            ok(buff);
        });
    });
};
var readindex = async function (h, end) {
    var buff = await readbuff(h, end - 8, 8);
    var sum = 0, ratio = 0;
    for (var cx = buff.length - 1; cx >= 0; cx--) {
        var b = buff[cx];
        sum += ((b & 0b01111111) << ratio);
        ratio += 7;
        if (!(b >> 7)) break;
    }
    var offset = end - 8 + cx - sum;
    var namebuff = await readbuff(h, offset, sum);
    var namelist = decodeLEB128(namebuff);
    var nametotal = 0, datatotal = 0;
    var infos = [];
    for (var cx = 0, dx = namelist.length; cx < dx; cx += 2) {
        var namelength = namelist[cx];
        var datasize = namelist[cx + 1];
        var nametype = namelength & 1;
        namelength = namelength >> 1;
        var isFolder = datasize === 0;
        if (datasize > 0) datasize--;
        nametotal += namelength;
        datatotal += datasize;
        infos.push([nametype, namelength, isFolder, datasize]);
    }
    offset -= nametotal;
    return {
        files: infos,
        nameoffset: offset,
        dataoffset: offset - datatotal,
        namesize: nametotal,
        datasize: datatotal
    };
};
function pack(readfrom, writeto) {
    var writeFile = function (name, data, isFolder) {
        var p = path.join(writeto, name);
        return new Promise(function (ok, oh) {
            if (isFolder) {
                if (fs.existsSync(p)) return ok();
                fs.mkdir(p, { recursive: true }, function (error) {
                    if (error) return oh(error);
                    ok();
                })
            } else {
                data = decodePack(data);
                fs.writeFile(p, new Uint8Array(data), function (error) {
                    if (error) return oh(error);
                    ok();
                });
            }
        });
    };
    var handle, size;
    var startTime = new Date;
    new Promise(function (ok, oh) {
        var run = async function (error, hd) {
            if (error) return oh(error);
            handle = hd;
            var { files, dataoffset, nameoffset } = await readindex(handle, size);
            for (var cx = 0, dx = files.length; cx < dx; cx++) {
                var [nametype, namelength, isFolder, datasize] = files[cx];
                var name = await readbuff(handle, nameoffset, namelength);
                if (+nametype === 1) {
                    name = decodeUTF16(name);
                } else {
                    name = String.fromCharCode.apply(null, name);
                }
                nameoffset += namelength;
                var data = await readbuff(handle, dataoffset, datasize);
                console.info(i18n`正在写入 ${name}`);
                dataoffset += data.length;
                await writeFile(name, data, isFolder);
            }
            ok();
        }
        fs.stat(readfrom, function (error, stats) {
            if (error) return oh(error);
            size = stats.size;
            fs.open(readfrom, 'r+', run);
        });
    }).then(function () {
        finish(new Date - startTime);
    }, console.error);
}
module.exports = pack;