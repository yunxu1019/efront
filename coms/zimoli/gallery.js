onresize(window, function () {
    for (var cx = 0, dx = mountedGalleries.length; cx < dx; cx++) {
        mountedGalleries[cx].resize();
    }
});
var mountedGalleries = [];
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
        for (var cx = 0, dx = elements.length; cx < dx; cx++) {
            var e = elements[cx];
            if (e !== scroll_elem) {
                e.cancelFrame();
                e.go(index);
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
    var _onappend = function () {
        mountedGalleries.push(element);
        element.resize();
    };
    onappend(element, _onappend);

    onremove(element, function () {
        for (var cx = mountedGalleries.length - 1; cx >= 0; cx--) {
            if (mountedGalleries[cx] === element) {
                mountedGalleries.splice(cx, 1);
            }
        }
    });
    var createColumn = function (id) {
        var _box = list(function (index) {
            var realindex = index * boxCount + id;
            if (realindex < 0) return;
            var e = generator(realindex);
            return e;
        });
        _box.stopY = noop;
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
    if (!element.renders) element.renders = [];
    element.renders.unshift(element.resize);
    care(element, function () {
        var index = this.index();
        this.clean();
        this.go(index || 0);
    });

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
    var src = element.getAttribute("src") || element.getAttribute("ng-src") || element.getAttribute("v-src");
    if (src) {
        var parsedSrc = render.parseRepeat(src);
        if (!parsedSrc) {
            element.setAttribute("ng-src", src);
            element.removeAttribute("src");
            var generator = getGenerator(element);
        } else {
            element.setAttribute("ng-src", parsedSrc.srcName);
            element.removeAttribute("src");
            var generator = getGenerator(element, parsedSrc);
        }
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