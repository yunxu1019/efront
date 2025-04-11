var hasOwnProperty = {}.hasOwnProperty;
var elementRenders = [];
var presets = Object.create(null);
var renderIds = new WeakMap;
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
        var struct = $structed.get(this);
        if (isElement(node) && struct.copys) {
            copyAttribute(node, struct.copys);
        }
        this.with = [node];
        return;
    } else {
        var node = document.createElement(this.parentNode.tagName || "div");
        node.innerHTML = text;
        this.with = Array.apply(null, node.childNodes);
    }
    appendChild.after(this, this.with);
    this.with = render(this.with, $scoped.get(this), $parented.get(this), renderIds.get(this) !== 9);
};
var createCloner = function (node) {
    var $struct = $structed.get(node);
    var parentScopes = getScopeList(node);
    return function (id, scope) {
        var clone = node.cloneNode(true);
        $scoped.set(clone, scope);
        $parented.set(clone, parentScopes);
        $structed.set(clone, $struct);
        renderIds.set(clone, id);
        return clone;
    }
};

presets.template = function (t) {
    var comment = document.createComment('template');
    $scoped.set(comment, $scoped.get(t));
    $parented.set(comment, $parented.get(t));
    t.$comment = comment;
    if ($structed.get(t).binds.src) {
        care(comment, createTemplateNodes)
    }
    else {
        once("append")(comment, function () {
            createTemplateNodes.call(comment, t.innerHTML);
        });
    }
    return comment;
};
// <!--
window.elementRenders = elementRenders;
// -->
var isLe = function (a, b) {
    return a.id <= b.id;
};
var renderidOffset = 10;
var renderidClosed = 0;
var addRenderElement = function () {
    var element = this;
    var renders = $renders.get(element);
    buildFirst(renders);
    if (renders.id > 10) {
        saveToOrderedArray(elementRenders, renders, isLe);
    }
};
var removeRenderElement = function () {
    if (removing) {
        removing.push(this);
        return;
    }
    var renders = $renders.get(this);
    var i = getIndexFromOrderedArray(elementRenders, renders, isLe);
    if (elementRenders[i] === renders) elementRenders.splice(i, 1);
};
var buildI = function (renders) {
    if (getTargetIn(this, renders.el)) rebuild(renders);
};
var buildO = function (renders) {
    rebuild(renders);
};
function refresh(root) {
    removing = [];
    if (root && $renders.has(root)) {
        elementRenders.forEach(buildI, root);
    } else {
        elementRenders.forEach(buildO);
    }
    callDigest();
}
function fireChanges(element, changes) {
    var event = createEvent('changes');
    event.changes = changes;
    dispatch(event, element);
}

function buildFirst(renders) {
    rebuild(renders, '$ready' in renders);
}
var digests = [];
var removing = null;
var digestA = a => a.$digest();
var removeA = a => removeRenderElement.call(a);
var addA = a => buildFirst(a);
function callDigest() {
    var d;
    d = digests;
    digests = [];
    d.forEach(digestA);
    if (removing) {
        d = removing;
        removing = null;
        d.forEach(removeA);
    }
}
function getWatchData(element, w) {
    var props = {};
    for (var key in w) {
        var data = element[key];
        props[key] = data;
    }
    return props;
}
var buildThisA = function (f) {
    f.call(this);
};
function rebuild(renders, isFirstRender) {
    if (isFirstRender) delete renders.$ready;
    var el = renders.el;
    var w = $watches.get(el);
    if (el.$digest) digests.push(el);
    if (!w) {
        renders.forEach(buildThisA, el);
        return;
    }
    var props = isFirstRender ? {} : getWatchData(el, w);
    renders.forEach(buildThisA, el);
    var capture = null;
    for (var k in w) {
        var current = el[k];
        var previous = props[k];
        if (isSame(current, previous)) continue;
        if (!capture) capture = {};
        capture[k] = { current, previous };
    }
    if (capture) fireChanges(el, capture);
}
var variableReg = /([^\:\,\+\=\-\!%\^\|\/\&\*\!\;\?\>\<~\{\}\s\[\]\(\)]|\?\s*\.(?=[^\d])|\s*\.\s*)+/g;
var variableOnlyReg = new RegExp(`^${variableReg.source}$`);
var scopeList = null;
var makeScopeList = function (s, scopes) {
    if (s) {
        if (scopes) scopes = scopes.slice(), scopes.push(s);
        else scopes = [s];
    }
    return scopes;
}
var getScopeList = function (element) {
    var scopes = $parented.get(element);
    var s = $scoped.get(element);
    scopes = makeScopeList(s, scopes);
    return scopes;
};
var toNull = () => null;
var toUndefined = () => { };
var toResult = function (c) {
    if (typeof c === 'function') return c();
    return c;
};
var toObject = function (object) {
    if (isArray(object)) return function (object) {
        return object.map(toResult);
    }
    return function () {
        var result = {};
        for (var k in object) result[k] = toResult(object[k]);
        return result;
    }
};
var createGetter = function (target, search, isprop = true) {
    switch (typeof search) {
        case "function":
            return search;
        case "string":
            if (!search) return toUndefined;
            if (/^\{/.test(search)) search = `(${search})`;
            search = renderExpress(search);
            if (isprop) var getter = $$eval.bind(target, search, scopeList);
            else if (variableOnlyReg.test(search)) getter = $$eval.bind(target, search + "(event)");
            else getter = $$eval.bind(target, search);
            return getter;
        case "object":
            if (!isprop) throw new Error('绑定错误');
            return toObject(search);
    }
    return toUndefined;
};
var createComment = function (type, expression) {
    var comment = document.createComment(`${type} ${expression}`);
    $scoped.set(comment, $scoped.get(this));
    $structed.set(comment, $structed.get(this));
    $parented.set(comment, $parented.get(this));
    if (this.parentNode) {
        appendChild.after(this, comment);
        if (!/^if|^else/i.test(type)) remove(this);
    }
    comment.$template = this;
    this.$comment = comment;
    return comment;
};

var initialComment = function (el, renders, struct) {
    renders.el = el;
    if (struct.once) renders.r1 = true;
    $renders.set(el, renders);
    renderlock.push(renders);
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
var getClonedElements = function (clones, repsrc) {
    var newmap = [];
    var inc = 0;
    clones.forEach((c, i) => {
        var m = $scoped.get(c).$item;
        switch (m) {
            case repsrc[inc]: delete clones[i]; newmap[inc++] = c; break;
            case repsrc[inc + 1]: delete clones[i]; inc++; newmap[inc++] = c; break;
        }
    });
    return newmap;
}
var repeats = new WeakMap;
var currentScope = null;
var createRepeat = function (search, id = 0, struct) {
    // 懒渲染
    // throw new Error("repeat is not supported! use list component instead");
    var expression = search;
    var repeater = parseRepeat(expression);
    if (!repeater) throw new Error(i18n`不能识别循环表达式: ${expression} `);
    var { srcName, trackBy } = repeater;
    // 懒渲染
    var getter = createGetter(this, srcName);
    var element = this, clonedElements = [], savedValue, savedOrigin;
    if (struct.if) id = -7;
    var renderA = function (a, i) {
        a = render(a);
        repeats.set(a, this[i]);
        return a;
    };
    var reps = [];
    var renders = [function () {
        var result = getter(this);
        var origin = result;
        var isArrayResult = origin instanceof Array;
        result = extend(isArrayResult ? [] : {}, result);
        if (savedOrigin === origin && shallowEqual(savedValue, result)) return;
        if (savedOrigin !== origin && isObject(origin) && isObject(savedOrigin)) {
            var changed = getChanged(result, savedOrigin);
            if (!changed.length) return;
            var changes = Object.create(null);
            changed.forEach(k => changes[k] = true);
        }
        savedValue = result;
        savedOrigin = origin;
        var keys = isArrayResult ? result.map((_, i) => i) : Object.keys(result);
        if (keys.length > 600) {
            throw new Error(i18n`数据量过大，取消绘制！`);
        }
        var cloner = createCloner(element);
        var clonedElements1 = isArrayResult ? [] : Object.create(null);
        if (isArrayResult && !trackBy && clonedElements instanceof Array) {
            clonedElements1 = getClonedElements(clonedElements, result);
        }
        var cloned = keys.map(function (key, cx) {
            var k = isArrayResult ? cx : key;
            var $scope = repeater.createScope(result[k], k, cx);
            if (trackBy) {
                k = seek($scope, trackBy);
                if (clonedElements[k]) {
                    Object.assign(repeats.get(clonedElements[k]), $scope)
                    return clonedElements1[k] = clonedElements[k];
                }
            }
            else {
                if (isArrayResult) {
                    var c = clonedElements1[k];
                    if (c) {
                        Object.assign(repeats.get(c), $scope);
                        return c;
                    }
                }
                else if (changes) {
                    var c = changes[k];
                    if (!c) c = clonedElements[k];
                    else c = null;
                    if (c) {
                        Object.assign(repeats.get(c), $scope);
                        return clonedElements1[k] = c;
                    }
                }
            }
            reps[cx] = $scope;
            var clone = cloner(id, $scope);
            clonedElements1[k] = clone;
            return clone;
        }, this);
        var last = this;
        cloned.forEach(function (a, cx) {
            if (a.previousSibling !== last) appendChild.after(last, a);
            last = a;
        }, this);
        clonedElements1 = cloned.map(renderA, reps);
        for (var k in clonedElements) {
            if (clonedElements1[k] !== clonedElements[k]) {
                var selected = clonedElements[k].selected;
                var c = clonedElements[k];
                if (!c.parentNode && c.$comment) remove(c.$comment);
                else remove(clonedElements[k]);
                if (selected) { clonedElements1[k].selected = true; }
            }
        }
        clonedElements = clonedElements1;
        this.with = cloned;
    }];
    var comment = createComment.call(this, 'repeat', expression);
    initialComment(comment, renders, struct);
    return comment;
};

var ifget = function () {
    var elements = this.$elements;
    var shouldMount = -1;
    for (var cx = 0, dx = elements.length; cx < dx; cx += 2) {
        var getter = elements[cx + 1];
        if (!getter || getter(this)) {
            shouldMount = cx;
            break;
        }
    }
    return shouldMount;
}
var ifset = function (shouldMount) {
    var elements = this.$elements;
    for (var cx = 0, dx = elements.length; cx < dx; cx += 2) {
        var c = elements[cx];
        if (cx === shouldMount) {
            var e = c.$template;
            if (c.nextSibling !== e) appendChild.after(c, e);
            if (renderIds.get(e) < 0) {
                renderIds.set(e, this.$id);
                e = c.$template = render(e);
                e.$comment = c;
            }
        }
        else {
            remove(c.$template);
        }
    }
};
var createIf = function (search, id = 0, struct) {
    // 懒渲染
    var getter = createGetter(this, search);
    var element = this;
    var elements = [element, getter];
    if_top.push(elements);
    elements.parent = this.parentNode;
    if (struct.repeat) id = -3;
    var renders = [new Binder2(ifget, ifset)];
    var comment = elements[0] = createComment.call(element, 'if', search);
    comment.$id = id;
    comment.$elements = elements;
    if (struct.once) renders.r1 = true;
    initialComment(comment, renders, struct);
    return comment;
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

var mountElementIds = function (scope, element, ids) {
    for (var id of ids) {
        if (isHandled(scope[id]) && scope[id] !== element) throw new Error(i18n`同一个id不能使用两次:` + id);
        scope[id] = element;
    }
}
var renderStructure = function (element, $struct) {
    if ($struct.if) var { name: ifkey, key, value: ifexp } = $struct.if;
    if ($struct.repeat) var { value: repeat } = $struct.repeat;
    if (!ifkey) return createRepeat.call(element, repeat, undefined, $struct);
    if (!ifexp || !repeat) {
        if (repeat) delete $struct.if;
        return structures[key].call(element, ifexp, $struct);
    }
    var { before, after } = parseIfWithRepeat(ifexp, repeat);
    if (after.length) {
        $struct.if = { key, name: ifkey, value: after.join("&&") };
    }
    else {
        delete $struct.if;
    }
    if (before.length > 0) {
        return createIf.call(element, before.join("&&"), null, $struct);
    } else {
        delete $struct.repeat;
        if (!repeat) debugger;
        return createRepeat.call(element, repeat, null, $struct);
    }
};

var if_top = [];
var structures = {
    "if"(search, struct) {
        return createIf.call(this, search, undefined, struct);
    },
    "else"(search) {
        for (var cx = if_top.length - 1; cx >= 0; cx--) {
            if (if_top[cx].parent === this.parentNode) break;
        }
        if (cx < 0) {
            throw new Error(i18n`else/elseif前缺少同级if！`);
        }
        if (cx + 1 < if_top.length) if_top.splice(cx + 1, if_top.length - cx - 1);
        var top = if_top[cx];
        if (search) var getter = createGetter(this, search);
        var comment = createComment.call(this, search ? 'elseif' : 'else', search);
        top.push(comment, getter);
    },
    repeat(search, struct) {
        return createRepeat.call(this, search, undefined, struct);
    },
};
structures["else-if"] = structures.elseif = structures.else;
structures["for-each"] = structures.foreach = structures.for = structures.each = structures.repeat;
var callThis = function (f) {
    return f(this);
};
var createMapper = function (write, mapper) {
    return function (search) {
        var capValue = mapper();
        var copyC = function (key) {
            this[key] = capValue[key];
        };
        var getter = isArray(search) ? search.map(s => createGetter(this, s)) : createGetter(this, search);
        return function () {
            var value = mapper(isArray(getter) ? getter.map(callThis, this) : getter(this));
            var changed = getChanged(value, capValue);
            if (!changed.length) return;
            capValue = value;
            var targetValue = {};
            changed.forEach(copyC, targetValue);
            write(this, targetValue);
        };
    }
}

class Binder {
    constructor(getter, write) {
        this.gt = getter;
        this.st = write;
    }
    call(elem) {
        var value = this.gt.call(elem);
        var oldv = elem.$value;
        if (shallowEqual(oldv, value)) return;
        elem.$value = value;
        if (!isHandled(value)) value = '';
        this.st.call(elem, value, oldv);
    }
}
class Binder2 {
    constructor(getter, write, oldValue) {
        this.get = getter;
        this.set = write;
        this.value = oldValue;
    }
    call(elem) {
        var value = this.get.call(elem);
        var oldv = this.value;
        if (shallowEqual(oldv, value)) return;
        this.value = value;
        if (!isHandled(value)) value = '';
        this.set.call(elem, value, oldv);
    }
}

var createBinder2 = function (write, read) {
    return function (search) {
        var getter = createGetter(this, search);
        var oldValue = isFunction(read) ? read.call(this) : undefined;
        return new Binder2(getter, write, oldValue);
    };
}

var src2 = function (search) {
    var getter = createGetter(this, search);
    var checkArrayProperties = /^\[[^\]]+\]$/.test(search);
    var savedValue, savedLength;
    // 非直传数组的数据源变动后，不再检查其所有属性是否相同，直接同步到组件，
    // 直传数组的数据源以数组中的子项是否变动为准，
    // 直传数组的判别标准为表达式以“[”开头以“]”结尾，且表达式中间不含“]”
    return function () {
        var origin = getter(this);
        if (isArray(origin)) {
            if (isArray(savedValue)) {
                if (isSame(origin, savedValue)) {
                    if (origin.length === savedLength) return;
                }
                else {
                    a: if (checkArrayProperties && origin.length === savedLength) {
                        for (var cx = 0, dx = savedLength; cx < dx; cx++) {
                            if (savedValue[cx] !== origin[cx]) break a;
                        }
                        return;
                    }
                }
            }
            savedLength = origin.length;
            savedValue = origin;
        }
        else {
            if (isSame(savedValue, origin)) return;
            savedValue = origin;
        }
        if (!isHandled(origin) && !isHandled(this.src));
        else this.src = origin;
        cast(this, origin);
    };
}
var gtValue = function () { return this.value };
var stValue = function (v) { this.value = v };
var gtChecked = function () { return this.checked };
var stChecked = function (v) { this.checked = v };
var gtHtml = function () { return this.innerHTML };
var stHtml = function (v) { this.innerHTML = v };
class Model {
    constructor(getScope, setScope, target) {
        this.gs = getScope;
        this.ss = setScope;
        var getValue = target.getValue;
        var setValue = target.setValue;
        if (getValue && setValue);
        else if ('value' in target && setValue) {
            getValue = gtValue;
        }
        else if (/^input$/i.test(target.tagName) && /^checkbox$/i.test(target.type) || /^checkbox$/i.test(target.tagName)) {
            if (!getValue) getValue = gtChecked;
            if (!setValue) setValue = stChecked;
        }
        else if (/^(select|input|textarea)$/i.test(target.tagName) || "value" in target) {
            if (!getValue) getValue = gtValue;
            if (!setValue) setValue = stValue;
        }
        else if (String(target.contentEditable) === "true") {
            if (!getValue) getValue = gtHtml;
            if (!setValue) setValue = stHtml;
        }
        else {
            if (!getValue) getValue = gtValue;
            if (!setValue) setValue = stValue;
        }
        this.gv = getValue;
        this.sv = setValue;
        this.target = target;
    }
    call(elem) {
        var value = this.gv.call(elem);
        if (value === this.value) {
            return;
        }
        this.ss.call(this.target, value);
        this.value = value;
        this.bd.value = this.gs.call(this.target, value);
        if (isFunction(this.emit?.call)) {
            this.emit.call(this.target);
        }
        userChanged = true;
    }
    hook(elem, emit) {
        var binder = new Binder2(this.gs, this.target !== elem ? this.sv.bind(this.target) : this.sv);
        binder.call(elem);
        this.bd = binder;
        if (emit !== false) {
            this.emit = emit;
            this.value = this.gv.call(this.target);
            eventsBinders.forEach(on => on(this.target, this, true));
            this.target = elem;
        }
        return binder;
    }
}
var createSetter = function (elem, search) {
    return $$eval.bind(elem, search + "=arguments[2]", scopeList, elem);
};
var directives = {
    text: createBinder2(function (value) {
        if (isNode(value) || isArray(value)) {
            if (value !== this.firstChild) {
                remove(this.childNodes);
                appendChild(this, value);
            }
        }
        else {
            this.innerText = value;
        }
    }),
    html: createBinder2(function (value) {
        if (isNode(value) || isArray(value)) {
            if (value !== this.firstChild) {
                remove(this.childNodes);
                appendChild(this, value);
            }
        }
        else {
            this.innerHTML = value;
        }
    }),
    hide: createBinder2(function (value) {
        var display = value ? 'none' : '';
        var style = this.style;
        if (style.display !== display) style.display = display;
    }, function () {
        return this.style?.display === 'none';
    }),
    show: createBinder2(function (value) {
        var display = value ? '' : 'none';
        var style = this.style;
        if (style.display !== display) style.display = display;
    }, function () {
        return this.style?.display !== 'none';
    }),
    style: createMapper(css, css.styleToMap),
    class: createMapper(addClass, addClass.classToMap),
    src(src) {
        var parsedSrc = this.$src;
        return src2.call(this, parsedSrc && /[\{\[\s]/.test(src) ? parsedSrc.srcName : src);
    },
    model(search, target, change) {
        var getter = createGetter(this, search);
        var setter = createSetter(this, search);
        var model = new Model(getter, setter, target);
        return model.hook(this, change !== false);
    },
    value(search, target) {
        return directives.model.call(this, search, target, false);
    },

};
directives.bind = directives.text;

// property binder
var binders = {
    _(attr, search) {
        attr = attr.replace(/\-(\w)/g, (_, w) => w.toUpperCase());
        var getter = createGetter(this, search);
        var oldValue;
        var hook = function () {
            var value = getter(this);
            if (deepEqual(value, oldValue)) return;
            oldValue = value;
            if (this[attr] !== value) {
                this[attr] = this[attr.replace(/\-[a-z]/g, a => a.toUpperCase())] = value;
            }
        };
        return hook;
    },
    ""(attr, search) {
        var getter = createGetter(this, search);
        var oldValue;
        var hook = function () {
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
        }
        return hook;
    }
};
var reject = function (e) { digest(); throw e };
class Emitter {
    constructor(emit, scopes) {
        this.emit = emit;
        this.scopes = scopes;
    }
    call(elem, e) {
        digest();
        var scopes = this.scopes;
        var parsedSrc = elem.$src;
        if (parsedSrc instanceof Repeater) {
            if (e.active || e.currentTarget) var target = e.active || (e.currentTarget === elem ? e.target || e.srcElem || e.currentTarget : e.currentTarget);
            else var target = e.target;
            var es = $scoped.get(elem);
            if (target === elem) {
                scope = parsedSrc.createScope();
            }
            else {
                let scopes = target && $parented.get(target);
                if (scopes) {
                    var scope = null;
                    for (var cx = scopes.length - 1; cx >= 0; cx--) {
                        var s = scopes[cx];
                        if (s === es) {
                            scope = scopes[cx + 1];
                            break;
                        }
                    }
                }
            }

            if (!scope) {
                var ts = $scoped.get(target);
                if (es !== ts) scope = ts;
            }
        }
        var res;
        if (scope) {
            scopes.push(scope);
            res = this.emit(scopes, elem, e);
            scopes.pop();
        }
        else {
            res = this.emit(scopes, elem, e);
        }
        if (res && isFunction(res.then)) res.then(digest, reject);
        return res;

    }
}
var createEmiter = function (on) {
    return function (target, key, search) {
        /**
         * @type {Repeater}
         */
        var emit = createGetter(this, search, false);
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
        onkey(target, new Emitter(emit, scopeList));
    };
};
var emiters = {
    on: createEmiter(on),
    once: createEmiter(once),
};
emiters.v = emiters.ng = emiters.on;

var 驼峰化 = key => key.replace(/\-([a-z])/ig, (_, w) => w.toUpperCase());
var keyAdapters = [
    key => key,
    key => key.toLowerCase(),
    key => key.replace(/\-+([a-z])/g, (_, w) => w.toUpperCase()),
    key => key.replace(/^([a-z])/g, (_, w) => w.toUpperCase())
];
var foundScope = null;
function getFromScopes(key, scope, parentScopes) {
    foundScope = null;
    if (!isHandled(key)) return;
    for (var ka of keyAdapters) {
        key = ka(key);
        if (scope && key in scope) return foundScope = scope, scope[key];
        if (parentScopes) for (var cx = parentScopes.length - 1; cx >= 0; cx--) {
            var o = parentScopes[cx];
            if (o && key in o) return foundScope = o, o[key];
        }
        if (key in presets) return foundScope = presets, presets[key];
    }
}
function renderProp(elem, props) {
    for (var k in props) {
        try {
            if (elem[k] !== props[k]) elem[k] = props[k];
        } catch (e) { }
    }
}

function renderBinds(element, binds, renders) {
    var bind = binders._;
    for (var k in binds) {
        if (directives.hasOwnProperty(k)) continue;
        var h = bind.call(element, k, binds[k]);
        h.call(element);
        renders.push(h);
    }
}
var getUserRenders = function (element, renders) {
    if (element.renders) {
        renders.push.apply(renders, element.renders);
        delete element.renders;
    }
    if (element.$renders) {
        renders.push.apply(renders, element.$renders);
        delete element.$renders;
    }
    return renders;
}
function renderDynamics(element, replacer, binds, attrs, renders) {
    getUserRenders(element, renders);
    var watches = $watches.get(element);
    for (var k in binds) {
        if (k in directives) {
            if (k !== 'src') {
                var f = directives[k].call(element, binds[k], replacer);
                if (f) renders.push(f);
            }
        }
        else {
            if (element !== replacer) replacer[k] = element[k];
            if (watches) {
                if (!watches[k]) watches[k] = true;
            }
        }
    }
    var ba = binders[''];
    for (var k in attrs) {
        var f = ba.call(element, k, attrs[k]);
        renders.push(f);
    }
    if (binds.src) {
        var f = directives.src.call(element, binds.src);
        renders.push(f);
    }
}

function renderEmits(replacer, emits, on) {
    for (var k in emits) on.call(this, replacer, k, emits[k]);
}

function renderRest(renders, element, struct, replacer = element) {
    var { attrs, binds, emits, waits } = struct;
    renderDynamics(element, replacer, binds, attrs, renders);
    if (!isElement(replacer)) replacer = element;
    renderEmits.call(element, replacer, emits, emiters.on);
    renderEmits.call(element, replacer, waits, emiters.once);
}
function renderArray(children, scope, parentScopes, once) {
    if (!children) return;
    if (children.length) {
        var if_top_length = if_top.length;
        for (var cx = 0, dx = children.length; cx < dx; cx++) {
            children[cx] = renderElement(children[cx], scope, parentScopes, once);
        }
        if (if_top_length < if_top.length) {
            if_top.splice(if_top_length, if_top.length - if_top_length);
        }
    };
    return children;
}
function getChildren(element) {
    var children = element.children;
    if (!children || !children.length) return;
    var children = Array.prototype.filter.call(children, a => !renderIds.get(a));
    return children;
}
function renderElement(element, scope = $scoped.get(element), parentScopes = $parented.get(element), once) {
    if (isArrayLike(element)) {
        return renderArray(Array.apply(null, element), scope, parentScopes, once);
    }
    if (!isElement(element)) {
        return element;
    }
    var $struct;
    if (!renderIds.get(element)) {
        renderIds.set(element, 0);
        if (isHandled(parentScopes) && !isArray(parentScopes)) {
            throw new Error(i18n`父级作用域链应以数组的类型传入`);
        }
        if (parentScopes) {
            var eps = $parented.get(element);
            if (eps && eps.length !== parentScopes.length) {
                throw new Error(i18n`父作用域链的长度必须相等着`);
            }
        }
        $struct = createStructure(element);
        if ($struct && !isHandled($struct.once)) $struct.once = once;
    }
    else {
        $struct = $structed.get(element);
    }
    if (!parentScopes) parentScopes = [];
    $scoped.set(element, scope);
    $parented.set(element, parentScopes);
    var savedScopeList = scopeList;
    scopeList = makeScopeList(scope, parentScopes);
    if (renderIds.get(element) <= -1) element = renderStructure(element, $struct);
    if (!element) {
        scopeList = savedScopeList;
        return;
    }
    if (renderIds.get(element) < 0 || element.nodeType !== 1) {
        scopeList = savedScopeList;
        return element;
    }
    if ($struct) mountElementIds(scope, element, $struct.ids);
    var isFirstRender = !renderIds.get(element);
    if (isFirstRender) {
        var lockid = renderlock.length;
        renderlock[lockid] = null;
        renderIds.set(element, 1);
        var parentNode = element.parentNode;
        if (parentNode) {
            if (renderIds.get(parentNode) > 1 || isMounted(parentNode)) renderIds.set(element, 2);
        }
        var renders = initRenders(element);
        getUserRenders(element, renders);
        if ($struct) {
            var { copys, binds, once, props } = $struct;
            if (once) renders.r1 = true;
            if (binds.src) {
                element.$src = parseRepeat(binds.src);
            }
            renderProp(element, props);
            renderBinds(element, binds, renders);
        }
        var { tagName, parentNode, nextSibling } = element;
        // 替换元素
        var constructor = getFromScopes(tagName, scope, parentScopes);
        var conScope = foundScope;
        if (isFunction(constructor)) {
            var scopeList0 = scopeList;
            var scope0 = scope;
            var replacer = constructor.call(conScope, element, scope, parentScopes);
            if (element === replacer) {
                var struct1 = createStructure(element, false);
                scope = $scoped.get(element) || scope;
                parentScopes = $parented.get(element) || parentScopes;
                scopeList = makeScopeList(scope, parentScopes);
                if (struct1) renderRest(renders, element, struct1);
            }
            else if (isNode(replacer)) {
                if (isElement(replacer) && !renderIds.get(replacer)) {
                    if (!$scoped.has(replacer)) $scoped.set(replacer, scope);
                    if (!$parented.has(replacer)) $parented.set(replacer, parentScopes);
                    var struct2 = createStructure(replacer);
                    scope = $scoped.get(replacer) || scope;
                    parentScopes = $parented.get(replacer) || parentScopes;
                    scopeList = makeScopeList(scope, parentScopes);
                    if (struct2) renderRest(renders, replacer, struct2);
                }
                if ($struct) {
                    copyAttribute(replacer, copys);
                    for (var id of $struct.ids) {
                        scope0[id] = replacer;
                    }
                }
                if (nextSibling) appendChild.before(nextSibling, replacer);
                else if (parentNode) appendChild(parentNode, replacer);
                if (element.parentNode === parentNode) remove(element);
                if (!renderIds.get(replacer)) renderIds.set(replacer, element.parentNode === parentNode, renderIds.get(element));
            }
            scopeList = scopeList0;
        }
        if ($struct) renderRest(renders, element, $struct, replacer);
        if (isNode(replacer) && replacer !== element) {
            $renders.delete(element);
            var reprenders = initRenders(replacer);
            reprenders.push.apply(reprenders, renders);
            renders = reprenders;
            element = replacer;
            scope = $scoped.get(element);
            parentScopes = $parented.get(element);
        }
        if (element.$digest || renders.length) {
            if ($struct && $struct.once) renders.r1 = $struct.once;
            renders.$ready = true;
            renderlock[lockid] = renders;
        }
        else if (renderlock.length === lockid + 1) renderlock.pop(), $renders.delete(element);
    }
    renderArray(getChildren(element), scope, parentScopes, once);
    scopeList = savedScopeList;
    return element;
}
var deepcontexts = [];
var getDeepContext = function (deep) {
    var length = deep;
    var deepL = deepcontexts.length;
    while (deep-- > deepL) {
        deepcontexts[deep] = `with($parentScopes[${deep}])`;
    }
    return deepcontexts.slice(0, length).join('');
}
var createEval = function (deep) {
    return new Function("$parentScopes", "code", "event", `${getDeepContext(deep)}return eval(code)`);
};

var evalcontexts = [createEval(0)];

function $$eval(search, scopes, target = this, event) {
    var length = scopes.length;
    var eval2 = evalcontexts[length];
    if (!eval2) eval2 = evalcontexts[length] = createEval(length);
    var res = eval2.call(target, scopes, search, event);
    return res;
}

function $eval(search, scope, event) {
    var scopes = getScopeList(this);
    if (isHandled(scope) && scope !== $scoped.get(this)) scopes.push(scope);
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
    constructor(emits, onceEmits, types, copys, binds, attrs, props, ids, once) {
        this.emits = emits;
        this.waits = onceEmits;
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
    var name1 = 驼峰化(name);
    if (name1 !== name) ids.push(name1);
};

function createStructure(element, useExists) {
    if (isArrayLike(element)) return Array.prototype.map.call(element, createStructure);
    if (useExists !== false) {
        var s = $structed.get(element);
        if (s) return s;
    }
    if (element.nodeType !== 1) return;
    // 处理结构流
    var attributes = element.attributes;
    var attrs = Array.apply(null, attributes);
    if (attributes.length && !attributes[0]) {
        for (var cx = 0, dx = attributes.length; cx < dx; cx++) attrs[cx] = attributes.item(cx);
    }
    var types = {};
    var emiter_reg = /^(?:(v|ng|on|once)?\-|v\-on\:|@|once|on)/i;
    var emits = {};
    var waits = {};
    var copys = [];
    var binds = {};
    var once;
    var attr1 = {};
    var props = {};
    var ids = [];
    var inc = 0;
    for (var attr of attrs) {
        var { name, value } = attr;
        if (/^\$/.test(name)) continue;
        if (name === 'elementid' || name === 'renderid' || name === 'id') {
            pushid(ids, value);
            inc++;
            continue;
        }
        if (/^#/.test(name)) {
            pushid(ids, name.slice(1));
            element.removeAttribute(name);
            inc++;
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
            inc++;
            continue;
        }
        var key = name.replace(/^(ng|v|.*?)\-/i, "").toLowerCase();
        if (structures.hasOwnProperty(key)) {
            if (renderIds.get(element) <= -2) {
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
            if (!renderIds.get(element)) renderIds.set(element, -1);
            else renderIds.set(element, -2);
            element.removeAttribute(name);
            inc++
            continue;
        }
        // ng-html,ng-src,ng-text,ng-model,ng-style,ng-class,...
        var key = name.replace(/^(ng|v|[^\_\:\.]*?)\-|^[\:\_\.\?\@\*&]|^v\-bind\:/i, "").toLowerCase();
        if (key.length !== name.length && directives.hasOwnProperty(key) || /^([\_\:\.]|v\-bind\:)/.test(name) || /^[@&\?\*\+]/.test(name) && !value) {
            if (value) binds[key] = value;
            else {
                key = 驼峰化(name.slice(1));
                switch (name.charAt(0)) {
                    case "?":
                    case ":":
                        binds.text = key;
                        break;
                    case "@":
                        binds.html = key;
                        break;
                    case "*":
                        binds.model = key;
                        break;
                    case "&":
                        binds.src = key;
                        break;
                    case "+":
                        binds[key] = key;
                        break;
                }
            }
            inc++;
            element.removeAttribute(name);
        }
        // ng-click on-click v-click @click @mousedown ...
        else if (emiter_reg.test(name)) {
            var match = emiter_reg.exec(name);
            var isOnce = (match[1] || match[0]).toLowerCase() === 'once';
            element.removeAttribute(name);
            if (value) {
                var key = name.replace(emiter_reg, '');
                if (isOnce) {
                    waits[key] = value;
                }
                else {
                    emits[key] = value;
                }
                inc++;
            }
        }
        // placeholder_ href_ checked_ ...
        else if (/[_@\:\.&\?\*\+\#]$/.test(name)) {
            var key = name.slice(0, name.length - 1);
            if (value) attr1[key] = value;
            else a: {
                key = 驼峰化(name.slice(0, name.length - 1));
                switch (name.charAt(name.length - 1)) {
                    case "?":
                        binds.text = key;
                        break;
                    case "@":
                        binds.html = key;
                        break;
                    case "*":
                        binds.model = key;
                        break;
                    case "&":
                        binds.src = key;
                        break;
                    case "+":
                        attr1[key] = key;
                        break a;
                    case "#":
                        ids.push(key);
                        break;
                }
                element.setAttribute(key.replace(/\./g, '-'), '');
            }
            inc++;
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
            inc++;
        }
    }
    if (inc === 0) return;
    if (props["zimoli"] || props["fresh"] || props["once"]) once = true;
    else if (props["refresh"] || props["digest"] || props["mount"]) once = false;
    var s = new Struct(emits, waits, types, copys, binds, attr1, props, ids, once);
    $structed.set(element, s);
    return s;
}
function unlock(renders) {
    if (!renders) return;
    if (!isOnce(renders)) {
        var node = renders.el;
        var rid = renderIds.get(node) || 0;
        if (rid < 10) {
            rid = ++renderidOffset;
            renders.id = rid;
            renderIds.set(node, rid);
        }
        on("append")(node, addRenderElement);
        onremove(node, removeRenderElement);
    }
    else {
        buildFirst(node);
    }
}
var notNull = a => a;
var isOnce = a => a.r1;
var notComment = a => !isOnce(a) && a.el.nodeType !== 8;
function renderUnlock(element) {
    var locked = renderlock.filter(notNull);
    renderlock = null;
    locked.forEach(unlock);
    var eagger = eagermount;
    eagermount = false;
    var parentNode = element.parentNode;
    if (parentNode && isMounted(parentNode)) appendChild.dispatch(element);
    else if (eagger) {
        locked.filter(notComment).forEach(buildFirst);
    }
}
function renderLock(element) {
    if (!renderlock) {
        renderlock = [];
        $mounted.set(element, false);
        return true;
    }
    return false;
}
var eagermount = false, renderlock = null;
function render(element, scope, parentScopes, lazy = true) {
    // <!--
    if (isNode(element)) Object.defineProperties(element, $weaks);
    // -->
    var haslock = renderLock(element);
    var if_top_length = if_top.length;
    if (isFinite(scope) && arguments.length === 2) lazy = scope, scope = undefined;
    else if (isFinite(parentScopes) && arguments.length === 3) lazy = parentScopes, parentScopes = undefined;
    var renderonce = lazy === 0;
    if (haslock) eagermount = !+lazy;
    var e = renderElement(element, scope, parentScopes, renderonce);
    if (if_top_length < if_top.length) if_top.splice(if_top_length, if_top.length - if_top_length);
    if (haslock) renderUnlock(element);
    if (haslock) callDigest();
    return e;
}
// <!--
var $weaks = (key, weak, tip = key + '(element)') => {
    var warn = gs => {
        if (tip) {
            console.warn(i18n`${`%c ${key} %c`}仅在开发环境存在，供开发者调试查看，${`%c${i18n`项目发布后将没有这个属性！`}%c`}`, 'color:red', 'color', 'color:cyan', 'color:');
            console.info(`要在代码中访问 ${"element." + key}，可以用 ${tip + "." + gs + "(element)"} 代替！`);
            tip = null;
        }
    };
    return {
        configurable: true,
        enumerable: false,
        get() {
            warn("get");
            return weak.get(this);
        },
        set(v) {
            warn("set");
            return weak.set(this, v);
        }
    };
};
$weaks = {
    $scope: $weaks('$scope', $scoped, "$scoped"),
    $struct: $weaks('$struct', $structed, "$structed"),
    $parentScopes: $weaks('$parentScopes', $parented, "$parented"),
};
// -->
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
render.findKey = function (express, element) {
    var scopes = getScopeList(element);
    return getFromScopes(express, null, scopes);
};
var $renderid = {
    get() {
        return renderIds.get(this);
    },
    set(v) {
        return renderIds.set(this, v);
    },
    configurable: true,
    enumerable: false
};
render.struct = createStructure;
render.stepId = renderIds;
render.mergeStruct = mergeStruct;
render.Binder = Binder;
render.Model = Model;
render.attribute = function (target, attrs) {
    return renderDynamics(target, target, null, attrs, $renders.get(target));
};
render.dynamic = function (target, binds, attrs) {
    var renders = $renders.get(target);
    renderBinds(target, binds, renders);
    renderDynamics(target, target, binds, attrs, renders);
};
var initRenders = function (target) {
    var renders = $renders.get(target);
    if (!renders) {
        renders = [];
        renders.el = target;
        $renders.set(target, renders);
    }
    return renders;
};
render.class = function (target, map) {
    initRenders(target);
    directives.class.call(target, map);
};
render.style = function (target, map) {
    initRenders(target);
    directives.style.call(target, map);
};
render.on = function (target, map) {
    return renderEmits.call(this, target, map, emiters.on);
};
render.once = function (target, map) {
    return renderEmits.call(this, target, map, emiters.once);
};
render.eval = $eval;
render.mount = unlock;
render.getScopes = getScopeList;
render.clone = function (template, id = renderIds.get(template)) {
    var clone = template.cloneNode(true);
    $structed.set(clone, $structed.get(template));
    renderIds.set(clone, id);
    $scoped.set(clone, $scoped.get(template));
    $parented.set(clone, $parented.get(template));
    return clone;
}