function main(elem) {
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
    });
    return block(elem);
}