var complete_class = "complete";
var inadequate_class = "lack";
function lattice(element, minWidth, maxWidth = minWidth << 1, layers) {
    var boxCount;
    var resize = function () {
        var _layers = layers || _box.src || [];
        if (!_layers.length) return;
        var clientWidth = parseFloat(freePixel(_box.clientWidth));
        if (!clientWidth) return;
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
    _box.go = function (value) {
        resize();
        if (!boxCount) return;
        go.call(_box, value);
    };
    var _onappend = function () {
        _box.resize();
    };
    onappend(_box, _onappend);
    _box.resize = lazy(function () {
        var savedCount = boxCount;
        var index = _box.index();
        resize();
        if (savedCount === boxCount) return;
        var realIndex = index * (savedCount || 1);
        index = realIndex / boxCount || 0;
        _box.clean();
        [].forEach.call(_box.children, function (c) {
            build(c);
        });
        go.call(_box, index);
    }, 0);
    bind('resize')(_box, _box.resize);
    on('resize')(_box, _box.resize);
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
    if (element && element.$scope) {
        layers = null;
    }

    if (isNode(element) && !minWidth) {
        minWidth = +(element.getAttribute("min-width") || element.getAttribute("item-width"));
    }
    return lattice(element, minWidth || 240, maxWidth, layers);
}