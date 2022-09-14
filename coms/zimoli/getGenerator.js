
var _slider = createElement(div);
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
    var templates = [].concat.apply([], container.childNodes).filter(a => {
        if (a.hasAttribute('insert')) {
            return false;
        }
        return true;
    });
    if (templates.length < container.childNodes.length && templates.length >= 1) {
        var c = document.createComment('lattice');
        c.index = null;
        container.insertBefore(c, templates[0]);
        templates.splice(1, templates.length - 1);
        var paddingCount = [].indexOf.call(container.childNodes, c);
        container.paddingCount = paddingCount;
    }
    appendChild(template, templates);
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
            var template1 = template.cloneNode(true);
            element = template1.childNodes[0];
            if (template1.childNodes.length > 1) element.with = [].concat.apply([], template1.childNodes).slice(1);
        }
        if (needSetAttr) {
            for (var a of tagName.attributes) {
                element.setAttribute(a.name, a.value);
            }
        }
        console.log(element)
        var scopes = container.$generatorScopes;
        var parsedSrc = container.$src;
        if (parsedSrc) {
            var { keyName, itemName, indexName } = parsedSrc;
            var newScope = {
                [keyName || '$key']: index,
                [itemName || '$item']: com,
                [indexName || '$index']: index
            };
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
