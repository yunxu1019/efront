function main(dataid, datapath) {
    var page = document.createElement("list-page");
    page.innerHTML = buildList;
    render(page, {
        list: lattice,
        padding,
        song,
        loading,
        musicList: kugou$musicList,
        async run(s) {
            if (!s.hash && s.hashid) {
                await data.from("song-mix", s, function (a) {
                    var m = a.innerText.match(/(['"`]?)hash\1\s*:\s*(["'`])(.*?)\2/);
                    if (m) s.hash = m[3];
                });
            }
            if (s.hash || s.url) {
                kugou$player.play(s);
            } else {
                zimoli.go(datapath, s);
            }
        },
        datas: data.from(dataid, parseSongsList)
    });
    function main() {
        return page;
    }
    return main;
}