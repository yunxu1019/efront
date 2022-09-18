var hasOwnProperty = {}.hasOwnProperty;
var renderElements = Object.create(null);
var presets = Object.create(null);
var createTemplateNodes = function (text) {
    var node = document.createElement(this.parentNode.tagName || "div");
    node.innerHTML = text;
    remove(this.with);
    this.with = [].slice.call(node.childNodes, 0);
    appendChild.after(this, this.with);
    this.with = renderElement(this.with, this.$scope, this.$parentScopes, this.renderid === 9);
};
presets.template = function (t) {
    var comment = document.createComment('template');
    comment.$scope = t.$scope;
    comment.$parentScopes = t.$parentScopes;
    if (!t.innerHTML) {
        care(comment, createTemplateNodes)
    }
    else {
        once("append")(comment, function () {
            createTemplateNodes.call(comment, t.innerHTML);
        });
    }
    return comment;
};
if (!isProduction) window.renderElements = renderElements;
var renderidOffset = 10;
var renderidClosed = 0;
var addRenderElement = function () {
    var element = this;
    if (!isNode(element)) return;
    if (element.renderid !== 9) {
        // 只渲染一次
        if (element.renderid < 10 && element.renderid > 0) element.renderid = ++renderidOffset;
        renderElements[element.renderid] = element;
    }
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
    return new Function("event", `${withContext}with(this.$scope){${/([\=\(\+\-])/.test(searchContext) ? ret + searchContext : `${ret}${searchContext}(event)`}}`);
};
var createComment = function (renders, type, expression) {
    var comment = document.createComment(`${type} ${expression}`);
    comment.renders = renders;
    comment.$scope = this.$scope;
    comment.$struct = this.$struct;
    comment.$parentScopes = this.$parentScopes;
    if (this.parentNode) {
        appendChild.after(this, comment);
        if (!/^if|^else/i.test(type)) remove(this);
    }
    comment.template = this;
    return comment;
};

var initialComment = function (comment) {
    if (!comment.$struct.once) {
        comment.renderid = ++renderidOffset;
        onmounted(comment, addRenderElement);
        onremove(comment, removeRenderElement);
        if (isMounted(comment) || eagermount) rebuild(comment);
    }
    else {
        comment.renderid = 9;
        rebuild(comment);
        remove(comment);
    }
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
            $struct = extend({}, $struct, { context: $struct.context + `with(this.$parentScopes[${$parentScopes.length}])` }), $parentScopes = $parentScopes.slice(), $parentScopes.push(element.$scope);
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
            clone.$scope = $scope;
            clone.$parentScopes = $parentScopes;
            clone.$struct = $struct;
            clonedElements1[k] = clone;
            return clone;
        }, this);
        var last = this;
        cloned.forEach(function (a, cx) {
            if (a.previousSibling !== last) appendChild.after(last, a);
            last = a;
        }, this);
        cloned.forEach(a => render(a));
        for (var k in clonedElements) {
            if (clonedElements1[k] !== clonedElements[k]) remove(clonedElements[k]);
        }
        clonedElements = clonedElements1;
        this.with = cloned;
    }];
    var comment = createComment.call(this, renders, 'repeat', expression);
    initialComment(comment);
    return comment;
};
var initIf = function (ifs) {
    for (var s of ifs) {
        initialComment(s[0]);
    }
};
var createIf = function (search, id = 0) {
    // 懒渲染
    var getter = createGetter(search).bind(this);
    var element = this;
    var elements = [element, getter];
    if_top.push(elements);
    var savedValue;
    elements.parent = this.parentNode;
    elements.comment = search[1];
    elements.renders = [function () {
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
            var c = elements[cx];
            if (cx === shouldMount) {
                var e = c.template;
                appendChild.after(c, e);
                if (e.renderid < 0) {
                    e.renderid = id;
                    e = c.$template = render(e, this.$scope, this.$parentScopes);
                    e.$comment = c;
                }
            }
            else {
                remove(c.template);
            }
        }

    }];
    return elements[0] = createComment.call(element, elements.renders, 'if', elements.comment);
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
    if (savedIndex < ifExpression.length) rest.push(ifExpression.slice(savedIndex))
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
        return createIf.call(element, [context, before.join("&&")], null);
    } else {
        element.removeAttribute(forkey);
        return createRepeat.call(element, [context, repeat], null);
    }
};

var if_top = [];
var structures = {
    "if"(search) {
        return createIf.call(this, search);
    },
    "else"(search) {
        for (var cx = if_top.length - 1; cx >= 0; cx--) {
            if (if_top[cx].parent === this.parentNode) break;
        }
        if (cx < 0) {
            throw new Error("else/elseif前缺少同级if！");
        }
        initIf(if_top.splice(cx + 1, if_top.length - cx - 1));
        var top = if_top[cx];
        if (search && search[1]) {
            var getter = createGetter(search).bind(this);
        }
        var comment = createComment.call(this, undefined, search[1] ? 'elseif' : 'else', search[1]);
        top.push(comment, getter);
    },
    repeat(search) {
        return createRepeat.call(this, search);
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
        if (!changes || isEmpty(origin) && isEmpty(this.src) && isEmpty(savedValue)) return;
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
        var setter2 = function (key) {
            var value = getter();
            if (value === undefined) value = "";
            if (deepEqual(oldValue, value)) return;
            oldValue = value;
            this[key] = value;
        };
        if (/^input$/i.test(this.tagName) && /^checkbox$/i.test(this.type) || /^checkbox$/i.test(this.tagName)) {
            this.renders.push(setter || setter2.bind(this, 'checked'));
            var change = new Function(`${search[0]}with(this.$scope)${search[1]}=${getstr || "this.checked"}`).bind(this);
        } else if (("value" in this || this.getValue instanceof Function) && this.setValue instanceof Function) {
            this.renders.push(setter);
            var change = new Function(`${search[0]}with(this.$scope)${search[1]}=${getstr || "this.value"}`).bind(this);
        } else if (/^(select|input|textarea)$/i.test(this.tagName) || "value" in this) {
            this.renders.push(setter || setter2.bind(this, 'value'));
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
        setter2 = null;
        var onchange = function () {
            change.call(this);
            var value = getter();
            if (value === oldValue) {
                return;
            }
            oldValue = value;
            change.call(this, value);
            userChanged = true;
        };
        eventsBinders.forEach(on => on(this, onchange, true));
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
var reject = function (e) { digest(); throw e };
var createEmiter = function (on) {
    return function (key, search) {
        var parsedSrc = this.$src;
        var getter0 = createGetter(search, false), getter1;
        if (parsedSrc) {
            var scopes = this.$parentScopes;
            search = search.slice();
            search[0] += `with(this.$parentScopes[${scopes.length}])`;
            getter1 = createGetter(search, false);
        }
        var onkey;
        if (key === 'mounted' || key === 'mount') {
            onkey = on === once ? oncemount : onmounted;
        }
        else if (key === 'wheel' || key === 'mousewheel') {
            onkey = on === once ? once.emit.bind(null, onmousewheel) : onmousewheel;
        }
        else {
            onkey = on(key);
        }
        onkey(this, function (e) {
            digest();
            if (parsedSrc) {
                var target = e.currentTarget || e.target;
                var scopes = target && target.$parentScopes;
                if (scopes) {
                    var scope = null;
                    for (var cx = scopes.length - 1; cx >= 0; cx--) {
                        var s = scopes[cx];
                        if (s === this.$scope) {
                            scope = scopes[cx + 1];
                            break;
                        }
                    }
                }
                if (!scope && target.$scope !== this.$scope) scope = target.$scope;
            }
            var res;
            if (scope) {
                var temp = this.$scope;
                this.$parentScopes.push(temp);
                this.$scope = scope;
                res = getter1.call(this, e);
                this.$parentScopes.pop();
                this.$scope = temp;
            }
            else {
                res = getter0.call(this, e);
            }
            if (res && isFunction(res.then)) res.then(digest, reject);
            return res;
        });
    };
};
var emiters = {
    on: createEmiter(on),
    once: createEmiter(once),
};
emiters.v = emiters.ng = emiters.on;

function getFromScopes(key, scope, parentScopes) {
    if (scope) if (key in scope) {
        return scope[key];
    }
    if (parentScopes) for (var cx = parentScopes.length - 1; cx >= 0; cx--) {
        var o = parentScopes[cx];
        if (o && key in o) {
            return o[key];
        }
    }
    if (key in presets) {
        return presets[key];
    }
}

function renderElement(element, scope = element.$scope, parentScopes = element.$parentScopes, once) {
    if (!isNode(element) && element.length) {
        return Array.prototype.concat.apply([], element).map(function (element) {
            return renderElement(element, scope, parentScopes, once);
        });
    }
    if (!isElement(element)) {
        return element;
    }
    if (!isNumber(element.renderid)) {
        let element1 = renderStructure(element, scope, parentScopes, once);
        if (element1 !== element) {
            element = element1;
        }
        if (!element) return;
    }
    if (element.renderid < 0 || element.nodeType !== 1) {
        return element;
    }
    var elementid = element.getAttribute("renderid") || element.getAttribute("elementid") || element.getAttribute("id");
    if (elementid) {
        if (scope[elementid] && scope[elementid] !== element) throw new Error("同一个id不能使用两次:" + elementid);
        scope[elementid] = element;
    }
    var isFirstRender = !element.renderid;

    if (isFirstRender) {
        element.renderid = 1;
        var parentNode = element.parentNode;
        if (parentNode) {
            if (parentNode.renderid > 1 || isMounted(parentNode)) element.renderid = 2;
        }
        element.renders = element.renders ? [].concat(element.renders) : [];
        var { ons, copys, attrs, props, binds, context: withContext, ids, once } = element.$struct;
        if (once) element.renderid = 9;
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
                var renders = element.renders;
                if (replacer.renders) renders = renders.concat(replacer.renders);
                replacer.renders = renders;
                if (binds.src) replacer.$src = element.$src;
                element = replacer;
                element.$scope = scope;
                element.$parentScopes = parentScopes;
            }
        }
    }
    if (element.children && element.children.length) renderElement(element.children, scope, parentScopes, once);
    if (!isFirstRender) return element;
    var renders = element.renders;
    element.renders = [];
    for (var k in binds) {
        if (k === 'src') continue;
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
            if (element[k] !== props[k]) element[k] = props[k];
        } catch (e) { }
    }
    if (binds.src) directives.src.call(element, [withContext, binds.src]);
    ons.forEach(([on, key, value]) => on.call(element, key, [withContext, value]));
    if (renders.length) element.renders.push.apply(element.renders, renders);
    if (element.renders.length) {
        if (element.renderid !== 9) {
            onmounted(element, addRenderElement);
            onremove(element, removeRenderElement);
            if (isMounted(element) || element.renderid > 1) addRenderElement.call(element);
            else if (eagermount) rebuild(element);
        }
        else {
            rebuild(element);
        }
    }
    if (elementid) scope[elementid] = element;
    for (var id of ids) {
        scope[id] = element;
    }
    return element;
}
function renderStructure(element, scope, parentScopes = [], once) {
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
    var emiter_reg = /^(?:(v|ng|on|once)?\-|v\-on\:|@|once|on)/i;
    var ons = [];
    var copys = [];
    var binds = {};
    var attr1 = {};
    var props = {};
    var ids = [];
    for (var attr of attrs) {
        var { name, value } = attr;
        if (/^#/.test(name)) {
            ids.push(name.slice(1));
            element.removeAttribute(name);
            continue;
        };
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
        // ng-html,ng-src,ng-text,ng-model,ng-style,ng-class,...
        var key = name.replace(/^(ng|v|[^\_\:\.]*?)\-|^[\:\_\.]|^v\-bind\:/i, "").toLowerCase();
        if (directives.hasOwnProperty(key) || /^([\_\:\.]|v\-bind\:)/.test(name)) {
            binds[key] = value;
            element.removeAttribute(name);
        }
        // ng-click on-click v-click @click @mousedown ...
        else if (emiter_reg.test(name)) {
            var match = emiter_reg.exec(name);
            var ngon = (match[1] || match[0]).toLowerCase() === 'once' ? 'once' : 'on';
            element.removeAttribute(name);
            ons.push([emiters[ngon], name.replace(emiter_reg, ''), value]);
        }
        // placeholder_ href_ checked_ ...
        else if (/[_@\:\.]$/.test(name)) {
            attr1[name.replace(/[_@\:\.]$/, "")] = value;
            element.removeAttribute(name);
        }
        // title alt name type placeholder href checked ...
        else {
            if (!/\-/.test(name) || value === '') {
                copys.push(attr);
            }
            var k = name.replace(/\-(\w)/g, (_, w) => w.toUpperCase());
            if (!(k in element)) {
                props[k] = value === "" ? true : value;
            }
            else {
                props[k] = element[k];
            }
        }
    }
    if (props["zimoli"] || props["fresh"] || props["once"]) once = true;
    else if (props["refresh"] || props["digest"] || props["mount"]) once = false;
    if (!element.$struct) element.$struct = { ons, copys, binds, attrs: attr1, props, context: withContext, ids, once };
    if (element.renderid <= -1) return createStructure.call(element, types.if, types.repeat, withContext);
    return element;
}
var eagermount = false, renderlock = false;
function render(element, scope, parentScopes, lazy = true) {
    var if_top_length = if_top.length;
    var haslock = false;
    if (isFinite(scope) && arguments.length === 2) lazy = scope, scope = undefined;
    else if (isFinite(parentScopes) && arguments.length === 3) lazy = parentScopes, parentScopes = undefined;
    var renderonce = lazy === 0;
    if (!renderlock) {
        haslock = true;
        renderlock = true;
        eagermount = !+lazy;
    }
    var e = renderElement(element, scope, parentScopes, renderonce);
    if (haslock) {
        renderlock = false;
        eagermount = false;
    }
    if (if_top_length < if_top.length) initIf(if_top.splice(if_top_length, if_top.length - if_top_length));
    return e;
}
var digest = lazy(refresh, -{});
render.digest = render.apply = render.refresh = digest;
render.parseRepeat = parseRepeat;
var eventsBinders = "fullscreenchange,resize,load,change,click,paste,resize,keydown,keypress,keyup,input,drop".split(",").map(k => on(k));
var userChanged = false;
eventsBinders.splice(0, 3).forEach(on => on(window, digest));
var changeListener = function () {
    if (userChanged) {
        userChanged = false;
        digest();
    }
};
eventsBinders.forEach(on => on(window, changeListener));
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
