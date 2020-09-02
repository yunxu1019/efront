(document.body.hasAttribute("config-path") ? data.fromURL(document.body.getAttribute('config-path') || 'config/menus.json').loading_promise : Promise.resolve([])).then(function (items) {
    var result = [];
    var menuid = 0;
    var savedChildren = {};
    var getChildren = function (menu) {
        if (!menu.id) {
            menu.id = ++menuid;
        }
        if (!(menu.id in savedChildren)) {
            savedChildren[menu.id] = menu.children;
            if (menu.children instanceof Array) {
                menu.children.forEach(getChildren);
                menu.children.forEach(a => a.parent = menu);
            }
        }
    };
    items.map(getChildren);
    result.update = function () {
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
            }
            return res;
        };
        result.push.apply(result, items.filter(a));
        var opened = data.getInstance("menu-opened").map(a => mmap[a]).filter(a => !!a);
        result.opened = opened;
        var active = result.active;
        if (!active || result.indexOf(active) < 0) {
            if (actived) {
                if (active && active !== actived) setActive(active, false);
                if (actived_value === historys.length) result.open(actived);
                else setActive(actived, true);
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
    });
    result.open = function (menu) {
        if (!menu) return;
        if (!menu.path) {
            menu.closed = !menu.closed;
            return;
        }
        if (menu === result.active) return;
        var opened = result.opened || [];
        if (!~opened.indexOf(menu)) {
            opened.push(menu);
            data.setInstance('menu-opened', opened.map(a => a.id));

            console.log(data.getInstance('menu-opened'))
        }
        if (result.active) {
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