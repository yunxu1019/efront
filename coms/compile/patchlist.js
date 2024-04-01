var patchlist = function (prefix, list, alias) {
    var cap = [];
    for (var o of list) {
        if (cap.indexOf(o) < 0) cap.push(o);
    }
    for (var o of cap) {
        patchname(prefix, o, alias);
    }
};
