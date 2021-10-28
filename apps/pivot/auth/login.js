var fields = refilm`
密码/password* password
`;

function main() {
    var page = view();
    page.innerHTML = login;
    drag.on(page);
    on("append")(page, function () {
        move.bindPosition(page, [.5, .5]);
    });
    renderWithDefaults(page, { fields, data: {}, pending: false });
    on("submit")(page, async function () {
        var { password } = submit(fields, this.$scope.data);
        this.$scope.pending = true;
        page.disabled = true;
        try {
            var info = await data.from("login", {
                a: encode62.timeencode(encode62.geta(password))
            }).loading_promise;
            info = encode62.timeupdate(info);
            data.setSource({ authorization: info });
            user.login({})
            go('/main')
        } catch {
        }
        this.$scope.pending = false;
    })
    return page;
}