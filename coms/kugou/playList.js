var playModeIndex = data.getInstance("play-mode").index || 0;
var playModes = kugou$playModes;
var $scope = {
    btn: button,
    list(elem) {
        elem = list(elem);
        // autodragchildren(elem,elem);
    },
    a: button,
    song: kugou$song,
    padding,
    mode: playModes[playModeIndex],
    switchMode() {
        playModeIndex++;
        playModeIndex = playModeIndex % playModes.length;
        var mode = playModes[playModeIndex];
        data.setInstance("play-mode", { index: playModeIndex }, true);
        $scope.mode = mode;
    },
    remove(i) {
        var list = kugou$musicList.slice(0);
        list.active_hash = kugou$musicList.active_hash;
        list.splice(i, 1);
        data.setInstance("musicList", list, true);
    },
    musicList: kugou$musicList,
};
function main() {
    var page = view();
    page.initialStyle = 'margin-top:10px;opacity:0';
    page.setAttribute("_dragable", "false");
    page.innerHTML = playList;
    $scope.play = function (i) {
        if (page.play instanceof Function) {
            page.play(i);
        }
    };
    render(page, $scope);
    touchList(page.querySelector("list"));
    return page;
}