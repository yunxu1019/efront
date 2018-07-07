var _itemGroup = div();
function group(){
    var _group=createElement(_itemGroup);
    appendChild(_group,[].slice.call(arguments,0));
    return _group;
}