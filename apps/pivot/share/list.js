var fields = refilm`
路径/path
挂载点/name
`;
var options = [
    {
        name: "删除",
        do(e) {
            data.from('share', { opt: 'delete', item: e });
        }
    },
    {
        name: "修改",
        do(e) {
            popup('/share/edit', { fields, item: e });
        }
    }
];
console.log(fields)
function main() {
    var page = div();
    page.innerHTML = list;
    var a = data.from("share", { opt: 'list' }, a => {
        if (a) return a.map(b => ({ path: b }));
    });
    renderWithDefaults(page, {
        data: a,
        fields: fields.concat({
            name: "操作",
            type: 'button',
            options,
        }),
    });
    console.log(a)
    return page;
}