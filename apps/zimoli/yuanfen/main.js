var tbar = titlebar("缘分", null, false);
var page = createElement(div, tbar, slider());
css(page, "font-size:40px;color:#fff;padding-top:50px;");

var itemSample = function () {
    var _icon = icon("menu");
    css(_icon, "position:absolute;left:0;width:60px;height:100%;top:0;bottom:0;background-color:#fff;");
    var _div = div();
    css(_div, "outline:1px solid #e2e3e4;position:absolute;right:0;left:60px;top:0;bottom:0;height:100%;width:auto;");
    var _itemSample = createElement(div, _div, _icon);
    css(_itemSample, "width:100%;position:relative;background:#fff;height:50px;");
    return _itemSample;
};
var _itemGroup = div();
css(_itemGroup, "border:1px solid #e2e3e4;border-left:none;border-right:none;overflow:hidden;margin-bottom:10px;width:100%;height:auto;top:0;left:0;right:0;background-color:#fff;");

function item() {
    var _div1 = itemSample();
    var _div2 = itemSample();
    var _div = createElement(_itemGroup, _div1, _div2);
    return _div;
}

function itemGroup() {
    var _div = createElement()
}
appendChild(page, item(), item());

function main() {
    return page;
}