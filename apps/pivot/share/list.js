var fields = refilm`
路径/path
操作 btn ${[{
        name: "删除",
        do(e) {
            console.log(e)
            alert("暂不支持删除！");
        }
    }]}
`;
console.log(fields)
function main() {
    var page = div();
    page.innerHTML = list;
    var a = data.from("share", a => {
        if (a) return a.map(b => ({ path: b }));
    });
    renderWithDefaults(page, {
        data: a,
        fields,
    });
    console.log(a)
    return page;
}