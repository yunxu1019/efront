function combgeta(args) {
    if (typeof args[0] === "function") return [args[0], Array.prototype.slice.call(args, 1)];
    if (typeof args[args.length - 1] === "function") return [args[args.length - 1], Array.prototype.slice.call(args, 0, args.length - 1)];
    return [null, args];
}

function getRatiosList(argsList, total) {
    return argsList.map(a => total = total / a.length);
}
function rangeAt(i) {
    if (i < 0 || i > this.length) return;
    var { source, ratios, format } = this;
    var args = source.map(function (a, cx) {
        var index = i / ratios[cx] | 0;
        i = i - index * ratios[cx];
        return a.start + index * a.step;
    });
    if (format) format(args);
    return args;
}
function itemAt(i) {
    if (i < 0 || i > this.length) return;
    var { source, ratios, format } = this;
    var args = source.map(function (a, cx) {
        var index = i / ratios[cx] | 0;
        i = i - index * ratios[cx];
        return a[index];
    });
    if (format) args = format(args);
    return args;
}

class Comb {
    static args = combgeta;
    constructor() {
        var f, args, srcIsRange;
        for (var a of arguments) {
            switch (typeof a) {
                case "boolean": srcIsRange = a; break;
                case "object": args = a; break;
                case "function": f = a; break;
                default: throw new Error(i18n`参数异常: ${a}`);
            }

        }
        this.format = f;
        var total = 1;
        if (srcIsRange) {
            this.source = Array.prototype.map.call(args, a => {
                var [s, e, t = 1] = a;
                var r = (1 + e - s) / t;
                total *= r;
                return { length: r, start: s, end: e, step: t };
            });
            this.get = rangeAt;
        }
        else {
            this.source = Array.prototype.map.call(args, a => {
                total *= a.length;
                return a;
            });
            this.get = itemAt;
        }
        this.ratios = getRatiosList(this.source, total);
        this.length = total;
    }
}
module.exports = Comb;