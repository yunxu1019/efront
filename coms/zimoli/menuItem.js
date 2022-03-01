var preventDefault = function (e) { e.preventDefault() };
function main(elem, scope, hasIcon) {
    var item = elem || document.createElement('menu-item');
    item.innerHTML = menuItem;
    if (isObject(scope) && scope !== item.$scope) {
    }
    else {
        var scope = item.$scope;
    }
    if (scope.menu) scope = scope.menu;
    var name = scope.name;
    var icon = scope.icon;
    if (hasIcon === undefined) hasIcon = !!icon;
    if (scope.disabled || scope.enabled === false) {
        item.setAttribute('disabled', '');
    }
    else {
        item.removeAttribute("disabled");
    }
    render(item.children, scope, hasIcon instanceof Array ? hasIcon : [{ useIcon: hasIcon, hasIcon, name, icon }]);
    if (scope.line) item.setAttribute("line", ''), on("click")(item, preventDefault);
    return item;
}