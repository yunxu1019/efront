function color_test() {
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