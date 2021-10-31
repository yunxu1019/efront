
var _slider = createElement(div);
var getGenerator = function (container) {
    if (!container) return;
    if (container.$generator) return container.$generator;
    var template = document.createElement("div");
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
    container.insertBefore = _slider.insertBefore;
    container.appendChild = _slider.appendChild;
    var scopes = container.$parentScopes.concat(container.$scope);
    return container.$generator = function (index, com) {
        if (!com) {
            if (!container.src || index >= container.src.length) return;
            com = container.src[index];
        }
        if (!com) return;
        var template1 = template.cloneNode(true);
        if (!template1.childNodes.length) return template1;
        var item = template1.childNodes[0];
        item.with = [].concat.apply([], template1.childNodes).slice(1);
        var parsedSrc = container.$src;
        if (parsedSrc) {
            var { keyName, itemName, indexName } = parsedSrc;
            var newScope = {
                [keyName || '$key']: index,
                [itemName || '$item']: com,
                [indexName || '$index']: index
            };
            var newItem = render(item, newScope, scopes);
            if (item.with.length) newItem.with = render(item.with, newScope, scopes);
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
            var newItem = render(item, newScope, scopes);
            newItem.with = render(newItem.with = item.with, newScope, scopes);
        }
        return newItem;
    };
};
