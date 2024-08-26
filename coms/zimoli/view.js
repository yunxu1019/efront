
var prototype = {
    resizable: false,
    closeable: true,
    showTitle: true,
    viewTitle: '',
    left: 0,
    top: 0,
    add(element) {
        return this;
    },
    hide() {
        this.savePosition();
        remove(this);
        return this;
    },
    load(url) {
        return this;
    },
    setTitle(arg) {
        var scope = this;
        if (!this.titleElements) {
            this.titleElements = generate(viewTitle);
            scope.showTitle = true;
            appendChild(this, [].concat.apply([], this.titleElements));
            drag.on(this.titleElements[0], this);
        }
        switch (typeof arg) {
            case "object":
                extend(scope, arg);
                break;
            case "boolean":
                this.showTitle = arg;
                break;
            case "number":
                scope.color = rgba(arg);
            case "string":
                scope.viewTitle = arg;
        }
        render(this.titleElements, this);
        return this;
    },

    release() {
        remove(this);
        return this;
    },
    closeView() {
        this.release();
        return this;
    },
    moveTo(left, top) {
        this.left = left;
        this.top = top;
        this.loadPosition();
        return this;
    },
    moveBy(deltax, deltay) {
        return this.moveTo(this.offsetLeft + deltax, this.offsetTop + deltay);
    },
    show() {
        this.style.position = 'fixed';
        popup(this);
        this.loadPosition();
        return this;
    },
    savePosition() {
        this.left = this.offsetLeft;
        this.top = this.offsetTop;
        return this;
    },
    loadPosition() {
        move.call(this, this.left, this.top);
        return this;
    }
};

function getScrollbarWidth() {
    var div = document.createElement("div");
    div.style.position = 'absolute';
    div.style.overflowY = 'scroll';
    document.body.appendChild(div);
    var w = div.offsetWidth;
    remove(div);
    return w;
}
var init = function () {
    init = function () { };
    var className = view.className.split(/\s+/)[0];
    css(`.${className}>.body,.${className}>[body]`, {
        borderRight: 20 - getScrollbarWidth() + "px solid transparent",
        marginRight: -20 + "px"
    });
};
var resize2 = function () {
    var [head, body, foot] = getTypedChildren(this, ["head", "body", "foot"]);
    var changed = false;
    a: if (head && body) {
        var height = head.offsetHeight + head.offsetTop;
        if (head.$height === height) break a;
        head.$height = height;
        changed = true;
        css(head, {
            marginBottom: fromOffset(-height),
        })
        css(body, {
            paddingTop: fromOffset(height - body.clientTop)
        });
    }
    a: if (foot && body) {
        var height = foot.offsetHeight;
        if (foot.$height === height) break a;
        foot.$height = height;
        changed = true;
        css(body, {
            paddingBottom: fromOffset(height)
        });
        css(foot, {
            marginTop: fromOffset(-height)
        })
    }
    if (changed) {
        css(body, { height: '' });
        if (body.scrollHeight + body.offsetTop > this.clientHeight + 1) {
            css(body, { height: fromOffset(this.clientHeight) });
        }
    }
};
function view(element) {
    var w = isNode(element) ? element : document.createElement("form");
    init();
    extend(w, prototype);
    if (w !== element) {
        extend(w, element);
        once("append")(w, function () {
            if (w.draggable !== true && w.draggable !== false) {
                w.draggable = /^(fixed|absolute)$/i.test(getComputedStyle(w).position);
            }
            if (w.draggable) w.setAttribute('draggable', 'draggable');
        })
        if (w.resizable) resize.on(w);
    }
    resizingList.set(w, resize2);
    w.renders = [resize2];
    w.reshape = lazy(resize2);
    onmounted(w, w.reshape);
    return w;
}