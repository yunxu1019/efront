(document.body.hasAttribute("config-path") ? data.fromURL(document.body.getAttribute('config-path') || 'config/menus.json').loading_promise : Promise.resolve([])).then(function (items) {
    var result = [];
    var menuid = 0;
    var savedChildren = Object.create(null);
    var savedMenus = Object.create(null);
    var getChildren = function (menu) {
        if (!menu.id) {
            menu.id = ++menuid;
        }
        if (!savedMenus[menu.id]) {
            savedMenus[menu.id] = menu;
        }
        if (!(menu.id in savedChildren)) {
            savedChildren[menu.id] = menu.children;
            if (menu.children instanceof Array) {
                menu.children.forEach(getChildren);
                menu.children.forEach(a => a.parent = menu);
            }
        }
    };
    var getChild = function (menu) {
        if (menu.id) return savedMenus[menu.id];
        if (menu.path) {
            for (var k in savedMenus) {
                if (menu.path === savedMenus[k].path) {
                    return savedMenus[k];
                }
            }
        }
    };
    items.map(getChildren);
    result.update = function () {
        var opened = data.getInstance("menu-opened");
        var historys = zimoli.getCurrentHistory();
        var map = {}, mmap = {};
        historys.forEach((a, i) => map[a] = i + 1);
        result.splice(0, result.length);
        var actived, actived_value = 0;
        var a = function (menu) {
            var res = checkroles(user.roles, menu.roles);
            if (res) {
                if (savedChildren[menu.id] instanceof Array) menu.children = savedChildren[menu.id].filter(a);
                if (menu.path) {
                    if (map[menu.path] > actived_value) {
                        actived = menu;
                        actived_value = map[menu.path];
                    }
                    mmap[menu.id] = menu;
                }
                if (menu.id === opened.active) actived = menu, actived_value = historys.length;
            }
            return res;
        };
        result.push.apply(result, items.filter(a));
        result.opened = opened.map(a => mmap[a]).filter(a => !!a);
        var active = result.active;
        if (!active || result.indexOf(active) < 0) {
            actived = mmap[opened.active] || actived;
            if (actived) {
                if (actived_value === historys.length) result.open(actived);
            } else {
                result.open(result[0]);
            }
        }
    };
    var setActive = function (p, active) {
        while (p) {
            p.active = active;
            p = p.parent;
        }
    };
    result.load = function (menu) {
        zimoli.go(menu);
    };
    on("zimoli")(window, function (event) {
        var { zimoli } = event;
        data.setInstance("option-buttons", zimoli.options || [], false);
        var menu = getChild(zimoli);
        if (!menu) return;
        if (menu !== result.active) {
            setActive(result.active, false);
            setActive(menu, true);
            result.active = menu;
        }
        if (menu.id) {
            var opened = result.opened || [];
            var oped = opened.map(a => a.id);
            oped.active = menu.id;
            data.setInstance('menu-opened', oped);
        }
    });
    result.open = function (menu) {
        if (!menu) return;
        if (!menu.path) {
            menu.closed = !menu.closed;
            return;
        }
        if (menu === result.active) return;
        var opened = result.opened || [];
        if (!~opened.indexOf(menu) && !getChild(menu).id) {
            opened.push(menu);
        }
        if (result.active && result.active.id !== menu.id) {
            setActive(result.active, false);
        }
        setActive(menu, true);
        result.load(menu);
        result.active = menu;
    };
    result.close = function (menu) {
        if (menu === result[0]) return;
        var opened = result.opened;
        var index = opened.indexOf(menu);
        if (index >= 0) {
            opened.splice(index, 1);
        }
        if (index >= opened.length) {
            index = opened.length - 1;
        }
        if (menu.active) {
            if (opened.length > 0) {
                result.open(opened[index]);
            } else {
                result.open(result[0]);
            }
        }
    };
    result.reload = function () {
        result.load(result.active);
    };
    result.update();

    return result;
});