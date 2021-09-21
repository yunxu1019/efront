function div(elem) {
    if (isNode(elem) && /div/i.test(elem.tagName)) return elem;
    var div = document.createElement("div");
    if (elem) {
        if (isString(elem)) {
            div.innerHTML = elem;
        } else if (isArray(elem)) {
            appendChild(div, elem);
        } else if (isElement(elem)) {
            appendChild(div, [].concat.apply([], elem.children));
        } else if (isNode(elem)) {
            appendChild(div, elem);
        }
    }
    return div;
}