var mounted_menus = [], releaseTimer = 0;
var release = function () {
    clear();
    releaseTimer = setTimeout(function () {
        remove(mounted_menus);
    }, 0);
};
var clear = function () {
    clearTimeout(releaseTimer);
};
function main(page, items, active, generator, direction = 'y') {
    if (!isNode(page)) {
        var page = div();
    }
    var main = this;
    function popMenu(item, event) {
        if (page.active) {
            clear();
            remove(page.active);
        }
        if (!item.children || !item.children.length) return;
        var clone = template.cloneNode();
        clone.innerHTML = template.innerHTML;
        var menu = main(clone, item.children, active, generator);
        mounted_menus.push(menu);

        page.active = menu;
        popup(menu, event.target);
        var offleave0 = on("mouseleave")(event.target, release);
        var offenter0 = on("mouseenter")(event.target, clear);
        var offleave1 = on("mouseleave")(menu, release);
        var offenter1 = on("mouseenter")(menu, clear);
        once("remove")(menu, function () {
            removeFromList(mounted_menus, page.active);
            offleave0();
            offenter0();
            offleave1();
            offenter1();
        });
    }

    var template = page.tempalte || page.cloneNode();
    if (!page.tempalte) {
        template.className = '';
        template.removeAttribute('mode');
        template.innerHTML = page.innerHTML;
        page.tempalte = template;
    }
    if (!generator || !page.children.length || page.menutype === 1) {
        page.innerHTML = menuList;
        page.menutype = 1;
        var hasIcon = function () {
            var menus = items;
            for (var menu of menus) {
                if (menu.icon) {
                    return true;
                }
            }
            return false;
        };
        render(page, {
            "menu-item": function () {
                return button(
                    menuItem.apply(null, arguments)
                );
            },
            menus: items,
            hasIcon: hasIcon(),
            open(menu, event) {
                active(menu, event);
            },
            popMenu,
        });
        vbox(page);
        page.renders.unshift(function () {
            this.$scope.hasIcon = hasIcon();
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