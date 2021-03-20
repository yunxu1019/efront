var sampleElement = document.createElement('context');
var createMenu = function (event, items) {
    var menulist = sampleElement.cloneNode();
    menulist.setAttribute("mode", "v");
    menulist.tabIndex = 0;

    var elem = menuList(menulist, items, function () {
        if (action.apply(this, arguments) !== false) {
            remove(elem);
        }
    });

    return elem;
}
function contextmenu(target, menu) {
    on("contextmenu")(target, function (event) {
        event.preventDefault();
        if (menu instanceof Function) {
            menu = menu.call(this, event);
        }
        if (menu instanceof Array) {
            menu = createMenu.call(this, event, menu);
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