var hasOwnProperty = {}.hasOwnProperty;
var renderElements = Object.create(null);
var presets = Object.create(null);
window.renderElements = renderElements;
var renderidOffset = 10;
var renderidClosed = 0;
var addRenderElement = function () {
    var element = this;
    if (!isNode(element)) return;
    if (element.renderid < 10 && element.renderid > 0) element.renderid = ++renderidOffset;
    renderElements[element.renderid] = element;
    rebuild(element);
};
var removeRenderElement = function () {
    var element = this;
    delete renderElements[element.renderid];
};
function refresh(root) {
    var rest = [];
    var body = document.documentElement;
    for (var k in renderElements) {
        var element = renderElements[k];
        if (root && root.renders) {
            if (
                getTargetIn(root, element)
            ) rebuild(element);
        } else {
            rebuild(element);
            if (!getTargetIn(body, element)) {
                rest.push(element);
            }
        }
    }
    if (rest.length) rest.forEach(a => removeRenderElement.call(a));
}
function rebuild(element) {
    if (!element.needchanges) {
        element.renders.forEach(a => a.call(element));
        return;
    }
    var props = {};
    Object.keys(element).forEach(function (key) {
        var data = element[key];
        props[key] = isObject(data) && !isFunction(data) && !isDate(data) && !isNode(data) ? extend(data instanceof Array ? [] : {}, data) : data;
    });
    element.renders.forEach(a => a.call(element));
    var changes = getChanges(element, props);
    if (changes) {
        var event = createEvent('changes');
        event.changes = changes;
        dispatch(event, element);
    }
}
var variableReg = /([^\:\,\+\=\-\!%\^\|\/\&\*\!\;\?\>\<~\{\}\s]|\?\.(?=[^\d])|\s*\.\s*)+/g;
var createGetter = function (search, isprop = true) {
    var [withContext, searchContext] = search;
    if (/\?\.(?=[^\d])/.test(searchContext)) {
        searchContext = searchContext.replace(variableReg, function (context) {
            var dist;
            context.split(/\?\.(?=[^\d])/).forEach(function (search) {
                if (dist) {
                    if (/[\=]/.test(dist)) dist = `(${dist})`;
                    dist = `${dist}!==void 0&&${dist}!==null?${dist}.${search}:null`
                } else {
                    dist = search;
                }
            });
            return dist;
        });
    }
    if (isprop) {
        return new Function('event', `try{${withContext}with(this.$scope)return ${searchContext}}catch(e){/*console.warn(String(e))*/}`);
    }
    return new Function("event", `${withContext}with(this.$scope)${/[;\r\n\u2028\u2029]/.test(searchContext) ? searchContext : /([\=\(])/.test(searchContext) ? "return " + searchContext : `return ${searchContext}(event)`}`);
};
var initialComment = function (renders, type, expression) {
    var comment = document.createComment(`${type} ${expression}`);
    comment.renders = renders;
    comment.renderid = ++renderidOffset;
    onappend(comment, addRenderElement);
    onremove(comment, removeRenderElement);
    appendChild.after(this, comment);
    if (!/if/i.test(type)) remove(this);
    this.with = comment;
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
    };
};
var createRepeat = function (search, id = 0) {
    // 懒渲染
    // throw new Error("repeat is not supported! use list component instead");

    var [context, expression] = search;
    var res = parseRepeat(expression);
    if (!res) throw new Error(`no recognition for repeat expression: ${expression} `);
    var { keyName, itemName, indexName, srcName } = res;
    // 懒渲染
    var getter = createGetter([context, srcName]).bind(this);
    var element = this, clonedElements = [], savedValue, savedOrigin;
    var renders = [function () {
        var result = getter();
        var origin = result;
        result = extend(result instanceof Array ? [] : {}, result);
        if (savedOrigin === origin && deepEqual.shallow(savedValue, result)) return;
        var changes = getChanges(result, savedValue);
        savedValue = result;
        savedOrigin = origin;
        var keys = result instanceof Array ? result.map((_, i) => i) : Object.keys(result);
        if (keys.length > 600) {
            throw new Error("数据量过大，取消绘制！");
        }
        var $parentScopes = element.$parentScopes || [];
        var clonedElements1 = keys.map(function (key, cx) {
            if (!changes[cx]) return clonedElements[cx];
            var clone = element.cloneNode();
            clone.innerHTML = element.innerHTML;
            clone.renderid = id;
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
        clonedElements1.forEach(function (a, cx) {
            var c = changes[cx];
            if (!c) return;
            if (c && c.previous) {
                appendChild.replace(clonedElements[cx], a);
            } else {
                appendChild.before(this, a);
            }
        }, this);
        remove(clonedElements.filter((_, cx) => changes[cx]));
        clonedElements = clonedElements1;
    }];
    if (this.parentNode) {
        initialComment.call(this, renders, 'repeat', expression);
    } else {
        once("append")(this, initialComment.bind(this, renders, "repeat", expression));
    }
};
var createIf = function (search, id = 0) {
    // 懒渲染
    var getter = createGetter(search).bind(this);
    var element = this;
    var savedValue;
    var renders = [function () {
        var result = getter();
        result = !!result;
        if (savedValue === result) return;
        savedValue = result;
        if (result) {
            appendChild.before(this, element);
            element.with = this;
            if (element.renderid < 0) {
                element.renderid = id;
                renderElement(element);
            }
        } else {
            delete element.with;
            remove(element);
        }
    }];
    if (this.parentNode) {
        initialComment.call(this, renders, "if", search[1]);
    } else {
        once("append")(this, initialComment.bind(this, renders, "if", search[1]));
    }
};
var parseIfWithRepeat = function (ifExpression, repeatExpression) {
    var repeater = parseRepeat(repeatExpression);
    if (!repeater) {
        throw new Error(`不能识别repeat表达式：${repeat}`);
    }
    var pair = [];
    var rest = [], savedIndex = 0;
    var reg = /[\(\)]|&&|;/g;
    reg.lastIndex = 0;
    var run = function () {
        var res = reg.exec(ifExpression);
        var { lastIndex } = reg;
        if (res) {
            switch (res[0]) {
                case "(":
                    pair.push(lastIndex);
                    break;
                case ")":
                    pair.pop();
                    break;
                case ";":
                case "&&":
                    if (!pair.length) {
                        rest.push(ifExpression.slice(savedIndex, lastIndex - 2));
                        savedIndex = lastIndex;
                    }
                    break;
            }
        } else {
            rest.push(ifExpression.slice(savedIndex, ifExpression.length));
            savedIndex = ifExpression.length;
        }
    };
    var inc = 0;
    while (reg.lastIndex < ifExpression.length) {
        if (inc++ > 100) throw new Error("请不要在if表达式中使用太多的条件!");
        if (reg.lastIndex < savedIndex) break;
        run();
    }
    var beforeRepeat = [], afterRepeat = [];
    rest.forEach(function (result) {
        var match = false;
        result.replace(variableReg, function (variable) {
            var name = /^[^\.\?\s]+/.exec(variable)[0];
            if (name) {
                name = name.replace(/\s/g, '');
                if (name === repeater.srcName || name === repeater.itemName || name === repeater.indexName) {
                    match = true;
                }
            }
        });
        if (match) {
            afterRepeat.push(result);
        } else {
            beforeRepeat.push(result);
        }
    });
    return {
        before: beforeRepeat.filter(a => !!a),
        after: afterRepeat.filter(a => !!a)
    };
};

var createStructure = function ({ name: ifkey, value: ifexp } = {}, { name: forkey, value: repeat } = {}, context) {
    var element = this;
    if (!ifexp) return structures.repeat.call(element, [context, repeat]);
    if (!repeat) return structures.if.call(element, [context, ifexp]);
    var { before, after } = parseIfWithRepeat(ifexp, repeat);
    if (!after.length) {
        element.removeAttribute(ifkey);
    } else {
        element.setAttribute(ifkey, after.join("&&"));
    }

    if (before.length > 0) {
        // 懒渲染
        createIf.call(element, [context, before.join("&&")], null);
    } else {
        element.removeAttribute(forkey);
        createRepeat.call(element, [context, repeat], null);
    }
};

var structures = {
    "if"(search) {
        createIf.call(this, search);
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
var changed = function () {
    if (!this.dirty) this.dirty = true, this.setAttribute('dirty', '');
};
var directives = {
    src(search) {
        var getter = createGetter(search).bind(this);
        var savedValue, savedOrigin, pending;
        var refresh = function () {
            that.src = savedValue;
            removeClass(that, "pending");
            pending = 0;
        };
        var img = document.createElement("img");
        var that = this;
        this.renders.push(function () {
            var origin = getter();
            var temp = origin;
            if (origin instanceof Array) {
                temp = extend([], origin);
            } else if (isObject(origin)) {
                temp = extend({}, origin);
            } else if (isEmpty(origin)) {
                temp = "";
            }
            var changes = getChanges(temp, savedValue);
            if (!changes) return;
            savedOrigin = origin;
            savedValue = temp;
            if (/^img$/i.test(this.tagName)) {
                this.setAttribute("src", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQYV2NgAAIAAAUAAarVyFEAAAAASUVORK5CYII=");
                if (!isString(origin)) {
                    return;
                }
                if (origin) {
                    img.src = origin;
                    if (img.complete) {
                        this.src = origin;
                    } else if (!pending) {
                        addClass(this, "pending");
                        pending = setTimeout(refresh);
                    }
                }
            } else {
                this.src = origin;
                cast(this, origin);
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
            if (isNode(value) || isArray(value)) {
                if (value !== this.firstChild) {
                    remove(this.childNodes);
                    appendChild(this, value);
                }
            } else {
                if (text(this) !== value) text(this, value);
            }
        });
    },
    model(search) {
        var getter = createGetter(search).bind(this);
        var oldValue;
        var getstr = this.getValue instanceof Function ? "this.getValue()" : "";
        var setter = this.setValue instanceof Function ? function () {
            var value = getter();
            if (value === undefined) value = "";
            if (deepEqual(oldValue, value)) return;
            oldValue = value;
            this.setValue(value);
        } : null;
        if (/^input$/i.test(this.tagName) && /^checkbox$/i.test(this.type) || /^checkbox$/i.test(this.tagName)) {
            this.renders.push(setter || function () {
                var value = getter();
                if (value === undefined) value = "";
                if (deepEqual(oldValue, value)) return;
                oldValue = value;
                this.checked = value;
            });
            var change = new Function(`${search[0]}with(this.$scope)${search[1]}=${getstr || "this.checked"}`).bind(this);
        } else if (("value" in this || this.getValue instanceof Function) && this.setValue instanceof Function) {
            this.renders.push(setter || function () {
                var value = getter();
                if (value === undefined) value = "";
                if (deepEqual(oldValue, value)) return;
                oldValue = value;
                if ((this.getValue instanceof Function ? this.getValue() : this.value) !== value) this.setValue(value);
            });
            var change = new Function(`${search[0]}with(this.$scope)${search[1]}=${getstr || "this.value"}`).bind(this);
        } else if (/^(select|input|textarea)$/i.test(this.tagName) || "value" in this) {
            this.renders.push(setter || function () {
                var value = getter();
                if (value === undefined) value = "";
                if (deepEqual(oldValue, value)) return;
                oldValue = value;
                if (this.value !== value) this.value = value;
            });
            var change = new Function(`${search[0]}with(this.$scope)${search[1]}=${getstr || "this.value"}`).bind(this);
        } else {
            this.renders.push(setter || function () {
                var value = getter();

                if (value === undefined) value = "";
                if (deepEqual(oldValue, value)) return;
                oldValue = value;
                if (html(this) !== value) html(this, value);
            });
            var change = new Function("html", `${search[0]}with(this.$scope)${search[1]}=${getstr || "'value' in this?this.value:html(this)"}`).bind(this, html);
        }
        var onchange = change;
        eventsHandlers.map(on => on(this, onchange));
        eventsHandlers.map(on => on(this, changed));
    },
    hide(search) {
        var getter = createGetter(search).bind(this);
        var oldValue;
        this.renders.push(function () {
            var value = !!getter();
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
            var value = !!getter();
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
            } else if (isObject(className)) {
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
            css(this, stylesheet);
        });
    }
};
// property binder
var binders = {
    _(attr, search) {
        attr = attr.replace(/\-(\w)/g, (_, w) => w.toUpperCase());
        var getter = createGetter(search).bind(this);
        var oldValue;
        this.renders.push(function () {
            var value = getter();
            if (deepEqual(value, oldValue)) return;
            oldValue = value;
            if (this[attr] !== value) {
                this[attr] = this[attr.replace(/\-[a-z]/g, a => a.toUpperCase())] = value;
            }
        });
    },
    ""(attr, search) {
        var getter = createGetter(search).bind(this);
        var oldValue;
        this.renders.push(function () {
            var value = getter();
            if (deepEqual(value, oldValue)) return;
            oldValue = value;
            if (value === true || value === '') {
                if (!this.hasAttribute(attr)) {
                    this.setAttribute(attr, '');
                }
            } else if (value === false || value === null) {
                if (this.hasAttribute(attr)) {
                    this.removeAttribute(attr);
                }
            } else if (this.getAttribute(attr) !== value) this.setAttribute(attr, value);
        });
    }
};
var emiters = {
    on(key, search) {
        var getter = createGetter(search, false);
        on(key)(this, function (e) {
            getter.call(this, e);
            digest();
        });
    },
    once(key, search) {
        var getter = createGetter(search, false);
        once(key)(this, function (e) {
            getter.call(this, e);
            digest();
        });
    }
};
emiters.v = emiters.ng = emiters.on;

function renderElement(element, scope = element.$scope, parentScopes = element.$parentScopes) {
    if (!isNode(element) && element.length) {
        return [].concat.apply([], element).map(function (element) {
            return renderElement(element, scope, parentScopes);
        });
    }
    if (!isElement(element)) {
        return element;
    }
    if (!isNumber(element.renderid)) {
        renderStructure(element, scope, parentScopes);
    }
    var elementid = element.getAttribute("renderid") || element.getAttribute("elementid") || element.getAttribute("id");
    if (elementid) {
        if (scope[elementid]) {
            if (scope[elementid] !== element) throw new Error("同一个id不能使用两次:" + elementid);
        } else {
            scope[elementid] = element;
        }
    }
    if (element.renderid < 0) {
        return element;
    }
    var isFirstRender = !element.renderid;
    element.renderid = 1;
    var parentNode = element.parentNode;
    if (parentNode) {
        if (parentNode.renderid > 1 || parentNode.isMounted) element.renderid = 2;
    }
    var ons = [];

    if (isFirstRender) {
        var attrs = [].concat.apply([], element.attributes);
        var { tagName, parentNode, nextSibling } = element;
        // 替换元素
        if (!scope[tagName]) tagName = tagName.toLowerCase();
        if (!scope[tagName])
            tagName = tagName.replace(/(?:^|\-+)([a-z])/ig, (_, w) => w.toUpperCase());
        if (!scope[tagName]) tagName = tagName.slice(0, 1).toLowerCase() + tagName.slice(1);
        var createReplacer = scope[tagName] || presets[tagName];
        if (isFunction(createReplacer)) {
            var attrsMap = {};
            var replacer = createReplacer.call(scope, element);
            if (isNode(replacer) && element !== replacer) {
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
                            if (!/[\-@\:\._]/.test(name)) {
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
    element.renders = element.renders ? [].concat(element.renders) : [];
    var withContext = parentScopes ? parentScopes.map((_, cx) => `with(this.$parentScopes[${cx}])`).join("") : '';
    var emiter_reg = /^(?:(v|ng|on|once)\-|v\-on\:|@|once|on)/i;
    attrs.map(function (attr) {
        var { name, value } = attr;
        if (/^(?:class|style|src)$/i.test(name)) return;
        var key = name.replace(/^(ng|v|.*?)\-/i, "").toLowerCase();
        if (directives.hasOwnProperty(key) && isFunction(directives[key])) {
            directives[key].call(element, [withContext, value]);
            element.removeAttribute(name);
        } else if (emiter_reg.test(name)) {
            var match = emiter_reg.exec(name);
            var ngon = (match[1] || match[0]).toLowerCase() === 'once' ? 'once' : 'on';
            element.removeAttribute(name);
            ons.push([emiters[ngon], name.replace(emiter_reg, ''), value]);
        } else if (/^([\_\:\.]|v\-bind\:)/.test(name)) {
            binders._.call(element, name.replace(/^([\_\:\.]|v\-bind\:)/, ""), [withContext, value]);
            element.removeAttribute(name);
        } else if (/[_@\:\.]$/.test(name)) {
            binders[""].call(element, name.replace(/[_@\:\.]$/, ""), [withContext, value]);
            element.removeAttribute(name);
        } else {
            name = name.replace(/\-(\w)/g, (_, w) => w.toUpperCase());
            try {
                element[name] = value === '' ? true : value;
            } catch (e) {
            }
        }
    });
    rebuild(element);
    ons.forEach(([on, key, value]) => on.call(element, key, [withContext, value]));
    if (element.renders.length) {
        onappend(element, addRenderElement);
        onremove(element, removeRenderElement);
        if (element.isMounted || element.renderid > 1) addRenderElement.call(element);
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
    attrs = attrs.filter(a => structures.hasOwnProperty(a.name.replace(/^(ng|V|.*?)\-/i, '').toLowerCase()));
    var types = {};
    if (attrs.length > 2) throw new Error(`请不要在同一元素上使用三次及以上的结构属性:${attrs.map(a => a.name)}`);
    attrs.map(function (attr) {
        var { name } = attr;
        var key = name.replace(/^(ng|v|.*?)\-/i, "").toLowerCase();
        if (structures.hasOwnProperty(key) && isFunction(structures[key])) {
            if (element.renderid <= -2) {
                if (/^if$/i.test(key)) {
                    if (types.if) {
                        throw new Error(`请不要在同一元素上使用多次if结构!`);
                    }
                } else {
                    if (types.repeat) {
                        throw new Error(`请不要在同一元素上使用多次repeat类型的属性!`);
                    }
                }
            }
            if (/^if$/i.test(key)) {
                types.if = attr;
            } else {
                types.repeat = attr;
            }
            if (!element.renderid) element.renderid = -1;
            else element.renderid = -2;
            element.removeAttribute(name);
        }
    });
    if (element.renderid <= -1) createStructure.call(element, types.if, types.repeat, withContext);
}
function render(element, scope, parentScopes) {
    return renderElement(element, scope, parentScopes);
}

var digest = lazy(refresh);
render.digest = render.apply = render.refresh = digest;
render.parseRepeat = parseRepeat;
var eventsHandlers = "fullscreenchange,change,click,paste,resize,keydown,keypress,keyup,input,drop".split(",").map(k => on(k));
eventsHandlers.map(on => on(window, digest));
on("render")(window, digest);
var register = function (key, creater) {
    key = key.replace(/\-(\w)/, (_, a) => a.toUpperCase()).replace(/^\w/, a => a.toLowerCase());
    presets[key] = creater;
};
render.register = function (key, name) {
    if (isObject(key)) {
        for (var k in key) {
            register(k, key[k]);
        }
    } else if (arguments.length === 2) {
        register(key, name);
    }
};

var promisePrototype = Promise.prototype;
var __then = promisePrototype.then;
var __wrap = function (f) {
    if (f instanceof Function) {
        return function () {
            var res = f.apply(this, arguments);
            digest();
            return res;
        };
    }
    return f;
};
promisePrototype.then = function () {
    return __then.apply(this, [].map.call(arguments, __wrap));
};
