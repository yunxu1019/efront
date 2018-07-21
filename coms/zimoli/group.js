var _itemGroup = div();
function group() {
    var _group = createElement(_itemGroup);
    appendChild.apply(null, [].concat.apply([_group], arguments));
    return _group;
}