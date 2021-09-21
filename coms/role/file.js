function file(fileInfo) {
    var ext = /\.[^\.]+$/.exec(fileInfo.name);
    return option(fileInfo.name, ext, false);
}