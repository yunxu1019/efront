data.loadConfig("api.yml");
user.loginPath = '/auth/login';
cross.addReform(async function ({ status, url, headers }, reform, reject) {
    if (status === 401) {
        var base = data.getInstance("base").base;
        var { protocol, host } = parseURL(url);
        var base1 = protocol + "//" + host + "/";
        if (base !== base1) {
            data.setSource(base1, null);
        }
        var page = await popup("/auth/login", base1);
        care(page, "login", function (info) {
            data.setSource(base1, info);
            headers.authorization = info;
            reform();
        });
        on("remove")(page, reject);
        return false;
    }
})
data.setReporter(function (m, t) {
    alert(m, t);
});
data.bindInstance("base", async function (base) {
    if (!base.base) return;
    cross.addDirect(base.base);
    var apimap = await data.getConfig();
    for (var k in apimap) {
        if (/options|put/.test(apimap[k].method)) apimap[k].base = base.base;
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
on("dragover")(document, function (event) {
    event.preventDefault();
});
on("drop")(document, function (event) {
    event.preventDefault();
});
function main() {
    return layer;
}