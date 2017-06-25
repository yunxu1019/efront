var _itemGroup = div();
css(_itemGroup, "border:1px solid #e2e3e4;border-left:none;border-right:none;overflow:hidden;margin-bottom:10px;width:100%;height:auto;top:0;left:0;right:0;background-color:#fff;");
function group(){
    var _group=createElement(_itemGroup);
    appendChild(_group,[].slice.call(arguments,0));
    return _group;
}