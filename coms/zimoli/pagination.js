function main() {
    var page = div();
    page.innerHTML = pagination;
    render(page, {
        xlist: list,
        btn: button,
        pages: [1,2,3,4,5,6,7,8,9,10,11,12,13]
    });

    page.querySelector("xlist").go(0);
    once("append")(page, function () {
        console.log(page);
    })
    return page;
}