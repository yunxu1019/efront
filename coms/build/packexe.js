var fs = require("fs");
var pack = require("./pack");
var memery = require("../efront/memery");
var exepath = require("path").join(__dirname, "../../data/packexe-setup.sfx");
var createUTF16Buffer = function (str) {
    var dest = [];
    for (var s of str) {
        s = encodeUTF16(s, false);
        dest.push.apply(dest, s);
    }
    return Buffer.from(new Uint8Array(dest));
}
/**
 * @param {Buffer} sfxdata
 */
var replaceTitle = function (sfxdata, TITLE) {
    if (!TITLE) return sfxdata;
    var path = require("path");
    TITLE = path.basename(TITLE).replace(/\.[^\.]+$/, '');
    TITLE = TITLE.replace(/\-win32\-(ia32|x\d+)/ig, '$1');
    var title = TITLE.replace(/\(?\s*\-?\s*?(\d+(位|bit|)|x\d+|ia\d+)\)?$/, '');
    var bit = TITLE.slice(title.length);
    var name = title.replace(/安装程序$/, '');
    var title = name + "安装程序" + bit;
    var namedata = createUTF16Buffer(name);
    var titledata = createUTF16Buffer(title);
    var i = sfxdata.indexOf(createUTF16Buffer('白前安装程序'));
    var j = sfxdata.indexOf(createUTF16Buffer('白前'), i + 2);
    if (/32/.test(bit)) {
        var k = sfxdata.indexOf(createUTF16Buffer("ProgramW6432"));
        if (k < 0) throw new Error("主程序错误，缺少ProgramW6432");
        createUTF16Buffer("ProgramFiles").copy(sfxdata, k);
    }
    if (i < 0) throw new Error("主程序错误，未检测到标题！");
    if (j < 0) throw new Error("主程序错误，未发现软件名！");
    if (namedata.length < 12) {
        namedata = Buffer.concat([namedata, new Uint8Array(12 - namedata.length)])
    }
    if (titledata.length < 12) {
        titledata = Buffer.concat([titledata, new Uint8Array(12 - titledata.length)]);
    }
    if (titledata.length > 32 || namedata.length > 32) {
        throw new Error("标题过长！");
    }
    titledata.copy(sfxdata, i);
    namedata.copy(sfxdata, j);
    return sfxdata;
}
function packexe(readfrom, writeto) {
    fs.open(writeto, 'w+', function (error, hd) {
        if (error) return console.error(error);
        fs.readFile(exepath, function (error, data) {
            if (error) return console.error(error);
            if ((data[data.length - 4] | data[data.length - 3] | data[data.length - 2] | data[data.length - 1]) !== 0) {
                data = Buffer.concat(data, new Uint8Array(4));
            }
            var title = memery.TITLE || writeto;
            replaceTitle(data, title);
            fs.write(hd, data, function (error) {
                if (error) return console.error(error);
                pack(readfrom, hd, 1);
            });
        });
    });
}
module.exports = packexe;