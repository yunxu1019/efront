
var prototype = {
    dragable: true,
    resizable: true,
    closeable: true,
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
        var scope = this.scope;
        if (!this.titleElement) {
            this.titleElements = generate(viewTitle);
            scope.showTitle = true;
            appendChild(this, this.titleElements);
        }
        switch (typeof arg) {
            case "object":
                extend(scope, arg);
                break;
            case "boolean":
                scope.show = arg;
                break;
            case "number":
                scope.color = rgba(arg);
            case "string":
                scope.title = arg;
        }
        render(this.titleElements, scope);
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
}
function view() {
    var window = div();
    extend(window, prototype);
    drag.on(window);
    window.scope = window;
    on("dragend")(window, window.dragend);
    return window;
}