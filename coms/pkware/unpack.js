var fs = require("fs");
var path = require("path");
var decodeUTF16 = require("../basic/decodeUTF16");
var decodeLEB128 = require("../basic/decodeLEB128");
var decodePack = require("../pkware/decodePack");
var finish = require("../build/finish");
var fsp = fs.promises;
/**
 * @param {fs.promises.FileHandle} h
 */
var readbuff = async function (h, offset, length) {
    var buff = new Uint8Array(length);
    var readed = await h.read(buff, 0, length, offset);
    if (readed.bytesRead < buff.length) buff = buff.slice(0, readed.bytesRead);
    return buff;
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
async function unpack(readfrom, writeto) {
    var writeFile = async function (name, data, isFolder, f) {
        console.info(i18n`正在写入 ${name}`);
        var p = path.join(writeto, name);
        var exists = fs.existsSync(p);
        if (exists) {
            var stat = await fsp.stat(p);
            if (stat.isDirectory() ^ isFolder) {
                await fsp.unlink(p);
                exists = false;
            }
        }
        if (isFolder) {
            if (!exists) await fsp.mkdir(p, { recursive: true });
        }
        else {
            await fsp.writeFile(p, new Uint8Array(data));
            if (f) {
                if (f.mtime) await fsp.utimes(p, new Date, f.mtime);
                if (f.mode) await fsp.chmod(p, f.mode);
            }
        }
    };
    var stats = await fsp.stat(readfrom);
    var handle = await fsp.open(readfrom);
    var size = stats.size;
    var startTime = new Date;
    var readout = function (index, size) {
        if (index < 0) index += size;
        return readbuff(handle, index, size);
    }
    var iszip = await unzip.isZip(readout);
    if (iszip) {
        var files = await unzip.readEntries(readout, size);
        for (var f of files) {
            var buffer = await f.readToBuffer();
            if (!f.isFolder()) await writeFile(path.dirname(f.name), buffer, true);
            await writeFile(f.name, buffer, f.isFolder(), f);
        }
    }
    else {
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
            dataoffset += data.length;
            data = decodePack(data);
            await writeFile(name, data, isFolder, data);
        }
    }
    await handle.close();
    finish(new Date - startTime);
}
module.exports = unpack;