function file(fileInfo) {
    var ext = /\.[^\.]+$/.exec(fileInfo.name);
    return optionbar(fileInfo.name, ext, false);
}