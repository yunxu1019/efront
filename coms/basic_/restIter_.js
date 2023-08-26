function restIter_(iter) {
    var rest = [];
    for (var a = iter.next(); !a.done; a = iter.next()) {
        rest.push(a.value);
    }
    return rest;
}