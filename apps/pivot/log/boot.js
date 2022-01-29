var fields = refilm`
地址/ip
端口/port
版本/version
进程/pid
时间/time date
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