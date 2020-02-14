onresize(window, function () {
    for (var cx = 0, dx = mountedLattices.length; cx < dx; cx++) {
        mountedLattices[cx].resize();
    }
});
var mountedLattices = [];
var complete_class = "complete";
var inadequate_class = "lack";
function lattice(element, minWidth, maxWidth = minWidth << 1, layers) {
    var boxCount;

    var resize = function () {
        var _layers = layers || _box.src || [];
        var clientWidth = parseFloat(freePixel(_box.clientWidth));
        boxCount = clientWidth / minWidth | 0;
        if (boxCount >= _layers.length) {
            boxCount = _layers.length;
            var minCount = Math.ceil(clientWidth / maxWidth);
            if (minCount >= _layers.length) {
                boxCount = minCount;
            }
            addClass(_box, complete_class);
        }
        else removeClass(_box, complete_class);
        if (boxCount < 1) boxCount = 1, addClass(_box, inadequate_class);
        else removeClass(_box, inadequate_class);
    };
    if (layers) {
        var _box = list(element, function (index) {
            var offset = boxCount * index;
            var objs = layers.slice(offset, offset + boxCount).map(function (a) {
                css(a, {
                    width: (1000000 / boxCount | 0) / 10000 + "%",
                    maxWidth: fromPixel(maxWidth),
                });
                return a;
            });
            if (!objs.length) return false;
            var _container = div();
            appendChild(_container, objs);
            return _container;
        })
    } else {
        var _box = list(element);
        var insertBefore = _box.insertBefore;
        _box.insertBefore = function (element) {
            build(element);
            return insertBefore.apply(_box, arguments);
        };
    }
    var build = function (element) {
        css(element, {
            width: (1000000 / boxCount | 0) / 10000 + "%",
            maxWidth: fromPixel(maxWidth),
        });
        if (element.with) {
            element.with.forEach(build);
        }
    };
    onappend(_box, function () {
        mountedLattices.push(_box);
    });
    onremove(_box, function () {
        for (var cx = mountedLattices.length - 1; cx >= 0; cx--) {
            if (mountedLattices[cx] === _box) {
                mountedLattices.splice(cx, 1);
            }
        }
    });
    var savedClientWidth = 0;
    _box.resize = lazy(function () {
        if (savedClientWidth === _box.clientWidth) return;
        savedClientWidth = _box.clientWidth;

        var savedCount = boxCount;
        var index = _box.index();
        resize();
        var realIndex = index * (savedCount || 1);
        if (savedCount === boxCount) return;
        index = realIndex / boxCount;
        remove(_box.children);
        _box.go(index);
    });
    if (!_box.renders) _box.renders = [];
    _box.renders.unshift(_box.resize);
    return _box;
}
function main() {
    var element, minWidth, maxWidth, layers;
    [].forEach.call(arguments, function (arg) {
        if (isNode(arg)) {
            element = arg;
        } else if (isArray(arg)) {
            layers = arg;
        } else if (isFinite(arg)) {
            if (minWidth) {
                if (arg >= minWidth) {
                    maxWidth = arg;
                } else {
                    maxWidth = minWidth;
                    minWidth = arg;
                }
            } else {
                minWidth = arg;
            }
        }
    });
    if (isNode(element) && !minWidth) {
        minWidth = +(element.getAttribute("min-width") || element.getAttribute("item-width"));
    }
    return lattice(element, minWidth || 100, maxWidth, layers);
}