var _remove = div();
var _target = div();
css(_remove, "width:300px;height:300px;background:red");
css(_target, "width:120px;height:100px;margin-left:200px;background:blue");
select(_target,_remove);
function select_test() {
    return _target;
}
