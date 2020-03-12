function main() {
    var page = view();
    page.innerHTML = playList;
    render(page, {
        btn: button,
        musicList: kugou$musicList,
        list(elem) {
        }
    });
    return page;
}