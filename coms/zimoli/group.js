var _itemGroup = document.createElement("div");
function group() {
    var _group = _itemGroup.cloneNode();
    appendChild.apply(null, [].concat.apply([_group], arguments));
    return _group;
}