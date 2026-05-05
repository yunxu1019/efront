var renderIds = render.stepId;
/**
 * @param {Element} template
 */
var cloneChildNodes = function (template, structs, ids) {
    var cloned = template.cloneNode(true);
    var cNodes = cloned.childNodes;
    for (var cx = 0, dx = cNodes.length; cx < dx; cx++) {
        $structed.set(cNodes[cx], structs[cx]);
        renderIds.set(cNodes[cx], ids[cx]);
    }
    return cNodes;
}
var getitem = function (i) {
    var src = this.src;
    if (!src || i > src.length) return;
    if (isFunction(src.get)) return src.get(i);
    else return src[i];
}
var setitem = function (i, v) {
    var src = this.src;
    if (!src || i > src.length) return;
    if (isFunction(src.set)) return src.set(i);
    else return src[i] = v;
}
var createScope = function (container, index, com, wrap) {
    var parsedSrc = container.$src;
    var wraped = undefined;
    var origin = com;
    if (wrap) {
        com = wrap(com);
    }
    if (com.constructor === Item) {
        wraped = com;
        com = com.value;
    } else {
    }
    if (parsedSrc) {
        var newScope = parsedSrc.createScope(com, index, index, wraped);
    } else {
        var newScope = container.src[index];
        if (!isObject(newScope)) newScope = {
            get $item() {
                return getitem.call(container, this.$index);
            },
            set $item(v) {
                return setitem.call(container, this.$index, v);
            },
            $key: index,
            $index: index,
            toString() {
                return this.$item;
            },
            valueOf() {
                return this.$item;
            }
        }
        if (wraped) newScope.$wraped = wraped;
    }
    newScope.$origin = origin;
    return newScope;
}
var update = function (scope, index, wrap) {
    var item = getitem.call(this, index);
    if (!isHandled(item) || item === scope.$origin) return;
    var newScope = createScope(this, index, item, wrap);
    extend(scope, newScope);
}
var generatorScopes = new WeakMap;
var generators = new WeakMap;
var wrapItem1 = a => new Item(a);
/**
 * @param {Element} container
 * @param {Element|string} tagName;
 */
var getGenerator = function (container, tagName = 'item', wrapItem = false) {
    if (!container) return;
    var generator = generators.get(container);
    if (wrapItem) {
        wrapItem = isFunction(wrapItem) ? wrapItem : wrapItem1;
    }
    if (generator) return generator;
    var scopes = render.getScopes(container) || [];
    var template = document.createElement(container.tagName);
    var tagTemplate = isElement(tagName);
    var templates = [];
    var hasAfter = false;
    for (let a of container.childNodes) {
        if (a.nodeType === 1 && a.hasAttribute('insert')) {
            if (!templates.length) a.$isbefore = true;
            else { a.$isafter = true; hasAfter = true; }
        }
        else if (hasAfter);
        else if (a.nodeType === 1 || templates.length) {
            templates.push(a);
        }
    }
    while (templates.length > 1 && templates[templates.length - 1].nodeType !== 1) templates.pop();
    if (templates.length < container.childNodes.length && templates.length >= 1) {
        var c = document.createComment('generator');
        c.index = null;
        container.insertBefore(c, templates[0]);
        var paddingCount = [].indexOf.call(container.childNodes, c);
        container.paddingCount = paddingCount;
    }
    if (tagTemplate) {
        if (!templates.length) {
            templates = [tagName];
            tagTemplate = false;
        }
    }

    appendChild(template, templates);
    render.struct(templates);
    var ids, structs;
    if (tagTemplate) {
        var tt = $structed.get(tagName);
        var template0 = templates[0];
        tt = render.mergeStruct(tt, $structed.get(template0));
        $structed.set(template0, tt);
        renderIds.set(template0, renderIds.get(tagName));
    }

    /**
     * @param {number} index;
     * @param {Object} com;
     * @param {Element} element;
     */
    generator = function (index, com, element) {
        if (com === undefined) {
            com = getitem.call(container, index);
        }
        if (com === undefined) return;
        if (isNode(element));
        else if (!template.childNodes.length) {
            element = document.createElement(tagName);
        }
        else {
            var childNodes = cloneChildNodes(template, structs, ids);
            element = childNodes[0];
            if (childNodes.length > 1) element.with = Array.prototype.slice.call(childNodes, 1);
        }
        var newScope = createScope(container, index, com, wrapItem);
        var newItem = render(element, newScope, scopes, false);
        if (element.with) newItem.with = render(element.with, newScope, scopes, false);
        return newItem;
    };
    if (templates.length) {
        generator.$template = template;
        ids = Array.prototype.map.call(templates, a => renderIds.get(a));
        structs = Array.prototype.map.call(templates, a => $structed.get(a));
    }
    generators.set(container, generator);
    generator.scopes = scopes;
    return generator;
};