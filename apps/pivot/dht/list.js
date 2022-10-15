function hash(a) {
    var r = [];
    for (var cx = 0, dx = a.length; cx < dx; cx += 20) {
        r.push(a.slice(cx, cx + 20).split("").map(a => a.charCodeAt().toString(16)).join(""));
    }
    return r;
}
var fields = refilm`名称/name
服务器/host
端口/port
`;
return plist.bind({
    fields,
    type: 'nodes',
    title: "DHT服务器管理",
    buttons: [{
        name: "从文件读取", async do() {
            var FileReader = window.FileReader;
            if (!FileReader) return alert('当前浏览器无法读取文件', 'warn')
            var f = await chooseFile(".torrent",true);
            var pg = await popup("/dht/rent");
            pg.$scope.pending = true;
            for (var f of f) await new Promise(function (ok, oh) {
                var r = new FileReader;
                r.onload = function () {
                    try {
                        var t = bdecode2(r.result);
                    } catch (e) {
                        return;
                    }
                    pg.$scope.load(t);
                    pg.$scope.pending = false;
                    ok();
                };
                r.onerror = function () {
                    alert("读取文件失败！", 'error');
                    oh();
                };
                r.readAsArrayBuffer(f);
            });
            console.log(pg.$scope.pending)
        }
    }]
})
// function main() {
//     var page = document.createElement('div');
//     page.innerHTML = template;
//     return renderWithDefaults(page, {
//         torrents: [],
//         async rent() {
//         }
//     })
// }