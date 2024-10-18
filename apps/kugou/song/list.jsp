<script serverside>
    var fs = require("fs").promises;
    var names = await fs.readdir(__dirname);
    var namesMap = Object.create(null);
    names.filter(a => /\.[gkl]rc$/i.test(a)).forEach(a => {
        var k = a.replace(/\.\w+$/, '');
        if (k in namesMap) {
            if (!/^lrc$/i.test(namesMap[k])) return;
        }
        namesMap[k] = a.slice(k.length + 1);
    });
    names = names.filter(a => /\.(flac|mp3|wav)$/i.test(a));
    names = names.map(n => {
        var k = n.replace(/\.\w+$/i, '');
        var m = namesMap[k];
        if (m) n += '#' + m;
        return n;
    });
    return JSON.stringify(names);
</script>