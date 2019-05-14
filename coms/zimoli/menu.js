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
    onappend(menu_items, function () {
        menu_items.go(0);
    });
    autodragchildren(menu_items, e => e.parentNode && e.parentNode.parentNode === menu_items, function (c1, c2) {
        move(btns, c1, c2);
        move(map, c1, c2);
    });
    var extra_list = list(function (index) {
        var btn = btns[menu_items.children[0].children.length + index];
        var clone = btn ? button(btn.innerText, "white") : false;
        css(clone, `display:block;width:100%;height:28px;overflow:hidden;box-shadow:none;text-align:left;padding-left:20px`);
        return clone;
    });
    css(extra_list, "min-width:180px;width:auto;height:auto;border:1px solid #000;background:#fff;padding:8px 0;");
    extra_list.go(0);
    select(menu_extra, extra_list);
    appendChild(menu_box, menu_items, menu_extra);
    return menu_box;
}


function inlineMenu(nodes) {
    var container = this;

    var src = container.getAttribute("src") || container.getAttribute("ng-src") || container.getAttribute("v-src");
    if (src) {
        var parsedSrc = render.parseRepeat(src);
        if (!parsedSrc) {
            container.removeAttribute("src");
            var generator = getGenerator(container);
        } else {
            container.removeAttribute("src");
            var generator = getGenerator(container, parsedSrc);
        }
        container.setAttribute("ng-src", parsedSrc ? parsedSrc.srcName : src);
        on('changes')(container, function (event) {
            if (event.changes.src) {
                container.setData(this.src);
                container.go(container.index() || 0);
            };
        });
        tree(container, generator);
    } else {
        container = tree(this);
        container.innerHTML = "";
        container.setData(nodes);
    }
    container.go(0);
    return container;
}
function verticalMenu(nodes) {
    var menu = menuList.call(this, nodes, function (item) {
        active(menu, item, this);
    });
    return menu;
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
        var mode = elem.getAttribute('mode');
        mode = mode && mode.toLowerCase() || "horizonal";
        switch (mode) {
            case "i":
            case "c":
            case "inline":
                var nodes = getTreeNodes(elem);
                elem = inlineMenu.call(elem, nodes);
                break;
            case "x":
            case "y":
            case "vertical":
                var nodes = getArrayNodes(elem);
                elem = verticalMenu.call(elem, nodes);
                break;
            case "h":
            case "x":
            case "horizontal":
                var nodes = getArrayNodes(elem);
                elem = menu(nodes);
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