function Item(value) {
    this.value = value;
    this.valueOf = function () {
        return value;
    };
    this.toString = function () {
        return String(value);
    };
    if (value instanceof Object) {
        this.name = value.name;
        this.tab = value.tab;
        this.test = value.test;
    }
    this.count = 0;
}
Item.prototype = [];

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
function getArrayFromTree(root, skipClosed) {
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
            parent.push(item);
        }
    });

    var delta = parent.length - length;
    while (parent) {
        parent.count += delta;
        parent = parent.parent;
    }
}
function tree(constructor) {
    var dom = [], root = null;
    var banner = list(function (index) {
        var coms = dom;
        if (index >= coms.length) return;
        var com = coms[index];
        var span;
        if (isFunction(constructor)) {
            span = constructor(com);
        } else {
            span = div();
            html(span, `<b>${com.name}</b>${com.test ? "<i>_test</i>" : ""}${com.closed && com.length ? " <a>(" + com.count + ")</a>" : ""}`);
        }
        var _div = button(span);
        addClass(_div, "tab" + com.tab);
        css(_div, {
            "padding-left": com.tab * 10 * renderPixelRatio + 'pt'
        });
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

    banner.src = function (src) {
        if (isArray(src)) {
            root = getTreeFromArray(src);
            dom = getArrayFromTree(root);
        }
    };
    banner.add = function (data, parent = root) {
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