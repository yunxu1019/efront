function main(elem, scope, hasIcon) {
    var item = elem || document.createElement('menu-item');
    item.innerHTML = menuItem;
    if (scope instanceof Object) {
        render(item, { menu: scope, useIcon: hasIcon })
    }
    return item;
}