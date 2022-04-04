function main(element) {
    var page = element || document.createElement('pagination');
    page.innerHTML = pagination;
    render(page, {
        xlist: list,
        btn: button,
        fromPixel,
        pages: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
        next() {
            this.pglist.scrollBy(this.pglist.clientWidth);
        },
        prev() {
            this.pglist.scrollBy(-this.pglist.clientWidth);
        },
        start() {
            this.pglist.go(0);
        },
        end() {
            var index = this.pages.length - 10;
            if (index < 0) {
                index = 0;
            }
            this.pglist.go(index);
        }
    });
    var pglist = page.querySelector('xlist');
    onmounted(page, function () {
        console.log(pglist)
        pglist.XScrollBoxId = 1;
        pglist.go(0);
    });
    return page;
}