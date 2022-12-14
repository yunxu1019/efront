function removeFromList(list, item) {
    var count = 0;
    var cx = list.indexOf(item);
    while (cx >= 0) {
        list.splice(cx, 1);
        count++;
        cx = list.indexOf(item, cx);
    }
    return count;
}