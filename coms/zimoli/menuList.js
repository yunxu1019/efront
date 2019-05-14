function main(items, active) {
    var page = this;
    if (!isNode(page)) {
        var page = div();
    }
    page.innerHTML = menuList;
    var clone = page.cloneNode();
    clone.innerHTML = page.innerHTML;
    render(page, {
        btn: button,
        menus: items,
        open: active,
        popMenu(item, event) {
            clearTimeout(page.releaseTimer);
            if (page.active) {
                clearTimeout(page.active.releaseTimer);
                remove(page.active);
            }
            if (!item.children || !item.children.length) return;
            var menu = modules.menuList.call(clone, item.children, active);
            var release = function () {
                clear();
                menu.releaseTimer = setTimeout(function () {
                    remove(menu);
                }, 0);
                if (page.releaseTimer) {
                    page.releaseTimer = setTimeout(e => remove(page), 0);
                }
            };
            var clear = function () {
                clearTimeout(menu.releaseTimer);
                clearTimeout(page.releaseTimer);
            };
            page.active = menu;
            popup(menu, event.target);
            var offleave0 = on("mouseleave")(event.target, release);
            var offenter0 = on("mouseenter")(event.target, clear);
            var offleave1 = on("mouseleave")(menu, release);
            var offenter1 = on("mouseenter")(menu, clear);
            once("remove")(menu, function () {
                offleave0();
                offenter0();
                offleave1();
                offenter1();
            });
        }
    });
    return page;
}