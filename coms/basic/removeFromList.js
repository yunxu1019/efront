function removeFromList(list, item) {
    var count = 0;
    for (var cx = list.length - 1; cx >= 0; cx--) {
        if (list[cx] === item) {
            count++;
            list.splice(cx, 1);
        }
    }
    return count;
}