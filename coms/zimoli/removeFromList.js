function removeFromList(list, item) {
    for (var cx = list.length - 1; cx >= 0; cx--) {
        if (list[cx] === item) {
            list.splice(cx, 1);
        }
    }
    return list;
}