var singerPhotosMap = Object.create(null);
await data.from("efront-singer", function (a) {
    a.forEach(a => {
        var b = a.replace(/\.\w+$/, '');
        singerPhotosMap[b] = a;
    })
});
var parseFileName = function (b) {
    var [name, singer] = String(b).replace(/\.\w+$/, '')
        .replace(/^\s*\d+[\s\.,\-]+(\S+)($|\W\s*\-)/, "$1$2")
        .replace(/^\s*\d+[\.]+\s*([\s\S]+)/, "$1")
        .replace(/^\s*\d+\s+(\W+)/, "$1")
        .split(/\s-\s/);

    if (!singer) {
        var m = /\s+(\S+)\s*$/.exec(name);
        if (m) {
            var s = /^([\W\s]+\W)\s+/.exec(name);
            if (s) {
                singer = name.slice(s[0].length);
                name = s[0];
            }
            else {
                singer = m[1];
                name = name.slice(0, m.index);
            }

        }
    }
    if (!singer) {
        name = name.replace(/[\(（]([^\)）]+)[\)）]/, function (_, m) {
            singer = m;
            return ''
        });
    }
    if (!singer) {
        if (/\W\-\W/.test(name)) {
            [name, singer] = name.split('-');
        }
    }
    if (像中文人名(name) && !像中文人名(singer)) {
        b = singer;
        singer = name;
        name = b;
    }
    return { name, singer };
};
return a => {
    if (isElement(a)) {
        var m = /songsdata\s*=\s*(\[[\s\S]*\])/.exec(a.innerText);
        if (!m) throw new Error(i18n`无法加载数据！`);
        if (m) a = m[1];
        a = JSON.parse(a);
    }
    if (a) return a.map(b => {
        var data = {};

        if (b.data) extend(data, {
            name: b.data.filename.replace(/^[\s\S]*?\s*\-\s*/, ''),
            singer: b.data.filename.replace(/\s*\-\s*[\s\S]*?$/, '')
        }, b.data);
        else if (isObject(b)) extend(data, b);
        if (typeof b === 'string') {
            var { name, singer } = parseFileName(b);
            data.name = name;
            data.singer = singer;
            data.url = "https://efront.cc/song/" + b;
        }
        if (!data.singer) {
            data.singer = data.author_name;
        }
        if (data.name && !data.singer) {
            var { name, singer } = parseFileName(data.name);
            data.name = name;
            data.singer = singer;
        }
        if (!data.name) data.name = data.audio_name;
        if (data.hash) data.hash = data.hash.replace(/^songs\_/i, '');
        if (data.singer) data.singer = formatSingerNames(data.singer);
        if (!data.avatar && data.singer) {
            var singer0 = data.singer.split("、")[0];
            if (singer0 in singerPhotosMap) data.avatar = `https://efront.cc/singer/` + singerPhotosMap[singer0];
        }
        if (!data.singerName) data.singerName = data.singer;
        if (!data.songName) data.songName = data.name;
        return data;
    });

}