onresize(window, function () {
    for (var cx = 0, dx = mountedLattices.length; cx < dx; cx++) {
        mountedLattices[cx].resize();
    }
});
var mountedLattices = [];
function lattice(layers, minWidth, maxWidth = minWidth << 1) {
    var boxCount;
    var resize = function () {
        var clientWidth = _box.clientWidth;
        boxCount = clientWidth / minWidth | 0;
        if (boxCount > layers.length) boxCount = layers.length;
        if (boxCount < 1) boxCount = 1;
    }
    var _box = list(function (index) {
        var offset = boxCount * index;
        var objs = layers.slice(offset, offset + boxCount).map(function (a) {
            css(a, {
                width: (1000000 / boxCount | 0) / 10000 + "%",
                maxWidth: maxWidth * renderPixelRatio + "pt",
            });
            return a;
        });
        if (!objs.length) return false;
        var _container = div();
        appendChild(_container, objs);
        return _container;
    });
    onappend(_box, function () {
        resize();
        mountedLattices.push(_box);
    });
    onremove(_box, function () {
        for (var cx = mountedLattices.length - 1; cx >= 0; cx--) {
            if (mountedLattices[cx] === _box) {
                mountedLattices.splice(cx, 1);
            }
        }
    });
    _box.resize = function () {
        var index = _box.index();
        var realIndex = index * boxCount;
        resize();
        index = realIndex / boxCount;
        remove(_box.children);
        _box.go(index);
    }
    return _box;
}