function encodeurl(src, thumb) {
    if (src instanceof Image) return src;
    if (src.src) return src.src;
    return config.filebase + String(thumb ? src.thumb : src.href).replace(/^\//, '').replace(/\.?[^\.]+$/, function (m) {
        return "!" + user.getPassport() + m;
    });
}