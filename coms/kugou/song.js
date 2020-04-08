function main(elem = div()) {
    elem = document.createElement("song");
    if (!elem.innerHTML) elem.innerHTML = song;
    var $scope = render(elem, {
        filterTime,
        png: img,
        playState: playState,
        song: {},
        musicList,
    }).$scope;
    care(elem, function (item) {
        $scope.song = {
            hash: item.hash,
            imgurl: item.imgurl,
            songMarked: mark(item.name || item.songName || item.songname_original, elem.mark),
            singerMarked: mark(item.singer || item.singerName || item.singername, elem.mark)
        };
    });
    return block(elem);
}