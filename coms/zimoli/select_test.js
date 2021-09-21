var _remove = div();
var _target = div();
css(_remove, "width:300px;height:300px;background:red");
css(_target, "width:120px;margin-top:100px;height:100px;margin-left:200px;background:blue");
select(_target, _remove);
var container = div();
var content = div();
css(content, "height:1000px");
css(container, "height:200px;overflow:auto;");
appendChild(content, _target);
appendChild(container, content);
onappend(container, function () {
    this.scrollTop = 100;
})
function select_test() {
    return container;
}
