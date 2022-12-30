var musicList = data.getInstance("musicList");
var actived = null;
musicList.forEach(function (music) {
    if (music.activate) actived = music;
});

var isSameSong = function (m1, m2) {
    return m1 === m2 || m1.mid && m1.mid === m2.mid || m1.hash && m1.hash === m2.hash || m1.id && m1.id === m2.id;
};

function addMethod(name, func) {
    Object.defineProperty(musicList, name, {
        value: func,
        enumerable: false
    });
}
addMethod("setActive", function (m) {
    if (actived !== m) {
        if (actived && actived !== m) {
            actived.activate = false;
        }
        actived = m;
    }
});
addMethod("remove", function (music) {
    for (var cx = this.length - 1; cx >= 0; cx--) {
        if (isSameSong(this[cx], music)) musicList.splice(cx, 1);
    }
});

addMethod('indexOf', function (music, i) {
    for (var cx = i || 0, dx = this.length; cx < dx; cx++) {
        if (isSameSong(this[cx], music)) return cx;
    }
});
addMethod('getActived', function () {
    return actived;
});
addMethod('isActived', function (m) {
    return actived && m && isSameSong(m, actived);
});