var patchlist = function (prefix, list, alias) {
    for (var o of list) {
        patchname(prefix, o, alias);
    }
};
