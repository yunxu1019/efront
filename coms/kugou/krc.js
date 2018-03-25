var secret = [64, 71, 97, 119, 94, 50, 116, 71, 81, 54, 49, 45, 206, 210, 110, 105];
function krc(info) {
    console.log(info);
    cross("get", `http://lyrics.kugou.com/search?ver=1&man=yes&client=pc&keyword=${info.songName}&duration=${info.time}&hash=${info.hash}`).done(function (response) {
        var liric = JSON.parse(response.response);
        var info = liric.candidates[0];
        if (!info) return;
        var url = `http://lyrics.kugou.com/download?ver=1&client=pc&id=${info.id}&accesskey=${info.accesskey}&fmt=krc&charset=utf8`;
        info && cross("get", url).done(function (response) {
            var krc = JSON.parse(response.response);
            var content = fromBase64(krc.content);
            content = content.slice(4).map((a, i) => a ^ secret[i % 16]);
            var bufff = inflate(content.slice(2));
            var saved_time = new Date;
            // for (var k = 0; k < 1000; k++)
            var krc = decodeUTF8(bufff);
            console.log(new Date - saved_time);
        });
    });
}
