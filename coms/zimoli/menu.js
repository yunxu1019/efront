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
    var menu = tree();
    onactive(menu, function (e) {
        e.value.href && zimoli.go(e.value.href);
    });
    menu.src(nodes);
    menu.go(0);
    return menu;
}
function verticalMenu(nodes) {
    return menuList(nodes);
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
                elem = inlineMenu(nodes);
                break;
            case "x":
            case "y":
            case "vertical":
                var nodes = getArrayNodes(elem);
                elem = verticalMenu(nodes);
                break;
            case "h":
            case "x":
            case "horizontal":
                var nodes = getArrayNodes(elem);
                elem = menu(nodes);
                break;
            default:
                elem.setAttribute("mode", "horizonal");
                elem = menu(nodes);
        }
    } else {
        mode = mode || "horizonal";
        elem = menu.apply(null, arguments);
    }
    elem.setAttribute('mode', mode);
    return elem;

}