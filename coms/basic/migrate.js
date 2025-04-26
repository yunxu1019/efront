// 将数据复制到目标对象，保持目标节点对应节点的对象不变
var allsrc, alldst;
var migrate = function (dst, src) {
    var cap;
    var i = allsrc.indexOf(src);
    if (i >= 0) dst = alldst[i];
    else if (isArray(src)) {
        if (!isArray(dst)) dst = [];
        alldst.push(dst);
        allsrc.push(src);
        cap = dst.splice(0, dst.length);
        for (var cx = 0, dx = src.length; cx < dx; cx++) {
            var s = src[cx];
            var d = cap[cx];
            dst[cx] = migrate(d, s);
        }
    }
    else if (isObject(src)) {
        if (!isObject(dst)) dst = {};
        alldst.push(dst);
        allsrc.push(src);
        cap = {};
        for (var k in dst) {
            cap[k] = dst[k];
        }
        for (var k in cap) delete dst[k];
        for (var k in src) {
            var s = src[k];
            var d = cap[k];
            dst[k] = migrate(d, s);
        }
    }
    else dst = src;
    return dst;
}
return function (dst, src) {
    allsrc = [];
    alldst = [];
    dst = migrate(dst, src);
    allsrc = null;
    alldst = null;
    return dst;
}