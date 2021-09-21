var fs = require("fs");
function main(filepath) {
    var f = enrich({
        size: 2 * 1024 * 1024,
        offset: 0,
        filepath,
        open(flag) {
            var that = f;
            this.offset = 0;
            return new Promise(function (ok, oh) {
                fs.open(that.filepath, flag, function (error, h) {
                    if (error) {
                        return oh(error);
                    }
                    ok(that.fd = h);
                })
            });
        },
        read(size = f.size, offset = f.offset) {
            var that = f;
            var buff = Buffer.alloc(size);
            return new Promise(function (ok, oh) {
                fs.read(that.fd, buff, 0, size, offset, function (error, byte, buff) {
                    if (error) {
                        return oh(error);
                    }
                    f.offset = offset + byte;
                    if (byte < buff.length) {
                        buff = buff.slice(0, byte);
                    }
                    ok(that.buff = buff);
                });
            });
        },
        write(buff = f.buff, offset = f.offset) {
            var that = f;
            return new Promise(function (ok, oh) {
                fs.write(that.fd, buff, 0, buff.length, offset, function (error, byte) {
                    if (error) {
                        return oh(error);
                    }
                    f.offset = offset + byte;
                    ok(byte);
                });
            });
        },
        close() {
            var that = f;
            return new Promise(function (ok, oh) {
                fs.close(that.fd, function (err) {
                    if (err) {
                        return oh(err);
                    }
                    ok();
                });
            })
        },
        writeSync(buff, offset) {
            return this.open('w').write(buff, offset).close();
        },
        rmdir(){
            return new Promise(function (ok, oh) {
                fs.rmdir(filepath, function (err) {
                    if (err) return oh(err);
                    else ok();
                });
            });
        },
        unlink() {
            return new Promise(function (ok, oh) {
                fs.unlink(filepath, function (err) {
                    if (err) return oh(err);
                    else ok();
                });
            });
        }

    });
    return f;
}