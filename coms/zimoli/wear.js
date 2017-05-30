function wear(dst, src) {
    return function (__src) {
        src = __src || src;
        for (var k in src) {
            dst[k] = src[k];
        }
    }
}