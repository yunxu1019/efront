var { SCOPED, EXPRESS, replace } = require("./common");

var patchObject = function (code, objs) {
    var rest = [code];
    var m = null;
    while (rest.length) {
        var code = rest.pop();
        for (var c of code) {
            if (c.type === SCOPED) {
                rest.push(c);
                continue;
            }
            if (c.type === EXPRESS) {
                if (m = /^#\\(\d+)$/.exec(c.text)) {
                    var o = cloneNode(objs[+m[1]]);
                    if (o instanceof Array) replace(c, ...o);
                    else replace(c, o);
                }
            }
        }
    }
}
function rescan(strs, ...args) {
    var dist = [];
    var i = 0;
    for (var s of strs) {
        dist.push(s, '#\\' + i++);
    }
    if (i > args.length) dist.pop();
    dist = scanner2(dist.join(' '));
    patchObject(dist, args);
    return dist;
}