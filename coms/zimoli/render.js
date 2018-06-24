

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
    return new Function("scope", `try{with(scope)return ${search}}catch(e){/*console.warn(String(e))*/}`);
};
var directives = {
    click(scope, search) {
        var getter = createGetter(search);
        onclick(this, getter.bind(this, scope));
    },
    src(scope, search) {
        var getter = createGetter(search);
        this.renders.push(function () {
            var value = getter(scope) || "";
            if (this.src !== value) this.src = value;
        });
    },
    bind(scope, search) {
        var getter = createGetter(search);
        this.renders.push(function () {
            var value = getter(scope);
            if (text(this) !== value) text(this, value);
        });
    },
    model(scope, search) {
        var getter = createGetter(search);
        if (/select|input|textarea/i.test(this.tagName)) {
            this.renders.push(function () {
                var value = getter(scope);
                if (value === undefined) value = "";
                if (this.value != value) this.value = value;

            });
            var change = new Function("scope", `with(scope)${search}=this.value`).bind(this, scope);
        } else {
            this.renders.push(function () {
                var value = getter(scope);
                if (value === undefined) value = "";
                if (html(this) != value) html(this, value);
            });
            var change = new Function("scope", "html", `with(scope)${search}=html(this)`).bind(this, scope, html);
        }
        var onchange = lazy(change);
        eventsHandlers.map(on => on(this, onchange));
    },
    hide(scope, search) {
        var getter = createGetter(search);
        this.renders.push(function () {
            if (getter(scope)) {
                this.style.display = "none";
            } else {
                this.style.display = "";
            }
        });
    },
    show(scope, search) {
        var getter = createGetter(search);
        this.renders.push(function () {
            if (getter(scope)) {
                this.style.display = "";
            } else {
                this.style.display = "none";
            }
        });
    },
    "if"(scope, search) {
        // 懒渲染
        var getter = createGetter(search);
        var cancelonappend = onappend(this, function () {
            cancelonappend();
            var comment = document.createComment("-if:" + search);
            comment.renders = [function () {
                if (getter(scope)) {
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
    repeat(scope, search) {
        // 懒渲染
        throw new Error("repeat is not supported! use list component instead");
    },
    "class"(scope, search) {
        var getter = createGetter(search);
        var originClassName = [];
        this.className.split(/\s+/).map(function (k) {
            if (k && !hasOwnProperty.call(originClassName, k)) {
                originClassName.push(originClassName[k] = k);
            }
        });
        this.renders.push(function () {
            var className = getter(scope);
            var deltaClassNames = [];
            if (isString(className)) {
                className.split(/\s+/).map(function (k) {
                    if (!hasOwnProperty.call(originClassName, k)) {
                        deltaClassNames.push(deltaClassNames[k] = k);
                    }
                });
            } else if (className instanceof Object) {
                for (var k in className) {
                    if (!hasOwnProperty.call(originClassName, k) && className[k]) {
                        deltaClassNames.push(deltaClassNames[k] = k);
                    }
                }
            }
            var destClassName = originClassName.concat(deltaClassNames).join(" ");
            if (this.className !== destClassName) {
                this.className = destClassName;
            }
        });
    },
    style(scope, search) {
        var getter = createGetter(search);
        this.renders.push(function () {
            var stylesheet = getter(scope);
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
    if (element.renderid) return element;
    var children = element.children;
    if (!children) {
        return [].slice.call(element, 0).map(function (element) {
            return renderElement(element, scope);
        });
    }
    var attrs = element.attributes;
    element.renders = [];
    [].slice.call(attrs, 0).map(function (attr) {
        var { name, value } = attr;
        if (/^(?:class|style|src)$/i.test(name)) return;
        name = name.replace(/^(ng|v|.*?)\-/i, "").toLowerCase();
        if (directives.hasOwnProperty(name) && isFunction(directives[name])) {
            directives[name].call(element, scope, value);
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