var mounted_menus = [], releaseTimer = 0, root_menu;
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
    this.setFocus(null);
};
var setFocus = function (focused) {
    var page = this;
    if (focused) {
        if (page.focused !== focused) {
            if (page.focused) removeClass(page.focused, 'focus');
            if (focused) addClass(focused, "focus");
            page.focused = focused;
        }
    }
    else {
        if (page.focused) {
            removeClass(page.focused, 'focus');
            page.focused = null;
        }
    }
};
var moveFocus = function (delta) {
    var page = this;
    var focused = page.focused;
    var newIndex = 0;
    if (!focused) {
        if (delta > 0) newIndex = 0;
        else newIndex = page.total - 1;
    }
    else {
        var newIndex = focused.index + delta;
        var total = page.total;
        if (page !== root_menu) {
            total++;
        }
        if (newIndex < 0) newIndex = total + newIndex;
        if (newIndex > total - 1) newIndex = newIndex - total;
    }

    var e = page.getIndexedElement(newIndex);
    if (!e) page.setFocus(null);
    else page.open(e);
};
var openFocus = function () {
    var menu = mounted_menus[mounted_menus.length - 1] || root_menu;
    if (!menu.ispop) menu.ispop = 1;
    menu.open(menu.focused);
};
var closeFocus = function () {
    var menu = mounted_menus[mounted_menus.length - 1];
    remove(menu);
};
var keyAction = function (deltax, deltay) {
    if (root_menu !== document.activeElement) return;
    var menu = mounted_menus[mounted_menus.length - 1];
    if (menu) var parent = mounted_menus[mounted_menus.length - 2] || root_menu;
    else menu = root_menu;

    if (menu.direction === 'y') {
        if (deltax === 1) {
            if (menu.focused) openFocus();
            else if (parent && parent.direction !== 'y') {
                parent.moveFocus(deltax);
            }
        }
        else if (deltax === -1) {
            if (parent) {
                if (parent.direction === 'y') remove(mounted_menus.pop());
                else if (!menu.focused) parent.moveFocus(deltax);
            }
        }
        else {
            menu.moveFocus(deltay);
        }
    }
    else {
        if (deltay === 1) {
            if (menu.focused) openFocus();
            else if (parent && parent.direction === 'y') {
                parent.moveFocus(deltay);
            }
        }
        else if (deltay === -1) {
            if (parent) {
                if (parent.direction !== 'y') remove(mounted_menus.pop());
                else if (!menu.focused) parent.moveFocus(deltay);
            }
        }
        else {
            menu.moveFocus(deltax);
        }
    }
};
function keyalt() {
    if (this === document.activeElement) this.blur();
    else if (root_menu === this && root_menu !== document.activeElement) {
        root_menu.tabIndex = 0;
        root_menu.focus();
        root_menu.setFocus(root_menu.firstMenu);
    }
}
function keytab(event) {
    var menu = mounted_menus[mounted_menus.length - 1] || root_menu;
    event.preventDefault();
    menu.moveFocus(event.shiftKey ? -1 : 1);
}
function keyesc() {
    if (this !== document.activeElement) return;
    if (!mounted_menus.length) {
        if (!this.ispop) this.blur();
        else this.ispop = false;
    }
}
function keyup() {
    keyAction(0, -1);
}
function keydown() {
    keyAction(0, 1);
}
function keyleft() {
    keyAction(-1, 0)
}
function keyright() {
    keyAction(1, 0);
}
function keyspace() {
    var menu = mounted_menus[mounted_menus.length - 1];
    if (!menu || !menu.focused) menu = mounted_menus[mounted_menus.length - 2] || root_menu;
    if (menu.focused) {
        menu.focused.click();
    }
}
function register() {
    var menu = this;
    // if (!root_menu) root_menu = this;
    bind('keydown.alt.')(menu, keyalt);
    bind('keydown.esc')(menu, keyesc);
    on('keydown.tab')(menu, keytab);
    on('keydown.left')(menu, keyleft);
    on('keydown.right')(menu, keyright);
    on('keydown.up')(menu, keyup);
    on('keydown.down')(menu, keydown);
    on('keydown.enter')(menu, keyspace);
    on('keydown.space')(menu, keyspace);
    on("contextmenu")(menu, e => e.preventDefault());
}
function main(page, items, active, direction = 'y') {
    if (!isNode(page)) {
        var page = div();
    }
    var main = this;
    if (direction == 'y') page.ispop = true;
    var istoolbar = direction === 't';
    function popMenu(item, target) {
        if (page.actived) {
            clear();
            remove(page.actived);
        }
        page.setFocus(target);
        if (!item.children || !item.children.length) return;
        var clone = template.cloneNode();
        clone.$parentScopes = page.$parentScopes;
        clone.$scope = page.$scope;
        clone.$src = src;
        clone.innerHTML = template.innerHTML;
        var menu = main(clone, item.children, active);
        mounted_menus.push(menu);
        page.actived = menu;
        menu.root = page.root || page;
        popup(menu, target);
        if (page.ispop === true) {
            var offleave0 = on("mouseleave")(target, release);
            var offleave1 = on("mouseleave")(menu, release);
            var offenter0 = on("mouseenter")(target, clear);
            var offenter1 = on("mouseenter")(menu, clear);
        } else {
            page.ispop = 1;
            page.tabIndex = 0;
            page.focus();
        }
        on("mousedown")(menu, e => e.preventDefault());
        once("remove")(menu, function () {
            removeFromList(mounted_menus, this);
            if (offleave0) offleave0();
            if (offleave1) offleave1();
            if (offenter0) offenter0();
            if (offenter1) offenter1();
        });
    }
    on("blur")(page, unfocus);
    var template = page.tempalte || document.createElement("ylist");
    if (!page.tempalte) {
        template.className = '';
        template.removeAttribute('mode');
        template.innerHTML = page.innerHTML;
        page.tempalte = template;
    }
    var popTimer = 0, byMousedown;
    var open = function (time) {
        cancel();
        var elem = this;
        time = +time;
        if (byMousedown && !time) return;
        if (time) byMousedown = false;

        if (page.ispop || time) popTimer = setTimeout(function () {
            if (time) byMousedown = elem;
            page.setFocus(elem);
            popMenu(elem.menu, elem);
        }, time || 60);
    };
    var cancel = function () {
        clearTimeout(popTimer);
    }
    var fire = function () {
        cancel();
        if (this.menu.line) return;
        if (byMousedown) return;
        var pop = active(this.menu, this);
        if (pop === false) return;
        var root = page.root || page;
        if (root.direction === 't') {
            var menu = this.menu;
            if (root !== page) {
                delete menu.children;
                var target = root.actived.target;
                menu = extend(target.menu, menu);
            }
            else {
                target = this;
            }
            if (root.selected) root.selected.selected = false;
            menu.selected = true;
            root.selected = target.menu;
        }
        if (root.ispop === 1) root.ispop = false;
        if (page.actived && page.actived.target === this) {
            while (mounted_menus.length && mounted_menus[mounted_menus.length - 1] !== page.actived) remove(mounted_menus.pop());
            if (!mounted_menus.length) {
                if (byMousedown === false) return;
                popMenu(this.menu, this);
            }
            else {
                remove(mounted_menus.pop());
            }
        }
        else {
            while (mounted_menus.length && mounted_menus[mounted_menus.length - 1] !== page) remove(mounted_menus.pop());
            if (byMousedown === false) return;
            popMenu(this.menu, this);
            if (!page.actived) {
                (page.root || page).blur();
            }
        }
    };
    var open1 = function (event) {
        if (event.which === 3) event.preventDefault();
        if (istoolbar) open.call(this, event.which === 3 ? 20 : 600);
    };
    if (!page.children.length || page.menutype === 1) {
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
        var $scope = {
            "menu-item"(e, s) {
                var a = button(
                    menuItem(e, s, this.hasIcon)
                );
                if (!page.firstMenu) {
                    page.firstMenu = a;
                }
                a.menu = s.menu;
                return a;
            },
            menus: items,
            hasIcon: hasIcon(),
            open: fire,
            cancel,
            popMenu: open,
            popMenu1: open1
        };
        if (page.$src) {
            var src = page.$src;
            var itemName = src.itemName;
            var className = `{'has-children':${itemName}.children&&${itemName}.children.length,
            'warn':${itemName}.type==='danger'||${itemName}.type==='warn'||${itemName}.type==='red',
            'selected':${itemName}.selected
        }`;
            var notHidden = `!${itemName}.hidden`;
            var generator = getGenerator(page, 'menu-item');
            list(page, function (index) {
                var item = items[index];
                if (!item) return;
                if (item instanceof Item) item = item.value;
                var a = $scope["menu-item"](null, item);
                if (src.itemName) a.setAttribute("e-if", notHidden);
                a.setAttribute("e-class", className);
                a = generator(index, item, a);
                a.menu = item;
                on("mouseleave")(a, cancel);
                on("mouseenter")(a, open);
                on("pointermove")(a, open);
                if (istoolbar) on("pointerdown")(a, open1);
                on("click")(a, fire);
                return a;
            });
            on("append")(page, function () {
                this.go(0);
            })
        }
        else {
            page.innerHTML = menuList;
            render(page, $scope);
            vbox(page);
        }
        page.total = items.length;
        page.renders.unshift(function () {
            this.$scope.hasIcon = hasIcon();
        });
    }
    else {
        var generator = getGenerator(page, 'menu-item');

        list(page, function (index) {
            var elem = generator(index);
            if (!elem) return;
            if (!page.firstMenu) {
                page.firstMenu = elem;
                page.total = this.src.length;
            }
            elem.menu = this.src[index];
            on("mouseleave")(elem, cancel);
            on("mouseenter")(elem, open);
            on("pointermove")(elem, cancel);
            if (istoolbar) on("pointerdown")(elem, open1);
            on("click")(elem, fire);
            return elem;
        }, direction);
    }
    page.open = function (a) {
        open.call(a);
    };
    page.active = function (a) {
        fire.call(a);
    };
    page.setFocus = setFocus;
    page.moveFocus = moveFocus;
    page.openFocus = openFocus;
    page.closeFocus = closeFocus;
    page.direction = direction;
    register.call(page);
    page.registerAsRoot = function () {
        root_menu = this;
    };
    return page;
}