/**
 * @param {Element} template
 */
var cloneChildNodes = function (template) {
    var cloned = template.cloneNode(true);
    var cNodes = cloned.childNodes;
    var tNodes = template.childNodes;
    for (var cx = 0, dx = cNodes.length; cx < dx; cx++) {
        cNodes[cx].$struct = tNodes[cx].$struct;
        cNodes[cx].$renderid = tNodes[cx].$renderid;
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
var createScope = function (container, index, com) {
    var parsedSrc = container.$src;
    var wraped = undefined;
    var origin = com;
    if (container.$wrapItem) {
        com = container.$wrapItem(com);
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
var update = function (scope, index) {
    var item = getitem.call(this, index);
    if (!isHandled(item) || item === scope.$origin) return;
    var newScope = createScope(this, index, item);
    extend(scope, newScope);
}

/**
 * @param {Element} container
 * @param {Element|string} tagName;
 */
var getGenerator = function (container, tagName = 'item', wrapItem = false) {
    if (!container) return;
    var scopes = container.$parentScopes || [];
    if (container.$scope) scopes = scopes.concat(container.$scope);
    container.$generatorScopes = scopes;
    if (container.$generator) return container.$generator;
    var template = document.createElement(container.tagName);
    var tagTemplate = isElement(tagName);
    var templates = [];
    var hasAfter = false;
    if (wrapItem) {
        container.$wrapItem = isFunction(wrapItem) ? wrapItem : Item;
    }
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
    if (tagTemplate) {
        render.struct(tagName);
        var template0 = templates[0];
        template0.$struct = render.mergeStruct(tagName.$struct, template0.$struct);
        template0.$renderid = tagName.$renderid;
    }
    if (templates.length) container.$template = template;
    /**
     * @param {number} index;
     * @param {Object} com;
     * @param {Element} element;
     */
    return container.$generator = function (index, com, element) {
        if (com === undefined) {
            com = getitem.call(container, index);
        }
        if (com === undefined) return;
        if (isNode(element));
        else if (!template.childNodes.length) {
            element = document.createElement(tagName);
        }
        else {
            var childNodes = cloneChildNodes(template);
            element = childNodes[0];
            if (childNodes.length > 1) element.with = Array.prototype.slice.call(childNodes, 1);
        }
        var scopes = container.$generatorScopes;
        var newScope = createScope(container, index, com);
        element.$scope = newScope;
        element.$parentScopes = scopes;
        element.$renders = [update.bind(container, newScope, index)];
        var newItem = render(element, newScope, scopes, false);
        if (element.with) newItem.with = render(element.with, newScope, scopes, false);
        return newItem;
    };
};