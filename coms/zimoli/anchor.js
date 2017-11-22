var a = createElement("a");
attr(a, 'href', "");
function anchor(label, href) {
    var element = createElement(a);
    attr(element, "href",label);
    if (isString(label)) {
        text(element, label);
    } else {
        appendChild(element, label);
    }
    onclick(element, function (event) {
        event.preventDefault();
        go(href);
    });
    return element;
}