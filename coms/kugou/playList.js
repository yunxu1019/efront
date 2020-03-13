function main() {
    var page = view();
    page.initialStyle = 'margin-top:10px;opacity:0';
    page.setAttribute("_dragable", "false");
    page.innerHTML = playList;
    render(page, {
        btn: button,
        list(elem) {
            elem = list(elem);
            // autodragchildren(elem,elem);
        },
        song: kugou$song,
        padding,
        play(i) {
            modules.kugou$player.play(i);
        },
        musicList: kugou$musicList,
    });
    return page;
}