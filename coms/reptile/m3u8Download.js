var URL = require("url");
var path = require("path");
function main(m3u8, dst) {
    function index(a, total) {
        a = String(a);
        return String(total).replace(/\d/g, function (m, index, input) {
            if (index + a.length < input.length) return '0';
            return a[index + a.length - input.length];
        });
    }
    fetch(m3u8).then(function (a) {
        var reg = /^(.*?)\?start=(\d+)&end=.*?$/;
        var downloaded = {};
        var list = a.toString().split(/[\r\n]+/).filter(e => e && !/^#/.test(e)).map(function (name) {
            var match = reg.exec(name);
            if (!match) return;
            var file = match[1];
            if (downloaded[file]) return;
            downloaded[file] = true;
            return file;
        }).filter(a => !!a);
        return queue.call(list, function (file, cx) {
            console.info(file);
            var fileurl = URL.resolve(m3u8, file);
            return fetch(fileurl).then(function (buff) {
                return fs2(path.join(dst, index(cx, list.length) + '.' + file)).writeSync(buff);
            });
        });
    });

}
