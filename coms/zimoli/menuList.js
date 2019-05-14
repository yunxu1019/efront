
function main(items, active, generator, direction = 'y') {
    var page = this;
    if (!isNode(page)) {
        var page = div();
    }
    function popMenu(item, event) {
        clearTimeout(page.releaseTimer);
        if (page.active) {
            clearTimeout(page.active.releaseTimer);
            remove(page.active);
        }
        if (!item.children || !item.children.length) return;
        var menu = modules.menuList.call(clone, item.children, active, generator);
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

    var clone = page.cloneNode();
    clone.className = '';
    clone.removeAttribute('mode');
    clone.innerHTML = page.innerHTML;
    if (!generator || !page.children.length) {
        page.innerHTML = menuList;
        render(page, {
            btn: button,
            menus: items,
            open: active,
            popMenu,
        });
    } else {
        list(page, function (index) {
            var elem = generator(index);
            if (!elem) return;
            on("mouseenter")(elem, function (event) {
                popMenu(this.src[index], event);
            });
            on("click")(elem, function (event) {
                active(this.src[index], event);
            });
            return elem;
        }, direction);
    }
    return page;
}