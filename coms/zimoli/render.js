

var renderElements = {};
var renderidOffset = 0;
var addRenderElement = function () {
    var element = this;
    if (!isNode(element)) return;
    if (!element.renderid) {
        element.renderid = ++renderidOffset;
    }
    renderElements[element.renderid] = element;
};
var removeRenderElement = function () {
    var element = this;
    delete renderElements[element.renderid];
};
function refresh() {
    for (var k in renderElements) {
        var element = renderElements[k];
        rebuild(element);
    }
}
function rebuild(element) {
    element.renders.map(a => a.call(element));
}
var createGetter = function (search) {
    return new Function(`try{with(this.$scope)return ${search}}catch(e){/*console.warn(String(e))*/}`);
};
var directives = {
    click(search) {
        var getter = createGetter(search);
        onclick(this, getter);
    },
    src(search) {
        var getter = createGetter(search).bind(this);
        this.renders.push(function () {
            var value = getter() || "";
            if (this.src !== value) this.src = value;
        });
    },
    bind(search) {
        var getter = createGetter(search).bind(this);
        this.renders.push(function () {
            var value = getter();
            if (text(this) !== value) text(this, value);
        });
    },
    model(search) {
        var getter = createGetter(search).bind(this);
        if (/^input$/i.test(this.tagName) && /^checkbox$/i.test(this.type) || /^checkbox$/i.test(this.tagName)) {
            this.renders.push(function (event) {
                var value = getter();
                if (value === undefined) value = "";
                if (this.checked != value) this.checked = value;
            });
            var change = new Function(`with(this.$scope)${search}=this.checked`).bind(this);
        } else if (/^(select|input|textarea)$/i.test(this.tagName)) {
            this.renders.push(function () {
                var value = getter();
                if (value === undefined) value = "";
                if (this.value != value) this.value = value;

            });
            var change = new Function(`with(this.$scope)${search}=this.value`).bind(this);
        } else {
            this.renders.push(function () {
                var value = getter();
                if (value === undefined) value = "";
                if (html(this) != value) html(this, value);
            });
            var change = new Function("html", `with(this.$scope)${search}=html(this)`).bind(this, html);
        }
        var onchange = lazy(change);
        eventsHandlers.map(on => on(this, onchange));
    },
    hide(search) {
        var getter = createGetter(search).bind(this);
        this.renders.push(function () {
            if (getter()) {
                this.style.display = "none";
            } else {
                this.style.display = "";
            }
        });
    },
    show(search) {
        var getter = createGetter(search).bind(this);
        this.renders.push(function () {
            if (getter()) {
                this.style.display = "";
            } else {
                this.style.display = "none";
            }
        });
    },
    "if"(search) {
        // 懒渲染
        var getter = createGetter(search).bind(this);
        var cancelonappend = onappend(this, function () {
            cancelonappend();
            var comment = document.createComment("-if:" + search);
            comment.renders = [function () {
                if (getter()) {
                    if (!this.parentNode) appendChild.before(comment, this);
                } else {
                    remove(this);
                }
            }.bind(this)];
            onappend(comment, addRenderElement);
            onremove(comment, removeRenderElement);
            appendChild.after(this, comment);
            rebuild(comment);
        });
    },
    repeat(search) {
        // 懒渲染
        throw new Error("repeat is not supported! use list component instead");
    },
    "class"(search) {
        var getter = createGetter(search).bind(this);
        var generatedClassNames = {};
        this.renders.push(function () {
            var originalClassNames = [];
            this.className.split(/\s+/).map(function (k) {
                if (k && !hasOwnProperty.call(generatedClassNames, k) && !hasOwnProperty.call(originalClassNames, k)) {
                    if (!/^\d+$/.test(k)) originalClassNames.push(originalClassNames[k] = k);
                }
            });
            var className = getter();
            var deltaClassNames = [];
            if (isString(className)) {
                className.split(/\s+/).map(function (k) {
                    if (!hasOwnProperty.call(originalClassNames, k)) {
                        if (!/^\d+$/.test(k)) deltaClassNames.push(deltaClassNames[k] = k);
                    }
                });
            } else if (className instanceof Object) {
                for (var k in className) {
                    if (!hasOwnProperty.call(originalClassNames, k) && className[k]) {
                        if (!/^\d+$/.test(k)) deltaClassNames.push(deltaClassNames[k] = k);
                    }
                }
            }
            var destClassName = originalClassNames.concat(deltaClassNames).join(" ");
            generatedClassNames = deltaClassNames;
            if (this.className !== destClassName) {
                this.className = destClassName;
            }
        });
    },
    style(search) {
        var getter = createGetter(search).bind(this);
        this.renders.push(function () {
            var stylesheet = getter();
            if (isString(stylesheet)) {
                stylesheet.replace(/[\s\u00a0]+/g, "").split(/;/).map(function (kv) {
                    var [k, v] = kv.split(":");
                    if (this.style[k] !== v) {
                        this.style[k] = v;
                    }
                }, this);
            } else if (stylesheet instanceof Object) {
                for (var k in stylesheet) {
                    if (this.style[k] !== stylesheet[k]) {
                        this.style[k] = stylesheet[k];
                    }
                }
            }
        });
    }
};
function renderElement(element, scope) {
    var children = element.children;
    if (!children) {
        return [].slice.call(element, 0).map(function (element) {
            return renderElement(element, scope);
        });
    }
    element.$scope = scope;
    if (element.renderid) return;
    var attrs = element.attributes;
    element.renders = [];
    [].slice.call(attrs, 0).map(function (attr) {
        var { name, value } = attr;
        if (/^(?:class|style|src)$/i.test(name)) return;
        name = name.replace(/^(ng|v|.*?)\-/i, "").toLowerCase();
        if (directives.hasOwnProperty(name) && isFunction(directives[name])) {
            directives[name].call(element, value);
        }
    });
    if (children.length) renderElement(children, scope);
    if (element.renders.length) {
        onappend(element, addRenderElement);
        onremove(element, removeRenderElement);
        rebuild(element);
    }
}
function render(element, scope) {
    return renderElement(element, scope);
}

var digest = lazy(refresh);
render.digest = digest;

var eventsHandlers = "change,paste,resize,keydown,keypress,keyup,mousedown,mouseup,dragend,drop".split(",").map(k => on(k));
eventsHandlers.map(on => on(window, digest));