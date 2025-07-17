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
    var buff = Buffer.alloc(length);
    var readed = await h.read(buff, 0, length, offset);
    if (readed.bytesRead < buff.length) buff = buff.subarray(0, readed.bytesRead);
    return buff;
};
var readUInt16LE = async function (h, offset) {
    var a = await readbuff(h, offset, 2);
    return a.readUInt16LE(0);
};
var readUInt32LE = async function (h, offset) {
    var a = await readbuff(h, offset, 4);
    return a.readUInt32LE(0);
};
var getPackedEnd = async function (h, size) {
    var a = await readbuff(h, 0, 2);
    if (String(a) !== "MZ") return size;
    var peOffset = await readUInt32LE(h, 0x3c);
    var flag = await readbuff(h, peOffset, 4);
    if (String(flag) !== "PE\0\0") return size;
    var sectionCount = await readUInt16LE(h, peOffset + 6);
    const sizeOfOptionalHeader = await readUInt16LE(h, peOffset + 20);
    const optionalHeaderOffset = peOffset + 4 + 20; // 签名 (4) + FileHeader (20)
    const sectionTable = optionalHeaderOffset + sizeOfOptionalHeader;
    var lastSectionOffset = sectionTable + (sectionCount - 1) * 40;
    var sectionName = await readbuff(h, lastSectionOffset, 8);
    if (String(sectionName) !== ".pack\0\0\0") return size;
    const dataSize = await readUInt32LE(h, lastSectionOffset + 8);
    const lastRawOffset = await readUInt32LE(h, lastSectionOffset + 20);
    return lastRawOffset + dataSize;
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
        size = await getPackedEnd(handle, size);
        var { files, dataoffset, nameoffset } = await readindex(handle, size);
        for (var cx = 0, dx = files.length; cx < dx; cx++) {
            var [nametype, namelength, isFolder, datasize] = files[cx];
            var name = await readbuff(handle, nameoffset, namelength);
            if (+nametype === 1) {
                name = decodeUTF16(name);
            } else {
                name = String(name);
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