function main() {
    var page = div();
    page.innerHTML = pagination;
    render(page, {
        xlist: list,
        btn: button,
        fromPixel,
        pages: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
        next() {
            var index = this.pglist.index();
            index += 10;
            if (this.pages.length < index + 10) {
                index = this.pages.length - 10;
            }
            if (index < 0) {
                index = 0;
            }
            this.pglist.go(index);
        },
        prev() {
            var index = this.pglist.index();
            index -= 10;
            if (this.pages.length < index + 10) {
                index = this.pages.length - 10;
            }
            if (index < 0) {
                index = 0;
            }
            this.pglist.go(index);
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

    page.querySelector("xlist").go(0);
    once("append")(page, function () {
        console.log(page);
    })
    return page;
}