function index() {
    var page = document.createElement('link-index');
    page.innerHTML = template;
    renderWithDefaults(page, {
        menus: "房间 /link/room, 会话 /link/list".split(/\s*,\s*/).map(a => {
            var [name, path] = a.split(/\s+/);
            return { name, path };
        }),
        menu,
    });
    page.$scope.menus[0].actived = true;
    return page;
}