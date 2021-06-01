function main(elem, scope, hasIcon) {
    var item = elem || document.createElement('menu-item');
    item.innerHTML = menuItem;
    if (isObject(scope) && scope !== elem.$scope) {
        render(item, { menu: scope, useIcon: hasIcon })
    }
    return item;
}