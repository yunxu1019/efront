var fields = refilm`
访问量/count money/10
路径/path html/20
`;
function main() {
    var page = div();
    page.innerHTML = template;
    var items = data.from("count", a => {
        return Object.keys(a).map(b => ({ path: b, count: a[b] }));
    });
    renderWithDefaults(page, {
        items,
        searchText: "",
        filter() {
            var text = this.searchText;
            if (!text) return this.items = items;
            this.items = search(text, items, 'path');
        },
        fields
    });
    return page;
}