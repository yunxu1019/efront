function space(height) {
    var _space = createElement(div);
    css(_space, {
        height: (height || 10) + "px"
    });
    return _space;
}