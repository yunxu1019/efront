[
    {
        name: "列表循环",
        next(index) {
            index++;
            index %= musicList.length;
            return index;
        },
    },
    {
        name: "随机播放",
        next(index) {
            var delta = (musicList.length - 1) * Math.random() | 0;
            return index + delta;
        },
    },
    {
        name: "单曲循环",
        next(index) {
            return index;
        },
    },
]