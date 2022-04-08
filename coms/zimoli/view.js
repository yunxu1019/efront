
var prototype = {
    draggable: undefined,
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
    css("." + view.className.split(/\s+/)[0] + ">.body", {
        marginRight: -getScrollbarWidth() + "px"
    });
};
function view(element) {
    var window = isNode(element) ? element : document.createElement("form");
    init();
    extend(window, prototype);
    if (window !== element) {
        extend(window, element);
        once("append")(window, function () {
            if (window.draggable !== true && window.draggable !== false) {
                window.draggable = /^(fixed|absolute)$/i.test(getComputedStyle(window).position);
            }
            if (window.draggable) window.setAttribute('draggable', 'draggable');
        })
        if (window.resizable) resize.on(window);
    }
    return window;
}