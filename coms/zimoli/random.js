function singleRandom(v) {
    if (v instanceof Array) return v[v.length * Math.random() | 0];
    return random(v);
}
var inc = 0;
function singleSource(_, type) {
    switch (type) {
        case "inc":
            return ++inc;
        case "date":
            return random(new Date);
        case "number":

    }
}
function random(source, decimal) {
    if (!source) {
        if (arguments.length > 1) {
            return random(arguments[Math.random() * arguments.length | 0]);
        }
        return source;
    }
    if (isFunction(source)) {
        return source.apply(null, arguments.length > 1 ? [].slice.call(arguments, 1) : [Math.random()]);
    }
    if (typeof source === 'number') {
        return +(Math.random() * source).toFixed(decimal);
    }
    if (typeof source === 'string') {
        if (decimal > 0) {
            var dst = [];
            for (var cx = 0, dx = decimal; cx < dx; cx++) {
                var s = source[Math.random() * source.length | 0];
                dst.push(s);
            }
            return dst.join('');
        }
        return source.replace(/\$\{([\s\S]*?)\}/g, singleSource);
    }
    if (source instanceof Array) {
        if (decimal === undefined || decimal === '') {
            return source.map(singleRandom).join('');
        }
        if (decimal === 0) {
            return random(source[Math.random() * source.length | 0]);
        } else {
            var dst = [];
            for (var cx = 0, dx = decimal > 1 ? decimal : Math.random() * 10 + 50; cx < dx; cx++) {
                dst.push(random(source[source.length * Math.random() | 0]))
            }
            return dst;
        }
    }
    if (source instanceof Date) {
        return new Date(+source + (+decimal || -Math.random() * 24 * 3600 * 1000 * 365 * 80));
    }
    if (typeof source === 'object') {
        var dst = {};
        for (var k in source) {
            var v = source[k];
            dst[k] = v[0] instanceof Object ? random(v, 1) : random(v, 0);
        }
        return dst;
    }
    return source;
}