(document.body.hasAttribute('menu-path') || document.body.hasAttribute("menu") || document.body.hasAttribute("config-path") ? data.fromURL(document.body.getAttribute('menu-path') || document.body.getAttribute('menu') || document.body.getAttribute('config-path') || 'menu.yml').loading_promise : Promise.resolve([])).then(function (items) {
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
        if (!menu.name) {
            menu.name = Object.keys(menu)[0];
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
    var parseMenuList = function (items) {
        if (items instanceof Array) {
            if (!items[0] || !items[0].name) {
                var items1 = [];
                for (var cx = 0, dx = items.length; cx < dx; cx++) {
                    var item = items[cx];
                    if (!item) continue;
                    item = parseMenuList(item);
                    items1.push.apply(items1, item);
                    items1.push({ line: true });
                }
                items1.pop();
                items = items1;
            }
            return items;
        }
        if (items instanceof Object) {
            var keys = Object.keys(items);

            items = keys.map(k => {
                var c = items[k];
                var item = {};
                if (c instanceof Object) {
                    item.children = parseMenuList(c);
                }
                else if (typeof c === 'string') {
                    var [path, data] = c.split(/\?/);
                }
                var [icon] = k.split(/\s+/);
                if (icon.length < k.length) {
                    item.icon = icon;
                    var name = k.slice(icon.length).trim();
                } else name = k;
                if (/,/.test(name)) {
                    var [name, ...roles] = name.split(',');
                }
                if (/^\-+$/.test(name)) item.line = true;
                else item.name = name;
                if (roles) item.roles = roles;
                if (path) item.path = path;
                if (data) item.params = parseKV(data);
                if (/,/.test(name)) {

                }
                return item;
            });
            return items;
        }
        return [];
    };
    result.update = function (items) {
        delete result.loading_promise;
        delete result.then;
        items = parseMenuList(items);
        items.map(getChildren);
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
                if (actived_value === historys.length) {
                    result.active = actived;
                };
            }
        }
        return result;
    };
    var setActive = function (p, active) {
        while (p) {
            p.active = active;
            p = p.parent;
        }
    };
    result.load = function (menu) {
        zimoli.go(menu);
        return result;
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
        if (!menu) {
            menu = result.active || result[0];
            delete result.active;
        }
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
        return result;
    };
    result.from = result.fetch = function (url) {
        result.loading_promise = data.from(url).loading_promise.then(result.update);
        result.then = then;
        return result;
    };
    result.parse = parseMenuList;
    var then = function (ok, oh) {
        if (this.loading_promise) {
            return this.loading_promise.then(ok, oh);
        }
        delete result.then;
        ok(result);
        result.then = then;
    };
    result.update(items);
    return result;
});