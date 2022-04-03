var complete_class = "complete";
var inadequate_class = "lack";
function bindScroll(elements) {
    var scroll_elem = null, clear_timer = 0;
    var scroll = function () {
        if (!scroll_elem) scroll_elem = this;
        if (scroll_elem !== this) return;
        clearTimeout(clear_timer);
        clear_timer = setTimeout(function () {
            scroll_elem = null;
        }, 160);

        var index = scroll_elem.index();
        var maxCount = 0;
        for (var cx = 0, dx = elements.length; cx < dx; cx++) {
            var e = elements[cx];
            if (e !== scroll_elem) {
                e.cancelFrame();
                e.go(index);
            }
            if (e.children.length > maxCount) {
                maxCount = e.children.length;
            } else if (e.children.length < maxCount) {
                var s = e.getIndexedElement(index | 0);
                if (s) css(e, { paddingBottom: fromOffset(s.offsetHeight) });
            }
        }
    };
    elements.forEach(function (e) {
        on("scroll")(e, scroll);
    });
}
function gallery(element, minWidth, generator) {
    var boxCount;

    var resize = function () {
        var clientWidth = parseFloat(freePixel(element.clientWidth));
        if (!clientWidth) return;
        boxCount = clientWidth / minWidth | 0;
        if (boxCount < 1) boxCount = 1;
        element.paddingMax = boxCount;
    };

    var setWidth = function (element) {
        css(element, {
            width: (1000000 / boxCount | 0) / 10000 + "%",
            maxWidth: fromPixel(maxWidth),
        });
    };
    resizingList.set(element);
    var createColumn = function (id) {
        var _box = list(function (index) {
            var realindex = index * boxCount + id;
            if (realindex < 0) return;
            var e = generator(realindex);
            return e;
        });
        _box.$stopY = noop;
        _box.delta = id;
        setWidth(_box);
        return _box;
    };
    element.clean = function () {
        resize();

        remove(element.children);
        for (var cx = 0, dx = boxCount; cx < dx; cx++) {
            var c = createColumn(cx);
            element.appendChild(c);
        }
        bindScroll([].slice.call(element.children, 0));

    };
    element.go = function (index) {
        [].forEach.call(this.children, function (c) {
            c.go(index / boxCount);
        });
    };
    element.index = function () {
        var a = this.children[0];
        return a ? a.index() * boxCount || 0 : 0;
    };
    element.resize = lazy(function () {
        var savedCount = boxCount;
        var index = element.index();
        resize();
        if (savedCount === boxCount) return;
        element.clean();
        var realIndex = index * (savedCount || 1);
        index = realIndex / boxCount || 0;
        element.go(index);
    }, 0);
    care(element, function () {
        var index = this.index();
        this.clean();
        this.go(index || 0);
    });
    on('resize')(element, element.resize);
    return element;
}
function main() {
    var element, minWidth;
    [].forEach.call(arguments, function (arg) {
        if (isNode(arg)) {
            element = arg;
        } else if (isFinite(arg)) {
            minWidth = arg;
        }
    });
    if ("$src" in element) {
        var generator = getGenerator(element);
        care(element, function () {
            var index = element.index();
            element.clean();
            element.go(index || 0);
        });
    } else {
        generator = function () { }
    }

    if (isNode(element) && !minWidth) {
        minWidth = +(element.getAttribute("min-width") || element.getAttribute("item-width"));
    }
    return gallery(element, minWidth || 240, generator);
}