data.setConfig(api);
data.getApi("kuwo-token").then(function (api) {
    var token = cookie.getCookies(api.base);
    if (!token) cross("get", api.base);
});
zimoli.switch("", null, "/home");
zimoli.enableTouchBack();
css("body", "background-color:#323336;");
zimoli();
document.addEventListener('dragover', function (e) {
    e.preventDefault();
})
document.addEventListener('drop', function (e) {
    e.preventDefault();
    var { files } = e.dataTransfer;
    var objs = [];
    for (var f of files) {
        var url = URL.createObjectURL(f);
        objs.push({ url, name: f.name });
    }
    objs = parseSongsList(objs);
    musicList.push(...objs);
    player.play(objs[0]);
})