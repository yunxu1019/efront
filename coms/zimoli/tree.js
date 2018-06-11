function getTreeFromArray(array) {
    var root = [];
    root.tab = -Infinity;
    root.count = 0;
    var path = [root];
    for (var cx = 0, dx = array.length; cx < dx; cx++) {
        var arg = array[cx];
        var elem = [];
        elem.root = root;
        elem.name = arg.name;
        elem.value = arg;
        elem.tab = arg.tab;
        elem.count = 0;
        for (var cy = path.length - 1; cy >= 0; cy--) {
            var parentElement = path[cy];
            if (parentElement.tab < arg.tab) {
                elem.parent = parentElement;
                parentElement.push(elem);
                path.splice(cy + 1, path.length - cy - 1, elem);
                break;
            }
            parentElement.parent.count += parentElement.count || parentElement.length || 1;
        }
    }
    while (path.length > 1) {
        var elem = path.pop();
        path[path.length - 1].count += elem.count || elem.length || 1;
    }
    return root;
}
function getArrayFromTree(root, skipClosed) {
    var path = [root], pathcx = [0];
    var result = [];
    loop: while (pathcx.length) {
        var pathindex = pathcx.length - 1;
        var cx = pathcx[pathindex];
        var elem = path[pathindex][cx];
        result.push(elem);
        pathcx[pathindex] = ++cx;
        if (!skipClosed || !elem.closed) {
            for (var cy = 0, dy = elem.length; cy < dy; cy++) {
                var temp = elem[cy];
                result.push(temp);
                if (temp.length) {
                    path.push(temp);
                    pathcx.push(cy);
                    continue loop;
                }
            }
        }
        if (cx >= path[pathindex].length) {
            path.pop();
            pathcx.pop();
        }
    }
    return result;
}
function tree() {
    var dom = [], root = null;
    var banner = list(function (index) {
        var coms = dom;
        if (index >= coms.length) return;
        var com = coms[index];
        var span = div();
        html(span, `<b>${com.name}</b>${com.test ? "<i>_test</i>" : ""}${com.closed && com.length ? " <a>(" + com.count + ")</a>" : ""}`);
        var _div = button(span);
        addClass(_div, "tab" + com.tab);
        css(_div, {
            "padding-left": com.tab * 10 * renderPixelRatio + 'pt'
        });
        onclick(_div, function () {
            if (!active(banner, com, _div)) {
                return;
            };
            var index = banner.index();
            com.closed = !com.closed;
            dom = getArrayFromTree(root, true);
            remove(banner.children);
            banner.go(index);
        })
        return _div;
    });

    banner.src = function (src) {
        if (isArray(src)) {
            root = getTreeFromArray(src);
            dom = getArrayFromTree(root);
        }
    };

    return banner;
}