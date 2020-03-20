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
        remove(i) {
            var list = kugou$musicList.slice(0);
            list.active_hash = kugou$musicList.active_hash;
            list.splice(i, 1);
            data.setInstance("musicList", list, true);
        },
        play(i) {
            modules.kugou$player.play(i);
        },
        musicList: kugou$musicList,
    });
    touchList(page.querySelector("list"));
    return page;
}