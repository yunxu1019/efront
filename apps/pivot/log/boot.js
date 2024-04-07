var fields = refilm`
IP地址/ip text/120
地理位置/address/查看 act/80 ${checkGeo}
启动时间/time ${function (e) {
        e.innerHTML = filterTime(e.data[e.field.key]);
    }}
绑定地址/port 120/${checkPort}
版本/version input
进程/pid
`;

function main() {
    var page = div();
    page.innerHTML = template;
    var items = data.from("bootlog", datas => {
        datas.forEach(a => {
            var [v, p] = String(a.ppid).split("/");
            a.version = v;
            a.pid = p;
        });
        datas.sort((a, b) => b.time - a.time);
        return datas;
    });
    renderWithDefaults(page, {
        items,
        fields
    });
    return page;
}