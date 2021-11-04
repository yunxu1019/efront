var sampleElement = document.createElement('context');
var createMenu = function (event, items) {
    var menulist = sampleElement.cloneNode();
    menulist.setAttribute("mode", "v");
    menulist.tabIndex = 0;
    items = items.filter(item => {
        if (!item.when) return true;
        if (!item.when(event)) return false;
        return true;
    });
    var elem = menuList(menulist, items, async function (item) {
        if (await action.call(this, item, event.target) !== false) {
            remove(elem);
        }
    });

    return elem;
}
function contextmenu(target, menuItems) {
    on("contextmenu")(target, function (event) {
        event.preventDefault();
        var menu;
        if (menuItems instanceof Function) {
            menu = menuItems.call(this, event);
        }
        if (menuItems instanceof Array) {
            menu = createMenu.call(this, event, menuItems);
        }
        if (!menu) return;
        css(menu, {
            position: "absolute",
        });
        popup(menu);
        menu.focus();
        var { offsetWidth, offsetHeight } = menu;
        var left = event.clientX, top = event.clientY;
        if (offsetWidth + left > innerWidth) {
            left = left - offsetWidth;
        }
        if (left < 0) {
            left = 0;
        }
        if (offsetHeight + top > innerHeight) {
            top = top - offsetHeight;
        }
        if (top < 0) {
            top = 0;
        }
        css(menu, {
            left: left + "px",
            top: top + "px"
        });
        onmousedown(menu, e => e.preventDefault());
        onblur(menu, lazy(e => remove(menu)));
    });
    return sampleElement;
}