function main(dataid, datapath) {
    var page = div();
    page.innerHTML = buildList;
    render(page, {
        list: lattice,
        padding,
        song,
        loading,
        musicList,
        run(s) {
            if (s.hash) {
                kugou$player.play(s.hash);
            } else {
                go(datapath, s);
            }
        },
        datas: data.from(dataid, parseSongsList)
    });
    function main() {
        return page;
    }
    return main;
}