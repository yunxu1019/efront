function dplay() {
    this.firstChild.$scope.play();
}
function main(elem) {
    elem = elem || document.createElement("song");
    var $scope = {
        filterTime,
        png: img,
        bg,
        play(s) {
            if (!s) s = this.song.items ? this.song.items[0] : this.song;
            dispatch(elem, 'play', s);
        },
        isActived() {
            if (this.song.items) {
                for (var s of this.song.items) {
                    if (this.musicList.isActived(s)) return true;
                }
                return false;
            }
            return this.musicList.isActived(this.song);
        },
        playState: kugou$playState,
        song: {},
        musicList: kugou$musicList,
    };
    care(elem, function (item) {
        if (!elem.innerHTML) elem.innerHTML = song;
        var songName = String(item.songname || item.song || item.songName || item.songname_original || item.name || '');
        var singerName = String(item.singername || item.singer || item.singerName || '');
        if (~songName.indexOf(singerName)) {
            if (/\s*\-\s*/.test(songName)) {
                singerName = songName.replace(/^([\s\S]*?)\s*\-\s*[\s\S]*$/, '$1');
                songName = songName.replace(/^[\s\S]*?\s*\-\s*/, '');
            }
        }
        $scope.song = extendIfNeeded(Object.create(item), {
            imgurl: item.imgurl || item.avatar,
            singer: singerName,
            items: item instanceof Array ? item : null,
            songMarked: mark(songName, elem.mark),
            singerMarked: mark(singerName, elem.mark)
        });
        if ($scope.song.items) {
            attr(elem, 'group', true);
        }
        else {
            attr(elem, 'group', null);
        }
        render(elem.children, $scope, 0);
    });
    onclick(elem, dplay);
    patchHover(elem);
    return block(elem);
}