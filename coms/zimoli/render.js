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
var variableReg = /([^\:\,\+\=\-\!%\^\|\/\&\*\!\;\?\>\<~\{\}\s\[\]\(\)]|\?\s*\.(?=[^\d])|\s*\.\s*)+/g;
var createGetter = function (search, isprop = true) {
    var [withContext, searchContext] = search;
    if (!searchContext) return function () { };
    var ret = /\;/.test(searchContext) ? "" : "return ";
    searchContext = renderExpress(searchContext);
    if (isprop) {
        return new Function('event', `${withContext}with(this.$scope){${ret}${searchContext}}`);
    }
    return new Function("event", `${withContext}with(this.$scope){${/([\=\(\+\-])/.test(searchContext) ? ret + searchContext : `${ret}${searchContext}.call(this.$scope,event)`}}`);
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
        /^(?:let\b|var\b|const\b)?\s*(?:[\(\{\[]\s*)?(.+?)((?:\s*,\s*.+?)*)?(?:\s*[\)\}\]]\s*|\s+)(in|of)\s+(.+?)(?:\s+track\s*by\s+(.+?))?$/i;
    var res = reg.exec(expression);
    if (!res) return res;
    var [_, i, k, r, s, t] = res;
    var keyName, itemName, indexName, trackBy = t, srcName = renderExpress(s);
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
    if (!res) throw new Error(`不能识别循环表达式: ${expression} `);
    var { keyName, itemName, indexName, srcName, trackBy } = res;
    // 懒渲染
    var getter = createGetter([context, srcName]).bind(this);
    var element = this, clonedElements = [], savedValue, savedOrigin;
    var renders = [function () {
        var result = getter();
        var origin = result;
        result = extend(result instanceof Array ? [] : {}, result);
        if (savedOrigin === origin && deepEqual.shallow(savedValue, result)) return;
        var changes = getChanges(result, savedValue);
        if (!changes) return;
        savedValue = result;
        savedOrigin = origin;
        var isArrayResult = result instanceof Array;
        var keys = isArrayResult ? result.map((_, i) => i) : Object.keys(result);
        if (keys.length > 600) {
            throw new Error("数据量过大，取消绘制！");
        }
        var $parentScopes = element.$parentScopes || [];
        var $struct = element.$struct;
        if (element.$scope) {
            $struct = Object.assign({}, $struct, { context: $struct.context + `with(this.$parentScopes[${$parentScopes.length}])` }), $parentScopes = $parentScopes.concat(element.$scope);
        }
        var clonedElements1 = Object.create(null);
        var cloned = keys.map(function (key, cx) {
            var k = isArrayResult ? cx : key;
            var $scope = {
                [keyName || '$key']: k,
                [itemName || '$item']: result[k],
                [indexName || '$index']: cx
            };
            if (trackBy) {
                k = seek($scope, trackBy);
                if (clonedElements[k]) {
                    clonedElements[k].$scope = $scope;
                    return clonedElements1[k] = clonedElements[k];
                }
            }
            else {
                var c = changes[k];
                if (clonedElements[k]) if (!c || !isObject(c.previous) && !isObject(c.current)) return clonedElements1[k] = clonedElements[k];
            }
            var clone = element.cloneNode();
            clone.innerHTML = element.innerHTML;
            clone.renderid = id;
            clone.$parentScopes = $parentScopes;
            clone.$scope = $scope;
            clone.$parentScopes = $parentScopes;
            clone.$struct = $struct;
            clone = render(clone, $scope, clone.$parentScopes);
            clonedElements1[k] = clone;
            return clone;
        }, this);
        var last = this;
        cloned.forEach(function (a, cx) {
            if (a.previousSibling !== last) appendChild.after(last, a);
            last = a;
        }, this);
        for (var k in clonedElements) {
            if (clonedElements1[k] !== clonedElements[k]) remove(clonedElements[k]);
        }
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
    var p = element;
    if (p.parentNode) {
        p = p.parentNode;
        for (var cx = 0, dx = if_top.length; cx < dx; cx++) {
            if (if_top[cx].parent === p) {
                break;
            }
        }
    }
    cx++;
    if (cx > 0) if_top.splice(cx, if_top.length - cx);
    var elements = [element, getter];
    if_top.push(elements);
    var savedValue;
    var renders = [function () {
        var shouldMount = -1;
        for (var cx = 0, dx = elements.length; cx < dx; cx += 2) {
            var getter = elements[cx + 1];
            if (!getter || getter()) {
                shouldMount = cx;
                break;
            }
        }
        if (savedValue === shouldMount) return;
        savedValue = shouldMount;
        for (var cx = 0, dx = elements.length; cx < dx; cx += 2) {
            var element = elements[cx];
            if (cx === shouldMount) {
                appendChild.before(this, element);
                element.with = this;
                if (element.renderid < 0) {
                    element.renderid = id;
                    var w = element.with;
                    delete element.with;
                    element = render(element);
                    element.with = w;
                }
            }
            else {
                delete element.with;
                remove(element);
            }
        }

    }];
    if (this.parentNode) {
        elements.parent = this.parentNode;
        initialComment.call(this, renders, "if", search[1]);
    } else {
        once("append")(this, initialComment.bind(this, renders, "if", search[1]));
    }
};
var parseIfWithRepeat = function (ifExpression, repeatExpression) {
    var repeater = parseRepeat(repeatExpression);
    if (!repeater) {
        throw new Error(`不能识别循环表达式：${repeat}`);
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

var createStructure = function ({ name: ifkey, key, value: ifexp } = {}, { name: forkey, value: repeat } = {}, context) {
    var element = this;
    if (!ifkey) return element.removeAttribute(forkey), structures.repeat.call(element, [context, repeat]);
    if (!repeat) return element.removeAttribute(ifkey), structures[key].call(element, [context, ifexp]);
    if (!ifexp) {
        element.removeAttribute(ifkey);
        return structures[key].call(element, [context, ifexp]);
    }
    var { before, after } = parseIfWithRepeat(ifexp, repeat);
    element.removeAttribute(ifkey);
    if (after.length) {
        element.setAttribute("a-if", after.join("&&"));
    }
    if (before.length > 0) {
        // 懒渲染
        createIf.call(element, [context, before.join("&&")], null);
    } else {
        element.removeAttribute(forkey);
        createRepeat.call(element, [context, repeat], null);
    }
};

var if_top = [];
var structures = {
    "if"(search) {
        createIf.call(this, search);
    },
    "else"(search) {
        var top = if_top[if_top.length - 1];
        if (!top || top.parent !== this.parentNode) {
            throw new Error("else/elseif前缺少同级if！");
        }
        if (search && search[1]) {
            var getter = createGetter(search).bind(this);
        }
        top.push(this, getter);
        remove(this);
    },
    repeat(search) {
        createRepeat.call(this, search);
    },
};
structures["else-if"] = structures.elseif = structures.else;
structures["for-each"] = structures.foreach = structures.for = structures.each = structures.repeat;
var createBinder = function (binder) {
    return function (search) {
        var getter = createGetter(search).bind(this);
        var oldValue;
        this.renders.push(function () {
            var value = getter();
            if (deepEqual.shallow(value, oldValue)) return;
            oldValue = value;
            if (isNode(value) || isArray(value)) {
                if (value !== this.firstChild) {
                    remove(this.childNodes);
                    appendChild(this, value);
                }
            } else {
                if (isEmpty(value)) value = '';
                if (binder(this) !== value) binder(this, value);
            }
        });

    }
}

var src2 = function (search) {
    var getter = createGetter(search).bind(this);
    var savedValue;
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
        if (!changes || isEmpty(origin) && isEmpty(this.src)) return;
        savedValue = temp;
        this.src = origin;
        cast(this, origin);
    });
}
var directives = {
    bind: createBinder(text),
    html: createBinder(html),
    hide: createBinder(function (elem, value) {
        if (arguments.length === 1) return elem.style.display === 'none';
        elem.style.display = value ? 'none' : '';
    }),
    show: createBinder(function (elem, value) {
        if (arguments.length === 1) return elem.style.display !== 'none';
        elem.style.display = value ? '' : 'none';
    }),
    style: createBinder(css),
    src([s, src]) {
        var parsedSrc = this.$src;
        return src2.call(this, [s, parsedSrc ? parsedSrc.srcName : src]);
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
};
directives.text = directives.bind;
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
            var res = getter.call(this, e);
            if (res && isFunction(res.then)) res.then(digest, digest);
            digest();
            return res;
        });
    },
    once(key, search) {
        var getter = createGetter(search, false);
        once(key)(this, function (e) {
            var res = getter.call(this, e);
            if (res && isFunction(res.then)) res.then(digest, digest);
            digest();
            return res;
        });
    }
};
emiters.v = emiters.ng = emiters.on;

function getFromScopes(key, scope, parentScopes) {
    if (key in scope) {
        return scope[key];
    }
    if (parentScopes) for (var cx = parentScopes.length - 1; cx >= 0; cx--) {
        var o = parentScopes[cx];
        if (key in o) {
            return o[key];
        }
    }
    if (key in presets) {
        return presets[key];
    }
}

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

    if (isFirstRender) {
        element.renders = element.renders ? [].concat(element.renders) : [];
        var { ons, copys, attrs, props, binds, context: withContext } = element.$struct;
        delete element.$struct;
        if (binds.src) {
            element.$src = parseRepeat(binds.src);
        }
        var { tagName, parentNode, nextSibling } = element;
        // 替换元素
        var constructor = getFromScopes(tagName, scope, parentScopes);
        if (!constructor) {
            tagName = tagName.toLowerCase();
            constructor = getFromScopes(tagName, scope, parentScopes);
        }
        if (!constructor) {
            tagName = tagName.replace(/(?:^|\-+)([a-z])/ig, (_, w) => w.toUpperCase());
            constructor = getFromScopes(tagName, scope, parentScopes);
        }
        if (isFunction(constructor)) {
            var replacer = constructor.call(scope, element, scope, parentScopes);
            if (isNode(replacer) && element !== replacer) {
                if (nextSibling) appendChild.before(nextSibling, replacer);
                else if (parentNode) appendChild(parentNode, replacer);
                if (element.parentNode === parentNode) remove(element);
                copys.forEach(function (attr) {
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
                            replacer.setAttribute(name, value);
                    }
                });
                replacer.renderid = element.renderid;
                replacer.renders = element.renders;
                if (binds.src) replacer.$src = element.$src;
                element = replacer;
                element.$scope = scope;
                element.$parentScopes = parentScopes;
            }
        }
    }
    if (element.children.length) renderElement(element.children, scope, parentScopes);
    if (!isFirstRender) return element;
    for (var k in binds) {
        if (directives.hasOwnProperty(k)) {
            directives[k].call(element, [withContext, binds[k]])
        }
        else {
            binders._.call(element, k, [withContext, binds[k]]);
        }
    }
    for (var k in attrs) {
        binders[""].call(element, k, [withContext, attrs[k]]);
    }
    for (var k in props) {
        try {
            element[k] = props[k];
        } catch (e) { }
    }
    ons.forEach(([on, key, value]) => on.call(element, key, [withContext, value]));
    if (element.renders.length) {
        rebuild(element);
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
    var types = {};
    var emiter_reg = /^(?:(v|ng|on|once)\-|v\-on\:|@|once|on)/i;
    var ons = [];
    var copys = [];
    var binds = {};
    var attr1 = {};
    var props = {};
    for (var attr of attrs) {
        var { name, value } = attr;
        if (/^(?:class|style|src|\:|placeholder)$/i.test(name)) {
            copys.push(attr);
            continue;
        }
        var key = name.replace(/^(ng|v|.*?)\-/i, "").toLowerCase();
        if (structures.hasOwnProperty(key) && isFunction(structures[key])) {
            if (element.renderid <= -2) {
                if (/^if$|^else/i.test(key)) {
                    if (types.if) {
                        throw new Error(`暂不支持在同一元素上使用多次if结构!`);
                    }
                } else {
                    if (types.repeat) {
                        throw new Error(`暂不支持在同一元素上使用多次repeat类型的属性!`);
                    }
                }
            }
            if (/^if$|^else/i.test(key)) {
                types.if = attr;
                attr.key = key;
            }
            else {
                types.repeat = attr;
            }
            if (!element.renderid) element.renderid = -1;
            else element.renderid = -2;
            continue;
        }
        if (element.$struct) continue;
        var key = name.replace(/^(ng|v|.*?)\-|^[\:\_\.]|^v\-bind\:/i, "").toLowerCase();
        if (directives.hasOwnProperty(key) || /^([\_\:\.]|v\-bind\:)/.test(name)) {
            binds[key] = value;
            element.removeAttribute(name);
        }
        else if (emiter_reg.test(name)) {
            var match = emiter_reg.exec(name);
            var ngon = (match[1] || match[0]).toLowerCase() === 'once' ? 'once' : 'on';
            element.removeAttribute(name);
            ons.push([emiters[ngon], name.replace(emiter_reg, ''), value]);
        }
        else if (/[_@\:\.]$/.test(name)) {
            attr1[name.replace(/[_@\:\.]$/, "")] = value;
            element.removeAttribute(name);
        }
        else {
            props[name.replace(/\-(\w)/g, (_, w) => w.toUpperCase())] = value === "" ? true : value;
        }
    }
    if (!element.$struct) element.$struct = { ons, copys, binds, attrs: attr1, props, context: withContext };
    if (element.renderid <= -1) createStructure.call(element, types.if, types.repeat, withContext);
}
function render(element, scope, parentScopes) {
    var if_top_length = if_top.length;
    var e = renderElement(element, scope, parentScopes);
    if (if_top_length < if_top.length) if_top.splice(if_top_length, if_top.length - if_top_length);
    return e;
}

var digest = lazy(refresh, -{});
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
