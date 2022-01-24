function main() {
    var page = div();
    page.innerHTML = template;
    renderWithDefaults(page, {
        status: [],
        version: data.from("version"),
        hrtime: data.from("uptime", a => Date.now() - a * 1000),
        filterTime,
        async run(id) {
            await new Promise(ok => setTimeout(ok, 2000));
            var info = await data.from("run", {
                run: id
            }).loading_promise;
            if (info) alert(info, 'pass');
        },
        async logout() {
            data.setSource({});
            await user.Logout();
            zimoli.switch();
            zimoli();
        }
    });
    return page;
}