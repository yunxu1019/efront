var folder = `https://1251953721.vod2.myqcloud.com/0ec02e46vodcq1251953721/58bc20c45285890788978341757/`;
var m3u8 = folder + `playlist.m3u8`;
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
        return fetch(folder + file).then(function (buff) {
            return fs('/data/' + index(cx, list.length) + '.' + file).writeSync(buff);
        });
    });
});
