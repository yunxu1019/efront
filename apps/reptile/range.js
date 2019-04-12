function range(url, writer) {
    var start = 0;
    return new Promise(function (ok) {
        var run = function () {
            return fetch(url, {
                range: `bytes=${start}-`
            }).then(function (buff) {
                if (!buff.length) return ok();
                start += buff.length;
                writer(buff, start - buff.length).then(run);
            });
        }
        run();
    });

}
function main() {
    range(`http://localhost/xiaohua/data/login!dVvbGGuRRDN3eyyh.mp4`, function (buff, offet = 0) {
        return fs('/data/temp.mp4').writeSync(buff, offet);
    })
}