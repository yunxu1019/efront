function main(mainpath) {
    var page = layer$glance({
        left: 'frame$left',
        top: 'frame$top',
        main: mainpath
    });
    return page;
}