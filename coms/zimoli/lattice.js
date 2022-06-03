var complete_class = "complete";
var inadequate_class = "lack";
function lattice(element, minWidth, _maxWidth, layers) {
    var boxCount, maxWidth = _maxWidth || minWidth << 1;
    var resize = function () {
        var _layers = layers || _box.src || [];
        if (!_layers.length) return;
        var _minWidth = +(element.getAttribute("min-width") || element.getAttribute("item-width"));
        if (_minWidth) {
            minWidth = _minWidth;
            maxWidth = _maxWidth || minWidth << 1;
        }
        var clientWidth = parseFloat(freePixel(_box.clientWidth));
        if (!clientWidth) return;
        var savedCount = boxCount;
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
        _box.paddingMax = boxCount;
        _box.group = boxCount;
        if (savedCount === boxCount) return;
        _box.clean();
        [].forEach.call(_box.children, function (c) {
            build(c);
        });
        return true;
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
        if (element.with instanceof Array) element.with.forEach(build);
        else if (isElement(element.with)) build(element.with);
    };
    var go = _box.go;
    _box.go = function () {
        resize();
        go.apply(this, arguments);
    };
    _box.resize = lazy(function () {
        var index = _box.index();
        var savedCount = boxCount;
        if (resize()) {
            var realIndex = index * (savedCount || 1);
            index = realIndex / boxCount || 0;
            go.call(_box, index);
        }
    });
    resizingList.set(_box);
    on('resize')(_box, _box.resize);
    return _box;
}
function main() {
    var element, minWidth, maxWidth, layers;
    var initMinWidth = function (arg) {
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
    };
    [].forEach.call(arguments, function (arg) {
        if (isNode(arg)) {
            element = arg;
        } else if (isArray(arg)) {
            layers = arg;
        } else if (isFinite(arg)) {
            initMinWidth(arg);
        }
    });
    if (element && element.$scope) {
        layers = null;
    }
    return lattice(element, minWidth || 240, maxWidth, layers);
}