var split = require("../basic/$split");
function getMaped(refpath, mmap, m) {
    var refs = refpath.slice();
    refs.pop();
    m = m.replace(/\-([\S])/g, (_, a) => a.toUpperCase()).replace(/\.[^\.\\\/]+$/, '');
    var a = split(m);
    for (var cx = 0; cx < a.length; cx++) {
        var b = a[cx];
        switch (b) {
            case "..":
                if (cx > 0) {
                    a.splice(cx - 1, 2);
                    cx -= 2;
                }
                else {
                    a.splice(cx, 1);
                    cx--;
                    refs.pop();
                }
                break;
            case ".":
            case "":
                a.splice(cx, 1);
                cx--;
                break;
        }
    }
    do {
        var rlength = refs.length;
        var tmp = refs.concat(a);
        var r = tmp.join("$");
        if (r in mmap) return mmap[r];
        refs.pop();
    } while (rlength > 0);
    if (m in mmap) {
        var r = mmap[m];
        return r;
    }
}
module.exports = getMaped;