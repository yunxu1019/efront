var loadMenu = async function () {
    frame$route.update(await data.fromURL(i18n`menu.yml`));
};
loadMenu();
i18n.setReloader(function () {
    loadMenu();
    zimoli.reload(false);
});
data.loadConfig("api.yml");
user.loginPath = 'pivot$login';
pivot$login;
cross.addReform(relogin(user.loginPath))
data.setReporter(function (m, t) {
    alert(m, t);
});
data.bindInstance("base", async function (base) {
    if (!base.base) return;
    cross.addDirect(base.base);
    var apimap = await data.getConfig();
    for (var k in apimap) {
        var api = apimap[k];
        if (api.base || !/^\w+\:\/\//.test(api.url)) {
            if (api.headers && 'authorization' in api.headers) {
                api.base = base.base;
            }
        }
    }
});
var base = data.getInstance('base').base;
var token = base && data.getSource(base);
if (token) {
    user.login({});
}
setInterval(function () {
    var base = data.getInstance("base");
    if (!base.base) return user.token = null;
    var auth = data.getSource(base.base);
    if (!auth) return user.token = null;
    var auth1 = encode62.packupdate(auth);
    if (auth1 !== auth) data.setSource(base.base, auth1);
    user.token = auth1;
}, 2000);
login();
var layer = layer$glance({
    left: frame$left.bind({
        head: await init("left-header"),
        foot: await init('left-footer')
    }),
    top: frame$top
});
on("dragover")(document, function (event) {
    event.preventDefault();
});
on("drop")(document, function (event) {
    event.preventDefault();
});
remove(document.body.childNodes);
zimoli.register('/wow/root');
zimoli.register('/order/create', "/shop/order/create");
zimoli.register('/order/list', "/shop/order/list");
zimoli.register('/order/:id', "/shop/order/detail");
zimoli.register('/mind/list', "/shop/mind/list");
function main() {
    return layer;
}
