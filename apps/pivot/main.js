data.loadConfig("api.yml");
user.loginPath = '/auth/login';
data.setReporter(function (m, t, c) {
    alert(m, t);
    var base = data.getInstance("base").base;
    data.setSource(base, '');
    if (c === 401) location.reload();
});
data.bindInstance("base", async function (base) {
    if (!base.base) return;
    cross.addDirect(base.base);
    var apimap = await data.getConfig();
    for (var k in apimap) {
        apimap[k].base = base.base;
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
    var auth1 = encode62.timeupdate(auth);
    if (auth1 !== auth) data.setSource(base.base, auth1);
    user.token = auth1;
}, 2000);
login();
var layer = layer$glance({
    left: frame$left.bind({
        head: await init("left-header")
    }),
    top: frame$top
});
on("append")(layer, function () {
    frame$route.open();
});
function main() {
    return layer;
}