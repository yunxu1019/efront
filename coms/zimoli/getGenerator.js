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
var merge = function (dst, src) {
    if (!src) return dst;
    if (!dst) return src;
    if (dst instanceof Array) {
        return dst.concat(src);
    }
    if (isObject(dst)) return Object.assign(dst, src);
    return src;
};
var mergeStruct = function (struct1, struct2) {
    for (var k in struct2) struct1[k] = merge(struct1[k], struct2[k]);
}
/**
 * @param {Element} container
 * @param {Element|string} tagName;
 */
var getGenerator = function (container, tagName = 'item') {
    if (!container) return;
    var scopes = container.$parentScopes || [];
    if (container.$scope) scopes = scopes.concat(container.$scope);
    container.$generatorScopes = scopes;
    if (container.$generator) return container.$generator;
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
    if (tagTemplate) {
        render.struct(tagName);
        var template0 = templates[0];
        mergeStruct(tagName.$struct, template0.$struct);
        template0.$struct = tagName.$struct;
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
            if (!container.src || index >= container.src.length) return;
            com = container.src[index];
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
        var parsedSrc = container.$src;
        if (parsedSrc) {
            var newScope = parsedSrc.createScope(com, index, index);
        } else {
            var newScope = container.src[index];
            if (!isObject(newScope)) newScope = {
                get $item() {
                    return container.src[this.$index];
                },
                set $item(v) {
                    container.src[this.$index] = v;
                    this.value = v;
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
        }
        element.$scope = newScope;
        element.$parentScopes = scopes;
        var newItem = render(element, newScope, scopes, false);
        if (element.with) newItem.with = render(element.with, newScope, scopes, false);
        return newItem;
    };
};