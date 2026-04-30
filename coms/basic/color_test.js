function testRotate() {
    var c = "#999933";
    for (var cx = 0, dx = 360; cx < dx; cx++) {
        var r = cx / dx * Math.PI * 2;
        var c1 = color.rotate(c, r);
        var t1 = color.angle(c, c1);
        var c2 = color.rotate(c, t1);
        var t = color.angle(c, c1);
        if (c1 !== c2) {
            console.log(c1, c2, t);
        }
    }
}
function testConvert(to, from) {
    for (var cx = 0, dx = 0xffffff; cx < dx; cx++) {
        var r = cx & 0xff, g = cx >> 8 & 0xff, b = cx >> 16 & 0xff;
        var rgb1 = [r, g, b];
        var [c, v, t] = to.length === 1 ? to(rgb1) : to(r, g, b);
        var [r, g, b] = from.length === 1 ? from([c, v, t]) : from(c, v, t);
        var rgb2 = [r, g, b];
        if (cx === 0x0000ff) console.log("纯红色", c, v, t);
        if (cx === 0x00ff00) console.log("纯绿色", c, v, t);
        if (cx === 0xff0000) console.log("纯蓝色", c, v, t);
        if (!assert(rgb1, rgb2)) {
            console.log(rgb1, rgb2, c, v, t);
            break;
        }
    }
}
// testConvert(color.rgb2hsl, color.hsl2rgb);
testConvert(color.lch4rgb, color.rgb4lch);
// testConvert(color.lab4rgb, color.rgb4lab);
console.log(Matrix.cross3([1, 1, 1], [1, 1, 0]))