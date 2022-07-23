class Tree extends Array {
    constructor(src) {
        if (src instanceof Tree) return src;
        if (src instanceof Array && src[0] && ('tab' in src[0] || 'deep' in src[0])) {
            return Tree.fromArray(src);
        }
        else if (src instanceof Array) {
            return Tree.fromData(src);
        }
        if (src && src.children) {
            return Tree.fromData(src.children);
        }
        super();
    }
    static fromData(array) {
        if (array instanceof Tree) return array;
        var root = new Tree;
        root.tab = -Infinity;
        root.count = 0;
        var map = {};
        array = array.filter(a => !!a);
        var active_item = null;
        var hasIcon = [];
        array.forEach(function (data) {
            var item = new Item(data);
            if (!active_item && item.isActived()) active_item = item;
            if (data.id) {
                map[data.id] = item;
            } else {
                root.push(item);
            }
        });
        array.forEach(function (data) {
            if (!data) return;
            var parent = map[data.parentId];
            if (parent) {
                var item = map[data.id];
                delete map[data.id];
                if (parent) {
                    parent.push(item);
                }
            }
        });
        var items = Object.keys(map).map(a => map[a]);
        root.push.apply(root, items);
        var tab = 0;
        var deep = 0;
        var run = function (item, parent) {
            item.tab = tab;
            item.deep = tab;
            var count = 0, total = 0;
            item.parent = parent;
            item.root = root;
            if (item.icon && !hasIcon[deep]) hasIcon[deep] = true;
            if (item.length) {
                tab++;
                if (hasIcon[deep]) tab++;
                deep++;
                for (var cx = 0, dx = item.length; cx < dx; cx++) {
                    var i = item[cx];
                    run(i, parent);
                    count += i.count || 1;
                    total += i.total;
                }
                deep--;
                if (hasIcon[deep]) tab--;
                tab--;
            }
            item.total = total + item.length;
            return item.count = count;
        };
        run(root);
        root.hasIcon = hasIcon;
        root.actived = active_item;
        return root;
    }
    static fromArray(array) {
        if (array instanceof Tree) return array;
        var root = new Tree;
        root.tab = -Infinity;
        root.count = 0;
        root.total = 0;
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
                parentElement.parent.total += (parentElement.total || parentElement.length) + 1;
            }
        }
        while (path.length > 1) {
            var item = path.pop();
            path[path.length - 1].count += item.count || item.length || 1;
        }
        return root;
    }
    static toArray(root, skipClosed = true) {
        var path = [root], pathcx = [0];
        var result = [];
        var max_deep = 1;
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
            elem.parent = item;
            result.push(elem);
            pathcx[pathindex] = ++cx;
            if (!skipClosed || !elem.isClosed()) {
                if (elem.length) {
                    path.push(elem);
                    pathcx.push(0);
                    if (pathcx.length > max_deep) {
                        max_deep = pathcx.length;
                    }
                }
            }
        }
        result.deep = max_deep;
        return result;
    }
    static appendTo(parent) {
        var tab = parent && parent.tab + 1 || 1;
        var length = parent.length;
        var datas = [];
        for (var cx = 1, dx = arguments.length; cx < dx; cx++) {
            var arg = arguments[cx];
            if (arg instanceof Item) datas.push(arg);
            else if (arg instanceof Array) datas.push.apply(datas, arg);
            else datas.push(arg);
        }
        for (var data of datas) {
            if (isObject(data)) {
                data.tab = tab;
                var item = new Item(data);
                item.parent = parent;
                item.root = parent.root;
                parent.push(item);
            }
        }
        var delta = parent.length - length;
        while (parent) {
            parent.count += delta;
            parent = parent.parent;
        }
    }
}