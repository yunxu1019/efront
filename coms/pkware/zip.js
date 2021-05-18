// https://pkware.cachefly.net/webdocs/APPNOTE/APPNOTE-6.2.0.txt
var zfile = refilm`
[filelist]{
    flag 4byte
    pkware 2byte
    bitflag 2byte
    method 2byte
    mtime 2byte
    mdate 2byte
    crc 4byte
    size 4byte
    unsize 4byte
    name_length 2byte
    extra_length 2byte
    file_name :name_length
    extra_field :extra_length
    data :size
}
[pathlist]{
    flag 4byte
    pkware int16
    pkunware int16
    deflag int16
    detime int16
    dedate int16
    demethod int16
    mtime int16
    mdate int16
    crc int32
    size int32
    unsize int32
    name_length int16
    extra_length int16
    comment_length int16
    attr_internal int16
    attr_external int32
    header_offset int32
    filename :name_length
    extrafield :extra_length
    comment :comment_length
}
pathend{
    flag 4byte
    diskid int16
    diskstart int16
    dircount in16
    size int32
    dirsize int32
    diroffset int32
    commentsize int16
    comment :commentsize
}
`;

class Zip {
    write = null;
    filelist = [];
    pathlist = [];
    constructor(write) {
        this.write = write;
    }
    halfFile() {
        var f = this.filelist[this.filelist.length = 1];
        if (!f || f.data) return null;
        return f;
    }
    file(pathname, stats, read) {
        if (this.halfFile()) {
            throw new Error("请先添加完上一个文件！");
        }
        this.filelist.push({
            pathname
        });
        if (stats) this.stat(stats);
        if (read) this.data(read);
        return this;
    }
    stat(stats) {
        var file = this.halfFile();
        if (!file) {
            throw new Error("请先设置文件路径！");
        }
        if (file.flag) {
            throw new Error('请不要重复添加文件属性！');
        }
        this.pack();
        var date = stats.mtime;
        var data = {
            flag: 0x504b0304,
            pkware: 0,
            bitflag: 0,
            method: 0,
            mtime: (date.getUTCHours() << 11) + (date.getUTCMinutes() << 5) + (date.getUTCSeconds() >> 1),
            mdate: (date.getFullYear() - 1980 << 9) + (date.getUTCMonth() + 1 << 5) + (date.getUTCDate()),
            crc: 0,
            size: stats.size,
            unsize: stats.size,
            name_length: Buffer.from(pathname).length,
            extra_length: 0,
            file_name: Buffer.from(pathname),
            extra_field: 0,
        };
        if (data.mdate > 65535) {
            console.warn("无法存储" + date.getFullYear() + "年的文件修改时间")
        }
        extend(file, date);
        return this;
    }
    data(buff) {
        var file = this.halfFile();
        if (!file || !file.flag) {
            throw new Error("请先设置文件名和文件属性");
        }
        var piece = 64 * 1024 * 1024;
        var rest = data.size % piece;
        var buff = await buff(0, rest);
        var c = crc(buff);
        for (var cx = 0, dx = data.size - rest; cx < dx; cx += piece) {
            var buff = await buff(cx, cx + piece);
            c = crc(buff, c);
        }
        data.crc = c;
        return this;
    }
    pack() {
        var f = this.halfFile();
        if (!f) throw new Error("当前没有文件！");
    }
    finish(){

    }
}
module.exports = Zip;