var _active = action;
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
var unfocus = lazy(function () {
    if (mounted_menus.indexOf(document.activeElement) >= 0) return;
    remove(mounted_menus);
    if (root_menu) root_menu.setFocus(null);
    var root = this.root || this;
    if (root.ispop === 1) root.ispop = false;
    root.actived = null;
    root.setFocus(null);
});
var unblur = function () {
    if (document.activeElement !== this) {
        this.tabIndex = 0;
        this.focus();
    }
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
            // right
            if (menu.focused) var fmenu = menu.focused.menu;
            if (fmenu && fmenu.children && fmenu.children.length) {
                openFocus();
            }
            else if (parent) {
                var index = mounted_menus.lastIndexOf(parent);
                while (parent && parent.direction === 'y') {
                    parent = mounted_menus[--index];
                }
                if (!parent && root_menu.direction !== 'y') parent = root_menu;
                if (parent) parent.moveFocus(deltax, parent.ispop);
            }
        }
        else if (deltax === -1) {
            // left
            if (parent) {
                if (parent.direction === 'y') remove(mounted_menus.pop());
                else parent.moveFocus(deltax, parent.ispop);
            }
        }
        else {
            menu.moveFocus(deltay, menu.ispop);
        }
    }
    else {
        if (deltay === 1) {
            // down
            if (menu.focused) var fmenu = menu.focused.menu;
            if (fmenu && fmenu.children && fmenu.children.length) openFocus();
            else if (parent) {
                var index = mounted_menus.lastIndexOf(parent);
                while (parent && parent.direction !== 'y') {
                    parent = mounted_menus[--index];
                }
                if (!parent && root_menu.direction === 'y') parent = root_menu;
                if (parent) parent.moveFocus(deltay, parent.ispop);
            }
        }
        else if (deltay === -1) {
            // up
            if (parent) {
                if (parent.direction !== 'y') remove(mounted_menus.pop());
                else parent.moveFocus(deltay, parent.ispop);
            }
        }
        else {
            menu.moveFocus(deltax, menu.ispop);
        }
    }
};
function keyalt() {
    if (this === document.activeElement) this.blur();
    else if (root_menu === this && root_menu !== document.activeElement) {
        root_menu.tabIndex = 0;
        root_menu.focus();
        root_menu.setFocus(root_menu.getIndexedElement(0));
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
function getFocusedMenu() {
    var menu = mounted_menus[mounted_menus.length - 1];
    if (!menu || !menu.focused) menu = mounted_menus[mounted_menus.length - 2] || root_menu;
    if (mounted_menus.indexOf(document.activeElement) >= 0 || document.activeElement === root_menu) return menu;
}
function keyspace() {
    var menu = getFocusedMenu();
    if (menu && menu.focused) {
        menu.focused.click();
    }
}
function keyhome() {
    var menu = getFocusedMenu();
    if (menu) menu.moveFocus("home", true);
}
function keyend() {
    var menu = getFocusedMenu();
    if (menu) menu.moveFocus("end", true);
}
function keypagedown() {
    var menu = getFocusedMenu();
    if (menu) menu.moveFocus("pagedown", true);
}
function keypageup() {
    var menu = getFocusedMenu();
    if (menu) menu.moveFocus("pageup", true);
}
function register() {
    var menu = this;
    // if (!root_menu) root_menu = this;
    bind('keydown.only.alt.')(menu, keyalt);
    bind('keydown.esc.only')(menu, keyesc);
    on('keydown.pageup.only')(menu, keypageup);
    on('keydown.pagedown.only')(menu, keypagedown);
    on('keydown.home.only')(menu, keyhome);
    on('keydown.end.only')(menu, keyend);
    on('keydown.tab.only')(menu, keytab);
    on('keydown.left.only')(menu, keyleft);
    on('keydown.right.only')(menu, keyright);
    on('keydown.up.only')(menu, keyup);
    on('keydown.down.only')(menu, keydown);
    on('keydown.enter.only')(menu, keyspace);
    on('keydown.space.only')(menu, keyspace);
}
function main() {
    var page, items, active = _active, direction = 'y';
    for (var a of arguments) {
        if (isNode(a)) page = a;
        else if (a instanceof Function) active = a;
        else if (a instanceof Array) items = a;
        else if (typeof a === 'string') direction = a;
    }
    if (!isNode(page)) {
        page = document.createElement("menu-list");
    }
    var main = this;
    if (direction == 'y') page.ispop = true;
    var istoolbar = direction === 't';
    function popMenu(item, target) {
        if (page.actived) {
            clear();
            remove(page.actived);
        }
        if (!item.length) return;
        var menu = item.menu;
        if (!menu) {
            var clone = template.cloneNode();
            clone.$parentScopes = page.$parentScopes;
            clone.$scope = page.$scope;
            clone.$src = src;
            clone.innerHTML = template.innerHTML;
            menu = item.menu = main(clone, item.children, active);
        }
        mounted_menus.push(menu);
        page.actived = menu;
        menu.root = page.root || page;
        if (menu.go) menu.go(0);
        popup(menu, target);
        if (page.ispop === true) {
        } else {
            page.ispop = 1;
        }
        on("remove")(menu, function () {
            removeFromList(mounted_menus, this);
            menu.setFocus(null);
        });
        return menu;
    }
    on("blur")(page, unfocus);
    var template = page.$template || document.createElement(page.tagName);
    if (!page.$template) {
        template.className = '';
        template.removeAttribute('mode');
        template.innerHTML = page.innerHTML;
        page.$template = template;
    }
    var enterMenu = lazy(function (menu) {
        if (page.ispop) {
            page.setFocus(menu);
            popMenu(menu.menu, menu);
        }
    }, 60);
    on('pointerdown')(page, unblur);
    var autoremove = function () {
        document.activeElement.blur();
    };
    var activeMenu = function () {
        if (this.menu.line) return;
        if (this.hasAttribute("disabled") || this.hasAttribute('line')) return;
        var pop = active(this.menu.value, this);
        if (pop === false) return;
        var root = page.root || page;
        var istool = root.direction === 't' || root.selected
        if (root.ispop === 1) root.ispop = false;
        if (istool) {
            var menu = this.menu;
            if (root.selected) root.selected.setActive(false);
            if (root !== page) {
                var target = root.actived.target;
                if (isObject(menu.value)) delete menu.value.children;
                target.menu.extends(menu.value);
                menu = target.menu;
            }
            else {
                target = this;
            }
            menu.setActive(true);
            root.selected = target.menu;
            autoremove();
            return;
        }
        if (page.actived && page.actived.target === this) {
            if (mounted_menus.indexOf(page.actived) >= 0) while (mounted_menus.length && mounted_menus[mounted_menus.length - 1] !== page.actived) remove(mounted_menus.pop());
            if (!mounted_menus.length || page === mounted_menus[mounted_menus.length - 1]) {
                popMenu(this.menu, this, false);
            }
            else {
                remove(mounted_menus.pop());
                page.actived = null;
            }
        }
        else {
            while (mounted_menus.length && mounted_menus[mounted_menus.length - 1] !== page) remove(mounted_menus.pop());
            page.actived = null;
            popMenu(this.menu, this, false);
            if (!page.actived) {
                autoremove();
            }
        }
    };
    var pressMenu = function (event) {
        if (event.which === 3) {
            popMenu(this.menu, this);
        }
        else {
            switchMenu.done = false;
            switchMenu.call(this);
        }
    };
    var clickMenu = function (event) {
        switchMenu.cancel();
        if (!switchMenu.done) activeMenu.call(this);
    };


    var switchMenu = lazy(function (event) {
        if (onclick.preventClick) return;
        popMenu(this.menu, this);
        switchMenu.done = true;
    }, 300);
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
            if (e && s === e.$scope) s = itemName ? s[itemName] : s.menu;
            var a = button(
                menuItem(e, s, this.hasIcon)
            );
            a.menu = s;
            return a;
        },
        hasIcon: hasIcon(),
        enterMenu,
        clickMenu,
        pressMenu,
    };
    if (!page.$src) page.$src = render.parseRepeat("m in menus");
    var src = page.$src;
    var itemName = src.itemName;
    var className = `{'has-children':${itemName}.children&&${itemName}.children.length,
            'warn':${itemName}.warn,
            actived:${itemName}.isActived()
        }`;
    var notHidden = `!${itemName}.hidden`;
    var ItemTemplate = document.createElement('menu-item');
    ItemTemplate.setAttribute("on-click", "clickMenu.call(this,event)");
    if (istoolbar) ItemTemplate.setAttribute("on-pointerdown", "pressMenu.call(this,event)");
    else ItemTemplate.setAttribute("on-mouseenter", `enterMenu(this)`);
    ItemTemplate.setAttribute("e-class", className);
    if (src.itemName) ItemTemplate.setAttribute("e-if", notHidden);
    ItemTemplate.setAttribute("_menu", src.itemName);
    ItemTemplate.innerHTML = menuItem.template;
    var generator = getGenerator(page, ItemTemplate);
    page.$generatorScopes.push($scope);
    list(page, function (index) {
        var item = items[index];
        if (!item) return;
        if (item.constructor !== Item) item = new Item(item);
        if (istoolbar) {
            if (item.constructor === Item && item.length && !item.extended) {
                item.extends(item[0]);
            }
        }
        return generator(index, item);
    }, direction);
    page.renders.unshift(function () {
        this.$scope.hasIcon = hasIcon();
    });
    page.open = function (a) {
        if (!a.menu || !a.menu.length) {
            return;
        }
        var m = popMenu(a.menu, a);
        m.moveFocus("home");
    };
    page.active = function (a) {
        activeMenu.call(a);
    };
    on("focused")(page, function () {
        var focused = page.focused;
        if (page.ispop && page === root_menu) popMenu(focused.menu, focused, false);
    });
    page.openFocus = openFocus;
    page.closeFocus = closeFocus;
    page.direction = direction;
    on("contextmenu")(page, e => e.preventDefault());
    page.registerAsRoot = function () {
        register.call(this);
        root_menu = this;
    };
    return page;
}