function encodeurl(src) {
    if (src instanceof Image) return src;
    if (src.src) return src.src;
    return "http://efront.cc/@/data/xiaohua/photos/" + String(src.href).replace(/^\//, '').replace(/\.?[^\.]+$/, function (m) {
        return "!" + user.getPassport() + m;
    });
}