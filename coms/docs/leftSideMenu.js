function leftSideMenu() {
    var banner = list(function (index) {
        var coms = banner.src;
        if (index >= coms.length) return;
        var _div = button(coms[index]);
        return _div;
    });
    return banner;
}