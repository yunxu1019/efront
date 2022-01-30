var fields = refilm`
地址/ip
地理位置/ip ${function (e) {
        var ip = e.data[e.field.key];
        var m = /(\d+\.){3}\d+$/.exec(ip);
        if (m) {
            data.from("iplocation", { ip: m[0] }, function (a) {
                var l = document.createElement('label');
                l.innerText = a.address;
                appendChild(e, l);
            });
        }
        return e;
    }}
时间/time ${function (e) {
        e.innerHTML = filterTime(e.data[e.field.key]);
    }}
端口/port input
版本/version
进程/pid
    `;
function main() {
    var page = div();
    page.innerHTML = template;
    var items = data.from("bootlog", item => {
        item.forEach(a => {
            var [v, p] = a.ppid.split("/");
            a.version = v;
            a.pid = p;
        })
        return item;
    });
    renderWithDefaults(page, {
        items,
        fields
    });
    return page;
}