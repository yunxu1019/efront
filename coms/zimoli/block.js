function block(elem) {
    if (isElement(elem)) return elem;
    return div(elem);
}