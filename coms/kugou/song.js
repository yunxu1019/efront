function main(elem) {
    elem = elem || document.createElement("song");
    var $scope = {
        filterTime,
        png: img,
        playState: kugou$playState,
        song: {},
        musicList: kugou$musicList,
    };
    care(elem, function (item) {
        if (!elem.innerHTML) elem.innerHTML = song;
        var songName = String(item.name || item.songName || item.songname_original || '');
        var singerName = String(item.singer || item.singerName || item.singername || '');
        if (~songName.indexOf(singerName)) {
            if (/\s*\-\s*/.test(songName)) {
                singerName = songName.replace(/^([\s\S]*?)\s*\-\s*[\s\S]*$/, '$1');
                songName = songName.replace(/^[\s\S]*?\s*\-\s*/, '');
            }
        }
        $scope.song = {
            hash: item.hash,
            imgurl: item.imgurl,
            songMarked: mark(songName, elem.mark),
            singerMarked: mark(singerName, elem.mark)
        };
        render(elem.children, $scope);
    });
    return block(elem);
}