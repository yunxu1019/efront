function getTreeFromArray(array) {
    var root = [];
    root.tab = -Infinity;
    root.count = 0;
    var path = [root];
    for (var cx = 0, dx = array.length; cx < dx; cx++) {
        var arg = array[cx];
        var item = new Item(arg);
        item.root = root;
        for (var cy = path.length - 1; cy >= 0; cy--) {
            var parentElement = path[cy];
            if (parentElement.tab < arg.tab) {
                item.parent = parentElement;
                parentElement.push(item);
                path.splice(cy + 1, path.length - cy - 1, item);
                break;
            }
            parentElement.parent.count += parentElement.count || parentElement.length || 1;
        }
    }
    while (path.length > 1) {
        var item = path.pop();
        path[path.length - 1].count += item.count || item.length || 1;
    }
    return root;
}

function getArrayFromTree(root, skipClosed = true) {
    var path = [root], pathcx = [0];
    var result = [];
    loop: while (pathcx.length) {
        var pathindex = pathcx.length - 1;
        var cx = pathcx[pathindex];
        var item = path[pathindex];
        if (cx >= item.length) {
            path.pop();
            pathcx.pop();
            continue loop;
        }
        var elem = item[cx];
        result.push(elem);
        pathcx[pathindex] = ++cx;
        if (!skipClosed || !elem.closed) {
            if (elem.length) {
                path.push(elem);
                pathcx.push(0);
            }
        }
    }
    return result;
}
function appendTo(parent, datas) {
    var tab = parent && parent.tab + 1 || 1;
    var length = parent.length;
    datas.map(function (data) {
        if (data instanceof Object) {
            data.tab = tab;
            var item = new Item(data);
            item.parent = parent;
            item.root = parent.root;
            parent.push(item);
        }
    });

    var delta = parent.length - length;
    while (parent) {
        parent.count += delta;
        parent = parent.parent;
    }
}
function tree() {
    var element, generator;
    [].forEach.call(arguments, function (arg) {
        if (isNode(arg)) {
            element = arg;
        } else if (arg instanceof Function) {
            generator = arg;
        }
    });
    var dom = [], root = null;
    var banner = list(element, function (index) {
        var coms = dom;
        if (index >= coms.length) return;
        var com = coms[index];
        var span;
        if (!com) return;
        if (isFunction(generator)) {
            var elem = generator(index, com);
            if (!elem) return;
            span = document.createElement('div');
            span.innerHTML = new Array(com.tab + 1).join("<t></t>");
            span.appendChild(elem);
        } else {
            span = div();
            html(span, `${repeat("<t></t>", com.tab)}<c>${com.name}</c>${com.test ? "<i>_test</i>" : ""}${com.closed && com.length ? " <a>(" + com.count + ")</a>" : ""}`);
        }
        var _div = button(span);
        addClass(_div, "tab" + com.tab);
        if (com.length) {
            addClass(_div, com.closed ? "closed" : "open");
        } else {
            addClass(_div, "empty");
        }
        if (com.checked || com.is_checked) {
            addClass(_div, "checked");
        } else if (com.selected || com.is_selected) {
            addClass(_div, "selected");
        }
        if (com.actived || com.is_actived) {
            addClass(_div, "actived");
        }
        if (com.class) {
            addClass(_div, com.class);
        }
        com.target = _div;
        onclick(_div, function () {
            if (!active(banner, com.value, com)) {
                return;
            };
            com.closed = !com.closed;
            refresh();
        })
        return _div;
    });

    banner.setData = function (src) {
        if (isArray(src)) {
            if (src[0] && 'tab' in src[0]) {
                root = getTreeFromArray(src);
            } else {
                root = getTreeFromData(src);
                console.log(root);
            }
            dom = getArrayFromTree(root);
        }
    };
    banner.addData = function (data, parent = root) {
        appendTo(parent, data);
        dom = getArrayFromTree(root);
    };
    var refresh = function () {
        var index = banner.index();
        dom = getArrayFromTree(root, true);
        remove(banner.children);
        banner.go(index);
    };
    banner.refresh = refresh;

    return banner;
}