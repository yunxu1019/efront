function main(elem) {
    var result = elem;
    if (isElement(elem) && elem.hasAttribute("ng-src")) {
        elem = option(elem);
        care(elem, function (p) {
            var [f, data] = p;
            elem.innerHTML = field;
            render(elem, {
                model,
                data,
                field: f
            });
        }, false);
    } else {
        result = option.apply(null, arguments);
    }
    result.removeAttribute("tabindex");
    return result;
}