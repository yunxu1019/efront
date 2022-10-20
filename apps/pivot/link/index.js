function index() {
    var page = document.createElement('link-index');
    page.innerHTML = template;
    renderWithDefaults(page, {
        menus: "房间 /link/room, 会话 /link/list".split(/\s*,\s*/).map(a => {
            var [name, path] = a.split(/\s+/);
            return { name, path };
        }),
        saveIndex(index) {
            data.setInstance('link-index', index);
        },
        menu,
    });
    page.$scope.menus[+data.getInstance("link-index")].actived = true;
    return page;
}