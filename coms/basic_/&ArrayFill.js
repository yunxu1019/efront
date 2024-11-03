function ArrayFill(size, item) {
    var result = Array(size);
    for (var cx = 0; cx < size; cx++)result[cx] = item;
    return result;
}