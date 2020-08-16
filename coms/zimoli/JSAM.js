var convertReg = /^(?:object|function)$/;
var join = function (o) {
    if (typeof o !== "object") return o === undefined ? '' : JSON.stringify(o);
    var pairs = [];
    for (var k in o) {
        pairs.push(k + ':' + o[k]);
    }
    if (o instanceof Array) {
        return `[${pairs.join(',')}]`;
    }
    return `{${pairs.join(',')}}`;
}
function stringify(memery) {
    if (memery === null) return 'null';
    if (memery === undefined) return '';
    if (typeof memery === "bigint") return String(memery);
    if (!convertReg.test(typeof memery)) return JSON.stringify(memery);
    var dist = [memery];
    var rest = [memery];
    var trimed = [memery instanceof Array ? [] : {}];
    var objects = [trimed[0]];
    while (rest.length) {
        var memery = rest.shift();
        var o = objects.shift();
        for (var k in memery) {
            var m = memery[k];
            if (typeof m === 'number' && isNaN(m)) {
                m = null;
            }
            var kindex = dist.indexOf(k);
            if (!~kindex) {
                kindex = dist.length;
                dist.push(k);
                trimed.push(k);
            }
            var index = dist.indexOf(m);
            if (!~index) {
                index = dist.length;
                dist.push(m);
                if (m !== null) {
                    if (convertReg.test(typeof m)) {
                        rest.push(m);
                        var t = m instanceof Array ? [] : {};
                        trimed.push(t);
                        objects.push(t);
                    } else {
                        trimed.push(m);
                    }
                } else {
                    trimed.push(m);
                }
            }
            o[kindex] = index;
        }
    }
    return trimed.map(join).join(',');
}
var create = function (a, dst) {
    if (!a) return;
    var arr = a.split(',');
    for (var cx = 0, dx = arr.length; cx < dx; cx++) {
        var [k, v] = arr[cx].split(':');
        dst[k] = +v;
    }
}
function parse(string) {
    string = String(string);
    var trimed = [];
    var reg1 = /\}/g;
    var reg2 = /\]/g;
    var reg3 = /\\[\s\S]|"/g;
    var reg4 = /,|$/g;
    for (var cx = 0, dx = string.length; cx < dx; cx++) {
        var s = string.charAt(cx);
        var reg = null, o = null;
        switch (s) {
            case ",":
                trimed.push(undefined);
                break;
            case "{":
                reg = reg1;
                o = {};
            case "[":
                o = o || [];
                reg = reg || reg2;
                reg.lastIndex = cx + 1;
                reg.exec(string);
                var index = reg.lastIndex;
                var s = string.slice(cx + 1, index - 1);
                create(s, o);
                trimed.push(o);
                cx = reg.lastIndex;
                break;
            case "\"":
                reg3.lastIndex = cx + 1;
                do {
                    var s = reg3.exec(string);
                } while (s && s.length === 2);
                var index = reg3.lastIndex;
                trimed.push(eval(string.slice(cx, index)));
                cx = reg3.lastIndex;
                break;
            default:
                reg4.lastIndex = cx + 1;
                var match = reg4.exec(string);
                var index = match.index;

                var s = string.slice(cx, index);
                cx = index;
                switch (s) {
                    case "null":
                        s = null;
                        break;
                    case "true":
                        s = true;
                        break;
                    case "false":
                        s = false;
                        break;
                    case "undefined":
                        s = undefined;
                        break;
                    default:
                        if (/^\-?\d+$/.test(s)) {
                            if (s.length > 15) {
                                s = BigInt(s);
                            } else {
                                s = parseInt(s);
                            }
                        } else {
                            s = parseFloat(s);
                        }

                }
                trimed.push(s);

        }
    }
    var dist = [];
    for (var cx = 0, dx = trimed.length; cx < dx; cx++) {
        var o = trimed[cx];
        if (o instanceof Object) {
            dist[cx] = o instanceof Array ? [] : {};
        } else {
            dist[cx] = o;
        }
    }
    for (var cx = 0, dx = dist.length; cx < dx; cx++) {
        var o = trimed[cx];
        if (o instanceof Object) {
            var t = dist[cx];
            for (var k in o) {
                var v = o[k];
                t[dist[k]] = dist[v];
            }
        }
    }
    return dist[0];
}
var JSAM = {
    stringify,
    parse
};