function index() {
    var page = document.createElement('link-index');
    page.innerHTML = template;
    renderWithDefaults(page, {
        menus: [{
            name: i18n`房间`,
            path: '/link/room'
        }, {
            name: i18n`会话`,
            path: '/link/list'
        }],
        saveIndex(index) {
            data.setInstance('link-index', index);
        },
        menu,
    });
    $scoped.get(page).menus[+data.getInstance("link-index")].actived = true;
    return page;
}