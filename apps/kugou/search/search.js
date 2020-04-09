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
        play(hash) {
            this.player.play(hash);
            var words = searchHistory.slice(0);
            var { keyword } = this;
            for (var cx = words.length - 1; cx >= 0; cx--) {
                if (words[cx] === keyword) words.splice(cx, 1);
            }
            words.unshift(keyword);
            words = words.slice(0, 20);
            data.setInstance("searchHistory", words, true);
        },
        search(keyword = this.keyword, timeout = 600) {
            if ($scope.keyword !== keyword) $scope.keyword = keyword;
            $scope.result = data.lazyInstance('search', { keyword }, timeout);
            state({ keyword });
        },
        keyword: state().keyword,
    }).$scope;
    $scope.keyword && $scope.search();
    return page;
}