onback(function () {
    state({
        keyword: ''
    });
});

function main(params, from) {
    var page = div();
    page.initialStyle = 'margin-left:100%';
    page.innerHTML = search;
    document.title = "搜索";
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
        async requestSearch(type, id, params, mp, timeout, parse) {
            var res = await data.lazyInstance(id, params, timeout, parse);
            if (mp !== this.resultMap || !(res instanceof Array)) return;
            res.forEach(a => a.type = type);
            res.forEach(this.addResult, this);
            this.result = Object.keys(this.resultMap).map(k => this.resultMap[k]).sort((a, b) => b.length - a.length);
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
            if (!keyword) return;
            var s1 = this.requestSearch("kugo", 'search', { keyword }, this.resultMap, timeout, function (s1) {
                if (s1 instanceof Array) s1.forEach(a => {
                    a.priced = a.privilege === 10
                });
                else s1 = [];
                return s1;
            });
            var s2 = this.requestSearch("kuwo", "search-kuwo", { key: keyword }, this.resultMap, timeout);
            var s3 = this.requestSearch("yyyy", "search-yyyy", yyyc.encode({ hlposttag: "</span>", hlposttag: `<span class="s-fc7">`, limit: 30, offset: 0, s: keyword, total: true, type: 1 }), this.resultMap, timeout, function (s3) {
                if (s3 instanceof Array) s3.forEach(a => {
                    a.priced = a.fee === 1;
                    a.singername = a.ar.map(a => {
                        if (a.name === "." || isEmpty(a.name)) return a.alia.join("、");
                        return a.name;
                    }).join("、");
                });
                else s3 = [];
                return s3;
            });
            var p4 = {
                word: keyword,
                type: 1,
                // pageSize: 20,
            };
            qqjc(p4);
            var s4 = this.requestSearch("qqjt", "search-qqjt", p4, this.resultMap, timeout);
            state({ keyword });
            await Promise.all([s1, s2, s3, s4]);

        },
        confirm() {
            this.search(void 0, 0);
        },
        keyword: state().keyword,
    }).$scope;
    $scope.keyword && $scope.search();
    return page;
}