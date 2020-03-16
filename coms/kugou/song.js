function main(elem = div()) {
    care(elem, function (item) {
        elem.innerHTML = song;
        render(this, {
            filterTime,
            song: {
                songMarked:mark(item.name || item.songName || item.songname_original, elem.mark),
                singerMarked:mark(item.singer || item.singerName || item.singername, elem.mark)
            }
        });
    });
    return block(elem);
}