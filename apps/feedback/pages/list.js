function main() {
    var page = view();
    page.innerHTML = template;
    renderWithDefaults(page, {
        menu,
        menus: [
            {
                name: "活动中",
                actived: true,
            },
            {
                name: "已完结"
            },
            {
                name: "全部"
            }
        ],
        items: data.from("load-list", {
            skip: 0,
            selector: {},
            limit: 21
        }),
    });
    return page;
}