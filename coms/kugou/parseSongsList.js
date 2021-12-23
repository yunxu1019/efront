a => {
    if (isElement(a)) {
        var m = /songsdata\s*=\s*(\[[\s\S]*\])/.exec(a.innerText);
        if (!m) throw new Error("无法加载数据！");
        if (m) a = m[1];
        a = JSON.parse(a);
        console.log(a)
    }
    return a.map(b => {
        var data = {};
        if (b.data) extend(data, {
            name: b.data.filename.replace(/^[\s\S]*?\s*\-\s*/, ''),
            singer: b.data.filename.replace(/\s*\-\s*[\s\S]*?$/, '')
        }, b.data);
        else extend(data, b);
        if (!data.singer) {
            data.singer = data.author_name;
        }
        if (!data.name) data.name = data.audio_name;
        if (data.hash) data.hash = data.hash.replace(/^songs\_/i, '');
        return data;
    });

}