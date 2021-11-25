function main() {
    var page = div();
    page.innerHTML = template;
    renderWithDefaults(page, {
        status: [],
        version: data.from("version"),
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
            var base = data.getInstance("base").base;
            data.setSource(base, null);
            await user.Logout();
            zimoli.switch();
            zimoli();
        }
    });
    return page;
}