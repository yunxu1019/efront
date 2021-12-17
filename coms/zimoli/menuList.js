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
    function popMenu(item, target) {
        if (page.active) {
            clear();
            remove(page.active);
        }
        if (!item.children || !item.children.length) return;
        var clone = template.cloneNode();
        clone.$parentScopes = page.$parentScopes;
        clone.$src = src;
        clone.innerHTML = template.innerHTML;
        var menu = main(clone, item.children, active);
        mounted_menus.push(menu);
        page.active = menu;
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
    if (!page.ispop) on("blur")(page, unfocus);
    var template = page.tempalte || document.createElement("ylist");
    if (!page.tempalte) {
        template.className = '';
        template.removeAttribute('mode');
        template.innerHTML = page.innerHTML;
        page.tempalte = template;
    }
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
            "menu-item": function (e, s) {
                return button(
                    menuItem(e, s)
                );
            },
            menus: items,
            hasIcon: hasIcon(),
            open(menu, elem) {
                var pop = active(menu, elem);
                if (pop === false) return;
                var root = page.root || page;
                if (root.ispop === 1) root.ispop = false;
                if (!mounted_menus.length) {
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
        };
        if (page.$src) {
            var src = page.$src;
            var parentScopes = page.$parentScopes;
            var itemName = src.itemName;
            var className = `{'has-children':${itemName}.children&&${itemName}.children.length,'warn':${itemName}.type==='danger'||${itemName}.type==='warn'||${itemName}.type==='red'}`;
            var notHidden = `!${itemName}.hidden`;
            list(page, function (index) {
                var item = items[index];
                if (!item) return;
                var a = menuItem(null, item, $scope.hasIcon);
                var scope = {};
                if (src.itemName) scope[src.itemName] = item;
                if (src.keyName) scope[src.keyName] = index;
                if (src.indexName) scope[src.indexName] = index;
                if (src.srcName) scope[src.srcName] = items;
                if (src.itemName) a.setAttribute("e-if", notHidden);
                on("mouseleave")(a, function () {
                    clearTimeout($scope.popTimer);
                });
                on("mouseenter")(a, function () {
                    $scope.popTimer = $scope.popMenu(item, this);
                });
                on("click")(a, function () {
                    $scope.open(item, this);
                });
                a.setAttribute("e-class", className);
                a = button(a);
                render(a, scope, parentScopes);
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
        page.renders.unshift(function () {
            this.$scope.hasIcon = hasIcon();
        });
    } else {
        var generator = getGenerator(page);
        list(page, function (index) {
            var elem = generator(index);
            if (!elem) return;
            on("mouseenter")(elem, function () {
                if (page.ispop) popMenu(this.src[index], this);
            });
            on("click")(elem, function () {
                var pop = active(this.src[index], this);
                if (pop === false) return;
                var root = page.root || page;
                if (root.ispop === 1) root.ispop = false;
                if (!mounted_menus.length) {
                    popMenu(this.src[index], this);
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