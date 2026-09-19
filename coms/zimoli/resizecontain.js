function contain(imageChild, container, set = true) {
    var w = imageChild.offsetWidth;
    var h = imageChild.offsetHeight;
    var w1 = container.clientWidth || container.innerWidth || container.height;
    var h1 = container.clientHeight || container.innerHeight || container.width;
    var { rotate, transform } = getComputedStyle(imageChild);
    var points = [
        0, 0,
        w, 0,
        0, h,
        w, h
    ];

    if (rotate = /^(\d+(?:\.\d+)?)deg$/i.exec(rotate)) {
        rotate = +rotate[1];
        if (rotate) {
            var m = Matrix.create2d(rotate / 180 * Math.PI);
            m.applyTo(points);
        }
    }
    if (transform && transform != "none") {
        var m = Matrix.parse(transform);
        if (m) m.apply2d(points);
    }
    var [minx, miny, maxx, maxy] = Matrix.rect2d(points);
    w = maxx - minx;
    h = maxy - miny;
    var rw = w / w1;
    var rh = h / h1;
    if (!h1 || !w1 || !w || !h) return;
    var r = rh < rw ? 1 / rw : 1 / rh;
    if (set) {
        switch (set) {
            case true:
                w = r * w >>> 0;
                h = r * h >>> 0;
                imageChild.style.width = w + "px";
                imageChild.style.height = h + "px";
                imageChild.style.left = (w1 - w >> 1) + 'px';
                imageChild.style.top = (h1 - h >> 1) + 'px';
                break;
            case 1:
                imageChild.style.scale = r;
                break;
            case 2:
                imageChild.style.transform = `scale(${r})`;
                break;
        }
    }
    if (r > 0.999999 && r < 1.000001) r = 1;
    return r;
}