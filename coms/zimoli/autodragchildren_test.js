function main() {
    var page = div();
    page.innerHTML = autodragchildren_test;
    var body = page.querySelector("tbody");
    autodragchildren(body, body);
    var cellList = page.querySelector("list");
    autodragchildren(cellList, cellList);
    var xList = page.querySelector("xlist");
    render(xList, {
        xlist: list,
        xsrc: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
    })
    autodragchildren(xList, xList, function (src, dst) {
        var xsrc = xList.$scope.xsrc;
        var src = src.target.index || 0;
        var dst = xList.children[dst].index || 0;
        var [e] = xsrc.splice(src, 1);
        xsrc.splice(dst, 0, e);
        render.refresh();
        return false;
    });

    return page;
}