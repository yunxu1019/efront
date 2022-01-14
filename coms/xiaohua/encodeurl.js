function encodeurl(src) {
    if (src instanceof Image) return src;
    return "http://efront.cc/@/data/xiaohua/photos" + String(src.href).replace(/\.?[^\.]+$/, function (m) {
        return "!" + user.getPassport() + m;
    });
}