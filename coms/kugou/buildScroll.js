function Main(dataid, datapath, titleid) {
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
                this.player.play(s);
            } else {
                zimoli.go(datapath, s);
            }
        },
        png: img,
        config: {},
        player: kugou$player,
        datas: []
    });
    bindScroll(_titlebar, page);
    var loadedId, requested = false;
    function main(params) {
        var { _text, title = "", name = _text || title, id } = params;
        if (!requested || loadedId !== id) {
            loadedId = id;
            requested = true;
            var ranklist = data.from(dataid, {
                id
            }, parseSongsList);
            page.$scope.config = params;
            page.$scope.datas = ranklist;
            if (titleid) {
                data.from(titleid, {
                    id
                }).then(function ({ title }) {
                    _titlebar.setTitle(title);
                    document.title = title;
                })
            }
        }
        _titlebar.setTitle(name);
        document.title = name;
        return page;
    }
    return main;
}