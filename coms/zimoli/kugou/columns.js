var columns = [
    // <name>:<url>:<title> split by \u003a
    "新歌:song/list:音乐总有新玩法",
    "排行:rank/list:排行榜 - 酷狗音乐",
    "歌单:plist/list:歌单 - 酷狗音乐",
    "歌手:singer/keywords:歌手分类 - 酷狗音乐"
].map(function (tag, cx) {
    var [name, url, title] = tag.split(":");
    return {
        name,
        url,
        title
    };
});
