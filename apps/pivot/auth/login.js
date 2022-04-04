var hosts = data.getItem("hosts");
if (!hosts.length) hosts.push({ key: location.host, name: location.host });
var fields = refilm`
服务器地址/host* select?a ${hosts}
密码/password* password
`;
function main(host) {
    var page = view();
    page.innerHTML = login;
    drag.on(page);
    fields[0].readonly = !!host;
    on("mounted")(page, function () {
        move.bindPosition(page, [.5, .5]);
    });
    renderWithDefaults(page, {
        fields, data: {
            host: host ? parseURL(host).host : data.getInstance("base").host || location.host,
        }, pending: false
    });
    on("submit")(page, async function () {
        data.setInstance("hosts", hosts, true);
        var { password } = submit(fields, this.$scope.data);
        this.$scope.pending = true;
        page.disabled = true;
        try {
            var base = location.protocol + "//" + parseURL(this.$scope.data.host).host + "/";
            if (!host) data.setInstance("base", { base, host: parseURL(base).host });
            var api = Object.assign({}, await data.getApi("login"));
            api.base = base;
            var info = await data.from(api, {
                a: encode62.timeencode(encode62.geta(password))
            }).loading_promise;
            info = encode62.timeupdate(info);
            data.setSource(base, info);
            if (host) {
                cast(page, 'login', info);
                remove(page);
            } else {
                user.login({});
                go('/main');
            }
        } catch (e) {
            console.log(e);
        }
        this.$scope.pending = false;
    })
    return page;
}