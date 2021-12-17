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
    render(item.children, { useIcon: hasIcon, hasIcon, name, icon });
    return item;
}