
var _slider = createElement(div);
var getGenerator = function (container, parsedSrc) {
    if (!container) return;
    var template = document.createElement("div");
    appendChild(template, [].concat.apply([], container.childNodes));
    container.insertBefore = _slider.insertBefore;
    container.appendChild = _slider.appendChild;
    return function (index) {
        if (!container.src || index >= container.src.length) return;
        var template1 = template.cloneNode();
        template1.innerHTML = template.innerHTML;
        if (!template1.childNodes.length) return template1;
        var item = template1.childNodes[0];
        item.with = [].concat.apply([], template1.childNodes).slice(1);
        if (parsedSrc) {
            var { keyName, itemName, indexName } = parsedSrc;
            var newScope = extend(Object.create(container.$scope), {
                [keyName || '$key']: index,
                [itemName || '$item']: container.src[index],
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
