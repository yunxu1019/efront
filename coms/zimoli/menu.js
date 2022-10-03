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
    extra_list.go(0);
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
            nodes.push(new Item({
                name: nodeName,
                tab: deep,
                href: node.getAttribute("path") || node.getAttribute("href"),
                class: node.className,
                closed: true
            }));
        }
        var index = nodes.length - 1;
        if (node.children.length > 1) {
            [].forEach.call(node.children[1].children, run);
        }
        nodes[index].push.apply(nodes[index], nodes.splice(index + 1, nodes.length - index));
        nodes[index].children = nodes[index];
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
/**
 * @param {any} item
 * @param {Event} event
 */
var emitEvent = function (item, event) {
    if (event.defaultPrevented) return;
    event.preventDefault(true);
    if (item.disabled) return;
    active(this, item, "global", this.$src ? createItemTarget.call(this, item) : this);
}
function bindGlobalkey(elem, keymap, emit) {
    if (elem.keyoff) {
        for (var off of elem.keyoff) {
            off();
        }
    }
    if (!keymap) return;
    var keyoff = [];
    for (let k in keymap) {
        keyoff.push(bind("keydown.only." + k)(elem, emitEvent.bind(elem, keymap[k])));
    }
    elem.keyoff = keyoff;
}

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
            if (elem.hasAttribute("inline")) mode = 'inline';
            else if (elem.hasAttribute("vertical")) mode = "vertical";
            else if (elem.hasAttribute("horizonal")) mode = "horizonal";
            else if (
                elem.hasAttribute("toolbar")
                || elem.hasAttribute('tool')
                || elem.hasAttribute('tools')
                || elem.hasAttribute('bar')
            ) mode = "toolbar";
        }
        if (!mode) {
            if (/^[xyhvtci]/i.test(elem.tagName)) {
                mode = elem.tagName.slice(0, 1);
                if (/^t$/i.test(mode)) mode = elem.tagName.slice(0, 2);
            }
            else if (/[xyhvci]$/i.test(elem.tagName)) {
                mode = elem.tagName.slice(elem.tagName.length - 1);
            }
        }
        mode = mode ? mode.toLowerCase() : "horizonal";
        var direction;
        switch (mode) {
            case "tr":
            case "i":
            case "c":
            case "inline":
                mode = "inline";
                if (elem) {
                    var generator = getGenerator(elem, 'menu-item');
                    care(elem, function (src) {
                        if (src) src = getTreeFromData(src);
                        var hasIcon = src.hasIcon;
                        JSON.stringify(src);
                        elem.useIcon = hasIcon;
                        elem.src = src;
                    });
                    tree(elem, function (index, item, menu) {
                        var e = generator(index, item);
                        if (!e || e.children.length) return e;
                        var m = menuItem(null, menu, elem.useIcon[0]);
                        return m;
                    });
                } else {
                    var nodes = getTreeNodes(elem);
                    elem = inlineMenu.call(elem, nodes);
                }
                break;
            case "to":
            case "t":
            case "b":
            case "tool":
            case "tools":
            case "bar":
            case "toolbar":
                direction = 't';
                mode = "toolbar";
            case "h":
            case "x":
            case "horizonal":
                if (!direction) {
                    direction = 'x';
                    mode = "horizonal";
                }
            case "v":
            case "y":
            case "vertical":
                if (!direction) mode = "vertical", direction = 'y';
                var emit = function (item, target) {
                    active(elem, item, null, elem.$src ? createItemTarget.call(elem, item, target) : target);
                };
                if ("$src" in elem) {
                    var src0 = [];
                    care(elem, function (src) {
                        bindGlobalkey(elem, src.keymap, emit);
                        src0.splice(0, src0.length);
                        var s = getTreeFromData(src);
                        if (s.actived) {
                            elem.selected = s.actived;
                        }
                        else if (direction === 't') {
                            elem.selected = s[0];
                            if (elem.selected) elem.selected.setActive(true);
                        }
                        var i = 0;
                        while (i < s.length) {
                            src0.push.apply(src0, s.slice(i, i += 1000));
                        }
                    });
                    menuList(elem, src0, emit, direction);
                }
                else {
                    var nodes = getArrayNodes(elem);
                    remove(elem.children);
                    elem = menuList(elem, nodes, emit, direction);
                }
                break;
            default:
                throw new Error(`不支持的菜单类型：${mode}`);
        }
    } else {
        mode = mode || "horizonal";
        elem = menu.apply(null, arguments);
    }
    if (!elem.hasAttribute('mode')) elem.setAttribute('mode', mode);
    if (!elem.hasAttribute(mode)) elem.setAttribute(mode, '');

    return elem;

}