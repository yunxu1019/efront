
function getTreeFromData(array) {
    var root = [];
    root.tab = -Infinity;
    root.count = 0;
    var map = {};
    array = array.filter(a => !!a);
    var active_item = null;
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
    var run = function (item, parent) {
        item.tab = tab;
        var count = 0, total = 0;
        item.parent = parent;
        item.root = root;
        if (item.length) {
            tab++;
            for (var cx = 0, dx = item.length; cx < dx; cx++) {
                var i = item[cx];
                run(i, parent);
                count += i.count || 1;
                total += i.total;
            }
            tab--;
        }
        item.total = total + item.length;
        return item.count = count;
    };
    run(root);
    root.actived = active_item;
    return root;
}