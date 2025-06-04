var split = require("../basic/$split");
function getMaped(refpath, mmap, m) {
    var refs = refpath.slice();
    refs.pop();
    var a = split(m);
    for (var cx = 0; cx < a.length; cx++) switch (a[cx]) {
        case "..":
            if (cx > 0) {
                a.splice(cx - 1, 2);
                cx -= 2;
            }
            else {
                refs.pop();
            }
            break;
        case ".":
        case "":
            a.splice(cx, 1);
            cx--;
            break;
    }
    while (refs.length) {
        var tmp = refs.concat(a);
        var r = tmp.join("$");
        if (r in mmap) {
            r = mmap[r];
            return r;
        }
        refs.pop();
    }
    if (m in mmap) {
        var r = mmap[m];
        return r;
    }
}
module.exports = getMaped;