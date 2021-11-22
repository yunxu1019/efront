var hosts = data.getItem("hosts");
if (!hosts.length) hosts.push({ key: location.host, name: location.host });
var fields = refilm`
服务器地址/host* select?a ${hosts}
密码/password* password
`;
function main() {
    var page = view();
    page.innerHTML = login;
    drag.on(page);
    on("append")(page, function () {
        move.bindPosition(page, [.5, .5]);
    });
    renderWithDefaults(page, {
        fields, data: {
            host: data.getInstance("base").host || location.host,

        }, pending: false
    });
    on("submit")(page, async function () {
        data.setInstance("hosts", hosts, true);
        var { password } = submit(fields, this.$scope.data);
        this.$scope.pending = true;
        page.disabled = true;
        try {
            var login = await data.getApi("login");
            login.base = location.protocol + "//" + parseURL(this.$scope.data.host).host + "/";
            data.setInstance("base", { base: login.base, host: parseURL(login.base).host });
            var info = await data.from(login, {
                a: encode62.timeencode(encode62.geta(password))
            }).loading_promise;
            info = encode62.timeupdate(info);
            data.setSource({ authorization: info });
            user.login({})
            go('/main')
        } catch (e) {
            console.log(e);
        }
        this.$scope.pending = false;
    })
    return page;
}