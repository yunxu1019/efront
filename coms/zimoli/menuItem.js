var preventDefault = function (e) { e.preventDefault() };
function main(elem, scope, hasIcon) {
    var item = elem || document.createElement('menu-item');
    item.innerHTML = menuItem;
    if (isObject(scope) && scope !== item.$scope) {
    }
    else if (item.$scope) {
        var scope = item.$scope;
    }
    if (scope.menu) scope = scope.menu;
    if (hasIcon === undefined) hasIcon = !!scope.icon;
    if (scope.disabled || scope.enabled === false) {
        item.setAttribute('disabled', '');
    }
    else {
        item.removeAttribute("disabled");
    }
    render(item.children, scope, hasIcon instanceof Array ? hasIcon : [{ useIcon: hasIcon, hasIcon }]);
    if (scope.line) item.setAttribute("line", ''), on("click")(item, preventDefault);
    if (scope.hotkey) bindAccesskey(item, scope.hotkey);
    return item;
}