function main() {
    var page = div();
    page.innerHTML = template;
    renderWithDefaults(page, {
        status: [],
        version: data.from("version"),
        hrtime: data.from("uptime", a => Date.now() - a),
        filterTime,
        async run(id, target) {
            target.setAttribute('pending', '')
            try {
                var info = await data.from("run", {
                    run: id
                }).loading_promise;
                if (info) alert(info, 'pass');
            } catch { }
            target.removeAttribute('pending');
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