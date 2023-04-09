var preventDefault = function (e) { e.preventDefault() };
function main(elem, scope, hasIcon) {
    var item = elem || document.createElement('menu-item');
    item.innerHTML = menuItem;
    if (isObject(scope) && scope !== item.$scope) {
    }
    else if (item.$scope) {
        var scope = item.$scope;
    }
    var menu = scope;
    if (menu.menu || menu.$item) menu = menu.menu || menu.$item;
    if (menu.disabled || menu.enabled === false) {
        item.setAttribute('disabled', '');
    }
    else {
        item.removeAttribute("disabled");
    }
    scope = {
        menu,
        checker,
    };
    if (hasIcon || menu.icon) scope.hasIcon = true;
    render(item.children, scope);
    if (menu.line) item.setAttribute("line", ''), on("click")(item, preventDefault);
    return item;
}
main.template = menuItem;