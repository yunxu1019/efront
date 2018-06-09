function lattice_test() {
    var elems = new Array(100).fill(0).map(a => div()).map(function (e, i) {
        css(e, { background: color.random() });
        text(e, i + 1);
        return e;
    })

    var layer = lattice(elems, 200, 300);

    onappend(layer, function () {
        layer.go(0);
    })
    return layer;
}