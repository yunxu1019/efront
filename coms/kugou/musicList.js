var musicList = data.getInstance("musicList");
musicList.forEach(function (music) {
    if (music.activate) {
        musicList.active_hash = music.hash;
    }
});