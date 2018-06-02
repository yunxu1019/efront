function compile(template_string) {
    var _container = div();
    html(_container, template_string);
    var children = _container.childNodes;
    var result;
    switch (children.length) {
        case 0:
            result = document.createTextNode(String(template_string || ""));
            break;
        case 1:
            result = _container.removeChild(children[0]);
            break;
        default:
            result = [].slice.call(children, 0).map(function (a) {
                _container.removeChild(a);
                return a;
            });
    }
    return result;
}