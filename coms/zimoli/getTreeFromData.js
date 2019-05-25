
function getTreeFromData(array) {
    var root = [];
    root.tab = -Infinity;
    root.count = 0;
    var map = {};
    array = array.filter(a => !!a);
    array.forEach(function (data) {
        var item = new Item(data);
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
        var total = 0;
        item.parent = parent;
        item.root = root;
        if (item.length) {
            tab++;
            item.forEach(item => total += run(item, parent));
            tab--;
        }
        return item.total = total || 1;
    };
    run(root);
    return root;
}