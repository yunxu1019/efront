function search(seartext, options, path = "name") {
    if (options instanceof Array) {
        var hasFullmatch = false;
        var a = options.map(o => {
            var name = seek(o, path);
            if (name === seartext) hasFullmatch = true;
            var [power, m] = mark.power(name, seartext);
            return { power, [path]: m, value: o.value, item: o };
        }).filter(a => a.power > 0);
        a.sort(function (a, b) {
            return b.power - a.power;
        });
        a.hasFullmatch = hasFullmatch;
        return a;
    }
}