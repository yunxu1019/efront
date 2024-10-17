var normalize = function (url) {
    var normal = [];
    var protocol = /^\w+\:/.exec(url);
    if (protocol) {
        url = url.slice(protocol[0].length).replace(/^[\\\/]+/, '');
    }
    url = url.split(/[\/\\]+/);
    while (url.length) {
        var u = url.pop();
        switch (u) {
            case ".":
                break;
            case "..":
                normal.pop();
                break;
            default:
                normal.push(u);
        }
    }
    if (protocol) {
        normal.unshift(protocol[0].toUpperCase());
    }
    return normal;
}
function isSubpath(path, root) {
    path = normalize(path);
    root = normalize(root);
    if (path.length <= root.length) return false;
    for (var cx = 0, dx = root.length; cx < dx; cx++) {
        if (root[cx] !== path[cx]) return false;
    }
    return true;
}