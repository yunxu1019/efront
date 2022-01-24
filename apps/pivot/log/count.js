var fields = refilm`
路径/path
访问量/count
`;
function main() {
    var page = div();
    page.innerHTML = template;
    renderWithDefaults(page, {
        items: data.from("count", a => {
            return Object.keys(a).map(b => ({ path: b, count: a[b] }));
        }),
        fields
    });
    return page;
}