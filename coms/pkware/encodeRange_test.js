function test(size) {
    var source = Array(size);
    for (var cx = 0, dx = source.length; cx < dx; cx++)source[cx] = 32 + Math.random() * 80 | 0;
    var time = new Date;
    var encoded = encodeRange(source);
    var d1 = new Date - time;
    time = new Date;
    var decoded = decodeRange(encoded);
    var d2 = new Date - time;
    for (var cx = 0, dx = size + 1; cx < dx; cx++) {
        if (decoded[cx] !== source[cx]) {
            console.log({
                size,
                source,
                encoded,
                decoded,
                cx,
                scx: source[cx],
                ecx: encoded[cx],
                dcx: decoded[cx],
            })
            throw new Error(i18n`解码异常！`);
        }
    }
    console.log({
        数据大小: source.length,
        压缩后大小: encoded.length,
        编码用时: d1,
        解码用时: d2,
    })
}
test(20);
test(200);
test(1024);
test(2048);
test(20480);
test(204800);
test(2048000);
// test(20480000);
// test(80000000);