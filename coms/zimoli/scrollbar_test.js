function scrollbar_test() {
    var _container = div();
    var _content = div();
    css(_container, "width:200px;height:200px;background:rgba(255,255,255,.2);overflow:auto;");
    appendChild(_container, _content);
    var _scrollbar = scrollbar();
    css(_scrollbar, "position:absolute;top:0;");
    _scrollbar.bindTarget(_container);
    return _container;
}