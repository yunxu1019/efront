
var _slider = createElement(div);
var getGenerator = function (container, parsedSrc) {
    if (!container) return;
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
    return function (index, com) {
        if (!com) {
            if (!container.src || index >= container.src.length) return;
            com = container.src[index];
        }
        if (!com) return;
        var template1 = template.cloneNode();
        template1.innerHTML = template.innerHTML;
        if (!template1.childNodes.length) return template1;
        var item = template1.childNodes[0];
        item.with = [].concat.apply([], template1.childNodes).slice(1);
        if (parsedSrc) {
            var { keyName, itemName, indexName } = parsedSrc;
            var newScope = extend(Object.create(container.$scope), {
                [keyName || '$key']: index,
                [itemName || '$item']: com,
                [indexName || '$index']: index
            });
            var newItem = render(item, newScope);
            newItem.with = render(item.with, newScope);
        } else {
            var newScope = container.src[index];
            var newItem = render(item, newScope, [container.$scope]);
            newItem.with = render(newItem.with = item.with, newScope, [container.$scope]);
        }
        return newItem;
    };
};
