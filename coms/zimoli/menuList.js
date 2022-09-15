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
    this.ispop = false;
    this.setFocus(null);
});
var unblur = function () {
    if (document.activeElement !== this) {
        this.tabIndex = 0;
        this.focus();
    }
};

var setFocus = function (focused) {
    if (focused && (focused.hasAttribute("disabled") || focused.hasAttribute("line"))) return;
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
        if (newIndex < 0) newIndex = total + newIndex;
        if (newIndex > total - 1) newIndex = newIndex - total;
    }
    do {
        var e = page.getIndexedElement(newIndex);
        if (newIndex < 0) newIndex = total + newIndex;
        newIndex += delta;
    } while (e && (e.hasAttribute("disabled") || e.hasAttribute("line")));
    if (!e) page.setFocus(null);
    else if (page.ispop !== true) page.setFocus(e), page.open(e);
    else page.setFocus(e);
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
            else if (parent && parent.direction !== 'y') {
                parent.moveFocus(deltax);
            }
        }
        else if (deltax === -1) {
            // left
            if (parent) {
                if (parent.direction === 'y') remove(mounted_menus.pop());
                else parent.moveFocus(deltax);
            }
        }
        else {
            menu.moveFocus(deltay);
        }
    }
    else {
        if (deltay === 1) {
            // down
            if (menu.focused) var fmenu = menu.focused.menu;
            if (fmenu && fmenu.children && fmenu.children.length) openFocus();
            else if (parent && parent.direction === 'y') {
                parent.moveFocus(deltay);
            }
        }
        else if (deltay === -1) {
            // up
            if (parent) {
                if (parent.direction !== 'y') remove(mounted_menus.pop());
                else parent.moveFocus(deltay);
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
    bind('keydown.only.alt.')(menu, keyalt);
    bind('keydown.esc.only')(menu, keyesc);
    on('keydown.tab.only')(menu, keytab);
    on('keydown.left.only')(menu, keyleft);
    on('keydown.right.only')(menu, keyright);
    on('keydown.up.only')(menu, keyup);
    on('keydown.down.only')(menu, keydown);
    on('keydown.enter.only')(menu, keyspace);
    on('keydown.space.only')(menu, keyspace);
    on("contextmenu")(menu, e => e.preventDefault());
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
    function popMenu(item, target, emptyFocus) {
        if (page.actived) {
            clear();
            remove(page.actived);
        }
        if (emptyFocus !== false) page.setFocus(target);
        if (!item.length) return;
        page.setFocus(target);
        var clone = template.cloneNode();
        clone.$parentScopes = page.$parentScopes;
        clone.$scope = page.$scope;
        clone.$src = src;
        clone.innerHTML = template.innerHTML;
        var menu = main(clone, item.children, active);
        mounted_menus.push(menu);
        page.actived = menu;
        menu.root = page.root || page;
        if (menu.go) menu.go(0);
        popup(menu, target);
        if (page.ispop === true) {
        } else {
            page.ispop = 1;
        }
        once("remove")(menu, function () {
            removeFromList(mounted_menus, this);
        });
    }
    on("blur")(page, unfocus);
    var template = page.$template || document.createElement(page.tagName);
    if (!page.$template) {
        template.className = '';
        template.removeAttribute('mode');
        template.innerHTML = page.innerHTML;
        page.$template = template;
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
        clear();
        clearTimeout(popTimer);
    };
    on('pointerdown')(page, unblur);
    var fireTime = Speed.now();
    var fire = lazy(function () {
        var now = Speed.now();
        if (fireTime + 300 > now) {
            return;
        }
        fireTime = now;
        cancel();
        if (this.menu.line) return;
        if (byMousedown) return;
        if (this.hasAttribute("disabled") || this.hasAttribute('line')) return;
        var pop = active(this.menu.value, this);
        if (pop === false) return;
        var root = page.root || page;
        if (root.direction === 't' || root.selected) {
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
        }
        if (root.ispop === 1) root.ispop = false;
        if (page.actived && page.actived.target === this) {
            if (mounted_menus.indexOf(page.actived) >= 0) while (mounted_menus.length && mounted_menus[mounted_menus.length - 1] !== page.actived) remove(mounted_menus.pop());
            if (!mounted_menus.length || page === mounted_menus[mounted_menus.length - 1]) {
                if (byMousedown === false) return;
                popMenu(this.menu, this, false);
            }
            else {
                remove(mounted_menus.pop());
                page.actived = null;
            }
        }
        else {
            while (mounted_menus.length && mounted_menus[mounted_menus.length - 1] !== page) remove(mounted_menus.pop());
            if (byMousedown === false) return;
            page.actived = null;
            popMenu(this.menu, this, false);
            if (!page.actived) {
                page.blur();
            }
        }
    });
    var open1 = function (event) {
        if (event.which === 3) event.preventDefault();
        if (istoolbar) open.call(this, event.which === 3 ? 20 : 300);
    };
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
        open: fire,
        cancel,
        popMenu: open,
        popMenu1: open1
    };
    if (page.$src) {
        var src = page.$src;
        var itemName = src.itemName;
        var className = `{'has-children':${itemName}.children&&${itemName}.children.length,
            'warn':${itemName}.warn,
            actived:${itemName}.isActived()
        }`;
        var notHidden = `!${itemName}.hidden`;
        var ItemTemplate = document.createElement('menu-item');
        ItemTemplate.setAttribute("e-class", className);
        ItemTemplate.setAttribute("on-mouseleave", "cancel.call(this)");
        ItemTemplate.setAttribute("on-mouseenter", "popMenu.call(this)");
        ItemTemplate.setAttribute("on-click", "open.call(this)");
        ItemTemplate.setAttribute("_menu", src.itemName);
        ItemTemplate.innerHTML = menuItem.template;
        if (src.itemName) ItemTemplate.setAttribute("e-if", notHidden);
        if (istoolbar) ItemTemplate.setAttribute("on-pointerdown", "popMenu1.call(this,event)");
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
    }
    else {
        page.innerHTML = menuList;
        $scope.menus = items.map(i => i.constructor === Item ? i : new Item(i));
        render(page, $scope);
        vbox(page);
    }
    page.total = items.length;
    page.renders.unshift(function () {
        this.$scope.hasIcon = hasIcon();
    });
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