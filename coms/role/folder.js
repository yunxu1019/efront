function folder(fileInfo) {
    var children = fileInfo.children;
    var _folder = option(fileInfo.name, children && children.length,14);
    return _folder;
}