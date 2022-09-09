function search(seartext, options, path = "name") {
    var a = new Table;
    a.searchFields = [{ key: path }];
    a.searchText = seartext;
    a.source = options;
    if (a.searchText) a.update();
    return a;
}