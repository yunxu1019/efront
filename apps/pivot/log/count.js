var fields = refilm`
访问量/count money/10
路径/path html/20
`;
var fields2 = refilm`
域名/host text/100
路径/path text/80
远程地址/remote text/100
时间/time timestamp
来源/referer text/100
客户端/agent text/200
`;
var menus = [
    {
        name: "计数",
    },
    {
        name: "千次快照",
    }
];
menus[state().index || 0].actived = true;
function main() {
    var page = div();
    page.innerHTML = template;
    var items = data.from("count", a => {
        if (a["#"]) {
            delete a["#"];
        }
        var items = Object.keys(a).map(b => ({ path: b, count: a[b] }));
        return items;
    });
    var recent = data.from("count", a => {
        var recent = a["#"];
        if (recent) recent = recent.slice().reverse();
        return recent;
    });
    renderWithDefaults(page, {
        items,
        xmenu: menu,
        menus,
        saveState(i) {
            state({ index: i });
        },
        searchText: "",
        fields,
        fields2,
        recent,
    });
    return page;
}