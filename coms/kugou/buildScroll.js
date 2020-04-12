function Main(dataid, datapath) {
    var _titlebar = titlebar(" ");
    var page = createVboxWithState(state);
    page.initialStyle = 'margin-left:100%';
    page.innerHTML = buildScroll;
    render(page, {
        list: lattice,
        song,
        padding,
        loading,
        datapath,
        run(s) {
            if (s.hash) {
                this.player.play(s.hash);
            } else {
                go(datapath, s);
            }
        },
        png: img,
        config: {},
        player: kugou$player,
        datas: []
    });
    bindScroll(_titlebar, page);
    var loadedId;
    function main(params) {
        var { _text, title, name = _text || title, id } = params;
        if (loadedId !== id) {
            loadedId = id;
            var ranklist = data.from(dataid, {
                id
            }, parseSongsList);
            page.$scope.config = params;
            page.$scope.datas = ranklist;
        }
        _titlebar.setTitle(name);
        document.title = name;
        return page;
    }
    return main;
}