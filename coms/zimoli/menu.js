function move(array, src, dst) {
    var temp = array.splice(src, 1);
    if (temp.length) array.splice(dst, 0, temp[0]);
}
function menu(buttons, map = buttons.map((a, cx) => cx)) {
    var btns = buttons.map(function (a, cx) {
        return cx in map ? buttons[map[cx]] : a;
    });
    var menu_box = div();
    var menu_items = lattice(btns, 100);
    menu_items.nodrag = true;
    var menu_extra = button("");
    addClass(menu_extra, "more");
    menu_items.go(0);
    autodragchildren(menu_items, e => e.parentNode && e.parentNode.parentNode === menu_items, function (c1, c2) {
        move(btns, c1, c2);
        move(map, c1, c2);
    });
    var extra_list = list(function (index) {
        if (index < 0) return false;
        var btn = btns[menu_items.children[0].children.length + index];
        var clone = btn ? button(btn.innerText, "white") : false;
        css(clone, `display:block;width:100%;height:28px;overflow:hidden;box-shadow:none;text-align:left;padding:0 20px`);
        return clone;
    });
    css(extra_list, "min-width:180px;width:auto;height:auto;border:1px solid #000;background:#fff;padding:4px 0;");
    select(menu_extra, extra_list);
    onappend(extra_list, function () {
        extra_list.go(0);
    });
    appendChild(menu_box, menu_items, menu_extra);
    return menu_box;
}


function inlineMenu(nodes) {
    var container = this;
    container = tree(this);
    container.innerHTML = "";
    container.setData(nodes);
    container.go(0);
    return container;
}
var getArrayNodes = function (elem) {
    var nodes = [];
    var deep = 0;
    var run = function (node) {
        var nodeName = node.children.length > 1 ? node.children[0].innerHTML : node.innerHTML;
        deep++;
        if (nodeName) {
            nodes.push({
                name: nodeName,
                tab: deep,
                href: node.getAttribute("path") || node.getAttribute("href"),
                class: node.className,
                closed: true
            });
        }
        var index = nodes.length - 1;
        if (node.children.length > 1) {
            [].forEach.call(node.children[1].children, run);
        }
        nodes[index].children = nodes.splice(index + 1, nodes.length - index);
        deep--;
    };
    [].forEach.call(elem.children, run);
    return nodes;
};

var getTreeNodes = function (elem) {
    var nodes = [];
    var deep = 0;
    var run = function (node) {
        var nodeName = node.children.length > 1 ? node.children[0].innerHTML : node.innerHTML;
        deep++;
        if (nodeName) {
            nodes.push({
                name: nodeName,
                tab: deep,
                href: node.getAttribute("path") || node.getAttribute("href"),
                class: node.className,
                closed: true
            });
        }
        if (node.children.length > 1) {
            [].forEach.call(node.children[1].children, run);
        }
        deep--;
    };
    [].forEach.call(elem.children, run);
    return nodes;
};

function main(elem, mode) {
    if (isElement(elem)) {
        // var os = /Samsung|Firefox|Chrome|MSIE|Safari/i.exec(navigator.userAgent);
        // if (os) {
        //     os = os[0].toLowerCase();
        // } else {
        //     os = 'unknown';
        // }
        // elem.setAttribute('browser', os);
        var mode = elem.getAttribute('mode') || elem.getAttribute('type');
        if (!mode) {
            if (/^[xyhvtci]/i.test(elem.tagName)) {
                mode = elem.tagName.slice(0, 1);
            }
            else if (/[xyhvtci]$/i.test(elem.tagName)) {
                mode = elem.tagName.slice(0, 1);
            }
        }
        mode = mode ? mode.toLowerCase() : "horizonal";

        switch (mode) {
            case "i":
            case "c":
            case "inline":
            case "t":
            case "tree":
                mode = "tree";
                if (elem) {
                    var generator = getGenerator(elem, 'menu-item');
                    tree(elem, function (index, item) {
                        var e = generator(index, item);
                        if (!e || e.children.length) return e;
                        var m = menuItem(e, item, elem.useIcon);
                        return m;
                    });
                    care(elem, function (data) {
                        elem.setData(data);
                    });
                    elem.renders.push(function () {
                        var src = this.src;
                        var hasIcon = false;
                        for (var cx = 0, dx = src; cx < dx; cx++) {
                            if (src[cx].icon) {
                                hasIcon = true;
                                break;
                            }
                        }
                        elem.useIcon = hasIcon;
                    });
                } else {
                    var nodes = getTreeNodes(elem);
                    elem = inlineMenu.call(elem, nodes);
                }
                break;
            case "h":
            case "x":
            case "horizonal":
                var direction = 'x';
                mode = "horizonal";
            case "v":
            case "y":
            case "vertical":
                var emit = function (item, target) {
                    active(elem, item, item.value, target);
                };
                if ("$src" in elem) {
                    getGenerator(elem, 'menu-item');
                    care(elem, function (src) {
                        menuList(elem, getTreeFromData(src), emit, direction);
                        elem.registerAsRoot();
                    });
                }
                else {
                    var nodes = getArrayNodes(elem);
                    remove(elem.children);
                    elem = menuList(elem, nodes, emit, direction);
                    elem.registerAsRoot();
                }
                break;
            default:
                throw new Error(`不支持的菜单类型：${mode}`);
        }
    } else {
        mode = mode || "horizonal";
        elem = menu.apply(null, arguments);
    }
    elem.setAttribute('mode', mode);
    return elem;

}