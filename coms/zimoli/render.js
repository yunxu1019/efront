var hasOwnProperty = {}.hasOwnProperty;
var renderElements = Object.create(null);
var presets = Object.create(null);
var copyAttribute = function (node, copys) {
    for (var { name, value } of copys) switch (name.toLowerCase()) {
        case "class":
            addClass(node, value);
            break;
        case "style":
            css(node, value);
            break;
        case "src":
        case "placeholder":
            node[name] = value;
            break;
        default:
            if (isFunction(node.setAttribute)) {
                node.setAttribute(name, value);
            }
    }
}
var createTemplateNodes = function (text) {
    remove(this.with);
    if (isEmpty(text)) return;
    if (isNode(text)) {
        var node = text;
        if (isElement(node) && this.$struct.copys) {
            copyAttribute(node, this.$struct.copys);
        }
        this.with = [node];
        return;
    } else {
        var node = document.createElement(this.parentNode.tagName || "div");
        node.innerHTML = text;
        this.with = Array.apply(null, node.childNodes);
    }
    appendChild.after(this, this.with);
    this.with = renderElement(this.with, this.$scope, this.$parentScopes, this.$renderid === 9);
};
presets.template = function (t) {
    var comment = document.createComment('template');
    comment.$scope = t.$scope;
    comment.$parentScopes = t.$parentScopes;
    if (t.$struct.binds.src) {
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
    if (element.$renderid !== 9) {
        // 只渲染一次
        if (element.$renderid < 10 && element.$renderid > 0) element.$renderid = ++renderidOffset;
        renderElements[element.$renderid] = element;
    }
    rebuild(element);
};
var removeRenderElement = function () {
    var element = this;
    delete renderElements[element.$renderid];
};
function refresh(root) {
    var rest = [];
    var body = document.documentElement;
    if (root && root.$renders) {
        for (var k in renderElements) {
            var element = renderElements[k];
            if (
                getTargetIn(root, element)
            ) rebuild(element);
        }
    } else {
        for (var k in renderElements) {
            var element = renderElements[k];
            rebuild(element);
            if (!getTargetIn(body, element)) {
                rest.push(element);
            }
        }
    }
    if (rest.length) rest.forEach(a => removeRenderElement.call(a));
}
function rebuild(element) {
    if (!element.$needchanges) {
        element.$renders.forEach(a => a.call(element));
        return;
    }
    var props = {};
    Object.keys(element).forEach(function (key) {
        var data = element[key];
        props[key] = isObject(data) && !isFunction(data) && !isDate(data) && !isNode(data) ? extend(data instanceof Array ? [] : {}, data) : data;
    });
    element.$renders.forEach(a => a.call(element));
    var changes = getChanges(element, props);
    if (changes) {
        var event = createEvent('changes');
        event.changes = changes;
        dispatch(event, element);
    }
}
var variableReg = /([^\:\,\+\=\-\!%\^\|\/\&\*\!\;\?\>\<~\{\}\s\[\]\(\)]|\?\s*\.(?=[^\d])|\s*\.\s*)+/g;
var variableOnlyReg = new RegExp(`^${variableReg.source}$`);
var getScopeList = function (element) {
    return element.$parentScopes.concat([element.$scope]);
};
var createGetter = function (target, search, isprop = true) {
    if (!search) return function () { };
    if (/^\{/.test(search)) search = `(${search})`;
    search = renderExpress(search);
    var scopes = getScopeList(target);
    if (isprop) var getter = $$eval.bind(target, search, scopes);
    else if (variableOnlyReg.test(search)) getter = $$eval.bind(target, search + "(event)", scopes);
    else getter = $$eval.bind(target, search, scopes);
    getter.scopes = scopes;
    return getter;
};
var createComment = function (renders, type, expression) {
    var comment = document.createComment(`${type} ${expression}`);
    comment.$renders = renders;
    comment.$scope = this.$scope;
    comment.$struct = this.$struct;
    comment.$parentScopes = this.$parentScopes;
    if (this.parentNode) {
        appendChild.after(this, comment);
        if (!/^if|^else/i.test(type)) remove(this);
    }
    comment.$template = this;
    this.$comment = comment;
    return comment;
};

var initialComment = function (comment) {
    if (!comment.$struct.once) {
        comment.$renderid = ++renderidOffset;
        onmounted(comment, addRenderElement);
        onremove(comment, removeRenderElement);
        if (isMounted(comment) || eagermount) rebuild(comment);
    }
    else {
        comment.$renderid = 9;
        rebuild(comment);
        if (comment.with) comment.with = null;
        remove(comment);
    }
};

class Repeater {
    constructor(keyName, itemName, indexName, trackBy, srcName) {
        this.keyName = keyName || "$key";
        this.itemName = itemName || "$item";
        this.indexName = indexName || "$index";
        this.trackBy = trackBy;
        this.srcName = srcName;
    }
    createScope(item, k, i, wraped) {
        var scope = {
            $key: k,
            $item: wraped || item,
            $index: i,
        };
        if (this.keyName !== "$key") {
            scope[this.keyName] = k;
        }
        if (this.itemName !== "$item") {
            scope[this.itemName] = item;
        }
        if (this.indexName !== "$index") {
            scope[this.indexName] = i;
        }
        return scope;
    }
}

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
    return new Repeater(
        keyName,
        itemName,
        indexName,
        trackBy,
        srcName
    );
};
var createRepeat = function (search, id = 0) {
    // 懒渲染
    // throw new Error("repeat is not supported! use list component instead");
    var expression = search;
    var repeater = parseRepeat(expression);
    if (!repeater) throw new Error(i18n`不能识别循环表达式: ${expression} `);
    var { srcName, trackBy } = repeater;
    // 懒渲染
    var getter = createGetter(this, srcName);
    var element = this, clonedElements = [], savedValue, savedOrigin;
    if (this.$struct.if) id = -7;
    var renders = [function () {
        var result = getter(this);
        var origin = result;
        result = extend(result instanceof Array ? [] : {}, result);
        if (savedOrigin === origin && shallowEqual(savedValue, result)) return;
        var changes = getChanges(result, savedValue);
        if (!changes) return;
        savedValue = result;
        savedOrigin = origin;
        var isArrayResult = result instanceof Array;
        var keys = isArrayResult ? result.map((_, i) => i) : Object.keys(result);
        if (keys.length > 600) {
            throw new Error(i18n`数据量过大，取消绘制！`);
        }
        var $parentScopes = element.$parentScopes || [];
        var $struct = element.$struct;
        if (element.$scope) {
            $parentScopes = $parentScopes.slice(), $parentScopes.push(element.$scope);
        }
        var clonedElements1 = Object.create(null);
        var cloned = keys.map(function (key, cx) {
            var k = isArrayResult ? cx : key;
            var $scope = repeater.createScope(result[k], k, cx);
            if (trackBy) {
                k = seek($scope, trackBy);
                if (clonedElements[k]) {
                    clonedElements[k].$scope = $scope;
                    return clonedElements1[k] = clonedElements[k];
                }
            }
            else {
                var c = changes[k];
                if (clonedElements[k]) if (!c) return clonedElements1[k] = clonedElements[k];
            }
            var clone = element.cloneNode();
            clone.innerHTML = element.innerHTML;
            clone.$renderid = id;
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
            if (clonedElements1[k] !== clonedElements[k]) {
                var selected = clonedElements[k].selected;
                remove(clonedElements[k]);
                if (selected) { clonedElements1[k].selected = true; }
            }
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
    var getter = createGetter(this, search);
    var element = this;
    var elements = [element, getter];
    if_top.push(elements);
    var savedValue;
    elements.parent = this.parentNode;
    elements.comment = search;
    if (this.$struct.repeat) id = -3;

    elements.$renders = [function () {
        var shouldMount = -1;
        for (var cx = 0, dx = elements.length; cx < dx; cx += 2) {
            var getter = elements[cx + 1];
            if (!getter || getter(this)) {
                shouldMount = cx;
                break;
            }
        }
        if (savedValue === shouldMount) return;
        savedValue = shouldMount;
        for (var cx = 0, dx = elements.length; cx < dx; cx += 2) {
            var c = elements[cx];
            if (cx === shouldMount) {
                var e = c.$template;
                appendChild.after(c, e);
                if (e.$renderid < 0) {
                    e.$renderid = id;
                    e = c.$template = render(e, this.$scope, this.$parentScopes);
                    e.$comment = c;
                }
            }
            else {
                remove(c.$template);
            }
        }

    }];
    return elements[0] = createComment.call(element, elements.$renders, 'if', elements.comment);
};
var parseIfWithRepeat = function (ifExpression, repeatExpression) {
    var repeater = parseRepeat(repeatExpression);
    if (!repeater) {
        throw new Error(i18n`不能识别循环表达式: ${repeat}`);
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
        if (inc++ > 100) throw new Error(i18n`请不要在if表达式中使用太多的条件!`);
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

var mountElementIds = function (element, ids) {
    var scope = element.$scope;
    if (!scope) return;
    for (var id of ids) {
        if (isHandled(scope[id]) && scope[id] !== element) throw new Error(i18n`同一个id不能使用两次:` + id);
        scope[id] = element;
    }
}
var renderStructure = function (element) {
    var $struct = element.$struct;
    if ($struct.if) var { name: ifkey, key, value: ifexp } = $struct.if;
    if ($struct.repeat) var { value: repeat } = $struct.repeat;
    if (!ifkey) return createRepeat.call(element, repeat);
    if (!ifexp || !repeat) {
        if (repeat) delete $struct.if;
        return structures[key].call(element, ifexp);
    }
    var { before, after } = parseIfWithRepeat(ifexp, repeat);
    if (after.length) {
        $struct.if = { key, name: ifkey, value: after.join("&&") };
    }
    else {
        delete $struct.if;
    }
    if (before.length > 0) {
        return createIf.call(element, before.join("&&"), null);
    } else {
        delete $struct.repeat;
        if (!repeat) debugger;
        return createRepeat.call(element, repeat, null);
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
            throw new Error(i18n`else/elseif前缺少同级if！`);
        }
        initIf(if_top.splice(cx + 1, if_top.length - cx - 1));
        var top = if_top[cx];
        if (search && search) {
            var getter = createGetter(this, search);
        }
        var comment = createComment.call(this, undefined, search ? 'elseif' : 'else', search);
        top.push(comment, getter);
    },
    repeat(search) {
        return createRepeat.call(this, search);
    },
};
structures["else-if"] = structures.elseif = structures.else;
structures["for-each"] = structures.foreach = structures.for = structures.each = structures.repeat;
var createMapper = function (write, mapper) {
    return function (search) {
        var getter = isArray(search) ? search.map(s => createGetter(this, s)) : createGetter(this, search);
        var oldValue = mapper();
        this.$renders.push(function () {
            var value = mapper(isArray(getter) ? getter.map(g => g(this)) : getter(this));
            var changes = getChanges(value, oldValue);
            if (!changes) return;
            oldValue = value;
            var targetValue = Object.create(null);
            for (var k in changes) {
                targetValue[k] = !isHandled(value[k]) ? "" : value[k];
            }
            write(this, targetValue);
        });
    }
}
var createBinder2 = function (write, read) {
    return function (search) {
        var getter = createGetter(this, search);
        var oldValue = isFunction(read) ? read(this) : undefined;
        this.$renders.push(function () {
            var value = getter(this);
            if (shallowEqual(value, oldValue)) return;
            var oldv = oldValue;
            oldValue = value;
            if (!isHandled(value)) value = '';
            write(this, value, oldv);
        });
    };
}

var src2 = function (search) {
    var getter = createGetter(this, search);
    var savedValue;
    this.$renders.push(function () {
        var origin = getter(this);
        var temp = shallowClone(origin);
        if (isHandled(savedValue)) {
            if (shallowEqual(temp, savedValue, 1)) return;
        }
        else {
            if (isSame(savedValue, temp)) return;
        }
        savedValue = temp;
        if (!isHandled(origin) && !isHandled(this.src));
        else this.src = origin;
        cast(this, origin);
    });
}

var directives = {
    text: createBinder2(function (elem, value) {
        elem.innerText = value;
    }),
    bind: createBinder2(function (elem, value) {
        if (isNode(value) || isArray(value)) {
            if (value !== elem.firstChild) {
                remove(elem.childNodes);
                appendChild(elem, value);
            }
        }
        else {
            elem.innerText = value;
        }
    }),
    html: createBinder2(function (elem, value) {
        elem.innerHTML = value;
    }),
    hide: createBinder2(function (elem, value) {
        var display = value ? 'none' : '';
        var style = elem.style;
        if (style.display !== display) style.display = display;
    }, function (elem) {
        return elem.style.display === 'none';
    }),
    show: createBinder2(function (elem, value) {
        var display = value ? '' : 'none';
        var style = elem.style;
        if (style.display !== display) style.display = display;
    }, function (elem) {
        return elem.style.display === 'none';
    }),
    style: createMapper(css, css.styleToMap),
    class: createMapper(addClass, addClass.classToMap),
    src(src) {
        var parsedSrc = this.$src;
        return src2.call(this, parsedSrc && /[\{\[\s]/.test(src) ? parsedSrc.srcName : src);
    },
    model(search, target) {
        var getter = createGetter(this, search);
        var oldValue;
        var getstr = target.getValue instanceof Function ? "this.getValue()" : "";
        var setter = target.setValue instanceof Function ? function () {
            var value = getter(this);
            if (value === undefined) value = "";
            if (deepEqual(oldValue, value)) return;
            oldValue = value;
            this.setValue(value);
        } : null;
        var setter2 = function (key) {
            var value = getter(this);
            if (value === undefined) value = "";
            if (deepEqual(oldValue, value)) return;
            oldValue = value;
            this[key] = value;
        };
        if (/^input$/i.test(target.tagName) && /^checkbox$/i.test(target.type) || /^checkbox$/i.test(target.tagName)) {
            this.$renders.push(setter || setter2.bind(target, 'checked'));
            var change = getstr || "this.checked";
        } else if (("value" in target || target.getValue instanceof Function) && target.setValue instanceof Function) {
            this.$renders.push(setter);
            var change = getstr || "this.value";
        } else if (/^(select|input|textarea)$/i.test(target.tagName) || "value" in target) {
            this.$renders.push(setter || setter2.bind(target, 'value'));
            var change = getstr || "this.value";
        } else {
            this.$renders.push(setter || function () {
                var value = getter(this);
                if (value === undefined) value = "";
                if (deepEqual(oldValue, value)) return;
                oldValue = value;
                if (html(this) !== value) html(this, value);
            });
            var change = getstr || "'value' in this?this.value:this.innerHTML";
        }
        setter2 = null;
        var changeme = $$eval.bind(this, search + "=" + change, getScopeList(this));
        var onchange = function () {
            changeme(this);
            var value = getter(this);
            if (value === oldValue) {
                return;
            }
            oldValue = value;
            userChanged = true;
        };
        eventsBinders.forEach(on => on(target, onchange, true));
    },

};
// property binder
var binders = {
    _(attr, search) {
        attr = attr.replace(/\-(\w)/g, (_, w) => w.toUpperCase());
        var getter = createGetter(this, search);
        var oldValue;
        this.$renders.push(function () {
            var value = getter(this);
            if (deepEqual(value, oldValue)) return;
            oldValue = value;
            if (this[attr] !== value) {
                this[attr] = this[attr.replace(/\-[a-z]/g, a => a.toUpperCase())] = value;
            }
        });
    },
    ""(attr, search) {
        var getter = createGetter(this, search);
        var oldValue;
        this.$renders.push(function () {
            var value = getter(this);
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
    return function (target, key, search) {
        /**
         * @type {Repeater}
         */
        var getter = createGetter(this, search, false);
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
        onkey(target, function (e) {
            digest();
            var parsedSrc = this.$src;
            if (parsedSrc instanceof Repeater) {
                if (e.active || e.currentTarget) var target = e.active || (e.currentTarget === this ? e.target || e.srcElem || e.currentTarget : e.currentTarget);
                else var target = e.target;
                if (target === this) {
                    scope = parsedSrc.createScope();
                }
                else {
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
                }
                if (!scope && target.$scope !== this.$scope) scope = target.$scope;
            }
            var res;
            if (scope) {
                getter.scopes.push(scope);
                res = getter(this, e);
                getter.scopes.pop();
            }
            else {
                res = getter(this, e);
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

var keyAdapters = [
    key => key,
    key => key.toLowerCase(),
    key => key.replace(/\-+([a-z])/g, (_, w) => w.toUpperCase()),
    key => key.replace(/^([a-z])/g, (_, w) => w.toUpperCase())
];
function getFromScopes(key, scope, parentScopes) {
    if (!isHandled(key)) return;
    for (var ka of keyAdapters) {
        key = ka(key);
        if (scope && key in scope) return scope[key];
        if (parentScopes) for (var cx = parentScopes.length - 1; cx >= 0; cx--) {
            var o = parentScopes[cx];
            if (o && key in o) return o[key];
        }
        if (key in presets) return presets[key];
    }
}

function renderRest(element, struct, replacer = element) {
    var renders = element.$renders;
    element.$renders = [];
    var { binds, attrs, props } = struct;
    for (var k in binds) {
        if (k === 'src') continue;
        if (directives.hasOwnProperty(k)) {
            directives[k].call(element, binds[k], replacer);
        }
        else {
            binders._.call(element, k, binds[k]);
        }
    }
    for (var k in struct.attrs) {
        binders[""].call(element, k, attrs[k]);
    }
    for (var k in struct.props) {
        try {
            if (replacer[k] !== props[k]) replacer[k] = props[k];
        } catch (e) { }
    }
    if (binds.src) directives.src.call(element, binds.src);
    if (renders && renders.length) element.$renders.push.apply(element.$renders, renders);
    if (!isElement(replacer)) replacer = element;
    struct.ons.forEach(([on, key, value]) => on.call(element, replacer, key, value));
}

function renderElement(element, scope = element.$scope, parentScopes = element.$parentScopes, once) {
    if (isArrayLike(element)) {
        return Array.apply(null, element).map(function (element) {
            return renderElement(element, scope, parentScopes, once);
        });
    }
    if (!isElement(element)) {
        return element;
    }
    if (!isNumber(element.$renderid)) {
        element.$renderid = 0;
        element.$scope = scope;
        if (isHandled(parentScopes) && !isArray(parentScopes)) {
            throw new Error(i18n`父级作用域链应以数组的类型传入`);
        }
        if (parentScopes) {
            if (element.$renderid && !element.$parentScopes || element.$parentScopes && element.$parentScopes.length !== parentScopes.length) {
                throw new Error(i18n`父作用域链的长度必须相等着`);
            }
        }
        element.$parentScopes = parentScopes || [];
        var s = createStructure(element);
        element.$struct = s;
        mountElementIds(element, s.ids);
        if (isEmpty(s.once)) s.once = once;
        element.$eval = $eval;
    }
    element.$scope = scope;
    if (element.$renderid <= -1) element = renderStructure(element);
    if (!element) return;
    if (!element || element.$renderid < 0 || element.nodeType !== 1) {
        return element;
    }
    var isFirstRender = !element.$renderid;

    if (isFirstRender) {
        element.$renderid = 1;
        var parentNode = element.parentNode;
        if (parentNode) {
            if (parentNode.$renderid > 1 || isMounted(parentNode)) element.$renderid = 2;
        }
        var $struct = element.$struct;
        element.$renders = element.$renders || element.renders ? [].concat(element.$renders || [], element.renders || []) : [];
        var { copys, binds, once } = $struct;
        if (once) element.$renderid = 9;
        if (binds.src) {
            element.$src = parseRepeat(binds.src);
        }
        var { tagName, parentNode, nextSibling } = element;
        // 替换元素
        var constructor = getFromScopes(tagName, scope, parentScopes);
        if (isFunction(constructor)) {
            var replacer = constructor.call(scope, element, scope, parentScopes);
            if (element === replacer) {
                var struct = createStructure(element, false);
                renderRest(element, struct);
            }
            else if (isNode(replacer)) {
                if (!replacer.$scope) replacer.$scope = scope;
                if (!replacer.$parentScopes) replacer.$parentScopes = parentScopes;
                if (isElement(replacer) && !replacer.$renderid) {
                    createStructure(replacer);
                    replacer.$struct = mergeStruct(element.$struct, replacer.$struct);
                    if (replacer.children && replacer.children.length) renderElement(replacer.children, replacer.$scope, replacer.$parentScopes, once);
                    renderRest(replacer, replacer.$struct);
                }
                copyAttribute(replacer, copys);
                if (nextSibling) appendChild.before(nextSibling, replacer);
                else if (parentNode) appendChild(parentNode, replacer);
                if (element.parentNode === parentNode) remove(element);
                if (!replacer.$renderid) replacer.$renderid = element.$renderid;
                for (var id of element.$struct.ids) {
                    scope[id] = replacer;
                }
            }
        }
    }
    if (!replacer || element === replacer) {
        if (element.children && element.children.length) renderElement(element.children, scope, parentScopes, once);
    }
    if (!isFirstRender) return element;
    renderRest(element, $struct, replacer);
    if (element.$renders.length) {
        if (element.$renderid !== 9) {
            onmounted(element, addRenderElement);
            onremove(element, removeRenderElement);
            if (isMounted(element) || element.$renderid > 1) addRenderElement.call(element);
            else if (eagermount) rebuild(element);
        }
        else {
            rebuild(element);
        }
    }
    return element;
}
var createEval = function (deep) {
    var context = [];
    while (deep-- > 0) {
        context[deep] = `with($parentScopes[${deep}])`;
    }
    return new Function("$parentScopes", "code", "event", `${context.join('')}return eval(code)`);
};
var evalcontexts = [createEval(0)];

function $$eval(search, scopes, target = this, event) {
    var length = scopes.length;
    if (!evalcontexts[length]) evalcontexts[length] = createEval(length);
    var eval2 = evalcontexts[length];
    var res = eval2.call(target, scopes, search, event);
    return res;
}

function $eval(search, scope, event) {
    var scopes = getScopeList(this);
    if (isHandled(scope) && scope !== this.$scope) scopes.push(scope);
    return $$eval.call(this, search, scopes, this, event);
}

var merge = function (dst, src) {
    if (!isHandled(src)) return dst;
    if (!isHandled(dst)) return src;
    if (isArray(dst)) {
        return dst.concat(src);
    }
    if (isObject(dst)) return Object.assign(dst, src);
    return src;
};
var pushb = function (dist, b) {
    if (isArray(b)) dist.push(...b);
    else if (isHandled(b)) dist.push(b);
};
var mergeStruct = function (struct1, struct2) {
    if (!isObject(struct1)) return struct2;
    if (!isObject(struct2)) return struct1;
    for (var k in struct2) if (k !== 'binds') {
        struct1[k] = merge(struct1[k], struct2[k]);
    }
    var binds1 = struct1.binds;
    var binds2 = struct2.binds;
    for (var k in binds2) {
        if (/^(class|style)$/.test(k)) {
            var dist = [];
            pushb(dist, binds1[k]);
            pushb(dist, binds2[k]);
            if (dist.length) {
                if (dist.length === 1) dist = dist[0];
                binds1[k] = dist;
            }
        }
        else {
            binds1[k] = binds2[k];
        }
    }
    return struct1;
}

class Struct {
    constructor(ons, types, copys, binds, attrs, props, ids, once) {
        this.ons = ons;
        this.if = types.if;
        this.repeat = types.repeat;
        this.copys = copys;
        this.binds = binds;
        this.attrs = attrs;
        this.props = props;
        this.ids = ids;
        this.once = once;
    }
}


var pushid = function (ids, name) {
    ids.push(name);
    var name1 = name.replace(/\-([a-z])/ig, (_, a) => a.toUpperCase());
    if (name1 !== name) ids.push(name1);
};

function createStructure(element, useExists) {
    if (isArrayLike(element)) return Array.prototype.map.call(element, createStructure);
    if (useExists !== false && element.$struct) return element.$struct;
    if (element.nodeType !== 1) return;
    // 处理结构流
    var attributes = element.attributes;
    var attrs = Array.apply(null, attributes);
    if (attributes.length && !attributes[0]) {
        for (var cx = 0, dx = attributes.length; cx < dx; cx++) attrs[cx] = attributes.item(cx);
    }
    var types = {};
    var emiter_reg = /^(?:(v|ng|on|once)?\-|v\-on\:|@|once|on)/i;
    var ons = [];
    var copys = [];
    var binds = {};
    var once;
    var attr1 = {};
    var props = {};
    var ids = [];
    for (var attr of attrs) {
        var { name, value } = attr;
        if (/^\$/.test(name)) continue;
        if (name === 'elementid' || name === 'renderid' || name === 'id') {
            pushid(ids, value);
            continue;
        }
        if (/^#/.test(name)) {
            pushid(ids, name.slice(1));
            element.removeAttribute(name);
            continue;
        };
        if (/^\./.test(name) && !value) {
            // 识别为class
            element.removeAttribute(name);
            value = name.slice(1).replace(/\./g, ' ')
            name = 'class';
            copys.push({ name, value });
            addClass(element, value);
            continue;
        }
        if (/^(?:class|style|src|\:|placeholder)$/i.test(name)) {
            copys.push(attr);
            continue;
        }
        var key = name.replace(/^(ng|v|.*?)\-/i, "").toLowerCase();
        if (structures.hasOwnProperty(key)) {
            if (element.$renderid <= -2) {
                if (/^if$|^else/i.test(key)) {
                    if (types.if) {
                        throw new Error(i18n`暂不支持在同一元素上使用多次if结构!`);
                    }
                } else {
                    if (types.repeat) {
                        throw new Error(i18n`暂不支持在同一元素上使用多次repeat类型的属性!`);
                    }
                }
            }
            if (/^if$|^else/i.test(key)) {
                types.if = { key, name, value };
            }
            else {
                types.repeat = attr;
            }
            if (!element.$renderid) element.$renderid = -1;
            else element.$renderid = -2;
            element.removeAttribute(name);
            continue;
        }
        // ng-html,ng-src,ng-text,ng-model,ng-style,ng-class,...
        var key = name.replace(/^(ng|v|[^\_\:\.]*?)\-|^[\:\_\.]|^v\-bind\:/i, "").toLowerCase();
        if (directives.hasOwnProperty(key) || /^([\_\:\.]|v\-bind\:)/.test(name)) {
            if (value) binds[key] = value;
            element.removeAttribute(name);
        }
        // ng-click on-click v-click @click @mousedown ...
        else if (emiter_reg.test(name)) {
            var match = emiter_reg.exec(name);
            var ngon = (match[1] || match[0]).toLowerCase() === 'once' ? 'once' : 'on';
            element.removeAttribute(name);
            if (value) ons.push([emiters[ngon], name.replace(emiter_reg, ''), value]);
        }
        // placeholder_ href_ checked_ ...
        else if (/[_@\:\.]$/.test(name)) {
            if (value) attr1[name.replace(/[_@\:\.]$/, "")] = value;
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
    element.$eval = $eval;
    return element.$struct = new Struct(ons, types, copys, binds, attr1, props, ids, once);
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
"fullscreenchange,resize,load,hashchange".split(",").forEach(e => on(e)(window, digest));
var eventsBinders = "change,click,paste,cut,resize,keydown,keypress,keyup,input,drop".split(",").map(k => on(k));
var userChanged = false;
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
render.getFromScopes = getFromScopes;
render.struct = createStructure;
render.mergeStruct = mergeStruct;