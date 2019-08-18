function main(elem, scope) {
    var item = elem || document.createElement('menu-item');
    item.innerHTML = menuItem;
    if (scope instanceof Object) {
        render(item, { menu: scope })
    }
    return item;
}