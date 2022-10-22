
var _slider = createElement(div);
/**
 * @param {Element} template
 */
var cloneChildNodes = function (template) {
    var cloned = template.cloneNode(true);
    var cNodes = cloned.childNodes;
    var tNodes = template.childNodes;
    for (var cx = 0, dx = cNodes.length; cx < dx; cx++) {
        cNodes[cx].$struct = tNodes[cx].$struct;
        cNodes[cx].renderid = tNodes[cx].renderid;
    }
    return cNodes;
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
    var templates = [];
    for (let a of container.childNodes) {
        if (a.hasAttribute('insert')) {
            if (!templates.length) a.$isbefore = true;
            else a.$isafter = true;
        }
        else {
            templates.push(a);
        }
    }
    if (templates.length < container.childNodes.length && templates.length >= 1) {
        var c = document.createComment('lattice');
        c.index = null;
        container.insertBefore(c, templates[0]);
        templates.splice(1, templates.length - 1);
        var paddingCount = [].indexOf.call(container.childNodes, c);
        container.paddingCount = paddingCount;
    }
    appendChild(template, templates);
    render.struct(templates);
    if (templates.length) container.$template = template;
    container.insertBefore = _slider.insertBefore;
    container.appendChild = _slider.appendChild;
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
        var needSetAttr = isElement(tagName);
        if (isNode(element));
        else if (!template.childNodes.length) {
            element = needSetAttr ? tagName.cloneNode(true) : document.createElement(tagName);
            needSetAttr = false;
        }
        else {
            var childNodes = cloneChildNodes(template);
            element = childNodes[0];
            if (childNodes.length > 1) element.with = Array.prototype.slice.call(childNodes, 1);
        }
        if (needSetAttr) {
            for (var a of tagName.attributes) {
                element.setAttribute(a.name, a.value);
            }
        }
        var scopes = container.$generatorScopes;
        var parsedSrc = container.$src;
        if (parsedSrc) {
            var newScope = parsedSrc.createScope(com, index, index);
            var newItem = render(element, newScope, scopes, false);
            if (element.with) newItem.with = render(element.with, newScope, scopes, false);
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
            var newItem = render(element, newScope, scopes, false);
            if (element.with) newItem.with = render(element.with, newScope, scopes, false);
        }
        return newItem;
    };
};
