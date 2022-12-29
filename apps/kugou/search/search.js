onback(function () {
    state({
        keyword: ''
    });
});

function main(params, from) {
    var page = div();
    page.initialStyle = 'margin-left:100%';
    page.innerHTML = search;
    var $scope = render(page, {
        titlebar,
        back,
        btn: button,
        list: lattice,
        input,
        song,
        result: null,
        searchHistory,
        player: kugou$player,
        padding,
        list: gallery,
        play(info) {
            this.player.play(info);
            var words = searchHistory.slice(0);
            var { keyword } = this;
            for (var cx = words.length - 1; cx >= 0; cx--) {
                if (words[cx] === keyword) words.splice(cx, 1);
            }
            words.unshift(keyword);
            words = words.slice(0, 20);
            data.setInstance("searchHistory", words, true);
        },
        resultMap: null,
        addResult(info) {
            var resultMap = this.resultMap;
            var singerName = sortname(String(info.singername || '').split(/[\&\,，、]/)).join('、');
            var songName = info.songname;
            var id = `${singerName}:${info.songname}`;
            if (!resultMap[id]) resultMap[id] = Object.assign([], { singer: singerName, song: songName });
            resultMap[id].push(info);
        },
        async requestSearch(type, id, params, mp, timeout) {
            var res = await data.from(id, params, timeout);
            if (mp !== this.resultMap) return;
            res.forEach(a => a.type = type);
            res.forEach(this.addResult, this);
            this.result = Object.keys(this.resultMap).map(k => this.resultMap[k]);
            for (var r of this.result) r.sort((a, b) => a.priced - b.priced);
            return res;
        },
        searched: null,
        async search(keyword = this.keyword, timeout = 600) {
            if (keyword === this.searched) return;
            this.keyword = keyword;
            this.searched = keyword;
            this.resultMap = Object.create(null);
            this.result = [];
            var s1 = this.requestSearch("kugo", 'search', { keyword }, this.resultMap, timeout);
            var s2 = this.requestSearch("kuwo", "search-kuwo", { key: keyword }, this.resultMap, timeout);
            state({ keyword });
            s1.then(function (s1) {
                s1.forEach(a => {
                    a.priced = a.privilege === 10 && (a.price_sq > 0);
                });
            })
            await Promise.all([s1, s2]);

        },
        confirm() {
            this.search(void 0, 0);
        },
        keyword: state().keyword,
    }).$scope;
    $scope.keyword && $scope.search();
    return page;
}