function search(seartext, options) {
    if (options instanceof Array) {
        var hasFullmatch = false;
        var a = options.map(o => {
            if (o.name === seartext) hasFullmatch = true;
            var [power, m] = mark.power(o.name, seartext);
            return { power, name: m, value: o.value };
        }).filter(a => a.power > 0);
        a.sort(function (a, b) {
            return b.power - a.power;
        });
        a.hasFullmatch = hasFullmatch;
        return a;
    }
}