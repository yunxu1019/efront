var mounted_menus = [], releaseTimer = 0;
var release = function () {
    clear();
    releaseTimer = setTimeout(function () {
        remove(mounted_menus);
    }, 120);
};
var clear = function () {
    clearTimeout(releaseTimer);
};
var unfocus = function () {
    remove(mounted_menus);
    this.ispop = false;
};
function main(page, items, active, direction = 'y') {
    if (!isNode(page)) {
        var page = div();
    }
    var main = this;
    if (direction !== 'x') page.ispop = true;
    function popMenu(item, event) {
        if (page.active) {
            clear();
            remove(page.active);
        }
        if (!item.children || !item.children.length) return;
        var clone = template.cloneNode();
        clone.innerHTML = template.innerHTML;
        var menu = main(clone, item.children, active);
        mounted_menus.push(menu);

        page.active = menu;
        popup(menu, event.target);
        if (page.ispop === true) {
            var offleave0 = on("mouseleave")(event.currentTarget || event.target, release);
            var offleave1 = on("mouseleave")(menu, release);
            var offenter0 = on("mouseenter")(event.currentTarget || event.target, clear);
            var offenter1 = on("mouseenter")(menu, clear);
        } else {
            var offblur = on("blur")(page, unfocus);
            page.ispop = 1;
            page.tabIndex = 0;
            page.focus();
        }
        once("remove")(menu, function () {
            removeFromList(mounted_menus, page.active);
            if (offleave0) offleave0();
            if (offleave1) offleave1();
            if (offenter0) offenter0();
            if (offenter1) offenter1();
            if (offblur) offblur();
        });
    }

    var template = page.tempalte || page.cloneNode();
    if (!page.tempalte) {
        template.className = '';
        template.removeAttribute('mode');
        template.innerHTML = page.innerHTML;
        page.tempalte = template;
    }
    if (!page.children.length || page.menutype === 1) {
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
                var pop = active(menu, event);
                if (pop === false) return;
                if (!page.ispop) {
                    popMenu.apply(this, arguments);
                }
                else {
                    unfocus.call(page);
                }
            },
            popTimer: 0,
            popMenu() {
                if (!page.ispop) return;
                var args = arguments;
                return setTimeout(function () {
                    popMenu.apply(null, args);
                }, 60);
            },
        });
        vbox(page);
        page.renders.unshift(function () {
            this.$scope.hasIcon = hasIcon();
        });
    } else {
        var generator = getGenerator(page);
        list(page, function (index) {
            var elem = generator(index);
            if (!elem) return;
            on("mouseenter")(elem, function (event) {
                if (page.ispop) popMenu(this.src[index], event);
            });
            on("click")(elem, function (event) {
                var pop = active(this.src[index], event);
                if (pop === false) return;
                if (!page.ispop) {
                    popMenu(this.src[index], event);
                }
                else {
                    unfocus.call(page);
                }
            });
            return elem;
        }, direction);
    }
    return page;
}