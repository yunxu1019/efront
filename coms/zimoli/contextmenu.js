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
    var elem = menuList(menulist, items, function (item) {
        action.call(this, item, event.target).then(function (e) {
            if (e !== false) remove(elem);
        });
        return false;
    });

    return elem;
}
function contextmenu(target, menuItems) {
    var showContext = function (event) {
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
        popup(menu, event);
        onmousedown(menu, e => e.preventDefault());
        return menu;
    };
    var menuHandle = 0;
    var tm;
    moveupon(target, {
        start(event) {
            if (event.defaultPrevented || event.type === 'mousedown') return;
            clearTimeout(menuHandle);
            menuHandle = setTimeout(function () {
                var e = createEvent("contextmenu", true);
                e.clientX = event.clientX;
                e.clientY = event.clientY;
                Object.defineProperty(e, "target", { value: event.target });
                Object.defineProperty(e, "srcElement", { value: event.srcElement });
                dispatch(event.target, e);
            }, 600);
        },
        move() {
            if (onclick.preventClick) {
                if (tm) remove(tm);
                return clearTimeout(menuHandle);
            }
        },
        end(event) {
            clearTimeout(menuHandle);
            event.preventDefault();
            _remove = function () { };
            setTimeout(function () {
                _remove = remove;
                if (tm) tm.focus();
            });
        }
    });
    var _remove = remove;
    var blur = lazy(function () {
        if (document.activeElement === this) return;
        _remove(this);
    }, 60);
    on("contextmenu")(target, function (event) {
        if (event.defaultPrevented) return;
        event.preventDefault();
        if (tm) remove(tm), tm = null;
        tm = showContext(event);
        if (!tm) return;
        tm.focus();
        onblur(tm, blur);
    });
    return sampleElement;
}