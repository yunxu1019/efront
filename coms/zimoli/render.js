

var hasOwnProperty = {}.hasOwnProperty;
var renderElements = {};
var renderidOffset = 10;
var renderidClosed = 0;
var addRenderElement = function () {
    var element = this;
    if (!isNode(element)) return;
    renderElements[element.renderid] = element;
    rebuild(element);
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
    var props = extend({}, element);
    element.renders.forEach(a => a.call(element));
    var changes = getChanges(element, props);
    if (changes) {
        var event = createEvent('changes');
        event.changes = changes;
        dispatch(event, element);
    }
}
var createGetter = function (search, usetry = true) {
    var [withContext, searchContext] = search;
    if (usetry) {
        return new Function(`try{${withContext}with(this.$scope)return ${searchContext}}catch(e){/*console.warn(String(e))*/}`);
    }
    return new Function(`${withContext}with(this.$scope)return ${searchContext}`);
};
var initialComment = function (renders, type, expression) {
    var comment = document.createComment(`${type} ${expression}`);
    comment.renders = renders;
    comment.renderid = ++renderidOffset;
    onappend(comment, addRenderElement);
    onremove(comment, removeRenderElement);
    appendChild.after(this, comment);
    remove(this);
    rebuild(comment);
    return comment;
};
var parseRepeat = function (expression) {
    var reg =
        // /////////////////////////////////////////// i //       r       /////////////////////////  o  ///// a ///////////////////// t /////
        /^(?:let\b|var\b|const\b)?\s*(?:[\(\{\[]\s*)?(.+?)((?:\s*,\s*.+?)*)?(?:\s*[\)\}\]]\s*|\s+)(in|of)\s+(.+?)(\s+?:track\s*by\s+(.+?))?$/i;
    var res = reg.exec(expression);
    if (!res) return res;
    var [_, i, k, r, s, t] = res;
    var keyName, itemName, indexName, trackBy = t, srcName = s;
    switch (r) {
        case "in":
            if (i) itemName = i;
            if (k) {
                var [keyName, indexName] = k.split(/,/).map(a => a.trim()).filter(a => !!a);
            }
            break;
        case "of":
            if (i) itemName = i;
            if (k) {
                keyName = i;
                var [itemName, indexName] = k.split(/,/).map(a => a.trim()).filter(a => !!a);
            }
            break;
    }
    return {
        keyName,
        itemName,
        indexName,
        trackBy,
        srcName
    }
};
var createRepeat = function (search) {
    // 懒渲染
    // throw new Error("repeat is not supported! use list component instead");

    var [context, expression] = search;
    var res = parseRepeat(expression);
    if (!res) throw new Error(`no recognition for repeat expression: ${expression} `);
    var { keyName, itemName, indexName, srcName } = res;
    // 懒渲染
    var getter = createGetter([context, srcName]).bind(this);
    var element = this, clonedElements = [], savedValue;
    var renders = [function () {
        var result = getter();
        result = result instanceof Array ? result.slice(0) : Object.assign({}, result);
        if (deepEqual.shallow(savedValue, result)) return;
        savedValue = result;
        remove(clonedElements);
        var keys = Object.keys(result);
        if (keys.length > 600) {
            throw new Error("数据量过大，取消绘制！");
        }
        var $parentScopes = element.$parentScopes || [];
        clonedElements = keys.map(function (key, cx) {
            var clone = element.cloneNode();
            clone.innerHTML = element.innerHTML;
            clone.renderid = 0;
            clone.$parentScopes = $parentScopes;
            var $scope = extend(Object.create(element.$scope), {
                [keyName || '$key']: key,
                [itemName || '$item']: result[key],
                [indexName || '$index']: cx
            });
            clone.$scope = $scope;
            clone = renderElement(clone, $scope, clone.$parentScopes);
            return clone;
        }, this);
        appendChild.before(this, clonedElements);
    }];
    if (this.parentNode) {
        initialComment.call(this, renders, 'repeat', expression);
    } else {
        once("append")(this, initialComment.bind(this, renders, "repeat", expression));
    }
};
var structures = {
    "if"(search) {
        // 懒渲染
        var getter = createGetter(search).bind(this);
        var element = this;
        var renders = [function () {
            var result = getter();
            if (result) {
                if (!element.parentNode) appendChild.before(this, element);
                if (element.renderid < 0) {
                    element.renderid = 0;
                    renderElement(element);
                }
            } else {
                remove(element);
            }
        }];
        if (this.parentNode) {
            initialComment.call(this, renders, "if", search[1]);
        } else {
            once("append")(this, initialComment.bind(this, renders, "if", search[1]));
        }
    },
    repeat(search) {
        createRepeat.call(this, search);
    },
    for(search) {
        createRepeat.call(this, search);
    },
    each(search) {
        createRepeat.call(this, search);
    }
};
var directives = {
    src(search) {
        var getter = createGetter(search).bind(this);
        var oldValue, pending;
        var refresh = function () {
            that.src = oldValue;
            removeClass(that, "pending");
            pending = 0;
        };
        var img = document.createElement("img");
        var that = this;
        this.renders.push(function () {
            var value = getter();
            if (deepEqual(value, oldValue)) return;
            oldValue = value;
            value = value || "";
            if (!/img/i.test(this.tagName) || !isString(value)) return this.src = value;
            this.setAttribute("src", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQYV2NgAAIAAAUAAarVyFEAAAAASUVORK5CYII=");
            if (value) {
                img.src = value;
                if (img.complete) {
                    this.src = value;
                } else if (!pending) {
                    addClass(this, "pending");
                    pending = setTimeout(refresh);
                }
            }
        });
    },
    bind(search) {
        var getter = createGetter(search).bind(this);
        var oldValue;
        this.renders.push(function () {
            var value = getter();
            if (deepEqual(value, oldValue)) return;
            oldValue = value;
            if (text(this) !== value) text(this, value);
        });
    },
    model(search) {
        var getter = createGetter(search).bind(this);
        var oldValue;
        if (/^input$/i.test(this.tagName) && /^checkbox$/i.test(this.type) || /^checkbox$/i.test(this.tagName)) {
            this.renders.push(function () {
                var value = getter();
                if (value === undefined) value = "";
                if (deepEqual(oldValue, value)) return;
                oldValue = value;
                this.checked = value;
            });
            var change = new Function(`${search[0]}with(this.$scope)${search[1]}=this.checked`).bind(this);
        } else if (("value" in this || this.getValue instanceof Function) && this.setValue instanceof Function) {
            this.renders.push(function () {
                var value = getter();
                if (value === undefined) value = "";
                if (deepEqual(oldValue, value)) return;
                oldValue = value;
                if ((this.getValue instanceof Function ? this.getValue() : this.value) !== value) this.setValue(value);
            });
            var change = new Function(`${search[0]}with(this.$scope)${search[1]}=this.value`).bind(this);
        } else if (/^(select|input|textarea)$/i.test(this.tagName) || "value" in this) {
            this.renders.push(function () {
                var value = getter();
                if (value === undefined) value = "";
                if (deepEqual(oldValue, value)) return;
                oldValue = value;
                if (this.value !== value) this.value = value;
            });
            var change = new Function(`${search[0]}with(this.$scope)${search[1]}=this.value`).bind(this);
        } else {
            this.renders.push(function () {
                var value = getter();
                if (value === undefined) value = "";
                if (deepEqual(oldValue, value)) return;
                oldValue = value;
                if (html(this) !== value) html(this, value);
            });
            var change = new Function("html", `${search[0]}with(this.$scope)${search[1]}=html(this)`).bind(this, html);
        }
        var onchange = lazy(change);
        eventsHandlers.map(on => on(this, onchange));
    },
    hide(search) {
        var getter = createGetter(search).bind(this);
        var oldValue;
        this.renders.push(function () {
            var value = getter();
            if (deepEqual(oldValue, value)) return;
            oldValue = value;
            if (value) {
                this.style.display = "none";
            } else {
                this.style.display = "";
            }
        });
    },
    show(search) {
        var getter = createGetter(search).bind(this);
        var oldValue;
        this.renders.push(function () {
            var value = getter();
            if (deepEqual(oldValue, value)) return;
            oldValue = value;
            if (value) {
                this.style.display = "";
            } else {
                this.style.display = "none";
            }
        });
    },

    "class"(search) {
        var getter = createGetter(search).bind(this);
        var generatedClassNames = {};
        var oldValue;
        this.renders.push(function () {
            var className = getter();
            if (deepEqual(oldValue, className)) return;
            oldValue = className;
            var originalClassNames = [];
            this.className.split(/\s+/).map(function (k) {
                if (k && !hasOwnProperty.call(generatedClassNames, k) && !hasOwnProperty.call(originalClassNames, k)) {
                    if (!/^\d+$/.test(k)) originalClassNames.push(originalClassNames[k] = k);
                }
            });
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
        var oldValue;
        this.renders.push(function () {
            var stylesheet = getter();
            if (deepEqual(oldValue, stylesheet)) return;
            oldValue = stylesheet;
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
var emiters = {
    on(key, search) {
        var getter = createGetter(search, false);
        on(key)(this, getter);
    },
    once(key, search) {
        var getter = createGetter(search, false);
        once(key)(this, getter);
    }
};
emiters.v = emiters.ng = emiters.on;

function renderElement(element, scope = element.$scope, parentScopes = element.$parentScopes) {
    var children = element.children;
    if (!children) {
        return [].concat.apply([], element).map(function (element) {
            return renderElement(element, scope, parentScopes);
        });
    }
    if (!isNumber(element.renderid)) {
        renderStructure(element, scope, parentScopes);
    }
    var elementid = element.getAttribute("renderid") || element.getAttribute("elementid") || element.getAttribute("id");
    if (elementid && scope[elementid]) {
        throw new Error("同一个id不能使用两次:" + elementid);
    }
    if (elementid) scope[elementid] = element;
    if (element.renderid < 0) {
        return element;
    }
    var isFirstRender = !element.renderid;
    element.renderid = 1;
    if (isFirstRender) {
        var attrs = [].concat.apply([], element.attributes);
        var { tagName, parentNode, nextSibling } = element;
        // 替换元素
        if (!scope[tagName]) tagName = tagName.toLowerCase();
        if (!scope[tagName])
            tagName = tagName.replace(/(?:^|\-+)([a-z])/ig, (_, w) => w.toUpperCase());
        if (!scope[tagName]) tagName = tagName.slice(0, 1).toLowerCase() + tagName.slice(1);
        if (isFunction(scope[tagName])) {
            var attrsMap = {};
            var replacer = scope[tagName](element);
            if (isElement(replacer) && element !== replacer) {
                if (nextSibling) appendChild.before(nextSibling, replacer);
                else if (parentNode) appendChild(parentNode, replacer);
                if (element.parentNode === parentNode) remove(element);
                attrs.map(function (attr) {
                    var { name, value } = attr;
                    switch (name.toLowerCase()) {
                        case "class":
                            addClass(replacer, value);
                            break;
                        case "style":
                            css(replacer, value);
                            break;
                        case "src":
                        case "placeholder":
                            replacer[name] = value;
                            break;
                        default:
                            if (!/[\-]/.test(name)) {
                                replacer.setAttribute(name, value);
                            } else {
                                attrsMap[name] = attr;
                            }
                    }
                });
                element = replacer;
                element.$scope = scope;
            }
            [].concat.apply([], element.attributes).forEach(attr => {
                if (attrsMap[attr.name]) {
                    delete attrsMap[attr.name];
                }
                attrsMap[attr.name] = attr;
            });
            attrs = Object.keys(attrsMap).map(key => attrsMap[key]);
        }
    }
    if (element.children.length) renderElement(element.children, scope, parentScopes);
    if (!isFirstRender) return element;

    // 解析属性
    element.renders = [];
    var withContext = parentScopes ? parentScopes.map((_, cx) => `with(this.$parentScopes[${cx}])`).join("") : '';
    var emiter_reg = /^(v|ng|on|once)\-/i
    attrs.map(function (attr) {
        var { name, value } = attr;
        if (/^(?:class|style|src)$/i.test(name)) return;
        var key = name.replace(/^(ng|v|.*?)\-/i, "").toLowerCase();
        if (directives.hasOwnProperty(key) && isFunction(directives[key])) {
            var savedLength = element.renders.length;
            directives[key].call(element, [withContext, value]);
            element.renders.slice(savedLength).forEach(function (e) {
                e.call(this);
            }, element);
        } else if (emiter_reg.test(name)) {
            var ngon = emiter_reg.exec(name)[1].toLowerCase();
            emiters[ngon].call(element, key, [withContext, value]);
        }
    });
    if (element.renders.length) {
        element.renderid = ++renderidOffset;
        onappend(element, addRenderElement);
        onremove(element, removeRenderElement);
        if (element.isMounted) addRenderElement.call(element);
    }
    if (elementid) scope[elementid] = element;
    return element;
}
function renderStructure(element, scope, parentScopes = []) {
    // 处理结构流
    if (parentScopes !== null && !isArray(parentScopes)) {
        throw new Error('父级作用域链应以数组的类型传入');
    }
    element.$scope = scope;
    if (parentScopes) {
        if (element.renderid && !element.$parentScopes || element.$parentScopes && element.$parentScopes.length !== parentScopes.length) {
            return new Error("父作用域链的长度必须相等着");
        }
        element.$parentScopes = parentScopes;
    }
    var attrs = [].concat.apply([], element.attributes);
    var withContext = parentScopes ? parentScopes.map((_, cx) => `with(this.$parentScopes[${cx}])`).join("") : '';
    attrs.map(function (attr) {
        var { name, value } = attr;
        var key = name.replace(/^(ng|v|.*?)\-/i, "").toLowerCase();
        if (structures.hasOwnProperty(key) && isFunction(structures[key])) {
            if (element.renderid) {
                throw new Error(`请不要在同一元素上使用两次结构属性${attrs.map(a => a.name)}!`);
            }
            element.renderid = -1;
            structures[key].call(element, [withContext, value]);
        }
    });
}
function render(element, scope, parentScopes) {
    return renderElement(element, scope, parentScopes);
}

var digest = lazy(refresh);
render.digest = render.apply = render.refresh = digest;
render.parseRepeat = parseRepeat;
var eventsHandlers = "change,paste,resize,keydown,keypress,keyup,mousedown,mouseup,touchend,touchcancel,touchstart,dragend,drop,click".split(",").map(k => on(k));
eventsHandlers.map(on => on(window, digest));